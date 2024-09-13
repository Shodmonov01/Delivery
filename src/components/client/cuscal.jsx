import { useTranslation } from "react-i18next";

const CustomDateInput = ({ text, state, setState }) => {
  const [t] = useTranslation("global");

  return (
    <div className="h-[50px] border-[1.5px] border-[#2F2E40CC]/80 flex flex-row rounded-[5px] items-center px-6 gap-x-6 w-[230px] relative">
      <svg
        width="22"
        height="25"
        viewBox="0 0 22 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 3.55556H5.00024C3.60011 3.55556 2.89953 3.55556 2.36475 3.83409C1.89434 4.0791 1.51217 4.46977 1.27248 4.95063C1 5.49729 1 6.21345 1 7.64469V8.66667M6 3.55556H16M6 3.55556V1M16 3.55556H17.0002C18.4004 3.55556 19.0995 3.55556 19.6342 3.83409C20.1046 4.0791 20.4881 4.46977 20.7278 4.95063C21 5.49676 21 6.21205 21 7.6405V8.66667M16 3.55556V1M1 8.66667V19.9114C1 21.3426 1 22.0579 1.27248 22.6045C1.51217 23.0854 1.89434 23.4767 2.36475 23.7217C2.899 24 3.59874 24 4.99614 24H17.0039C18.4013 24 19.1 24 19.6342 23.7217C20.1046 23.4767 20.4881 23.0854 20.7278 22.6045C21 22.0584 21 21.3441 21 19.9157V8.66667M1 8.66667H21M16 18.8889H16.0025L16.0024 18.8914L16 18.8914V18.8889ZM11 18.8889H11.0025L11.0024 18.8914L11 18.8914V18.8889ZM6 18.8889H6.0025L6.00244 18.8914L6 18.8914V18.8889ZM16.0024 13.7778V13.7803L16 13.7803V13.7778H16.0024ZM11 13.7778H11.0025L11.0024 13.7803L11 13.7803V13.7778ZM6 13.7778H6.0025L6.00244 13.7803L6 13.7803V13.7778Z"
          stroke="#2F2E40"
          stroke-opacity="0.8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <button
        type="button"
        className="text-[#2F2E40CC]/80 font-normal text-sm 2xl:text-base cursor-pointer"
      >
        {t(`sto.st13`)}
      </button>
      <div className="w-full h-full opacity-0 absolute left-[-80px] top-4">
        <input
          type="date"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomDateInput;
