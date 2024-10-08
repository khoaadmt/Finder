import React from "react";
import { InputSearch } from "../SearchPage/input_search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, message } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import "./home-page.css";
import { RootState } from "../../../interface";
import { setSuccessState } from "../../../redux/authSlice";
import { createAxios } from "../../createInstance";

export const HomePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, setSuccessState);
    // useEffect(() => {
    //     const getData = async () => {
    //         const res = await axiosJWT.post(
    //             "http://localhost:5000/api/auth/logout",
    //             {},
    //             {
    //                 headers: { Authorization: `Bearer ${user?.accessToken}` },
    //             }
    //         );
    //         return res;
    //     };
    //     getData().then((data) => {
    //         console.log(data);
    //     });
    // });
    const items = [
        {
            key: "1",
            label: "Home",
        },
        {
            key: "2",
            label: "Tìm kiếm",
        },
        {
            key: "3",
            label: "Đặt sân",
        },
        {
            key: "4",
            label: "Đăng tin",
        },
    ];

    const loginItem = [
        {
            key: "1",
            label: "Login",
        },
    ];
    const handleMenuRightClick = (e: any) => {
        navigate("/login");
    };
    const handleMenuLeftClick = (e: any) => {
        if (e.key == 2) {
            navigate(`/search/sessions?location=${"Hà Nội"}&type=${"Giao lưu"}`);
        }
        if (e.key == 3) {
            if (!user) {
                message.error("Bạn cần đăng nhập để có thể đặt sân.");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                navigate("/search/facilities?location=Hà+Nội&type=Sân+đấu");
            }
        }
        if (e.key == 4) {
            if (!user) {
                message.error("Bạn cần đăng nhập để có thể đăng tin.");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                navigate("/post/create");
            }
        }
    };
    const handleDropdownItemClick = (e: any) => {};
    return (
        <>
            <Header
                style={{
                    position: "absolute",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                }}>
                <div className="logo"></div>
                <Menu
                    className="menu-header-left-home-page "
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    items={items}
                    onClick={handleMenuLeftClick}
                />
                {!user && (
                    <Menu
                        className="menu-header-right-home-page"
                        theme="dark"
                        mode="horizontal"
                        items={loginItem}
                        onClick={handleMenuRightClick}></Menu>
                )}
            </Header>
            <div className="home-page-content">
                <div className="title-container ">
                    <p className="title-home-page">Giao Luu Cau Long .com</p>
                    <p className="description-home-page">tìm kiếm cơ hội giao lưu gần bạn</p>
                </div>
                <div className="input-search-home-page">
                    <InputSearch />
                </div>
            </div>
        </>
    );
};
