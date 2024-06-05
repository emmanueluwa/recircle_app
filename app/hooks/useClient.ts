import { baseURL } from "app/api/client";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import useAuth from "./useAuth";
import asyncStorage, { Keys } from "@utils/asyncStorage";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, updateAuthState } from "app/store/auth";

const authClient = axios.create({ baseURL });

type Response = { tokens: { refresh: string; access: string } };

const useClient = () => {
  //token to send request
  // const { authState } = useAuth();
  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();

  const token = authState.profile?.accessToken;

  //add token into auth header for authClient
  authClient.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    //read refresh token from async storage
    const refreshToken = await asyncStorage.get(Keys.REFRESH_TOKEN);

    //send request with token to get new access and refresh tokens
    const options = {
      method: "POST",
      data: { refreshToken },
      url: `${baseURL}/auth/refresh-token`,
    };

    const res = await runAxiosAsync<Response>(axios(options));

    if (res?.tokens) {
      failedRequest.response.config.headers.Authorization =
        "Bearer " + res.tokens.access;

      //to handle sign out if token is expired
      if (failedRequest.response.config.url === "/auth/sign-out") {
        failedRequest.response.config.data = {
          refreshToken: res.tokens.refresh,
        };
      }
      await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access);
      await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);

      dispatch(
        updateAuthState({
          profile: { ...authState.profile!, accessToken: res.tokens.access },
          pending: false,
        })
      );

      return Promise.resolve();
    }
  };

  createAuthRefreshInterceptor(authClient, refreshAuthLogic);

  return { authClient };
};

export default useClient;
