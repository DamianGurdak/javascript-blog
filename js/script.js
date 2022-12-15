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

  /* [IN PRGRESS] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

//-------------------Generowanie listy tytułów-------------------

const optArticleSelector = '.post', // pojendynczy artykuł
  optTitleSelector = '.post-title', // tytuł pojeynczego artykułu
  optTitleListSelector = '.titles', // lista ul linków lewa kolumna
  articles = document.querySelectorAll(optArticleSelector),
  optArticleTagsSelector = '.post-tags .list'; // lista ul  tagów poszczególnych artykułów

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ' ';

  /* for each article */
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    // console.log('article id: ', articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    // console.log('generowany link: ', linkHTML);
    /* insert link into titleList */
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
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('artykuły: ', articles);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    // console.log('tag-wrapper: ', titleList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('article-tag: ', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log('tablica tagów: ', articleTagsArray)

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      // console.log('pojedynczy tag:', tag);
      /* generate HTML of the link */
      const linkTag = '<li><a href="#' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + linkTag;

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    /* END LOOP: for every article: */
  }
  
}

generateTags();
