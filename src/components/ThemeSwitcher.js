// @flow
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './../hooks/useTheme';
import PropTypes from 'prop-types';
import {
  actionSetDarkTheme,
  actionSetLightTheme,
  actionSetSystemTheme,
} from '../providers/ThemeProvider';
import { capitalize } from './../utils/textUtils';

const LightIcon = ({ selected }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='w-6 h-6'
    >
      <path
        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
        className={`${
          selected
            ? 'stroke-sky-500 fill-sky-400/20'
            : 'stroke-slate-400 dark:stroke-slate-500'
        }`}
      ></path>
      <path
        d='M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836'
        className={`${
          selected
            ? 'stroke-sky-500 fill-sky-400/20'
            : 'stroke-slate-400 dark:stroke-slate-500'
        }`}
      ></path>
    </svg>
  );
};

const DarkIcon = ({ selected }) => {
  return (
    <svg viewBox='0 0 24 24' fill='none' className='w-6 h-6'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z'
        className='fill-transparent'
      ></path>
      <path
        d='m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z'
        className={`${
          selected ? ' fill-sky-500' : 'fill-slate-400 dark:fill-slate-500'
        }`}
      ></path>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z'
        className={`${
          selected ? ' fill-sky-500' : 'fill-slate-400 dark:fill-slate-500'
        }`}
      ></path>
    </svg>
  );
};

const SystemIcon = ({ selected }) => {
  return (
    <svg viewBox='0 0 24 24' fill='none' className='w-6 h-6 mr-2'>
      <path
        d='M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z'
        strokeWidth='2'
        strokeLinejoin='round'
        className={`${
          selected
            ? 'stroke-sky-500 fill-sky-400/20'
            : 'stroke-slate-400 dark:stroke-slate-500'
        }`}
      ></path>
      <path
        d='M14 15c0 3 2 5 2 5H8s2-2 2-5'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={`${
          selected ? 'stroke-sky-500' : 'stroke-slate-400 dark:stroke-slate-500'
        }`}
      ></path>
    </svg>
  );
};

const ThemeSwitcher = () => {
  const { state, dispatch } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { title: 'light', icon: <LightIcon selected={state === 'light'} /> },
    { title: 'dark', icon: <DarkIcon selected={state === 'dark'} /> },
    { title: 'system', icon: <SystemIcon selected={state === 'system'} /> },
  ];

  const handleOnClick = (theme) => {
    switch (theme) {
      case 'dark':
        dispatch(actionSetDarkTheme());
        setIsOpen(false);
        break;
      case 'light':
        dispatch(actionSetLightTheme());
        setIsOpen(false);
        break;
      case 'system':
        dispatch(actionSetSystemTheme());
        setIsOpen(false);
        break;
      default:
        console.warn('Not handled');
    }
  };

  return (
    <React.Fragment>
      <div className='relative'>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <span className='dark:hidden'>
            <LightIcon selected={state === 'light'} />
          </span>
          <span className='hidden dark:inline'>
            <DarkIcon selected={state === 'dark'} />
          </span>
        </button>
        <PopUp show={isOpen} onClose={() => setIsOpen((prev) => !prev)}>
          <ul
            className='absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-4'
            aria-orientation='vertical'
            role='listbox'
            tabIndex='0'
          >
            {themes.map((theme, index) => {
              return (
                <li
                  onClick={() => handleOnClick(theme.title)}
                  key={index}
                  className={`py-1 px-2 flex items-center cursor-pointer ${
                    theme.title === state && 'text-sky-500'
                  }`}
                  role='option'
                  aria-selected={state}
                >
                  {theme.icon}
                  {capitalize(theme.title)}
                </li>
              );
            })}
          </ul>
        </PopUp>
      </div>
    </React.Fragment>
  );
};

const PopUp = ({ children, onClose, show }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose && onClose();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClose]);

  if (!show) return null;

  return <div ref={ref}>{children}</div>;
};

export default ThemeSwitcher;
