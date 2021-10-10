import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_URLS, MAX_SLIDE } from '../config';

const Landing = () => {
  const sliderRef = useRef(null);
  const dotsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  let startPositionX;
  let timer;

  // 只要currentSlide一更新就重設interval且更新dot
  useEffect(() => {
    timer = setInterval(() => {
      onBtnRightClick();
    }, 3000);

    activateDot(currentSlide);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);

  const getPostionX = e => {
    // 滑鼠事件
    if (e.type.includes('mouse')) {
      return e.nativeEvent.clientX;
    } else {
      // e.touches[0]?.clientX 只有onTouchStart有, onTouchEnd要用e.changedTouches[0].clientX, 且其e.touches[0]為undefined
      return e.touches[0]?.clientX || e.changedTouches[0].clientX;
    }
  };

  const touchStart = function (e) {
    startPositionX = getPostionX(e);
  };

  const touchEnd = e => {
    // 若起點=0或是undefined(初始)則返回
    if (!startPositionX) return;

    const endPositionX = getPostionX(e);
    const distance = startPositionX - endPositionX;
    // console.log(distance);

    // 起點至終點的距離大於100px以上觸發滑動carousel
    if (distance > 100) {
      onBtnRightClick();
    } else if (distance < -100) {
      onBtnLeftClick();
    }
    startPositionX = 0;
  };

  const renderSlide = () => {
    return IMAGE_URLS.map((img, i) => {
      return (
        <div
          onTouchStart={touchStart}
          onMouseDown={touchStart}
          onTouchEnd={touchEnd}
          onMouseUp={touchEnd}
          onMouseLeave={touchEnd}
          key={i}
          className="slider__slide"
        >
          <img
            onDragStart={e => e.preventDefault()}
            src={img}
            alt="slide pic"
            className="slider__img"
          />
        </div>
      );
    });
  };

  const renderDots = () => {
    return IMAGE_URLS.map((_, i) => (
      <button key={i} className="btn btn--dot" data-slide={i}></button>
    ));
  };

  const goToSlide = currentSlide => {
    const allSlides = sliderRef.current.querySelectorAll('.slider__slide');
    allSlides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
    // console.log(current);
    clearInterval(timer);
    setCurrentSlide(currentSlide);
  };

  const onBtnRightClick = () => {
    let current;

    if (currentSlide === MAX_SLIDE - 1) {
      current = 0;
    } else {
      current = currentSlide + 1;
    }

    goToSlide(current);
  };

  const onBtnLeftClick = () => {
    let current;

    if (currentSlide === 0) {
      current = MAX_SLIDE - 1;
    } else {
      current = currentSlide - 1;
    }

    goToSlide(current);
  };

  const activateDot = slide => {
    // console.log(slide);
    const allDots = document.querySelectorAll('.btn--dot');
    allDots.forEach(dot => dot.classList.remove('active'));
    document
      .querySelector(`.btn--dot[data-slide="${slide}"]`)
      .classList.add('active');
  };

  const onDotsClick = e => {
    if (
      !e.target.classList.contains('btn--dot') ||
      !sliderRef.current ||
      !dotsRef.current
    )
      return;

    // 從dataset取出來的都是字串,不轉換的話會錯誤
    const slide = Number(e.target.dataset.slide);
    goToSlide(slide);
  };

  return (
    <div className="landing">
      <div ref={sliderRef} className="slider">
        {renderSlide()}
        <button
          onClick={onBtnLeftClick}
          className="btn btn--slider btn--abs-left"
        >
          <i className="fas fa-angle-left"></i>
        </button>
        <button
          onClick={onBtnRightClick}
          className="btn btn--slider btn--abs-right"
        >
          <i className="fas fa-angle-right"></i>
        </button>
        <div ref={dotsRef} onClick={onDotsClick} className="slider__dots">
          {renderDots()}
        </div>
        <div className="slider__btn-box">
          <Link to="/products" className="btn btn--rectangle btn--glass">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
