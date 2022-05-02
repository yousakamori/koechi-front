import { Editor, EditorContent } from '@tiptap/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { EditorToolbar } from '@/components/common/editor-toolbar';
import { ErrorMessage } from '@/components/ui/error-message';
import { Textarea } from '@/components/ui/textarea';
// ___________________________________________________________________________
//
export type EditNoteFormProps = { editor: Editor };
// ___________________________________________________________________________
//
export const EditNoteForm: React.VFC<EditNoteFormProps> = ({ editor }) => {
  const handleFocus = () => {
    editor.commands.focus();
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();
  // ___________________________________________________________________________
  //
  return (
    <>
      <Textarea
        {...register('title')}
        autoFocus
        size='lg'
        variant='none'
        color='secondary'
        fullWidth
        className='text-3xl font-bold'
        placeholder='タイトル'
      />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>

      <div className='p-3 mt-8 break-all bg-white border rounded-lg shadow-md md:p-8'>
        <EditorToolbar editor={editor} />
        <div onClick={handleFocus} className='min-h-80'>
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};
