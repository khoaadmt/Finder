import React from "react";
import { Header_options } from "./Header_options";
import { Input_Search } from "../input-search/Input_Search";
import { useSearchParams } from "react-router-dom";
import { Switch } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { RootState } from "../../../interface";
interface Props {
    hasOptions: boolean;
}
export const Search_Page_header: React.FC<Props> = (props) => {
    const { hasOptions } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const user = useSelector((state: RootState) => state.auth.login.currentUser);

    return (
        <header className="sticky top-0 z-10 bg-white shadow-[rgba(0,0,0,0.1)_0px_10px_20px_-8px] pt-2">
            <nav className="sticky top-0 z-10 w-full bg-white py-3 sm:py-4">
                <div className="max-w-[2520px] mx-auto xl:px-6 md:px-5 sm:px-2 px-[15px]">
                    <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 md:gap-6">
                        <div className="lg:flex-1 hidden sm:flex">
                            <a id="logo" className="flex justify-center items-start text-2xl false" href="/">
                                <span className="overflow-hidden">GiaoLưuCầuLông</span>
                                <img
                                    alt="logo"
                                    loading="lazy"
                                    width="42"
                                    height="42"
                                    decoding="async"
                                    data-nimg="1"
                                    className="logo-to-red"
                                    style={{ color: "transparent" }}
                                    src={require("../../../assets/images/badminton.png")}
                                />
                            </a>
                        </div>
                        <Input_Search />
                        <div className="lg:flex-1 flex justify-end items-center gap-2 sm:gap-4">
                            {/* <div className="flex items-center gap-2 lg:overflow-hidden flex-shrink-0 lg:flex-shrink">
                                <div className="whitespace-nowrap truncate hidden lg:block">Mở bản đồ</div>
                                <Switch autoFocus={true} />
                            </div> */}
                            <div className="flex justify-end flex-shrink-0 relative false">
                                <div className="flex flex-row items-center gap-3">
                                    <button className="p-1 sm:p-2 md:py-2 md:pl-4 md:pr-3 border border-neutral-200 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition">
                                        <div className="font-semibold hidden lg:block whitespace-nowrap truncate">
                                            {user?.displayName}
                                        </div>
                                        <div className="flex-shrink-0">
                                            <img
                                                alt="Avatar"
                                                loading="lazy"
                                                width="30"
                                                height="30"
                                                decoding="async"
                                                data-nimg="1"
                                                className="rounded-full aspect-square object-cover"
                                                src="https://lh3.googleusercontent.com/a/ACg8ocKYdXQ3ysg8N_MRwyot0rxlUoFg_X2r-0MNOwW-_hoq3dBcjA=s96-c"
                                                style={{ color: "transparent" }}
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {hasOptions && <Header_options />}
        </header>
    );
};
