# Tourist Guide Website

**Tourist Guide** is a travel platform designed to help users explore destinations, book tour packages, and connect with tour guides for a seamless travel experience in Bangladesh.

## Features
- **User Roles**: Tourists, Tour Guides, and Admins with dedicated dashboards.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Secure Authentication**: Email/password login, Google authentication, and password recovery.
- **JWT Security**: Token-based authentication for protected routes.
- **Tour Packages**: Browse, book, and manage trips with dynamic homepage packages.
- **Tour Guides**: Connect with guides and explore their profiles.
- **User Stories**: Share, manage, and explore travel experiences.
- **Admin Panel**: Manage users, packages, and guide applications.
- **Stripe Payments**: Seamless payment integration.
- **Notifications**: Toast alerts for various actions.

## Tech Stack
### Frontend
- React.js
- Tailwind CSS
- React Router
- TanStack Query
- Framer Motion
- React Share
- React Datepicker

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication & Security
- Firebase Authentication
- JWT for protected routes

### Payments
- Stripe Integration

## Role Breakdown
### Tourist
- Browse & book tour packages
- Share & manage travel stories
- View booking history & make payments

### Tour Guide
- Manage assigned tours & accept/reject bookings
- Share travel stories

### Admin
- Manage users, packages, and tour guides
- View platform statistics (users, payments, packages)

## Installation Guide
### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.0)
- npm or yarn
- MongoDB (local or cloud)

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   https://github.com/SudiptaRoy05/ExploreEase.git
   cd ExploreEase
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the required Firebase and Stripe credentials.

4. **Run the Backend**
   ```sh
   cd server
   npm install
   npm start
   ```

5. **Run the Frontend**
   ```sh
   cd client
   npm start
   ```

6. **Access the Application**
   Open `http://localhost:3000` in your browser.

## Live Demo
[Explore Now](https://exploreease-c6a3f.web.app/)

## Dependencies
- @stripe/react-stripe-js
- @stripe/stripe-js
- @tanstack/react-query
- axios
- firebase
- framer-motion
- lg-thumbnail.js
- lg-zoom.js
- lightgallery
- lightgallery.js
- localforage
- lottie-react
- match-sorter
- react
- react-datepicker
- react-dom
- react-hook-form
- react-icons
- react-rating-stars-component
- react-responsive-carousel
- react-router-dom
- react-select
- react-share
- react-tabs
- sort-by
- sweetalert2
- swiper

## Firebase Configuration
```js
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};


```

## Contribution
If you’d like to contribute, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.

---
A well-organized README like this ensures clarity and helps both users and developers understand the project better.

