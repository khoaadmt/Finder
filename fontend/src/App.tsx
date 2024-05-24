import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Search_page_index } from "./components/SearchPage/Search_page_index";
import { Home_Page } from "./components/HomePage/Home_Page";
import { Not_found_page } from "./components/NotFoundPage/Not_found_page";
import { Facilities_page_index } from "./components/SearchPage/facilities_page/Facilities_page_index";
import { Sessions_page_index } from "./components/SearchPage/sessions_page/Sessions_page_index";
import { Login_page } from "./components/Auth/LoginPage/Login_page";
import { SocialRedirect } from "./components/Auth/GoogleRedirect/SocialRedirect";
import { CreatePostPage } from "./components/Posts/CreatePostPage";
import { PicturesWall } from "./components/Posts/PictureWall/PicturesWall";

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home_Page />} />
                <Route path="search" element={<Search_page_index />}>
                    <Route path="facilities" element={<Facilities_page_index />} />
                    <Route path="sessions" element={<Sessions_page_index />} />
                </Route>

                <Route path="post">
                    <Route path="create" element={<CreatePostPage />} />
                    <Route path="picturewall" element={<PicturesWall />} />
                </Route>
                <Route path="login" element={<Login_page />} />
                <Route path="auth">
                    <Route path="social/redirect" element={<SocialRedirect />} />
                </Route>
                <Route path="*" element={<Not_found_page />} />
            </Routes>
        </div>
    );
};

export default App;
