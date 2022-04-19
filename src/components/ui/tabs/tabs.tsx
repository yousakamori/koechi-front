import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
// ___________________________________________________________________________
//
export type Tab = { name: string | React.ReactNode; route: string; active: boolean };

export type TabsProps = {
  tabs: Tab[];
  children?: React.ReactNode;
};
// ___________________________________________________________________________
//
export const Tabs: React.VFC<TabsProps> = ({ tabs, children }) => {
  // ___________________________________________________________________________
  //
  return (
    <div className='border-b border-gray-200'>
      <div className='flex items-center justify-between'>
        <div className='mt-4'>
          <nav className='flex space-x-8'>
            {tabs.map((tab, i) => (
              <Link key={i} href={tab.route}>
                <a
                  className={clsx(
                    tab.active
                      ? 'border-primary-500 text-primary-600 pointer-events-none'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm',
                  )}
                  aria-current={tab.active ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
};
