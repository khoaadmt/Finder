import React, { useState } from "react";
import "./home_page.css";
import { Input_Search } from "../SearchPage/input-search/Input_Search";
export const Home_Page: React.FC = () => {
    return (
        <div className="home-page-container">
            <Input_Search />
        </div>
    );
};
