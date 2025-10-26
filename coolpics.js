// Mobile menu and image viewer functionality for Cool Pics gallery

// Handle window resize for responsive menu
function handleResize() {
  const menu = document.querySelector(".main-nav");
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

// Generate HTML for image viewer modal
function viewerTemplate(imageSrc, imageAlt) {
  return `
    <div class="viewer">
      <button class="close-viewer" aria-label="Close image viewer">X</button>
      <img src="${imageSrc}" alt="${imageAlt}" class="viewer-image">
    </div>
  `;
}

// Handle click events on gallery images
function viewHandler(event) {
  // Get the clicked element
  const clickedElement = event.target;
  
  // Only proceed if an image was clicked
  if (clickedElement.tagName !== 'IMG') {
    return;
  }
  
  // Get image source and split to create full-size filename
  const srcParts = clickedElement.src.split('-');
  const newSrc = srcParts[0] + '-full.jpeg';
  
  // Insert the viewer template at top of body
  document.body.insertAdjacentHTML("afterbegin", viewerTemplate(newSrc, clickedElement.alt));
  
  // Add click listener to close button
  document.querySelector('.close-viewer').addEventListener('click', closeViewer);
  
  // Add click listener to backdrop (outside image)
  document.querySelector('.viewer').addEventListener('click', function(e) {
    if (e.target === this) {
      closeViewer();
    }
  });
  
  // Add escape key listener
  document.addEventListener('keydown', handleEscape);
  
  // Add modal-open class to body
  document.body.classList.add('modal-open');
}

// Close the image viewer modal
function closeViewer() {
  const viewer = document.querySelector('.viewer');
  if (viewer) {
    viewer.remove();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscape);
  }
}

// Handle escape key press
function handleEscape(event) {
  if (event.key === 'Escape') {
    closeViewer();
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const menuButton = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  function toggleMenu() {
    mainNav.classList.toggle("hide");
  }
  
  if (menuButton && mainNav) {
    menuButton.addEventListener('click', toggleMenu);
    window.addEventListener('resize', handleResize);
    handleResize();
  }
  
  // Image viewer functionality - event delegation on gallery
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.addEventListener('click', viewHandler);
  }
});