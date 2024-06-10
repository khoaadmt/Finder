import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Search_page_index } from "./components/SearchPage/Search_page_index";
import { FacilitiesPage } from "./components/SearchPage/facilities_page/FacilitiesPage";
import { SessionsPage } from "./components/SearchPage/sessions_page/SessionsPage";
import { SocialRedirect } from "./components/Auth/GoogleRedirect/SocialRedirect";
import { HomePage } from "./components/HomePage/HomePage";
import { CreatePostPage } from "./components/Posts/CreatePostPage/CreatePostPage";
import { UserProfile } from "./components/user/UserProfile";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import { LoginPage } from "./components/Auth/LoginPage/LoginPage";

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="test" element={<HomePage />} />
                <Route path="search" element={<Search_page_index />}>
                    <Route path="facilities" element={<FacilitiesPage />} />
                    <Route path="sessions" element={<SessionsPage />} />
                </Route>

                <Route path="post">
                    <Route path="create" element={<CreatePostPage />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="auth">
                    <Route path="social/redirect" element={<SocialRedirect />} />
                </Route>
                <Route path="user">
                    <Route path="update-profile" element={<UserProfile />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default App;
