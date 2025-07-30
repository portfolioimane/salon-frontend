import { configureStore } from '@reduxjs/toolkit'
import servicesadminReducer from './admin/servicesSlice'

import servicesReducer from './frontend/servicesSlice'
import businesshoursReducer from './frontend/businessHoursSlice'
import bookingReducer from './frontend/bookingSlice'
import backendbookingReducer from './admin/backendBookingsSlice'


// store/index.ts or store/store.ts



export const store = configureStore({
  reducer: {
    servicesadmin: servicesadminReducer,
    services: servicesReducer,
    businessHours:businesshoursReducer,
    booking:bookingReducer,
    backendBookings:backendbookingReducer,

 
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
