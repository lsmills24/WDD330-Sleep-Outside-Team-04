import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
// Creates an instance of the ExternalServices class with the category parameter
const dataSource = new ExternalServices();
// Then gets the element you want the prod list to render in
const element = document.querySelector(".product-list");
// then create an instance of the ProductList class with the category and send the correct info
const productList = new ProductList(category, dataSource, element);
//then call the init method to render the product list
productList.init();
