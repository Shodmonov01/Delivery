import React, { useEffect, useState } from "react";
import CardServices from "./CardServices";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import { Skeleton } from "@mui/material";
import CardSkeleton from "../UI/cardskleton";
import Section from "./Section";
import Onas from "./Onas";
import MD_Hero from "./MD_Hero";
import MOB_Hero from "./MobHero";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "../client/Loader";

const HeroUsluga = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hero, setHero] = useState([]);
  const { id } = useParams();
  const [t, i18n] = useTranslation("global");

  const [data, setData] = useState([]);

  const getCardData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/service_get_post_views/`
      );
      setData(data?.data?.results);
      console.log(data?.data?.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/b_api/sayts/delivery_list_views/`
      );
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getMaindata = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/b_api/sayts/servise_deteile_views/${id}/`
      );
      setHero(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMaindata();
  }, [id]);

  function renderElement(option, item) {
    switch (option) {
      case "ru":
        return <div>{item?.translations?.nl?.name}</div>;
      case "gl":
        return <div>{item?.translations?.nl?.name}</div>;
      case "en":
        return <div>{item?.translations?.en?.name}</div>;
      case "fi":
        return <div>{item?.translations?.fi?.name}</div>;
      default:
        return <div>Option not recognized</div>;
    }
  }

  function renderElement2(option, item) {
    switch (option) {
      case "ru":
        return <div>{item?.translations?.nl?.content}</div>;
      case "gl":
        return <div>{item?.translations?.nl?.content}</div>;
      case "en":
        return <div>{item?.translations?.en?.content}</div>;
      case "fr":
        return <div>{item?.translations?.fi?.content}</div>;
      default:
        return <div>Option not recognized</div>;
    }
  }

  if(loading){
    return <Loader/>
  }

  return (
    <div className="w-full pb-12 sm:pb-64">
      <MD_Hero hero={hero} card={data} id={id} />
      <MOB_Hero hero={hero} card={data} id={id} />

      <div className="w-[100%] relative mt-4 sm:mt-24">
        <div className="">
          <img
            src={"/minLeft.svg"}
            width={100}
            height={100}
            alt={"minLeft"}
            className="absolute top-[200px] sm:flex hidden left-0"
          />
        </div>
        <div className="">
          <img
            className="absolute top-0 sm:flex hidden right-0"
            src={"/minRight.svg"}
            width={100}
            height={100}
            alt={"minLeft"}
          />
        </div>

        <div className="w-[100%] flex justify-center">
          <p className="font-semibold flex w-full justify-center lg:text-[40px] gap-x-2 text-center md:text-[32px] text-[24px] px-6 text-lightGreey">
            {renderElement(i18n?.language, hero[0])}
          </p>
        </div>
        <div className="w-[80%] mx-auto">
          <p className="font-raleway hidden md:flex text-[17px] leading-[38.5px] font-medium text-center md:text-[19px] lg:text-[20px] text-[#2f2e40c1] mt-6">
            {renderElement2(i18n?.language, hero[0])}{" "}
          </p>
          <p className="font-raleway md:hidden text-[17px] text-center md:leading-[38.5px] font-medium md:text-[20px] lg:text-[23px] text-[#2f2e40c1] mt-6">
            {renderElement2(i18n?.language, hero[0])}
          </p>
        </div>

        <Onas id={id} />

        <div className="w-[98%] flex justify-center mt-12">
          <p className="font-semibold lg:text-[40px] md:text-[32px] text-[20px] text-lightGreey">
            {t(`sto.st4`)}
          </p>
        </div>

        <div className="w-[80%] mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-x-8 md:gap-y-8 gap-y-4 gap-x-4">
          {!loading ? (
            services?.reverse()?.map((item, index) => {
              return (
                index < 3 && (
                  <CardServices
                    item={item}
                    index={index}
                    title={item?.product?.name}
                  />
                )
              );
            })
          ) : (
            <div className="flex gap-x-8 w-[80%] mx-auto">
              <div>
                <CardSkeleton />
              </div>
              <div className="hidden md:flex">
                <CardSkeleton />
              </div>
            </div>
          )}
        </div>

        <Section />
      </div>
    </div>
  );
};

export default HeroUsluga;
