
const photos = [
  {
    src: "photos/image1.jpg",
    caption: "Beautiful memories ❤️"
  },
  {
    src: "photos/image2.jpg",
    caption: "Every moment is special ✨"
  },
  {
    src: "photos/image3.jpg",
    caption: "Keep smiling always 💖"
  },
  {
    src: "photos/image4.jpg",
    caption: "Wishing you endless happiness 🎂"
  }
];

let currentSlide = 0;
let slideshowTimer = null;

const slide = document.getElementById("slide");
const caption = document.getElementById("caption");
const dots = document.getElementById("dots");
const playBtn = document.getElementById("playBtn");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

// Create slideshow navigation dots
photos.forEach((photo, index) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.setAttribute("aria-label", `Show picture ${index + 1}`);

  dot.addEventListener("click", () => {
    showSlide(index);
  });

  dots.appendChild(dot);
});

function showSlide(index) {
  currentSlide = (index + photos.length) % photos.length;

  slide.classList.add("changing");

  setTimeout(() => {
    slide.src = photos[currentSlide].src;
    caption.textContent = photos[currentSlide].caption;

    slide.onload = () => {
      slide.classList.remove("changing");
    };

    // Remove transition state if an image fails to load
    slide.onerror = () => {
      slide.classList.remove("changing");
      caption.textContent = "Add your picture to the photos folder ❤️";
    };

    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }, 250);
}

document.getElementById("nextBtn").addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

function startSlideshow() {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
  }

  slideshowTimer = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3500);

  playBtn.textContent = "❚❚ Pause Slideshow";
}

function stopSlideshow() {
  clearInterval(slideshowTimer);
  slideshowTimer = null;
  playBtn.textContent = "▶ Start Slideshow";
}

playBtn.addEventListener("click", () => {
  if (slideshowTimer) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

// Birthday music
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "🔊 Pause Birthday Music";
    } catch (error) {
      musicBtn.textContent = "⚠️ Check your music file";
    }
  } else {
    music.pause();
    musicBtn.textContent = "🎵 Play Birthday Music";
  }
});

music.addEventListener("ended", () => {
  musicBtn.textContent = "🎵 Play Birthday Music";
});

// Surprise message and celebration
document.getElementById("surpriseBtn").addEventListener("click", () => {
  const surprise = document.getElementById("surprise");

  surprise.classList.toggle("show");

  if (surprise.classList.contains("show")) {
    document.getElementById("surpriseBtn").textContent =
      "💖 Your Special Message";

    celebrate();
  } else {
    document.getElementById("surpriseBtn").textContent =
      "🎁 Open Your Surprise";
  }
});

// Floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["❤️", "💖", "💕", "✨", "💗"][
    Math.floor(Math.random() * 5)
  ];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 20 + "px";
  heart.style.animationDuration = 4 + Math.random() * 5 + "s";

  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 9500);
}

setInterval(createHeart, 500);

// Extra celebration hearts
function celebrate() {
  for (let i = 0; i < 25; i++) {
    setTimeout(createHeart, i * 100);
  }
}

// Initial display
showSlide(0);
