import { elements } from "../views/baseView";

export const renderInventoryImages = item => {
  const markup = `
        <div class="dropdown notification" data-item="${item.item}">
        <span class="badge">${item.quantity}</span>
          <img id="id-${item.item}" height='75px' width='75px' src="/img/${item.icon}.png" class="stock"  />    
          <div class="dropdown-content">
            <div data-item="${item.item}" data-quantity="10">+10 units for $${item.cost * 10} </div>
            <div data-item="${item.item}" data-quantity="25">+25 units for $${item.cost * 25} </div>
            <div data-item="${item.item}" data-quantity="50">+50 units for $${item.cost * 50} </div>
          </div>
        </div>        
       `;

  elements.inventoryImages.insertAdjacentHTML("beforeend", markup);
};

export const renderInventorySummary = (day, balance) => {
  // const markup = `You are on Day ${day} of 10, and you currently have $${balance}.`;
  const markup = `<h1 class="sansserif">$${balance}</h1>`;

  elements.inventorySummary.innerHTML = markup;
};

export const clearInventory = () => {
  elements.sellLedger.innerHTML = `<tr><th>Item</th><th>Sell Price</th><th>Number Sold</th><th>Profit</th></tr>`;
  elements.sellSummary.innerHTML = "";
  elements.inventoryImages.innerHTML = "";
};

export const renderSale = item => {
  const markup = `<tr>
            <td>${item.item}</td>
            <td>${item.sell}</td>
            <td>${item.numSold}</td>
            <td>$${item.numSold * item.sell}</td>
        </tr>`;
  return markup;
  //elements.saleList.insertAdjacentHTML("beforeend", markup);
};

export function renderSales (markup){
  elements.sellLedger.insertAdjacentHTML("beforeend", markup);

}

export const renderSalesTitle = day => {
  const markup = `Day #${day} - Results`;

  elements.sellTitle.innerHTML = markup;
};

export const renderSalesSummary = (weather, profit) => {
  const markup = `On this ${weather} day, you made ${profit} profit!`;

  elements.sellSummary.innerHTML = markup;
};
