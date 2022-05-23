import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useRouter } from 'next/router';
import React from 'react';
import { MeContainer } from '../me-container';
import { CalendarList } from './calendar-list';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
// ___________________________________________________________________________
//
export const Calendar: React.VFC = withLoginRequired(() => {
  const router = useRouter();
  const { type, year, month, day } = router.query as {
    type?: string;
    year?: string;
    month?: string;
    day?: string;
  };
  const date = new Date(`${year}/${month}/${day}`);
  // ___________________________________________________________________________
  //
  return (
    <Layout
      customMeta={{
        title: format(date, 'ノートの管理 - yyyy年M月d日 (EEEE)', { locale: ja }),
        titleTemplate: '%s',
      }}
    >
      <MeContainer className='max-w-6xl'>
        <CalendarList type={type} date={date} />
      </MeContainer>
    </Layout>
  );
});
