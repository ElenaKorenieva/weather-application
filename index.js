const searchForm = document.querySelector(".search-loaction");
const cityValue = document.querySelector(".search-loaction input");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImage = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back-card");
const mainImg = document.querySelector(".card-img-top");
const iconContainer = document.querySelector(".icon-container");
console.log(mainImg);

const spitOutCelcius = (kelvin) => {
  celcius = Math.round(kelvin - 273.15);
  return celcius;
};
const isDayTime = (icon) => {
  if (icon.includes("d")) {
    return true;
  } else {
    return false;
  }
};
updateWeatherApp = (city) => {
  let dayTimeSrc = null;

  const imageName = city.weather[0].main.toLowerCase();
  const isImageDayOrNight = city.weather[0].icon;
  const iconSrc = `./images/${imageName}.svg`;
  cityName.textContent = city.name;
  mainImg.src = iconSrc;

  if (isDayTime(isImageDayOrNight)) {
    dayTimeSrc = "./images/day.svg";
  } else {
    dayTimeSrc = "./images/night.svg";
  }
  cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="col-8 text-center temp">
              <span>${spitOutCelcius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto">
            <img src="${dayTimeSrc}" alt="picture" width='100%' height='auto'/>
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
    `;
  cardInfo.classList.remove("d-none");
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  searchForm.reset();

  requestCity(citySearched)
    .then((data) => {
      updateWeatherApp(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
