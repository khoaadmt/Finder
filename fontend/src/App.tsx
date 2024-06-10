import React from "react";
import { Routes, Route } from "react-router-dom";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { FacilitiesPage } from "./components/SearchPage/facilities_page/FacilitiesPage";
import { SessionsPage } from "./components/SearchPage/sessions_page/SessionsPage";
import { SocialRedirect } from "./components/Auth/GoogleRedirect/SocialRedirect";
import { HomePage } from "./components/HomePage/HomePage";
import { CreatePostPage } from "./components/Posts/CreatePostPage/CreatePostPage";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import { LoginPage } from "./components/Auth/LoginPage/LoginPage";
import { UserProfile } from "./components/User/UserProfile";
import { PostDetailPage } from "./components/Posts/PostDetail/PostDetailPage";
import "./App.css";
import { Test } from "./components/test";

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="test" element={<Test />} />
                <Route path="search" element={<SearchPage />}>
                    <Route path="facilities" element={<FacilitiesPage />} />
                    <Route path="sessions" element={<SessionsPage />} />
                </Route>

                <Route path="post">
                    <Route path="create" element={<CreatePostPage />} />
                    <Route path=":postId" element={<PostDetailPage />} />
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
