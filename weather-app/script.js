const btn = document.getElementById("get-weather-btn");
const select = document.getElementById("city-select");

const weatherCard = document.getElementById("weather-card");
const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationEl = document.getElementById("location");

function valueOrNA(value) {
    return value === undefined ? "N/A" : value;
}

async function getWeather(city) {
    try {
        const res = await fetch(
            `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
        );
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

async function showWeather(city) {
    const data = await getWeather(city);

    if (!data) {
        alert("Something went wrong, please try again later.");
        return;
    }

    weatherCard.style.display = "grid";

    const main = data.weather?.[0]?.main;
    const icon = data.weather?.[0]?.icon;

    if (icon === undefined) weatherIcon.removeAttribute("src");
    else weatherIcon.src = icon;

    locationEl.textContent = valueOrNA(data.name);
    weatherMain.textContent = valueOrNA(main);

    mainTemp.textContent =
        valueOrNA(data.main?.temp) === "N/A" ? "N/A" : `${data.main.temp}°C`;
    feelsLike.textContent =
        valueOrNA(data.main?.feels_like) === "N/A"
            ? "N/A"
            : `${data.main.feels_like}°C`;

    humidity.textContent =
        valueOrNA(data.main?.humidity) === "N/A" ? "N/A" : `${data.main.humidity}%`;

    wind.textContent =
        valueOrNA(data.wind?.speed) === "N/A" ? "N/A" : `${data.wind.speed} m/s`;

    windGust.textContent =
        valueOrNA(data.wind?.gust) === "N/A" ? "N/A" : `${data.wind.gust} m/s`;
}

btn.addEventListener("click", () => {
    console.log("CLICK");
    console.log("Selected:", select.value);
    const city = select.value;
    if (!city) return; // do nothing if none selected
    showWeather(city);
});

