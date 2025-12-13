$.getJSON("data/products.json", function (data) {
  products = data;
});

$("#searchInput").on("keyup", function () {
  let q = $(this).val().toLowerCase();
  let $results = $("#searchResults"); // <-- use the correct div
  $results.empty();

  if (q === "") return;

  products
    .filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
    .slice(0, 5)
    .forEach(p => {
      $results.append(`<div class="suggestion">${p.name}</div>`);
    });
});