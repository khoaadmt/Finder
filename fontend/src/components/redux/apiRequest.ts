import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
    RegisterFailure,
    RegisterSuccess,
    Registerstart,
    setFailureState,
    setFetchingState,
    setSuccessState,
} from "./authSlice";
import { message } from "antd";
import { Token } from "../../interface";

export const loginUser = async (user: any, dispatch: any, navigate: any) => {
    dispatch(setFetchingState);
    try {
        const res = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
                username: user.username,
                password: user.password,
            },
            {
                withCredentials: true,
            }
        );

        const payload = jwtDecode(res.data.accessToken) as { [key: string]: any };
        let { iat, exp, ...newPayload } = payload;
        newPayload.accessToken = res.data.accessToken;
        newPayload.refreshToken = res.data.refreshToken;
        dispatch(setSuccessState(newPayload));

        navigate("/");
    } catch (err: any) {
        message.error({ content: err.response.data.message, duration: 2 });
        dispatch(setFailureState(err.response.data));
    }
};

export const loginWithSocial = async (token: Token, dispatch: any, navigate: any) => {
    dispatch(setFetchingState);

    const payload = jwtDecode(token.accessToken) as { [key: string]: any };
    let { iat, exp, ...newPayload } = payload;
    newPayload.accessToken = token.accessToken;
    newPayload.refreshToken = token.refreshToken;

    dispatch(setSuccessState(newPayload));

    navigate("/");
};

export const registerUser = async (user: any, dispatch: any, navigate: any) => {
    dispatch(Registerstart);
    try {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
            username: user.username,
            password: user.password,
            displayName: user.displayName,
        });
        dispatch(RegisterSuccess(res.data));
        loginUser(user, dispatch, navigate);
    } catch (err: any) {
        message.error({ content: err.response.data.message, duration: 2 });
        dispatch(RegisterFailure(err.response.data));
    }
};
