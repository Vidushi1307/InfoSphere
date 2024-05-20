const container = document.querySelector(".container");
const optionsContainer=document.querySelector(".options-container");
const country="in";
const options=  ["General","Business","Sports","Science","Health","Technology","Entertainment"];

let requestURL;

const generateUI=(articles)=>{
    for(let item of articles){
        let card=document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML=`<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
            ${item.description||item.content||""}
            </div>
            <a href="${item.url}" target="_blank"
            class="view-button"> Read More</a>
        </div>`
        ;
        container.appendChild(card);
    }

};
const getNews=async()=>{
    container.innerHTML="";
    let response = await fetch(requestURL);
    if(!response.ok)
    {
        alert("Facing issue at the moment. Plase try again later");
        return false;
    }
    let data=await response.json();
    generateUI(data.articles);
};

const selectCategory = (e,category)=>{
    let Opt =document.querySelectorAll(".option");
    Opt.forEach((element) => {
        element.classList.remove("active");
    });
    requestURL=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
};
const init=()=>{
    optionsContainer.innerHTML="";
    getNews();
    createOptions();
};

const createOptions=()=>{
    for(let i of options){
        optionsContainer.innerHTML+=`<button
        class="option ${
            i=="General"? "active":""
        }" onclick="selectCategory(event,'${i}')">
        ${i}</button>`;
    }
};
window.onload=()=> {
    requestURL=`https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
};
