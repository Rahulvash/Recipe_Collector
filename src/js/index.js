import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

const controlSearch = async () => {
    //1. get query from view
       const query = searchView.getInput();
      
    if(query) {

        // console.log('query',query);
        // 2.new search object and add it to state 
            state.search = new Search(query);
           

        //3. prepare UI for Result for the selected querys options
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //4. search for recipe
        await state.search.getResults();
        try {
            clearLoader();
            searchView.renderResult(state.search.result);
            // console.log(state.search.result);         
        }
        catch(error) {
            alert('Alert from controlSearch',error);
            console.log('Alert from controlSearch',error);
        }

        // 5. render for Ui
        }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


//event delegation 
elements.searchResPages.addEventListener('click', e => {
    // e.target.closet();
    const btn = e.target.closest('.btn-inline');
    // console.log(e.target.closest('.btn-inline'));
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResult(state.search.result,goToPage);
        // console.log(goToPage);
    }
});


// const r = new Recipe(47746);
// r.getRecipe();
// console.log(r);

const controlRecipe = async() => {

    //calculate the id that need to be passed 
    const id = window.location.hash.replace('#','');
    console.log(id);
    
    if(id) {

        //prepare recipe for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if(state.search) searchView.highlightSelected(id);

        // create an recipe object
        state.recipe = new Recipe(id);
        // console.log(state    

        try {
            //get recipe data and parse the indregients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.calcTime();
            state.recipe.calServings();

            console.log(state.recipe);
    
            // console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            
        }
        catch (error) {
            alert('Alert from controlRecipe',error);
            console.log('Alert from controlRecipe',error);
        }
        
    }
}

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));


//handling recipe button click
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {

        console.log('inside matches');
       

        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }  
    }
    else if (e.target.matches('.btn-increase, .btn-increase *'))
    {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    // console.log(state.recipe);
});


window.l = new List();

