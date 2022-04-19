import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Me } from '@/components/me';
// ___________________________________________________________________________
//
const CalendarPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='カレンダー' />

      <Me />
    </>
  );
};
// ___________________________________________________________________________
//
export default CalendarPage;
