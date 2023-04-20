// 8a8e7d48b0ad4471868110711232004
// https://source.unsplash.com/1600x900/?
const APP = {
    init() {
        const button = document.querySelector('.get-weather');
        button.addEventListener('click', APP.fetchWeatherInfo);
        APP.fetchWeatherInfo();
        APP.clearError();
    },
    async fetchWeatherInfo() {
        const searchInput = document.querySelector('#search');
        let location = searchInput.value;
        if (!location)
            location = 'London';
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8a8e7d48b0ad4471868110711232004&q=${location}`, { mode: 'cors' })
            let json = await response.json();
            json = APP.processJson(json);
            APP.clearError();
            APP.displayData(json);
        } catch (err) {
            APP.handleError(err);
        }
    },
    processJson(data) {
        let json = {};
        json.imageURL = data.current.condition.icon;
        json.weatherToday = data.current.condition.text;
        json.feelsLikeC = data.current.feelslike_c;
        json.feelsLikeF = data.current.feelslike_f;
        json.tempc = data.current.temp_c;
        json.tempf = data.current.temp_f;
        json.windkph = data.current.wind_kph;
        json.humidity = data.current.humidity;

        json.country = data.location.country;
        json.city = data.location.name;
        json.currentTime = data.location.localtime;
        json.backgroundImage = `https://source.unsplash.com/1600x900/?${json.city}`;

        console.log(json)
        return json;

    },
    displayData(data) {
        const body = document.querySelector('body');
        const heading = document.querySelector('.heading');
        const temperature = document.querySelector('.temperature');
        const todayImg = document.querySelector('.todayImg');
        const todayType = document.querySelector('.type');
        const humidity = document.querySelector('.humidity');
        const windSpeed = document.querySelector('.wind-speed');
        const string = `url('${data.backgroundImage}')`;

        console.log(data.backgroundImage)
        body.style.background = data.backgroundImage = string;
        heading.textContent = `Weather in ${data.city}`;
        temperature.textContent = data.tempc + ' °C';
        todayImg.src = data.imageURL;
        todayType.textContent = data.weatherToday;
        humidity.textContent = "Humidity: " + data.humidity + " %";
        windSpeed.textContent = "Wind Speed: " + data.windkph + " kph";
    },
    handleError(err) {
        const errorSpan = document.querySelector('.error');
        errorSpan.textContent = 'Please input valid city!'
    },
    clearError() {
        const errorSpan = document.querySelector('.error');
        errorSpan.textContent = '';
    }
};

APP.init();