"use strict";

(function () {
  var menuShowTimeout = 200;
  var menuHideTimeout = 500;
  var mainMenu = document.querySelector('.main-menu');
  var menuItems = document.querySelectorAll('.main-menu > ul > li');
  var menuLinks = document.querySelectorAll('.main-menu > ul > li > a');
  var submenuLinks = document.querySelectorAll('.main-submenu a');
  var menuTimeouts = []; // Add submenu show/hide events

  menuItems.forEach(function (item, i) {
    item.addEventListener('mousemove', showHideSubmenu);
    item.addEventListener('mouseleave', showHideSubmenu);
    item.addEventListener('touchstart', showHideSubmenu);
    item.setAttribute('data-index', i);
  });
  menuLinks.forEach(function (item) {
    item.addEventListener('touchstart', function (e) {
      return e.preventDefault();
    });
  }); // Add submenu hide events for submenu links

  submenuLinks.forEach(function (item) {
    item.addEventListener('click', hideAllSubmenu);
  }); // Hide all submenus by klick outside

  document.body.addEventListener('click', function (e) {
    if (!e.path.includes(mainMenu)) {
      hideAllSubmenu();
    }
  }); // Hide all submenus by ESC key

  document.body.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      hideAllSubmenu();
    }
  });

  function showHideSubmenu(e) {
    var _this = this;

    var index = this.getAttribute('data-index');
    var timeout = e.type === 'mouseleave' ? menuHideTimeout : menuShowTimeout;
    clearTimeout(menuTimeouts[index]);

    if (e.type === 'touchstart') {
      hideAllSubmenu();
      showSubmenu(this);
      e.stopPropagation();
    }

    menuTimeouts[index] = setTimeout(function () {
      if (e.type === 'mousemove') {
        showSubmenu(_this);
      }

      if (e.type === 'mouseleave') {
        hideSubmenu(_this);
      }
    }, timeout);
  }

  function showSubmenu(el) {
    el.classList.add('selected');
    el.querySelector('.main-submenu').classList.add('visible');
  }

  function hideSubmenu(el) {
    el.classList.remove('selected');
    el.querySelector('.main-submenu').classList.remove('visible');
  }

  function hideAllSubmenu() {
    document.querySelectorAll('.main-menu .selected').forEach(function (item) {
      hideSubmenu(item);
    });
  }
})();