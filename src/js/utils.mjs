// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
// returns a product id from the URL when requested
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export function updateCartCount() {
  const badge = document.querySelector("#cart-count");
  if (!badge) return;
  const cartItems = getLocalStorage("so-cart") || [];
  badge.textContent = cartItems.length;
  //counts number of items in cart to display when greater than 0, otherwise hides the badge
  const count = (getLocalStorage("so-cart") || []).length;
  badge.textContent = count > 0 ? count : "";
  badge.hidden = count === 0;
}

export async function loadHeaderFooter() {
  // load the header & footer paths
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  // load the header and footer elements from the DOM
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  // render the header and footer templates into the DOM
  renderWithTemplate(headerTemplate, headerElement);
  updateCartCount();
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  // creates an element to hold the alert
  const alert = document.createElement("div");
  // adds class to style it
  alert.classList.add("alert");
  // set the contents with an X option to close the alert
  alert.append(document.createTextNode(message));
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close alert");
  closeButton.textContent = "X";
  alert.append(closeButton);
  
  // add a listener to see if they close it
  // if they did, then remove the child
  alert.addEventListener("click", function(e) {
    if (e.target === closeButton) {
      main.removeChild(alert);
    }
  })
  // add alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}