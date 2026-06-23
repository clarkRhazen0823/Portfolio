const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  menuIcon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuIcon.classList.remove("fa-xmark");
  });
});

const openGalleryBtn = document.querySelector("#open-gallery-btn");
const galleryModal = document.querySelector("#gallery-modal");
const closeGalleryBtn = document.querySelector("#close-gallery-btn");

const lightboxImg = document.querySelector("#lightbox-img");
const lightboxVideo = document.querySelector("#lightbox-video");
const mediaCaption = document.querySelector("#media-caption");

const thumbs = document.querySelectorAll(".thumb");
const prevBtn = document.querySelector("#gallery-prev");
const nextBtn = document.querySelector("#gallery-next");

let currentMediaIndex = 0;

function updateLightboxView(index) {
  thumbs.forEach(t => t.classList.remove("active"));
  const activeThumb = thumbs[index];
  activeThumb.classList.add("active");
  
  activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  
  const type = activeThumb.getAttribute("data-type");
  const src = activeThumb.getAttribute("data-src");
  const caption = activeThumb.getAttribute("data-caption");
  
  mediaCaption.textContent = caption;
  lightboxVideo.pause();
  
  if (type === "video") {
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "block";
    if (lightboxVideo.src !== window.location.origin + '/' + src && !lightboxVideo.src.endsWith(src)) {
      lightboxVideo.src = src;
    }
    lightboxVideo.play().catch(() => {});
  } else {
    lightboxVideo.style.display = "none";
    lightboxImg.style.display = "block";
    lightboxImg.src = src;
  }
  
  currentMediaIndex = index;
}

if (openGalleryBtn && galleryModal) {
  openGalleryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    galleryModal.classList.add("active");
    document.body.style.overflow = "hidden";
    updateLightboxView(0);
  });
}

function closeGalleryWindow() {
  galleryModal.classList.remove("active");
  document.body.style.overflow = "";
  lightboxVideo.pause();
}

if (closeGalleryBtn) {
  closeGalleryBtn.addEventListener("click", closeGalleryWindow);
}

if (galleryModal) {
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      closeGalleryWindow();
    }
  });
}

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => updateLightboxView(index));
});

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    let targetIndex = currentMediaIndex - 1;
    if (targetIndex < 0) targetIndex = thumbs.length - 1;
    updateLightboxView(targetIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    let targetIndex = currentMediaIndex + 1;
    if (targetIndex >= thumbs.length) targetIndex = 0;
    updateLightboxView(targetIndex);
  });
}

// Desktop Keyboard Access (Arrows and Escape keys)
document.addEventListener("keydown", (e) => {
  if (!galleryModal || !galleryModal.classList.contains("active")) return;
  
  if (e.key === "Escape") {
    closeGalleryWindow();
  } else if (e.key === "ArrowLeft" && prevBtn) {
    prevBtn.click();
  } else if (e.key === "ArrowRight" && nextBtn) {
    nextBtn.click();
  }
});