'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');
  // console.log('Wyświetl argument event: ', event); //test button

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE]  add class 'active' to the clicked link */
  // console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  // zapisanq wartość atrybutu href klikniętego linka
  const articleSelector = clickedElement.getAttribute('href');
  // console.log('atrybut href linku: ', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // console.log('artykuł: ', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

//-------------------Generowanie listy tytułów-------------------

const optArticleSelector = '.post', // pojendynczy artykuł
  optTitleSelector = '.post-title', // tytuł pojeynczego artykułu
  optTitleListSelector = '.titles', // lista ul linków lewa kolumna
  optArticleTagsSelector = '.post-tags .list', // lista ul  tagów poszczególnych artykułów
  optArticleAuthorSelector = '.post-author', // autot w artykule
  optTagsListSelector = '.tags .list'; // lista tagów w prawej kolumnie

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ' ';

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  // console.log('customSelector:', customSelector);
  // console.log('optArticleSelector: ', optArticleSelector);

  /*  [DONE] for each article */
  let html = '';
  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    // console.log('article id: ', articleId);

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*  get the title from the title element */
    /* [DONE] create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    // console.log('generowany link: ', linkHTML);
    /* [DONE] insert link into titleList */
    // titleList.innerHTML = titleList.innerHTML + linkHTML; // mnirj wydajne

    // const linkList = document.querySelector(optTitleListSelector);
    // linkList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    // console.log(html);
  }
  titleList.innerHTML = html;
}

generateTitleLinks();
const links = document.querySelectorAll('.titles a');
// console.log('stała links: ', links);

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

//-------------------Przypisanie tagów do artykułów-------------------

function generateTags() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('artykuły: ', articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    // console.log('tag-wrapper: ', titleList);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('article-tag: ', articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log('tablica tagów: ', articleTagsArray)

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      // console.log('pojedynczy tag:', tag);
      /* [DONE] generate HTML of the link */
      const linkTag = '<li><a href="#' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + linkTag;

      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
  }
}
generateTags();

//-------------------Dodajemy akcję po kliknięciu w tag a artykule-------------------

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log('atrybut href: ', href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* [] remove class active */
    activeLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* [DONE] add class active */
    tagLink.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* [DONE] find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  // console.log('linki: ', links);

  /* [] START LOOP: for each link */
  for (let link of links) {
    // console.log('link: ', link);
    /* [] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* [] END LOOP: for each link */
  }
}

addClickListenersToTags();

//-------------------Dodajemy akcję po kliknięciu w tag a artykule-------------------

function generateAuthors() {
  /* [DONE] find all authors */
  const authors = document.querySelectorAll(optArticleAuthorSelector);
  // console.log('autorzy', authors);

  /* [DONE] START LOOP: for every author: */
  for (let author of authors) {
    // console.log('author: ', author);
    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get authors from data-tags attribute */
    const authorWrapper = author.getAttribute('data-author');
    // console.log('autor: ', authorWrapper);

    /* [DONE] generate HTML of the link */
    const authorHTML = `<a href="#author-${author}"> ${author}</a>`;
    /* add generated code to html variable */
    html = html + authorHTML;

    /* [DONE] insert HTML of all the links into the tags wrapper */
    authors.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
  }
}
generateAuthors();

function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log('atrybut href: ', href);

  /* [DONE] make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* [DONE] find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */
  for (let activeLink of activeLinks) {
    /* [] remove class active */
    activeLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* [DONE] add class active */
    authorLink.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */ // tu szukam tego co stworzyłem w generate Authors??
  const links = document.querySelector('.post-author a');
  console.log('linki: ', links);

  /* [] START LOOP: for each link */
  for (let link of links) {
    /* [] add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* [] END LOOP: for each link */
  }
}
addClickListenersToAuthors();
