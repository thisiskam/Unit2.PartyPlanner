const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-ftb-et-web-am/events`

const state = {
    events: []
}

const eventsList = document.querySelector('#events')
const addEventForm = document.querySelector('#addEvent')

addEventForm.addEventListener('submit', createEvent)

async function render() {
    await getEvents()
    renderEvents()
}
render()
console.log(state);

async function getEvents() {
    try {
        const response =  await fetch(API_URL)
        const json = await response.json()
        state.events = json.data
        console.log(state);
    } catch(error){
        console.log(error);
    }
}

async function deleteEvent(id){
    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
        })

        if(!response.ok){
            throw new error('Event Could Not Be Deleted')
        }
    } catch(error) {
        console.log(error);
    }
    render()
}

function renderEvents() {
    if(!state.events){
        const noEvents = document.createElement('h1')
        noEvents.innerHTML= 'THERE ARE NO UPCOMING EVENTS'
        eventsList.replaceChildren(...noEvents)
    }

    const renderedEvents = state.events.map((event) => {
        const singleEvent = document.createElement('li')
        singleEvent.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <h4>${event.date}</h4>
        <h5>${event.location}</h5>`
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete Event"
        singleEvent.append(deleteButton)

        deleteButton.addEventListener('click', () => deleteEvent(event.id))

        return singleEvent
    });

    eventsList.replaceChildren(...renderedEvents)
}

async function createEvent(event) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: addEventForm.name.value,
                description: addEventForm.description.value,
                date: new Date(addEventForm.date.value),
                location: addEventForm.location.value
            }) 
        })
        
        if (!response.ok) {
            throw new Error("Failed to create event");
          }

        render();

    } catch(error) {
        console.log(error);
    }

}

