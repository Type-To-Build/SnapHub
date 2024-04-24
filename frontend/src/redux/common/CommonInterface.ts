
export interface IResponseData {
    data: any;
    success: boolean;
    message: string;
    [Key: string]: any;
}
export interface IReportAbuseState {
    showModal: boolean;
    reason: string;
}

export interface ISubmitAppealPayload{
   contentId:string,
   reason?:string,
   commentId?:string,
   reasonType?:string
}