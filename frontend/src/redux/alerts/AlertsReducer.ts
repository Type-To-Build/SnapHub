import { AlertAction, IAlertState } from './AlertInterface';
import { AlertType } from './AlertTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAlertState = {
    status: '',
    message: '',
    open: false,
    delay: 4000
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState: initialState,
    reducers: {
      alertSuccess: (state,action) => {
        state.open= true
        state.status= 'success'
        state.message= action.payload.message
        state.delay= action.payload?.delay ? action.payload.delay : state.delay
      },
      clearAlert: (state) => {
        state.open = false;
      },
      alertError: (state,action) => {
        state.open= true
        state.status= 'error'
        state.message= action.payload.message
        state.delay= action.payload?.delay ? action.payload.delay : state.delay
      },
    },
  });
  export const alertActions = { ...alertSlice.actions};

  export default alertSlice.reducer
