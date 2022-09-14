const mainItems = document.querySelector("#items");
const cartLogo = document.querySelector("#cart-logo");

let count = 0;
const totalPriceArr = [];
const allItems = [];
let stateBtn = true;

//Generating all items from items.js

const createItems = () => {
  items.forEach((item, i) => {
    mainItems.innerHTML += `
                <div class='card'>
                  <div id = 'img-parent'>
                    <img src=${item.imgURL} alt='img${i}'></img> 
                  </div>
                  <p>${item.name}</p>
                    <div class='price-and-btn'>
                      <b class='card-price'>${item.price.toFixed(2)}$</b>
                      <button class='card-btn' id = ${i}>Add</button> 
                    </div>
                </div>
                `;

    //Action when clicking on the item buttons

    const btn = document.querySelectorAll(".card-btn");

    btn.forEach((item, i) => {
      item.addEventListener("click", () => {
        buttonAction(item, i);
      });
    });
  });
};
createItems();

const buttonAction = (value, i) => {
  if (value.textContent === "Add") {
    checkState(value, count++, "Is Added", " rgb(200, 200, 200)", false);
    addItem(items[i], i, value);
    totalPriceCount();
    window.onload = resizeCart();
  } else {
    checkState(value, count--, "Add", " rgb(245, 245, 245)", true);
    removeItem(i);
    window.onload = resizeCart();
  }
  cartLogo.textContent = `Cart: ${count}`;
};

//Check the state of the button (Add/Is Added)

const checkState = (value, count, textContent1, styleBg, status) => {
  count;
  value.textContent = textContent1;
  value.style.background = styleBg;
  stateBtn = status;
};

// Count the totalPrice

const totalPriceCount = () => {
  const totalPriceDiv = document.querySelector("#total-price_confirm-order");
  const totalPriceText = document.querySelector("#total-price");

  const totalPrice = totalPriceArr.reduce((prev, current) => prev + current);
  totalPriceText.innerHTML = `Total price: ${totalPrice.toFixed(2)}$`;
  count
    ? (totalPriceDiv.style.display = "flex")
    : (totalPriceDiv.style.display = "");
};

//Add item to cart

const innerItems = document.querySelector("#cart-items");

const addItem = (item, id, value) => {
  totalPriceArr[id] = item.price;
  innerItems.innerHTML += `
            <div class='cart-item' id = ${"item" + id}>
              <div class = 'count' id = ${"count" + id}>1</div>
              <div id = 'img-parent'>
                <img src=${item.imgURL} alt='img${id}'></img>
              </div> 
                <div id='cart-name_price_btn'>
                  <p id = 'item-name'>${item.name}</p>
                  <div id = 'cart-price_btn'>
                    <b id = ${"price" + id}>${item.price.toFixed(2)}$</b>
                    <div id = 'btns'>
                      <button class = 'increment' id = ${id}><p>+</p></button>
                      <button class = 'decrement' id = ${id}><p>-</p></button>
                    </div>
                    </div>
                </div>
            </div>
            `;

  //Info about a certain item

  allItems[id] = {
    itemId: id,
    name: item.name,
    price: item.price,
    amount: 1,
    totalPrice: item.price,
    valueCart: value,
  };

  //incrementrement and decrementrement functions

  const increment = document.querySelectorAll(".increment");
  const decrement = document.querySelectorAll(".decrement");

  increment.forEach((item1) => {
    let idBtn = Number(item1.id);
    item1.onclick = () => {
      const priceDiv = document.querySelector("#price" + idBtn);
      const countItems = document.querySelector("#count" + idBtn);

      allItems[idBtn].amount++;
      priceDiv.textContent = (
        allItems[idBtn].price * allItems[idBtn].amount
      ).toFixed(2);
      totalPriceArr[idBtn] = Number(priceDiv.textContent);
      countItems.textContent = allItems[idBtn].amount;
      allItems[idBtn].totalPrice = Number(priceDiv.textContent).toFixed(2);
      priceDiv.textContent += "$";
      totalPriceCount();
    };
  });
  decrement.forEach((item1) => {
    let idBtn = Number(item1.id);
    item1.onclick = () => {
      const priceDiv = document.querySelector("#price" + idBtn);
      const countItems = document.querySelector("#count" + idBtn);

      if (allItems[idBtn].amount === 1) {
        checkState(
          allItems[idBtn].valueCart,
          count--,
          "Add",
          " rgb(245, 245, 245)",
          true
        );
        removeItem(idBtn);
        cartLogo.textContent = `Cart: ${count}`;
      } else {
        allItems[idBtn].amount--;
        priceDiv.textContent = (
          allItems[idBtn].price * allItems[idBtn].amount
        ).toFixed(2);
        totalPriceArr[idBtn] = Number(priceDiv.textContent);
        countItems.textContent = allItems[idBtn].amount;
        allItems[idBtn].totalPrice = Number(priceDiv.textContent).toFixed(2);
        priceDiv.textContent += "$";
        totalPriceCount();
      }
    };
  });
};

//Remove item from cart

const removeItem = (id) => {
  const elem = document.getElementById("item" + id);

  innerItems.removeChild(elem);
  totalPriceArr[id] = 0;
  allItems[id] = {};
  totalPriceCount();
};

//Output the main information about items that we ordered in the check by pressing the button "Confirm the order"

const check = document.querySelector("#check");
const checkBg = document.querySelector("#check-bg");
const closeBtn = document.querySelector(".close");
const itemsCheck = document.querySelector("#items-check");
const totalPriceCheck = document.querySelector("#total-price-check");

closeBtn.onclick = () => {
  checkBg.style.display = "";
  check.style.display = "";
  itemsCheck.innerHTML = "";
};

const totalPriceBtn = document.querySelector("#confirm-order");
totalPriceBtn.onclick = () => {
  checkBg.style.display = "block";
  check.style.display = "flex";
  allItems.forEach((item) => {
    itemsCheck.innerHTML += `
      <div class="item-info">
      <p style="margin:10px 0">${item.amount} x ${item.name}</p>
      <b>${item.totalPrice} $</b>
      `;
    totalPriceCheck.textContent = `${totalPriceArr
      .reduce((prev, current) => prev + current)
      .toFixed(2)} $`;
  });
};

// //Change the number of items in row

const priceAndBtn = document.querySelectorAll(".price-and-btn");

const cartOpen = () => {
  const cartNamePriceBtn = document.querySelectorAll("#cart-name_price_btn");
  const cartPriceBtn = document.querySelectorAll("#cart-price_btn");
  const cartItem = document.querySelectorAll(".cart-item");
  const cardPrice = document.querySelectorAll(".card-price");
  const cartStyle = (resolution, row, px) => {
    card.forEach((item) => {
      if (window.innerWidth <= resolution) {
        item.style.width = `calc((100%/${row}) - ${px})`;
      }
      if (window.screen.width <= 660) {
        priceAndBtn.forEach((item) => {
          item.style.display = "block";
        });
        cardPrice.forEach((item) => {
          item.style.margin = "0";
        });
        cartPriceBtn.forEach((item) => {
          item.style.display = "block";
          item.lastElementChild.style.paddingTop = "10px";
        });
        cartItem.forEach((item) => {
          item.style.display = "block";
          item.style.textAlign = "center";
        });
        cartNamePriceBtn.forEach((item) => {
          item.style.padding = "0";
        });
      } else {
        cartNamePriceBtn.forEach((item) => {
          item.style.padding = "10px 0 10px 10px";
        });
        priceAndBtn.forEach((item) => {
          item.style.display = "flex";
        });
        cartPriceBtn.forEach((item) => {
          item.style.display = "flex";
          item.lastElementChild.style.paddingTop = "";
        });
        cartItem.forEach((item) => {
          item.style.display = "flex";
          item.style.textAlign = "";
        });
        cardPrice.forEach((item) => {
          item.style.marginRight = "10px";
        });
      }
    });
  };
  cartStyle(3840, 7, "60px");
  cartStyle(3450, 6, "60px");
  cartStyle(2560, 5, "60px");
  cartStyle(2200, 4, "60px");
  cartStyle(1670, 3, "60px");
  cartStyle(1160, 2, "60px");
  cartStyle(760, 2, "50px");
  cartStyle(660, 2, "40px");
  cartStyle(500, 1, "40px");
};
const cartClose = () => {
  const cardPrice = document.querySelectorAll(".card-price");
  const cartStyle = (resolution, row, px) => {
    card.forEach((item) => {
      if (window.innerWidth <= resolution) {
        priceAndBtn.forEach((item) => {
          item.style.display = "flex";
        });
        cardPrice.forEach((item) => {
          item.style.marginRight = "10px";
        });
        item.style.display = "flex";
        item.style.width = `calc((100%/${row}) - ${px})`;
      }
    });
  };
  cartStyle(3840, 7, "60px");
  cartStyle(2560, 6, "60px");
  cartStyle(1920, 5, "60px");
  cartStyle(1500, 4, "60px");
  cartStyle(760, 3, "50px");
  cartStyle(660, 3, "40px");
  cartStyle(590, 3, "40px");
  cartStyle(554, 2, "40px");
};

//Open/Close the cart;

const card = document.querySelectorAll(".card");
const cart = document.querySelector("#cart");

let statusLogo = true;
const clickCart = () => {
  if (statusLogo) {
    statusLogo = false;
    cart.style.display = "flex";
    window.onload = cartOpen();
  } else {
    statusLogo = true;
    cart.style.display = "";
    window.onload = cartClose();
  }
};
cartLogo.onclick = clickCart;
const btnOpenCart = document.querySelectorAll(".card-btn");
const resizeCart = () => {
  clickCart;
  if (cart.style.display === "flex") {
    btnOpenCart.forEach((item, i) => {
      item.onclick = () => (window.onload = cartOpen);
    });
    window.onload = cartOpen();
  } else {
    window.onload = cartClose();
  }
};
window.onload = () => resizeCart();
window.onresize = () =>  resizeCart();

