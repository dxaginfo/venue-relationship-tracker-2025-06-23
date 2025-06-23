import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Layout from './components/Layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import VenueList from './pages/Venues/VenueList';
import VenueDetail from './pages/Venues/VenueDetail';
import BookingList from './pages/Bookings/BookingList';
import BookingDetail from './pages/Bookings/BookingDetail';
import CalendarView from './pages/Calendar/CalendarView';
import DocumentLibrary from './pages/Documents/DocumentLibrary';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound';

// Redux actions
import { checkAuth } from './redux/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="venues" element={<VenueList />} />
        <Route path="venues/:id" element={<VenueDetail />} />
        <Route path="bookings" element={<BookingList />} />
        <Route path="bookings/:id" element={<BookingDetail />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="documents" element={<DocumentLibrary />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;