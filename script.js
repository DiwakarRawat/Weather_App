const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
            weatherInfo.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        } else {
            weatherInfo.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}