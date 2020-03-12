

const infoBtns = document.getElementsByClassName("js-btnInfoToggle");

for (let i = 0; i < infoBtns.length; i++) {
  infoBtns[i].addEventListener("click", function() {
    const infoItem = this.nextElementSibling;

    

    if (infoItem.classList.contains("is-open")) {
      infoItem.classList.remove("is-open");
    }
    else {
      const isOpenInfo = document.querySelector('.is-open');
      if(isOpenInfo) {
        isOpenInfo.classList.remove('is-open');
      
      }
      
      infoItem.classList.add("is-open");
    }
   } );
}

