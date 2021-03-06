import Inventory from "./../models/Inventory";
import Environment from "../models/Environment";

import { elements } from "./../views/baseView";
import * as inventoryView from "./../views/inventoryView";
import * as environmentView from "./../views/environmentView";

import "./../css/style.css";

import imgBurger from "../img/burger.png";
import imgSoftdrink from "../img/softdrink.png";
import imgIcecream from "../img/icecream.png";
import imgHotdog from "../img/hotdog.png";
import imgDonut from "../img/donut.png";
import imgChips from "../img/chips.png";
import imgFootball from "../img/football.png";

import weather1 from "../img/w-1.png";
import weather2 from "../img/w-2.png";
import weather3 from "../img/w-3.png";
import weather4 from "../img/w-4.png";
import weather5 from "../img/w-5.png";
import weather6 from "../img/w-6.png";

init();
/*
 **
 **  Initialise the game
 **
 */
function init() {
  const state = {};

  /* 
    state.
      {balance: 100, stock: Inventory, env: Environment}
      balance: 100
      env: Environment {curDay: 0, maxDay: 10, weather: 5}
      stock: Inventory {stock: Array(6)}
 */

  // Game init
  state.balance = 100;
  state.stock = new Inventory();
  state.env = new Environment();

  // testing purposes only
  window.state = state;

  // Generate default items
  //addItem(item, quantity, cost, sell, wasted, w6, w54, w32, w1, iconname)
  state.stock.addItem("soft drink", 0, 1, 5, false, "softdrink", 20, 25, 35, 50, 70, 100);
  state.stock.addItem("icecream", 0, 2, 4, false, "icecream", 5, 10, 15, 30, 60, 100);
  state.stock.addItem("hotdog", 0, 3, 7, true, "hotdog", 30, 40, 50, 40, 30, 20);
  state.stock.addItem("cheeseburger", 0, 2, 6, true, "burger", 45, 40, 30, 30, 20, 20);
  state.stock.addItem("jam donut", 0, 2, 4, false, "donut", 60, 50, 30, 30, 20, 20);
  state.stock.addItem("hot chip", 0, 3, 5, true, "chips", 20, 50, 70, 70, 65, 60);

  // Onetime set src for buttons
  elements.footballImg.src = imgFootball;
  elements.weatherImg1.src = weather1;
  elements.weatherImg2.src = weather2;
  elements.weatherImg3.src = weather3;
  elements.weatherImg4.src = weather4;
  elements.weatherImg5.src = weather5;
  elements.weatherImg6.src = weather6;

  updateUI();
  inventoryView.renderDailySummaryForecast(state.env.getWeatherDesc(), 1, state.balance);
  environmentView.renderWeather(state.env.getWeather());
}

// Empty fields, render stock images, and balance
function updateUI() {
  let markup = "";

  inventoryView.clearInventory();

  state.stock.stock.forEach(el => {
    inventoryView.renderInventoryImages(el);
    inventoryView.renderPriceImages(el);
  });

  inventoryView.renderAccountBalance(state.env.curDay, state.balance);
}

// End of day, so create a daily summary report
function dailySummary() {
  let markup = "";
  const day = state.env.curDay;

  // update inventory and sales tables
  //state.stock.stock.forEach(el => (markup += inventoryView.renderSale(el)));

  if (day > 0) {
    if (markup) inventoryView.renderSales(markup);
    inventoryView.renderDailySummaryHeader(day, state.balance);

    //loop through all inventory for wastage
    state.stock.stock.forEach(el => {
      if (el.lastSold > 0) inventoryView.renderDailySummarySale(day, el);

      const qty = state.stock.getWasted(el);
      if (qty) inventoryView.renderDailySummaryWastage(day, el.item, qty, qty * el.cost);
    });

    inventoryView.renderDailySummaryLedger(day, state.gross, state.balance);

    // spin up tomorrows weather and print it
    inventoryView.renderDailySummaryForecast(state.env.getWeatherDesc(), day + 1, state.balance);
    environmentView.renderWeather(state.env.getWeather());
  }
}

// Perform a purchase + popup toast
function promptPurchase(item, quantity) {
  const index = state.stock.stock.findIndex(el => el.item === item);
  const sale = state.stock.processItem(item, quantity, "buy", state.balance);

  state.balance -= sale[0];

  // If a zero is returned, they ran out of money!
  if (sale[0] === 0) {
    inventoryView.toast(`Uh-oh, you can't afford that!`);
  } else {
    inventoryView.toast(`You bought ${quantity} ${item}s for $${sale[0]}!`);
  }

  updateUI();
}

// New day button has been clicked
function processDay() {
  // Check if game is live
  if (state.env.updateDay()) {
    state.gross = 0;

    state.stock.stock.forEach((el, i) => {
      // find demand
      const demand = state.stock.getDemand(el.item, state.env.getWeather());
      // make sales
      const sale = state.stock.processItem(el.item, demand, "sell", state.balance);

      el.numSold = sale[1];
      state.gross += sale[0];
      state.balance += sale[0];
    });

    state.env.generateWeather();

    // Print the report
    dailySummary();

    //update the UI
    updateUI();
  }
}

/**********************************************
 *** EVENT LISTENERS
 **********************************************/

// Begin a new game
elements.newGame.addEventListener("click", e => {
  init();
});

// New day button has been clicked
elements.nextDay.addEventListener("click", e => {
  processDay();
});

// Listen to stock item purchase clicks
elements.inventoryImages.addEventListener("click", e => {
  try {
    const item = e.target.dataset.item;
    const quantity = parseInt(e.target.dataset.quantity, 10);

    promptPurchase(item, quantity);
  } catch {}
});
