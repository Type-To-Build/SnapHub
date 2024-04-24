export interface INotificationsData {
  loading: boolean;
  notifications: any;
  page: number;
  reached: boolean
}

export interface INotificationsBody {
  page?: number;
  perPage?:number;
  filter?:any;
}
