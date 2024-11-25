//#region Event Listener
document.addEventListener('DOMContentLoaded', () => {
    initializeEvents();
    generateCalendar(getStoredEvents());
    initializeFilter();
    const elements = getDOMElements();

    elements.logo.addEventListener('click', () => showSection('calendar'));
    elements.calendarLink.addEventListener('click', () => showSection('calendar'));
    elements.addEventLink.addEventListener('click', () => showSection('addEvent'));
    elements.addEventButton.addEventListener('click', addEvent);
    elements.filterButton.addEventListener('click', filterEvents);
    elements.resetButton.addEventListener('click', resetFilters);
});

// Helper to get reusable DOM elements
function getDOMElements() {
    return {
        logo: document.querySelector('.logo-link'),
        calendarLink: document.querySelector('.calendar-link'),
        addEventLink: document.querySelector('.add-event-link'),
        addEventButton: document.getElementById('addEventButton'),
        filterButton: document.getElementById('filter-button'),
        resetButton: document.getElementById('reset-button'),
    };
}
//#endregion Event Listener

//#region Display functions
function showSection(sectionId) {
    const sections = ['calendar', 'addEvent', 'events', 'filter-container'];
    sections.forEach((section) => {
        document.getElementById(section).style.display = 'none';
    });

    const filterContainer = document.getElementById('filter-container');
    if (sectionId === 'calendar') {
        filterContainer.classList.add('d-lg-flex');
        filterContainer.style.display = 'block';
    } else {
        filterContainer.classList.remove('d-lg-flex');
    }

    document.getElementById(sectionId).style.display = 'block';
    closeNavbar();
}

// Close the navbar on smaller devices
function closeNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
}
//#endregion Show a specific section

//#region Event functions
function addEvent() {
    const eventDetails = {
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        sport: document.getElementById('eventSport').value,
        teams: document.getElementById('eventTeams').value,
    };

    // Check if any field is empty
    if (Object.values(eventDetails).some(value => !value)) {
        alert("Please fill in all fields!");
        return;
    }

    // Create an object to store the data
    const newEvent = {
        id: Date.now(),
        ...eventDetails,
    };

    // Retrieve existing events from local storage or initialize to an empty array if none exist
    const events = getStoredEvents();

    // Add the new event to the array
    events.push(newEvent);

    // Save the updated events array back to local storage
    saveEvents(events);

    // Clear the form fields after submission
    document.getElementById('eventForm').reset();
    displayFeedback("Event successfully added!");
    generateCalendar();
}

function displayFeedback(message) {
    const feedbackMessage = document.getElementById('feedback');
    feedbackMessage.textContent = message;
    feedbackMessage.style.display = 'block';
    setTimeout(() => (feedbackMessage.style.display = 'none'), 2000);
}

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

async function initializeEvents() {
    if (localStorage.getItem('events')) return;

    try {
        const response = await fetch('events.json');
        if (!response.ok) throw new Error('Failed to fetch events.json');
        const events = await response.json();
        saveEvents(events);
    } catch (error) {
        console.error('Error initializing events:', error);
    }
}
//#endregion Event functions

//#region Generate calendar
function generateCalendar(filteredEvents = getStoredEvents()) {
    const calendarGrid = document.querySelector('.calendar-grid');
    const { year, month } = getCurrentDateDetails();

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Update the calendar header current month
    document.querySelector('#calendar-header').textContent = `Event Calendar - ${getMonthName(month)}`;
    calendarGrid.innerHTML = '';

    // Create day cells for the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = createDayCell(day, filteredEvents);

        // Add the created cell to the calendar grid
        calendarGrid.appendChild(dayCell);
    }
}

function createDayCell(day, filteredEvents) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');
    dayCell.textContent = day;
    dayCell.setAttribute('data-day', day);

    const dayEvents = filteredEvents.filter(event => new Date(event.date).getDate() === day);
    if (dayEvents.length > 0) {
        dayCell.setAttribute('title', dayEvents.map(event => `${event.sport} between ${event.teams}`).join('\n'));

        const eventMarker = document.createElement('span');
        eventMarker.classList.add('event-marker');
        eventMarker.textContent = '•';
        dayCell.appendChild(eventMarker);
    }

    dayCell.addEventListener('click', () => displayEvents(dayEvents, day));
    return dayCell;
}
//#endregion Generate the calendar

//#region Filter functions
function filterEvents() {
    const sportFilter = document.getElementById('sport-filter').value;
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);

    if (!sportFilter || isNaN(startDate) || isNaN(endDate)) {
        alert("Please fill in all filters!");
        return;
    }

    if (startDate > endDate) {
        alert("Start date must be before end date!");
        return;
    }

    // Filter events based on the selected sport and date range
    const filteredEvents = getStoredEvents().filter(event => {
        const eventDate = new Date(event.date);
        return (sportFilter === 'all' || event.sport === sportFilter) &&
            eventDate >= startDate && eventDate <= endDate;
    });

    generateCalendar(filteredEvents);

}

function resetFilters() {
    document.getElementById('sport-filter').value = 'all';
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';

    generateCalendar();
}

function initializeFilter() {
    const sportFilter = document.getElementById('sport-filter');

    // Populate the sport filter dropdown
    const uniqueSports = [...new Set(getStoredEvents().map(event => event.sport))];
    uniqueSports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport;
        option.textContent = sport;
        sportFilter.appendChild(option);
    });
}
//#endregion Filter functions

//#region Utility functions
function getStoredEvents() {
    return JSON.parse(localStorage.getItem('events')) || [];
}

function saveEvents(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

function getCurrentDateDetails() {
    const currentDate = new Date();
    return { year: currentDate.getFullYear(), month: currentDate.getMonth() };
}

function getMonthName(monthIndex) {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][monthIndex];
}
//#endregion Utility functions