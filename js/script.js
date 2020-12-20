/* eslint-disable no-inner-declarations */
'use strict';
{
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
        authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
        authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
    };
    const opt = {
        articleSelector: '.post',
        titleSelector: '.post-title',
        titleListSelector: '.titles',
        articleTagsSelector: '.post-tags .list',
        articleAuthorsSelector: '.post-author',
        tagsListSelector: '.list.tags',
        authorsListSelector: '.list.authors',
        cloudClassCount: '6',
        cloudClassPrefix: 'tag-size-'
    };
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        //console.log('Link was clicked!');
        //console.log(event);


        /* [Done] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /* [Done] add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        //console.log('clickedElement (with plus): ' + clickedElement);
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
    };

    const generateTitleLinks = function (customSelector = '') {
        const articles = document.querySelectorAll(opt.articleSelector + customSelector);
        const titleList = document.querySelector(opt.titleListSelector);
        /* clear contents of titleList */
        titleList.innerHTML = '';
        /* for each article */
        let html = titleList.innerHTML;
        for (let article of articles) {
            /* get the article id */
            const articleId = article.getAttribute('id');
            /* find the title element, get the title from the title element */
            let articleTitle = article.querySelector(opt.titleSelector).innerHTML;
            /* create HTML of the link */
            const linkHTMLData = { id: articleId, title: articleTitle };
            const linkHTML = templates.articleLink(linkHTMLData);
            /* insert link into titleList */
            html = html + linkHTML;
        }
        titleList.innerHTML = html;
        //console.log(html);

        const links = document.querySelectorAll('.titles a');
        //console.log(links);
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    };
    generateTitleLinks();
    const calculateTagsParams = function (tags) {
        const params = { min: 99999, max: 0 };
        for (let tag in tags) {
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }
        return params;
    };
    const calculateTagClass = function (count, params) {
        const normalizedCount = count - params.min;
        console.log(normalizedCount);
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        console.log(percentage);
        const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
        return opt.cloudClassPrefix + classNumber;
    };
    const generateTags = function () {
        /*create a new variable allTags with an empty object */
        let allTags = {};
        /* find all articles */
        const articles = document.querySelectorAll(opt.articleSelector);
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find tags wrapper */
            const tagWrapper = article.querySelector(opt.articleTagsSelector);
            /* make html variable with empty string */
            let html = '';
            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');
            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                /* generate HTML of the link */
                const linkHTMLData = { id: tag, title: tag };
                const linkHTML = templates.tagLink(linkHTMLData);
                /* add generated code to html variable */
                html = linkHTML + ' ' + html;
                /* check if this link is NOT already in allTags */
                if (!allTags[tag]) {
                    /* add tag to allTags object*/
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
                /* insert HTML of all the links into the tags wrapper */
                tagWrapper.innerHTML = html;
            }
        }
        /* find list of tags in right column */
        const tagList = document.querySelector(opt.tagsListSelector);
        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams);
        /* create variable for all links HTML code */
        const allTagsData = { tags: [] };
        /* START LOOP: for each tag in allTags: */
        for (let tag in allTags) {
            /* generate code of a link and add it to allTagsHTML */
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams)
            });
        }
        /* add HTML from allTagsHTML to tagList */
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
    };
    generateTags();
    const tagClickHandler = function (event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
        /* START LOOP: for each active tag link */
        for (let tagLinkActive of tagLinksActive) {
            /* remove class active */
            tagLinkActive.classList.remove('active');
            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for (let tagLink of tagLinks) {
            /* add class active */
            tagLink.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    };
    const addClickListenersToTags = function () {
        /* find all links to tags */
        const tagLinks = document.querySelectorAll('[href^="#tag-"]');
        /* START LOOP: for each link */
        for (let tagLink of tagLinks) {
            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    };

    addClickListenersToTags();

    const generateAuthors = function () {
        const articles = document.querySelectorAll(opt.articleSelector);
        let allAuthors = {};
        for (let article of articles) {
            const articleAuthor = article.getAttribute('data-author');
            const authorWrapper = article.querySelector(opt.articleAuthorsSelector);
            const linkHTMLData = { id: articleAuthor, title: articleAuthor };
            const linkHTML = templates.authorLink(linkHTMLData);
            if (!allAuthors[articleAuthor]) {
                allAuthors[articleAuthor] = 1;
            } else {
                allAuthors[articleAuthor]++;
            }
            authorWrapper.innerHTML = 'by ' + linkHTML;
        }
        console.log(allAuthors);
        const allAuthorsData = {authors: []};
        const authorList = document.querySelector(opt.authorsListSelector);
        for (let author in allAuthors) {
            allAuthorsData.authors.push({
                author: author,
                count: allAuthors[author],
            });
        }
        authorList.innerHTML = templates.authorListLink(allAuthorsData);
    };
    generateAuthors();

    const authorClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const author = href.replace('#author-', '');
        const authorLinksActive = document.querySelectorAll('a.active[href^="#author-"]');
        for (let authorLinkActive of authorLinksActive) {
            authorLinkActive.classList.remove('active');
        }
        const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
        for (let authorLink of authorLinks) {
            authorLink.classList.add('active');
        }
        generateTitleLinks('[data-author="' + author + '"]');
    };
    const addClickListenersToAuthors = function () {
        const authorLinks = document.querySelectorAll('[href^="#author-"]');
        for (let authorLink of authorLinks) {
            authorLink.addEventListener('click', authorClickHandler);
        }
    };
    addClickListenersToAuthors();
}