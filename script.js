$(document).ready(function () {

    //Dropdown menu
    $(".dropdown_menu").hide();

    // Hover behavior
    $(".Hamburger_Menu, .dropdown_menu").hover(
        function () {
            $(".dropdown_menu").show();
        },
        function () {
            $(".dropdown_menu").hide();
        }
    );

    // Click behavior
    $(".Hamburger_Menu").click(function (e) {
        e.stopPropagation();
        $(".dropdown_menu").toggle();
    });

    $(document).click(function () {
        $(".dropdown_menu").hide();
    });

    //Cart Sidebar
    $(".cartTab").hide();

    $(".icon-cart").click(function () {
        $(".cartTab").show();
    });

    $(".cartTab .close").click(function () {
        $(".cartTab").hide();
    });

    //Reviews
    $(document).on("click", ".userReviews", function () {
        $(this).closest(".product").find(".review").toggle();
    });

    //Search suggestions
    $(document).click(function (e) {
        if (!$(e.target).closest('.suggestion, #searchInput').length) {
            $('.suggestion').hide();
        }
    });

    //Cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

<<<<<<< HEAD
$(".checkout").click(function(){
    window.location.href = "checkout.html";
  })
=======
    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(cname) === 0) return c.substring(cname.length);
        }
        return "";
    }

    function isLoggedIn() {
        return getCookie("token") !== "";
    }

    window.setCookie = setCookie;
    window.getCookie = getCookie;

    //Login
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: $("#email").val(),
                password: $("#password").val()
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("Login failed");
            return response.json();
        })
        .then(data => {
            setCookie("token", data.token, 1);
            window.location.href = "website.html";
        })
        .catch(err => {
            console.error(err);
            $("#loginError").text("Invalid information.");
        });
    });

    //Register
    $("#registerForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "https://reqres.in/api/register",
            method: "POST",
            data: {
                email: $("#reg_email").val(),
                password: $("#reg_password").val()
            },
            success: function () {
                $("#registerMsg").css("color", "green")
                    .text("Registration successful! You can now login.");
            },
            error: function () {
                $("#registerMsg").css("color", "red")
                    .text("Registration failed.");
            }
        });
    });

    //Dark mode
    if (getCookie("darkMode") === "on") {
        $("body").addClass("dark");
    }

    $("#darkToggle").click(function () {
        $("body").toggleClass("dark");
        setCookie("darkMode", $("body").hasClass("dark") ? "on" : "off", 30);
    });

    //Authentification
    if (isLoggedIn()) {
        $("#loginBtn, #registerBtn").hide();
        $("#accountBtn, #logoutBtn").show();
    } else {
        $("#loginBtn, #registerBtn").show();
        $("#accountBtn, #logoutBtn").hide();
    }

    $("#logoutBtn").click(function () {
        setCookie("token", "", -1);
        window.location.href = "loginpage.html";
    });

    //
    const protectedPages = [
        "cartpage.html",
        "checkoutpage.html",
        "confirmationpage.html",
        "profilepage.html"
    ];

    const currentPage = window.location.pathname.split("/").pop();
    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        window.location.href = "loginpage.html";
    }

    //Cart
    function getCart() {
        const cart = getCookie("cart");
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart) {
        setCookie("cart", JSON.stringify(cart), 7);
    }

    function updateCartCount() {
        let cart = getCart();
        let count = 0;
        cart.forEach(item => count += item.quantity);
        $("#cartCount").text(count);
    }

    window.addToCart = function (product) {
        let cart = getCart();
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        saveCart(cart);
        updateCartCount();
        alert("Added to cart");
    };

    if ($("#cartCount").length) {
        updateCartCount();
    }
>>>>>>> cb47621febf25814c02a93ea2f0c2bfd57fd4624

});
