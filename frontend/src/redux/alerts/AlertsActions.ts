import { Dispatch } from 'redux';
import { AlertAction, IAlertPayload } from './AlertInterface';
import { AlertType } from './AlertTypes';

export const alertSuccess = (payload: IAlertPayload) => {
    return (dispatch: Dispatch<AlertAction>) => {
        dispatch({
            type: AlertType.ALERT_SUCCESS,
            payload
        })
    }
}

export const clearAlert = () => {
    return (dispatch: Dispatch<AlertAction>) => {
        dispatch({
            type: AlertType.CLEAR_ALERT
        })
    }
}

export const alertError = (payload: IAlertPayload) => {
    return (dispatch: Dispatch<AlertAction>) => {
        dispatch({
            type: AlertType.ALERT_ERROR,
            payload
        })
    }
}