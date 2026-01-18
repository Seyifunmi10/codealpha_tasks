const images = [
  {
    id: 1,
    src: "https://picsum.photos/500/500?random=1",
    title: "Mountain Landscape",
    category: "nature"
  },
  {
    id: 2,
    src: "https://picsum.photos/500/500?random=2",
    title: "City Skyline",
    category: "city"
  },
  {
    id: 3,
    src: "https://picsum.photos/500/500?random=3",
    title: "Portrait",
    category: "people"
  },
  {
    id: 4,
    src: "https://picsum.photos/500/500?random=4",
    title: "Delicious Food",
    category: "food"
  },
  {
    id: 5,
    src: "https://picsum.photos/500/500?random=5",
    title: "Forest Path",
    category: "nature"
  },
  {
    id: 6,
    src: "https://picsum.photos/500/500?random=6",
    title: "Night City",
    category: "city"
  },
  {
    id: 7,
    src: "https://picsum.photos/500/500?random=7",
    title: "Happy Person",
    category: "people"
  },
  {
    id: 8,
    src: "https://picsum.photos/500/500?random=8",
    title: "Pizza",
    category: "food"
  },
  {
    id: 9,
    src: "https://picsum.photos/500/500?random=9",
    title: "Lake View",
    category: "nature"
  },
  {
    id: 10,
    src: "https://picsum.photos/500/500?random=10",
    title: "Urban Street",
    category: "city"
  },
  {
    id: 11,
    src: "https://picsum.photos/500/500?random=11",
    title: "Smiling Face",
    category: "people"
  },
  {
    id: 12,
    src: "https://picsum.photos/500/500?random=12",
    title: "Salad Bowl",
    category: "food"
  }
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentImageIndex = 0;
let currentFilter = 'all';
let filteredImages = images;

function displayImages(imagesToShow) {
  gallery.innerHTML = '';

  imagesToShow.forEach((image, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    galleryItem.innerHTML = `
      <img src="${image.src}" alt="${image.title}">
      <div class="overlay">
        <h3>${image.title}</h3>
        <p>${image.category}</p>
      </div>
    `;

    galleryItem.addEventListener('click', () => {
      openLightbox(index);
    });

    gallery.appendChild(galleryItem);
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  const image = filteredImages[currentImageIndex];
  
  lightboxImg.src = image.src;
  lightboxTitle.textContent = image.title;
  lightboxCategory.textContent = image.category;
  
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function showNextImage() {
  currentImageIndex++;
  
  if (currentImageIndex >= filteredImages.length) {
    currentImageIndex = 0;
  }
  
  const image = filteredImages[currentImageIndex];
  lightboxImg.src = image.src;
  lightboxTitle.textContent = image.title;
  lightboxCategory.textContent = image.category;
}

function showPrevImage() {
  currentImageIndex--;
  
  if (currentImageIndex < 0) {
    currentImageIndex = filteredImages.length - 1;
  }
  
  const image = filteredImages[currentImageIndex];
  lightboxImg.src = image.src;
  lightboxTitle.textContent = image.title;
  lightboxCategory.textContent = image.category;
}

function filterImages(category) {
  currentFilter = category;
  
  if (category === 'all') {
    filteredImages = images;
  } else {
    filteredImages = images.filter(image => image.category === category);
  }
  
  displayImages(filteredImages);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    filterImages(filter);
  });
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    showNextImage();
  } else if (e.key === 'ArrowLeft') {
    showPrevImage();
  }
});

displayImages(images);