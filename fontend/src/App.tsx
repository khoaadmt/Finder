import React from "react";
import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import { Test } from "./components/test";
import PrivateRoute from "./components/PrivateRoute";
import { SocialRedirect } from "./components/Auth/GoogleRedirect/SocialRedirect";
import { LoginPage } from "./components/Auth/LoginPage/LoginPage";
import { HomePage } from "./components/User/HomePage/HomePage";
import { LocationDetail } from "./components/User/Location/LocationDetail";
import { CreatePostPage } from "./components/User/Posts/CreatePostPage/CreatePostPage";
import { PostDetailPage } from "./components/User/Posts/PostDetail/PostDetailPage";
import { SearchPage } from "./components/User/SearchPage/SearchPage";
import { FacilitiesPage } from "./components/User/SearchPage/facilities_page/FacilitiesPage";
import { SessionsPage } from "./components/User/SearchPage/sessions_page/SessionsPage";
import { MyBookedCourts } from "./components/User/UserPage/MyBookedCourts";
import { MyPost } from "./components/User/UserPage/MyPost";
import { UserProfile } from "./components/User/UserPage/UserProfile";
import "./App.css";

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="search" element={<SearchPage />}>
                    <Route path="facilities" element={<FacilitiesPage />} />
                    <Route path="sessions" element={<SessionsPage />} />
                </Route>

                <Route path="post">
                    <Route path="create" element={<PrivateRoute />}>
                        <Route path="" element={<CreatePostPage />} />
                    </Route>

                    <Route path=":postId" element={<PostDetailPage />} />
                </Route>

                <Route path="location">
                    <Route path=":locationId" element={<LocationDetail />} />
                </Route>

                <Route path="login" element={<LoginPage />} />
                <Route path="auth">
                    <Route path="social/redirect" element={<SocialRedirect />} />
                </Route>

                <Route path="user" element={<PrivateRoute />}>
                    <Route path="update-profile" element={<UserProfile />} />
                    <Route path="my-post" element={<MyPost />} />
                    <Route path="my-booked-courts" element={<MyBookedCourts />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default App;
