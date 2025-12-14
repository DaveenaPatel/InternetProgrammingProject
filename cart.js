function setCookies(name, value, days){
    const d = new Date();
    d.setDate(d.getDate() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookies(cname){
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

function getCartItems(){
    let cartItems = getCookies("cartItems");
    if(cartItems == ""){
        return [];
    } else {
        return JSON.parse(cartItems);
    }
}

function saveCartItems(cartItems){
    setCookies("cartItems", JSON.stringify(cartItems), 7);
}

function updateCartDisplay(){
    let cartItems = getCartItems();
    let totalQuantity = 0;
    const cartItemsContainer = document.querySelector('.listCart');
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
            totalQuantity += item.quantity;
        cartItemsContainer.innerHTML +=`
            <div class="cart-item">
            <img src="${item.image}">
            <div class="cartInfo">
                // <p>${item.name} - ${item.price} * "quantity" ${item.quantity}</p>
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <button class="increase-quantity" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${item.id}">Remove</button>    
            </div>
            `;
    });
        
    $(".icon-cart span").text(totalQuantity);
}

$(document).ready(function(){
    $(document).on('click', '.addToCart', function(){
    let id = $(this).data('id');
    let name = $(this).data('name');
    let price = $(this).data('price');
    let image = $(this).closest('.product').find('img').attr('src'); 

    let cart = getCartItems();

    let existingItem = cart.find(item => item.id == id);
    if(existingItem){
        existingItem.quantity += 1;
    } else {
        cart.push({id: id, name: name, price: price, quantity: 1, image: image});
    }

    saveCartItems(cart);
    updateCartDisplay();
});
    updateCartDisplay();
});