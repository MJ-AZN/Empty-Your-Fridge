const selectedRecipe = document.querySelector(".selectedRecipeContainer");
const selectedRecipeFullInfo = document.querySelector(".selectedRecipeFullInfo");

function getMealId() {
    const mealLocal = localStorage.getItem("clickedMeal");
    const extractMealLocal = JSON.parse(mealLocal);
    const mealId = extractMealLocal[0].idMeal;
    console.log(mealId);

    var requestUrl = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealId;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const ingredientsPortion = [];
            for (let i = 1; i <= 20; i++) {
                const measure = data.meals[0]["strMeasure" + i];
                const ingredient = data.meals[0]["strIngredient" + i];

                if (measure && ingredient) {
                    ingredientsPortion.push({ amount: measure, ingredient });
                }
            }

            const filteredArray = ingredientsPortion.filter((value) => {
                return value.amount !== "" && value.ingredient !== "";
            });

            const finalFilteredIngredientArray = [];
            for (var i = 0; i < filteredArray.length; i++) {
                const amountTo = filteredArray[i].amount;
                const ingredientTo = filteredArray[i].ingredient;
                const displayBoth = (" ") + amountTo + (" ") + ingredientTo;
                console.log(displayBoth);
                finalFilteredIngredientArray.push(displayBoth);
            }
            console.log(finalFilteredIngredientArray);

            fetchEdamam(data.meals[0].strMeal, finalFilteredIngredientArray);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}

function createNutrientElement(label, quantity, unit) {
    const nutrientElement = document.createElement("li");
    nutrientElement.textContent = `${label} = ${quantity} ${unit}`;
    selectedRecipeFullInfo.append(nutrientElement);
}

function fetchEdamam(mealName, finalFilteredIngredientArray) {
    const edamamApiEndpoint = "https://api.edamam.com/api/nutrition-details?app_id=429109a1&app_key=397cd538930a1d66e3a85414ec06ce71";

    fetch(edamamApiEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "title": mealName,
            "ingr": finalFilteredIngredientArray,
            "yield": "1"
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            createNutrientElement("Calories", data.calories, "");
            createNutrientElement("Cautions", data.cautions, "");
            createNutrientElement("Dish Type", data.dishType, "");
            createNutrientElement("List of Ingredients", finalFilteredIngredientArray, "");

            // Iterate over the totalNutrients object and create elements dynamically
            for (const key in data.totalNutrients) {
                createNutrientElement(data.totalNutrients[key].label, data.totalNutrients[key].quantity, data.totalNutrients[key].unit);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });

    const clickedMealHeader = document.createElement("header");
    clickedMealHeader.textContent = mealName;
    selectedRecipeFullInfo.append(clickedMealHeader);
}

getMealId();
