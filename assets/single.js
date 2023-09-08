var selectedRecipeContainer = document.querySelector(".selectedRecipeContainer");
var selectedRecipeFullInfo = document.querySelector(".selectedRecipeFullInfo");
var edamamUrl = 'https://api.edamam.com/api/nutrition-details'


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

            const filteredIngredientArray = ingredientsPortion.filter((value) => {
                return value !== "" && value !== undefined && value !== null;
            }
            );

        })
    console.log(filteredIngredientArray);
    console.log(ingredientsPortion);
}





//TURN AMOUNT + INGR INTO AN ARRAY OF STRINGS
// ["2 cups ingredient", "1 cup ingredient", etc]

//for (let i = 0; i < ingredientsPortion.length; i++) {
   // ingredientsPortion[i]
    //TAKE THE VALUE OF AMOUNT AND TAKE THE VALUE OF INGREDIENT
    //CONCAT VALUES 
    //TURN THEM INTO A STRING
    //PUT THEM INTO NEW ARRAY
//}
//getMealId();


//MAKE FETCH CALL TO EDAMAM WITH THE MEAL TITLE, INGR
function fetchEdamam() {

const mealNameLocal = localStorage.getItem("clickedMeal", "strMeal");
const extractMealNameLocal = JSON.parse(mealNameLocal);
const mealName = extractMealNameLocal[0]['strMeal'];
console.log(mealName);
}

/*
fetch(edamamUrl, {
Method: 'POST',
Headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json'
},
Body: {
    "title": mealName, //need title of dish as a string -- THE MEAL THAT WAS CLICKED ON
    "ingr": thecombinedmeasurementsandingredientsarray, //need qty of ingredients to be an array of strings
    "yield": "1" //need number of servings as a string //default as 1

},
Cache: 'default'
})
}

fetchEdamam();



/*
---ONCE WE RECEIVE FETCH RESPONSE: LOAD THE NUTRITION ON THE PAGE

dishInfo.createElement("li");
dishInfo.textContent = calories, total fat, saturated fat, trans fat, cholesterol, sodium, total carbs, dietary fiber, total sugars, includes added sugars, protein, vitamin D, calcium, iron, potassium

currentObject.calories. //displays: calories
currentObject.fat.quantity.units
*/