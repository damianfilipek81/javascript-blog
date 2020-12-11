'use strict';
{
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
        const articleSelector = clickedElement.getAttribute('href');

        /* [Done] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);

        /* [Done] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }


    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';


    const generateTitleLinks = function () {
        const articles = document.querySelectorAll(optArticleSelector);
        const titleList = document.querySelector(optTitleListSelector);
        /* for each article */
        let html = titleList.innerHTML;
        for (let article of articles) {
            /* get the article id */
            const articleId = article.getAttribute('id');
            /* find the title element, get the title from the title element */
            let articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'
            /* insert link into titleList */
            html = html + linkHTML;
        }
        titleList.innerHTML = html;
        console.log(html);

        const links = document.querySelectorAll('.titles a');
        console.log(links);
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }
    generateTitleLinks();

}