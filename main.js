// https://www.weatherapi.com/docs/
// 8a8e7d48b0ad4471868110711232004
let json = {};
const APP = {
    init() {
        const button = document.querySelector('.get-weather');
        const celcius = document.querySelector('.get-celcious');
        const farenhit = document.querySelector('.get-farenhit');
        button.addEventListener('click', APP.fetchWeatherInfo);
        celcius.addEventListener('click', APP.getTemperatureInCelcious);
        farenhit.addEventListener('click', APP.getTemperatureInFarenhit);
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
            APP.setBackgroundImage(json.city);
        } catch (err) {
            APP.handleError(err);
        }
    },
    processJson(data) {

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
        // json.backgroundImage = `https://source.unsplash.com/1600x900/?${json.city}`;

        // console.log(json)
        return json;
        // this.fetchBackgroundImage();

    },
    async setBackgroundImage(city) {
        const spinner = document.querySelector('.loader');
        spinner.style.display = 'block';
        const url = await fetch(`https://source.unsplash.com/1600x900/?${json.city}`);
        spinner.style.display = 'none';
        document.body.style.background = `url(${url.url})`;

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
        const searchInput = document.querySelector('#search');

        // body.style.background = data.backgroundImage = string;
        heading.textContent = `Weather in ${data.city}`;
        temperature.textContent = data.tempc + ' °C';
        todayImg.src = data.imageURL;
        todayType.textContent = data.weatherToday;
        humidity.textContent = "Humidity: " + data.humidity + " %";
        windSpeed.textContent = "Wind Speed: " + data.windkph + " kph";
        searchInput.value = "";
    },
    handleError(err) {
        const errorSpan = document.querySelector('.error');
        errorSpan.textContent = 'Please input valid city!'
    },
    clearError() {
        const errorSpan = document.querySelector('.error');
        errorSpan.textContent = '';
    },
    getTemperatureInCelcious() {
        const temperature = document.querySelector('.temperature');
        temperature.textContent = json.tempc + ' °C';
    },
    getTemperatureInFarenhit() {
        const temperature = document.querySelector('.temperature');
        temperature.textContent = json.tempf + ' °F';
    },
};

APP.init();
