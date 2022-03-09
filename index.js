let form = document.querySelector("form");
let main = document.querySelector(".main");

form.addEventListener("submit", act_data);
function act_data(e) {
  e.preventDefault();
  let inp = document.querySelector("#inp").value;
  url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  fetch(url + inp)
    .then((res) => res.json())
    .then((data) => meals(data.meals))
    .catch(function error() {
      main.innerHTML = `
<h1 style="color:white">please write the correct recipe name</h1>
`;
    });
}
function meals(data) {
  console.log(data);
  main.innerHTML = "";

  data.map((e, i) => {
    var show = document.createElement("div");
    show.className = "show";

    show.innerHTML = `<div class="card to_overflow" style="width: 18rem; margin:5px 0px">
        <img src="${e.strMealThumb}" class="card-img-top scale" alt="...">
        <div class="card-body">
          <h5 class="card-title" style="margin-top:2rem">${e.strMeal}</h5>
          <p class="card-text">${e.strArea}</p>
          <a href="#" <!-- Button trigger modal -->
         `;

    var btn = document.createElement("button");
    btn.className = "btn btn-primary mt-3 seedetails_btn";
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#exampleModal");
    btn.innerText = "See details";
    show.appendChild(btn);
    btn.onclick = () => {
      var name = document.getElementById("exampleModalLabel");
      var photo = document.getElementById("photo");
      name.innerHTML = `<h5>Recipe Name: ${e.strMeal}</h5>
<a href="${e.strYoutube}"> Youtube</a>
`;
      photo.innerHTML = ` <img src="${e.strMealThumb}" class="card-img-top w-50 h-50" > 
      <a href="#"><p class="card-text">Recipe Country : ${e.strArea}</p></a>
      <p class="py-3">${e.strInstructions}</p>
     `;
    };

    main.appendChild(show);
  });
}
