import React, { useEffect } from "react";
import "aos/dist/aos.css";
import "country-flag-icons/react/3x2";
import Doctor from "../../assets/doctor1.png";
import AOS from "aos";
import C4Icon from "../../../public/c4.png";

export const Page: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container">
      <div className="h-screen flex flex-col justify-between relative overflow-hidden">
        <div data-aos={"fade-in"}>
          <div className="relative bg-[#A5CCFF] rounded-br-[50%] rounded-bl-[50%] [100px] overflow-hidden bg-no-repeat bg-cover bg-center flex justify-center mb-0">
            <div
              data-aos="fade-up"
              className="flex items-center justify-center h-[350px]"
            >
              <img
                src={Doctor}
                className="relative z-10 bottom-[-10%] w-full max-w-xs h-auto object-contain"
                alt="Doctor"
              />
            </div>
            <img
              src="/icon1.png"
              alt="image"
              className="absolute w-[100px] z-10 h-[100px] left-[8%] top-[10%] animate-c4"
              data-aos="zoom-in"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
            />
            <img
              src="/icon2.png"
              alt="image"
              className="absolute w-[90px] z-10 h-[90px] right-8 top-[20%]"
              data-aos="zoom-in"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
            />
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              data-aos-anchor-placement="top-center"
              className="absolute pt-[150px] z-10 w-full h-full flex flex-col justify-center items-center text-white"
            >
              <div className="bg-white rounded-lg border-[3px] z-10 border-[#2664EB] py-1 px-3">
                <h1 className="text-center font-bold text-lg leading-6 text-[#2664EB] ">
                  <span className="text-[#FE0113] text-[24px]">
                    REPRODUKTOLOG
                  </span>
                  <br />
                  ABDUJABBOR MUXIDDINOV
                </h1>
              </div>
              <div className="bg-[#2664EB] rounded-lg border-[3px] border-white py-1 mt-[-7px] px-3">
                <h1 className="text-center font-bold text-xl leading-6 text-white ">
                  BILAN BOG'LANISH
                </h1>
              </div>
            </div>
          </div>
          <div
            className="relative z-10 will-change-transform"
            data-aos="fade-down"
          >
            <div className="absolute blur-sm top-[85%] left-[17%] -z-10 w-full h-full">
              <img
                className="w-[60px] h-[60px] object-cover"
                src={C4Icon}
                alt="icon"
              />
            </div>
            <div className="absolute blur-sm top-[-10%] left-[70%] -z-10 w-full h-full ">
              <img
                data-aos-duration="5000"
                className="w-[60px] h-[60px]"
                src={C4Icon}
                alt="icon"
              />
            </div>
            <div className="backdrop-blur-[3px] p-11 flex flex-col gap-3">
              <a
                href="tel:+998332308080"
                className={
                  "w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition flex items-center justify-center gap-2"
                }
              >
                <i className="bx bxs-phone text-xl"></i>
                <span>Telefon orqali</span>
              </a>
              <a
                href="https://t.me/DrAbdujabbor"
                className={
                  "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition flex items-center justify-center gap-2"
                }
              >
                <i className="bx bxl-telegram text-xl"></i>
                <span>Telegram orqali</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
