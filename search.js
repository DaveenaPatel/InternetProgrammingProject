$.getJSON("data/products.json", function (data) {
  products = data;
});

$("#searchInput").on("keyup", function () {
  let q = $(this).val().toLowerCase();
  let $results = $("#searchResults");
  $results.empty();

  if (q === "") return;

  products
    .filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
    .slice(0, 5)
    .forEach(p => {
      // Highlight the matching part
      let highlightedName = p.name.replace(
        new RegExp(q, "gi"),
        match => `<span class="highlight">${match}</span>`
      );
      $results.append(`<div class="suggestion">${highlightedName}</div>`);
    });
});