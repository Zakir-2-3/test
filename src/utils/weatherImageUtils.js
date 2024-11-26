import clearDayIcon from "@assets/icons/weather-icons/clear-day.svg";
import clearNightIcon from "@assets/icons/weather-icons/clear-night.svg";
import rainIcon from "@assets/icons/weather-icons/rain.svg";
import snowIcon from "@assets/icons/weather-icons/snow.svg";
import mistIcon from "@assets/icons/weather-icons/mist.svg";
import windIcon from "@assets/icons/weather-icons/wind.svg";
import cloudyIcon from "@assets/icons/weather-icons/cloudy.svg";
import defaultIcon from "@assets/icons/weather-icons/default.svg";

const weatherGroupMap = {
  ClearDay: clearDayIcon, // Солнечный день
  ClearNight: clearNightIcon, // Теплая ночь
  Rain: rainIcon, // Дождь
  Drizzle: rainIcon, // Мелкий дождь
  Thunderstorm: rainIcon, // Гроза
  Snow: snowIcon, // Снег
  Mist: mistIcon, // Туман
  Smoke: mistIcon, // Дым
  Haze: mistIcon, // Легкая дымка
  Dust: mistIcon, // Пыль
  Fog: mistIcon, // Туман
  Sand: mistIcon, // Песчаная буря
  Ash: mistIcon, // Пепел
  Squall: windIcon, // Шквалистый ветер
  Tornado: windIcon, // Торнадо
  Clouds: cloudyIcon, // Облака
  Default: defaultIcon, // Изображение по умолчанию
};

export const getWeatherImage = (weatherData) => {
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return defaultIcon; // Изображение по умолчанию
  }

  const weatherMain = weatherData.weather[0].main;

  // Получаем время для прогноза или текущее время
  const currentTime = new Date().getHours();
  const forecastTime = weatherData.dt
    ? new Date(weatherData.dt * 1000).getHours()
    : new Date().getHours();

  // Если погода "Clear", выбираем иконку дня или ночи
  if (weatherMain === "Clear") {
    return forecastTime >= 6 && forecastTime < 18
      ? weatherGroupMap["ClearDay"] // Дневная ясная погода
      : weatherGroupMap["ClearNight"]; // Ночная ясная погода
  }

  if (!weatherGroupMap[weatherMain]) {
    console.warn(`Unknown weather type: ${weatherMain}`);
  }

  return weatherGroupMap[weatherMain] || defaultIcon;
};
