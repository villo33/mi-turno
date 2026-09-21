// ======================================================
// MI TURNO
// CALENDARIO + QUINCENAS + HOTEL + OBRA + HORAS
// ======================================================


let currentDate = new Date();

let selectedWork = "todos";

let selectedQuincena = "first";



// ======================================================
// TURNOS GUARDADOS
// ======================================================

let shifts =
    JSON.parse(
        localStorage.getItem("miTurnoShifts")
    ) || [

        {
            date: "2026-09-18",
            work: "obra",
            type: "noche",
            start: "18:00",
            end: "06:00",
            hours: 12
        },

        {
            date: "2026-09-19",
            work: "hotel",
            type: "noche",
            start: "20:00",
            end: "07:00",
            hours: 11
        }

    ];



// ======================================================
// ELEMENTOS
// ======================================================

const calendar =
    document.getElementById("calendar");

const monthTitle =
    document.getElementById("monthTitle");

const todayDate =
    document.getElementById("todayDate");

const todayShift =
    document.getElementById("todayShift");

const nextShift =
    document.getElementById("nextShift");

const prevMonth =
    document.getElementById("prevMonth");

const nextMonth =
    document.getElementById("nextMonth");

const todayBtn =
    document.getElementById("todayBtn");

const workButtons =
    document.querySelectorAll(".work-btn");

const statsEyebrow =
    document.getElementById("statsEyebrow");

const statsTitle =
    document.getElementById("statsTitle");

const totalDays =
    document.getElementById("totalDays");

const hotelDays =
    document.getElementById("hotelDays");

const obraDays =
    document.getElementById("obraDays");

const totalHours =
    document.getElementById("totalHours");

const quincenaTitle =
    document.getElementById("quincenaTitle");

const firstQuincena =
    document.getElementById("firstQuincena");

const secondQuincena =
    document.getElementById("secondQuincena");

const firstQuincenaInfo =
    document.getElementById("firstQuincenaInfo");

const secondQuincenaInfo =
    document.getElementById("secondQuincenaInfo");

const programarQuincena =
    document.getElementById("programarQuincena");



// ======================================================
// MESES
// ======================================================

const monthNames = [

    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"

];



// ======================================================
// HORARIOS
// ======================================================

function getSchedule(work) {

    if (work === "obra") {

        return {
            start: "18:00",
            end: "06:00",
            hours: 12
        };

    }


    return {
        start: "20:00",
        end: "07:00",
        hours: 11
    };

}



// ======================================================
// FORMATO FECHA
// ======================================================

function formatDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );

    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}



// ======================================================
// GUARDAR
// ======================================================

function saveShifts() {

    localStorage.setItem(
        "miTurnoShifts",
        JSON.stringify(shifts)
    );

}



// ======================================================
// BUSCAR TURNO
// ======================================================

function getShift(dateString) {

    return shifts.find(
        shift =>
            shift.date === dateString
    );

}



// ======================================================
// INFORMACIÓN DE QUINCENA
// ======================================================

function getQuincenaRange() {

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const lastDay =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    if (selectedQuincena === "first") {

        return {
            start: 1,
            end: 15
        };

    }


    return {
        start: 16,
        end: lastDay
    };

}



// ======================================================
// RESUMEN DE CADA QUINCENA
// ======================================================

function getQuincenaStats(quincena) {

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const lastDay =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    let start;
    let end;


    if (quincena === "first") {

        start = 1;
        end = 15;

    } else {

        start = 16;
        end = lastDay;

    }


    const quincenaShifts =
        shifts.filter(
            shift => {

                const date =
                    new Date(
                        shift.date +
                        "T12:00:00"
                    );


                return (

                    date.getFullYear() ===
                    year

                    &&

                    date.getMonth() ===
                    month

                    &&

                    date.getDate() >=
                    start

                    &&

                    date.getDate() <=
                    end

                );

            }
        );


    const days =
        quincenaShifts.length;


    const hours =
        quincenaShifts.reduce(
            (
                total,
                shift
            ) => {

                if (
                    shift.hours !== undefined &&
                    shift.hours !== null
                ) {

                    return (
                        total +
                        Number(
                            shift.hours
                        )
                    );

                }


                return (
                    total +
                    getSchedule(
                        shift.work
                    ).hours
                );

            },
            0
        );


    return {
        days: days,
        hours: hours
    };

}



// ======================================================
// MOSTRAR RESUMEN DE QUINCENAS
// ======================================================

function renderQuincenaStats() {

    const first =
        getQuincenaStats("first");

    const second =
        getQuincenaStats("second");


    firstQuincenaInfo.textContent =
        first.days +
        (
            first.days === 1
                ? " día"
                : " días"
        ) +
        " · " +
        first.hours +
        " h";


    secondQuincenaInfo.textContent =
        second.days +
        (
            second.days === 1
                ? " día"
                : " días"
        ) +
        " · " +
        second.hours +
        " h";

}



// ======================================================
// TÍTULO DE QUINCENA
// ======================================================

function renderQuincenaTitle() {

    const month =
        monthNames[
            currentDate.getMonth()
        ];

    const year =
        currentDate.getFullYear();


    if (selectedQuincena === "first") {

        quincenaTitle.textContent =
            "1–15 de " +
            month;

    } else {

        const range =
            getQuincenaRange();

        quincenaTitle.textContent =
            "16–" +
            range.end +
            " de " +
            month;

    }

}



// ======================================================
// RESUMEN DEL MES
// ======================================================

function renderStats() {

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    const monthShifts =
        shifts.filter(
            shift => {

                const date =
                    new Date(
                        shift.date +
                        "T12:00:00"
                    );


                return (

                    date.getFullYear() ===
                    year

                    &&

                    date.getMonth() ===
                    month

                );

            }
        );


    const hotelShifts =
        monthShifts.filter(
            shift =>
                shift.work === "hotel"
        );


    const obraShifts =
        monthShifts.filter(
            shift =>
                shift.work === "obra"
        );


    const hotel =
        hotelShifts.length;

    const obra =
        obraShifts.length;

    const total =
        hotel +
        obra;


    const hotelHours =
        hotel * 11;

    const obraHours =
        obra * 12;

    const workedHours =
        hotelHours +
        obraHours;



    if (selectedWork === "hotel") {

        statsEyebrow.textContent =
            "HOTEL · ESTE MES";

        statsTitle.textContent =
            "Tus turnos en el Hotel";

        totalDays.textContent =
            hotel;

        hotelDays.textContent =
            hotel;

        obraDays.textContent =
            0;

        totalHours.textContent =
            hotelHours;

        return;

    }



    if (selectedWork === "obra") {

        statsEyebrow.textContent =
            "OBRA · ESTE MES";

        statsTitle.textContent =
            "Tus turnos en la Obra";

        totalDays.textContent =
            obra;

        hotelDays.textContent =
            0;

        obraDays.textContent =
            obra;

        totalHours.textContent =
            obraHours;

        return;

    }



    statsEyebrow.textContent =
        "RESUMEN · ESTE MES";

    statsTitle.textContent =
        "Todos tus turnos";

    totalDays.textContent =
        total;

    hotelDays.textContent =
        hotel;

    obraDays.textContent =
        obra;

    totalHours.textContent =
        workedHours;

}



// ======================================================
// HOY
// ======================================================

function renderToday() {

    const today =
        new Date();


    const formatted =
        today.toLocaleDateString(
            "es-CO",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    todayDate.textContent =
        formatted
            .charAt(0)
            .toUpperCase() +
        formatted.slice(1);


    const todayString =
        formatDate(today);


    const todayShiftData =
        getShift(todayString);


    if (todayShiftData) {

        const schedule =
            getSchedule(
                todayShiftData.work
            );


        let workName;


        if (
            todayShiftData.work ===
            "obra"
        ) {

            workName =
                "🏗️ Obra";

        } else {

            workName =
                "🏨 Hotel";

        }


        todayShift.textContent =
            workName +
            " · " +
            schedule.start +
            " → " +
            schedule.end +
            " · " +
            schedule.hours +
            " horas";

    } else {

        todayShift.textContent =
            "No tienes un turno registrado hoy.";

    }

}



// ======================================================
// CALENDARIO
// ======================================================

function renderCalendar() {

    calendar.innerHTML = "";


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    monthTitle.textContent =
        monthNames[month] +
        " " +
        year;


    const firstDay =
        new Date(
            year,
            month,
            1
        );


    const lastDay =
        new Date(
            year,
            month + 1,
            0
        );


    let startDay =
        firstDay.getDay() - 1;


    if (startDay < 0) {

        startDay = 6;

    }



    for (
        let i = 0;
        i < startDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "day empty";


        calendar.appendChild(
            empty
        );

    }



    for (
        let day = 1;
        day <= lastDay.getDate();
        day++
    ) {

        const cell =
            document.createElement(
                "div"
            );


        cell.className =
            "day";


        const number =
            document.createElement(
                "span"
            );


        number.className =
            "day-number";


        number.textContent =
            day;


        cell.appendChild(
            number
        );


        const cellDate =
            new Date(
                year,
                month,
                day
            );


        const dateString =
            formatDate(
                cellDate
            );


        const today =
            new Date();


        if (

            cellDate.getFullYear() ===
            today.getFullYear()

            &&

            cellDate.getMonth() ===
            today.getMonth()

            &&

            cellDate.getDate() ===
            today.getDate()

        ) {

            cell.classList.add(
                "today"
            );

        }



        const shift =
            getShift(
                dateString
            );


        if (

            shift

            &&

            (
                selectedWork === "todos"

                ||

                shift.work ===
                selectedWork
            )

        ) {

            cell.classList.add(
                shift.work
            );


            const icon =
                document.createElement(
                    "span"
                );


            icon.className =
                "shift-icon";


            if (
                shift.work ===
                "obra"
            ) {

                icon.textContent =
                    "🏗️";

            } else {

                icon.textContent =
                    "🏨";

            }


            cell.appendChild(
                icon
            );


            const label =
                document.createElement(
                    "small"
                );


            label.className =
                "shift-label";


            if (
                shift.work ===
                "obra"
            ) {

                label.textContent =
                    "Obra";

            } else {

                label.textContent =
                    "Hotel";

            }


            cell.appendChild(
                label
            );

        }



        cell.addEventListener(
            "click",
            () => {

                openDayMenu(
                    dateString
                );

            }
        );


        calendar.appendChild(
            cell
        );

    }

}



// ======================================================
// MENÚ DE UN DÍA
// ======================================================

function openDayMenu(dateString) {

    const existing =
        document.getElementById(
            "turnoModal"
        );


    if (existing) {

        existing.remove();

    }


    const currentShift =
        getShift(
            dateString
        );


    const date =
        new Date(
            dateString +
            "T12:00:00"
        );


    const dateText =
        date.toLocaleDateString(
            "es-CO",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "turnoModal";


    modal.className =
        "turno-modal";


    let deleteButtonHTML =
        "";


    if (currentShift) {

        deleteButtonHTML = `
            <button
                class="modal-delete"
                id="deleteShift"
                type="button"
            >
                🗑️ Borrar turno
            </button>
        `;

    }



    modal.innerHTML = `

        <div class="turno-modal-overlay">

            <div class="turno-modal-card">

                <button
                    class="modal-close"
                    id="closeModal"
                    type="button"
                >
                    ×
                </button>


                <span class="modal-eyebrow">
                    SELECCIONAR TURNO
                </span>


                <h2>
                    ${dateText}
                </h2>


                <p class="modal-question">
                    ¿Dónde trabajas este día?
                </p>


                <button
                    class="modal-option hotel-option"
                    id="selectHotel"
                    type="button"
                >

                    <span class="modal-option-icon">
                        🏨
                    </span>

                    <span>

                        <strong>
                            Hotel
                        </strong>

                        <small>
                            20:00 → 07:00 · 11 horas
                        </small>

                    </span>

                </button>


                <button
                    class="modal-option obra-option"
                    id="selectObra"
                    type="button"
                >

                    <span class="modal-option-icon">
                        🏗️
                    </span>

                    <span>

                        <strong>
                            Obra
                        </strong>

                        <small>
                            18:00 → 06:00 · 12 horas
                        </small>

                    </span>

                </button>


                ${deleteButtonHTML}

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );



    const closeModal =
        document.getElementById(
            "closeModal"
        );


    closeModal.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );



    const selectHotel =
        document.getElementById(
            "selectHotel"
        );


    selectHotel.addEventListener(
        "click",
        () => {

            saveShift(
                dateString,
                "hotel"
            );

            modal.remove();

        }
    );



    const selectObra =
        document.getElementById(
            "selectObra"
        );


    selectObra.addEventListener(
        "click",
        () => {

            saveShift(
                dateString,
                "obra"
            );

            modal.remove();

        }
    );



    const deleteButton =
        document.getElementById(
            "deleteShift"
        );


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            () => {

                deleteShift(
                    dateString
                );

                modal.remove();

            }
        );

    }



    const overlay =
        modal.querySelector(
            ".turno-modal-overlay"
        );


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                overlay
            ) {

                modal.remove();

            }

        }
    );

}



// ======================================================
// GUARDAR TURNO
// ======================================================

function saveShift(
    dateString,
    work
) {

    const existing =
        getShift(
            dateString
        );


    const schedule =
        getSchedule(
            work
        );


    if (existing) {

        existing.work =
            work;

        existing.type =
            "noche";

        existing.start =
            schedule.start;

        existing.end =
            schedule.end;

        existing.hours =
            schedule.hours;

    } else {

        shifts.push({

            date:
                dateString,

            work:
                work,

            type:
                "noche",

            start:
                schedule.start,

            end:
                schedule.end,

            hours:
                schedule.hours

        });

    }


    saveShifts();

    renderApp();

}



// ======================================================
// BORRAR TURNO
// ======================================================

function deleteShift(
    dateString
) {

    shifts =
        shifts.filter(
            shift =>
                shift.date !==
                dateString
        );


    saveShifts();

    renderApp();

}



// ======================================================
// PRÓXIMO TURNO
// ======================================================

function renderNextShift() {

    const todayString =
        formatDate(
            new Date()
        );


    const futureShifts =
        shifts
            .filter(
                shift => {

                    if (
                        shift.date <
                        todayString
                    ) {

                        return false;

                    }


                    if (
                        selectedWork ===
                        "todos"
                    ) {

                        return true;

                    }


                    return (
                        shift.work ===
                        selectedWork
                    );

                }
            )
            .sort(
                (a, b) =>
                    a.date.localeCompare(
                        b.date
                    )
            );


    if (
        futureShifts.length ===
        0
    ) {

        nextShift.innerHTML = `

            <div class="next-icon">
                🕐
            </div>

            <div>

                <strong>
                    No hay turnos registrados
                </strong>

                <p>
                    Toca un día del calendario
                    para agregar uno.
                </p>

            </div>

        `;

        return;

    }



    const shift =
        futureShifts[0];


    const date =
        new Date(
            shift.date +
            "T12:00:00"
        );


    const dateText =
        date.toLocaleDateString(
            "es-CO",
            {
                weekday: "long",
                day: "numeric",
                month: "long"
            }
        );


    const isObra =
        shift.work ===
        "obra";


    const schedule =
        getSchedule(
            shift.work
        );


    let workName;


    if (isObra) {

        workName =
            "🏗️ Obra";

    } else {

        workName =
            "🏨 Hotel";

    }



    let icon;


    if (isObra) {

        icon =
            "🏗️";

    } else {

        icon =
            "🏨";

    }



    nextShift.innerHTML = `

        <div class="next-icon">
            ${icon}
        </div>


        <div>

            <strong>
                ${workName}
            </strong>


            <p>
                ${dateText}
                ·
                ${schedule.start}
                →
                ${schedule.end}
                ·
                ${schedule.hours}
                horas
            </p>

        </div>

    `;

}



// ======================================================
// PROGRAMAR QUINCENA
// ======================================================

function openQuincenaModal() {

    const existing =
        document.getElementById(
            "quincenaModal"
        );


    if (existing) {

        existing.remove();

    }


    const range =
        getQuincenaRange();


    const year =
        currentDate.getFullYear();


    const month =
        currentDate.getMonth();


    const days = [];


    for (
        let day = range.start;
        day <= range.end;
        day++
    ) {

        days.push(
            day
        );

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "quincenaModal";


    modal.className =
        "turno-modal";


    let rows =
        "";



    days.forEach(
        day => {

            const date =
                new Date(
                    year,
                    month,
                    day
                );


            const dateString =
                formatDate(
                    date
                );


            const existingShift =
                getShift(
                    dateString
                );


            let currentValue =
                "libre";


            if (existingShift) {

                currentValue =
                    existingShift.work;

            }


            const weekday =
                date.toLocaleDateString(
                    "es-CO",
                    {
                        weekday: "short"
                    }
                );


            let libreSelected =
                "";


            let hotelSelected =
                "";


            let obraSelected =
                "";


            if (
                currentValue ===
                "libre"
            ) {

                libreSelected =
                    "selected";

            }


            if (
                currentValue ===
                "hotel"
            ) {

                hotelSelected =
                    "selected";

            }


            if (
                currentValue ===
                "obra"
            ) {

                obraSelected =
                    "selected";

            }



            rows += `

                <div
                    class="quincena-day"
                    data-date="${dateString}"
                >

                    <div class="quincena-date">

                        <strong>
                            ${day}
                        </strong>

                        <small>
                            ${weekday}
                        </small>

                    </div>


                    <select
                        class="quincena-work"
                        data-date="${dateString}"
                    >

                        <option
                            value="libre"
                            ${libreSelected}
                        >
                            ⬜ Libre
                        </option>


                        <option
                            value="hotel"
                            ${hotelSelected}
                        >
                            🏨 Hotel
                        </option>


                        <option
                            value="obra"
                            ${obraSelected}
                        >
                            🏗️ Obra
                        </option>

                    </select>

                </div>

            `;

        }
    );



    modal.innerHTML = `

        <div class="turno-modal-overlay">

            <div class="turno-modal-card quincena-modal-card">


                <button
                    class="modal-close"
                    id="closeQuincena"
                    type="button"
                >
                    ×
                </button>


                <span class="modal-eyebrow">
                    PROGRAMAR QUINCENA
                </span>


                <h2>
                    ${quincenaTitle.textContent}
                </h2>


                <p class="modal-question">
                    Selecciona el turno de cada día.
                </p>


                <div class="quincena-days">

                    ${rows}

                </div>


                <button
                    class="save-quincena-btn"
                    id="saveQuincena"
                    type="button"
                >
                    ✓ Guardar quincena
                </button>


            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );



    const closeQuincena =
        document.getElementById(
            "closeQuincena"
        );


    closeQuincena.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );



    const saveQuincena =
        document.getElementById(
            "saveQuincena"
        );


    saveQuincena.addEventListener(
        "click",
        () => {

            const selects =
                modal.querySelectorAll(
                    ".quincena-work"
                );


            selects.forEach(
                select => {

                    const dateString =
                        select.dataset.date;


                    const work =
                        select.value;



                    if (
                        work ===
                        "libre"
                    ) {

                        shifts =
                            shifts.filter(
                                shift =>
                                    shift.date !==
                                    dateString
                            );

                        return;

                    }



                    const schedule =
                        getSchedule(
                            work
                        );


                    const existing =
                        getShift(
                            dateString
                        );


                    if (existing) {

                        existing.work =
                            work;

                        existing.type =
                            "noche";

                        existing.start =
                            schedule.start;

                        existing.end =
                            schedule.end;

                        existing.hours =
                            schedule.hours;

                    } else {

                        shifts.push({

                            date:
                                dateString,

                            work:
                                work,

                            type:
                                "noche",

                            start:
                                schedule.start,

                            end:
                                schedule.end,

                            hours:
                                schedule.hours

                        });

                    }

                }
            );


            saveShifts();

            modal.remove();

            renderApp();

        }
    );



    const overlay =
        modal.querySelector(
            ".turno-modal-overlay"
        );


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                overlay
            ) {

                modal.remove();

            }

        }
    );

}



// ======================================================
// CAMBIAR QUINCENA
// ======================================================

function selectQuincena(
    quincena
) {

    selectedQuincena =
        quincena;


    firstQuincena.classList.toggle(
        "active",
        quincena === "first"
    );


    secondQuincena.classList.toggle(
        "active",
        quincena === "second"
    );


    renderQuincenaTitle();

}



// ======================================================
// ACTUALIZAR TODA LA APP
// ======================================================

function renderApp() {

    renderToday();

    renderStats();

    renderQuincenaTitle();

    renderQuincenaStats();

    renderCalendar();

    renderNextShift();

}



// ======================================================
// MES ANTERIOR
// ======================================================

prevMonth.addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );


        renderApp();

    }
);



// ======================================================
// MES SIGUIENTE
// ======================================================

nextMonth.addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );


        renderApp();

    }
);



// ======================================================
// BOTÓN HOY
// ======================================================

todayBtn.addEventListener(
    "click",
    () => {

        currentDate =
            new Date();


        renderApp();

    }
);



// ======================================================
// FILTROS HOTEL / OBRA / TODOS
// ======================================================

workButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                workButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedWork =
                    button.dataset.work;


                renderApp();

            }
        );

    }
);



// ======================================================
// PRIMERA QUINCENA
// ======================================================

firstQuincena.addEventListener(
    "click",
    () => {

        selectQuincena(
            "first"
        );

    }
);



// ======================================================
// SEGUNDA QUINCENA
// ======================================================

secondQuincena.addEventListener(
    "click",
    () => {

        selectQuincena(
            "second"
        );

    }
);



// ======================================================
// PROGRAMAR QUINCENA
// ======================================================

programarQuincena.addEventListener(
    "click",
    () => {

        openQuincenaModal();

    }
);



// ======================================================
// INICIAR
// ======================================================

renderApp();