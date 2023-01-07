class Slider {
    constructor({rootSelector}) {
        this._refs = this._getRefs(rootSelector);
        this._ind = 0;
        this._bindEvents();
    }

    _getRefs(root) {
        const refs = {};
        refs.controls = document.querySelector(`.${root} .buttons-arrow`);
      refs.slides = document.querySelectorAll(`.${root} .slide-list__item`);
        return refs;
    }

    _bindEvents() {
    this._refs.controls.addEventListener(
      'click',
      this._onControlsClick.bind(this),
    );
  }

  _onControlsClick(e) {
    // e.preventDefault();

    if (e.target.nodeName === 'BUTTON') {

    if (e.target.className === 'next') {
      this._refs.slides[this._ind].style.display = 'none';
      this._ind++;
      if (this._ind >= this._refs.slides.length) {
        this._ind = 0;
      }
      
      this._refs.slides[this._ind].style.display = 'block';
    }

    if (e.target.className === 'prev') {
      this._refs.slides[this._ind].style.display = 'none';
        this._ind --;
      if (this._ind < 0) {
        this._ind = this._refs.slides.length - 1;
      }
      
      this._refs.slides[this._ind].style.display = 'block';
    }
      }
      
  }
}

const slider = new Slider({ rootSelector: 'slider-1' })
const slider2 = new Slider({ rootSelector: 'slider-2' })
const slider3 = new Slider({ rootSelector: 'slider-3' })
const slider4 = new Slider({ rootSelector: 'slider-4' })
const slider5 = new Slider({ rootSelector: 'slider-5' })
const sliderReviews = new Slider({ rootSelector: 'reviews-sl' })