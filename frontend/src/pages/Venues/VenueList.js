import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Rating,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

import { fetchVenues, deleteVenue } from '../../redux/slices/venueSlice';
import VenueForm from '../../components/Venues/VenueForm';

const VenueList = () => {
  const dispatch = useDispatch();
  const { venues, isLoading } = useSelector((state) => state.venues);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const handleOpenDialog = (venue = null) => {
    setSelectedVenue(venue);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVenue(null);
  };

  const handleDeleteVenue = (id) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      dispatch(deleteVenue(id));
    }
  };

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (venue.address.city && venue.address.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <Typography>Loading venues...</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Venues</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Venue
        </Button>
      </Box>

      <Box mb={3} display="flex" alignItems="center">
        <TextField
          label="Search venues"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon color="action" />,
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVenues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No venues found. Add your first venue!
                </TableCell>
              </TableRow>
            ) : (
              filteredVenues.map((venue) => (
                <TableRow key={venue._id}>
                  <TableCell>
                    <RouterLink 
                      to={`/venues/${venue._id}`} 
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Typography fontWeight="bold">{venue.name}</Typography>
                    </RouterLink>
                  </TableCell>
                  <TableCell>
                    {venue.address.city}, {venue.address.state}
                  </TableCell>
                  <TableCell>
                    {venue.venue_type.charAt(0).toUpperCase() + venue.venue_type.slice(1)}
                  </TableCell>
                  <TableCell>{venue.capacity || 'N/A'}</TableCell>
                  <TableCell>
                    <Rating value={venue.rating || 0} readOnly size="small" />
                  </TableCell>
                  <TableCell>
                    {venue.tags && venue.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleOpenDialog(venue)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteVenue(venue._id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedVenue ? 'Edit Venue' : 'Add New Venue'}
        </DialogTitle>
        <DialogContent>
          <VenueForm venue={selectedVenue} onClose={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VenueList;