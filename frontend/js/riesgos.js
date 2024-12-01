const menuToggle = document.querySelector('.menu__toggle');
const menuLista = document.querySelector('.menu__lista');

menuToggle.addEventListener('click', () => {
    menuLista.classList.toggle('menu__lista--abierta');
});

// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         document.body.classList.add('scrolled');
//     } else {
//         document.body.classList.remove('scrolled');
//     }
// });
