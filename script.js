window.onload = function () {
    console.log('Hello');
    document.addEventListener('scroll', onScroll);
    addMenuClickHandler();
    slider();
    activationOfPhoneScreens();
    activationTagsOfPortfolio();
    highlightingPortfolioImg();
    modalWindowInsteadOfSubmit();
}

const addMenuClickHandler = () => {
    document.querySelector('.menu').addEventListener('click', (e) => {
        if (e.target.classList.contains('e')) {
            let clickedItem = e.target;
            removeSelectedItems();
            selectClickedItem(clickedItem);
        }
    })
}

const removeSelectedItems = () => {
    let menuItems = document.querySelectorAll('.menu .e');
    menuItems.forEach(item => {
        item.classList.remove('menu_selected');
        item.classList.add('menu__item');
    })
}

const selectClickedItem = (clickedItem) => {
    clickedItem.classList.remove('menu__item');
    clickedItem.classList.add('menu_selected');
}

// onScroll event

document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const curPos = window.scrollY;

    document.querySelectorAll('section').forEach(el => {
        // console.log(el.getAttribute('id'));
        // el.getAttribute('id');

        if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
            document.querySelectorAll('.menu a').forEach((a) => {
                a.classList.remove('menu_selected');
                a.classList.add('menu__item');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.remove('menu__item');
                    a.classList.add('menu_selected');
                }
            })
        }
    });
}

const slider = () => {
    //slider
    let items = document.querySelectorAll('.slider .slide');
    let currentItem = 0;
    //задержка анимации, чтобы не нажималось, пока идёт слайд
    let isEnabled = true;

    function changeCurrentItem(n) {
        currentItem = (n + items.length) % items.length;
    }

    function hideItem(direction) {
        isEnabled = false;
        items[currentItem].classList.add(direction);
        items[currentItem].addEventListener('animationend',function() {
            this.classList.remove('slide-active', direction);
        });
    }

    function showItem (direction) {
        items[currentItem].classList.add('next', direction);
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('next', direction);
            this.classList.add('slide-active');
            isEnabled = true;
        })
    }

    function previousItem(n) {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left');
    }

    function nextItem (n) {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
    }

    document.querySelector('.slider__control_left').addEventListener('click', function () {
        if(isEnabled) {
            previousItem(currentItem);
        }
    })

    document.querySelector('.slider__control_right').addEventListener('click', function () {
        if(isEnabled) {
            nextItem(currentItem);
        }
    })

}

//screen-Off

function activationOfPhoneScreens() {    
    let i = 0;
    let j = 0;

    document.querySelector('.slider__vertical-phone').addEventListener('click', () => {
        let verticalScreen = document.querySelector('.vertical-screen-off');
        if(i === 0) {
            verticalScreen.style = 'display: block';
            i++;
        } else {
            verticalScreen.style = 'display: none';
            i--;
        }
    });

    document.querySelector('.slider__horizontal-phone').addEventListener('click', () => {
        let horizontalScreen = document.querySelector('.horizontal-screen-off');
        if(j === 0) {
            horizontalScreen.style = 'display: block';
            j++;
        } else {
            horizontalScreen.style = 'display: none';
            j--;
        }
    });    
}

// portfolio

//active tags

function activationTagsOfPortfolio() {
    document.querySelector('.portfolio__tags').addEventListener('click', (e) => {
        let selectedTag = e.target.closest('a');

        //if(selectedTag.nameTag = 'SPAN')
        if(selectedTag.classList.contains('tag--bordered')) {
            filterPortfolioImg();
        };
        if(selectedTag.classList.contains('tag')) {
            removeSelectedPortfolioTag();
            addSelectedPortfolioTag(selectedTag);
        }
    })
}

function removeSelectedPortfolioTag() {
    let portfolioTags = document.querySelectorAll('.portfolio__tags .tag--selected');
    portfolioTags.forEach((portfolioTag) => {
        portfolioTag.classList.remove('tag--selected');
        portfolioTag.classList.add('tag--bordered')
    });
}

function addSelectedPortfolioTag(selectedTag) {
    selectedTag.classList.add('tag--selected');
    selectedTag.classList.remove('tag--bordered');
}

function filterPortfolioImg() {
    let portfolioImgs = document.querySelector('.portfolio__img');
    console.log(portfolioImgs);
    let firstImg = portfolioImgs.children[0];
    portfolioImgs.append(firstImg);
}

//highlighting images

function highlightingPortfolioImg() {
    document.querySelector('.portfolio__img').addEventListener('click', (e) => {
        
        let selectedImg = e.target;
        removeHighlightingPortfolioImg();
        if (selectedImg.tagName == 'IMG') {
            console.log('IMG');
            addHighlightingPortfolioImg(selectedImg);
        }
        });
}

function removeHighlightingPortfolioImg() {
    document.querySelectorAll('.portfolio__img img').forEach((portfolioImg) => {
        portfolioImg.classList.remove('highlighting-img');
    })
}

function addHighlightingPortfolioImg(selectedImg) {
    selectedImg.classList.add('highlighting-img');
}

//opening a modal window instead of an action submit

function modalWindowInsteadOfSubmit() {
    let form = document.querySelector('.get-a-quote form');
    form.onsubmit = () => { return false };
    form.addEventListener('click', (e) => {
        if (form.checkValidity() & e.target.classList.contains('button')) {
            addInformationInModalAndShowModal();
            hideModalTimerId();
        }
    })
   hideModal();
}

function addInformationInModalAndShowModal() {
    let modalSubject = document.querySelector('.modal_subject');
    let formSubject = document.querySelector('.form_subject');
    let modalDescription = document.querySelector('.modal_description');
    let formDescription = document.querySelector('.form_description');
    if (formDescription.value === '') {
        formDescription.value = 'Без описания';
    }
    if (formSubject.value === '') {
        formSubject.value = 'Без темы';
    }
    modalSubject.innerHTML = '<b>Subject: </b>' + formSubject.value; 
    modalDescription.innerHTML = '<b>Description: </b>' + formDescription.value.substring(0, 45);
    let modal = document.querySelector('.modal');
    modal.style = 'display:block';
    
}


function hideModal() {
    let modal_btn = document.querySelector('.modal_btn');
    let modal = document.querySelector('.modal');
    modal.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal_btn')) {
            modal.style = 'display:none';
            modal_btn.innerText = '10 Ok';
            document.querySelector('.get-a-quote form').reset();
        }
    })
}


function hideModalTimerId() {
    let modal_btn = document.querySelector('.modal_btn');
    let modal = document.querySelector('.modal');
    let sec = parseInt(modal_btn.innerText);
   
    let timer = setInterval(function() {
        if (--sec > 0) {
            modal_btn.innerText = sec + ' Ok';
        } else {
            modal.style = 'display:none';
        }
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        modal_btn.innerText = '10 Ok';
        document.querySelector('.get-a-quote form').reset();
    }, 10000); 
}

