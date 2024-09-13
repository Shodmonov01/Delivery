import { useTranslation } from "react-i18next";

const CustomDateInput2 = ({ state, setState }) => {

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
          d="M1 8.66667H21M1 8.66667V19.9114C1 21.3426 1 22.0579 1.27248 22.6045C1.51217 23.0854 1.89434 23.4767 2.36475 23.7217C2.899 24 3.59874 24 4.99614 24H17.0045C18.4019 24 19.1006 24 19.6349 23.7217C20.1053 23.4767 20.4881 23.0854 20.7278 22.6045C21 22.0584 21 21.3441 21 19.9157V8.66667M1 8.66667V7.64469C1 6.21345 1 5.49729 1.27248 4.95063C1.51217 4.46977 1.89434 4.0791 2.36475 3.83409C2.89953 3.55556 3.60011 3.55556 5.00024 3.55556H6M21 8.66667V7.6405C21 6.21205 21 5.49676 20.7278 4.95063C20.4881 4.46977 20.1053 4.0791 19.6349 3.83409C19.1001 3.55556 18.4004 3.55556 17.0002 3.55556H16M6 3.55556H16M6 3.55556V1M16 3.55556V1M13.5 18.8889L11 16.3333M11 16.3333L8.5 13.7778M11 16.3333L13.5 13.7778M11 16.3333L8.5 18.8889"
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

export default CustomDateInput2;
