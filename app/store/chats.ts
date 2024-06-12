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
    removeUnreadChatCount(chats, { payload }: PayloadAction<string>) {
      const index = chats.findIndex((chat) => chat.id == payload);
      if (index !== -1) {
        chats[index].unreadChatCounts = 0;
      }
    },
  },
});

export const { addNewLastChats, removeUnreadChatCount } = slice.actions;

export const getLastChats = createSelector(
  (state: RootState) => state,
  ({ chats }) => chats
);

export default slice.reducer;
