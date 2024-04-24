import * as React from 'react';
import { HiXMark } from 'react-icons/hi2';

interface IPopup {
  open: boolean;
  title: any;
  onSelect: any;
  children: any;
}

export default function Popup({ open = false, title, children, onSelect }: IPopup) {

  const handleClose = () => {
    onSelect()

  };

  return (
    <div>
      {open && <div className="relative z-50" >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10" onClick={handleClose}></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ">
              <div className="flex justify-between">
                <div>{title}</div>
                <HiXMark className="w-6 cursor-pointer" onClick={handleClose} />
              </div>
              <div>
                {children}
              </div>
              <div className="mt-5 sm:mt-6">
                {/* <button type="button" onClick={handleClose} disabled={selectedMedia.length == 0 ? true : false} className="inline-flex  disabled:bg-indigo-400 justify-center rounded-md bg-site1 px-3 py-2 text-sm font-semibold text-white shadow-sm   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ">Select</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>}


    </div>
  );
}