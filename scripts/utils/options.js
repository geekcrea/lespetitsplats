const optionsFilter = (array) => {
    const appliance = [];
    let ustensils = [];
    const ingredients = [];

    array.forEach((recipe) => {
        // Ajouter l'appareil s'il n'existe pas déjà dans la liste
        if (!appliance.includes(recipe.appliance)) {
            appliance.push(recipe.appliance);
        }

        // Utiliser concat pour ajouter les ustensiles et filtrer les doublons
        ustensils = ustensils.concat(
            recipe.ustensils.filter(ustensil => !ustensils.includes(ustensil))
        );

        // Utiliser forEach pour parcourir les ingrédients
        recipe.ingredients.forEach((ingredient) => {
            const ingredientName = ingredient.ingredient;
            if (!ingredients.includes(ingredientName)) {
                ingredients.push(ingredientName);
            }
        });
    });

    return [appliance, ustensils, ingredients];
};

const filterBySearchOption = (array, value) => {
    const updateOptions = array.filter((element) =>
        element.toUpperCase().includes(value),
    );
    return updateOptions;
};

export { optionsFilter, filterBySearchOption };