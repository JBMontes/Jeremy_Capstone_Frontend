# The Village App

## Overview
The Village App is a comprehensive safety and emergency service platform designed to leverage community support during critical situations. Inspired by the concept of "it takes a village," this application enables users to quickly notify their emergency contacts and predefined support networks in times of need. By utilizing advanced technologies such as geo-location and push notifications, The Village App ensures swift and efficient communication during emergencies.

## Features
- **Emergency Alerts:** Users can trigger emergency alerts with a single tap, instantly notifying their emergency contacts and predefined support networks.
- **Community Support:** The app fosters community support by allowing users to create and manage predefined support networks, or "villages," comprised of trusted individuals.
- **Geo-location Services:** The Village App utilizes geo-location services to provide precise location information to emergency contacts and support networks.
- **Push Notifications:** Push notifications ensure that emergency alerts are promptly received by all members of the user's support network.
- **User Management:** Village administrators have access to robust tools for managing their communities, including adding and removing members and editing village details.

## Technologies Used
- **Frontend:**
  - JavaScript
  - React
  - HTML
  - CSS
  - MapBox API for maps integration
  - Twilio API for SMS notifications

- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd village-app`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the required environment variables, such as database connection details, API keys, etc.
5. Start the server: `npm start`
6. Navigate to `http://localhost:5555` in your web browser to access the application.

## Usage
- Upon launching the application, users will be prompted to log in or sign up.
- After logging in, users can create and manage their villages, add emergency contacts, and configure notification settings.
- To trigger an emergency alert, users simply need to tap the designated emergency button on the app interface.
- Village administrators can access additional management tools through the admin dashboard.