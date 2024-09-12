import createElement from '../utils/createElement.js';

//  DOM selectors //
const recipesSection = document.querySelector('#recipesSection');
const template = document.querySelector('#article');
const recipesNumber = document.querySelector('#recipesNumber');

// reciepe rendering//
const renderRecipe = (recipe) => {
    // Clone the template //
    const clone = template.content.cloneNode(true);

    // Select clone elements//
    const elTime = clone.querySelector('#recipeTime');
    const elTitle = clone.querySelector('#recipeTitle');
    const elImage = clone.querySelector('#recipeImage');
    const elDescription = clone.querySelector('#recipeDescription');
    const elList = clone.querySelector('#ingredientsList');

    // Definition of attributes and content//
    const pathImage = `./assets/recettes/${recipe.image}`;
    elTime.textContent = `${recipe.time} min`;
    elTitle.textContent = recipe.name;
    elImage.setAttribute('src', pathImage);
    elImage.setAttribute('alt', recipe.name);
    elDescription.textContent = recipe.description;

    // Add  ingredients to the list //
    recipe.ingredients.forEach((item) => {
        const elLi = document.createElement('li');
        const ingredientTitle = createElement(
            'h5',
            'font-semibold text-sm',
            item.ingredient
        );

        elLi.appendChild(ingredientTitle);

        if (item.quantity) {
            const spanQuantity = createElement(
                'span',
                'text-neutral-500',
                `${item.quantity} ${item.unit ?? ''}`
            );
            spanQuantity.setAttribute('aria-label', 'quantité');
            elLi.appendChild(spanQuantity);
        }

        elList.appendChild(elLi);
    });

    return clone;
};

// Main  function to show receipes//
export default (data, value, index) => {
    // Reinitialise receipe secton //
    recipesSection.innerHTML = '';
    recipesNumber.textContent = `${data.length} recette${data.length > 1 ? 's' : ''}`;

    // Handle error messages //
    let error = document.querySelector('#error');
    error?.remove();

    if (data.length === 0) {
        error = createElement(
            'p',
            'text-xl font-bold text-center',
            `Aucune recette ne contient "${value}". Vous pouvez chercher « tarte aux pommes », « poisson », etc.`,
            'error'
        );
        recipesSection.after(error);
    } else {
        data.slice(0, index).forEach((element) => {
            const recipeElement = renderRecipe(element);
            recipesSection.appendChild(recipeElement);
        });
    }
};