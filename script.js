window.onload = function () {
    console.log('Hello');

    addMenuClickHandler();
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