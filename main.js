import './src/style/common.scss';
(function () {
  var footerEl = document.getElementById('footer');
  var menuStatuEl = document.getElementById('nav-menu-status');
  var navOuterEl = document.getElementById('nav-outer');
  var throttleResize;

  function init(event) {
    if (event.target.readyState !== 'complete') return;
    setFooterPosition();
  };

  function resizeHandler() {
    throttle(setFooterPosition);
  }

  function beforeunload() {
    resetMenuStatu();
  }

  function setFooterPosition() {
    if (document.documentElement.offsetHeight + footerEl.offsetHeight > document.documentElement.clientHeight) {
      footerEl.style.position = 'relative';
    } else {
      footerEl.style.position = 'fixed';
    }
  }

  function throttle(fn) {
    clearTimeout(throttleResize);
    throttleResize = setTimeout(fn, 200);
  }

  function resetMenuStatu() {
    menuStatuEl.checked = false;
  }

  document.addEventListener('readystatechange', init);
  window.addEventListener('resize', resizeHandler);
  window.addEventListener('beforeunload', beforeunload);

})();