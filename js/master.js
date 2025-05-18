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
    handleActive(e);
  });
});

// change the active class when we click on the header;s link
let links = document.querySelectorAll(".links li a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((lin) => lin.classList.remove("active"));
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
    document
      .querySelector(".settings .random-option .yes")
      .classList.add("active");
  } else {
    backgroundOption = false;
    document
      .querySelector(".settings .random-option .no")
      .classList.add("active");
  }
}

// when you click on Random Background option make this change
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
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
let imgsArray = ["1.jpg", "11.jpg", "12.jpg", "9.jpg", "13.jpg"];

function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArray.length);
      document.querySelector(
        ".landing-page"
      ).style.backgroundImage = `url(imgs/img-${imgsArray[randomNum]})`;
    }, 5000);
  }
}
randomizeImgs();

let ourQuality = document.querySelector(".our-quality");

window.onscroll = function () {
  let qualityOffsetTop = ourQuality.offsetTop;
  let qualityOuterHeight = ourQuality.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop >= qualityOffsetTop + qualityOuterHeight - windowHeight) {
    let allQualityBar = document.querySelectorAll(
      ".quality-box .progress span"
    );
    let allQualityPercent = document.querySelectorAll(".quality-box .percent");
    let count = 0;
    allQualityBar.forEach((quality) => {
      quality.style.width = quality.dataset.progress;
      allQualityPercent[count].innerHTML = quality.dataset.progress;
      count++;
    });
  }
};

let allImgs = document.querySelectorAll(".gallery .img-box img");

allImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    let popupImage = document.createElement("img");
    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    if (img.alt != null) {
      let imgHeading = document.createElement("h3");
      imgHeading.textContent = img.alt;
      popupBox.prepend(imgHeading);
    }

    let closeBtn = document.createElement("span");
    closeBtn.textContent = "X";
    closeBtn.className = "close-btn";
    popupBox.appendChild(closeBtn);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target.dataset.section);
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

scrollToSection(allBullets);
scrollToSection(allLinks);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsOption = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("bullets-option");

if (bulletsLocalItem) {
  bulletsOption.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option span.yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option span.no").classList.add("active");
  }
}

bulletsOption.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display == "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});

document.querySelector(".reset-option").onclick = function () {
  // localStorage.clear(); this is to clear all local storage
  localStorage.removeItem("color_option_1");
  localStorage.removeItem("color_option_2");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
};

let toggleMenu = document.querySelector("header .toggle-menu");
let linksContainer = document.querySelector("header .links-container");
toggleMenu.onclick = function (e) {
  e.stopPropagation();
  toggleMenu.classList.toggle("menu-active");
  linksContainer.classList.toggle("open");
};
linksContainer.onclick = function(e) {
  e.stopPropagation();
};
window.addEventListener("click", function(e) {
  if (toggleMenu.classList.contains("menu-active")) {
    if (e.target !== toggleMenu && e.target !== linksContainer) {
      toggleMenu.classList.remove("menu-active");
      linksContainer.classList.remove("open");
    }
  }
});
