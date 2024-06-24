import { useEffect, useState } from "react";
import { SearchPageHeader } from "../SearchPage/header/SearchPageHeader";

import { useSelector } from "react-redux";

import { MyFooter } from "../Footer/Footer";
import { CarryOutOutlined } from "@ant-design/icons";
import PostService from "../../../services/post/PostService";
import { RootState } from "../../../interface";

export const MyPost = () => {
    const [posts, setPosts] = useState();
    const postService = new PostService();
    const user = useSelector((state: RootState) => state.auth.login.currentUser);

    useEffect(() => {
        if (user) {
            postService.getPostByUserName(user?.username).then((posts) => {
                console.log(posts);
            });
        }
    }, []);
    return (
        <div>
            <SearchPageHeader defaultSelectedKeys="" />
            <div className="booked-court-title">
                <CarryOutOutlined /> Bài viết đã đăng
            </div>
            {/* <MyFooter></MyFooter> */}
        </div>
    );
};
