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
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            username: user.username,
            password: user.password,
        });
        const payload = jwtDecode(res.data.access_token) as { [key: string]: any };
        let { iat, exp, ...newPayload } = payload;
        newPayload.access_token = res.data.access_token;
        newPayload.refresh_token = res.data.refresh_token;

        dispatch(setSuccessState(newPayload));

        navigate("/");
    } catch (err: any) {
        message.error({ content: err.response.data.message, duration: 2 });
        dispatch(setFailureState(err.response.data));
    }
};

export const loginWithSocial = async (token: Token, dispatch: any, navigate: any) => {
    dispatch(setFetchingState);

    const payload = jwtDecode(token.access_token) as { [key: string]: any };
    let { iat, exp, ...newPayload } = payload;
    newPayload.access_token = token.access_token;
    newPayload.refresh_token = token.refresh_token;

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
