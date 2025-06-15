document.addEventListener("DOMContentLoaded", function () {
  // Sample image data
  const images = [
    {
      src: "https://source.unsplash.com/random/600x400?nature",
      title: "Mountain Landscape",
      desc: "Beautiful mountain view with sunset colors",
      category: "nature",
    },
    {
      src: "https://source.unsplash.com/random/600x400?building",
      title: "Modern Architecture",
      desc: "Contemporary building design with glass facade",
      category: "architecture",
    },
    {
      src: "https://source.unsplash.com/random/600x400?lion",
      title: "Wild Lion",
      desc: "Majestic lion in its natural habitat",
      category: "animals",
    },
    {
      src: "https://source.unsplash.com/random/600x400?forest",
      title: "Dense Forest",
      desc: "Sunlight filtering through tall trees",
      category: "nature",
    },
    {
      src: "https://source.unsplash.com/random/600x400?bridge",
      title: "Suspension Bridge",
      desc: "Engineering marvel spanning a river",
      category: "architecture",
    },
    {
      src: "https://source.unsplash.com/random/600x400?elephant",
      title: "African Elephant",
      desc: "Gentle giant walking through the savanna",
      category: "animals",
    },
    {
      src: "https://source.unsplash.com/random/600x400?waterfall",
      title: "Cascading Waterfall",
      desc: "Powerful waterfall in a tropical setting",
      category: "nature",
    },
    {
      src: "https://source.unsplash.com/random/600x400?skyscraper",
      title: "City Skyline",
      desc: "Tall buildings against a blue sky",
      category: "architecture",
    },
    {
      src: "https://source.unsplash.com/random/600x400?panda",
      title: "Giant Panda",
      desc: "Cute panda eating bamboo",
      category: "animals",
    },
    {
      src: "https://source.unsplash.com/random/600x400?desert",
      title: "Sandy Desert",
      desc: "Vast desert landscape with dunes",
      category: "nature",
    },
    {
      src: "https://source.unsplash.com/random/600x400?cathedral",
      title: "Historic Cathedral",
      desc: "Ancient cathedral with intricate details",
      category: "architecture",
    },
    {
      src: "https://source.unsplash.com/random/600x400?wolf",
      title: "Arctic Wolf",
      desc: "White wolf in snowy environment",
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
