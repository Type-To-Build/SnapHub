import { combineReducers } from "redux";
import alertReducer from "./alerts/AlertsReducer";
import NotificationsReducer from "./notifications/NotificationsReducer";
import BookingReducer from "./booking/BookingReducer";

const combineReducer = combineReducers({
  alert: alertReducer,
  notifications: NotificationsReducer,
  booking: BookingReducer
});

const rootReducer = (state: any, action: any) => {
  //action to clear application redux  
  return combineReducer(state, action);
}

export type FCState = ReturnType<typeof rootReducer>;

export default rootReducer;
