function getDishTemplate(dishesArray, dishIndex) {
  const dish = dishesArray[dishIndex]; //holt das aktuelle gericht
  return `<div class="select_dish margin_LR margin_divs">
      <h3>${dish.name}</h3>
      <span>${dish.description}</span>
      <div class="dish_div">
        <span>${dish.price.toFixed(2)}€</span>
        <button onclick="addBasket(${dishIndex})">+</button>
      </div>
    </div>`
}


function getBasketItemTemplate(item, index, currentBasketItems) {
  return `
            <div class="item_layout">
              <h3>${item.name}</h3>
              <div class="basket_item">
                <button onclick="decreaseItem(${index})">-</button>
                <span id="item_index${index}">${item.amount}</span>
                <button onclick="increaseItem(${index})">+</button>
                <span id="currentPrice${index}">${item.price.toFixed(2)}€</span>
              </div>
            </div>
   `
}

  