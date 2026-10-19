const tabs = document.querySelectorAll(".tab");



tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      
        tabs.forEach(t => t.classList.remove("active"));
        
        tab.classList.add("active");
    });
});


const contentpage = document.querySelector('.content');
const showcontent = document.querySelector('#tab1');
const content = document.querySelector('.con');
const showcontent2 = document.querySelector('#tab2');
const showcontent3 = document.querySelector('#tab3');
const showcontent4 = document.querySelector('#tab4');



showcontent.addEventListener('click', () => {
    showcontent.classList.add('active');

    contentpage.classList.add('tab1');

    content.textContent = "Tab1";
})

showcontent2.addEventListener('click', () => {
    showcontent.classList.add('active');

    contentpage.classList.add('tab2');

    content.textContent = "Tab2";
})

showcontent3.addEventListener('click', () => {
    showcontent.classList.add('active');

    contentpage.classList.add('tab3');

    content.textContent = "Tab3";
})

showcontent4.addEventListener('click', () => {
    showcontent.classList.add('active');

    contentpage.classList.add('tab4');

    content.textContent = "Tab4";
})

