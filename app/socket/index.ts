import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import asyncStorage, { Keys } from "@utils/asyncStorage";
import client, { baseURL } from "app/api/client";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { TokenResponse } from "app/hooks/useClient";
import { Profile, updateAuthState } from "app/store/auth";
import { io } from "socket.io-client";

const socket = io(baseURL, { path: "/socket-message", autoConnect: false });

export const handleSocketConnection = (
  profile: Profile,
  dispatch: Dispatch<UnknownAction>
) => {
  socket.auth = { token: profile.accessToken };
  socket.connect();

  socket.on("connect_error", async (error) => {
    if (error.message === "jwt expired") {
      const refreshToken = await asyncStorage.get(Keys.REFRESH_TOKEN);

      const res = await runAxiosAsync<TokenResponse>(
        client.post(`${baseURL}/auth/refresh-token`, { refreshToken })
      );

      if (res) {
        await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access);
        await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);

        dispatch(
          updateAuthState({
            profile: { ...profile, accessToken: res.tokens.access },
            pending: false,
          })
        );
        //change auth token and connect to backend api using socket
        socket.auth = { token: res.tokens.access };
        socket.connect();
      }
    }
  });
};

export default socket;
