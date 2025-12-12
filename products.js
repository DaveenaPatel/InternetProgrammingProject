$(document).ready(function(){


  $("#automotive_list").click(function(){

$.getJSON("data/Automotive.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})

  $("#clothing_list").click(function(){

$.getJSON("data/Clothing.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})





  $("#beautyAndPersonalCare_list").click(function(){

$.getJSON("data/Beauty & Personal Care.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})





  $("#homeAndKitchen_list").click(function(){

$.getJSON("data/Home & Kitchen.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})




  $("#officeSupplies_list").click(function(){

$.getJSON("data/Office Supplies.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})




  $("#toysAndGames_list").click(function(){

$.getJSON("data/Toys & Games.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})





  $("#sportsAndOutdoors_list").click(function(){

$.getJSON("data/Sports & Outdoors.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})




  $("#petSupplies_list").click(function(){

$.getJSON("data/Pet Supplies.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})




  $("#gardenAndOutdoors_list").click(function(){

$.getJSON("data/Garden & Outdoors.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})






  $("#electronics_list").click(function(){

$.getJSON("data/Electronics.json", function(products) {
  $(".products").empty();
  products.forEach(function(product){
 $(".products").append(`
  <div class="product">
    <img src="${product.image}?v=${Math.random()}" />
    <p class="name">${product.name}</p>
    <p class="price">${product.price}</p>
    <p class="id">${product.id}</p>
    <p class="category">${product.category}</p>
    <p class="description">${product.description}</p>
    <p class="stock">${product.stock}</p>
    <p class="sku">${product.sku}</p>


  </div>
`);
  });
});

})














});