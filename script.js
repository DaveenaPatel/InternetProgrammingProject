
$(document).ready(function(){
  $(".dropdown_menu").hide();

  $(".Hamburger_Menu, .dropdown_menu").hover(
    function() {
      $(".dropdown_menu").show();   
    },
    function() {
      $(".dropdown_menu").hide();   
    }
  );

  $(".cartTab").hide();

  $(".icon-cart").click(function(){
    $(".cartTab").show();
  })

  $(".cartTab .close").click(function(){
    $(".cartTab").hide();
  })


  $(document).on("click", ".userReviews", function() {
    // toggle only reviews inside the same product
    $(this).closest(".product").find(".review").toggle();
});


$(document).click(function(e) {
    // if the clicked element is NOT the suggestion itself
    if (!$(e.target).closest('.suggestion').length) {
        $('.suggestion').hide(); // hide the suggestion
    }
});


});
