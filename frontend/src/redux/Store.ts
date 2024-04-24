import rootReducer from './RootReducer';
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: "root",
    storage,
    whiteList: [],
};
 
export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
})
export const persistor = persistStore(store);
