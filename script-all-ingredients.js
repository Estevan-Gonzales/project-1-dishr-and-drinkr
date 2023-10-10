var baseUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

requestUrl = baseUrl;

var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');



function getApi() {
    localStorage.clear();
  // replace `octocat` with anyone else's GitHub username
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for(i = 0; i < data.meals.length; i++) {
            localStorage.setItem(i, data.meals[i].strIngredient);
            var listItem = document.createElement('li');
            listItem.textContent = data.meals[i].strIngredient;
            repoList.appendChild(listItem);
    
        }
    });
}

fetchButton.addEventListener('click', getApi);


ingredients = []

for (i = 0; i < localStorage.length; i++) {
    ingredients.push(localStorage[i]);
}
