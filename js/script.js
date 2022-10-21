// Navbar

const navbar = document.getElementById("navbar");

const onScroll = () => {
  const scroll = document.documentElement.scrollTop;
  if (scroll > 0) {
    navbar.classList.add("active");
    navbar.classList.add("shadow");
  } else {
    navbar.classList.remove("active");
    navbar.classList.remove("shadow");
  }
};

window.addEventListener("scroll", onScroll);

// Pricing

const orderNow = document.getElementById("order-now");
const pricing = document.getElementById("pricing");
const exit = document.getElementById("exit");
const mask = document.getElementById("mask");

orderNow.addEventListener("click", function () {
  pricing.style.display = "block";
  mask.style.display = "block";
});

exit.addEventListener("click", function () {
  pricing.style.display = "none";
  mask.style.display = "none";
});
