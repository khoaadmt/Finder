import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginWithSocial } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

export const SocialRedirect: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const token = {
            access_token: access_token || "",
            refresh_token: refresh_token || "",
        };
        loginWithSocial(token, dispatch, navigate);
    }, []);
    return <div>Hello window!</div>;
};
