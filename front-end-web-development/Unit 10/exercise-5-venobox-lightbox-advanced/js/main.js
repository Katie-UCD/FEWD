// code is wrapped in an IIFE (Immediately Invoked Function Expression). See https://developer.mozilla.org/en-US/docs/Glossary/IIFE for more details
//
(() => {
  // globals
  let currImage = 0;
  let body = document.querySelector("body"),
      lightBox = document.querySelector(".lightBox"),
      images = document.querySelectorAll(".gImg"),
      showImg = lightBox.querySelector(".showImg img"),
      close = lightBox.querySelector(".close");
      imageBoxes = document.querySelector(".image-box");

  function lightbox() {
    for (const [index, image] of images.entries()) { // https://medium.com/@_DandyLyons/how-to-use-a-js-for-of-loop-with-an-index-a4675ed22351
      image.addEventListener("click", () => {
        showImage(index);
      });
    }
    // add next/prev links to lightbox
    lightBox.querySelector('.lightBox_content .showImg').insertAdjacentHTML("afterend",
    `<div class="navigation-buttons">
      <a class="previous">❮</a>
      <a class="next">❯</a>        
    </div>`);

    lightBox.querySelector('.navigation-buttons .previous').addEventListener("click", (event => {
      if (currImage !== 0) {
        currImage -= 1;
        showImg.src = images[currImage].src;
      } 
    }));
    lightBox.querySelector('.navigation-buttons .next').addEventListener("click", (event => {
      if (currImage !== (images.length-1)) {
        currImage += 1;
        showImg.src = images[currImage].src;
      }
    }));

    close.addEventListener('click', ()=>{
      lightBox.style.display = "none";
      body.style.overflow = "visible";
    });
  }
      //build navigation dots
    
      function buildDots(images) {
        let dotDiv = document.querySelector('.navigation-dot-container');
        let dots = [];
        for (let i = 0; i < images.length; i++) {
            let newSpan = document.createElement('span');
            newSpan.className += "navigation-dot";
            dotDiv.appendChild(newSpan);
            dots.push(newSpan);
        }
        return dots;
        
      };

  // Update active dot
  function updateActiveDot() {
    navigationDots.forEach(dot => dot.classList.remove("active"));
    if (navigationDots[currImage]) {
      navigationDots[currImage].classList.add("active");
    }
  }


  function showImage(imageIndex) {
    showImg.src = images[imageIndex].src;
    currImage = imageIndex;
    lightBox.style.display = "block";
    body.style.overflow = "hidden";
    updateActiveDot();
  }

  function init() {
    lightbox();
      navigationDots.forEach(dot => {
    dot.addEventListener('click', (event) => {
      // find index of current dot
      const parent = event.target.parentNode;
      const index = [].indexOf.call(parent.children, event.target);
      showImage(index);
    });
    updateActiveDot();
  });
    
  };

  let navigationDots = buildDots(images);

function addVenoBox(imageBox){
  for (let i = 0; i < imageBox.length; i++) {
    let newLink = document.createElement('a');
    newLink.className += "image-box-link";
    
}

}
  window.addEventListener("load", (event => {
      init();
  }));

})();





imageBoxes.forEach((box) => {
  const img = box.querySelector('img'); // Get the <img> element
  const imgSrc = img.src; // Get the src attribute

  // Create a new <a> element
  const link = document.createElement('a');
  link.classList.add('image-box-link');
  link.setAttribute('data-gall', 'gallery01'); // Add the data-gall attribute
  link.setAttribute('href', imgSrc); // Set href to the img's src

  // Append the link to the image-box
  box.appendChild(link);
});

// Initialize VenoBox
new VenoBox({
  selector: '.image-box-link',
  numeration: true,
  infinigall: true,
  share: true,
  spinner: 'rotating-plane',
});










// old code
var slideIndex = 1;
//showSlide(slideIndex);

function openLightbox() {
  document.getElementById('Lightbox').style.display = 'block';
}

function closeLightbox() {
  document.getElementById('Lightbox').style.display = 'none';
}

function changeSlide(n) {
	showSlide(slideIndex += n);
}

function toSlide(n) {
	showSlide(slideIndex = n);
}

function showSlide(n) {

  const slides = document.getElementsByClassName('slide');
  let modalPreviews = document.getElementsByClassName('modal-preview');

  if (n > slides.length) {
    slideIndex = 1;	
  }
  
  if (n < 1) {
  	slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (let i = 0; i < modalPreviews.length; i++) {
      modalPreviews[i].className = modalPreviews[i].className.replace(' active', '');
  }
  
  slides[slideIndex - 1].style.display = 'block';
  modalPreviews[slideIndex - 1].className += ' active';
}