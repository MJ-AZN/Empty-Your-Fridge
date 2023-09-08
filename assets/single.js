var selectedRecipeContainer = document.querySelector(".selectedRecipeContainer");
var selectedRecipeFullInfo = document.querySelector(".selectedRecipeFullInfo");
//?i=52818

//SHOW MEAL NAME ON SECOND PAGE
function showMealTitle () { // HOW CAN WE GET THIS TO SHOW ONLY strMeal ??
const clickedMealHeader = document.createElement("header");
clickedMealHeader.textContent = localStorage.getItem("clickedMeal", "strMeal")
selectedRecipeContainer.append(clickedMealHeader);
}
showMealTitle();


//GET MEAL ID, MAKE FETCH CALL TO THE MEAL API WITH THE MEAL ID, GET ING & MEASUREMENT
function getMealId () {
    const mealLocal = localStorage.getItem("clickedMeal","idMeal");
    const extractMealLocal = JSON.parse(mealLocal);
    const mealId = extractMealLocal[0]['idMeal'];
    console.log(mealId);


    var requestUrl = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealId;

    fetch (requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        console.log(data)
        const ingredientsPortion = [];
        for (let i = 0; i < 20; i++) {
            const portions = {amount: data.meals[0]["strMeasure" + i], ingredient: data.meals[0]["strIngredient" + i]}

            ingredientsPortion.push(portions);

            /*if ("strMeasure" === undefined && "strIngredient" === undefined) {
                //REMOVE ROM ARRAY
            }

            if ("strMeasure" === "" && "strIngredient" === "") {
                //REMOVE FROM ARRAY
            }
            
            if ("strMeasure" === null && "strIngredient" === null) {
                //REMOVE FROM ARRAY
            }
            */
        }
        console.log(ingredientsPortion);
    })
}
getMealId();





/*
---MAKE FETCH CALL TO EDAMAM WITH THE MEAL TITLE, INGR
fetch(requestUrl, {
Method: 'POST',
Headers: {
Accept: 'application.json',
'Content-Type': 'application/json'
},
Body: {
"title": selectedMeal, //need title of dish as a string -- THE MEAL THAT WAS CLICKED ON
"ingr": thecombinedmeasurementsandingredientsarray, //need qty of ingredients to be an array of strings -- array is IngredientStack
"yield": "1" //need number of servings as a string //default as 1

}
Cache: 'default'
})
}

---MONCE WE RECEIVE FETCH RESPONSE: LOAD THE NUTRITION ON THE PAGE

dishInfo.createElement("li");
dishInfo.textContent = calories, total fat, saturated fat, trans fat, cholesterol, sodium, total carbs, dietary fiber, total sugars, includes added sugars, protein, vitamin D, calcium, iron, potassium

currentObject.calories. //displays: calories
currentObject.fat.quantity.units
*/