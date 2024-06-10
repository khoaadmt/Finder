import { jwtDecode } from "jwt-decode";

import {
    RegisterFailure,
    RegisterSuccess,
    Registerstart,
    UpdateUserSuccess,
    setFailureState,
    setFetchingState,
    setSuccessState,
} from "./authSlice";
import { message } from "antd";
import { Token } from "../interface";
import { createAxios } from "../components/createInstance";
import AuthService from "../services/auth/AuthService";
const authService = new AuthService();

export const loginUser = async (user: any, dispatch: any, navigate: any) => {
    dispatch(setFetchingState);
    try {
        const data = {
            username: user.username,
            password: user.password,
        };
        const res = await authService.login(data);

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
export const updateUserInfo = async (dispatch: any, valuesUpdate: any, user: any) => {
    let axiosJWT = createAxios(user, dispatch, setSuccessState);
    axiosJWT
        .put(
            `http://localhost:5000/api/user/${user.username}`,
            {
                displayName: valuesUpdate.displayName,
                contactPhone: valuesUpdate.contactPhone,
                facebookId: valuesUpdate.facebookId,
                avaUrl: valuesUpdate.avaUrl,
            },
            {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            }
        )
        .then((res: any) => {
            const newUser = res.data.user;
            newUser.username = user.username;
            newUser.accessToken = user.accessToken;
            newUser.refreshToken = user.refreshToken;

            dispatch(UpdateUserSuccess(newUser));
            message.success(res.data.message);
        })
        .catch((err: any) => {
            console.log("err :", err);
            message.error(err.message);
        });
};
export const registerUser = async (user: any, dispatch: any, navigate: any) => {
    dispatch(Registerstart);
    try {
        const data = {
            username: user.username,
            password: user.password,
            displayName: user.displayName,
        };
        const res = await authService.register(data);

        dispatch(RegisterSuccess(res.data));
        loginUser(user, dispatch, navigate);
    } catch (err: any) {
        message.error({ content: err.response.data.message, duration: 2 });
        dispatch(RegisterFailure(err.response.data));
    }
};
