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
            finalFilteredIngredientArray.push(displayBoth)
        }
        console.log(finalFilteredIngredientArray);
        
        fetchEdamam(data.meals[0].strMeal, filteredArray);
        
        function fetchEdamam(mealTitle, ingredients) {
            const edamamApiEndpoint = "https://api.edamam.com/api/nutrition-details?app_id=429109a1&app_key=397cd538930a1d66e3a85414ec06ce71";
            
            const mealNameLocal = localStorage.getItem("clickedMeal", "strMeal");
            const extractMealNameLocal = JSON.parse(mealNameLocal);
            const mealName = extractMealNameLocal[0]['strMeal'];
            console.log(mealName);
            console.log(finalFilteredIngredientArray)

            const ingredientsArray = [];
            
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

                const Calories = document.createElement("li");
                Calories.textContent = ("Calories - ") + data.calories
                selectedRecipeFullInfo.append(Calories);

                const cautions = document.createElement("li");
                cautions.textContent = ("Cautions - ") + (data.cautions)
                selectedRecipeFullInfo.append(cautions);

                const dishType = document.createElement("li");
                dishType.textContent = ("Dish Type - ") + data.dishType
                selectedRecipeFullInfo.append(dishType);

                const finalIngredients = document.createElement("li");
                finalIngredients.textContent = ("List of Ingredients - ") + finalFilteredIngredientArray
                selectedRecipeFullInfo.append(finalIngredients);

                //const nutritionArray = [];
                //for (var i = 0; i < data.totalNutrients.length; i++) {
                //    nutritionArray.push(data.totalNutrients[i].CA.label)
                //}

                const nutrientsTitle = document.createElement("p");
                nutrientsTitle.textContent = ("Nutrients List -")
                selectedRecipeFullInfo.append(nutrientsTitle);

                const calcium = document.createElement("li");
                calcium.textContent = data.totalNutrients.CA.label + (" = ")+ data.totalNutrients.CA.quantity + (" ") + data.totalNutrients.CA.unit
                selectedRecipeFullInfo.append(calcium);

                const iron = document.createElement("li");
                iron.textContent = data.totalNutrients.FE.label + (" = ")+ data.totalNutrients.FE.quantity + (" ") + data.totalNutrients.FE.unit
                selectedRecipeFullInfo.append(iron);

                const cholesterol = document.createElement("li");
                cholesterol.textContent = data.totalNutrients.CHOLE.label + (" = ")+ data.totalNutrients.CHOLE.quantity + (" ") + data.totalNutrients.CHOLE.unit
                selectedRecipeFullInfo.append(cholesterol);
                
                const fat1 = document.createElement("li");
                fat1.textContent = data.totalNutrients.FASAT.label + (" = ")+ data.totalNutrients.FASAT.quantity + (" ") + data.totalNutrients.FASAT.unit
                selectedRecipeFullInfo.append(fat1);

                const fat2 = document.createElement("li");
                fat2.textContent = data.totalNutrients.FATRN.label + (" = ")+ data.totalNutrients.FATRN.quantity + (" ") + data.totalNutrients.FATRN.unit
                selectedRecipeFullInfo.append(fat2);

                const fiber = document.createElement("li");
                fiber.textContent = data.totalNutrients.FIBTG.label + (" = ")+ data.totalNutrients.FIBTG.quantity + (" ") + data.totalNutrients.FIBTG.unit
                selectedRecipeFullInfo.append(fiber);

                const potassium = document.createElement("li");
                potassium.textContent = data.totalNutrients.K.label + (" = ")+ data.totalNutrients.K.quantity + (" ") + data.totalNutrients.K.unit
                selectedRecipeFullInfo.append(potassium);

                const sodium = document.createElement("li");
                sodium.textContent = data.totalNutrients.NA.label + (" = ")+ data.totalNutrients.NA.quantity + (" ") + data.totalNutrients.NA.unit
                selectedRecipeFullInfo.append(sodium);

                const protein = document.createElement("li");
                protein.textContent = data.totalNutrients.PROCNT.label + (" = ")+ data.totalNutrients.PROCNT.quantity + (" ") + data.totalNutrients.PROCNT.unit
                selectedRecipeFullInfo.append(protein);

                const sugar = document.createElement("li");
                sugar.textContent = data.totalNutrients.SUGAR.label + (" = ")+ data.totalNutrients.SUGAR.quantity + (" ") + data.totalNutrients.SUGAR.unit
                selectedRecipeFullInfo.append(sugar);

                const vitamine = document.createElement("li");
                vitamine.textContent = data.totalNutrients.TOCPHA.label + (" = ")+ data.totalNutrients.TOCPHA.quantity + (" ") + data.totalNutrients.TOCPHA.unit
                selectedRecipeFullInfo.append(vitamine);

                const vitamina = document.createElement("li");
                vitamina.textContent = data.totalNutrients.VITA_RAE.label + (" = ")+ data.totalNutrients.VITA_RAE.quantity + (" ") + data.totalNutrients.VITA_RAE.unit
                selectedRecipeFullInfo.append(vitamina);
                
                const vitaminb6 = document.createElement("li");
                vitaminb6.textContent = data.totalNutrients.VITB6A.label + (" = ")+ data.totalNutrients.VITB6A.quantity + (" ") + data.totalNutrients.VITB6A.unit
                selectedRecipeFullInfo.append(vitaminb6);

                const vitaminb12 = document.createElement("li");
                vitaminb12.textContent = data.totalNutrients.VITB12.label + (" = ")+ data.totalNutrients.VITB12.quantity + (" ") + data.totalNutrients.VITB12.unit
                selectedRecipeFullInfo.append(vitaminb12);

                const vitaminc = document.createElement("li");
                vitaminc.textContent = data.totalNutrients.VITC.label + (" = ")+ data.totalNutrients.VITC.quantity + (" ") + data.totalNutrients.VITC.unit
                selectedRecipeFullInfo.append(vitaminc);

                const vitamind = document.createElement("li");
                vitamind.textContent = data.totalNutrients.VITD.label + (" = ")+ data.totalNutrients.VITD.quantity + (" ") + data.totalNutrients.VITD.unit
                selectedRecipeFullInfo.append(vitamind);

                const vitamink = document.createElement("li");
                vitamink.textContent = data.totalNutrients.VITK1.label + (" = ")+ data.totalNutrients.VITK1.quantity + (" ") + data.totalNutrients.VITK1.unit
                selectedRecipeFullInfo.append(vitamink);

                const zinc = document.createElement("li");
                zinc.textContent = data.totalNutrients.ZN.label + (" = ")+ data.totalNutrients.ZN.quantity + (" ") + data.totalNutrients.ZN.unit
                selectedRecipeFullInfo.append(zinc);


            })
            .catch(function (error) {
                console.error('Error:', error);
                
            })
            console.log(data)
            const clickedMealHeader = document.createElement("header");
            clickedMealHeader.textContent = mealName
            selectedRecipeFullInfo.append(clickedMealHeader);
            
        }
    });
}
    





    getMealId();
