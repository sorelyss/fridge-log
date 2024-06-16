const draggables = document.querySelectorAll('.draggable');
const container = document.getElementById('fridgeSpace');

let offsetX, offsetY, isDragging = false, currentElement = null;


function initializeGrid() {
  // Function to position the draggable elements in a grid initially
  const gap = 10; // Gap between grid items
  const containerRect = container.getBoundingClientRect();
  const itemWidth = draggables[0].offsetWidth;
  const itemHeight = draggables[0].offsetHeight;
  const columns = Math.floor((containerRect.width + gap) / (itemWidth + gap));

  draggables.forEach((draggable, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);

    const left = col * (itemWidth + gap);
    const top = row * (itemHeight + gap);

    draggable.style.left = `${left}px`;
    draggable.style.top = `${top}px`;
  });
}

function mousedown(draggable, e) {
  offsetX = e.clientX - parseInt(draggable.style.left || 0);
  offsetY = e.clientY - parseInt(draggable.style.top || 0);
  isDragging = true;
  currentElement = draggable;
  draggable.style.cursor = 'grabbing';
}

function mousemove(e) {
  if (!isDragging || !currentElement) return;

  let newLeft = e.clientX - offsetX;
  let newTop = e.clientY - offsetY;

  if (newLeft < 0) {
    newLeft = 0;
    bounce(currentElement);

  } else if (newLeft + currentElement.offsetWidth > container.offsetWidth) {
    newLeft = container.offsetWidth - currentElement.offsetWidth;
    bounce(currentElement);
  }

  if (newTop < 0) {
    newTop = 0;
    bounce(currentElement);
  } else if (newTop + currentElement.offsetHeight > container.offsetHeight) {
    newTop = container.offsetHeight - currentElement.offsetHeight;
    bounce(currentElement);
  }

  currentElement.style.left = newLeft + 'px';
  currentElement.style.top = newTop + 'px';

}

function mouseup() {
  if (isDragging) {
    isDragging = false;
    currentElement.style.cursor = 'grab';
    currentElement = null;
  }
}

function bounce(draggable) {
  draggable.classList.add('bounce');
  setTimeout(() => {
    draggable.classList.remove('bounce');
  }, 500);
}

initializeGrid();

// PC events
draggables.forEach(draggable => {
  draggable.addEventListener('mousedown', (e) => mousedown(draggable, e));
});
document.addEventListener('mousemove', (e) => mousemove(e));
document.addEventListener('mouseup', () => mouseup());

// Phone events
draggables.forEach(draggable => {
  draggable.addEventListener('touchstart', (e) => mousedown(draggable, e));
});
document.addEventListener('touchmove', (e) => mousemove(e));
document.addEventListener('touchend', () => mouseup());
