import { elements } from "../views/baseView";

// Clear the stock images before rewriting them
export const clearInventory = () => {
  elements.inventoryImages.innerHTML = "";
  elements.priceListImages.innerHTML = "";
};

// Load the stock images with notifications
export const renderInventoryImages = item => {
  const markup = `
        <div class="dropdown notification" data-item="${item.item}">
        <span class="badge">${item.quantity}</span>
          <img id="id-${item.item}" src="/img/${item.iconname}.png" class="stock" />   
          <div class="dropdown-content">
            <div data-item="${item.item}" data-quantity="10">+10 units for $${item.cost * 10} </div>
            <div data-item="${item.item}" data-quantity="25">+25 units for $${item.cost * 25} </div>
            <div data-item="${item.item}" data-quantity="50">+50 units for $${item.cost * 50} </div>
          </div>
        </div>        
       `;

  elements.inventoryImages.insertAdjacentHTML("beforeend", markup);
};

// Load the smaller stock images for the pricelist view
export const renderPriceImages = item => {
  const markup = `
        <div class="notification-price">
          <span class="badge">$${item.sell}</span>
          <img id="id-${item.item}-sml" src="/img/${item.iconname}.png" class="stock-sml" />   
        </div>        
       `;

  elements.priceListImages.insertAdjacentHTML("beforeend", markup);
};

// Write the current account balance
export const renderAccountBalance = (day, balance) => {
  const markup = `<h1 class="sansserif">$${balance}</h1>`;
  elements.balance.innerHTML = markup;
};

// Write the Sale markup for the entire table
export function renderSales(markup) {
  elements.sellLedger.insertAdjacentHTML("beforeend", markup);
}

// The last row written to the daily summary
export const renderDailySummaryLedger = (day, profit, balance) => {
  const markup = `-------------------------------------------------------------
                  <div>Day ${day} - Profit: $${profit} - Ending Balance: $${balance}</div>`;
  elements.sellSummary.insertAdjacentHTML("afterbegin", markup);
};

// The middle row written (if required) to the daily summary
export const renderDailySummaryWastage = (day, item, quantity, value) => {
  const markup = `<div>Day ${day} - You had to throw away ${quantity} ${item}'s worth $${value}</div>`;
  elements.sellSummary.insertAdjacentHTML("afterbegin", markup);
};

// The middle row written (if required) to the daily summary
export const renderDailySummarySale = (day, item) => {
  const markup = `<div>Day ${day} - $${item.sell} ${item.item}s - Sold ${item.lastSold}, made $${item.lastValue}</div>`;
  elements.sellSummary.insertAdjacentHTML("afterbegin", markup);
};

// The first row written to the daily summary
export const renderDailySummaryHeader = (day, balance) => {
  const markup = `<div>Day ${day} - Starting Balance: $${balance}</div>`;
  elements.sellSummary.insertAdjacentHTML("afterbegin", markup);
};

// The next days weather forecast
export const renderDailySummaryForecast = (weather, day) => {
  const markup = `<div>The weather for day ${day} should be ${weather}!</div>`;
  elements.sellSummary.insertAdjacentHTML("afterbegin", markup);
};

// Popup a prompt displaying last purchase
export const toast = message => {
  // Add the "show" class to DIV and set the message
  elements.toast.innerText = message;
  elements.toast.classList.toggle("show");

  setTimeout(function () {
    elements.toast.className = elements.toast.className.replace("show", "");
  }, 3000);
};
