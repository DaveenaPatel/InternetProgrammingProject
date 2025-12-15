function getCartCookies(cname){
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
    let cartItems = getCartCookies("cartItems");
    if(cartItems == ""){
        return [];
    } else {
        return JSON.parse(cartItems);
    }
}

function totalPrice(){
    let cartItems = getCartItems();
    let totalPrice = 0;

    for(let i = 0; i < cartItems.length; i++){
        totalPrice += cartItems[i].price * cartItems[i].quantity;
    }

    return totalPrice.toFixed(2);
}

$(document).ready(function () {
    let cartItems = getCartItems();
    let totalCost = 0;

    cartItems.forEach(item => {
        let cost = item.price * item.quantity;
        totalCost += cost;

        $(".cart-summary").append(`
            <div class="cart-item">
            <p>${item.name}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>$${(totalCost).toFixed(2)}</p>
            </div>
            `);
    });

    $(".checkout-total").text(`$${totalCost.toFixed(2)}`);


    $(".placeOrder").click(function () {
    window.location.href = "confirmationpage.html";
    });
});

