$(document).ready(function () {

    const itemsPerPage = 10;
    let currentPage = 1;

    let home_Products = [];
    let reviews = [];
    let allProducts = [];

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

    // Load products
    $.getJSON("data/products.json", function (data) {
        home_Products = data;

        automotive = data.filter(p => p.category === "Automotive");
        garden = data.filter(p => p.category === "Garden & Outdoors");
        office = data.filter(p => p.category === "Office Supplies");
        electronics = data.filter(p => p.category === "Electronics");
        clothing = data.filter(p => p.category === "Clothing");
        sports = data.filter(p => p.category === "Sports & Outdoors");
        toys = data.filter(p => p.category === "Toys & Games");
        pet = data.filter(p => p.category === "Pet Supplies");
        beauty = data.filter(p => p.category === "Beauty & Personal Care");
        homekitchen = data.filter(p => p.category === "Home & Kitchen");
    });

    // Load reviews
    $.getJSON("data/reviews.json", function (data) {
        reviews = data;
    });

    // Home
    $("#home").click(function () {
        $(".home_automotive").empty();
        $(".products").empty();

        automotive.forEach(p => {
            $(".home_automotive").append(`
                <div class="p">
                    <img src="${p.image}?v=${Math.random()}" style="width:200px;height:200px;">
                    <h3>${p.name}</h3>
                    <p>Category: ${p.category}</p>
                    <p>Price: $${p.price}</p>
                    <button 
                        class="addToCart" 
                        data-id="${p.id}" 
                        data-name="${p.name}" 
                        data-price="${p.price}" 
                        data-image="${p.image}">
                        Add to Cart
                    </button>
                </div>
            `);
        });
    });

    // Category load
    function loadCategory(file) {
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
        if (window.addToCart) {
            window.addToCart({
                id: $(this).data("id"),
                name: $(this).data("name"),
                price: $(this).data("price"),
                image: $(this).data("image")
            });
        }
    });

});
