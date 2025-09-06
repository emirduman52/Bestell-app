//global defined
let dishContent = document.getElementById("dishes");
let currentBasketItems = [];
var value = 1;


function renderData(dishesToRender) {
    let dishContent = document.getElementById("dishes");
    dishContent.innerHTML = "";
    for (let dishIndex = 0; dishIndex < dishesToRender.length; dishIndex++) {
    dishContent.innerHTML += getDishTemplate(dishesToRender, dishIndex)        
    }
}


function renderFiltered(index) {
    if (index == 1) {
        renderData(myDishes.filter(dish => dish.category === "main"));
    }
    if (index == 2) {
        renderData(myDishes.filter(dish => dish.category === "side"));
    }
}

function addBasket(index) {
    //saves the current product in basket array
    currentBasketItems.push(myDishes[index]);    
    renderBasket();
    saveToLocalStorage();

}

function renderBasket() {
    let basketContent = document.getElementById("basket-item-container");
    basketContent.innerHTML = "";

    for (let i = 0; i < currentBasketItems.length; i++) {
        basketContent.innerHTML += getBasketItemTemplate(currentBasketItems[i], i)
        
    }
    document.getElementById("basket_price").innerText = calculateTotal().toFixed(2) + "€";

}


//stops Events from triggering at the same time
function BubblingProtection(event) {
    event.stopPropagation();
  }


  function increaseItem(index) {
    currentBasketItems[index].amount++;
    let value = currentBasketItems[index].amount
    document.getElementById("item_index" + index).innerHTML = value;
    calculatePrice(index);
    saveToLocalStorage();
  }

  //decreases Item and removes it from the basket once value is below 1
  function decreaseItem(index) {
    currentBasketItems[index].amount--;
    let value = currentBasketItems[index].amount;
    document.getElementById("item_index" + index).innerHTML = value;
    calculatePrice(index);

    if (currentBasketItems[index].amount < 1) {
        currentBasketItems.splice(index, 1);
        renderBasket();
        return;
    }
    saveToLocalStorage();
  }

  function calculatePrice(index) {
    const totalPrice = currentBasketItems[index].amount * currentBasketItems[index].price;
    document.getElementById("currentPrice" + index).innerText = totalPrice.toFixed(2)+ "€";
    document.getElementById("basket_price").innerText = calculateTotal().toFixed(2) + "€";


  } 

  //calculates the total price in the basket
  function calculateTotal() {
    return currentBasketItems.reduce(function(sum, item) {
        return sum + item.amount * item.price;
    
    }, 0);
  }
  
  function saveToLocalStorage() {
    localStorage.setItem("Basket", JSON.stringify(currentBasketItems));
  }

  function getFromLocalStorage() {
   let storedBasket = JSON.parse(localStorage.getItem("Basket"));
    if (storedBasket) {
      currentBasketItems = storedBasket;
    }
   renderBasket();
 }
 
function confirmation() {
  document.getElementById("order_confirmation");
  return `<span>Hallo</span>`;
  
}
