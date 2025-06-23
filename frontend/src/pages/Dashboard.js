import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { 
  MusicNote as MusicNoteIcon, 
  Event as EventIcon,
  Schedule as ScheduleIcon,
  AttachMoney as AttachMoneyIcon 
} from '@mui/icons-material';

import { fetchVenues } from '../redux/slices/venueSlice';
import { fetchBookings } from '../redux/slices/bookingSlice';

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderTop: `4px solid ${color}`
    }}
  >
    <Typography variant="h6" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h3" component="div">
        {value}
      </Typography>
      <Box sx={{ color: color }}>
        {icon}
      </Box>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { venues, isLoading: venuesLoading } = useSelector(state => state.venues);
  const { bookings, isLoading: bookingsLoading } = useSelector(state => state.bookings);
  
  useEffect(() => {
    dispatch(fetchVenues());
    dispatch(fetchBookings());
  }, [dispatch]);
  
  // Calculate statistics (in a real app, these would come from the backend)
  const totalVenues = venues.length;
  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.performance_date) > new Date()
  ).length;
  const pastBookings = bookings.filter(booking => 
    new Date(booking.performance_date) <= new Date() && 
    booking.status === 'completed'
  ).length;
  const totalRevenue = bookings.reduce((sum, booking) => 
    booking.status === 'completed' ? sum + (booking.fee || 0) : sum, 0
  );

  if (venuesLoading || bookingsLoading) {
    return <Typography>Loading dashboard data...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Venues"
            value={totalVenues}
            icon={<MusicNoteIcon fontSize="large" />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Bookings"
            value={upcomingBookings}
            icon={<ScheduleIcon fontSize="large" />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Past Performances"
            value={pastBookings}
            icon={<EventIcon fontSize="large" />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={<AttachMoneyIcon fontSize="large" />}
            color="#f44336"
          />
        </Grid>
      </Grid>
      
      {/* Additional dashboard content would go here */}
    </Box>
  );
};

export default Dashboard;