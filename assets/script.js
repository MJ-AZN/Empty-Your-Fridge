

//Global variables
const ingredientList = document.querySelector(".ingredientListContainer");
const recipeList = document.querySelector(".recipeListContainer");
const searchIngredientsForm = document.getElementById("searchIngredients");
const ingredientSearchInput = document.getElementById("ingredientSearchInput");
const buttonEl = document.querySelector(".searchBtn");
var ingredientStack = [];

function search(event){
    event.preventDefault();
    const userInput = ingredientSearchInput.value;
    const userList = document.createElement("li"); // how will it know where to create the element?
    userList.textContent = `${userInput}`;

    ingredientList.append(userList);

    /* if (userInput != API ingredient){
        change the bullet point to RED
    } 
    else{
    ingredientStack.append(userInput);
    
    
    }
    */
    ingredientSearchInput.value = "";
}
/*

1.click event function
we need a function that targets the event listener for the search bar
preventdefault
erase what was previously inputted when clicking the search button
when users click the search button
captures input field data from the user

2. renderdivs function for ingredients
fetch data from API --
if the user input matches ingredient from the API, the ingredient will be listed
if the user input does not match an ingredient from the API, the ingredient will not be listed and alert(Please try another search)
create element-from the input, the unordered list of ingredients generate below
the listed ingredient will have: a remove button

MAYBE click event function
we need a function that targets the event listener for the search recipe button
when users click the search recipe button
captures list of ingredients, feeds this data into next renderdivs function

renderdivs function for recipes
fetch data from API - on recipe name, ingredient list, 
fetch data from the other API - nutritional fact
create element-an unordered list of recipes will generate on the right side
what the element looks like-the recipe will display if they include the ingredients the user inputed, dropdown function for recipes
where the element goes

click event function
user clicks on the generated recipe/picture of recipe
upon click, the recipe will have a dropdown displaying: ingredient list, nutritional facts

Processes
an eventlistener for the search ingredient click event
*/

buttonEl.addEventListener("click", search)

// an eventlistener for the search recipe click event
// an eventlistener for the click recipe event-dropdown