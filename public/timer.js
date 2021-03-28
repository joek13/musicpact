const matchTime = new Date(2021, 3, 1, 00, 00, 00, 00);
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_HOUR = 1000 * 60 * 60;
const MS_PER_MINUTE = 1000 * 60;
const MS_PER_SECOND = 1000;

const daysDisp = document.getElementById("days");
const hoursDisp = document.getElementById("hours");
const minutesDisp = document.getElementById("minutes");
const secondsDisp = document.getElementById("seconds");

setInterval(() => {
    var currentTime = new Date(); // current date.
    var delta = matchTime - currentTime; // time until match time in ms.

    var days = Math.floor(delta / MS_PER_DAY);
    delta = delta % MS_PER_DAY;
    var hours = Math.floor(delta / MS_PER_HOUR);
    delta = delta % MS_PER_HOUR;
    var minutes = Math.floor(delta / MS_PER_MINUTE);
    delta = delta % MS_PER_MINUTE;
    var seconds = Math.floor(delta / MS_PER_SECOND);

    console.log(days)

    daysDisp.innerHTML = days.toString().padStart(2, "0");
    hoursDisp.innerHTML = hours.toString().padStart(2, "0");
    minutesDisp.innerHTML = minutes.toString().padStart(2, "0");
    secondsDisp.innerHTML = seconds.toString().padStart(2, "0");
}, 1000);