function getHeaderTemplate(dishIndex) {
  //template funktioniert nicht
  return `<header>
      <h1><img class="head_logo" src="./Logo/Logo.png" /></h1>
    </header>
    <div>
      <img class="title_pic" src="./assets/burgers.jpg" alt="titelbild" />
    </div>
    <section class="margin_LR">
      <h2 class="restaurant_h2">Dev Patty</h2>
      <span>Bewertung ()</span>
    </section>
    <div class="select_categ margin_LR margin_divs">
      <a onclick="renderDishes">Hauptgerichte</a>
      <a onclick="renderSideDish">Beilagen</a>
    </div>`
}


function getDishTemplate(dishesArray, dishIndex) {
  const dish = dishesArray[dishIndex]; //holt das aktuelle gericht
  return `<div class="select_dish margin_LR margin_divs">
      <h3>${dish.name}</h3>
      <span>${dish.description}</span>
      <div class="dish_div">
        <span>${dish.price.toFixed(2)}€</span>
        <button onclick="addBasket(${dishIndex})">+</button>
      </div>
      <button onclick="activateBasket(currentBasketItems)">Warenkorb Anzeigen</button>
    </div>`
}


function getBasketItemTemplate(item, index, currentBasketItems) {
  return `
            <div class="item_layout">
              <h3>${item.name}</h3>
              <div class="basket_item">
                <button onclick="decreaseItem(${index})">-</button>
                <span id="item_index${index}">1</span>
                <button onclick="increaseItem(${index})">+</button>
                <span id="currentPrice${index}">${item.price.toFixed(2)}€</span>
              </div>
            </div>
   `
}

  