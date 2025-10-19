let dishContent = document.getElementById("dishes");
let currentBasketItems = [];

function renderData(dishesToRender) {
  let dishContent = document.getElementById("dishes");
  dishContent.innerHTML = "";
  for (let dishIndex = 0; dishIndex < dishesToRender.length; dishIndex++) {
    dishContent.innerHTML += getDishTemplate(dishesToRender, dishIndex);
  }
}

function addBasket(index) {
  let existingItem = currentBasketItems.find(
    (item) => item.name === myDishes[index].name
  );
  if (existingItem) {
    existingItem.amount++;
  } else {
    currentBasketItems.push({
      ...myDishes[index],
      amount: 1,
    });
  }

  if (!isMobileView()) {
    basket_display();
  }

  renderBasket();
  saveToLocalStorage();
  updateBasketCounter();
}

function renderBasket() {
  let basketContent = document.getElementById("basket-item-container");
  basketContent.innerHTML = "";

  for (let i = 0; i < currentBasketItems.length; i++) {
    basketContent.innerHTML += getBasketItemTemplate(currentBasketItems[i], i);
  }
  document.getElementById("basket_price").innerText =
    calculateTotal().toFixed(2) + "€";
}

function BubblingProtection(event) {
  event.stopPropagation();
}

function increaseItem(index) {
  currentBasketItems[index].amount++;
  let value = currentBasketItems[index].amount;
  document.getElementById("item_index" + index).innerHTML = value;
  calculatePrice(index);
  saveToLocalStorage();
}

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
  const totalPrice =
    currentBasketItems[index].amount * currentBasketItems[index].price;
  document.getElementById("currentPrice" + index).innerText =
    totalPrice.toFixed(2) + "€";
  document.getElementById("basket_price").innerText =
    calculateTotal().toFixed(2) + "€";
}

function calculateTotal() {
  return currentBasketItems.reduce(function (sum, item) {
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
  updateBasketCounter();
}

function confirmation() {
  let overlayRef = document.getElementById("order_confirmation");
  overlayRef.classList.remove("d_none");
  currentBasketItems.splice(0, currentBasketItems.length);
  renderBasket();
  updateBasketCounter();
}

function basket_display() {
  let overlayRef = document.getElementsByClassName("basket_container");
  overlayRef[0].classList.remove("d_none");
}

function splice_product(index) {
  currentBasketItems.splice(index, 1);
  renderBasket();
}

function toggleBasket() {
  let overlayRef = document.getElementsByClassName("basket_container")[0];
  overlayRef.classList.toggle("d_none");
}

function isMobileView() {
  return window.innerWidth <= 375;
}

function updateBasketCounter() {
  let count = 0;
  const countElement = document.getElementById("basketCount");
  basketCount = currentBasketItems.reduce((sum, item) => sum + item.amount, 0);
  countElement.innerText = basketCount;
}
