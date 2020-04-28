import { elements } from "../views/baseView";

// Clear the stock images before rewriting them
export const clearInventory = () => {
  elements.inventoryImages.innerHTML = "";
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

// Write the current account balance
export const renderAccountBalance = (day, balance) => {
  const markup = `<h1 class="sansserif">$${balance}</h1>`;
  elements.balance.innerHTML = markup;
};

// Empty the daily sales table
export const clearSales = () => {
  elements.sellLedger.innerHTML = `<tr><th>Item</th><th>Sell Price</th><th>Number Sold</th><th>Profit</th></tr>`;
};

// Create mark for a single Sale table row
export const renderSale = item => {
  const markup = `<tr>
            <td>${item.item}</td>
            <td>$${item.sell}</td>
            <td>${item.numSold}</td>
            <td>$${item.numSold * item.sell}</td>
        </tr>`;
  return markup;
};

// Write the Sale markup for the entire table
export function renderSales(markup) {
  elements.sellLedger.insertAdjacentHTML("beforeend", markup);
}

// Update sales header
export const renderSalesTitle = day => {
  const markup = `Day #${day} - Results`;
  elements.sellTitle.innerHTML = markup;
};

// The last row written to the daily summary
export const renderDailySummaryLedger = (day, profit, balance) => {
  const markup = `-------------------------------------------------------------
                  <div>Day #${day} - Profit: $${profit} - Ending Balance: $${balance}</div>`;
  elements.sellSummary.insertAdjacentHTML("afterbegin", markup);
};

// The middle row written (if required) to the daily summary
export const renderDailySummaryWastage = (day, item, quantity, value) => {
  const markup = `<div>Day #${day} - You had to throw away ${quantity} ${item}'s worth ${value}</div>`;
  elements.sellSummary.insertAdjacentHTML("afterbegin", markup);
};

// The first row written to the daily summary
export const renderDailySummaryHeader = (day, weather) => {
  const markup = `<div>Day #${day} - Weather: ${weather}</div>`;
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
