$(document).ready(function () {
    

    const itemsPerPage = 10;
    let currentPage = 1;

    let home_Products = [];
    let reviews = [];
    let allProducts = [];
    let products_details = [];
    var selectedProductId = getSelectedProductIdFromURL(); // Function to get selected product ID from URL

    function getSelectedProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('productId');
    }   


    

    // Pagination
    function showPage(page) {
        let items = $(".product");
        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;

        items.hide();
        items.slice(start, end).show();
        $("#page_number").text(page);
    }




    

    //
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

    $.getJSON("data/product-reviews.json", function (data) {
        let products = data.products;

        // Find the product that matches the selected ID
        let product = products.find(p => p.productId === selectedProductId);

        if (product) {
            // Display product info
            console.log("product id: " + product.productId);
            console.log("product name: " + product.productName);
            console.log("average rating: " + product.averageRating);
            console.log("total reviews: " + product.totalReviews);

            // Display its reviews
            product.reviews.forEach(function (review) {
                console.log("review id: " + review.reviewId);
                console.log("user name: " + review.userName);
                console.log("rating: " + review.rating);
                console.log("title: " + review.title);
                console.log("content: " + review.content);
                console.log("date: " + review.date);
                console.log("verified purchase: " + review.verifiedPurchase);
                console.log("helpful votes: " + review.helpfulVotes);
                console.log("images: " + review.images);
            });
        } else {
            console.log("Product not found.");
        }
    });



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

// Example: show  products
function displayAllCategories() {
    $(".home_automotive, .home_garden, .home_office, .home_electronics, .home_clothing, .home_sports, .home_toys, .home_pet, .home_beauty, .home_homekitchen, .products").empty();

    function displayCategory(categoryArray, containerClass) {
        for (let i = 0; i < categoryArray.length; i++) {
            $(containerClass).append(`
                <div class="p">
                    <img src="${categoryArray[i].image}?v=${Math.random()}" alt="${categoryArray[i].name}" style="width:200px;height:200px;">
                    <h3>${categoryArray[i].name}</h3>
                    <p>Category: ${categoryArray[i].category}</p>
                    <p>Price: $${categoryArray[i].price}</p>
                    <button 
                        class="addToCart" 
                        data-id="${categoryArray[i].id}" 
                        data-name="${categoryArray[i].name}" 
                        data-price="${categoryArray[i].price}">
                        Add to Cart
                    </button>
                    <button 
                                class="addToWishList" 
                                data-id="${categoryArray[i].id}" 
                                data-name="${categoryArray[i].name}" 
                                data-price="${categoryArray[i].price}">
                                
                                Add to WishList
                    </button>
                   
                    <button 
                        class="viewDetails" 
                        data-id="${categoryArray[i].id}">
                        View Details
                    </button>
                    
                </div>
            `);
        }
    }

    // Display each category
    displayCategory(automotive, ".home_automotive");
    displayCategory(garden, ".home_garden");
    displayCategory(office, ".home_office");
    displayCategory(electronics, ".home_electronics");
    displayCategory(clothing, ".home_clothing");
    displayCategory(sports, ".home_sports");
    displayCategory(toys, ".home_toys");
    displayCategory(pet, ".home_pet");
    displayCategory(beauty, ".home_beauty");
    displayCategory(homekitchen, ".home_homekitchen");
}

// Event delegation MUST be outside, once
$(document).on('click', '.viewDetails', function() {
    const id = $(this).data('id');
    $(".one_product").empty(); // Clear previous details
    showProductDetails(id);    // Show details of clicked product
});


  // Display products on page load
    $("#home").click(displayAllCategories); // Also display when #home is clicked
   



    // Category load
    function loadCategory(file) {
         $(".home_automotive, .home_garden, .home_office, .home_electronics, .home_clothing, .home_sports, .home_toys, .home_pet, .home_beauty, .home_homekitchen, .products").empty();
        currentPage = 1;
        $("#page_number").text(currentPage);
        $(".products").empty();
        $(".home_automotive").empty();

        $.getJSON(`data/${file}.json`, function (products) {
            allProducts = products;

            products.forEach(product => {

                let productReviews = reviews.find(r => r.product_id == product.id);
                let reviewsHTML = "";

                if (productReviews) {
                    productReviews.reviews.forEach(r => {
                        reviewsHTML += `
                            <div class="review">
                                <strong>${r.user}</strong> (${r.rating}/5)
                                <p>${r.comment}</p>
                            </div>
                        `;
                    });
                }

                $(".products").append(`
                    <div class="product">
                        <div class="image">
                            <img src="${product.image}?v=${Math.random()}">
                        </div>

                        <div class="product_info">
                            <p class="name">${product.name}</p>
                            <p class="price">price : ${product.price}</p>
                            <p class="id">id : ${product.id}</p>
                            <p class="category">category : ${product.category}</p>
                            <p class="description">${product.description}</p>
                            <p class="stock">in Stock : ${product.stock}</p>
                            <p class="sku">${product.sku}</p>

                            <button 
                                class="addToCart" 
                                data-id="${product.id}" 
                                data-name="${product.name}" 
                                data-price="${product.price}" 
                                data-image="${product.image}">
                                Add to Cart
                            </button>

                            <button 
                                class="addToWishList" 
                                data-id="${product.id}" 
                                data-name="${product.name}" 
                                data-price="${product.price}" 
                                data-image="${product.image}">
                                Add to WishList
                            </button>

                            <button class="userReviews">Comments</button>
                        </div>

                        <div class="reviews">
                            ${reviewsHTML}
                        </div>
                    </div>
                `);
            });

            showPage(currentPage);
        });

        $(".dropdown_menu").hide();
    }

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
    $("#next").click(function () {
        let maxPage = Math.ceil($(".product").length / itemsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            showPage(currentPage);
        }
    });

    $("#prev").click(function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    // Add to cart
$(document).on("click", ".addToCart", function () {
    const product = {
        id: $(this).data("id"),
        name: $(this).data("name"),
        price: parseFloat($(this).data("price")),
        image: $(this).data("image")
    };
    console.log("Trying to add:", product);
    if (!product.id || !product.name) {
        console.error("Product data missing!");
        return;
    }
    window.addToCart(product);
});
// Add to WishList
$(document).on("click", ".addToWishList", function () {
    const product = {
        id: $(this).data("id"),
        name: $(this).data("name"),
        price: parseFloat($(this).data("price")),
        image: $(this).data("image") 
    };

    if (!product.id || !product.name) {
        console.error("Product data missing for wishlist!");
        return;
    }

    if (window.addToWishList) {
        window.addToWishList(product);
        console.log("Added to wishlist:", product);
    } else {
        console.warn("addToWishList function not found!");
    }
});

      window.onload = function() {
    displayAllCategories();
};

function showProductDetails(selectedProductId) {
    $.getJSON("data/product-reviews.json", function (data) {
        products_details = data.products;

        // Find the product that matches the selected ID
        let product = products.find(p => p.productId === selectedProductId);

        if (product) {
            // Display product info
            console.log("product id: " + product.productId);
            console.log("product name: " + product.productName);
            console.log("average rating: " + product.averageRating);
            console.log("total reviews: " + product.totalReviews);

            // Display its reviews
            product.reviews.forEach(function (review) {
                console.log("review id: " + review.reviewId);
                console.log("user name: " + review.userName);
                console.log("rating: " + review.rating);
                console.log("title: " + review.title);
                console.log("content: " + review.content);
                console.log("date: " + review.date);
                console.log("verified purchase: " + review.verifiedPurchase);
                console.log("helpful votes: " + review.helpfulVotes);
                console.log("images: " + review.images);
            });
        } else {
            console.log("Product not found.");
        }
    });
}



});
