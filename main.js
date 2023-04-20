// 8a8e7d48b0ad4471868110711232004
// https://source.unsplash.com/1600x900/?
const APP = {
    init() {
        const button = document.querySelector('.get-weather');
        button.addEventListener('click', APP.fetchWeatherInfo);
    },
    async fetchWeatherInfo() {
        const searchInput = document.querySelector('#search');
        let location = searchInput.value;
        if (!location)
            location = 'London';

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8a8e7d48b0ad4471868110711232004&q=${location}`, { mode: 'cors' })
        let json = await response.json();
        APP.processJson(json);
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
        console.log(data);
        console.log(json);

    }
};

APP.init();