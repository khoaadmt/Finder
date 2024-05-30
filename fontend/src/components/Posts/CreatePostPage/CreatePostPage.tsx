import React from "react";
import { CreatePostContent } from "./CreatePostContent";
import { Search_Page_header } from "../../SearchPage/header/Search_Page_Header";

export const CreatePostPage = () => {
    return (
        <>
            <Search_Page_header defaultSelectedKeys={"4"} />
            <CreatePostContent />
        </>
    );
};
