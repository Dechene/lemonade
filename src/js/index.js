import Inventory from "./../models/Inventory";
import Environment from "../models/Environment";

import { elements } from "./../views/baseView";
import * as inventoryView from "./../views/inventoryView";

import "./../css/style.css";

/* Global state of the app
    - Current day
    - Current balance
    - Inventory details
    - The days weather
 */
init();
/*
 **
 **  Initialise the game
 **
 */
function init() {
  // starting balance
  const state = {};
  state.balance = 100;
  state.stock = new Inventory();
  state.env = new Environment();

  // testing purposes only
  window.state = state;

  state.stock.addItem("soft drink", 0, 1, 2, false, 200, 120, 80, 40);
  state.stock.addItem("icecream", 0, 2, 4, false, 250, 160, 80, 60);
  state.stock.addItem("hotdogs", 0, 1, 3, true, 20, 40, 80, 110);
  state.stock.addItem("jam donuts", 0, 1, 3, false, 20, 40, 80, 110);
  state.stock.addItem("hot chips", 0, 1, 2, true, 160, 220, 200, 220);

  //output the stock
  updateUI();
}

function updateUI() {
  //clear current markup
  inventoryView.clearInventory();

  // update inventory and sales tables
  state.stock.stock.forEach(el => {
    inventoryView.renderInventory(el);
    if (state.env.curDay > 0) inventoryView.renderSales(el);
  });

  // update inventory summary and title
  inventoryView.renderInventorySummary(state.env.curDay, state.balance);
  if (state.env.curDay > 0) {
    inventoryView.renderSalesTitle(state.env.curDay);
    inventoryView.renderSalesSummary(state.env.getWeatherDesc(), state.gross);
  }
}

function promptPurchase(item, quantity) {
  const index = state.stock.stock.findIndex(el => el.item === item);

  const sale = state.stock.processItem(item, quantity, "buy", state.balance);

  toast(
    `You bought ${quantity} ${item}'s for $${
      state.stock.stock[index].cost * quantity
    }!`
  );

  state.balance -= sale[0];

  updateUI();
}

function processDay() {
  // change the date
  if (state.env.updateDay()) {
    state.env.generateWeather();
    state.gross = 0;

    // loop through all inventory
    state.stock.stock.forEach(el => {
      // find demand
      const demand = state.stock.getDemand(el.item, state.env.getWeather());

      // make sales
      const sale = state.stock.processItem(
        el.item,
        demand,
        "sell",
        state.balance
      );

      state.gross += sale[0];
      el.numSold = sale[1];
      state.balance += sale[0];
    });

    //clear current markup
    inventoryView.clearInventory();

    //update the UI
    updateUI();
  }
}

elements.newGame.addEventListener("click", e => {
  // initialise a new game
  init();
});

elements.nextDay.addEventListener("click", e => {
  // run a days trades
  processDay();
});

elements.inventoryList.addEventListener("click", e => {
  // user has clicked to buy an item
  const item = e.target.dataset.item;
  const quantity = e.target.dataset.quantity;

  promptPurchase(item, quantity);
});

function toast(message) {
  // Add the "show" class to DIV and set the message
  elements.toast.innerText = (message);
  elements.toast.classList.toggle("show");

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    elements.toast.className = elements.toast.className.replace("show", "");
  }, 3000);
}
