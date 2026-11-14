import { loadHeaderFooter } from "./utils.mjs"; //removed since add product to cart function is now in ProductDetails.mjs
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

// console.log(dataSource.findProductById(productId)); //test to see if the product is being retrieved correctly by id

// stole addproducttocart function to use in ProductDetails.mjs

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
