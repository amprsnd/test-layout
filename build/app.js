(()=>{const e=200,t=500,n=document.querySelector(".main-menu"),u=document.querySelectorAll(".main-menu > ul > li"),s=document.querySelectorAll(".main-menu > ul > li > a"),o=document.querySelectorAll(".main-submenu a");let i=[];function a(n){let u=this.getAttribute("data-index"),s="mouseleave"===n.type?t:e;clearTimeout(i[u]),"touchstart"===n.type&&(d(),c(this),n.stopPropagation()),i[u]=setTimeout(()=>{"mousemove"===n.type&&c(this),"mouseleave"===n.type&&l(this)},s)}function c(e){e.classList.add("selected"),e.querySelector(".main-submenu").classList.add("visible")}function l(e){e.classList.remove("selected"),e.querySelector(".main-submenu").classList.remove("visible")}function d(){document.querySelectorAll(".main-menu .selected").forEach(e=>{l(e)})}u.forEach((e,t)=>{e.addEventListener("mousemove",a),e.addEventListener("mouseleave",a),e.addEventListener("touchstart",a),e.setAttribute("data-index",t)}),s.forEach(e=>{e.addEventListener("touchstart",e=>e.preventDefault())}),o.forEach(e=>{e.addEventListener("click",d)}),document.body.addEventListener("click",e=>{e.path.includes(n)||d()}),document.body.addEventListener("keyup",e=>{27===e.keyCode&&d()})})();