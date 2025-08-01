import { configureStore } from '@reduxjs/toolkit'
import servicesadminReducer from './admin/servicesSlice'

import servicesReducer from './frontend/servicesSlice'
import businesshoursReducer from './frontend/businessHoursSlice'
import bookingReducer from './frontend/bookingSlice'
import backendbookingReducer from './admin/backendBookingsSlice'
import financeReducer from './admin/financeSlice'
import employeeReducer from './admin/employeeSlice'
import campaignsReducer from './admin/campaignSlice'
import productsReducer from './admin/productSlice'
import reportReducer from './admin/reportSlice'
import galleryReducer from './admin/gallerySlice'
import authReducer from './authSlice';



// store/index.ts or store/store.ts



export const store = configureStore({
  reducer: {
    servicesadmin: servicesadminReducer,
    services: servicesReducer,
    businessHours:businesshoursReducer,
    booking:bookingReducer,
    backendBookings:backendbookingReducer,
    finance:financeReducer,
    employee:employeeReducer,
    campaigns:campaignsReducer,
    report:reportReducer,
    gallery:galleryReducer,
    products:productsReducer,
        auth: authReducer,



 
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
