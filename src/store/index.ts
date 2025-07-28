import { configureStore } from '@reduxjs/toolkit'
import servicesadminReducer from './admin/servicesSlice'

import servicesReducer from './frontend/servicesSlice'


// store/index.ts or store/store.ts



export const store = configureStore({
  reducer: {
    servicesadmin: servicesadminReducer,
    services: servicesReducer,
 
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
