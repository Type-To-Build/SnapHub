import { AlertType } from './AlertTypes';

interface IAlertSuccess {
    type: AlertType.ALERT_SUCCESS;
    payload: IAlertPayload;
}

interface IClearAlert {
    type: AlertType.CLEAR_ALERT;
}

interface IAlertError {
    type: AlertType.ALERT_ERROR;
    payload: IAlertPayload;
}

export type AlertAction = IAlertSuccess | IClearAlert | IAlertError;

export interface IAlertState {
    status: string;
    message: string;
    open: boolean;
    delay: number;
}

export interface IAlertPayload {
    message: string;
    delay?: number;
}