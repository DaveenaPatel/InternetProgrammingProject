
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


});