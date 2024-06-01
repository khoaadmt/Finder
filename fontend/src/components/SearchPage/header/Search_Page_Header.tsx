import React, { useEffect, useState } from "react";
import { Input_Search } from "../input-search/Input_Search";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Dropdown, Menu, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../interface";
import "./search_page_header.css";
import { FormOutlined, LogoutOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { logOutSuccess } from "../../redux/authSlice";

interface Props {
    defaultSelectedKeys: string;
}
export const Search_Page_header: React.FC<Props> = (props) => {
    const { defaultSelectedKeys } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const user = useSelector((state: RootState) => state.auth.login.currentUser);
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menuItems = [
        { key: "1", label: "Home" },
        { key: "2", label: "Tìm kiếm" },
        { key: "3", label: "Đặt sân" },
        { key: "4", label: "Đăng tin" },
    ];

    const items = [
        { key: "1", label: "Trang cá nhân", icon: <UserOutlined /> },
        { key: "2", label: "Logout", icon: <LogoutOutlined /> },
        { key: "3", label: "Bài viết của tôi", icon: <FormOutlined /> },
    ];

    const handleClickHeaderMenu = (e: any) => {
        switch (e.key) {
            case "1":
                navigate("/");
                break;
            case "2":
                navigate(`/search/sessions?location=${"Hà Nội"}&type=${"Giao lưu"}&page=${1}`);
                break;
            case "3":
                if (!user) {
                    message.error("Bạn cần đăng nhập để có thể đăng tin.");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                }
                break;
            case "4":
                if (!user) {
                    message.error("Bạn cần đăng nhập để có thể đặt sân.");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                } else {
                    navigate("/post/create");
                }
                break;
            default:
                break;
        }
    };
    const handleLogOut = () => {
        dispatch(logOutSuccess());
        navigate("/");
    };
    const handleDropdownItemClick = (e: any) => {
        if (e.key == 2) {
            handleLogOut();
        }
    };
    return (
        <header className="sticky top-0 z-10 bg-white shadow-[rgba(0,0,0,0.1)_0px_10px_20px_-8px] pt-2">
            <nav className="sticky top-0 z-10 w-full bg-white py-3 sm:py-4">
                <div className="max-w-[2520px] mx-auto xl:px-6 md:px-5 sm:px-2 px-[15px]">
                    <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 md:gap-6">
                        <div className="flex-[4] hidden sm:flex">
                            <Menu
                                className="w-full menu-search-page-header"
                                mode="horizontal"
                                defaultSelectedKeys={[defaultSelectedKeys]}
                                items={menuItems}
                                onClick={handleClickHeaderMenu}
                                style={{ color: "black" }}
                            />
                        </div>
                        <div className="flex-[4]">
                            <Input_Search />
                        </div>
                        <div className="flex-[2] flex justify-end items-center gap-2 sm:gap-4">
                            <div className="flex justify-end flex-shrink-0 relative false">
                                <div className="flex flex-row items-center gap-3">
                                    {user ? (
                                        <Dropdown
                                            menu={{ items, onClick: handleDropdownItemClick }}
                                            placement="bottom"
                                            trigger={["click"]}>
                                            <button className="p-1 sm:p-2 md:py-2 md:pl-4 md:pr-3 border border-neutral-200 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition">
                                                <div className="font-semibold hidden lg:block whitespace-nowrap truncate">
                                                    {user ? user.displayName : <Link to="/login">{"Login"}</Link>}
                                                </div>
                                                <div className="flex-shrink-0">
                                                    {user && (
                                                        <img
                                                            alt="Avatar"
                                                            loading="lazy"
                                                            width="30"
                                                            height="30"
                                                            decoding="async"
                                                            data-nimg="1"
                                                            className="rounded-full aspect-square object-cover"
                                                            src={user.avaUrl}
                                                            style={{ color: "transparent" }}
                                                        />
                                                    )}
                                                </div>
                                            </button>
                                        </Dropdown>
                                    ) : (
                                        <button className="p-1 sm:p-2 md:py-2 md:pl-4 md:pr-3 border border-neutral-200 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition">
                                            <div className="font-semibold hidden lg:block whitespace-nowrap truncate">
                                                <Link to="/login">{"Login"}</Link>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
