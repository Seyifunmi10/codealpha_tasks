var hamburger = document.getElementById('hamburger');
var navMenu = document.getElementById('navMenu');
var backToTop = document.getElementById('backToTop');

hamburger.onclick = function() {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
};

var navLinks = document.querySelectorAll('.nav-link');
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].onclick = function() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  };
}

window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
};

backToTop.onclick = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
