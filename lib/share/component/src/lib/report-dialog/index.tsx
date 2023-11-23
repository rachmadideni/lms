import * as React from 'react';
import Image from 'next/image';
import { VscClose } from 'react-icons/vsc';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface ReportDialogProps {
  title: string;
  subtitle: string;
  reportList: string[];
  onCloseHandler: () => void;
  onReportHandler: () => void;
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col pl-2 py-4 z-[1000] md:w-[30%] rounded-xl align-bottom bg-white text-left overflow-auto">
      {children}
    </div>
  );
};

interface ReportHeaderProps {
  title: string;
  subtitle: string;
  onCloseHandler: () => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  title,
  subtitle,
  onCloseHandler,
}) => {
  return (
    <>
      <div className="flex justify-between pl-4 pr-2">
        <div className="flex items-center justify-center text-center">
          <p className="font-bold pb-2 text-center capitalize">{title}</p>
        </div>
        <button onClick={onCloseHandler}>
          <VscClose className="w-6 h-6 text-gray-300 " />
        </button>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <div className="p-4 font-bold">{subtitle}</div>
    </>
  );
};

export const ReportDialog: React.FC<ReportDialogProps> = ({
  title,
  subtitle,
  reportList,
  onCloseHandler,
  onReportHandler,
}) => {
  return (
    <Wrapper>
      <ReportHeader
        title={title}
        subtitle={subtitle}
        onCloseHandler={onCloseHandler}
      />
      {reportList.map((report, idx) => (
        <React.Fragment key={idx}>
          <div className="group group:hover-bg-slate-400 flex w-full pl-4 pr-2 py-2 justify-between cursor-pointer">
            <button
              onClick={() => onReportHandler()}
              className="text-sm text-left group-hover-text-red-500"
            >
              {report}
            </button>
            <div>
              <MdOutlineKeyboardArrowRight className="w-8 h-8 text-gray-300 " />
            </div>
          </div>
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export const ReportConfirmDialog: React.FC<{
  onCloseHandler: () => void;
  textBody: string;
  textButton: string;
}> = ({ onCloseHandler, textButton, textBody }) => {
  return (
    <Wrapper>
      <div className="flex flex-col w-full p-4 space-y-4 items-center">
        <Image src="/images/checkmark.svg" width={36} height={36} alt="check" />
        <p className="text-lg font-bold">Terimakasih telah memberi tahu kami</p>
        <p className="text-sm">{textBody}</p>
        <button
          onClick={onCloseHandler}
          className="flex w-full items-center justify-center capitalize bg-[#106FA4] text-white rounded-xl py-2"
        >
          {textButton}
        </button>
      </div>
    </Wrapper>
  );
};
