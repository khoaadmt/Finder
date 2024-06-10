import React from "react";
import { CreatePostContent } from "./CreatePostContent";
import { SearchPageHeader } from "../../SearchPage/header/SearchPageHeader";

export const CreatePostPage = () => {
    return (
        <>
            <SearchPageHeader defaultSelectedKeys={"4"} />
            <CreatePostContent />
        </>
    );
};
