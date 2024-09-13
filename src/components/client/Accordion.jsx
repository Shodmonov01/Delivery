import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { memo, useState } from "react";

function BasicAccordion() {
  const [open, setOpen] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
  });
  const [t] = useTranslation("global");
  return (
    <div className="md:w-[90%] mx-auto mt-8 md:mt-12 pb-32 z-[9999999]">
      <p className="text-center font-semibold md:font-bold text-[18px] mb-4 sm:mb-0 sm:text-[24px] md:text-[28px] lg:text-[45px] text-[#2F2E40]">
        {t(`section6.title`)}
      </p>

      <Accordion>
        <AccordionSummary
          expandIcon={
            open.menu1 ? (
              <IoRemoveCircleOutline
                onClick={() =>
                  setOpen({
                    ...open,
                    menu1: false,
                    menu2: false,
                    menu3: false,
                    menu4: false,
                  })
                }
              />
            ) : (
              <button
                onClick={() =>
                  setOpen({
                    ...open,
                    menu1: true,
                    menu2: false,
                    menu3: false,
                    menu4: false,
                  })
                }
                className="w-[15px] h-[15px] sm:w-[27.48px] sm:h-[27.48px]"
              >
                <img
                  src={"/plus.svg"}
                  className="w-[100%] h-[100%]"
                  alt="plus"
                  width={100}
                  height={100}
                />
              </button>
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-[15px] sm:text-[18px] text-lightGreey sm:font-medium my-2">
            {t(`section6.ask1`)}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
      <AccordionSummary
          expandIcon={
            open.menu2 ? (
              <IoRemoveCircleOutline
                onClick={() =>
                  setOpen({
                    ...open,
                    menu1: false,
                    menu2: false,
                    menu3: false,
                    menu4: false,
                  })
                }
              />
            ) : (
              <button
                onClick={() =>
                  setOpen({
                    ...open,
                    menu1: false,
                    menu2: true,
                    menu3: false,
                    menu4: false,
                  })
                }
                className="w-[15px] h-[15px] sm:w-[27.48px] sm:h-[27.48px]"
              >
                <img
                  src={"/plus.svg"}
                  className="w-[100%] h-[100%]"
                  alt="plus"
                  width={100}
                  height={100}
                />
              </button>
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-[15px] sm:text-[18px] text-lightGreey sm:font-medium my-2">
            {t(`section6.ask2`)}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. */}
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion>
      <AccordionSummary
          expandIcon={
            open.menu3 ? (
              <IoRemoveCircleOutline
                onClick={() =>
                  setOpen({
                    ...open,
                    menu1: false,
                    menu2: false,
                    menu3: false,
                    menu4: false,
                  })
                }
              />
            ) : (
              <button
                onClick={() =>
                  setOpen({
                    ...open,
                    menu1: false,
                    menu2: false,
                    menu3: true,
                    menu4: false,
                  })
                }
                className="w-[15px] h-[15px] sm:w-[27.48px] sm:h-[27.48px]"
              >
                <img
                  src={"/plus.svg"}
                  className="w-[100%] h-[100%]"
                  alt="plus"
                  width={100}
                  height={100}
                />
              </button>
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-[15px] sm:text-[18px] text-lightGreey sm:font-medium my-2">
            {t(`section6.ask3`)}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. */}
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion className="">
      <AccordionSummary
          expandIcon={
            open.menu4 ? (
              <IoRemoveCircleOutline
                onClick={() =>
                  setOpen({
                    ...open,
                    menu1: false,
                    menu2: false,
                    menu3: false,
                    menu4: false,
                  })
                }
              />
            ) : (
              <button
                onClick={() =>
                  setOpen({
                    ...open,
                    menu1: false,
                    menu2: false,
                    menu3: false,
                    menu4: true,
                  })
                }
                className="w-[15px] h-[15px] sm:w-[27.48px] sm:h-[27.48px]"
              >
                <img
                  src={"/plus.svg"}
                  className="w-[100%] h-[100%]"
                  alt="plus"
                  width={100}
                  height={100}
                />
              </button>
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-[15px] sm:text-[18px] text-lightGreey sm:font-medium my-2">
            {t(`section6.ask4`)}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. */}
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


export default memo(BasicAccordion);
