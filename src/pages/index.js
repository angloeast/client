import React from 'react';
import { getIssues } from './../services/api';
import { useQuery } from '@tanstack/react-query';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const IndexPage = () => {
  return (
    <div>
      <div className='text-4xl m-8'>Past Issues</div>
      <Issues />
    </div>
  );
};

const formatDate = (date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const Issues = () => {
  const { data, isLoading } = useQuery(['issues'], getIssues);
  if (isLoading) return <div>Loading</div>;
  console.log(data);
  return (
    <div className='flex flex-wrap gap-x-2 gap-y-4 items-center m-8'>
      {data.map((d) => {
        return (
          <div key={d.id} className='flex gap-2 flex-col'>
            <div>
              <img
                src={d.imageUri}
                alt='cover'
                className='w-96 h-40 cover-fill'
              />
            </div>
            <div className='flex flex-col py-2'>
              <div>
                <span className='text-slate-900 font-bold dark:text-slate-300'>Issue {d.issueNumber}</span>
              </div>
              <div className='flex gap-2 items-center'>
                <span className='text-slate-500'>Issue {d.issueNumber}</span>
                <span className='w-0.5 h-4 bg-slate-500'></span>
                <span className='text-slate-500'>
                  {formatDate(new Date(d.issueDate))}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;
