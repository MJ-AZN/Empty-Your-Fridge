
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
            const displayBoth = amountTo + (" ") + ingredientTo;
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
            })
            .catch(function (error) {
                console.error('Error:', error);
                
            });
            
        }
    });
}
    getMealId();
