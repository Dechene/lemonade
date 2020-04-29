import Inventory from "./../models/Inventory";
import Environment from "../models/Environment";

import { elements } from "./../views/baseView";
import * as inventoryView from "./../views/inventoryView";

import "./../css/style.css";

import imgBurger from "../img/burger.png";
import imgSoftdrink from "../img/softdrink.png";
import imgIcecream from "../img/icecream.png";
import imgHotdog from "../img/hotdog.png";
import imgDonut from "../img/donut.png";
import imgChips from "../img/chips.png";
import imgFootball from "../img/football.png";

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
  state.stock.addItem("soft drink",   0, 1, 5, false, 200, 120, 80, 40, "softdrink");
  state.stock.addItem("icecream",     0, 2, 4, false, 250, 160, 80, 60, "icecream");
  state.stock.addItem("hotdog",       0, 3, 7, true, 20, 40, 80, 110, "hotdog");
  state.stock.addItem("cheeseburger", 0, 2, 6, true, 20, 40, 80, 110, "burger");
  state.stock.addItem("jam donut",    0, 2, 4, false, 20, 40, 80, 110, "donut");
  state.stock.addItem("hot chip",     0, 3, 5, true, 160, 220, 200, 220, "chips");

  // Onetime set src for buttons
  elements.footballImg.src = imgFootball;

  updateUI();
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
    inventoryView.renderDailySummaryForecast(state.env.getWeatherDesc(), day + 1);
  }
}

// Perform a purchase + popup toast
function promptPurchase(item, quantity) {
  const index = state.stock.stock.findIndex(el => el.item === item);
  const sale = state.stock.processItem(item, quantity, "buy", state.balance);

  state.balance -= sale[0];
  inventoryView.toast(`You bought ${quantity} ${item}s for $${sale[0]}!`);

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
  const item = e.target.dataset.item;
  const quantity = parseInt(e.target.dataset.quantity, 10);

  promptPurchase(item, quantity);
});
