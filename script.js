document.addEventListener("DOMContentLoaded", function () {
  // Optimized image data with different sizes for better performance
  const images = [
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      srcset:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400 400w, https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800 800w",
      title: "Mountain Landscape",
      desc: "Beautiful mountain view with sunset colors",
      alt: "Scenic mountain landscape during sunset",
      category: "nature",
    },
    {
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800",
      srcset:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400 400w, https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800 800w",
      title: "Modern Architecture",
      desc: "Contemporary building design with glass facade",
      alt: "Modern glass building with geometric design",
      category: "architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800",
      srcset:
        "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400 400w, https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800 800w",
      title: "Wild Fox",
      desc: "Red fox in natural habitat",
      alt: "Red fox standing in a forest",
      category: "animals",
    },
    {
      src: "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?w=800",
      srcset:
        "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?w=400 400w, https://images.unsplash.com/photo-1429087969512-1e85aab2683d?w=800 800w",
      title: "Forest Path",
      desc: "Sunlight filtering through trees",
      alt: "Sunlit path through a dense forest",
      category: "nature",
    },
    {
      src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
      srcset:
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400 400w, https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800 800w",
      title: "Beach House",
      desc: "Modern house on the beach",
      alt: "White modern house near the ocean",
      category: "architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800",
      srcset:
        "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400 400w, https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800 800w",
      title: "Lion",
      desc: "Majestic lion resting",
      alt: "Lion resting on a rock",
      category: "animals",
    },
  ];

  // DOM Elements
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
  const galleryContainer = document.querySelector(".gallery-container");

  // State variables
  let currentIndex = 0;
  let filteredImages = [...images];
  let touchStartX = 0;
  let touchEndX = 0;

  // Initialize the gallery
  function initGallery() {
    if (!gallery) {
      console.error("Gallery element not found");
      return;
    }

    gallery.innerHTML = "";

    filteredImages.forEach((image, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = `gallery-item ${image.category}`;
      galleryItem.dataset.index = index;
      galleryItem.setAttribute("role", "button");
      galleryItem.setAttribute("aria-label", `View ${image.title}`);

      galleryItem.innerHTML = `
          <img 
            src="${image.src}" 
            srcset="${image.srcset}"
            sizes="(max-width: 600px) 400px, 800px"
            alt="${image.alt}" 
            class="gallery-img"
            loading="lazy"
          >
          <div class="image-overlay">
            <h3 class="image-title">${image.title}</h3>
            <span class="image-category">${image.category}</span>
          </div>
        `;

      galleryItem.addEventListener("click", () => openLightbox(index));
      gallery.appendChild(galleryItem);
    });

    // Preload images for better lightbox experience
    preloadImages();
  }

  // Preload images for lightbox
  function preloadImages() {
    filteredImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }

  // Filter images by category
  function filterImages(category) {
    filteredImages =
      category === "all"
        ? [...images]
        : images.filter((image) => image.category === category);

    initGallery();
    currentIndex = 0; // Reset index when filtering
  }

  // Open lightbox with selected image
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();

    lightbox.style.display = "block";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;

    // Set focus for accessibility
    closeBtn.focus();
  }

  // Update lightbox content
  function updateLightboxContent() {
    const image = filteredImages[currentIndex];

    lightboxImg.src = image.src;
    lightboxImg.srcset = image.srcset;
    lightboxImg.alt = image.alt;
    lightboxTitle.textContent = image.title;
    lightboxDesc.textContent = image.desc;

    // Update ARIA labels for navigation
    lightboxPrev.setAttribute("aria-label", `Previous image: ${image.title}`);
    lightboxNext.setAttribute("aria-label", `Next image: ${image.title}`);
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
    document.documentElement.style.paddingRight = "0";
  }

  // Navigate to next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightboxContent();
  }

  // Navigate to previous image
  function prevImage() {
    currentIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxContent();
  }

  // Handle touch events for mobile swipe
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextImage(); // Swipe left
    if (touchEndX > touchStartX + 50) prevImage(); // Swipe right
  }

  // Scroll gallery horizontally
  function scrollGallery(direction) {
    if (!galleryContainer) return;

    const scrollAmount = galleryContainer.offsetWidth * 0.8;
    galleryContainer.scrollBy({
      left: direction === "prev" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
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
  if (prevBtn) prevBtn.addEventListener("click", () => scrollGallery("prev"));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollGallery("next"));

  // Lightbox event listeners
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener("click", nextImage);
  if (lightboxPrev) lightboxPrev.addEventListener("click", prevImage);

  // Touch events for lightbox
  if (lightbox) {
    lightbox.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    lightbox.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  // Close lightbox when clicking outside the image
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
      }
    }
  });

  // Initialize the gallery on load
  initGallery();
});
