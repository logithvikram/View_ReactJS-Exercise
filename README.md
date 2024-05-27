# User Management System

This project is a User Management System built with React and Ant Design. It allows users to manage a list of users, including adding, editing, and deleting users. The application fetches user data from a mock API and provides a user-friendly interface for interacting with this data.

## Features

- **User List View**: Displays a list of users with pagination and filtering options.
- **Add User**: Allows the addition of a new user with validation for the input fields.
- **Edit User**: Enables editing the details of an existing user.
- **Delete User**: Supports deleting a user from the list with a confirmation pop-up to prevent accidental deletions.
- **Detail View**: Provides a detailed view of a user when a user row is clicked.
- **Loading State**: Shows a loading spinner while fetching data from the API.
- **Notification System**: Provides success and error notifications for user actions (add, edit, delete).
- **Responsive Design**: The application is responsive, ensuring optimal viewing and interaction experience across various devices.

## Additional Features

- **Filtering**: Users can filter the list by name, city, country, or email.
- **Sorting**: Users can sort the list by created date in ascending or descending order by clicking on the column header.

## Installation

1. Clone the repository:
`git clone https://github.com/logithvikram/View_ReactJS-Exercise.git`

2. Navigate to the project directory:
`cd View_ReactJS-Exercise`

3. Install dependencies:
`npm install`

4. `npm start`
This command runs the app in the development mode. 
Open `http://localhost:3000` to view it in your browser.

## Component Usage

### UserList Component

The UserList component is the main view of the application. It fetches users from the API and displays them in a table with pagination and filtering options.

### AddUser Component

The AddUser component provides a modal form for adding a new user. It includes validation for the input fields.

### EditUser Component

The EditUser component provides a modal form for editing an existing user's details. It includes validation for the input fields.

### UserDetailPage Component

The UserDetailPage component displays detailed information about a user. It uses the useParams hook from react-router-dom to get the user ID from the URL and find the corresponding user from the list. It shows details such as the user's name, avatar, city, country, pincode, street, state, phone, and email.

## MVVM (Model-View-ViewModel) architecture. 
1. Model: This is represented by the userService module which interacts with the API to fetch, create, update, and delete user data. It encapsulates the data logic and communicates with the backend.

2 .View: This is represented by the React components, such as UserList, UserDetail, and Header. These components are responsible for rendering the UI and presenting data to the user. They also handle user interactions (like clicks and form submissions).

3. ViewModel: The useUserDetailViewModel custom hook serves as the ViewModel. It manages the data required by the UserDetail component, fetching user data from the service and providing state management (loading and error states).

# Block Diagram

![user management block](https://github.com/logithvikram/View_ReactJS-Exercise/assets/106614043/da03375b-8e5d-4121-a2dd-537a3ea562d4)
