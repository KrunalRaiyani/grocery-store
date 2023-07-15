// variables
let slidContainer = document.querySelector(".slid-container");
let slide = document.querySelector(".slid-card");
let openCart = document.querySelector(".cart");
let cartContainer = document.querySelector(".cart-container");
let cartClose = document.querySelector(".cart-close");
let categoryContainer = document.querySelector(".category-list");
let cartCardContainer = document.querySelector(".cart-card-container");
let menu = document.querySelector(".menu");
let sedeBar = document.querySelector(".drop-links");
let closeSideBar = document.querySelector(".close-btn");
let listData = '';



// menu open close

menu.addEventListener('click',()=>{
  sedeBar.style="transform: translateX(100%);"
})

closeSideBar.addEventListener('click',()=>{
  sedeBar.style=" transform: translateX(-100%)"
})


// offet slider
let slideWidth = slide.scrollWidth;
slidContainer.scrollLeft = slideWidth * 0.5;
let counter = 1;

setInterval(() => {
  if (counter != 4) {
    slidContainer.style = `scroll-behavior: smooth`;
    slidContainer.scrollLeft += slideWidth;
    counter++;
  } else {
    slidContainer.style = `scroll-behavior: auto`;
    slidContainer.scrollLeft = slideWidth * 0.5;
    slidContainer.style = `scroll-behavior: smooth`;
    slidContainer.scrollLeft = slideWidth * 1.5;
    counter = 2;
  }
}, 5000);


// cart open
openCart.addEventListener('click', () => {
  cartContainer.style = `transform: translateX(-100%);`
  document.querySelector('.black-background').style = ` z-index: 15;
    opacity: 1;`;
})

// cart close
cartClose.addEventListener('click', () => {
  cartContainer.style = `transform: translateX(100%);`
  document.querySelector('.black-background').style = ` z-index:-15;
    opacity: 0;`
})


window.addEventListener('load', () => {
  let data = fetch("productList/list.json");

  data
    .then((res) => res.json())

    .then((res) => {
      let list = res.list;
      listData = res.list;

      createCatagory(list);
      product(list);
    })

    .catch((error) => {
      console.log(error);
    });

})


// create all catagoryes
function createCatagory(list) {
  let item = list[0].item;
  item.forEach(e => {
    let categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    categoryDiv.innerHTML = `
     <img
     src=${e.img}
     alt="${e.name}"
   />
   <p>${e.name}</p>`;
    categoryContainer.append(categoryDiv);
  });
}

// create product card
function product(list) {
  list.forEach((e, i) => {
    let productCard = '';
    if (e.type == 'card') {
      e.item.forEach((e, n) => {
        productCard +=
          `<div class="product-card" id= "${'c' + i + 'p' + n}">
        <div class="offer-like">
          <span class="discount">${Math.floor(Math.random() * 11)}% OFF</span>
          <i class="fa-regular fa-heart like"></i>
        </div>
        <div class="img-container">
          <img
            src=${e.img}
            alt="${e.name}"
          />
        </div>
        <h4 class="product-name">${e.name}</h4>
        <h4 class="price">${e.price}</h4>
        <div class="item-counter">
          <button class="plus" onclick = "plush(event.target,${'c' + i + 'p' + n})">+</button>
          <span class="item-no">1</span>
          <button class="minus" onclick = "minus(event.target,${'c' + i + 'p' + n})">&#8722;</button>
        </div>
        <button class="cart-btn" onclick="addToCart(event.target,${i},${n},${'c' + i + 'p' + n})">
          <i class="fa-solid fa-cart-shopping"></i>Add to Cart
        </button>
      </div>`

      });
    }

    productCardSection(productCard, e.heading, i);
  });

}

// create product section
function productCardSection(productCard, heading, i) {
  let cardContainer = document.createElement('section');
  cardContainer.classList = 'top-products';
  cardContainer.innerHTML = `
   <h2 class="heading">${heading}</h2>
   <i class="fa-solid fa-chevron-left left-arrow" onclick="scrolLeft(event.target)"></i>
   <i class="fa-solid fa-chevron-right right-arrow" onclick="scrollRight(event.target)"></i>
   <div class="product-wrapper scroll-container">
     <div class="product-list">
      ${productCard}
     </div>
   </div>`
  if (i == 1) {
    document.querySelector('.ad-banner').insertAdjacentElement('beforebegin', cardContainer);
  }
  else if (i > 1) {
    document.querySelector('.ad-banner').append(cardContainer);
  }
  setTimeout(() => {
    if (i == 0) {
      cartItems(1, 0, '1', 'c1p0');
      document.getElementById('c1p0').classList.add('add');
    }
  }, 0);
}

// right scroll button
function scrollRight(e) {
  let scrollContainer = e.parentElement.querySelector('.scroll-container');
  scrollContainer.scrollLeft += 870  ;
}

// left scroll button
function scrolLeft(e) {
  let scrollContainer = e.parentElement.querySelector('.scroll-container');
  scrollContainer.scrollLeft -= 870 ;
}



// add to cart 
function addToCart(e, categoryNo, cardNo, cardId) {
  cardId = cardId.id
  let parentEle = document.getElementById(`${cardId}`)
  if (parentEle.classList.contains('add') == false) {
    parentEle.className += ' add';
    let counterVal = document.getElementById(`${cardId}`).querySelector('.item-counter .item-no').innerHTML;
    cartItems(categoryNo, cardNo, counterVal, cardId);
    let quantaty = document.getElementById(`${'cart' + cardId}`).querySelector('.quantaty')
    if (quantaty) {
      quantaty.innerHTML = (parentEle.querySelector('.item-no')).innerHTML
    }
  }
  openCart.classList.add("alert")
  e.classList.add("alert")
  setTimeout(() => {
    openCart.classList.remove("alert")
    e.classList.remove("alert")
  }, 1000);
  createBill()
}

// create cart items 
function cartItems(categoryNo, cardNo, counterVal, cardId) {
  let cartCard = document.createElement('div');
  cartCard.className = 'cart-card';
  cartCard.id = `cart${cardId}`
  cartCard.innerHTML += `<div class="lhs-section">
  <img
    src=${listData[categoryNo].item[cardNo].img}
    alt="${listData[categoryNo].item[cardNo].name}"
  />
  <div class="price-sectiom">
    <p class="p-name">${listData[categoryNo].item[cardNo].name}</p>
    <div class="p-price">
      <span class = "item-price">${listData[categoryNo].item[cardNo].price}</span>
      <span>X</span>
      <span class="quantaty">1</span>
    </div>
  </div>
</div>
<div class="item-counter">
<button class="plus" onclick = "plush(event.target,${cardId})">+</button>
<span class="item-no">${counterVal}</span>
<button class="minus" onclick = "minus(event.target,${cardId})">&#8722;</button>
</div>
<button class="remove-item" onclick="removeItem(event.target,${cardId})">&#x2716;</button>`

  cartCardContainer.append(cartCard);
}

// increse product quantaty 
function plush(e, cardId) {
  let itemDisplay = e.parentElement.querySelector('.item-no');
  let itemNo = Number(itemDisplay.innerHTML) + 1;
  itemDisplay.innerHTML = itemNo
  let cartId = 'cart' + cardId.id;
  let cartItem = document.getElementById(`${cartId}`)
  if (cartItem) {
    cartItem.querySelector('.item-no').innerHTML = itemNo
  }
  cardId.querySelector('.item-counter .item-no').innerHTML = itemNo;
  createBill()
}

// decrese product quantaty
function minus(e, cardId) {
  let itemDisplay = e.parentElement.querySelector('.item-no');
  let itemNo = Number(itemDisplay.innerHTML) - 1;
  if (itemNo >= 1) {
    itemDisplay.innerHTML = itemNo
    let cartId = 'cart' + cardId.id;
    let cartItem = document.getElementById(`${cartId}`)
    if (cartItem) {
      cartItem.querySelector('.item-no').innerHTML = itemNo
    }
    cardId.querySelector('.item-counter .item-no').innerHTML = itemNo;
  }
  createBill()
}

// remove item from cart
function removeItem(e, cardId) {
  e.parentElement.style = `transform: translateX(514px);`
  cardId.classList.remove('add');
  setTimeout(() => {
    e.parentElement.remove();
    createBill()
  }, 500);
}

// create bill
function createBill() {
  let itemList = cartCardContainer.children
  let subTotal = document.querySelector('.total-rs');
  let tax = document.querySelector('.total-tax');
  let total = document.querySelector('.total');
  let subTotalRs = 0;
  if (itemList.length >= 1) {
    Array.from(itemList).forEach((element) => {
      let quantaty =Number(element.querySelector('.item-no').innerHTML);
      let itemPr = element.querySelector('.item-price').innerHTML;
      let itemPrice = itemPr.slice(0,-1);
      itemPrice = Number(itemPrice)
     

      subTotalRs += quantaty*itemPrice


    })
  }
  subTotal.innerHTML = subTotalRs+'₹'
  tax.innerHTML = itemList.length + '₹'
  total.innerHTML = subTotalRs + itemList.length + '₹'
}