export default class Environment {
  constructor(weather) {
    this.curDay = 0;
    this.maxDay = 10;
    this.weather = this.generateWeather();
  }

  updateDay() {
    if (this.curDay < this.maxDay) {
      this.curDay++;
    } else {
      return false; // game over
    }
    return this.curDay;
  }

  generateWeather() {
    this.weather = Math.floor(Math.random() * 6) + 1;
    if (this.weather === 2) this.weather = 3;
    if (this.weather === 4) this.weather = 5;
    return this.weather;
  }

  getWeather() {
    return this.weather;
  }

  getWeatherDesc() {
    let weather;

    switch (this.weather) {
      case 1: {
        weather = `cold and wet`;
        break;
      }
      case 2: {
        //statements;
        weather = `cold and dry`;
        break;
      }
      case 3: {
        weather = `cold and dry`;
        break;
      }
      case 4: {
        //statements;
        weather = `warm and wet`;
        break;
      }
      case 5: {
        weather = `warm and dry`;
        break;
      }
      case 6: {
        //statements;
        weather = `hot and dry`;
        break;
      }
    }
    return weather;
  }
}
