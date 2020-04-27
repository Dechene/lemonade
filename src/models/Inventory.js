export default class Inventory {
  constructor() {
    this.stock = [];
  }

  addItem(
    description,
    quantity,
    cost = 2,
    sell = 4,
    wasted = false,
    w6,
    w54,
    w32,
    w1
  ) {
    const item = {
      item: description,
      quantity: quantity,
      cost: cost,
      sell: sell,
      wasted: wasted,
      w6: w6,
      w54: w54,
      w32: w32,
      w1: w1,
    };

    this.stock.push(item);
    return item;
  }

  // type === 'buy' || 'sell'
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
    }

    return [value, quantity];
  }

  getDemand(description, weather) {
    let demand = 0;

    // get array item being sold
    const index = this.stock.findIndex(el => el.item === description);

    // get the demand for this item
    if (weather === 1) demand = this.stock[index].w1;
    if (weather === 3) demand = this.stock[index].w32;
    if (weather === 5) demand = this.stock[index].w54;
    if (weather === 6) demand = this.stock[index].w6;

    return demand;
  }
}
