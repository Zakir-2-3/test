import { useState } from "react";

import Header from "./components/header/Header";
import CurrentWeatherDate from "./components/current-weather-components/current-weather-date/CurrentWeatherDate";
import CurrentWeatherDescription from "./components/current-weather-components/current-weather-description/CurrentWeatherDescription";
import HourlyWeatherContainer from "./components/current-weather-components/hourly-weather-container/HourlyWeatherContainer";
import SearchForecastContainer from "./components/weekly-weather-forecast-components/search-forecast-container/SearchForecastContainer";
import CurrentForecastContainer from "./components/weekly-weather-forecast-components/current-forecast-container/CurrentForecastContainer";
import NextDaysForecastContainer from "./components/weekly-weather-forecast-components/next-days-forecast-container/NextDaysForecastContainer";
import {
  getCityId,
  getCurrentWeather,
  getForecastWeather,
} from "./api/weatherApi";
import { toggleLanguage, getLocalizedText } from "./utils/languageUtils";

import "./styles/App.scss";

function App() {
  const [language, setLanguage] = useState("ru"); // начальный язык - русский
  const [weatherData, setWeatherData] = useState(null); // данные о погоде
  const [forecastData, setForecastData] = useState([]); // данные о прогнозе
  const [daysToShow, setDaysToShow] = useState(5); // количество дней для отображения
  const [noDataMessage, setNoDataMessage] = useState(""); // сообщение об отсутствии данных
  const [searchParams, setSearchParams] = useState(null); // параметры поиска
  const [lastSearchParams, setLastSearchParams] = useState(null); // параметры последнего поиска
  const [isInitialLoad, setIsInitialLoad] = useState(true); // флаг для отслеживания первого запуска
  const [isFetching, setIsFetching] = useState(false); // флаг для отслеживания состояния запроса
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedForecast, setSelectedForecast] = useState(null); // Состояние для выбранного прогноза
  const [activeIndex, setActiveIndex] = useState(0); // Состояние для активного элемента прогноза

  let currentController; // контроллер текущей погоды

  // Переключение языка с повторным запросом данных
  const handleLanguageToggle = () => {
    if (isFetching) return; // Если запрос уже выполняется, блокируем кнопку

    const newLanguage = toggleLanguage(language);
    setLanguage(newLanguage);
    setIsFetching(true); // Устанавливаем флаг запроса в true

    // setIsActive(!isActive); // Изменяем состояние кнопки для анимации

    // Если есть выбранный прогноз, обновляем описание
    if (selectedForecast) {
      const updatedForecast = {
        ...selectedForecast,
        description: selectedForecast.description,
      };
      setSelectedForecast(updatedForecast);
    }

    // Обновляем noDataMessage при смене языка, если выбрано "14 дней"
    if (daysToShow === 14) {
      setNoDataMessage(getLocalizedText("noData14days", newLanguage));
    }

    // Если есть параметры поиска, выполняем запрос
    if (searchParams) {
      fetchWeatherData(searchParams, newLanguage).finally(() => {
        setIsFetching(false); // Завершаем запрос, восстанавливаем возможность переключения языка
      });
    } else {
      setIsFetching(false); // Если нет параметров поиска, сразу завершаем запрос
    }
  };

  const fetchWeatherData = async (params, lang) => {
    // Проверка входных данных
    if (!params || (!params.city && !params.latitude && !params.longitude)) {
      alert(getLocalizedText("enterData", language));
      return;
    }

    if (
      JSON.stringify(params) === JSON.stringify(lastSearchParams) &&
      language === lang
    ) {
      console.log(getLocalizedText("repeatRequest", language));
      return;
    }

    setLastSearchParams(params);
    setSearchParams(params);
    setIsInitialLoad(false);

    if (currentController) {
      currentController.abort();
    }

    currentController = new AbortController();
    const signal = currentController.signal;

    try {
      let cityId = params.city ? await getCityId(params.city, signal) : null;
      const weatherParams = { ...params, cityId };

      const weatherJson = await getCurrentWeather(weatherParams, lang, signal);
      setWeatherData(weatherJson);

      const forecastJson = await getForecastWeather(
        weatherParams,
        lang,
        signal
      );

      if (forecastJson && forecastJson.length > 0) {
        setForecastData(forecastJson);

        // Извлекаем первые 8 записей (8 x 3 часа(api выдает данные) = 24 часа)
        const hourly = forecastJson.slice(0, 8).map((entry) => {
          const forecastTime = new Date(entry.dt * 1000).getHours();
          const weatherMain = entry.weather[0].main;
        
          // Определяем ClearDay или ClearNight для `Clear`
          const updatedMain =
            weatherMain === "Clear"
              ? forecastTime >= 6 && forecastTime < 18
                ? "ClearDay"
                : "ClearNight"
              : weatherMain;
        
          return {
            time: new Date(entry.dt * 1000).toLocaleTimeString(lang, {
              hour: "2-digit",
              minute: "2-digit",
            }),
            temp: Math.round(entry.main.temp),
            pressure: entry.main.pressure,
            humidity: entry.main.humidity,
            windSpeed: Math.round(entry.wind.speed * 3.6), // м/с в км/ч
            sunrise: new Date(weatherJson.sys.sunrise * 1000).toLocaleTimeString(lang, {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sunset: new Date(weatherJson.sys.sunset * 1000).toLocaleTimeString(lang, {
              hour: "2-digit",
              minute: "2-digit",
            }),
            description: entry.weather[0].description,
            weather: [{ ...entry.weather[0], main: updatedMain }], // Обновляем main для ClearDay/ClearNight
          };
        });
        
        setHourlyData(hourly);
        

        // Сброс активного элемента
        setSelectedForecast(hourly[0]); // Установить первую запись как активную
        setActiveIndex(0); // Сбрасываем активный индекс в HourlyWeatherContainer
      } else {
        console.warn("No hourly data available in forecastData.list");
        setForecastData([]);
        setHourlyData([]);
        setSelectedForecast(null); // Очищаем выбранный прогноз
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(getLocalizedText("errorData", language), error);
        alert(getLocalizedText("errorData", language), error.message);
      }
    }
  };

  const handleDaysToShowChange = (days) => {
    setDaysToShow(days);
    setNoDataMessage(
      days === 14 ? getLocalizedText("noData14days", language) : ""
    );
  };

  return (
    <>
      <Header language={language} toggleLanguage={handleLanguageToggle} />
      <main className="main">
        <div className="main-container">
          <div className="current-weather__container">
            <CurrentWeatherDate language={language} />
            <CurrentWeatherDescription
              description={selectedForecast?.description || ""}
            />
            <HourlyWeatherContainer
              hourlyData={hourlyData}
              onForecastSelect={setSelectedForecast}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
          <div className="weekly-forecast__container">
            <SearchForecastContainer
              onSearch={(params) => fetchWeatherData(params, language)}
              language={language}
            />
            <CurrentForecastContainer
              forecastData={
                selectedForecast || {
                  temp: "-",
                  pressure: "-",
                  humidity: "-",
                  windSpeed: "-",
                  sunrise: "-",
                  sunset: "-",
                  description: "-",
                }
              }
              language={language}
            />
            <NextDaysForecastContainer
              forecastData={forecastData}
              daysToShow={daysToShow}
              setDaysToShow={handleDaysToShowChange}
              noDataMessage={noDataMessage}
              currentTemp={weatherData?.main.temp}
              language={language}
              isInitialLoad={isInitialLoad} // передаем флаг
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
