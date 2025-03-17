// For add&remove spin on gear and open in settings
document.querySelector(".setting-icon .gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings").classList.toggle("open");
};

let colorOptionLi = document.querySelectorAll(".settings .color-list li");

let mainColor = localStorage.getItem("color_option_1");

//Check the localStorge if has a color_option_1 or not
if (mainColor) {
  document.documentElement.style.setProperty("--main-color-1", mainColor);
  document.documentElement.style.setProperty(
    "--main-color-2",
    localStorage.getItem("color_option_2")
  );
  colorOptionLi.forEach((li) => li.classList.remove("active"));
  document
    .querySelector(`[data-color1="${mainColor}"]`)
    .classList.add("active");
}
// when you click on color option make this change
colorOptionLi.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color-1",
      e.target.dataset.color1
    );
    document.documentElement.style.setProperty(
      "--main-color-2",
      e.target.dataset.color2
    );
    localStorage.setItem("color_option_1", e.target.dataset.color1);
    localStorage.setItem("color_option_2", e.target.dataset.color2);
    colorOptionLi.forEach((li) => li.classList.remove("active"));
    e.target.classList.add("active");
  });
});

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
