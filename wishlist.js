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
    
}

