const APIKey = "38c393de2630447fd76193c250694ac5";

const requestCity = async (city) => {
  const baseURL = "http://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&appid=${APIKey}`;

  const response = await fetch(baseURL + query);

  const data = await response.json();
  return data;
};
