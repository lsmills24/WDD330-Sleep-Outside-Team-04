import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();

    const zipInput = document.querySelector("#zip");
    zipInput.addEventListener("input", () => {
      if (zipInput.value.trim()) {
        this.calculateOrderTotal();
      }
    });
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce((total, item) => total + Number(item.FinalPrice), 0);

    document.querySelector(`${this.outputSelector} .cart-items`,).textContent = `Items: ${this.list.length}`;
    document.querySelector(`${this.outputSelector} .cart-subtotal`,).textContent = `Subtotal: $${this.itemTotal.toFixed(2)}`;

  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06);
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} .cart-tax`);
    const shipping = document.querySelector(`${this.outputSelector} .cart-shipping`);
    const total = document.querySelector(`${this.outputSelector} .order-total`);

    tax.textContent = `Tax: $${this.tax.toFixed(2)}`;
    shipping.textContent = `Shipping: $${this.shipping.toFixed(2)}`;
    total.textContent = `Order Total: $${this.orderTotal.toFixed(2)}`;
  }
}