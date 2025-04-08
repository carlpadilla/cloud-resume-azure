// --- Configuration ---
const API_ENDPOINT = "https://cpresume.azurewebsites.net/api/getResumeCounter?code=idu-Im8g3CYOYmUOf2wREoIWs91T13s8oVTwByxqpJM9AzFuzAbYTw==";
const TITLE_TEXT = "Carl Padilla"; // Text for the typing animation
const TYPING_SPEED = 100; // Milliseconds per character
const GLITCH_SELECTOR = '.link-glitch'; // Selector for elements to get glitch effect data-text

// --- DOM Elements ---
const counterElement = document.getElementById("counter");
const titleElement = document.getElementById("main-title");
const animatedSections = document.querySelectorAll('.animate-on-scroll');
const glitchLinks = document.querySelectorAll(GLITCH_SELECTOR);

// --- Functions ---

/**
 * Fetches the visit count from the Azure Function API and updates the counter element.
 */
// window.addEventListener("DOMContentLoaded", (event) => {
//   getVisitCount()
// })

const functionAPI =
  "https://cpresume.azurewebsites.net/api/getResumeCounter?code=idu-Im8g3CYOYmUOf2wREoIWs91T13s8oVTwByxqpJM9AzFuzAbYTw=="

const getVisitCount = () => {
  let count = 30
  fetch(functionAPI)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log(" Hire me, please!")
      count = res.count
      document.getElementById("counter").innerText = count
    })
    .catch((err) => {
      console.log(err)
    })
  return count
}


/**
 * Animates the main title with a typing effect.
 */
const typeWriter = (element, text, speed) => {
    if (!element) {
        console.error("Title element for typing animation not found.");
        return;
    }
    let i = 0;
    element.innerHTML = '<span class="cursor">_</span>'; // Start with only cursor

    function type() {
        if (i < text.length) {
            // Insert character before the cursor
            element.innerHTML = text.substring(0, i + 1) + '<span class="cursor">_</span>';
            i++;
            setTimeout(type, speed);
        } else {
            // Typing finished, remove blinking cursor after a short delay (optional)
            // setTimeout(() => {
            //     const cursor = element.querySelector('.cursor');
            //     if (cursor) cursor.style.animation = 'none'; // Stop blinking
            // }, 1500);
        }
    }
    setTimeout(type, speed); // Start typing after a brief pause
};


/**
 * Sets up Intersection Observer to add 'visible' class for scroll animations.
 */
const setupScrollAnimations = () => {
    if (!('IntersectionObserver' in window)) {
        console.log("Intersection Observer not supported, skipping scroll animations.");
        // Fallback: Make all sections visible immediately if IO is not supported
        animatedSections.forEach(section => section.classList.add('visible'));
        return;
    }

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedSections.forEach(section => observer.observe(section));
};

/**
 * Adds the 'data-text' attribute to elements for the CSS glitch effect.
 */
const setupGlitchEffect = () => {
    glitchLinks.forEach(link => {
        link.setAttribute('data-text', link.textContent);
    });
}

// --- Event Listeners and Initializations ---
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Initializing scripts...");

    // 1. Fetch Visit Count
    getVisitCount();

    // 2. Animate Title
    typeWriter(titleElement, TITLE_TEXT, TYPING_SPEED);

    // 3. Setup Scroll Animations
    setupScrollAnimations();

    // 4. Setup Glitch Effect Data Attributes
    setupGlitchEffect();

    console.log("Initialization complete.");
});