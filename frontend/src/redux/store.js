import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import venueReducer from './slices/venueSlice';
import bookingReducer from './slices/bookingSlice';
import contactReducer from './slices/contactSlice';
import communicationReducer from './slices/communicationSlice';
import documentReducer from './slices/documentSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    venues: venueReducer,
    bookings: bookingReducer,
    contacts: contactReducer,
    communications: communicationReducer,
    documents: documentReducer
  }
});