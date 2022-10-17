const navbar = document.getElementById('navbar')

// OnScroll event handler
const onScroll = () => {

  // Get scroll value
  const scroll = document.documentElement.scrollTop

  // If scroll value is more than 0 - add class
  if (scroll > 0) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active")
  }
}

// Use the function
window.addEventListener('scroll', onScroll)