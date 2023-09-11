var selectedRecipeContainer = document.querySelector(".selectedRecipeContainer");
var selectedRecipeFullInfo = document.querySelector(".selectedRecipeFullInfo");


//SHOW MEAL NAME ON SECOND PAGE
function showMealTitle() { // HOW CAN WE GET THIS TO SHOW ONLY strMeal ??
    const clickedMealHeader = document.createElement("header");
    clickedMealHeader.textContent = localStorage.getItem("clickedMeal", "strMeal")
    selectedRecipeContainer.append(clickedMealHeader);
}
showMealTitle();


//GET MEAL ID, MAKE FETCH CALL TO THE MEAL API WITH THE MEAL ID, GET ING & MEASUREMENT
function getMealId() {
    const mealLocal = localStorage.getItem("clickedMeal", "idMeal");
    const extractMealLocal = JSON.parse(mealLocal);
    const mealId = extractMealLocal[0]['idMeal'];
    console.log(mealId);


    var requestUrl = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealId;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            const ingredientsPortion = [];
            for (let i = 0; i < 20; i++) {
                const portions = { amount: data.meals[0]["strMeasure" + i], ingredient: data.meals[0]["strIngredient" + i] }
                ingredientsPortion.push(portions);
            }

            const filteredArray = ingredientsPortion.filter((value) => {
                // Include only non-empty strings and defined values
                return value.amount !== "" && value.ingredient !== "" && value.amount !== undefined && value.ingredient !== undefined && value.amount !== null && value.ingredient !== null;
            });
            console.log(filteredArray);


            const finalFilteredIngredientArray = [];
            for (var i = 0; i < filteredArray.length; i++) {
                const amountTo = filteredArray[i].amount;
                const ingredientTo = filteredArray[i].ingredient;
                const displayBoth = (amountTo) + (" ") + (ingredientTo);
                //console.log(displayBoth);
                //console.log(typeof displayBoth);
                finalFilteredIngredientArray.push(displayBoth);
            }
            console.log(finalFilteredIngredientArray);



            const mealNameLocal = localStorage.getItem("clickedMeal", "strMeal");
            const extractMealNameLocal = JSON.parse(mealNameLocal);
            const mealName = extractMealNameLocal[0]['strMeal'];
            console.log(mealName);
            const requestUrlEdamam = 'https://api.edamam.com/api/nutrition-details?app_id=429109a1&app_key=397cd538930a1d66e3a85414ec06ce71';
        
        
            fetch(requestUrlEdamam, {
                Method: 'POST',
                Headers: {
                    'Accept': 'application.json',
                    'Content-Type': 'application/json'
                },
                Body: JSON.stringify ({
                    "title": mealName, //need title of dish as a string -- THE MEAL THAT WAS CLICKED ON
                    "ingr": finalFilteredIngredientArray, //need qty of ingredients to be an array of strings
                    "yield": "1" //need number of servings as a string //default as 1
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                })
                .catch(function (error) {
                    console.error('Error:', error);
                })
                
                ;

        })

}

getMealId();





/*
---ONCE WE RECEIVE FETCH RESPONSE: LOAD THE NUTRITION ON THE PAGE

dishInfo.createElement("li");
dishInfo.textContent = calories, total fat, saturated fat, trans fat, cholesterol, sodium, total carbs, dietary fiber, total sugars, includes added sugars, protein, vitamin D, calcium, iron, potassium

currentObject.calories. //displays: calories
currentObject.fat.quantity.units
*/
