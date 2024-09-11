import recipesList from '../../data/recipes.js';



function displayStaticRecipes() {
    const recipesSection = document.getElementById('recipesSection');
    const recipeTemplate = document.getElementById('article-to-clone');

    recipesList.forEach(recipe => {
        
        const recipeClone = document.importNode(recipeTemplate.content, true);

        recipeClone.querySelector('.recipeTitle').textContent = recipe.name;
        recipeClone.querySelector('.recipeTime').textContent = recipe.time;
        recipeClone.querySelector('.recipeDescription').textContent = recipe.description;
        recipeClone.querySelector('.recipeImage').src = recipe.image;

        const ingredientsList = recipeClone.querySelector('.ingredientsList');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });

        recipesSection.appendChild(recipeClone);
        console.log(recipesSection)
    });
}

// Appel la fonction pour afficher les recettes
displayStaticRecipes();