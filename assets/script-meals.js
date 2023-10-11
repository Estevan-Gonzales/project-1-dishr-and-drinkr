
var ingredientListOneEl = document.getElementById('ingredient-list-one');
var ingredientListTwoEl = document.getElementById('ingredient-list-two');
var ingredientListThreeEl = document.getElementById('ingredient-list-three');
var buttonSearchEl = document.getElementById('btn-search');

var mealListEl = document.getElementById('meal-list');

var mealDetailsEl = document.getElementById('meal-details');

function populateIngredientsLists() {
    var requestUrl = 'https://www.themealdb.com/api/json/v2/9973533/list.php?i=list';
    localStorage.clear();
  // replace `octocat` with anyone else's GitHub username
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (i = 0; i < data.meals.length; i++) {
            //localStorage.setItem(i, data.meals[i].strIngredient);
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

    mealListEl.innerHTML = "";
    mealDetailsEl.innerHTML = "";

    var baseUrl = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?i='

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


    //localStorage.clear();
  // replace `octocat` with anyone else's GitHub username
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        if (data.meals == null) {
            var listItem = document.createElement('div');
            listItem.textContent = "Sorry, no meals found. Try another search."
            mealListEl.append(listItem);
            listItem.style.fontSize = "25px";
        } else {
            for (i = 0; i < data.meals.length; i++) {
                var mealName = data.meals[i].strMeal;
                var wordsOfMealName = mealName.split(" ");
                console.log(wordsOfMealName);
                for (var j = 0; j < wordsOfMealName.length; j++) {
                    wordsOfMealName[j] = wordsOfMealName[j][0].toUpperCase() + wordsOfMealName[j].substr(1);
                }
                mealName = wordsOfMealName.join(" ");
                var listItem = document.createElement('div');
                listItem.textContent = mealName
                mealListEl.addEventListener('click', retrieveMealDetails);
                localStorage.setItem(data.meals[i].strMeal, data.meals[i].idMeal)
                mealListEl.appendChild(listItem);
                listItem.style.fontSize = "30px";
                listItem.style.textDecoration = "underline";
                listItem.style.marginTop = "25px";    
                listItem.style.fontFamily = "Cormorant Garamond";

            }
        }
    });
}

function retrieveMealDetails(event) {

    mealDetailsEl.innerHTML = "";
    var mealId = localStorage.getItem(event.srcElement.textContent);
    //mealDetailsEl.textContent = localStorage.getItem(event.srcElement.textContent);

    requestUrl = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealId;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var unorderedList = document.createElement('ul');

        var i = 1;
        while (i < 21) {
            var parameter = "strIngredient" + i;
            var strIngredient = data.meals[0][parameter];
            if (strIngredient == undefined || strIngredient.trim() == "" || strIngredient == null) {
                i = 30;
            }
            else {
                var listItem = document.createElement('li');
                console.log(strIngredient);
                //Capitalize the ingredients with the following algorithm
                var wordsOfMealName = strIngredient.split(" ");
                console.log(wordsOfMealName);
                var j = 0;
                while (j < wordsOfMealName.length) {
                    if (wordsOfMealName[j][0] == undefined) {
                        j = wordsOfMealName.length + 10;
                    } else {
                        wordsOfMealName[j] = wordsOfMealName[j][0].toUpperCase() + wordsOfMealName[j].substr(1);
                        j++;
                    }
                }
                mealName = wordsOfMealName.join(" ");
                listItem.textContent = i + ".) " + mealName;
                unorderedList.append(listItem);
                console.log("While-loop finished");
                i++;
            }
        }

        mealDetailsEl.append(unorderedList);
        
        var listItem = document.createElement('div');

        listItem.textContent = data.meals[0].strInstructions;
        console.log(data);

        mealDetailsEl.appendChild(listItem);

        listItem.style.backgroundColor = "black";  
        listItem.style.fontSize = "20px";
        listItem.style.flexWrap = "wrap";
        unorderedList.style.fontSize = "20px";
        unorderedList.style.backgroundColor = "black";
        unorderedList.style.marginBottom = "50px";
        unorderedList.style.marginTop = "25px";
        unorderedList.style.textAlign = "center";



        //listItem.textContent = data.meals[0].
    })
};

populateIngredientsLists();

buttonSearchEl.addEventListener('click', getMeals);



