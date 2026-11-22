import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// takes items currently stored in the cart (localstorage) and returns a simplified form
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    // An Array.map would be perfect for this process.
    const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

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

  async checkout() {
    // get the form element data by the form name
    // convert the form data to a JSON order object using the formDataToJSON function
    // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
    // call the checkout method in the ExternalServices module and send it the JSON order data.
    const formElement = document.querySelector("#checkout-form");
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    //console.log(order);

    try {
      const response = await services.checkout(order);
      console.log(response);
      setLocalStorage(this.key, []); // clears local storage after a successful POST
      this.list = []; // empties the cart list
      updateCartCount(); // resets the cart item count 
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}