// import { getWeatherImage } from "../../../utils/weatherImageUtils";
// import { getLocalizedText } from "../../../utils/languageUtils";
// import { capitalizeFirstLetter } from '../../../helpers/capitalize'

// import "./NextDaysForecastContainer.scss";

// const NextDaysForecastContainer = ({
//   forecastData,
//   daysToShow,
//   setDaysToShow,
//   noDataMessage,
//   currentTemp,
//   language,
//   isInitialLoad, // принимаем флаг
// }) => {
//   const dailyForecasts = {};
//   const weatherIcon = getWeatherImage(forecastData);
//   const noMessageText = "¯\\_(ツ)_/¯";

//   forecastData.forEach((forecast) => {
//     const date = new Date(forecast.dt * 1000).toLocaleDateString(
//       language === "ru" ? "ru-RU" : "en-US"
//     );
//     if (!dailyForecasts[date]) {
//       dailyForecasts[date] = [];
//     }
//     dailyForecasts[date].push(forecast);
//   });

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp * 1000);
//     const options = {
//       month: "long",
//       day: "numeric",
//     };

//     let formattedDate = new Intl.DateTimeFormat(
//       language === "ru" ? "ru-RU" : "en-US",
//       options
//     ).format(date);

//     // Разделяем строку на день и месяц
//     let [day, month] = formattedDate.split(" ");

//     // Для русского языка month и day могут поменяться местами, определяем язык
//     if (language === "en") {
//       [month, day] = [day, month]; // Меняем местами для английского
//     }

//     // Преобразуем первую букву месяца в заглавную
//     const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

//     return `${day} ${capitalizedMonth}`;
//   };

//   const filteredData = Object.keys(dailyForecasts)
//     .slice(0, daysToShow)
//     .map((date) => {
//       const dayData = dailyForecasts[date];
//       const morningTemp =
//         Math.floor(
//           dayData.find((entry) => new Date(entry.dt * 1000).getHours() === 6)
//             ?.main.temp || currentTemp
//         ) || "?";
//       const nightTemp =
//         Math.floor(
//           dayData.find((entry) => new Date(entry.dt * 1000).getHours() === 21)
//             ?.main.temp || ""
//         ) || "?";
//       const description = capitalizeFirstLetter(dayData[0].weather[0].description);
//       const formattedDate = formatDate(dayData[0].dt); // Используем обновленную функцию
//       return {
//         date: formattedDate,
//         morningTemp,
//         nightTemp,
//         description,
//       };
//     });

//   return (
//     <div className="forecast-next-days__container">
//       <p>{getLocalizedText("weatherForecast", language)}</p>
//       <div className="forecast-next-weeks__container">
//         <button
//           onClick={() => setDaysToShow(5)}
//           disabled={daysToShow === 5 && noDataMessage === ""}
//           className="forecast-next-weeks__btn"
//         >
//           {getLocalizedText("5days", language)}
//         </button>
//         <span></span>
//         <button
//           onClick={() => setDaysToShow(7)}
//           disabled={daysToShow === 7 && noDataMessage === ""}
//           className="forecast-next-weeks__btn"
//         >
//           {getLocalizedText("7days", language)}
//         </button>
//         <span></span>
//         <button
//           onClick={() => setDaysToShow(14)}
//           disabled={daysToShow === 14}
//           className="forecast-next-weeks__btn"
//         >
//           {getLocalizedText("14days", language)}
//         </button>
//       </div>
//       <div className="forecast-next-days-info__container">
//         {noDataMessage ? (
//           <div className="forecast-next-days__no-data">
//             <p>{noDataMessage}</p> <p>{noMessageText}</p>
//           </div>
//         ) : isInitialLoad ? (
//           <div className="forecast-next-days__no-current-data">
//             <p>{getLocalizedText("enterData", language)}</p>
//             <p>{noMessageText}</p>
//           </div>
//         ) : (
//           <ul className="forecast-next-days__list">
//             {filteredData.map((forecast, index) => (
//               <li key={index} className="forecast-next-days__list-item">
//                 <div className="forecast-next-days__weather-image">
//                   <img src={weatherIcon} alt="weather-icon" />
//                 </div>
//                 <div className="forecast-next-days__weather-description">
//                   <p>{forecast.date}</p>
//                   <p>{forecast.description}</p>
//                 </div>
//                 <div className="forecast-next-days__weather-temperature">
//                   <p>{forecast.morningTemp}°</p>
//                   <p>{forecast.nightTemp}°</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NextDaysForecastContainer;

// import { getWeatherImage } from "../../../utils/weatherImageUtils";
// import { getLocalizedText } from "../../../utils/languageUtils";
// import { capitalizeFirstLetter } from "../../../helpers/capitalize";

// import "./NextDaysForecastContainer.scss";

// const NextDaysForecastContainer = ({
//   forecastData,
//   daysToShow,
//   setDaysToShow,
//   noDataMessage,
//   currentTemp,
//   language,
//   isInitialLoad,
// }) => {
//   const dailyForecasts = {};
//   const noMessageText = "¯\\_(ツ)_/¯";

//   // Группируем прогнозы по дням
//   forecastData.forEach((forecast) => {
//     const date = new Date(forecast.dt * 1000).toLocaleDateString(
//       language === "ru" ? "ru-RU" : "en-US"
//     );
//     if (!dailyForecasts[date]) {
//       dailyForecasts[date] = [];
//     }
//     dailyForecasts[date].push(forecast);
//   });

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp * 1000);
//     const options = { month: "long", day: "numeric" };

//     let formattedDate = new Intl.DateTimeFormat(
//       language === "ru" ? "ru-RU" : "en-US",
//       options
//     ).format(date);

//     let [day, month] = formattedDate.split(" ");
//     if (language === "en") {
//       [month, day] = [day, month];
//     }

//     const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
//     return `${day} ${capitalizedMonth}`;
//   };

//   const filteredData = Object.keys(dailyForecasts)
//     .slice(0, daysToShow)
//     .map((date) => {
//       const dayData = dailyForecasts[date];
//       const morningTemp =
//         Math.floor(
//           dayData.find((entry) => new Date(entry.dt * 1000).getHours() === 6)
//             ?.main.temp || currentTemp
//         ) || "?";
//       const nightTemp =
//         Math.floor(
//           dayData.find((entry) => new Date(entry.dt * 1000).getHours() === 21)
//             ?.main.temp || ""
//         ) || "?";
//       const description = capitalizeFirstLetter(
//         dayData[0].weather[0].description
//       );
//       const formattedDate = formatDate(dayData[0].dt);
//       const weatherIcon = getWeatherImage(dayData[0]);
//       return {
//         date: formattedDate,
//         morningTemp,
//         nightTemp,
//         description,
//         icon: weatherIcon,
//       };
//     });

//   return (
//     <div className="forecast-next-days__container">
//       <p>{getLocalizedText("weatherForecast", language)}</p>
//       <div className="forecast-next-weeks__container">
//         <button
//           onClick={() => setDaysToShow(5)}
//           disabled={daysToShow === 5 && noDataMessage === ""}
//           className="forecast-next-weeks__btn"
//         >
//           {getLocalizedText("5days", language)}
//         </button>
//         <span></span>
//         <button
//           onClick={() => setDaysToShow(7)}
//           disabled={daysToShow === 7 && noDataMessage === ""}
//           className="forecast-next-weeks__btn"
//         >
//           {getLocalizedText("7days", language)}
//         </button>
//         <span></span>
//         <button
//           onClick={() => setDaysToShow(14)}
//           disabled={daysToShow === 14}
//           className="forecast-next-weeks__btn"
//         >
//           {getLocalizedText("14days", language)}
//         </button>
//       </div>
//       <div className="forecast-next-days-info__container">
//         {noDataMessage ? (
//           <div className="forecast-next-days__no-data">
//             <p>{noDataMessage}</p> <p>{noMessageText}</p>
//           </div>
//         ) : isInitialLoad ? (
//           <div className="forecast-next-days__no-current-data">
//             <p>{getLocalizedText("enterData", language)}</p>
//             <p>{noMessageText}</p>
//           </div>
//         ) : (
//           <ul className="forecast-next-days__list">
//             {filteredData.map((forecast, index) => (
//               <li key={index} className="forecast-next-days__list-item">
//                 <div className="forecast-next-days__weather-image">
//                   <img src={forecast.icon} alt="weather-icon" />
//                 </div>
//                 <div className="forecast-next-days__weather-description">
//                   <p>{forecast.date}</p>
//                   <p>{forecast.description}</p>
//                 </div>
//                 <div className="forecast-next-days__weather-temperature">
//                   <p>{forecast.morningTemp}°</p>
//                   <p>{forecast.nightTemp}°</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NextDaysForecastContainer;

import { useRef } from "react";

import { getWeatherImage } from "../../../utils/weatherImageUtils";
import { getLocalizedText } from "../../../utils/languageUtils";
import { capitalizeFirstLetter } from "../../../helpers/capitalize";

import scrollArrow from "../../../assets/icons/other-icons/scroll-arrow.svg";

import "./NextDaysForecastContainer.scss";

const NextDaysForecastContainer = ({
  forecastData,
  daysToShow,
  setDaysToShow,
  noDataMessage,
  currentTemp,
  language,
  isInitialLoad,
}) => {
  // const scrollInterval = useRef(null); // Ссылка на элемент скроллинга
  const dailyForecasts = {}; // Группируем прогнозы по дням
  const noMessageText = "¯\\_(ツ)_/¯"; // Смайлик

  const scrollContentRef = useRef(null); // Создаём реф для списка
  const scrollInterval = useRef(null); // Для управления интервалом

  // Функция для запуска прокрутки
  const startScroll = (direction) => {
    const scrollStep = direction === 'up' ? -5 : 5;  // Шаг прокрутки
    if (scrollContentRef.current) {
      scrollInterval.current = setInterval(() => {
        scrollContentRef.current.scrollTop += scrollStep;  // Прокручиваем с использованием scrollTop
      }, 30);  // Частота обновления
    }
  };
  

  // Функция для остановки прокрутки
  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current); // Останавливаем интервал
      scrollInterval.current = null; // Обнуляем интервал
    }
  };

  // Группируем прогнозы по дням
  forecastData.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString(
      language === "ru" ? "ru-RU" : "en-US"
    );
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(forecast);
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { month: "long", day: "numeric" };

    let formattedDate = new Intl.DateTimeFormat(
      language === "ru" ? "ru-RU" : "en-US",
      options
    ).format(date);

    let [day, month] = formattedDate.split(" ");
    if (language === "en") {
      [month, day] = [day, month];
    }

    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} ${capitalizedMonth}`;
  };

  const filteredData = Object.keys(dailyForecasts)
    .slice(0, daysToShow)
    .map((date) => {
      const dayData = dailyForecasts[date];
      const morningTemp =
        Math.floor(
          dayData.find((entry) => new Date(entry.dt * 1000).getHours() === 6)
            ?.main.temp || currentTemp
        ) || "?";
      const nightTemp =
        Math.floor(
          dayData.find((entry) => new Date(entry.dt * 1000).getHours() === 21)
            ?.main.temp || ""
        ) || "?";
      const description = capitalizeFirstLetter(
        dayData[0].weather[0].description
      );
      const formattedDate = formatDate(dayData[0].dt);

      // Упрощение для Clear (всегда показывать дневную иконку)
      const dayWeatherData = { ...dayData[0] };
      if (dayWeatherData.weather[0].main === "Clear") {
        dayWeatherData.weather[0].main = "ClearDay";
      }
      const weatherIcon = getWeatherImage(dayData[0]);

      return {
        date: formattedDate,
        morningTemp,
        nightTemp,
        description,
        icon: weatherIcon,
      };
    });

  return (
    <div className="forecast-next-days__container">
      <p>{getLocalizedText("weatherForecast", language)}</p>
      <div className="forecast-next-weeks__container">
        <button
          onClick={() => setDaysToShow(5)}
          disabled={daysToShow === 5 && noDataMessage === ""}
          className="forecast-next-weeks__btn"
        >
          {getLocalizedText("5days", language)}
        </button>
        <span></span>
        <button
          onClick={() => setDaysToShow(7)}
          disabled={daysToShow === 7 && noDataMessage === ""}
          className="forecast-next-weeks__btn"
        >
          {getLocalizedText("7days", language)}
        </button>
        <span></span>
        <button
          onClick={() => setDaysToShow(14)}
          disabled={daysToShow === 14}
          className="forecast-next-weeks__btn"
        >
          {getLocalizedText("14days", language)}
        </button>
      </div>
      <div className="forecast-next-days-info__container">
        {/* Появление стрелок только если кнопка 7 дней выбрана */}
        {daysToShow === 7 && noDataMessage === "" && (
          <div
            className="arrow arrow-up"
            onMouseEnter={() => startScroll("up")}
            onMouseLeave={stopScroll}
          >
            <img src={scrollArrow} alt="arrow-up" />
          </div>
        )}
        {noDataMessage ? (
          <div className="forecast-next-days__no-data">
            <p>{noDataMessage}</p> <p>{noMessageText}</p>
          </div>
        ) : isInitialLoad ? (
          <div className="forecast-next-days__no-current-data">
            <p>{getLocalizedText("enterData", language)}</p>
            <p>{noMessageText}</p>
          </div>
        ) : (
          <ul className="forecast-next-days__list"
          ref={scrollContentRef}>
            {filteredData.map((forecast, index) => (
              <li key={index} className="forecast-next-days__list-item">
                <div className="forecast-next-days__weather-image">
                  <img src={forecast.icon} alt="weather-icon" />
                </div>
                <div className="forecast-next-days__weather-description">
                  <p>{forecast.date}</p>
                  <p>{forecast.description}</p>
                </div>
                <div className="forecast-next-days__weather-temperature">
                  <p>{forecast.morningTemp}°</p>
                  <p>{forecast.nightTemp}°</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Появление стрелок только если кнопка 7 дней выбрана */}
        {daysToShow === 7 && noDataMessage === "" && (
          <div
            className="arrow arrow-down"
            onMouseEnter={() => startScroll("down")}
            onMouseLeave={stopScroll}
          >
            <img src={scrollArrow} alt="arrow-down" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NextDaysForecastContainer;
