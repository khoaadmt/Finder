import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Search_page_index } from "./components/SearchPage/Search_page_index";
import { Not_found_page } from "./components/NotFoundPage/Not_found_page";
import { Facilities_page_index } from "./components/SearchPage/facilities_page/Facilities_page_index";
import { SessionsPage } from "./components/SearchPage/sessions_page/SessionsPage";
import { Login_page } from "./components/Auth/LoginPage/Login_page";
import { SocialRedirect } from "./components/Auth/GoogleRedirect/SocialRedirect";

import { Home_Page } from "./components/HomePage/Home_Page";
import { CreatePostPage } from "./components/Posts/CreatePostPage/CreatePostPage";

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home_Page />} />
                <Route path="search" element={<Search_page_index />}>
                    <Route path="facilities" element={<Facilities_page_index />} />
                    <Route path="sessions" element={<SessionsPage />} />
                </Route>

                <Route path="post">
                    <Route path="create" element={<CreatePostPage />} />
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
