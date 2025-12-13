

$(document).ready(function() {

    const itemsPerPage = 10;
    let currentPage = 1;

    function showPage(page){
        let items = $(".product");
        let start = (page -1) * itemsPerPage;
        console.log("start : "+start)
        let end = start + itemsPerPage;
        items.hide();
        items.slice(start, end).show();
        $("#page_number").text(page);
    }

    function loadCategory(file) {
        currentPage = 1;
        $("#page_number").html(currentPage);

        $.getJSON(`data/${file}.json`, function(products) {
            $(".products").empty();

            products.forEach(function(product){
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