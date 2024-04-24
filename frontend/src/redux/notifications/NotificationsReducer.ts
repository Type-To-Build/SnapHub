
import { createSlice } from '@reduxjs/toolkit';
import { INotificationsData } from './NotificationsInterface';

const initialState: INotificationsData = {
  loading: false,
  notifications: [],
  page: 1,
  reached: false
};


export const notificatoinsSlice = createSlice({
  name: 'notificatoins',
  initialState: initialState,
  reducers: {
    notificationFeatchingRequest: (state, action) => {
      state.loading = action.payload;
    },
    notificationsList: (state, action) => {
      state.page = action.payload.page
      state.reached = action.payload.notifications?.length == 0

      if (action.payload.page > 1) {
        state.notifications = [...state.notifications]
      } else {
        state.notifications = action.payload.notifications
      }
    },
  },
});
export const notificatoinsActions = { ...notificatoinsSlice.actions };

export default notificatoinsSlice.reducer
