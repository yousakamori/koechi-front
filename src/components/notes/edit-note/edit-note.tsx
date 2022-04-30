import { yupResolver } from '@hookform/resolvers/yup';
import { Placeholder } from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { EditNoteHeader } from './edit-note-header';
import { notesApi } from '@/api/notes';
import { EditNoteFormProps } from '@/components/edit-note-form';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Container } from '@/components/ui/container';
import { endpoints } from '@/config/endpoints';
import { updateNoteSchema } from '@/config/yup-schema';
import { HttpError } from '@/error/http-error';
import { editorExtensionsFactory, parseBodyText } from '@/lib/editor';
import { fetchApi } from '@/lib/fetch-api';
import Error from '@/pages/_error';
import { NoteDetails } from '@/types/note';
// ___________________________________________________________________________
//
const EditNoteForm = dynamic<EditNoteFormProps>(() =>
  import('@/components/edit-note-form').then((mod) => mod.EditNoteForm),
);
// ___________________________________________________________________________
//
export type UpdateValues = Pick<
  NoteDetails,
  'title' | 'body_text' | 'body_json' | 'slug' | 'posted_at'
>;

export type NoteResponse = {
  note: Pick<NoteDetails, 'id' | 'title' | 'body_text' | 'body_json' | 'posted_at'>;
  next_page: NextPage;
};
// ___________________________________________________________________________
//
export const EditNote: React.VFC = withLoginRequired(() => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const [validating, setValidating] = useState(false);

  const form = useForm<UpdateValues>({
    mode: 'onChange',
    resolver: yupResolver(updateNoteSchema),
  });
  const watchTitle = form.watch('title', '');

  const editor = useEditor({
    extensions: editorExtensionsFactory([Placeholder.configure({ placeholder: 'ノートを入力' })]),
    injectCSS: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sky max-w-none focus:outline-none',
      },
    },

    onUpdate({ editor }) {
      form.setValue('body_text', editor.state.doc.textContent, { shouldDirty: true });
      form.setValue('body_json', editor.isEmpty ? '' : JSON.stringify(editor.getJSON()), {
        shouldDirty: true,
      });
    },
  });

  const { data, error } = useSWR<NoteResponse, HttpError>(endpoints.editNote(slug), fetchApi, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: (data) => {
      form.reset({
        slug,
        posted_at: data.note.posted_at,
        title: data.note.title,
        body_text: data.note.body_text,
        body_json: data.note.body_json,
      });

      if (data.note.body_json) {
        editor?.commands.setContent(parseBodyText(data.note.body_json));
      }
    },
  });

  const handleUpdate = useCallback(
    async (values: UpdateValues) => {
      setValidating(true);
      try {
        await notesApi.updateNote(values);
        form.reset(values);
        toast.success('保存しました');
      } catch (err) {
        if (err instanceof HttpError) {
          toast.error(err.message);
        } else {
          throw err;
        }
      } finally {
        setValidating(false);
      }
    },
    [form],
  );

  const handleRouteChange = () => {
    const answer = window.confirm('保存せずに終了しますか？');
    if (!answer) {
      router.events.emit('routeChangeError');
      throw 'ルート変更が中止されました。このエラーは無視してOKです';
    }
  };

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '保存せずに終了しますか？';
  };

  useEffect(() => {
    if (!form.formState.isDirty) {
      return;
    }

    router.events.on('routeChangeStart', handleRouteChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);
  // ___________________________________________________________________________
  //
  if (error) {
    return <Error {...error.serialize()} />;
  }
  // ___________________________________________________________________________
  //
  if (!data || !editor) {
    return <></>;
  }
  // ___________________________________________________________________________
  //
  return (
    <FormProvider {...form}>
      <NextSeo title={`編集中…${watchTitle || '無題の投稿'}`} />
      <EditNoteHeader validating={validating} onUpdate={handleUpdate} onClickBack={router.back} />
      <div className='min-h-screen py-10 border-t border-gray-200'>
        <Container className='max-w-4xl'>
          <EditNoteForm editor={editor} />
        </Container>
      </div>
    </FormProvider>
  );
});
