

$(document).ready(function() {

    const itemsPerPage = 10;
    let currentPage = 1;
    let home_Products = [];
    let reviews = [];

    function showPage(page){
        let items = $(".product");
        let start = (page -1) * itemsPerPage;
        console.log("start : "+start)
        let end = start + itemsPerPage;
        items.hide();
        items.slice(start, end).show();
        $("#page_number").text(page);
    }

    //home stuff ***************************************************************

let automotive = [];
let garden = [];
let office = [];
let electronics = [];
let clothing = [];
let sports = [];
let toys = [];
let pet = [];
let beauty = [];
let homekitchen = [];

$.getJSON("data/products.json", function(data){
    home_Products = data;
    console.log("All products loaded:", home_Products);


    $.getJSON("data/reviews.json", function(data){
        reviews = data;
    })

    // Filter products into categories
    displayAutomotive();
    displayGarden();
    displayOffice();
    displayElectronics();
    displayClothing();
    displaySports();
    displayToys();
    displayPet();
    displayBeauty();
    displayHomeKitchen();

    console.log("Automotive:", automotive);
    console.log("Garden & Outdoors:", garden);
    console.log("Office Supplies:", office);
    console.log("Electronics:", electronics);
    console.log("Clothing:", clothing);
    console.log("Sports & Outdoors:", sports);
    console.log("Toys & Games:", toys);
    console.log("Pet Supplies:", pet);
    console.log("Beauty & Personal Care:", beauty);
    console.log("Home & Kitchen:", homekitchen);
});

// Functions to filter each category
function displayAutomotive() {
    automotive = home_Products.filter(p => p.category === "Automotive");
}
function displayGarden() {
    garden = home_Products.filter(p => p.category === "Garden & Outdoors");
}
function displayOffice() {
    office = home_Products.filter(p => p.category === "Office Supplies");
}
function displayElectronics() {
    electronics = home_Products.filter(p => p.category === "Electronics");
}
function displayClothing() {
    clothing = home_Products.filter(p => p.category === "Clothing");
}
function displaySports() {
    sports = home_Products.filter(p => p.category === "Sports & Outdoors");
}
function displayToys() {
    toys = home_Products.filter(p => p.category === "Toys & Games");
}
function displayPet() {
    pet = home_Products.filter(p => p.category === "Pet Supplies");
}
function displayBeauty() {
    beauty = home_Products.filter(p => p.category === "Beauty & Personal Care");
}
function displayHomeKitchen() {
    homekitchen = home_Products.filter(p => p.category === "Home & Kitchen");
}

// Example: show automotive products
$("#home").click(function(){
    $(".home_automotive").empty(); 
    $(".products").empty(); // clear previous slider content

    for (let i = 0; i < automotive.length; i++) {
        $(".home_automotive").append(`
            <div class="p">
                <img src="${automotive[i].image}?v=${Math.random()}" alt="${automotive[i].name}" style="width:200px;height:200px;">
                <h3>${automotive[i].name}</h3>
                <p>Category: ${automotive[i].category}</p>
                <p>Price: $${automotive[i].price}</p>
            </div>
        `);
    }
});



//end of home stuff  *************************************888









function loadCategory(file) {
    $(".home_automotive").empty();

    currentPage = 1;
    $("#page_number").text(currentPage);

    $.getJSON(`data/${file}.json`, function(products) {

        $.getJSON("data/reviews.json", function(reviewsData) {

            allProducts = products;
            $(".products").empty();

            for (let i = 0; i < products.length; i++) {
                let product = products[i];

                // find reviews for this product
                let productReviews = null;
                for (let j = 0; j < reviewsData.length; j++) {
                    if (reviewsData[j].product_id == product.id) {
                        productReviews = reviewsData[j].reviews;
                        break;
                    }
                }

                let reviewsHTML = "";
                if (productReviews) {
                    for (let k = 0; k < productReviews.length; k++) {
                        reviewsHTML += `
                            <div class="review">
                                <strong>${productReviews[k].user}</strong>
                                (${productReviews[k].rating}/5)
                                <p>${productReviews[k].comment}</p>
                            </div>
                        `;
                     
                    }
                }

                $(".products").append(`
                    <div class="product">
                        <div class="image">
                            <img src="${product.image}?v=${Math.random()}" />
                        </div>

                        <div class="product_info">
                        <p class="name">${product.name}</p>
                        <p class="price">price : ${product.price}</p>
                        <p class="id">id : ${product.id}</p>
                        <p class="category">category : ${product.category}</p>
                        <p class="description">description : ${product.description}</p>
                        <p class="stock">in Stock : ${product.stock}</p>
                        <p class="sku">${product.sku}</p> 
                        <button class="addToCart" data-id="${product.id}"data-name="${product.name}"data-price="${product.price}"data-image="${product.image}">
                        Add to Cart
                        </button>
                        </div>
                    </div>
                `);
            }

            showPage(currentPage);
           
        });
            $(".dropdown_menu").hide();
    }

    $(document).on('click', '.addToCart', function(){
      let cartItems = getCartItems();

      let product = {
        id: $(this).data('id'),
        name: $(this).data('name'),
        price: $(this).data('price'),
        image: $(this).data('image'),
        quantity: 1
      };

      let existingItem = cartItems.find(item => item.id === product.id);
      if(existingItem){
        existingItem.quantity += 1;
      } else {
        cartItems.push(product);
      }

      saveCartItems(cartItems);
      updateCartDisplay();
    });

    // Category buttons
  





    $("#automotive_list").click(() => loadCategory("Automotive"));
    $("#clothing_list").click(() => loadCategory("Clothing"));
    $("#beautyAndPersonalCare_list").click(() => loadCategory("Beauty & Personal Care"));
    $("#homeAndKitchen_list").click(() => loadCategory("Home & Kitchen"));
    $("#officeSupplies_list").click(() => loadCategory("Office Supplies"));
    $("#toysAndGames_list").click(() => loadCategory("Toys & Games"));
    $("#sportsAndOutdoors_list").click(() => loadCategory("Sports & Outdoors"));
    $("#petSupplies_list").click(() => loadCategory("Pet Supplies"));
    $("#gardenAndOutdoors_list").click(() => loadCategory("Garden & Outdoors"));
    $("#electronics_list").click(() => loadCategory("Electronics"));

    // Pagination


$("#next").click(function (){
    let total = $(".product").length;
    console.log(total);
    let maxPage = Math.ceil(total/itemsPerPage);
    console.log(maxPage);
    if(currentPage < maxPage){
        currentPage++;
        showPage(currentPage);
    }

});

$("#prev").click(function (){
    if(currentPage > 1){
        currentPage--;
        showPage(currentPage);
    
    }
});



});