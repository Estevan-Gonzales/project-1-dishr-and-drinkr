
var ingredientListOneEl = document.getElementById('ingredient-list-one');
var ingredientListTwoEl = document.getElementById('ingredient-list-two');
var ingredientListThreeEl = document.getElementById('ingredient-list-three');
var buttonSearchEl = document.getElementById('btn-search');

var mealListEl = document.getElementById('meal-list');

var mealDetailsEl = document.getElementById('meal-details')

function populateIngredientsLists() {
    var requestUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
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
            var listItemOne = document.createElement('option');
            listItemOne.textContent = data.meals[i].strIngredient;
            ingredientListOneEl.appendChild(listItemOne);
            var listItemTwo = document.createElement('option');
            listItemTwo.textContent = data.meals[i].strIngredient;
            ingredientListTwoEl.appendChild(listItemTwo);
            var listItemThree = document.createElement('option');
            listItemThree.textContent = data.meals[i].strIngredient;
            ingredientListThreeEl.appendChild(listItemThree);
        }
    });
}

function getMeals(event) {

    event.preventDefault();
    var baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='

    var ingredientOne = ingredientListOneEl.value;

    requestUrl = baseUrl + ingredientOne;

    //localStorage.clear();
  // replace `octocat` with anyone else's GitHub username
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        if (data.meals.length == 0) {
            var listItem = document.createElement('div');
            listItem.textContent = "Sorry, no meals found :("
            mealListEl.append(listItem);
        }

        for(i = 0; i < data.meals.length; i++) {
            //localStorage.setItem(i, data.meals[i].strMeal);
            var listItem = document.createElement('div');
            //listItem.textContent = data.meals[i].strMeal;
            listItem.textContent = data.meals[i].strMeal;
            mealListEl.addEventListener('click', retrieveMealDetails);
            localStorage.setItem(data.meals[i].strMeal, data.meals[i].idMeal)
            mealListEl.appendChild(listItem);
    
        }
    });
}

function retrieveMealDetails(event) {
    console.log(localStorage.getItem(event.srcElement.textContent));
    mealDetailsEl.textContent = localStorage.getItem(event.srcElement.textContent);
}

populateIngredientsLists();

buttonSearchEl.addEventListener('click', getMeals);