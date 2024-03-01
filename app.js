const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5733775262msha66494d3d0a4994p187dffjsn48d49eda43b2",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

const cities = ["Mumbai", "Delhi", "Hyderabad", "Bangalore"];

const available_Properties = [
  "cloud_pct",
  "temp",
  "feels_like",
  "humidity",
  "min_temp",
  "max_temp",
  "wind_speed",
  "wind_degrees",
  "sunrise",
  "sunset",
];

let mainText = document.querySelector(".container");
let loader = document.querySelector(".loading");

const setWeather = (city, result) => {
  city = city.toLowerCase();
  city = city[0].toUpperCase() + city.substr(1);

  cityName.innerHTML = "Weather of " + city;
  temp.innerHTML = result.temp;
  temp1.innerHTML = result.temp;
  min_temp.innerHTML = result.min_temp;
  max_temp.innerHTML = result.max_temp;
  humidity.innerHTML = result.humidity;
  humidity1.innerHTML = result.humidity;
  feels_like.innerHTML = result.feels_like;
  cloud_pct.innerHTML = result.cloud_pct;
  wind_speed.innerHTML = result.wind_speed;
  wind_speed1.innerHTML = result.wind_speed;
  wind_degree.innerHTML = result.wind_degrees;
};

const getWeather = async (city, flag) => {
  try {
    const url =
      "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city;
    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result);

    if (result.error != undefined) {
      alert("Data Not Available (or) Check your spelling once");
    } else if (flag === 0) {
      setWeather(city, result);
    } else {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};

const setCommonCity = async () => {
  for (let j = 0; j < cities.length; j++) {
    let row = document.querySelector("#row" + (j + 1));
    const cityTemp = await getWeather(cities[j], 1);
    for (let i = 9; i >= 0; i--) {
      let elem = document.createElement("td");
      elem.innerHTML = cityTemp[available_Properties[i]];
      row.after(elem);
    }
  }
  loader.style.display = "none";
  mainText.style.visibility = "visible";
};

let submit = document.querySelector("#submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value, 0);
});

window.addEventListener("load", async () => {
  await getWeather("Hyderabad", 0);
  setCommonCity();
});
