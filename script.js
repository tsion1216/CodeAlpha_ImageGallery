document.addEventListener("DOMContentLoaded", function () {
  // Sample image data
  const images = [
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Mountain Landscape",
      desc: "Beautiful mountain view with sunset colors",
      category: "nature",
    },
    {
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      title: "Modern Architecture",
      desc: "Contemporary building design with glass facade",
      category: "architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
      title: "Wild Fox",
      desc: "Red fox in natural habitat",
      category: "animals",
    },
    {
      src: "https://images.unsplash.com/photo-1429087969512-1e85aab2683d",
      title: "Forest Path",
      desc: "Sunlight filtering through trees",
      category: "nature",
    },
    {
      src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      title: "Beach House",
      desc: "Modern house on the beach",
      category: "architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1456926631375-92c8ce872def",
      title: "Lion",
      desc: "Majestic lion resting",
      category: "animals",
    },
  ];

  const gallery = document.querySelector(".gallery");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("image-title");
  const lightboxDesc = document.getElementById("image-desc");
  const closeBtn = document.querySelector(".close-btn");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  let currentImages = [];
  let currentIndex = 0;
  let filteredImages = [...images];

  // Initialize the gallery
  function initGallery() {
    gallery.innerHTML = "";
    filteredImages.forEach((image, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = `gallery-item ${image.category}`;
      galleryItem.dataset.index = index;

      galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.title}" class="gallery-img">
                <div class="image-overlay">
                    <h3 class="image-title">${image.title}</h3>
                    <span class="image-category">${image.category}</span>
                </div>
            `;

      galleryItem.addEventListener("click", () => openLightbox(index));
      gallery.appendChild(galleryItem);
    });

    currentImages = filteredImages;
  }

  // Filter images by category
  function filterImages(category) {
    if (category === "all") {
      filteredImages = [...images];
    } else {
      filteredImages = images.filter((image) => image.category === category);
    }
    initGallery();
  }

  // Open lightbox with selected image
  function openLightbox(index) {
    currentIndex = index;
    const image = currentImages[currentIndex];
    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.title;
    lightboxDesc.textContent = image.desc;
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Navigate to next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    const image = currentImages[currentIndex];
    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.title;
    lightboxDesc.textContent = image.desc;
  }

  // Navigate to previous image
  function prevImage() {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    const image = currentImages[currentIndex];
    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.title;
    lightboxDesc.textContent = image.desc;
  }

  // Event listeners for filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterImages(button.dataset.filter);
    });
  });

  // Navigation buttons for gallery
  function scrollGallery(direction) {
    const galleryContainer = document.querySelector(".gallery-container");
    const scrollAmount = galleryContainer.offsetWidth * 0.8;

    if (direction === "prev") {
      galleryContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      galleryContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  prevBtn.addEventListener("click", () => scrollGallery("prev"));
  nextBtn.addEventListener("click", () => scrollGallery("next"));

  // Lightbox event listeners
  closeBtn.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", nextImage);
  lightboxPrev.addEventListener("click", prevImage);

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    }
  });

  // Initialize the gallery on load
  initGallery();
});
