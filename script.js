const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdown-background');
const nav = document.querySelector('.top');

function handleEnter() {
  // `this` is the list item (element on which event was detected)
  this.classList.add('trigger-enter');
  // Note: since arrow function is used, value of this is inherited from parent function (so, it's the element on which event was detected); otherwise the value of this changes when you enter into a function (it would be window)
  setTimeout(
    () =>
      // Ensuring not trying to removing trigger-enter-active before it's added - if you go off and hover onto another dropdown very quickly, it might then be added after hovering another (in that case removal tris and failed, then it's added, so multiple dropdowns are displayed) - so if you hover off it quickly, trigger-enter is immediately removed; trigger-enter-active can't be added
      this.classList.contains('trigger-enter') &&
      this.classList.add('trigger-enter-active'),
    100
  );
  background.classList.add('open');

  // Find the one dropdown in the menu item (li) that was hovered
  const dropdown = this.querySelector('.dropdown');

  // This is part of why adding display property for trigger-enter - so this info can be obtained
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    // Subtracting top value of nav in case something is above nav - getBoundingClientRect() gives a result relative to viewport's top-left corner - can't assume nav is anchored to top of page
    left: dropdownCoords.left - navCoords.left, // x
    top: dropdownCoords.top - navCoords.top, // y
  };

  const { width, height, left, top } = coords;

  background.style.setProperty('width', width + 'px');
  background.style.setProperty('height', height + 'px');
  background.style.setProperty('transform', `translate(${left}px, ${top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

triggers.forEach((trigger) =>
  trigger.addEventListener('mouseenter', handleEnter)
);

triggers.forEach((trigger) =>
  trigger.addEventListener('mouseleave', handleLeave)
);
