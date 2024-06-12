import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface LastChat {
  id: string;
  lastMessage: string;
  timestamp: string;
  unreadChatCounts: number;
  peerProfile: { id: string; name: string; avatar?: string };
}

const initialState: LastChat[] = [];

const slice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addNewLastChats(state, { payload }: PayloadAction<LastChat[]>) {
      return payload;
    },
  },
});

export const { addNewLastChats } = slice.actions;

export const getLastChats = createSelector(
  (state: RootState) => state,
  ({ chats }) => chats
);

export default slice.reducer;
