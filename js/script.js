const navbar = document.getElementById('navbar')

const onScroll = () => {
  const scroll = document.documentElement.scrollTop
  if (scroll > 0) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active")
  }
}

window.addEventListener('scroll', onScroll)