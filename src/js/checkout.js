import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();
document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    await checkout.checkout();
  });

loadHeaderFooter();
