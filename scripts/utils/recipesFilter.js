const filterInput = (inputValue, array) => {
    if (inputValue === '') {
        return array;
    }

    // Filtrage par texte (nom, description ou ingrédients)
    const recipesFiltering = array.filter((element) => {
        const searchText = inputValue.toUpperCase();
        if (element.name.toUpperCase().includes(searchText)) {
            return true;
        }

        if (element.description.toUpperCase().includes(searchText)) {
            return true;
        }

        return element.ingredients.some((ingredient) => {
            const ingredientName = ingredient.ingredient.toUpperCase();
            return ingredientName.includes(searchText);
        });
    });

    return recipesFiltering;
};

export default (optionList, array, inputValue) => {
    // Filtrer d'abord par texte
    let arrayFiltered = filterInput(inputValue, array);

    // Si aucune option de filtrage n'est sélectionnée, retourner les résultats du texte
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

            // Filtrage par appliance
            if (option.includes(appliance.toUpperCase())) {
                if (!inTheArray.includes(element.name)) {
                    recipesFiltered.push(element);
                    inTheArray.push(element.name);
                }
            }
            // Filtrage par ustensiles
            else if (ustensils.some((ustensil) => option.includes(ustensil.toUpperCase()))) {
                if (!inTheArray.includes(element.name)) {
                    recipesFiltered.push(element);
                    inTheArray.push(element.name);
                }
            }
            // Filtrage par ingrédients
            else {
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
        });

        // Réinitialiser l'arrayFiltered avec les recettes filtrées jusqu'à présent
        arrayFiltered = [...recipesFiltered];
    }

    return recipesFiltered;
};