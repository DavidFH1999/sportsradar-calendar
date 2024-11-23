//#region Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const addEventButton = document.getElementById('addEventButton');
    const logo = document.querySelector('.logo-link');
    const calendarLink = document.querySelector('.calendar-link');
    const addEventLink = document.querySelector('.add-event-link');

    // Event listener for the logo
    logo.addEventListener('click', function () {
        showSection('calendar');
    });

    // Event listener for the calendar link
    calendarLink.addEventListener('click', function () {
        showSection('calendar');
    });

    // Event listener for the add event link
    addEventLink.addEventListener('click', function () {
        showSection('addEvent');
    });

    // Event listener for the "Add Event" button
    addEventButton.addEventListener('click', () => {
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventSport = document.getElementById('eventSport').value;
        const eventTeams = document.getElementById('eventTeams').value;

        // Check if any field is empty
        if (!eventDate || !eventTime || !eventSport || !eventTeams) {
            alert("Please fill in all fields!");
        } else {
            addEvent();
        }
    });
});
//#endregion Event Listener

//#region Show a specific section
function showSection(sectionId) {
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('addEvent').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';

    // Close the navigation bar on smaller devices
    closeNavbar();
}
//#endregion Show a specific section


//#region Close the navigation bar on smaller devices
function closeNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
}
//#endregion Close the navigation bar on smaller devices

//#region Add Event to localStorage
function addEvent() {
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventSport = document.getElementById('eventSport').value;
    const eventTeams = document.getElementById('eventTeams').value;

    // Create an object to store the data
    const newEvent = {
        id: Date.now(),
        date: eventDate,
        time: eventTime,
        sport: eventSport,
        teams: eventTeams
    };

    // Retrieve existing events from local storage or initialize to an empty array if none exist
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Add the new event to the array
    events.push(newEvent);

    // Save the updated events array back to local storage
    localStorage.setItem('events', JSON.stringify(events));

    // Clear the form fields after submission
    document.getElementById('eventForm').reset();

    // Show feedback message
    const feedbackMessage = document.getElementById('feedback');
    feedbackMessage.textContent = "Event successfully added!";
    feedbackMessage.style.display = 'block';

    // Hide the feedback message after 2 seconds
    setTimeout(() => {
        feedbackMessage.style.display = 'none';
    }, 2000);
}
//#endregion Add Event to localStorage