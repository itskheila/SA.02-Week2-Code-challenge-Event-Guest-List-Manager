document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestForm');
    const nameInput = document.getElementById('guestName');
    const categoryInput = document.getElementById('guestCategory');
    const guestList = document.getElementById('guestList');
    const guestCount = document.getElementById('guestCount');
    const attendingCount = document.getElementById('attendingCount');
    let guests = [];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (guests.length >= 10) {
            alert('Guest list is full!');
            return;
        }
        const name = nameInput.value.trim();
        const category = categoryInput.value;
        if (!name) {
            alert('Please enter a guest name.');
            return;
        }
        const guest = {
            name,
            category,
            attending: false
        };
        guests.push(guest);
        renderGuests();
        form.reset();
    });

    function renderGuests() {
    guestList.innerHTML = '';
    let attending = 0;
    guests.forEach((guest, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="guest-details">
                <span class="guest-name">${guest.name}</span>
                <span class="category-tag category-${guest.category}">${guest.category}</span>
                <span class="rsvp-status ${guest.attending ? 'attending' : 'not-attending'}">
                    ${guest.attending ? 'Attending' : 'Not Attending'}
                </span>
            </div>
            <div class="button-container">
                <button class="toggle-rsvp-btn">${guest.attending ? 'Mark Not Attending' : 'Mark Attending'}</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        li.querySelector('.toggle-rsvp-btn').onclick = () => {
            guest.attending = !guest.attending;
            renderGuests();
        };
        li.querySelector('.remove-btn').onclick = () => {
            guests.splice(index, 1);
            renderGuests();
        };
        if (guest.attending) attending++;
        guestList.appendChild(li);
    });
    guestCount.textContent = guests.length;
    attendingCount.textContent = attending;
}
});