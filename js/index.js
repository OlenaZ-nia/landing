const mainDoc = document.getElementById('main-content');

const modal = document.querySelector('.modal');

const backdrop=modal.querySelector('.modal__body');
const btnClose = modal.querySelector('[data-action="close-modal"]');
const textOrder = modal.querySelector('.text-order');

const form = modal.querySelector('.js-order-form');

let stateSl = {
  currentSl: 0,
  currentSlider:'',
  slides:[]
}
let { currentSl, currentSlider, slides } = stateSl;

mainDoc.addEventListener('click', (e) => {
  
// перевірка slider or buttonOrder
  const nameSlider = e.target.attributes.data;
  const btnOrder = e.target.dataset.art;
  const btnOrderSale = e.target.dataset.sale;

  if (e.target.nodeName === 'BUTTON') {
    if (nameSlider) {
      const typeBtn = e.target.className;
      slidesToShow(typeBtn, nameSlider);
    };
    
    if (btnOrder || btnOrderSale) {
      onOpenModal(btnOrder, btnOrderSale);
    };

  }
  
})


function slidesToShow(typeBtn, nameSlider) {

    if (currentSlider !== nameSlider.value) {
        console.log(currentSlider !== nameSlider.value)
        currentSl = 0;
      currentSlider = nameSlider.value;
      console.log(currentSlider)
        slides = document.querySelectorAll(`.${currentSlider} .slide-list__item`);
        console.log('sl: ', slides);
    };
    console.log(currentSlider);

    let getCurrentSlide = slides.forEach((el, ind) => {
        if (el.style.display === 'block') {
            currentSl = ind;
        }
    });

    if (typeBtn === 'next') {
      slides[currentSl].style.display = 'none';
      currentSl++;
      if (currentSl >= slides.length) {
        currentSl = 0;
      }
      
      slides[currentSl].style.display = 'block';
    }

    if (typeBtn === 'prev') {
      slides[currentSl].style.display = 'none';
      currentSl = currentSl - 1;
      if (currentSl < 0) {
        currentSl = slides.length - 1;
      }
      
      slides[currentSl].style.display = 'block';
    }

}
 
// **************Modal******************

function onOpenModal(btnOrder, btnOrderSale) {
  form.addEventListener('submit', onFormSubmit);
  window.addEventListener('keydown', onEscKeyPress);
  btnClose.addEventListener('click', onCloseModal);
  backdrop.addEventListener('click', onBackdropClick);
  
  modal.classList.add('is-open');
  if (btnOrderSale) {
    textOrder.textContent = `Ваша знижка ${btnOrderSale}. Оберіть модель.`
  };
  if (btnOrder) {
    textOrder.textContent = `Ви хочете замовити модель № ${btnOrder}!`
  };
};

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  modal.classList.remove('is-open');
  backdrop.removeEventListener('click', onBackdropClick);
  btnClose.removeEventListener('click', onCloseModal);
  form.removeEventListener('submit', onFormSubmit);
};

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  const isEscKey = e.code === 'Escape';

  if (isEscKey) {
      onCloseModal();
  }
}

//*********************FormData*************** */
// form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  console.log(formData);

  formData.forEach((value, name) => {
    console.log('onFormSubmit -> name', name);
    console.log('onFormSubmit -> value', value);
  });
  onCloseModal();
}