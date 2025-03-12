// needed for way 1
// // Select Landing page
// let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

setInterval(() => {
  // way 1
  // let randomNum = Math.floor(Math.random() * imgsArray.length)
  // // Change background Image Url
  // landingPage.style.backgroundImage = `url(imgs/landing-page-${imgsArray[randomNum]})`

  // way 2
  let randomNum = Math.floor(Math.random() * imgsArray.length) + 1;
  document.querySelector(
    ".landing-page"
  ).style.backgroundImage = `url(imgs/landing-page-${randomNum}.jpg)`;
}, 5000);

// change the active class when we click on the header;s link
let links = document.querySelectorAll(".links li a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove 'active' class from all links
    links.forEach((lin) => lin.classList.remove("active"));

    // Add 'active' class to the clicked link
    this.classList.add("active");
  });
});
