const  API_KEY = "17d5994e2bb64991875e44ad76e5fe90";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=>fetchNews("India"));

async function fetchNews(query){
    
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}&sortBy=publishedAt&_=${new Date().getTime()}`);
   const data = await res.json();
   console.log(data);

   
   bindData(data.articles);
}

function bindData(articles){
    const cardcontainer = document.getElementById('cont2');
    const newscardt = document.getElementById('newscard');

    cardcontainer.innerHTML = '';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardCLone = newscardt.content.cloneNode(true);
        filldata(cardCLone,article);
        cardcontainer.appendChild(cardCLone);
    });

}

    function filldata(cardCLone,article){
        const newsimg = cardCLone.querySelector('#news-img');
        const newstitle = cardCLone.querySelector('#news-title');
        const newssource = cardCLone.querySelector('#news-source');
        const newsdesc = cardCLone.querySelector('#news-desc');

        newsimg.src = article.urlToImage;
        newstitle.innerHTML = article.title;
        newsdesc.innerHTML= article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });
        newssource.innerHTML = `${article.source.name} . ${date}`;
        cardCLone.firstElementChild.addEventListener('click', () =>{
            window.open(article.url, "_blank");
        });

    }


let currsel = null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    currsel?.classList.remove('active');
    currsel = navitem;
    currsel.classList.add('active');
}

const sb = document.getElementById('button');
const sText = document.getElementById('input')

sb.addEventListener( 'click' , () => {
    const query = sText.value;
    if(!query) return;
    fetchNews(query);
    currsel?.classList.remove('active');
    currsel= null;
}

);

function reload(){
    window.location.reload();
}

function toggleMenu(){
    const btn = document.querySelector('.menu');
    const dropdown = document.querySelector('.links');

 btn.addEventListener('click', ()=> {
        dropdown.classList.toggle('top-16');
    })
   
}

let isOpen = false; // Flag to track menu state

function toggleMenu() {
    const dropdown = document.querySelector('.links');

    if (!isOpen) {
        dropdown.classList.add('top-16');
        dropdown.classList.remove('-top-full');
        isOpen = true;
    } else {
        dropdown.classList.remove('top-16');
        dropdown.classList.add('-top-full');
        isOpen = false;
    }
}
