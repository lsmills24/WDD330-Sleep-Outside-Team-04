import { 
    loadHeaderFooter, 
    getLocalStorage,
    setLocalStorage
} from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

loadHeaderFooter();
