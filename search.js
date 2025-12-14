let products = [];

//Load products
$.getJSON("data/products.json", function (data) {
    products = data;
});

//Search input
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

            //Highlight text
            let highlightedName = p.name.replace(
                new RegExp(q, "gi"),
                match => `<span class="highlight">${match}</span>`
            );

            $results.append(`
                <div class="suggestion" data-id="${p.id}">
                    ${highlightedName}
                </div>
            `);
        });
});

//Show results
function showResults(query) {
    let q = query.toLowerCase();
    let $products = $(".products");
    $products.empty();

    products
        .filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
        .forEach(p => {

            //Highlight text
            let highlightedName = p.name.replace(
                new RegExp(q, "gi"),
                match => `<span class="highlight">${match}</span>`
            );

            $products.append(`
                <div class="product">
                    <div class="image">
                        <img src="${p.image}?v=${Math.random()}" alt="${p.name}" style="width:200px;height:200px;">
                    </div>
                    <div class="product_info">
                        <p class="name">${highlightedName}</p>
                        <p class="category">Category: ${p.category}</p>
                        <p class="price">Price: ${p.price}</p>
                        <p class="stock">In Stock: ${p.stock}</p>
                        <p class="sku">SKU: ${p.sku}</p>
                        <p class="description">${p.description}</p>
                    </div>
                </div>
            `);
        });
}

//Suggestion click
$(document).on("click", ".suggestion", function () {
    let name = $(this).text();
    showResults(name);
    $("#searchResults").empty();
    $("#searchInput").val(name);
});

//Enter key
$("#searchInput").on("keypress", function (e) {
    if (e.which === 13) {
        showResults($(this).val());
        $("#searchResults").empty();
    }
});
