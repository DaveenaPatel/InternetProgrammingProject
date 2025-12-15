function setWishListCookies(name, value, days){
    const d = new Date();
    d.setDate(d.getDate() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getWishListCookies(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++){
            let c = ca[i];
            while (c.charAt(0) == ' '){
            c = c.substring(1);
            }
         if (c.indexOf(name) == 0){
        return c.substring(name.length, c.length);
    }
    }

    return "";
}

function getWishListItems(){
    let wishListItems = getWishListCookies("wishListItems");
    if(wishListItems == ""){
        return [];
    } else {
        return JSON.parse(wishListItems);
    }

}
  
function saveWishListItems(wishListItems){
    setWishListCookies("wishListItems", JSON.stringify(wishListItems), 7);
}

function updateWishListDisplay(){
    let wishListItems = getWishListItems();
    const wishListItemsContainer = document.querySelector('.listWishList');
    wishListItemsContainer.innerHTML = '';
    totalQuantity = 0;

    wishListItems.forEach(item => {
            totalQuantity += item.quantity;
        wishListItemsContainer.innerHTML +=`
            <div class="wishList-item">
            <img src="${item.image}">
            <div class="wishListInfo">
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="wishList-item-actions">
                <button class="remove-item" data-id="${item.id}">Remove</button>    
            </div>
            </div>
            `;
    });
    $(".icon-heart span").text(totalQuantity);
}

$(document).ready(function(){
    $(document).on('click', '.addToWishList', function(){
    let id = $(this).data('id');
    let name = $(this).data('name');
    let price = $(this).data('price');
    let image = $(this).closest('.product').find('img').attr('src'); 

    let wishList = getWishListItems();

    let existingItem = wishList.find(item => item.id == id);
    if(existingItem){
        existingItem.quantity += 1;
    } else {
        wishList.push({id: id, name: name, price: price, quantity: 1, image: image});
    }

    saveWishListItems(wishList);
    updateWishListDisplay();
});
    updateWishListDisplay();
});

$(document).on('click', '.remove-item', function(){
    let id = $(this).data('id');
    let wishListItems = getWishListItems();
    wishListItems = wishListItems.filter(item => item.id != id);

    saveWishListItems(wishListItems);
    updateWishListDisplay();
});
