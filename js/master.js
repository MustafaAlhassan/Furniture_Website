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

let backgroundOption = true;
let backgroundInterval;
let randomBackEl = document.querySelectorAll(".settings .random-option span");
let backgroundLocalOption = localStorage.getItem("background_option");

if (backgroundLocalOption) {
  randomBackEl.forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalOption === "true") {
    backgroundOption = true;
    document.querySelector(".settings .random-option .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".settings .random-option .no").classList.add("active");
  }
}

// when you click on Random Background option make this change
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    randomBackEl.forEach((li) => li.classList.remove("active"));
    e.target.classList.add("active");
    //this to make background change or unchange
    let backOption = e.target.dataset.background;
    if (backOption === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Get Array Of Images
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArray.length);
      document.querySelector(
        ".landing-page"
      ).style.backgroundImage = `url(imgs/landing-page-${imgsArray[randomNum]})`;
    }, 5000);
  }
}
randomizeImgs();
