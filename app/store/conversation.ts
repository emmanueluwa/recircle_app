import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
}

interface Chat {
  text: string;
  time: string;
  id: string;
  viewed: boolean;
  user: UserProfile;
}

export interface Conversation {
  id: string;
  chats: Chat[];
  peerProfile: { avatar?: string; name: string; id: string };
}

type UpdatePayload = {
  chat: Chat;
  conversationId: string;
  peerProfile: UserProfile;
};

interface InitialState {
  conversations: Conversation[];
}

const initialState: InitialState = {
  conversations: [],
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation(
      state,
      { payload }: PayloadAction<InitialState["conversations"]>
    ) {
      state.conversations = payload;
    },
    updateConversation(
      { conversations },
      { payload }: PayloadAction<UpdatePayload>
    ) {
      const index = conversations.findIndex(
        ({ id }) => id === payload.conversationId
      );
      if (index === -1) {
        //-1 returned means no conversations match the id, hence new one is created
        conversations.push({
          id: payload.conversationId,
          chats: [payload.chat],
          peerProfile: payload.peerProfile,
        });
      } else {
        conversations[index].chats.push(payload.chat);
      }
    },
  },
});

export const { addConversation, updateConversation } = slice.actions;

export default slice.reducer;
