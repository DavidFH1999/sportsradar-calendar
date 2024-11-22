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
            // TODO add event to localStorage
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