import React, { useEffect, useState } from "react";
import PostService from "../../../services/post/PostService";
import { useParams, useSearchParams } from "react-router-dom";
import { Pots } from "../../../interface";
import { SearchPageHeader } from "../../SearchPage/header/SearchPageHeader";
import { Button, Carousel } from "antd";
import { memberLevel } from "../../../utils/Constant";
import "./postdetail.css";
const map_icon = require("../../../assets/images/map.png");
const support_icon = require("../../../assets/images/support.png");
export const PostDetailPage = () => {
    const postService = new PostService();
    const { postId } = useParams();
    const [postDetail, setPostDetail] = useState<Pots | null>();
    console.log("postDetail :", postDetail);
    useEffect(() => {
        postService.getPostById(postId).then((res) => {
            setPostDetail(res.data[0]);
        });
    }, []);

    const getLabel = (value: number | undefined) => {
        const level = memberLevel.find((level) => level.value === value);
        return level ? level.label : "Unknown";
    };

    const handleBtnZaloCick = (phone: string) => {
        window.open(`https://zalo.me/${phone}`, "_blank");
    };
    const handleConcat = (str1: number | undefined, str2: number | undefined) => {
        return " " + str1 + " - " + str2;
    };
    return (
        <div>
            <SearchPageHeader defaultSelectedKeys="" />

            <div className="max-w-[884px] sm:px-3 mx-auto mb-5 sm:mt-5">
                <div className="grid grid-cols-1 md:grid-cols-6 md:gap-6">
                    <div className="col-span-4 flex flex-col space-y-8">
                        <div className=" ">
                            <Carousel className="slide-image bg-gray-500" arrows infinite={false}>
                                {postDetail &&
                                    postDetail.images?.map((imgUrl) => {
                                        return (
                                            <div key={imgUrl}>
                                                <img alt="Description image" loading="lazy" src={imgUrl} />
                                            </div>
                                        );
                                    })}
                            </Carousel>
                        </div>

                        <div className="px-3 sm:px-0 space-y-2 !mt-6 text-sm sm:text-base">
                            <div className="w-full pb-2">
                                <h2 className="text-2xl font-bold text-black-ish-200 leading-none sm:leading-normal">
                                    {postDetail?.title}
                                </h2>
                            </div>
                            <address className="flex gap-2 items-start sm:pl-1">
                                <img className="w-[16px] h-[16px] ml-1" src={map_icon} alt="" />
                                <span className="flex text-black-ish-100">
                                    Địa chỉ:
                                    {postDetail?.location.address}
                                </span>
                            </address>
                            <div className="flex gap-2 items-center sm:pl-1">
                                <span className="text-black-ish-100 truncate">🏟️ Sân cầu: VNBC</span>
                            </div>
                            <div className="flex gap-2 items-center sm:pl-1">
                                {/* <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    className="flex-shrink-0 fill-primary stroke-primary"
                                    height={20}
                                    width={20}
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M336 256c-20.56 0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52 15.47 16.62 23 39.22 21.26 63.63-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256zm66-88zm65.83 264H204.18a27.71 27.71 0 0 1-22-10.67 30.22 30.22 0 0 1-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05 31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 0 1-5.32 25.78A27.68 27.68 0 0 1 467.83 432zM147 260c-35.19 0-66.13-32.72-69-72.93-1.42-20.6 5-39.65 18-53.62 12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52-2.87 40.2-33.8 72.91-68.93 72.91zm65.66 31.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46 0-58.07 7.68-80.57 21.62-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 0 0 4.79 23.36A25.32 25.32 0 0 0 41.72 400h111a8 8 0 0 0 7.87-6.57c.11-.63.25-1.26.41-1.88 8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 0 0-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89z" />
                                </svg> */}
                                <img className="w-[16px] h-[16px] ml-1" src={support_icon} alt="" />
                                <span className="text-black-ish-100 truncate">
                                    Cần tuyển:
                                    {" " + postDetail?.memberCount}
                                    (Nam/Nữ)
                                </span>
                            </div>
                            <div className="flex gap-2 items-center sm:pl-1">
                                {/* <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    className="flex-shrink-0 fill-primary stroke-primary"
                                    height={20}
                                    width={20}
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M64 448v-64h64v-64h64v-64h64v-64h64v-64h64V64h64v384z" />
                                </svg> */}
                                <span className="text-black-ish-100 truncate">
                                    {`💪 Trình độ: ${getLabel(postDetail?.levelMemberMin)} - ${getLabel(
                                        postDetail?.levelMemberMax
                                    )}`}
                                </span>
                            </div>
                            <div className="flex gap-2 items-center sm:pl-1">
                                {/* <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    className="flex-shrink-0 fill-primary stroke-primary"
                                    height={20}
                                    width={20}
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M403.29 32H280.36a14.46 14.46 0 0 0-10.2 4.2L24.4 281.9a28.85 28.85 0 0 0 0 40.7l117 117a28.86 28.86 0 0 0 40.71 0L427.8 194a14.46 14.46 0 0 0 4.2-10.2v-123A28.66 28.66 0 0 0 403.29 32z"
                                    />
                                    <path d="M352 144a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" />
                                    <path
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="m230 480 262-262a13.81 13.81 0 0 0 4-10V80"
                                    />
                                </svg> */}
                                <span className="text-black-ish-100 truncate">
                                    💵 Phí giao lưu:
                                    {postDetail?.agreement
                                        ? "Thỏa thuận"
                                        : handleConcat(postDetail?.priceMin, postDetail?.priceMax)}
                                </span>
                            </div>
                        </div>
                        <hr className="mx-3 sm:mx-0" />
                        <div className="px-3 sm:px-0">
                            <div className="w-full flex justify-center items-center rounded-xl overflow-hidden" />
                        </div>
                        <div className="px-3 sm:px-0 text-xl font-semibold flex flex-row items-center gap-2">
                            Mô tả thêm
                        </div>
                        <div className="px-3 sm:px-0 text-black-ish-100 whitespace-pre-line !mt-4 text-sm sm:text-base">
                            {postDetail?.description}
                        </div>
                        <hr className="mx-3 sm:mx-0" />
                        <hr className="mx-3 sm:mx-0" />
                    </div>
                    <div className="bg-white w-full fixed left-0 bottom-0 shadow-[rgba(0,0,0,0.2)_0px_2px_20px_0px] pb-4 rounded-xl md:static md:shadow-none md:pb-10 md:col-span-2 sm:z-0 z-20">
                        <div className="sticky top-[102px] space-y-4">
                            <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden flex flex-col gap-2 p-4">
                                <div className="text-xl font-semibold">Người đăng tin</div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex-1 h-full flex gap-2 items-center pr-4 py-2">
                                        <img
                                            alt="Avatar"
                                            loading="lazy"
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            data-nimg={1}
                                            className="rounded-full aspect-square object-cover"
                                            style={{ color: "transparent" }}
                                            src={postDetail?.user.avaUrl}
                                        />
                                        <span className="text-black-ish-200"> {postDetail?.user.displayName} </span>
                                    </div>
                                    <hr />
                                    <div className="flex-1 flex gap-2 items-center h-full">
                                        <p className="text-nowrap">Liên hệ:</p>
                                        <div>
                                            {postDetail?.phones.map((phone) => {
                                                return (
                                                    <span>
                                                        <p className="pb-2 text-neutral-600 whitespace-pre-line truncate hidden sm:block">
                                                            <Button
                                                                onClick={() => handleBtnZaloCick(phone)}
                                                                className="btn-zalo"
                                                                type="primary">
                                                                zalo
                                                            </Button>
                                                            <a href={`tel:${phone}`} className="text-sky-500 ml-1">
                                                                {phone}
                                                            </a>
                                                        </p>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 w-full flex gap-2 justify-center items-center">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative hover:opacity-80 transition cursor-pointer group-hover:opacity-80">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                viewBox="0 0 16 16"
                                                className="fill-neutral-500/70"
                                                height={16}
                                                width={16}
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                                            </svg>
                                        </div>
                                        <span className="text-black-ish-100 underline whitespace-nowrap">Chia sẻ</span>
                                    </div>
                                    <button className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative hover:opacity-80 transition cursor-pointer group-hover:opacity-80">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                viewBox="0 0 16 16"
                                                className="fill-neutral-500/70"
                                                height={16}
                                                width={16}
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                                            </svg>
                                        </div>
                                        <span className="text-black-ish-100 underline whitespace-nowrap">
                                            Báo vi phạm
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
