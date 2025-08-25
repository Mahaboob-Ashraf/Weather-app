document.addEventListener('DOMContentLoaded', () => {
    const cityIput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const feel = document.getElementById("feel");
    const description = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const icon = document.getElementById("weather-icon");
    const loader = document.getElementById("loader");

    const API_KEY = "0de1cb1209025c55e48b58704311eb82"; //should be hidden practically, in env variables

    getWeatherBtn.addEventListener("click", async () => {
        await getData();
    });

    cityIput.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {  
            await getData();
        }});

    async function getData() {
                const city = cityIput.value.trim();
        if(!city) return;

        
        loader.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
        errorMessage.classList.add('hidden');
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        } finally {
            loader.classList.add('hidden');
        }
        
        
    };

    async function fetchWeatherData(city) {
        // gets weather data

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    };

    function displayWeatherData(weatherData) {
        // displays weather data
        console.log(weatherData);
        cityName.textContent = weatherData.name;
        temperature.textContent = `Temperature: ${weatherData.main.temp}°C`;
        feel.textContent = `Feels like: ${weatherData.main.feels_like}°C`;
        description.textContent = `Weather: ${weatherData.weather[0].description}`;
        const iconCode = weatherData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        icon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

        // Inside displayWeatherData(weatherData)
        const weatherCondition = weatherData.weather[0].main;
        const body = document.body;

        switch (weatherCondition) {
            case 'Clear':
                body.style.background = 'linear-gradient(to bottom right, #a5f3fc, #93c5fd)';
                break;
            case 'Clouds':
                body.style.background = 'linear-gradient(to bottom right, #d1d5db, #9ca3af)';
                break;
            case 'Rain':
            case 'Drizzle':
                body.style.background = 'linear-gradient(to bottom right, #6b7280, #4b5563)';
                break;
            default:
                body.style.background = 'linear-gradient(to bottom right, #a5f3fc, #93c5fd)';
        }
        

        
        // unlock data
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    };

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})
