/**
const filterOptions = {
    text: '',
    ingredients: [],
    ustensils: [],
    appareils: [],
}

function eventClickAddIngredient(event) {
    const value = event.target
    filterOptions.ingredients.push(value)
    filtreRecipes(recipes)
}

function eventClickRemoveIngredient(event) {
    const value = event.target
    filterOptions.ingredients.remove(value)
    filtreRecipes(recipes)
}

function eventClickAppareil(event) {
    const value = event.target
    filterOptions.appareils.push(value)
    filtreRecipes(recipes)
}


function filtreRecipes(array) {
    const recipesFiltering = array.filter((element) => {
        let isCandidate = true
        if (filterOptions.text.length > 0) {
            if (!element.name.toUpperCase().includes(filterOptions.text)) {
                isCandidate = false;
            }

            if (element.description.toUpperCase().includes(filterOptions.text)) {
                isCandidate = false;
            }
        }
        
        filterOptions.ingredients.forEach((ingredient) => {
            if (!element.ingredients.includes(ingredient)) {
                isCandidate = false;
            }
        })


        return isCandidate

    });
    return recipesFiltering;
}
**/

const filterInput = (inputValue, array) => {
    if (inputValue === '') {
        return array;
    }

    const recipesFiltering = array.filter((element) => {
        if (element.name.toUpperCase().includes(inputValue)) {
            return true;
        }

        if (element.description.toUpperCase().includes(inputValue)) {
            return true;
        }

        return element.ingredients.some((ingredient) => {
            const ingredientName = ingredient.ingredient.toUpperCase();
            return ingredientName.includes(inputValue);
        });
    });
    return recipesFiltering;
};

export default (optionList, array, inputValue) => {
    let arrayFiltered = filterInput(inputValue, array);

    if (optionList.length === 0) {
        return arrayFiltered;
    }

    let inTheArray = [];
    let recipesFiltered = []; 

    for (const option of optionList) {
        recipesFiltered = [];
        inTheArray = [];
        arrayFiltered.forEach((element) => {
            const { appliance, ustensils, ingredients } = element;

            if (option.includes(appliance.toUpperCase())) {
                if (!inTheArray.includes(element.name)) {
                    recipesFiltered.push(element);
                    inTheArray.push(element.name);
                }
            } else if (
                ustensils.some((ustensil) => option.includes(ustensil.toUpperCase()))
            ) {
                if (!inTheArray.includes(element.name)) {
                    recipesFiltered.push(element);
                    inTheArray.push(element.name);
                }
            } else {
                ingredients.forEach((ingredient) => {
                    const ingredientName = ingredient.ingredient.toUpperCase();

                    if (option.includes(ingredientName)) {
                        if (!inTheArray.includes(element.name)) {
                            recipesFiltered.push(element);
                            inTheArray.push(element.name);
                        }
                    }
                });
            }
            arrayFiltered = [...recipesFiltered];
        }); 
        
    }
    return recipesFiltered;
};
