!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire9d3f;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){r[e]=t},t.parcelRequire9d3f=o),o.register("iE7OH",(function(t,n){var r,o;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var l={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)l[t[n]]=e[t[n]]},o=function(e){var t=l[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o.register("aNJCr",(function(t,n){var r;e(t.exports,"getBundleURL",(function(){return r}),(function(e){return r=e}));var o={};function l(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var t=o[e];return t||(t=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return l(e[2])}return"/"}(),o[e]=t),t}})),o("iE7OH").register(JSON.parse('{"EVgbq":"index.e8ca828f.js","kxKJ3":"symbol-defs.a2a889bd.svg","1XaNB":"index.7e9258e4.css"}'));class l{constructor({rootSelector:e}){this._refs=this._getRefs(e),this._ind=0,this._bindEvents()}_getRefs(e){const t={};return t.controls=document.querySelector(`.${e} .buttons-arrow`),t.slides=document.querySelectorAll(`.${e} .slide-list__item`),t}_bindEvents(){this._refs.controls.addEventListener("click",this._onControlsClick.bind(this))}_onControlsClick(e){e.preventDefault(),"BUTTON"===e.target.nodeName&&("next"===e.target.className&&(this._refs.slides[this._ind].style.display="none",this._ind++,this._ind>=this._refs.slides.length&&(this._ind=0),this._refs.slides[this._ind].style.display="block"),"prev"===e.target.className&&(this._refs.slides[this._ind].style.display="none",this._ind--,this._ind<0&&(this._ind=this._refs.slides.length-1),this._refs.slides[this._ind].style.display="block"))}}new l({rootSelector:"slider-1"}),new l({rootSelector:"slider-2"}),new l({rootSelector:"slider-3"}),new l({rootSelector:"slider-4"}),new l({rootSelector:"slider-5"}),new l({rootSelector:"reviews-sl"});const i=document.querySelector(".modal"),s=document.querySelector(".modal__body"),c=document.querySelectorAll(".btn-order"),a=document.querySelector('[data-action="open-basket"]'),u=a.querySelector(".basket-quantity");let d,m,f,b,g,y=[],p={},v=!1;!function(){try{const e=localStorage.getItem("myBasket"),t=JSON.parse(e);null!==t&&0!==t?.length&&(y=t,E())}catch(e){return console.log(e),!1}}();const h=["a","button","input","textarea","[tabindex]"],S=h.map((e=>e.concat(":not(.modal *)"))),q=document.querySelectorAll(S.toString());function E(){const e=y.reduce((function(e,t){return e+=t.number}),0);u.textContent=e}function _(e){if(e.preventDefault(),d=e.target,"btn-order"===e.target.className){b=e.target.dataset.art;const t=e.target.closest(".description"),n=function(e){const t=e.querySelectorAll(".desc-size"),n=[];return t.forEach((e=>n.push(e.textContent))),n}(t),r=function(e){const t=e.querySelector(".desc-color").textContent.trim();return t.replace(/колір|[\.:]/gi,"").trim().split(/\s*,\s*/)}(t);g=function(e){const t=e.querySelector(".actual").textContent.trim();return t.replace(/грн|[\s]/g,"")}(t);const o=function(e,t,n,r){const o=t.map((e=>`<label><input type="radio" name="color" value="${e}"/>${e}</label>`)).join(""),l=n.map((e=>`<label><input type="radio" name="size" value="${e}"/>${e}</label>`)).join(""),i=`<h2 id="dialog1_label" class="modal-label">\n              Ви хочете замовити модель №${e}\n            </h2>\n            <fieldset form="form1">\n              <legend>Оберіть колір:</legend>\n              ${o}\n            </fieldset>\n\n            <fieldset form="form1">\n              <legend>Оберіть розмір:</legend>\n              ${l}\n            </fieldset>\n\n            <fieldset form="form1">\n              <legend>Вкажіть кількість:</legend>\n              <label>\n                Вкажіть кількість:\n                <input\n                  type="number"\n                  min="0"\n                  max="10"\n                  step="1"\n                  value="1"\n                  name="number"\n                  class="number-amount"\n                />\n              </label>\n            </fieldset>\n\n            <fieldset form="form1">\n              <legend>Вартість:</legend>\n              <label>\n                Вартість:\n                <input\n                  type="number"\n                  value="${r}"\n                  name="count"\n                  class="count-sum"\n                  readonly\n                />грн\n              </label>\n            </fieldset>\n            <button type="submit" class="btnSub" data-action="add">\n              В кошик\n            </button>`;return i}(b,r,n,g),l=document.getElementById("form1");w(l),l.insertAdjacentHTML("afterbegin",o),l.querySelector('[name="color"]').checked=!0,l.querySelector('[name="size"]').checked=!0,m=i.querySelector(".modal #dialog1")}if("basket-btn"===e.target.className&&(m=i.querySelector(".modal #dialog2"),function(){const e=m.querySelector(".btnSub"),t=m.querySelector(".basket-table .sum #sum"),n=document.querySelector(".basket-table tbody");if(0===y.length)return void e.setAttribute("disabled","true");e.removeAttribute("disabled");for(;n.firstChild;)n.removeChild(n.firstChild);const r=function(e){const t=new URL(T);let n=0;const r=e.map((e=>{const{articul:r,color:o,size:l,number:i,id:s,count:c}=e;return n+=c,`<tr id="${r}" class="item-delete">\n              <td class="col1-row1">\n                <label\n                  ><input\n                    type="text"\n                    name="articul"\n                    id="articul"\n                    value="${r}"\n                    readonly\n                /></label>\n              </td>\n              <td class="col2-row2">\n                <label\n                  ><input type="text" name="color" id="color" value="${o}" readonly\n                /></label>\n              </td>\n              <td class="col3-row3">\n                <label\n                  ><input type="text" name="size" id="size" value="${l}" readonly\n                /></label>\n              </td>\n              <td class="col4-row4 num">\n                <label\n                  ><input type="text" name="number" id="number" value="${i}" readonly\n                /></label>\n              </td>\n              <td class="col5-row5 num-sum">\n                <label\n                  ><input type="text" name="count" id="count" value="${c}" readonly\n                /></label>\n              </td>\n              <td class="col6-row6">\n                <button\n                  type="button"\n                  class="btn-delete"\n                  data-action="delete"\n                  id="${s}"\n                >\n                  <svg class="btn-delete__icon">\n            <use\n              href="${t}#icon-basket-delete"\n            ></use>\n          </svg>\n                </button>\n              </td>\n            </tr>`})).join("");return{itemList:r,i:n}}(y);n.insertAdjacentHTML("afterbegin",r.itemList),t.value=r.i,e.addEventListener("click",O,{once:!0});n.querySelectorAll(".btn-delete").forEach((e=>{e.addEventListener("click",z,{once:!0})}))}()),"continue"===e.target.dataset.action){const e=(new Date).toLocaleString().replace(/[\s,\.:]/g,(e=>","==e?"&":""));m=i.querySelector(".modal #dialog3"),m.querySelector("#form3").reset(),f=m.querySelector(".text-order"),f.textContent=`Замовлення №${e} на суму ${p.sum}!`}let t;i.classList.add("is-open"),m.classList.remove("hidden"),v=!0;for(let e=0;e<q.length;e++)t=q[e],t.setAttribute("tabindex","-1");const n=m.querySelector(".js-order-form");"dialog2"!==m.id&&n.addEventListener("submit",$);const r=m.querySelector('[data-action="close-modal"]');if("form1"===n.id){n.querySelector(".number-amount").addEventListener("change",A)}window.addEventListener("keydown",L),r.addEventListener("click",k),s.addEventListener("click",x),function(){const e=m.querySelectorAll(h.toString()),t=e[0],n=e[e.length-1],r=9;setTimeout((function(){e[1].focus()}),1e3),m.addEventListener("keydown",o),v||m.removeEventListener("keydown",o);function o(e){const o="Tab"===e.code||e.keyCode===r;o&&(e.shiftKey?document.activeElement===t&&(n.focus(),e.preventDefault()):o&&document.activeElement===n&&(t.focus(),e.preventDefault()))}}()}function w(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function k(){let e;for(let t=0;t<q.length;t++)e=q[t],e.setAttribute("tabindex","0");const t=m.querySelector(".js-order-form"),n=m.querySelector('[data-action="close-modal"]');"form2"!==t.id&&t.removeEventListener("submit",$),window.removeEventListener("keydown",L),i.classList.remove("is-open"),s.removeEventListener("click",x),n.removeEventListener("click",k),m.classList.add("hidden"),v=!1,d.focus()}function x(e){e.currentTarget===e.target&&k()}function L(e){"Escape"===e.code&&k()}function $(e){e.preventDefault();const t=new FormData(e.currentTarget);"form1"===e.currentTarget.id&&t.append("articul",b);let n={};if(t.forEach(((e,t)=>{n[t]="number"===t||"sum"===t||"count"===t?Number(e):e})),"form1"===e.currentTarget.id){e.currentTarget.querySelector(".number-amount").removeEventListener("change",A),function(e,t){const n=e.findIndex((e=>e.articul===t.articul&&e.color===t.color&&e.size===t.size));-1===n?e.push(t):(e[n].number+=t.number,e[n].count+=t.count)}(y,n),N(),E()}if("form3"===e.currentTarget.id){const e=(new Date).toLocaleString().replace(/[\s,\.:]/g,(e=>","==e?"-":""));(()=>(p.id=e,p.customer=n,p))();encodeURI(C(p));console.log("telegram",C(p)),y=[],N(),E();w(document.querySelector(".basket-table tbody"));document.querySelector(".basket-table .sum #sum").value="0"}e.currentTarget.reset(),k()}function C(e){let t="",n="";const r=`<strong> Order №: ${e.id}</strong>`;for(let t in e.customer)n+=`${t}: ${e.customer[t]}\n`;e.order.map((e=>`\n<i>Артикул №:</i> <b>${e.articul}</b>\n<b>Колір:</b> ${e.color}\n<b>Розмір:</b> ${e.size}\n<b>Кількість:</b> ${e.number} шт.\n<em>Вартість:</em> ${e.count} грн`)).forEach((e=>{t+=e+"\n"}));const o=`<b>Загальна сума замовлення: ${e.sum} грн.</b>`;return r+"\n*******\n"+n+t+o+"\n*******"}function A(e){m.querySelector(".count-sum").value=g*e.target.value}function N(){try{localStorage.setItem("myBasket",JSON.stringify(y))}catch(e){return console.log(e),!1}}c.forEach((e=>{e.addEventListener("click",_)})),a.addEventListener("click",_);var T={};function O(e){e.preventDefault();let t={},n=[];p={order:n};const r=e.target.closest("#form2").querySelectorAll("input, textarea");for(let e=0;e<r.length;++e){const o=r[e],l=o.name,i=o.value;"sum"!==l?(t[l]&&(n.push(t),t={}),t[l]="number"===l||"count"===l?Number(i):i):p[l]=Number(i)}n.push(t),k(),_(e)}function z(e){if(1===y.length){m.querySelector(".btnSub").setAttribute("disabled","true")}let t=y.filter((t=>t.id!==e.target.id));y=t,N(),E(),e.target.closest(".item-delete").remove();const n=t.reduce((function(e,t){return e+=t.count}),0);m.querySelector(".basket-table .sum #sum").value=n}T=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("kxKJ3")}();
//# sourceMappingURL=index.e8ca828f.js.map
