const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const productList = document.querySelector(".product-list");

if (!searchForm || !searchInput || !productList) {
  throw new Error("Product search requires the search form, input, and product list.");
}

const productCards = [...productList.querySelectorAll(".product-card")];
const noResultsMessage = document.createElement("p");
noResultsMessage.textContent = "No products found.";
noResultsMessage.setAttribute("aria-live", "polite");
noResultsMessage.hidden = true;
productList.after(noResultsMessage);

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const matches = card.textContent.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  noResultsMessage.hidden = visibleCount > 0;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterProducts();
});

searchInput.addEventListener("input", filterProducts);
