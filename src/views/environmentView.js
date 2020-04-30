import { elements } from "../views/baseView";

// Display the weather icon
export const renderWeather = (weather) => {
    elements.weatherIcon.src = `/img/w-${weather}.png`;
  };