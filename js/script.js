// refresh
window.onresize = function () {
  location.reload();
};

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

// carousel auto play

const imageWrapper = document.querySelector(".image-wrapper");
const imageItems = document.querySelectorAll(".image-wrapper > *");
const imageLength = imageItems.length;
const perView = view();
let totalScroll = 0;
const delay = 2000;

function view() {
  if (window.innerWidth > 1024) {
    return 3;
  } else if (window.innerWidth > 768) {
    return 2;
  } else {
    return 1;
  }
}

imageWrapper.style.setProperty("--per-view", perView);
for (let i = 0; i < perView; i++) {
  imageWrapper.insertAdjacentHTML("beforeend", imageItems[i].outerHTML);
}

let autoScroll = setInterval(scrolling, delay);

imageWrapper.addEventListener("mouseover", function () {
  clearInterval(autoScroll);
});

imageWrapper.addEventListener("mouseout", function () {
  autoScroll = setInterval(scrolling, delay);
});

function scrolling() {
  totalScroll++;
  if (totalScroll == imageLength + 1) {
    clearInterval(autoScroll);
    totalScroll = 1;
    imageWrapper.style.transition = "0s";
    imageWrapper.style.left = "0";
    autoScroll = setInterval(scrolling, delay);
  }
  const widthEl = document.querySelector(".image-wrapper > :first-child").offsetWidth + 24;
  imageWrapper.style.left = `-${totalScroll * widthEl}px`;
  imageWrapper.style.transition = ".3s";
}
