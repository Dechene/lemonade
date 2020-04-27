import { elements } from "../views/baseView";

export const renderInventory = item => {
  const markup = `    
        <tr class="item dropdown" data-item="${item.item}">
        <td>${item.item}</td>
        <td>${item.quantity}</td>
        <td>$${item.cost}</td>
        <td>$${item.sell}</td>
        <td> 
              <div class="dropdown-content">
                <div>${item.item}</div>
                <div data-item="${item.item}" data-quantity="10">+10 units for $${item.cost * 10} </div>
                <div data-item="${item.item}" data-quantity="25">+25 units for $${item.cost * 25} </div>
                <div data-item="${item.item}" data-quantity="50">+50 units for $${item.cost * 50} </div>
              </div>
        </td>
        </tr>            
       `;

  elements.inventoryList.insertAdjacentHTML("beforeend", markup);
};

export const renderInventorySummary = (day, balance) => {
  const markup = `You are on Day ${day} of 10, and you currently have $${balance}.`;

  elements.inventorySummary.innerHTML = markup;
};

export const clearInventory = () => {
  elements.inventoryList.innerHTML = `<tr class="item dropdown" data-item="title" ><td>Item</td><td>Quantity</td><td>Buy Price</td><td>Sell Price</td></tr>`;
  elements.saleList.innerHTML = `<tr><td>Item</td><td>Sell Price</td><td>Number Sold</td> <td>Profit</td></tr>`;
  elements.sellSummary.innerHTML = "";
};

export const renderSales = item => {
  const markup = `    
        <tr>
            <td>${item.item}</td>
            <td>${item.sell}</td>
            <td>${item.numSold}</td>
            <td>$${item.numSold * item.sell}</td>
        </tr>     
       `;

  elements.saleList.insertAdjacentHTML("beforeend", markup);
};

export const renderSalesTitle = day => {
  const markup = `Day #${day} - Results`;

  elements.sellTitle.innerHTML = markup;
};

export const renderSalesSummary = (weather, profit) => {
  const markup = `On this ${weather} day, you made ${profit} profit!`;

  elements.sellSummary.innerHTML = markup;
};
