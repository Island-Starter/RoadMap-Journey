const closenav = document.querySelector('.close');
const nav = document.querySelector('.nav-container');
const appointmentList = document.querySelector('.appoitment-home');
const appointment = document.querySelector('.Appointment-container');
const main = document.querySelector('.home-section');
const home = document.querySelector('.home-container');

const navItems = nav.querySelectorAll(
    '.home-container, .Appointment-container, .Message-container, .Medical-container, .bill-container, .setting-container, .profile-container, .logout-container'
);

if (window.matchMedia('(max-width: 700px)').matches) {
    nav.classList.add('opennavs');
    document.body.classList.add('nav-collapsed');
    closenav.setAttribute('aria-expanded', 'false');
    closenav.setAttribute('aria-label', 'Open navigation');
    closenav.querySelector('i').classList.replace('fa-chevron-left', 'fa-chevron-right');
}

closenav.addEventListener('click', () => {
    const isClosed = nav.classList.toggle('opennavs');
    const icon = closenav.querySelector('i');

    document.body.classList.toggle('nav-collapsed', isClosed);
    closenav.setAttribute('aria-expanded', String(!isClosed));
    closenav.setAttribute('aria-label', isClosed ? 'Open navigation' : 'Close navigation');
    icon.classList.toggle('fa-chevron-left', !isClosed);
    icon.classList.toggle('fa-chevron-right', isClosed);
});

home.addEventListener('click', () => {
    main.classList.remove('out');
})

appointment.addEventListener('click', () => {
    main.classList.add('out');
});

appointmentList.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const dotButton = event.target.closest('.app-card-dot');
    const deleteButton = event.target.closest('.remove');

    if (deleteButton) {
        deleteButton.closest('.app-card').remove();
        return;
    }

    if (dotButton) {
        const card = dotButton.closest('.app-card');
        const menu = card.querySelector('.dot-inside');
        const shouldOpen = !menu.classList.contains('dot');

        appointmentList.querySelectorAll('.dot-inside.dot').forEach((openMenu) => {
            openMenu.classList.remove('dot');
        });
        menu.classList.toggle('dot', shouldOpen);
    }
});

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        navItems.forEach((navItem) => navItem.classList.remove('active'));
        item.classList.add('active');
    });
});

const calendarDays = document.querySelector('.calendar-days');
const calendarSelectedDate = document.querySelector('.calendar-selected-date');
const calendarCaption = document.querySelector('.calendar-caption');
let selectedCalendarDate = new Date();
selectedCalendarDate.setHours(0, 0, 0, 0);

function renderCalendar() {
    const year = selectedCalendarDate.getFullYear();
    const month = selectedCalendarDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const mondayOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cellCount = Math.ceil((mondayOffset + daysInMonth) / 7) * 7;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    calendarSelectedDate.textContent = selectedCalendarDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).replace(' ', ', ');
    calendarCaption.textContent = selectedCalendarDate.getTime() === today.getTime()
        ? 'Today'
        : 'Selected date';
    calendarDays.setAttribute(
        'aria-label',
        selectedCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    );
    calendarDays.replaceChildren();

    for (let index = 0; index < cellCount; index += 1) {
        const date = new Date(year, month, index - mondayOffset + 1);
        const dayButton = document.createElement('button');
        const isSelected = date.getTime() === selectedCalendarDate.getTime();

        dayButton.className = 'calendar-day';
        dayButton.type = 'button';
        dayButton.textContent = String(date.getDate());
        dayButton.setAttribute(
            'aria-label',
            date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })
        );
        if (date.getMonth() !== month) {
            dayButton.classList.add('outside-month');
        }
        if (isSelected) {
            dayButton.classList.add('is-selected');
            dayButton.setAttribute('aria-pressed', 'true');
        } else {
            dayButton.setAttribute('aria-pressed', 'false');
        }
        if (date.getTime() === today.getTime()) {
            dayButton.classList.add('is-today');
        }

        dayButton.addEventListener('click', () => {
            selectedCalendarDate = date;
            renderCalendar();
        });
        calendarDays.append(dayButton);
    }
}

document.querySelectorAll('.calendar-nav').forEach((button) => {
    button.addEventListener('click', () => {
        const offset = Number(button.dataset.monthOffset);
        const selectedDay = selectedCalendarDate.getDate();
        const nextMonth = new Date(
            selectedCalendarDate.getFullYear(),
            selectedCalendarDate.getMonth() + offset,
            1
        );
        const lastDayOfNextMonth = new Date(
            nextMonth.getFullYear(),
            nextMonth.getMonth() + 1,
            0
        ).getDate();

        selectedCalendarDate = new Date(
            nextMonth.getFullYear(),
            nextMonth.getMonth(),
            Math.min(selectedDay, lastDayOfNextMonth)
        );
        renderCalendar();
    });
});

renderCalendar();
