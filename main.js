$(document).ready(function(){

  let navBar = {
    flagAdd: true,
    element: '',
    init: function(element) {
      this.element = element;
    },

    add: function() {
      if(this.flagAdd){
        document.getElementById(this.element).className += " navbar-moved"
        this.flagAdd = false;
      }
    },

    remove: function() {
      document.getElementById(this.element).className = document.getElementById(this.element).className.replace(/(?:^|\s)navbar-moved(?!\S)/g , '');
      this.flagAdd = true;
    }
  };

  navBar.init('navBar');

  function offSetManager(){
    let yOffset = 0;
    let currOffset = window.pageYOffset;

    if(yOffset < currOffset ){
      navBar.add();
    } else if(currOffset == yOffset){
      navBar.remove();
    }
  }

  window.onscroll = function(e) {
    offSetManager();
  }

  $(".nav li").on("click", function() {
    $(".nav li").removeClass("active");
    $(this).addClass("active");
  });

  $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function () { 
    $('.navbar-toggle:visible').click(); 
  });
  

  //closing hamburger menu before resizing
  let collapsable = false;

  $(".collapse").on('shown.bs.collapse', function(){
    //bootstrap event showing collapsable
    collapsable = true;
  });

  $(".collapse").on('hide.bs.collapse', function(){
    collapsable = false;
  });

  $(window).resize(function(){
    if(collapsable){
      $('.collapse').collapse('hide');
      collapsable = false;
    }
  });

  $(document).on('click', 'a[href^="#"]', function(e) {
    let id = $(this).attr('href');

    // target element
    let $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    let pos = $id.offset().top;

    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
});
})