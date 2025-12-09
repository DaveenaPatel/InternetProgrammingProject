$(document).ready(function(){
  $.getJSON("data/Automotive.json", function(data) {
    data.forEach(function(product) {
      // normalize category: trim spaces and make lowercase
      if (product.category && product.category.trim().toLowerCase() === "automotive") {
        $(".automotive_list").append(`
          <div class="product">
            <img src="${product.image}?random=${product.id}" style="height:120px;">
            <p>${product.name}</p>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
          </div>
        `);
      }
    });
  }).fail(function() {
    console.log('Failed to load JSON file.');
  });
});