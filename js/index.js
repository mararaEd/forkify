'use strict';

// CLASSES
const domStrings = {
  circBtn: '.circ-nav__button',
  closeIt: '.circ-nav__span--close',
  activeSpin: '.circ-nav__spin--active',
  activeBtn: '.circ-nav__button--active',
  span: '.circ-nav__span',

  listCur: '.form__cur-list',
  list: '.form__list',
  listP: '.form__list-p',

  order: '.order',
  closeOrder: '.order__close',
  showOrder: 'order--show',
  listCurChange: 'form__cur-list--change',
  listCurTypo: 'form__cur-list--vColor',
  listCurT: '.form__cur-list_text',
  listCurRe: 'form__cur-list--reverse',
  listShow: 'form__list--show',
  item: '.item',
  quant_cont: '.item__container-quant',

  formFi: 'form--in',
  formFo: 'form--out',
  quantFi: 'quantifier--in',
  quantFo: 'quantifier--out',

  fItem: '.search-pref__item',
  fActive: 'search-pref__item--active',
  fActiveF: 'search-pref__item--activeF',
  fShow: 'search-pref--show',
};

// ELEMENTS
const circBtn = document.querySelector(domStrings.circBtn);
const listCur = document.querySelector(domStrings.listCur);
const listCurText = document.querySelector(domStrings.listCurT);
const list = document.querySelector(domStrings.list);
const listPara = document.querySelector(domStrings.listP);
const order = document.querySelector(domStrings.order);

const items = Array.from(document.querySelectorAll(domStrings.item));
const containerQ = document.querySelector(domStrings.quant_cont);
const customQ = document.querySelector('.quantifier');
const formQ = document.querySelector('.form--quant');

const closeOrder = document.querySelector(domStrings.closeOrder);
const contFilter = document.querySelector('.search-pref');
const filterItem = document.querySelector(domStrings.fItem);
const h2 = document.querySelector('.h2--pref');
const containerCard = document.querySelector('.containerCards');
const cardIcons = [...document.querySelectorAll('.card__icon')];
const [filterBtn, , orderBtn] = [
  ...document.querySelectorAll('.user-nav__icon'),
];

if (orderBtn)
  document.addEventListener('click', e => {
    const { order: type } = e.target.dataset;

    if (e.target === orderBtn || type?.startsWith('f'))
      return order.classList.add(domStrings.showOrder);

    if (
      e.target.matches(`${domStrings.closeOrder}, .order__icon`) ||
      type?.startsWith('t')
    )
      return order.classList.remove(domStrings.showOrder);

    if (!e.target.closest(domStrings.order))
      order.classList.remove(domStrings.showOrder);
  });

if (cardIcons) {
  cardIcons.forEach(el => {
    el.addEventListener('mouseleave', e => {
      e.target.lastElementChild.style.transition = 'all .1s';
    });

    el.addEventListener('mouseenter', e => {
      e.target.lastElementChild.style.transition = 'all .2s .2s';
    });
  });
}

if (filterBtn)
  filterBtn.addEventListener('click', () => {
    contFilter.classList.toggle(domStrings.fShow);

    // preparing
    h2.classList.toggle('h2--pref--hide');
    containerCard.classList.toggle('containerCards--down');
  });

const clear = (...arg) => {
  arg.forEach((el, i) => {
    el.classList.remove(...Array.prototype.slice.call(el.classList, i + 1));
  });
};

const determineQuants = e => {
  const elm = e.target.children[3];

  return [elm.firstElementChild, elm.lastElementChild];
};

if (items?.[0]) {
  items.forEach(item => {
    item.addEventListener('mouseenter', function (e) {
      const [customQ, formQ] = determineQuants(e);

      const value = customQ.firstElementChild.textContent;

      clear(customQ, formQ);

      customQ.parentElement.style.transition = 'all 0.1s';

      customQ.classList.add(domStrings.quantFo);

      formQ.firstElementChild.firstElementChild.value = value;
      formQ.classList.add(domStrings.formFi);
    });

    item.addEventListener('mouseleave', function (e) {
      const [customQ, formQ] = determineQuants(e);

      const value = formQ.firstElementChild.firstElementChild.value;

      clear(customQ, formQ);

      customQ.parentElement.style.transition = 'all 0.1s 0.1s';

      customQ.firstElementChild.textContent = value;

      customQ.classList.add(domStrings.quantFi);
      formQ.classList.add(domStrings.formFo);
    });
  });
}

// EVENTS

if (order) {
  order.addEventListener('click', e => {
    const elm = domStrings.listCur;

    if (e.target.matches(` ${elm}, ${elm}_text, ${elm}_icon`)) {
      const elmN = e.target.closest(elm);
      const indicator = Array.from(elmN.classList).slice(-1);
      console.log(indicator);

      elmN.nextElementSibling.classList.toggle(domStrings.listShow);
      elmN.classList.remove(domStrings.listCurTypo);

      if (indicator[0].endsWith('ge'))
        return elmN.classList.add(domStrings.listCurRe);

      if (indicator[0].endsWith('se') || indicator[0].endsWith('list'))
        elmN.classList.add(domStrings.listCurTypo);

      elmN.classList.remove(domStrings.listCurChange, domStrings.listCurRe);
      elmN.classList.add(domStrings.listCurChange);
    } else if (e.target.matches(domStrings.listP)) {
      listCur.classList.add(domStrings.listCurRe);
      listCur.classList.remove(domStrings.listCurTypo);

      list.classList.remove(domStrings.listShow);
      listCurText.textContent = e.target.textContent;
    } else {
      if (listCur.matches(`.${domStrings.listCurChange}`)) {
        listCur.classList.add(domStrings.listCurRe);
        listCur.classList.remove(domStrings.listCurTypo);
        list.classList.remove(domStrings.listShow);
        // elmN.classList.remove(domStrings.listCurTypo);
      }
    }
  });
}

if (circBtn)
  circBtn.addEventListener('click', e => {
    if (e.target.matches(domStrings.span)) {
      console.log(e.target);

      e.target.parentElement.classList.toggle(
        domStrings.activeBtn.split('.')[1]
      );
      e.target.parentElement.firstElementChild.classList.toggle(
        domStrings.closeIt.split('.')[1]
      );
      return e.target.parentElement.parentElement.children[1].classList.toggle(
        domStrings.activeSpin.split('.')[1]
      );
    }

    e.target.classList.toggle(domStrings.activeBtn.split('.')[1]);
    e.target.firstElementChild.classList.toggle(
      domStrings.closeIt.split('.')[1]
    );
    e.target.parentElement.children[1].classList.toggle(
      domStrings.activeSpin.split('.')[1]
    );
  });

if (filterItem) {
  const allItems = Array.from(document.querySelectorAll('.search-pref__item'));

  // listening for the click event.
  document.querySelector('.search-pref').addEventListener('click', e => {
    if (e.target.matches('svg, use, .search-pref__link')) {
      // current item
      const elm = e.target.closest(domStrings.fItem);

      // removing active class from all the items.
      allItems.forEach(el => {
        el.classList.remove(
          domStrings.fActive,
          el.classList.contains(domStrings.fActive)
        );
      });

      // toggling between both the active and forceActive classes.
      elm.classList.toggle(domStrings.fActive);
      elm.classList.toggle(
        domStrings.fActiveF,
        elm.classList.contains(domStrings.fActive)
      );
    }
  });

  // removing the active class when the mouse isn't over the items.
  allItems.forEach(el => {
    el.addEventListener('mouseleave', e => {
      e.target.classList.remove(domStrings.fActiveF);
    });
  });
}
