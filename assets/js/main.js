/**
 * Template Name: iPortfolio
 * Updated: Jul 27 2023 with Bootstrap v5.3.1
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-html-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    }
    return document.querySelector(el)
  }

  const typedElement = document.querySelector(".typed");
  if (typedElement) {
    const typedStrings = typedElement.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: typedStrings,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });
  }


  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Preloader
   * Hides the preloader once the entire page is loaded.
   */
  const preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll Top Button
   * Shows/hides a scroll-to-top button based on scroll position.
   */
  let scrollTop = select('.scroll-top');
  if (scrollTop) {
    const toggleScrollTop = () => {
      if (window.scrollY > 100) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    }
    window.addEventListener('load', toggleScrollTop);
    onscroll(document, toggleScrollTop);
    on('click', '.scroll-top', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Hero type effect (Typed.js)
   * This is now handled directly in index123.html to avoid conflicts.
   * Keeping this comment as a placeholder for original template structure.
   */

  /**
   * Skills animation (Purecounter)
   * Initializes the Purecounter library for animated number counting.
   */
  new PureCounter();

  /**
   * Portfolio isotope and filter
   * Initializes Isotope.js for filtering and layout of portfolio items.
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-filters li', true);

      on('click', '#portfolio-filters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate Lightbox for portfolio items (Glightbox)
   * Enables image and video lightboxes for portfolio links.
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Portfolio details slider (Swiper.js)
   * Initializes Swiper.js for the portfolio details page image slider.
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll (AOS)
   * Initializes the AOS library for scroll animations.
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * PHP Email Form Validation
   * Handles form submission and validation for the contact form.
   */
  const phpEmailForm = select('.php-email-form');
  if (phpEmailForm) {
    phpEmailForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      if (!action) {
        thisForm.querySelector('.loading').classList.add('d-none');
        thisForm.querySelector('.error-message').innerHTML = 'The form action property is not set!';
        thisForm.querySelector('.error-message').classList.remove('d-none');
        return;
      }
      thisForm.querySelector('.loading').classList.remove('d-none');
      thisForm.querySelector('.error-message').classList.add('d-none');
      thisForm.querySelector('.sent-message').classList.add('d-none');

      let formData = new FormData(thisForm);

      if (recaptcha) {
        grecaptcha.ready(function() {
          grecaptcha.execute(recaptcha, {
            action: 'php_email_form_submit'
          }).then(function(token) {
            formData.set('recaptcha-response', token);
            phpEmailFormSend(thisForm, action, formData);
          });
        });
      } else {
        phpEmailFormSend(thisForm, action, formData);
      }
    });
  }

  async function phpEmailFormSend(thisForm, action, formData) {
    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      const data = await response.json();

      if (data.status === 'success') {
        thisForm.querySelector('.loading').classList.add('d-none');
        thisForm.querySelector('.sent-message').classList.remove('d-none');
        thisForm.reset();
      } else {
        throw new Error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      thisForm.querySelector('.loading').classList.add('d-none');
      thisForm.querySelector('.error-message').innerHTML = error.message;
      thisForm.querySelector('.error-message').classList.remove('d-none');
    }
  }

})()
