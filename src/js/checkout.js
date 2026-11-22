import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
} from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();
document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const response = await checkout.checkout();

    if (response?.orderId) {
      window.location.href = "/checkout/success.html";
    }
  });

loadHeaderFooter();
