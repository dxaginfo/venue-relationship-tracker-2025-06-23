# Venue Relationship Tracker

A comprehensive web application for musicians to track venue relationships, manage bookings, and analyze performance history.

## Overview

The Venue Relationship Tracker helps musicians and bands build and maintain professional relationships with venues by providing tools to:

- Track venue details, contacts, and communication history
- Manage booking requests and performance history
- Store contracts and important documents
- Visualize booking data and track revenue
- Integrate with calendar tools for scheduling

## Features

### Venue Management
- Store comprehensive venue profiles including contacts, capacity, and technical details
- Rate and categorize venues for easy reference
- Add custom notes and tags

### Contact Tracking
- Log all communications with venues (emails, calls, meetings)
- Set follow-up reminders
- Track key contacts at each venue

### Booking Management
- Create and track booking requests
- Manage booking status (pending, confirmed, completed, cancelled)
- Store booking contracts and agreements

### Performance History
- Log details about past performances (date, attendance, pay)
- Rate venues based on experience
- Add notes about venue's technical setup and staff

### Calendar Integration
- View all bookings on an integrated calendar
- Export bookings to external calendar tools
- Avoid scheduling conflicts

### Analytics Dashboard
- See how frequently you perform at each venue
- Track revenue by venue
- Analyze which venues provide the best return on effort

### Document Storage
- Store contracts, riders, and agreements with venues
- Create and save templates for common documents
- Organize documents by venue

## Technology Stack

### Frontend
- React.js with Material-UI
- Redux for state management
- Formik with Yup for form validation
- Chart.js for analytics visualization
- FullCalendar.js for calendar integration

### Backend
- Node.js with Express
- MongoDB for database
- JWT authentication
- AWS S3 for document storage
- SendGrid for email notifications

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- AWS account (for S3 storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/venue-relationship-tracker-2025-06-23.git
cd venue-relationship-tracker-2025-06-23
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd ../frontend
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory
   - Add the following environment variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name
SENDGRID_API_KEY=your_sendgrid_api_key
```

5. Start the backend server
```bash
cd backend
npm run dev
```

6. Start the frontend application
```bash
cd frontend
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
venue-relationship-tracker/
├── backend/                 # Node.js/Express API
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
├── frontend/                # React.js application
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # React components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
├── docs/                    # Documentation files
└── scripts/                 # Utility scripts
```

## API Documentation

The API documentation is available at `/api/docs` when the server is running.

## Deployment

### Backend
The backend can be deployed to Heroku:
```bash
heroku create
git subtree push --prefix backend heroku main
```

### Frontend
The frontend can be deployed to Netlify:
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `build` directory to Netlify

## Security Considerations
- All API routes are protected with JWT authentication
- Passwords are hashed using bcrypt
- API requests are rate-limited to prevent abuse
- Input validation is implemented to prevent injection attacks
- HTTPS is enforced for all connections

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Material-UI](https://mui.com/)
- [Redux](https://redux.js.org/)
- [Chart.js](https://www.chartjs.org/)
- [FullCalendar](https://fullcalendar.io/)