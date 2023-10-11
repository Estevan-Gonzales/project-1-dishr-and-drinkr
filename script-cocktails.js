
var ingredientListOneEl = document.getElementById('ingredient-list-one');
var ingredientListTwoEl = document.getElementById('ingredient-list-two');
var ingredientListThreeEl = document.getElementById('ingredient-list-three');
var buttonSearchEl = document.getElementById('btn-search');

var drinkListEl = document.getElementById('drink-list');

var drinkDetailsEl = document.getElementById('drink-details');

function populateIngredientsLists() {
    var requestUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list';
    localStorage.clear();
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for(i = 0; i < data.drinks.length; i++) {
            localStorage.setItem(i, data.drinks[i].strIngredient1);
            var listItemOne = document.createElement('option');
            listItemOne.textContent = data.drinks[i].strIngredient1;
            ingredientListOneEl.appendChild(listItemOne);
            var listItemTwo = document.createElement('option');
            listItemTwo.textContent = data.drinks[i].strIngredient1;
            ingredientListTwoEl.appendChild(listItemTwo);
            var listItemThree = document.createElement('option');
            listItemThree.textContent = data.drinks[i].strIngredient1;
            ingredientListThreeEl.appendChild(listItemThree);
        }
    });
}

function getCocktails(event) {

    event.preventDefault();

    drinkListEl.innerHTML = "";
    drinkDetailsEl.innerHTML = "";

    var baseUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i='

    var ingredientOne = ingredientListOneEl.value;
    var ingredientTwo = ingredientListTwoEl.value;
    var ingredientThree = ingredientListThreeEl.value;

    requestUrl = baseUrl + ingredientOne

    if (ingredientTwo !== "No Selection") {
        requestUrl += ("," + ingredientTwo);
    }
    if (ingredientThree !== "No Selection") {
        requestUrl += ("," + ingredientThree);
    }

    requestUrl = requestUrl.split(' ').join('_');

    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        if (!data) {
            var listItem = document.createElement('div');
            listItem.textContent = "Sorry, no drinks found :("
            drinkListEl.append(listItem);
        } else {
            for(i = 0; i < data.drinks.length; i++) {
                //localStorage.setItem(i, data.drinks[i].strdrink);
                var listItem = document.createElement('div');
                //listItem.textContent = data.drinks[i].strdrink;
                listItem.textContent = data.drinks[i].strDrink;
                drinkListEl.addEventListener('click', retrievedrinkDetails);
                localStorage.setItem(data.drinks[i].strDrink, data.drinks[i].idDrink)
                drinkListEl.appendChild(listItem);
                listItem.style.fontSize = "30px";
                listItem.style.textDecoration = "underline";
                listItem.style.marginTop = "25px";    
                listItem.style.fontFamily = "Cormorant Garamond";
                
            }
        }
    });
}

function retrievedrinkDetails(event) {

    drinkDetailsEl.innerHTML = "";
    var drinkId = localStorage.getItem(event.srcElement.textContent);

    requestUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + drinkId;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var unorderedList = document.createElement('ul');

        for (i = 1; i < 21; i++) {
            var parameter = "strIngredient" + i;
            var listItem = document.createElement('li');
            listItem.textContent = data.drinks[0][parameter];
            unorderedList.append(listItem);
        }

        drinkDetailsEl.append(unorderedList);



        var listItem = document.createElement('div');

        listItem.textContent = data.drinks[0].strInstructions;
        console.log(data);

        drinkDetailsEl.appendChild(listItem);

        listItem.style.backgroundColor = "black";  
        listItem.style.fontSize = "20px";
        listItem.style.flexWrap = "wrap";
        unorderedList.style.fontSize = "20px";
        unorderedList.style.backgroundColor = "black";
        unorderedList.style.marginBottom = "50px";
        unorderedList.style.marginTop = "25px";
        unorderedList.style.textAlign = "center";
    })
};

populateIngredientsLists();

buttonSearchEl.addEventListener('click', getCocktails);



