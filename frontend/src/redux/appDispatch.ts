import { useDispatch } from 'react-redux'
import { store } from './Store';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
