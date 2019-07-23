(() => {
  const menuShowTimeout = 200;
  const menuHideTimeout = 500;

  const mainMenu = document.querySelector('.main-menu')
  const menuItems = document.querySelectorAll('.main-menu > ul > li')
  const menuLinks = document.querySelectorAll('.main-menu > ul > li > a')
  const submenuLinks = document.querySelectorAll('.main-submenu a')
  let menuTimeouts = []

  // Add submenu show/hide events
  menuItems.forEach((item, i) => {
    item.addEventListener('mousemove', showHideSubmenu)
    item.addEventListener('mouseleave', showHideSubmenu)
    item.addEventListener('touchstart', showHideSubmenu)
    item.setAttribute('data-index', i)
  })

  menuLinks.forEach(item => {
    item.addEventListener('touchstart', (e) => e.preventDefault())
  })

  // Add submenu hide events for submenu links
  submenuLinks.forEach(item => {
    item.addEventListener('click', hideAllSubmenu)
  })

  // Hide all submenus by klick outside
  document.body.addEventListener('click', (e) => {
    if (!e.path.includes(mainMenu)) {
      hideAllSubmenu()
    }
  })

  // Hide all submenus by ESC key
  document.body.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) {
      hideAllSubmenu()
    }
  })

  function showHideSubmenu (e) {
    let index = this.getAttribute('data-index')
    let timeout = e.type === 'mouseleave' ? menuHideTimeout : menuShowTimeout

    clearTimeout(menuTimeouts[index])

    if (e.type === 'touchstart') {
      hideAllSubmenu()
      showSubmenu(this)
      e.stopPropagation()
    }

    menuTimeouts[index] = setTimeout(() => {
      if (e.type === 'mousemove') {
        showSubmenu(this)
      }
      if (e.type === 'mouseleave') {
        hideSubmenu(this)
      }
    }, timeout)
  }

  function showSubmenu (el) {
    el.classList.add('selected')
    el.querySelector('.main-submenu').classList.add('visible')
  }

  function hideSubmenu (el) {
    el.classList.remove('selected')
    el.querySelector('.main-submenu').classList.remove('visible')
  }

  function hideAllSubmenu () {
    document.querySelectorAll('.main-menu .selected').forEach(item => {
      hideSubmenu(item)
    })
  }

})()