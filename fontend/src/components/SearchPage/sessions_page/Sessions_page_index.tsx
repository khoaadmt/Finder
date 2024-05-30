import React, { useEffect, useState } from "react";
import { Search_page_card } from "../card/Search_page_card";
import { Pots, ResponseLocation, RootState } from "../../../interface";
import { Time_picker_dialog } from "../header/Time_picker_dialog";
import { Button } from "antd";
import axios from "axios";
import { Pagination_search_page } from "../pagination/Pagination_search_page";
import { useSearchParams } from "react-router-dom";
import { Post_Card } from "./Post_Card";
import { Post_options } from "../header/Post_options";
import { useSelector } from "react-redux";

export const Sessions_page_index = () => {
    const [latitude, setLat] = useState<number | null>(null);
    const [longitude, setLong] = useState<number | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPosts, setTotalPosts] = useState(5);
    const [data, setData] = useState<Pots[] | null>();

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
        const newSearchParams = new URLSearchParams();

        searchParams.forEach((value, key) => {
            newSearchParams.set(key, value);
        });
        newSearchParams.set("page", pageNumber.toString());
        setSearchParams(newSearchParams.toString());
    }, [pageNumber]);

    useEffect(() => {
        axios
            .get("api/posts/count", {
                params: {
                    page: pageNumber,
                    city: location,
                },
            })
            .then((response) => {
                setTotalPosts(response.data);
            });
    }, []);

    useEffect(() => {
        const getData = async () => {
            return await axios.get("http://localhost:5000/api/posts", {
                params: {
                    page: pageNumber,
                    city: location,
                },
            });
        };
        getData()
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pageNumber, searchParams]);

    return (
        <div className="min-h-screen flex gap-4">
            <div className="relative w-full">
                <Post_options />
                <div className="relative w-screen min-h-screen sm:w-full sm:min-h-full transition-all z-[9] sm:static bg-white rounded-xl top-[calc(100vh - 192px)]">
                    <div className="py-[15px] pl-[23px]">
                        <span className="text-lg sm:text-xl font-semibold">
                            {data ? `Tìm thấy ${totalPosts} bài viết` : "Không tìm thấy sân đấu nào"}
                        </span>
                    </div>
                    <div className="px-[15px] grid gap-2 grid-cols-1 md:grid-cols-2">
                        {data?.map((post) => {
                            return <Post_Card key={post._id} post={post} />;
                        })}
                    </div>

                    {/* PAGINATION */}
                    <Pagination_search_page setPageNumber={setPageNumber} totalFacility={totalPosts} />
                </div>
            </div>
        </div>
    );
};
