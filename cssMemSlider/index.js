const mems = [
  {
    id: 1,
    img: "./assets/images/sueta.jpg",
    text: "Хочется навести суету1"
  },
  {
    id: 2,
    img: "./assets/images/sueta.jpg",
    text: "Хочется навести суету2"
  },
  {
    id: 3,
    img: "./assets/images/sueta.jpg",
    text: "Хочется навести суету3"
  },
  {
    id: 4,
    img: "./assets/images/sueta.jpg",
    text: "Хочется навести суету4"
  }
]

let slideImageHolder;
let controlsHolder;
let curCard = 1;
let curSlide;
let isMoving = false;

function createControlButton(data) {
    let templateCard = `<button role="button" class="control-dot" data-id="${data.id}"><span></span></button>`
    return htmlToElement(templateCard);
}

function handleBtnClick(event) {
  if (isMoving) {
    return;
  }
  console.log(event.currentTarget);
  setCard(event.currentTarget.dataset.id)
}

function createControls() {
  mems.forEach((mem) => {
    let control = createControlButton(mem);
    control.addEventListener('click', handleBtnClick);
    controlsHolder.appendChild(control);
  })
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function createCard(data) {
    let templateCard = `<div class="card-image-holder">
                          <img class="card-image" src="${data.img}" alt="${data.text}">
                        </div>`
    return htmlToElement(templateCard);
}

function removeOuterSlide(event) {
  event.target.removeEventListener('transitionend', removeOuterSlide);
  curSlide = event.target;
  slideImageHolder.removeChild(slideImageHolder.firstElementChild);
  event.target.style.transition = "";
  event.target.style.left = "0px";
  isMoving = false;
}

function setCard(ind) {
  let nextPage = createCard(mems[ind - 1]);
  isMoving = true;
  if (parseInt(ind) > curCard) {
    console.log("left");
    slideImageHolder.appendChild(nextPage);
    nextPage.addEventListener('transitionend', removeOuterSlide);
    curSlide.style.transition = "2s";
    nextPage.style.transition = "2s";
    curSlide.style.left = -slideImageHolder.offsetWidth + "px";
    nextPage.style.left = -slideImageHolder.offsetWidth + "px";
  }
  else {
    nextPage.style.left = -slideImageHolder.offsetWidth*2 + "px";
    slideImageHolder.appendChild(nextPage);
    nextPage.addEventListener('transitionend', removeOuterSlide);
    curSlide.style.transition = "2s";
    nextPage.style.transition = "2s";
    curSlide.style.left = slideImageHolder.offsetWidth + "px";
    nextPage.style.left = -slideImageHolder.offsetWidth + "px";
  }
  curCard = parseInt(ind)
}

function handleWindowLoad() {
  slideImageHolder = document.querySelector('.img-carousel');
  controlsHolder = document.querySelector('.dots-controls');
  curSlide = createCard(mems[0]);
  slideImageHolder.appendChild(curSlide);
  createControls();

}

window.addEventListener('load', handleWindowLoad);