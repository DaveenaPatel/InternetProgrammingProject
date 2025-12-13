
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
});