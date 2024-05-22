import React, { useState } from "react";
import "./home_page.css";
import { Input_Search } from "../SearchPage/input-search/Input_Search";
export const Home_Page: React.FC = () => {
    return (
        <div className="home-page-container">
            <div className="title-container">
                <p className="title-home-page">Giao Luu Cau Long .com</p>
                <p className="description-home-page">tìm kiếm cơ hội giao lưu gần bạn</p>
            </div>
            <div className="input-search-home-page">
                <Input_Search />
            </div>
        </div>
    );
};
