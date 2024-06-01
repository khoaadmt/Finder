import React, { useEffect, useState } from "react";
import { Search_page_card } from "../card/Search_page_card";
import { Facility } from "../../../interface";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Facilities_card } from "./Facilities_card";
import { Pagination_search_page } from "../pagination/Pagination_search_page";
import { getLocation } from "../../utils/location";

export const Facilities_page_index: React.FC = () => {
    const [data, setData] = useState<Facility[] | null>();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = searchParams.get("location");
    const [pageNumber, setPageNumber] = useState(1);
    const [totalFacility, setTotalFacility] = useState(0);

    useEffect(() => {
        axios
            .get("api/search/facilities/countByCity", {
                params: {
                    city: location,
                },
            })
            .then((response) => {
                setTotalFacility(response.data);
            });
    }, []);

    useEffect(() => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("page", pageNumber.toString());
            return newParams;
        });
    }, [pageNumber]);

    useEffect(() => {
        getLocation().then((resolve) => {
            getData(resolve.latitude, resolve.longitude).then((res) => {
                if (res.data) {
                    setData(res.data);
                }
            });
        });
        async function getData(latitude: number, longitude: number) {
            const res = await axios.get("api/search/facilities", {
                params: {
                    city: location,
                    page: pageNumber,
                    latitude: latitude,
                    longitude: longitude,
                },
            });
            return res;
        }
    }, [searchParams]);

    console.log(totalFacility);
    return (
        <div className="min-h-screen flex gap-4">
            <div className="relative w-full">
                <div className="relative w-screen min-h-screen sm:w-full sm:min-h-full transition-all z-[9] sm:static bg-white rounded-xl top-[calc(100vh - 192px)]">
                    <div className="flex justify-center sm:hidden">
                        <button>
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 1024 1024"
                                className="fill-[#c6c6c6]"
                                height="32"
                                width="32"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="sm:hidden pb-[15px] w-full text-center relative -top-1">
                        <span className="text-sm">Tìm thêm hoạt động</span>
                    </div>
                    <div className="py-[15px] pl-[23px]">
                        <span className="text-lg sm:text-xl font-semibold">
                            {data ? `Tìm thấy ${totalFacility} sân đấu` : "Không tìm thấy sân đấu nào"}
                        </span>
                    </div>
                    <div className="px-[15px] grid gap-2 grid-cols-1 md:grid-cols-2">
                        {data?.map((facility) => {
                            return <Facilities_card key={facility.Name} facility={facility} />;
                        })}
                    </div>

                    {/* PAGINATION */}
                    <Pagination_search_page setPageNumber={setPageNumber} totalFacility={totalFacility} />
                </div>
            </div>
        </div>
    );
};
