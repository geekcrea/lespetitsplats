const filterInputWithFor = (inputValue, array) => {
    if (inputValue === '') {
        return array;
    }

    const recipesFiltering = [];
    const searchText = inputValue.toUpperCase();

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let matchFound = false;

        // Filtrage par nom
        if (element.name.toUpperCase().includes(searchText)) {
            matchFound = true;
        }

        // Filtrage par description
        if (element.description.toUpperCase().includes(searchText)) {
            matchFound = true;
        }

        // Filtrage par ingrédients
        for (let j = 0; j < element.ingredients.length; j++) {
            const ingredientName = element.ingredients[j].ingredient.toUpperCase();
            if (ingredientName.includes(searchText)) {
                matchFound = true;
                break;
            }
        }

        if (matchFound) {
            recipesFiltering.push(element);
        }
    }

    return recipesFiltering;
};

export default (optionList, array, inputValue) => {
    console.log(array);

    // Filtrer d'abord par texte
    let recipesFilteredCurrent = filterInputWithFor(inputValue, array);
    console.log(recipesFilteredCurrent);

    if (optionList.length === 0) {
        return recipesFilteredCurrent;
    }

    let recipesFiltered = [];
    let alreadyInTheArray = [];

    for (let i = 0; i < optionList.length; i++) {
        const option = optionList[i].toUpperCase();

        for (let j = 0; j < recipesFilteredCurrent.length; j++) {
            const element = recipesFilteredCurrent[j];
            const { appliance, ustensils, ingredients } = element;

            // Filtrage par appliance
            if (option === appliance.toUpperCase() && !alreadyInTheArray.includes(element.name)) {
                recipesFiltered.push(element);
                alreadyInTheArray.push(element.name);
                continue;
            }

            // Filtrage par ustensiles
            for (let k = 0; k < ustensils.length; k++) {
                if (option === ustensils[k].toUpperCase() && !alreadyInTheArray.includes(element.name)) {
                    recipesFiltered.push(element);
                    alreadyInTheArray.push(element.name);
                    break;
                }
            }

            // Filtrage par ingrédients
            for (let l = 0; l < ingredients.length; l++) {
                if (option === ingredients[l].ingredient.toUpperCase() && !alreadyInTheArray.includes(element.name)) {
                    recipesFiltered.push(element);
                    alreadyInTheArray.push(element.name);
                    break;
                }
            }
        }

        recipesFilteredCurrent = recipesFiltered;
    }

    return recipesFiltered;
};