$(document).ready(function() {
const states = {
    'default': "./assets/images/Screenshot_1.png",
    'hover': "./assets/images/giphy.gif"
  };
  
  let img = document.querySelector('#hover-img');
  
  img.addEventListener('mouseenter', function(e) {
    img.setAttribute('src', states.hover);
  });
  img.addEventListener('mouseleave', function(e) {
    img.setAttribute('src', states.default);
  });
});

$(document).ready(function() {
  const states1 = {
    'default1': "./assets/images/Screenshot_2.png",
    'hover1': "./assets/images/pasta-italian-food.gif"
  };
  
  let img = document.querySelector('#hover-img1');
  
  img.addEventListener('mouseenter', function(e) {
    img.setAttribute('src', states1.hover1);
  });
  img.addEventListener('mouseleave', function(e) {
    img.setAttribute('src', states1.default1);
  });
});