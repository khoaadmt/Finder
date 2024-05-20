import React from "react";
import { useSearchParams } from "react-router-dom";

export const GoogleRedirect: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");

    return <div>Hello window!</div>;
};
