import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  updateCartCount,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0,
  );
  document.querySelector(".cart-total").textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__name">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">Qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__remove" data-id="${item.Id}"> ❌ </button>
</li>`;

  // console.log("cartItemTemplate called with item:", item);
  return newItem;
}

document.querySelector(".product-list").addEventListener("click", (event) => {
  const removeButton = event.target.closest(".cart-card__remove");
  if (!removeButton) return;

  const cartItems = getLocalStorage("so-cart") || [];
  const itemIndex = cartItems.findIndex(
    (item) => item.Id === removeButton.dataset.id,
  );

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
    renderCartContents();
  }
});

document.querySelector(".checkout-button").addEventListener("click", () => {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items to your cart before checking out.");
    return;
  }
  window.location.href = "/checkout/index.html";
});

renderCartContents();
