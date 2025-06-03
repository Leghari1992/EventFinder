const events = [
  {
    name: "Tech Conference ",
    date: "June 10, 2025",
    time: "10:00 AM",
    location: "New York City",
    description:
      "Dive into the latest tech trends and network with innovators.",
    image: "images/tech.png",
  },
  {
    name: "Food Fest",
    date: "June 15, 2025",
    time: "12:00 PM",
    location: "Los Angeles",
    description: "Savor delicious dishes from top chefs and local favorites.",
    image: "images/food.png",
  },
  {
    name: "Music Night Live",
    date: "June 22, 2025",
    time: "8:00 PM",
    location: "Austin",
    description:
      "Experience electrifying live performances by renowned artists.",
    image: "images/music.jpeg",
  },
  {
    name: "Startup Expo",
    date: "June 30, 2025",
    time: "9:00 AM",
    location: "San Francisco",
    description: "Discover groundbreaking startups and connect with investors.",
    image: "images/expo.jpeg",
  },
  {
    name: "Art Expo",
    date: "July 4, 2025",
    time: "11:00 AM",
    location: "Islamabad",
    description:
      "Explore stunning contemporary artworks from emerging talents.",
    image: "images/art.jpeg",
  },
  {
    name: "Fashion Gala",
    date: "July 5, 2025",
    time: "3:00 PM",
    location: "Karachi",
    description:
      "Celebrate the latest fashion trends with designers and models.",
    image: "images/fashion.jpeg",
  },
  {
    name: "Coding Hackathon",
    date: "July 12, 2025",
    time: "11:00 AM",
    location: "Islamabad",
    description:
      "Collaborate and compete to build innovative software solutions.",
    image: "images/coding.jpeg",
  },
  {
    name: "Book Fair",
    date: "July 5, 2025",
    time: "6:00 PM",
    location: "Chicago",
    description: "Browse and buy books from your favorite authors and genres.",
    image: "images/book.jpeg",
  },
];

// Function to create card HTML dynamically
function createEventCard(event) {
  return `
    <div class="event-card">
      <div class="card-wrapper">
        <div class="card h-100" tabindex="0">
          <img src="${event.image}" class="card-img-top" alt="${event.name}" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text"><strong>Date:</strong> ${event.date}</p>
            <p class="card-text"><strong>Time:</strong> ${event.time}</p>
            <p class="card-text"><strong>Location:</strong> ${event.location}</p>
            <p class="card-text">${event.description}</p>
            <button class="btn btn-secondary w-100 mb-2">View Details</button>
            <button class="btn btn-primary w-100 mt-auto">Register</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderEvents(eventsToRender) {
  const container = document.querySelector("#featuredEventsContainer");
  container.innerHTML = "";

  if (eventsToRender.length === 0) {
    container.innerHTML = `<p class="text-center w-100" style="color: #bbb;">No events found.</p>`;
    return;
  }

  eventsToRender.forEach((event) => {
    container.insertAdjacentHTML("beforeend", createEventCard(event));
  });

  initObserver();
}

// Intersection Observer setup to add "in-view" class for animation
function initObserver() {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
}

// Carousel scroll logic
const carousel = document.querySelector("#featuredEventsContainer");
document.querySelector(".left-arrow").addEventListener("click", () => {
  carousel.scrollBy({ left: -300, behavior: "smooth" });
});

document.querySelector(".right-arrow").addEventListener("click", () => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
});

// Auto-scroll carousel every 4 seconds
setInterval(() => {
  const carousel = document.querySelector("#featuredEventsContainer");
  carousel.scrollBy({ left: 300, behavior: "smooth" });

  // If scrolled to the end, go back to start
  if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10) {
    carousel.scrollTo({ left: 0, behavior: "smooth" });
  }
}, 4000);

// Initialize rendering and search event listener
document.addEventListener("DOMContentLoaded", () => {
  renderEvents(events);

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredEvents = events.filter((event) =>
      event.name.toLowerCase().includes(query)
    );
    renderEvents(filteredEvents);
  });
});
