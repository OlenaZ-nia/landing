//getRef
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.modal__body');

const btnOpen = document.querySelectorAll('.btn-order');

const btnBasket = document.querySelector('[data-action="open-basket"]');
const quantity = btnBasket.querySelector('.basket-quantity');

let currentFocusEl;
let currentModal;
let textOrder;
let articul;
let price;
let allListOrder = [];

let orderPost = {};

let dialogIsOpen = false;

getStateBasket()

//get interactiv elements on page without modal
const INTERACTIVE_SELECTORS = ['a', 'button', 'input', 'textarea', '[tabindex]'];
const addTag = ':not(.modal *)';
const getInteractiveSelectors = INTERACTIVE_SELECTORS.map(el => {
  const x = el.concat(addTag);
  return x
});
const focusableElsDoc = document.querySelectorAll(getInteractiveSelectors.toString());

btnOpen.forEach((btn) => {
  btn.addEventListener('click', onOpenModal);
});

btnBasket.addEventListener('click', onOpenModal);

function printQuantity() {
  const x=allListOrder.reduce(function(acc,el) {
    acc += el.number;
    return acc
  }, 0)
  // quantity.textContent = allListOrder.length;
  quantity.textContent = x;
}

function onOpenModal(e) {
  // console.log("open modal")
  e.preventDefault();
  
  currentFocusEl = e.target;  //****btn-order****btn-basket<--btn-continue */
  
  //Open form1-feature
  if (e.target.className === 'btn-order') {
    articul = e.target.dataset.art;

    //get description info
    const elDesc = e.target.closest('.description');
    const size = getSize(elDesc);
    const color = getColor(elDesc);
  
    price = getPrice(elDesc);

    const templateForm = createItemsFormDesc(articul, color, size, price);

    const formDesc = document.getElementById('form1');
    resetFormElements(formDesc);
    formDesc.insertAdjacentHTML('afterbegin', templateForm);
    formDesc.querySelector('[name="color"]').checked = true;
    formDesc.querySelector('[name="size"]').checked = true;

    currentModal = modal.querySelector('.modal #dialog1');
  }

  if (e.target.className === 'basket-btn') {
    currentModal = modal.querySelector('.modal #dialog2');
    openBasket();
  }
  if (e.target.dataset.action==='continue') {
    //open Dialog3-pay  e=click continue**************

    const id = new Date().toLocaleString().replace(/[\s,\.:]/g, smb => (smb == ',' ? '&' : ''));
    
    currentModal = modal.querySelector('.modal #dialog3');
    currentModal.querySelector('#form3').reset();
    textOrder = currentModal.querySelector('.text-order');
    textOrder.textContent = `???????????????????? ???${id} ???? ???????? ${orderPost.sum}!`;
  }
  
  modal.classList.add('is-open');
  currentModal.classList.remove('hidden');
  dialogIsOpen = true;

  let el;  // function deleteTabInd(){}
  for (let i = 0; i < focusableElsDoc.length; i++){
      el = focusableElsDoc[i];
      el.setAttribute('tabindex', '-1');
  };

  const form = currentModal.querySelector('.js-order-form');
  if (currentModal.id !== "dialog2") {
    form.addEventListener('submit', onFormSubmit);
  }

  const btnClose = currentModal.querySelector('[data-action="close-modal"]');

  if (form.id==='form1') {
    const number = form.querySelector('.number-amount');
    number.addEventListener('change', countSum); 
  }
   
  window.addEventListener('keydown', onEscKeyPress);
  btnClose.addEventListener('click', onCloseModal);
  backdrop.addEventListener('click', onBackdropClick);

  trapFocus();

}

function resetFormElements(formId) {
  while (formId.firstChild) {
    formId.removeChild(formId.firstChild);
  }
    
}

function onCloseModal() {
  // console.log("close modal")
  let el;
  for (let i = 0; i < focusableElsDoc.length; i++){
      el = focusableElsDoc[i];
      el.setAttribute('tabindex', '0');
  };

  const form = currentModal.querySelector('.js-order-form');
  const btnClose = currentModal.querySelector('[data-action="close-modal"]');

  if (form.id !== 'form2') {
    form.removeEventListener('submit', onFormSubmit);  
  }
  
  window.removeEventListener('keydown', onEscKeyPress);
  modal.classList.remove('is-open');
  backdrop.removeEventListener('click', onBackdropClick);
  btnClose.removeEventListener('click', onCloseModal);

  currentModal.classList.add('hidden');
  dialogIsOpen = false;

  currentFocusEl.focus();   //**basket-- */
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

function onFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const id = new Date().toLocaleString().replace(/[\s,\.:]/g, smb => (smb == ',' ? '-' : ''));
  formData.append('id', id);

  if (e.currentTarget.id === 'form1') {
    formData.append('articul', articul);
  }

  let nextOrder = {};

  formData.forEach((value, name) => {
    if (name === 'number'|| name==='sum' || name==="count") {
      nextOrder[name] = Number(value)
    } else {
      nextOrder[name] = value
    }  
  });

  // if dialog1 click on btn data-action="add"
  if (e.currentTarget.id === 'form1') {
    const number = e.currentTarget.querySelector('.number-amount');
    number.removeEventListener('change', countSum); 

    //write allListOrder
    getAllListOrder(allListOrder, nextOrder);
    updateStateBasket();

    //print quantity
    printQuantity()

  }

  //if dialog3 submit on btnSub in form3  ***********
  if (e.currentTarget.id === 'form3') {
    const buy = () => {
      orderPost.id = id;
      orderPost.customer = nextOrder;
      return orderPost
    }
    console.log(buy())

    allListOrder = []
    updateStateBasket();
    printQuantity()

  //clear Basket table
  const basketTable = document.querySelector(".basket-table tbody")
  resetFormElements(basketTable)
    
    const tableRowSum = document.querySelector('.basket-table .sum #sum');
    tableRowSum.value='0'
  }

  e.currentTarget.reset()
  onCloseModal();
}

function getAllListOrder(allListOrder, nextOrder) {
      const includes = allListOrder.findIndex(el => (
        el.articul === nextOrder.articul && el.color === nextOrder.color && el.size === nextOrder.size
      ));
      
      if (includes === -1) {
        console.log("different dress");
        allListOrder.push(nextOrder);
      } else {
        console.log('the same dress');
        allListOrder[includes].number += nextOrder.number;
        allListOrder[includes].count += nextOrder.count;
      };
      console.log(allListOrder); 
    }

function trapFocus() {
  const focusableElsMod = currentModal.querySelectorAll(INTERACTIVE_SELECTORS.toString());
  const firstFocusEl = focusableElsMod[0];
  const lastFocusEl = focusableElsMod[focusableElsMod.length - 1];
  
  const KEYCOD_TAB = 9;
  
  setTimeout(function () {
  focusableElsMod[1].focus();
  }, 1000);

  currentModal.addEventListener('keydown', restrectFocus);

  if (!dialogIsOpen) {
    currentModal.removeEventListener('keydown', restrectFocus);
  }

  function restrectFocus(e) {
    
    const isTabPressed = (e.code === "Tab" || e.keyCode === KEYCOD_TAB);
    if (!isTabPressed) {
      return;
    };

    if (e.shiftKey) {
      if (document.activeElement === firstFocusEl) {
        lastFocusEl.focus();
        e.preventDefault();
      }
    } else if (isTabPressed) {
      if (document.activeElement === lastFocusEl) {
        firstFocusEl.focus();
        e.preventDefault();
      }
    };

  }

}

function countSum(e) {
  const el = currentModal.querySelector('.count-sum');
  el.value = (price * e.target.value);
}

function getStateBasket() {
  const myBasket = localStorage.getItem('myBasket');
  const parseMyBasket = JSON.parse(myBasket);
  
  if (parseMyBasket!==null && parseMyBasket?.length !== 0) {
    allListOrder = parseMyBasket;
    printQuantity();
  } 
}

function updateStateBasket() {
  localStorage.setItem('myBasket', JSON.stringify(allListOrder));
}

function getSize(elDesc) {
  const sizeNodeArr = elDesc.querySelectorAll('.desc-size');
  const size = [];
  sizeNodeArr.forEach(el => (
    size.push(el.textContent)
    ));
  return size;
}

function getColor(elDesc) {
  const colorStr = elDesc.querySelector('.desc-color').textContent.trim();
  const colorsArr = colorStr.replace(/??????????|[\s.:]/gi, '').split(',');

  return colorsArr
}

function getPrice(elDesc) {
  // const currentPrice = elDesc.querySelector('.current').textContent.trim();
  const actualPrice = elDesc.querySelector('.actual').textContent.trim();
  const price = actualPrice.replace(/??????|[\s]/g, '');

  return price;
}

function createItemsFormDesc(articul,colors, sizeArr, price) {
  //color
  const color = colors.map((el) => {
    return `<label><input type="radio" name="color" value="${el}"/>${el}</label>`
  }).join('')

  //size
  const size = sizeArr.map(el => {
    return `<label><input type="radio" name="size" value="${el}"/>${el}</label>`
  }).join('')
  
  //create all elements of Form
  const formEl =`<h2 id="dialog1_label" class="modal-label">
              ???? ???????????? ???????????????? ???????????? ???${articul}
            </h2>
            <fieldset form="form1">
              <legend>?????????????? ??????????:</legend>
              ${color}
            </fieldset>

            <fieldset form="form1">
              <legend>?????????????? ????????????:</legend>
              ${size}
            </fieldset>

            <fieldset form="form1">
              <legend>?????????????? ??????????????????:</legend>
              <label>
                ?????????????? ??????????????????:
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="1"
                  value="1"
                  name="number"
                  class="number-amount"
                />
              </label>
            </fieldset>

            <fieldset form="form1">
              <legend>????????????????:</legend>
              <label>
                ????????????????:
                <input
                  type="number"
                  value="${price}"
                  name="count"
                  class="count-sum"
                  readonly
                />??????
              </label>
            </fieldset>
            <button type="submit" class="btnSub" data-action="add">
              ?? ??????????
            </button>`

  return formEl

}

function openBasket() {
  // console.log("open basket")
  //Get Ref  data-action continue
  const btnSubOrder = currentModal.querySelector('.btnSub'); //click-btn

  //Get Ref
  const tableRowSum = currentModal.querySelector('.basket-table .sum #sum');
  const basketTable = document.querySelector(".basket-table tbody");

  if (allListOrder.length === 0) {
    btnSubOrder.setAttribute("disabled", "true")
    return
  } else {
    btnSubOrder.removeAttribute("disabled")
  }

  //clear tableList
  while (basketTable.firstChild) {
    basketTable.removeChild(basketTable.firstChild);
  }
  
  //Create basketTable
  // const createBasketList = createItems(parseMyBasket);
  const createBasketList = createItems(allListOrder);  // nextOrder

  basketTable.insertAdjacentHTML('afterbegin', createBasketList.itemList);
  tableRowSum.value = createBasketList.i;
  
  //on click-continue
  btnSubOrder.addEventListener('click', onClickBtn, {once: true}); //****once: true */

  //Delete
  const btnDelete = basketTable.querySelectorAll('.btn-delete');

  btnDelete.forEach((btn) => {
    btn.addEventListener('click', onDelete, {once: true})
  })

}

function createItems(arr) {
  let i = 0;

  const itemList = arr.map((el) => {
    const { articul, color, size, number, id, count } = el
    i += count
    
    return `<tr id="${articul}" class="item-delete">
              <td class="col1-row1">
                <label
                  ><input
                    type="text"
                    name="articul"
                    id="articul"
                    value="${articul}"
                    readonly
                /></label>
              </td>
              <td class="col2-row2">
                <label
                  ><input type="text" name="color" id="color" value="${color}" readonly
                /></label>
              </td>
              <td class="col3-row3">
                <label
                  ><input type="text" name="size" id="size" value="${size}" readonly
                /></label>
              </td>
              <td class="col4-row4 num">
                <label
                  ><input type="text" name="number" id="number" value="${number}" readonly
                /></label>
              </td>
              <td class="col5-row5 num-sum">
                <label
                  ><input type="text" name="count" id="count" value="${count}" readonly
                /></label>
              </td>
              <td class="col6-row6">
                <button
                  type="button"
                  class="btn-delete"
                  data-action="delete"
                  id="${id}"
                >
                  <svg class="btn-delete__icon">
            <use
              href="./images/symbol-defs.svg#icon-basket-delete"
            ></use>
          </svg>
                </button>
              </td>
            </tr>`
  }).join('');
  return {itemList, i}
}
  
function onClickBtn(e) {
  // console.log("create order")
  e.preventDefault();
  console.log(e.target.closest("#form2")) //btn action='continue'
  
  //form2
    let obj = {};
    let order = [];
    orderPost = { order };
    
    const elements = e.target.closest("#form2").querySelectorAll('input, textarea');
    
    for (let i = 0; i < elements.length; ++i) {
    const element = elements[i]
    const name = element.name
    const value = element.value
    
    if (name !== "sum") {
      if (obj[name]) {
        order.push(obj)
        obj = {}
      }
      if (name === 'number' || name === "count") {
        obj[name] = Number(value)
      } else {
        obj[name] = value
      }
      
    } else {
      orderPost[name] = Number(value)
    }
  }
  order.push(obj)

  //change modal window
  onCloseModal()
  onOpenModal(e)
}

function onDelete(e) {

  if (allListOrder.length === 1) {
    const btnSubOrder = currentModal.querySelector('.btnSub');
    btnSubOrder.setAttribute("disabled", "true");
  }

  let updateBasket = allListOrder.filter((el) => (
    el.id !== e.target.id
  ));

  allListOrder = updateBasket;
  updateStateBasket();

  printQuantity()

  //remove element
  e.target.closest('.item-delete').remove()

  //update Sum
  const updateSum = updateBasket.reduce(function(acc,el) {
    acc += el.count;
    return acc
  },0);

  const tableRowSum = currentModal.querySelector('.basket-table .sum #sum');
  tableRowSum.value = updateSum;
}

















