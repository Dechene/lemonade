export default class Inventory {
  constructor() {
    this.stock = [];
  }

  // Add a new item to the store
  addItem(item, quantity, cost, sell, wasted, w6, w54, w32, w1, iconname) {
    const stock = {
      item,
      quantity,
      cost,
      sell,
      wasted,
      w6,
      w54,
      w32,
      w1,
      iconname,
    };

    this.stock.push(stock);
    return stock;
  }

  // Process a purchase or a sale, type === 'buy' || 'sell'
  processItem(description, quantity, type, balance) {
    let value = 0;
    const index = this.stock.findIndex(el => el.item === description);

    if (type === "buy") {
      value = this.stock[index].cost * quantity;

      // Can they afford it?
      if (value > balance) return [-1, -1];

      this.stock[index].quantity += quantity;
    } else if (type === "sell") {
      if (quantity > this.stock[index].quantity) {
        quantity = this.stock[index].quantity;
      }
      value = this.stock[index].sell * quantity;
      this.stock[index].quantity -= quantity;
      
      //details of this transaction
      this.stock[index].lastSold = quantity;
      this.stock[index].lastValue = value;

    }


    return [value, quantity];
  }

  // Find the daily demand for a particular item
  getDemand(item, weather) {
    let demand = 0;

    const index = this.stock.findIndex(el => el.item === item);

    if (weather === 1) demand = this.stock[index].w1;
    if (weather === 3) demand = this.stock[index].w32;
    if (weather === 5) demand = this.stock[index].w54;
    if (weather === 6) demand = this.stock[index].w6;

    return demand;
  }

  //if the stock has a shelflife of 1 day, throw it all away
  getWasted(item) {
    let waste = 0;

    if (item.wasted) {
      waste = item.quantity;
      item.quantity = 0;
    }
    return waste;
  }
}
