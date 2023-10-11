$(function () {
    function getApi(search) {
        function printIngredient (str1, str2) {
            if (str1 != null && str1.trim() != "") {
                var wordsOfIngredient = str1.split(" ");
                for (var j = 0; j < wordsOfIngredient.length; j++) {
                    wordsOfIngredient[j] = wordsOfIngredient[j][0].toUpperCase() + wordsOfIngredient[j].substr(1);
                }
                str1 = wordsOfIngredient.join(" ");
                console.log("\nIngredient: " + str1 + ". Measurement: " + str2);
            }
        }

        function printIngredientShortcut (i) {
            printIngredient(results[i].strIngredient1, results[i].strMeasure1);
            printIngredient(results[i].strIngredient2, results[i].strMeasure2);
            printIngredient(results[i].strIngredient3, results[i].strMeasure3);
            printIngredient(results[i].strIngredient4, results[i].strMeasure4);
            printIngredient(results[i].strIngredient5, results[i].strMeasure5);
            printIngredient(results[i].strIngredient6, results[i].strMeasure6);
            printIngredient(results[i].strIngredient7, results[i].strMeasure7);
            printIngredient(results[i].strIngredient8, results[i].strMeasure8);
            printIngredient(results[i].strIngredient9, results[i].strMeasure9);
            printIngredient(results[i].strIngredient10, results[i].strMeasure10);
            printIngredient(results[i].strIngredient11, results[i].strMeasure11);
            printIngredient(results[i].strIngredient12, results[i].strMeasure12);
            printIngredient(results[i].strIngredient13, results[i].strMeasure13);
            printIngredient(results[i].strIngredient14, results[i].strMeasure14);
            printIngredient(results[i].strIngredient15, results[i].strMeasure15);
        }

        // fetch request gets a list of all the repos for the node.js organization
        if (search.trim() == "") {
            console.log("Search cannot be empty. Please try again!");
        } else {
            var requestUrl = 'https://thecocktaildb.com/api/json/v1/1/search.php?f=' + search;
            fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) { 
                console.log(data);
                results = data.drinks;
                for (var i = 0; i < results.length; i++) {
                //Code below to empty comment line is from https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
                var wordsOfDrinkName = results[i].strDrink.split(" ");
                for (var j = 0; j < wordsOfDrinkName.length; j++) {
                    wordsOfDrinkName[j] = wordsOfDrinkName[j][0].toUpperCase() + wordsOfDrinkName[j].substr(1);
                }
                drinkName = wordsOfDrinkName.join(" ");
                //
                console.log("-----------------------------------\n");
                console.log("Drink Name: " + drinkName + ".   " + results[i].strAlcoholic + "\n");
                printIngredientShortcut(i);
                
                console.log("Instructions: \n" + results[i].strInstructions);
                }
            });
        }
        

        
    }

    getApi("e");
});
  