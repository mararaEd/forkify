const domStrings = {
  circBtn: '.circ-nav__button',
  closeIt: '.circ-nav__span--close',
  activeSpin: '.circ-nav__spin--active',
  activeBtn: '.circ-nav__button--active',
  span: '.circ-nav__span',
};

// ELEMENTS
const circBtn = document.querySelector(domStrings.circBtn);

circBtn.addEventListener('click', e => {
  if (e.target.matches(domStrings.span)) {
    console.log(e.target);

    e.target.parentElement.classList.toggle(domStrings.activeBtn.split('.')[1]);
    e.target.parentElement.firstElementChild.classList.toggle(
      domStrings.closeIt.split('.')[1]
    );
    return e.target.parentElement.parentElement.children[1].classList.toggle(
      domStrings.activeSpin.split('.')[1]
    );
  }

  e.target.classList.toggle(domStrings.activeBtn.split('.')[1]);
  e.target.firstElementChild.classList.toggle(domStrings.closeIt.split('.')[1]);
  e.target.parentElement.children[1].classList.toggle(
    domStrings.activeSpin.split('.')[1]
  );
});
