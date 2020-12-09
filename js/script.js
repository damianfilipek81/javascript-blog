'use strict';

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);


    /* [Done] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    /* [Done] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement (with plus): ' + clickedElement);
    /* [Done] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* [Done] get 'href' attribute from the clicked link */
    const articleAttribute = clickedElement.getAttribute('href');

    /* [Done] find the correct article using the selector (value of 'href' attribute) */
    const findArticle = document.querySelector(articleAttribute);

    /* [Done] add class 'active' to the correct article */
    findArticle.classList.add('active');
}
const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}