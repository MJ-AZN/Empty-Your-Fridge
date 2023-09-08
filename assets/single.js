var selectedRecipeContainer = document.querySelector(".selectedRecipeContainer");
var selectedRecipeFullInfo = document.querySelector(".selectedRecipeFullInfo");

// Show meal title on the second page
function showMealTitle() {
  const mealNameLocal = localStorage.getItem("clickedMeal");
  const extractMealNameLocal = JSON.parse(mealNameLocal);
  const mealName = extractMealNameLocal[0].strMeal; // Get strMeal property
  const clickedMealHeader = document.createElement("header");
  clickedMealHeader.textContent = mealName;
  selectedRecipeContainer.append(clickedMealHeader);
}
showMealTitle();

// Get meal ID and fetch detailed meal information
function getMealId() {
  const mealLocal = localStorage.getItem("clickedMeal");
  const extractMealLocal = JSON.parse(mealLocal);
  const mealId = extractMealLocal[0].idMeal; // Get idMeal property
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

        // Check if both measure and ingredient are defined and not empty
        if (measure && ingredient) {
          ingredientsPortion.push({ amount: measure, ingredient });
        }
      }

      // Filter the array to remove empty and undefined values
      const filteredArray = ingredientsPortion.filter((value) => {
        return value.amount !== "" && value.ingredient !== "";
      });

      console.log(filteredArray);

      // Call a function here to handle the Edamam API fetch with filteredArray
      fetchEdamam(data.meals[0].strMeal, filteredArray);
    });
}

getMealId();

// Make fetch call to Edamam with meal title and ingredients
function fetchEdamam(mealTitle, ingredients) {
//     const validIngredients = ingredients
//   .filter((ingredient) => typeof ingredient === 'string' && ingredient.trim() !== '')
//   .map((ingredient) => ingredient.trim());
  
  const edamamApiEndpoint = "https://api.edamam.com/api/nutrition-details?app_id=429109a1&app_key=397cd538930a1d66e3a85414ec06ce71";
  const edamamApiKey = "397cd538930a1d66e3a85414ec06ce71";

    const mealNameLocal = localStorage.getItem("clickedMeal", "strMeal");
    const extractMealNameLocal = JSON.parse(mealNameLocal);
    const mealName = extractMealNameLocal[0]['strMeal'];
    console.log(mealName);

    const ingredientsArray = localStorage.getItem("ingredientsPortion.amounts")

  fetch(edamamApiEndpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "title": mealName,
      "ingr": ingredients,
      "yield": "1"
    })
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Handle the Edamam API response here and display nutrition information on the page
    // You can create DOM elements to display the nutrition data, similar to how you did for the meal title
    console.log(data);
    // Create DOM elements and display nutrition information
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}