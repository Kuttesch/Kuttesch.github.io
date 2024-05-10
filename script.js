const clock = document.getElementById("clock");
const searchInput = document.getElementById("search-input");

let Longitude;
let Latitude;

const padTime = (time) => (time.length === 1 ? "0" + time : time);

function getPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            Longitude = position.coords.longitude;
            Latitude = position.coords.latitude;
            localStorage.setItem('Longitude', Longitude);
            localStorage.setItem('Latitude', Latitude);
            showPosition(position);
            console.log("Position out");
            getWeather();
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
}

function updateClock() {
    let now = new Date();
    let hours = padTime(now.getHours() + "");
    let minutes = padTime(now.getMinutes() + "");
    let seconds = padTime(now.getSeconds() + "");

    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let query = searchInput.value;
        window.open("https://www.google.com/search?q=" + encodeURIComponent(query), "_blank");
        searchInput.value = "";
    }
});
/*
function getDate() {
    let now = new Date();
    let yyyy = now.getFullYear();
    let mm = now.getMonth() + 1;
    let dd = now.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) dd = '0' + mm;

    let date = dd +' '+ mm +' '+ yyyy
    console.log(date);
}
*/

function switchIcon(id){

    const IconMap = {
        0: 'clear_day',
        1: 'clear_day',
        2: 'partly_cloudy_day',
        3: 'cloud',
        45: 'foggy',
        48: 'foggy',
        51: 'rainy',
        53: 'rainy',
        55: 'rainy',
        56: 'weather_mix',
        57: 'weather_hail',
        61: 'rainy',
        63: 'rainy',
        65: 'rainy',
        66: 'weather_mix',
        67: 'weather_hail',
        71: 'cloudy_snowing',
        73: 'cloudy_snowing',
        75: 'cloudy_snowing',
        77: 'weather_mix',
        80: 'rainy',
        81: 'rainy',
        82: 'thunderstorm',
        85: 'cloudy_snowing',
        86: 'cloudy_snowing',
        95: 'thunderstorm',
        96: 'thunderstorm',
        99: 'thunderstorm',
    }
    let Ico;
    if (id in IconMap) {
        Ico = IconMap[id];
    }
    return Ico;
}


function formatDate(inputDate) {
    const parts = inputDate.split("-");
    if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}.${month}.${year}`;
    } else {
        console.error("Invalid date format");
        return inputDate; // return the original date if the format is invalid
    }
}

function getWeather() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Latitude}&longitude=${Longitude}&13.41&current=temperature_2m,is_day,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=3`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const todayDate = formatDate(data.daily.time[0]);
            const tomorrowDate = formatDate(data.daily.time[1]);
            const lastDate = formatDate (data.daily.time[2]);

            document.getElementById('today-date').textContent = todayDate.toString();
            document.getElementById('tomorrow-date').textContent = tomorrowDate.toString();
            document.getElementById('lastday-date').textContent = lastDate.toString();
            
//today
            const todayTempCur = Math.round(data.current.temperature_2m) + '°C';
            const todayTempMax = '↑ ' + Math.round(data.daily.temperature_2m_max[0]) + '°C';
            const todayTempMin = '↓ ' + Math.round(data.daily.temperature_2m_min[0]) + '°C';
            const todayCode = data.current.weather_code;
            let todayIco = switchIcon(todayCode);

            const todayCurTemp = document.getElementById('today-current-temp');
            const todayMaxTemp = document.getElementById('today-max-temp');
            const todayMinTemp = document.getElementById('today-min-temp');
            const todayIcon = document.getElementById('today-icon-i');

            todayCurTemp.textContent = todayTempCur.toString();
            todayMaxTemp.textContent = todayTempMax.toString();
            todayMinTemp.textContent = todayTempMin.toString();
            todayIcon.textContent = todayIco.toString();
//today
//tomorrow
            const tomorrowTempCur = Math.round((data.daily.temperature_2m_max[1] + data.daily.temperature_2m_min[1])/2) + '°C';
            const tomorrowTempMax = '↑ ' + Math.round(data.daily.temperature_2m_max[1]) + '°C';
            const tomorrowTempMin = '↓ ' + Math.round(data.daily.temperature_2m_min[1]) + '°C';
            const tomorrowCode = data.daily.weather_code[1];
            let tomorrowIco = switchIcon(tomorrowCode);

            const tomorrowCurTemp = document.getElementById('tomorrow-current-temp');
            const tomorrowMaxTemp = document.getElementById('tomorrow-max-temp');
            const tomorrowMinTemp = document.getElementById('tomorrow-min-temp');
            const tomorrowIcon = document.getElementById('tomorrow-icon-i');

            tomorrowCurTemp.textContent = tomorrowTempCur.toString();
            tomorrowMaxTemp.textContent = tomorrowTempMax.toString();
            tomorrowMinTemp.textContent = tomorrowTempMin.toString();
            tomorrowIcon.textContent = tomorrowIco.toString();
//tomorrow
//lastday
            const lastdayTempCur = Math.round((data.daily.temperature_2m_max[2] + data.daily.temperature_2m_min[2])/2) + '°C';
            const lastdayTempMax = '↑ ' + Math.round(data.daily.temperature_2m_max[2]) + '°C';
            const lastdayTempMin = '↓ ' + Math.round(data.daily.temperature_2m_min[2]) + '°C';
            const lastdayCode = data.daily.weather_code[2];
            let lastdayIco = switchIcon(lastdayCode);

            const lastdayCurTemp = document.getElementById('lastday-current-temp');
            const lastdayMaxTemp = document.getElementById('lastday-max-temp');
            const lastdayMinTemp = document.getElementById('lastday-min-temp');
            const lastdayIcon = document.getElementById('lastday-icon-i');

            lastdayCurTemp.textContent = lastdayTempCur.toString();
            lastdayMaxTemp.textContent = lastdayTempMax.toString();
            lastdayMinTemp.textContent = lastdayTempMin.toString();
            lastdayIcon.textContent = lastdayIco.toString();
//lastday




            console.log("Weather out");
            
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

window.onload = () => {
    setInterval(updateClock, 1000);
    if (localStorage.getItem('Longitude') && localStorage.getItem('Latitude')) {
        Longitude = localStorage.getItem('Longitude');
        Latitude = localStorage.getItem('Latitude');
        getWeather();
    } else {
        getPosition();
    }
    setInterval(getPosition, 3600000);
};
