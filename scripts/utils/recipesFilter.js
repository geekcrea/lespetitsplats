const filterInputFunctional = (inputValue, array) => {
    if (inputValue === '') {
        return array;
    }

    const searchText = inputValue.toUpperCase();

    return array.filter(element =>
        element.name.toUpperCase().includes(searchText) ||
        element.description.toUpperCase().includes(searchText) ||
        element.ingredients.some(ingredient => 
            ingredient.ingredient.toUpperCase().includes(searchText)
        )
    );
};

export default (optionList, array, inputValue) => {
   
    // Filtrer d'abord par texte
    let recipesFilteredCurrent = filterInputFunctional(inputValue, array);
 
    if (optionList.length === 0) {
        return recipesFilteredCurrent;
    }

    let recipesFiltered = [];
    let alreadyInTheArray = [];

    optionList.forEach(option => {
        const optionUpper = option.toUpperCase();

        recipesFilteredCurrent.forEach(element => {
            const { appliance, ustensils, ingredients } = element;

            // Filtrage par appliance
            if (appliance.toUpperCase() === optionUpper && !alreadyInTheArray.includes(element.name)) {
                recipesFiltered.push(element);
                alreadyInTheArray.push(element.name);
            }
            // Filtrage par ustensiles
            else if (ustensils.some(ustensil => ustensil.toUpperCase() === optionUpper) && !alreadyInTheArray.includes(element.name)) {
                recipesFiltered.push(element);
                alreadyInTheArray.push(element.name);
            }
            // Filtrage par ingrédients
            else if (ingredients.some(ingredient => ingredient.ingredient.toUpperCase() === optionUpper) && !alreadyInTheArray.includes(element.name)) {
                recipesFiltered.push(element);
                alreadyInTheArray.push(element.name);
            }
        });

        recipesFilteredCurrent = recipesFiltered;
    });

    return recipesFiltered;
};