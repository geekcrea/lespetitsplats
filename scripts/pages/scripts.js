import recipesList from '../../data/recipes.js';
import displayRecipes from '../templates/displayRecipes.js';
import filterRecipes from '../utils/recipesFilter.js';
import { deleteWithIcon, displayCloseIcon } from '../utils/delete.js';
import { optionsFilter, filterBySearchOption } from '../utils/options.js';
import { displayOptions, forEachList, closeDivOptions, displayOptionSelected } from '../templates/displayOptions.js';

// DOM Elements //
const body = document.querySelector('body');
const searchBar = document.querySelector('#searchBar');
const closeIcon = document.querySelector('#closeIcon');
const optionElements = {
    ingredients: document.querySelector('[data-name="ingredients"]'),
    appliance: document.querySelector('[data-name="appliance"]'),
    ustensils: document.querySelector('[data-name="ustensils"]')
};

// Default values and state //
const optionSelectedList = JSON.parse(localStorage.getItem("options")) || [];
let updatedList = [...recipesList];
const initialRecipesToDisplay = 6;
let recipesNumberToDisplay = initialRecipesToDisplay;

// Initial setup //
initializeOptions();
displayRecipes(updatedList, '', recipesNumberToDisplay);
let [appliances, ustensils, ingredients] = optionsFilter(updatedList);

// Event Listeners //
function setupEventListeners() {
    body.addEventListener('click', closeDivOptions);
    searchBar.addEventListener('input', handleSearchInput);
    window.addEventListener('scroll', handleScroll);
    searchBar.addEventListener('invalid', () => searchBar.setCustomValidity('Veuillez saisir uniquement des lettres et des espaces'));
    searchBar.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') event.preventDefault();
    });
    closeIcon.addEventListener('click', handleCloseIconClick);
    setupOptionEventListeners();
}

function setupOptionEventListeners() {
    Object.keys(optionElements).forEach(optionKey => {
        const option = optionElements[optionKey];
        option.addEventListener('click', handleOptionClick);
    });
}

function handleSearchInput(event) {
    searchBar.setCustomValidity('');
    searchBar.checkValidity();
    const valueInputUpdated = event.target.value.trim().toUpperCase();
    displayCloseIcon(valueInputUpdated, closeIcon);

    if (valueInputUpdated.length >= 3 || valueInputUpdated.length === 0) {
        updateRecipeList(valueInputUpdated);
    }
}

function handleOptionClick(event) {
    const nameOption = event.currentTarget.dataset.name;
    event.stopPropagation();

    const availableOptions = getAvailableOptions(nameOption);
    const divOptions = document.querySelector(`#div-option-${nameOption}`);
    const iconChevron = document.querySelector(`#icon-${nameOption}`);
    
    toggleChevronRotation(iconChevron);

    if (divOptions) {
        divOptions.remove();
    } else {
        displayOptions(availableOptions, optionElements[nameOption], optionSelectedList);
    }

    setupOptionSearchInput();
}

function handleScroll() {
    const pageHeight = window.innerHeight;
    const positionScroll = document.documentElement.scrollTop;
    const pageHeightTotal = document.documentElement.offsetHeight;

    if (pageHeight + positionScroll >= pageHeightTotal && recipesNumberToDisplay < updatedList.length) {
        recipesNumberToDisplay += initialRecipesToDisplay;
        displayRecipes(updatedList, '', recipesNumberToDisplay);
    }
}

function handleCloseIconClick() {
    deleteWithIcon(searchBar, closeIcon);
    updateRecipeList('');
}

function updateRecipeList(valueInputUpdated) {
    updatedList = filterRecipes(optionSelectedList, recipesList, valueInputUpdated);
    displayRecipes(updatedList, valueInputUpdated, recipesNumberToDisplay);
    [appliances, ustensils, ingredients] = optionsFilter(updatedList);
}

function initializeOptions() {
    optionSelectedList.forEach((element) => {
        const spanOption = displayOptionSelected(element);
        const iconCloseOption = spanOption.querySelector('i');
        iconCloseOption.addEventListener('click', () => closeSpanOption(spanOption));
    });
}

function getAvailableOptions(nameOption) {
    switch (nameOption) {
        case 'ingredients': return ingredients;
        case 'appliance': return appliances;
        case 'ustensils': return ustensils;
        default: return [];
    }
}

function toggleChevronRotation(icon) {
    icon.classList.toggle('rotate-180');
}

function setupOptionSearchInput() {
    const inputOption = document.querySelector('#input-option');
    const iconOption = document.querySelector('#icon-option');
    const optionClicked = iconOption?.closest('div');

    if (optionClicked) {
        elementLiClick(optionClicked);
    }

    inputOption?.addEventListener('input', () => {
        const valueInput = inputOption.value.trim().toUpperCase();
        displayCloseIcon(valueInput, iconOption);
        const updatedOptions = filterBySearchOption([...getAvailableOptions(optionClicked.dataset.name)], valueInput);
        forEachList(updatedOptions, optionClicked, optionSelectedList);
        elementLiClick(optionClicked);
    });

    iconOption?.addEventListener('click', () => {
        deleteWithIcon(inputOption, iconOption);
        forEachList(getAvailableOptions(optionClicked.dataset.name), optionClicked, optionSelectedList);
        elementLiClick(optionClicked);
    });
}

function elementLiClick(ulElement) {
    const allElementsLi = ulElement.querySelectorAll('li');
    console.log('testetestg')
    allElementsLi.forEach((item) => {
        item.addEventListener('click', () => {
            const { textContent } = item;
            let spanOptionSelected;

            const textContentUpperCase = textContent.toUpperCase()

            if (optionSelectedList.includes(textContentUpperCase)) {
                const id = `span-option-${textContent.toLowerCase().split(' ').join('-').split('\'').join('-')}`;
                spanOptionSelected = document.querySelector(`#${id}`);
                closeSpanOption(spanOptionSelected);
            } else {
                optionSelectedList.push(textContentUpperCase);
                spanOptionSelected = displayOptionSelected(textContent);
            }

            const iconCloseSpan = spanOptionSelected?.querySelector('i');

            updateRecipeList(textContentUpperCase);
            closeDivOptions();
            recipesNumberToDisplay = initialRecipesToDisplay;

            iconCloseSpan.addEventListener('click', () => closeSpanOption(spanOptionSelected));
        });
    });
}

function closeSpanOption(spanOption) {
    const nameToFilter = spanOption.textContent.toUpperCase()

    const indexOption = optionSelectedList.indexOf(nameToFilter);
    optionSelectedList.splice(indexOption, 1);
    updateRecipeList(nameToFilter);
    recipesNumberToDisplay = initialRecipesToDisplay;

    spanOption.remove();
}

// Initial setup //
setupEventListeners();