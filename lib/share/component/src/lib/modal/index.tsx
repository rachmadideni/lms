'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ children }: React.PropsWithChildren) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted
    ? createPortal(
        <div className="overflow-x-hidden overflow-y-hidden fixed top-0 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div className="relative flex flex-col w-full items-center justify-center px-4 h-screen overflow-y-hidden bg-gray-500 bg-opacity-70 backdrop-blur-sm">
            {children}
            {/* <div className="absolute inset-0 z-10 bg-gray-500 opacity-75"></div> */}
          </div>
        </div>,
        document.body
      )
    : null;
};
