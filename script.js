//#region Event Listener
document.addEventListener('DOMContentLoaded', () => {
    //initializeEvents();
    generateCalendar();
    const addEventButton = document.getElementById('addEventButton');
    const logo = document.querySelector('.logo-link');
    const calendarLink = document.querySelector('.calendar-link');
    const addEventLink = document.querySelector('.add-event-link');
    const filterButton = document.getElementById('filter-button');
    const resetButton = document.getElementById('reset-button');

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

    filterButton.addEventListener('click', () => {
        const sportFilter = document.getElementById('sport-filter').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        // Check if any field is empty
        if (!sportFilter || !startDate || !endDate) {
            alert("Please fill in all filters!");
        } else if (startDate > endDate) {
            alert("Start date must be before end date!");
        } else {
            alert("Filter applied!");
        }
    })

    resetButton.addEventListener('click', () => {
        document.getElementById('sport-filter').value = 'all';
        document.getElementById('start-date').value = '';
        document.getElementById('end-date').value = '';
        
        alert("Filters reset!");
    })
});
//#endregion Event Listener

//#region Show a specific section
function showSection(sectionId) {
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('addEvent').style.display = 'none';
    document.getElementById('events').style.display = 'none';
    document.getElementById('filter-container').classList.remove('d-flex');
    document.getElementById('filter-container').style.display = 'none';
    if (sectionId === 'calendar') {
        document.getElementById('filter-container').classList.add('d-lg-flex');
        document.getElementById('filter-container').style.display = 'block';
    }
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

    generateCalendar();
    // Hide the feedback message after 2 seconds
    setTimeout(() => {
        feedbackMessage.style.display = 'none';
    }, 2000);
}
//#endregion Add Event to localStorage

//#region Generate the calendar
function generateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.querySelector('#calendar-header').textContent = `Event Calendar - ${monthNames[new Date().getMonth()]}`;

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    // Retrieve events from local storage
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Filter events to only keep those in the current month and year
    const currentMonthEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });

    // Create day cells for the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = day;
        dayCell.setAttribute('data-day', day);

        // Check if there are events on this day
        const dayEvents = currentMonthEvents.filter(event => {
            return new Date(event.date).getDate() === day;
        });

        // Set the title attribute to a string of event names (hover for tooltip)
        if (dayEvents.length > 0) {
            const eventTeams = dayEvents.map(event => event.sport + ' between ' + event.teams).join('\n');
            dayCell.setAttribute('title', eventTeams);
        }

        // Mark the day if there are any events
        if (dayEvents.length > 0) {
            const eventMarker = document.createElement('span');
            eventMarker.classList.add('event-marker');
            eventMarker.textContent = '•';
            dayCell.appendChild(eventMarker);
        }

        // Add click event listener to the day cell
        dayCell.addEventListener('click', () => {
            displayEvents(dayEvents, day);
        });

        // Add the created cell to the calendar grid
        calendarGrid.appendChild(dayCell);
    }
}
//#endregion Generate the calendar

//#region Display Events
function displayEvents(dayEvents, day) {
    const eventsContainer = document.querySelector('.events-list');
    eventsContainer.style.display = 'block';
    eventsContainer.innerHTML = `<h3>Events on Day ${day}</h3>`;

    if (dayEvents.length === 0) {
        eventsContainer.innerHTML += `<p>No events for this day.</p>`;
    } else {
        const eventList = document.createElement('ul');
        dayEvents.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.textContent = `${event.sport} between ${event.teams} at ${event.time}`;
            eventList.appendChild(eventItem);
        });
        eventsContainer.appendChild(eventList);
    }
}
//#endregion Display Events

//#region Initialize Events
async function initializeEvents() {
    // Check if 'events' already exist in local storage
    if (localStorage.getItem('events')) {
        console.log('Events already exist in local storage. Initialization skipped.');
        return;
    }

    try {
        // Fetch data from events.json
        const response = await fetch('events.json');
        if (!response.ok) {
            throw new Error('Failed to fetch events.json');
        }

        // Parse the JSON data
        const events = await response.json();

        // Save the data to local storage
        localStorage.setItem('events', JSON.stringify(events));

        console.log('Events successfully loaded into local storage.');
    } catch (error) {
        console.error('Error initializing events:', error);
    }
}
//#endregion Initialize Events