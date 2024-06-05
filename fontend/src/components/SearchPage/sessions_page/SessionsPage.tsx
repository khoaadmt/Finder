import { useEffect, useState } from "react";
import { Pots, ResponseLocation, RootState, FilterOptions } from "../../../interface";
import { Pagination_search_page } from "../pagination/Pagination_search_page";
import { useSearchParams } from "react-router-dom";
import { Post_options } from "../header/Post_options";
import { PostCard } from "./PostCard";
import axios from "axios";
import { message } from "antd";
import "./sessionpage.css";

export const SessionsPage = () => {
    const [latitude, setLat] = useState<number | null>(null);
    const [longitude, setLong] = useState<number | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPosts, setTotalPosts] = useState(5);
    const [data, setData] = useState<Pots[] | null>();
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

    const location = searchParams.get("location");

    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
        };

        getLocation();
    }, []);

    useEffect(() => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("page", pageNumber.toString());
            return newParams;
        });
    }, [pageNumber]);

    useEffect(() => {
        console.log("filterOptions :", filterOptions);
        axios
            .get("http://localhost:5000/api/posts/filter", {
                params: {
                    filter: filterOptions,
                    page: pageNumber,
                    city: location,
                },
            })
            .then((res) => {
                if (res.data.length == 0) {
                    message.info("không có bài viết nào !");
                }
                setData(res.data.rows);

                setTotalPosts(res.data.totalPosts);
            });
    }, [filterOptions, pageNumber, searchParams]);

    return (
        <div className="sessions-content-page min-h-screen flex gap-4">
            <div className="relative w-full">
                <Post_options setFilterOptions={setFilterOptions} />
                <div className="relative w-screen min-h-screen sm:w-full sm:min-h-full transition-all z-[9] sm:static bg-white rounded-xl top-[calc(100vh - 192px)]">
                    <div className="py-[15px] pl-[23px]">
                        <span className="text-lg sm:text-xl font-semibold">
                            {data ? `Tìm thấy ${totalPosts} bài viết` : "Không tìm thấy sân đấu nào"}
                        </span>
                    </div>
                    <div className="px-[15px] grid gap-2 grid-cols-1 md:grid-cols-2">
                        {data &&
                            data?.map((post) => {
                                return <PostCard key={post._id} post={post} />;
                            })}
                    </div>

                    {/* PAGINATION */}
                    <Pagination_search_page setPageNumber={setPageNumber} totalFacility={totalPosts} />
                </div>
            </div>
        </div>
    );
};
