const rowEl = document.querySelector(".row");
const newsdataFeed = document.querySelector(".newsdata-feed");
const selectEl = document.querySelector("#category");


const renderData = function(data) {
  let htmlEle = "";
  if (data.data) 
    console.log(data.data);
    data.data.forEach((newsData) => {
      htmlEle += `
      <div class="col-4 mb-4">
      <div class="card">
      <img class="card-img-top" src="${
        newsData.imageUrl
      }" alt="Card image cap">
      
      <div class="card-body">
       <div class="d-flex justify-content-between date-time">
       <p><span>${newsData.date}</span></p>
       <p><span>${newsData.time}</span></p>
       </div>
        <h5 class="card-title">${newsData.title.substring(0, 40)} ...</h5>
        <p class="card-text">${newsData.content.substring(0, 50)} ...</p>
        <a href="${newsData.url}" class="card-link">Read More</a>
      </div>
       </div>
      </div>
      `;
    });
     newsdataFeed.innerHTML = htmlEle;
}

const newsData = async function (catName) {
  try {
    const res =  await fetch(`https://inshorts.deta.dev/news?category=${catName}`);
    if(!res.ok) {
      throw new Error(`Something went wrong... Try Again${res.status}`);
     }
     const data = await res.json();
     renderData(data)
  }  catch(err) {
    htmlEle = `<h3 class="text-center">Something went wrong... Try Again ${err.message}</h3>`;
    newsdataFeed.innerHTML = htmlEle;
    console.log(`${err.message}`);
  }
  newsdataFeed.style.opacity = '1';
}


selectEl.addEventListener("change", function () {
  newsData(selectEl.value);
});

newsData("all");
