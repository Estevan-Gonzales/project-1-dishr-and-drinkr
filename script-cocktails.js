
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

        if (data.drinks == "None Found") {
            var listItem = document.createElement('div');
            listItem.textContent = "Sorry, no drinks found. Try another search."
            drinkListEl.append(listItem);
            listItem.style.fontSize = "25px";
        } else {
            for (i = 0; i < data.drinks.length; i++) {
                var drinkName = data.drinks[i].strDrink;
                var wordsOfDrinkName = drinkName.split(" ");
                console.log(wordsOfDrinkName);
                for (var j = 0; j < wordsOfDrinkName.length; j++) {
                    wordsOfDrinkName[j] = wordsOfDrinkName[j][0].toUpperCase() + wordsOfDrinkName[j].substr(1);
                }
                drinkName = wordsOfDrinkName.join(" ");
                //localStorage.setItem(i, data.drinks[i].strdrink);
                var listItem = document.createElement('div');
                //listItem.textContent = data.drinks[i].strdrink;
                listItem.textContent = drinkName;
                drinkListEl.addEventListener('click', retrievedrinkDetails);
                localStorage.setItem(data.drinks[i].strDrink, data.drinks[i].idDrink);
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
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var unorderedList = document.createElement('ul');

        var i = 1;
        while (i < 21) {
            var parameter = "strIngredient" + i;
            if (data.drinks == null || data.drinks[0][parameter] == null || data.drinks[0][parameter] == undefined ||data.drinks[0][parameter].trim() == "") {
                i = 30;
            }
            else {
                var parameterMeasure = "strMeasure" + i;
                var strIngredient = data.drinks[0][parameter];
                var strIngredientMeasure = data.drinks[0][parameterMeasure];
                var listItem = document.createElement('li');
                //console.log(strIngredient);
                //Capitalize the ingredients with the following algorithm
                var wordsOfDrinkName = strIngredient.split(" ");
                //console.log(wordsOfDrinkName);
                var j = 0;
                while (j < wordsOfDrinkName.length) {
                    if (wordsOfDrinkName[j][0] == undefined) {
                        j = wordsOfDrinkName.length + 10;
                    } else {
                        wordsOfDrinkName[j] = wordsOfDrinkName[j][0].toUpperCase() + wordsOfDrinkName[j].substr(1);
                        j++;
                    }
                }
                drinkName = wordsOfDrinkName.join(" ");
                listItem.textContent = i + ".) " + drinkName + " --- " + strIngredientMeasure;
                unorderedList.append(listItem);
                //console.log("While-loop finished");
                i++;
            }
        }

        if (data.drinks == null) {
            var listItem = document.createElement('div');
            listItem.textContent = "Error! The Drink Database has faulty and/or missing information. Try another recipe."
            drinkListEl.append(listItem);
            listItem.style.fontSize = "25px";
        } else {
            drinkDetailsEl.append(unorderedList);

            var listItem = document.createElement('div');

            listItem.textContent = data.drinks[0].strInstructions;

            drinkDetailsEl.appendChild(listItem);

            listItem.style.backgroundColor = "black";  
            listItem.style.fontSize = "20px";
            listItem.style.flexWrap = "wrap";
            unorderedList.style.fontSize = "20px";
            unorderedList.style.backgroundColor = "black";
            unorderedList.style.marginBottom = "50px";
            unorderedList.style.marginTop = "25px";
            unorderedList.style.textAlign = "center";
        }
    })
};

populateIngredientsLists();

buttonSearchEl.addEventListener('click', getCocktails);



