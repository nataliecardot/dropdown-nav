const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter() {
  // `this` is the list item (element on which event was detected)
  this.classList.add('trigger-enter');
  // Note: since arrow function is used, value of this is inherited from parent function (so, it's the element on which event was detected); otherwise the value of this changes when you enter into a function (it would be window)
  setTimeout(() => this.classList.add('trigger-enter-active'), 150);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
}

triggers.forEach((trigger) =>
  trigger.addEventListener('mouseenter', handleEnter)
);

triggers.forEach((trigger) =>
  trigger.addEventListener('mouseleave', handleLeave)
);
