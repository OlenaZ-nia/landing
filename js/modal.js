const modal = document.querySelector('.modal');
const form = modal.querySelector('.js-order-form');
const backdrop=document.querySelector('.modal__body');
const btnClose = document.querySelector('[data-action="close-modal"]');
const btnOpen = document.querySelectorAll('.btn-order');
const textOrder = document.querySelector('.text-order');

btnOpen.forEach((btn) => {
    btn.addEventListener('click', onOpenModal);
});

function onOpenModal(e) {
  form.addEventListener('submit', onFormSubmit);  //*
  window.addEventListener('keydown', onEscKeyPress);
  btnClose.addEventListener('click', onCloseModal);
  backdrop.addEventListener('click', onBackdropClick);
  modal.classList.add('is-open');
  if (e.target.dataset.sale) {
    textOrder.textContent = `Ваша знижка ${e.target.dataset.sale}. Оберіть модель.`
  };
  if (e.target.dataset.art) {
    textOrder.textContent = `Ви хочете замовити модель № ${e.target.dataset.art}!`
  };
}

function onCloseModal() {
  form.removeEventListener('submit', onFormSubmit);  //*
  window.removeEventListener('keydown', onEscKeyPress);
  modal.classList.remove('is-open');
  backdrop.removeEventListener('click', onBackdropClick);
  btnClose.removeEventListener('click', onCloseModal);
}

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
