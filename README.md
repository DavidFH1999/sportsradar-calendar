# Sportsradar Event Calendar

## Overview

The **Sportsradar Event Calendar** is a responsive web-based application that allows users to view, manage, and filter sports events on a calendar. Built using plain HTML, CSS, and JavaScript, the application provides an interactive user interface to enhance the experience of tracking and managing events.

This project demonstrates core frontend programming concepts, including dynamic UI creation, handling user interactions, and responsive design. The project also includes some optional features, such as persistent local storage for saving events and filtering functionality.

## Features

### Core Features
- **Calendar View**: Displays the current month's calendar with markers for days having events.
- **Event Details**: View details of specific events by clicking on them.
- **Add New Events**: Add custom events dynamically via a form.
- **Responsive Design**: Fully responsive interface for mobile, tablet, and desktop devices.
- **Navigation System**: Navigate between calendar view and the "Add Event" page.

### Optional Features Implemented
- **Filters**: Filter events by sport and date range.
- **Persistent Storage**: Events are stored in the browser's local storage, enabling data retention between sessions.

## Setup and Usage

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, or Edge).

### Steps to Run the Application
1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/DavidFH1999/sportsradar-calendar.git
   ```
2. **Navigate to the Project Folder**:  
   Open the folder where the repository was cloned.
3. **Run the Application**:  
   Open the `index.html` file in your web browser.
4. **Usage Instructions**:
   - **View Events**: Use the "Calendar" button in the navigation bar to view events.
   - **Add Events**: Use the "Add Event" button in the navigation bar to access the form.
   - **Filter Events**: Use the filter options to narrow down events by sport or date.

## Technical Details

- **Technologies Used**:
  - HTML, CSS, and JavaScript for UI and functionality.
  - Local storage for data persistence between sessions.
  - CSS media queries for responsiveness.

- **Core Concepts**:
  - Dynamic DOM manipulation for calendar generation and event interactions.
  - Event delegation for handling user interactions.
  - Local storage for saving and retrieving event data.

- **File Structure**:
  ```
    sportsradar-calendar/
    ├── index.html         # Main HTML file
    ├── styles.css         # CSS file for styling
    ├── script.js          # JavaScript for functionality
    ├── events.json        # Sample data for events
    ├── README.md          # Documentation
    ├── LICENSE            # License information
    ├── images/            # Folder for images
        └── Sportradar-Brand-Line_Color_Black.svg
  ```

## Assumptions and Decisions
- Events are stored in local storage for simplicity; no backend database is used.
- The application focuses on runtime functionality rather than persistent server storage.
- Filters are limited to sport and date range.
- The design prioritizes functionality over visual aesthetics but maintains usability.

## Testing
The project was tested manually on:
- **Desktop Browsers**: Chrome, Firefox, Edge.
- **Mobile Devices**: Responsive views tested via browser developer tools.

## Future Enhancements
- Add automated tests using a framework like Jest or Cypress.
- Integrate a backend for centralized event storage.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.