import React, { useEffect, useState } from "react";
import { Search_page_card } from "../card/Search_page_card";
import { ResponseLocation } from "../../../interface";
import { Time_picker_dialog } from "../header/Time_picker_dialog";
import { Button } from "antd";
import axios from "axios";

export const Sessions_page_index = () => {
    const [latitude, setLat] = useState<number | null>(null);
    const [longitude, setLong] = useState<number | null>(null);
    const radius = 5;
    const [data, setData] = useState<ResponseLocation[] | null>(null);

    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
        };

        getLocation();
    }, []);

    // useEffect(() => {
    //     async function getData() {
    //         if (latitude !== null && longitude !== null) {
    //             const res = await axios.get("api/search/nearby", {
    //                 params: {
    //                     radius: radius,
    //                     latitude: latitude,
    //                     longitude: longitude,
    //                 },
    //             });
    //             return res;
    //         }
    //     }

    //     getData().then((res) => {
    //         if (res?.data) {
    //             setData(res.data);
    //         }
    //     });
    // }, [latitude, longitude]);
    
        const handleClick = () => {
          window.open("http://localhost:5000/auth/google/login", "_self");
        };
    return (
        <> <Button onClick={handleClick} > Login</Button>  </>
        // <div className="min-h-screen flex gap-4">
        //     <div className="relative w-full">
        //         <div className="relative w-screen min-h-screen sm:w-full sm:min-h-full transition-all z-[9] sm:static bg-white rounded-xl top-[calc(100vh-192px)]">
        //             <div className="flex justify-center sm:hidden">
        //                 <button>
        //                     <svg
        //                         stroke="currentColor"
        //                         fill="currentColor"
        //                         strokeWidth="0"
        //                         viewBox="0 0 1024 1024"
        //                         className="fill-[#c6c6c6]"
        //                         height="32"
        //                         width="32"
        //                         xmlns="http://www.w3.org/2000/svg">
        //                         <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
        //                     </svg>
        //                 </button>
        //             </div>
        //             <div className="sm:hidden pb-[15px] w-full text-center relative -top-1">
        //                 <span className="text-sm">Tìm thêm hoạt động</span>
        //             </div>
        //             <div className="py-[15px] pl-[23px]">
        //                 <span className="text-lg sm:text-xl font-semibold">Tìm thấy 1 hoạt động</span>
        //             </div>

        //             <Search_page_card />

        //             <div className="w-full flex justify-center pt-[20px] pb-[48px]">
        //                 <button className="mt-[10px] py-[10px] px-[20px] font-semibold rounded-full text-center whitespace-nowrap hover:shadow-md transition bg-primary text-white">
        //                     <span>Xem thêm</span>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};
