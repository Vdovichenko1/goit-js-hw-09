const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let d={intervalId:null,isActive:!1};e.addEventListener("click",(()=>{d.isActive&&(e.disabled=!1),e.disabled=!0,d.intervalId=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.addEventListener("click",(()=>{clearInterval(d.intervalId),e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.b2edcb81.js.map
