import Search from './models/Search';
import * as searchView from './views/searchView';
 
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

const controlSearch = async () => {
    //1. get query from view
    const query = searchView.getInput();
    console.log(query);

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
       
        // 5. render for Ui
        clearLoader();
        searchView.renderResult(state.search.result);
        // console.log(state.search.result);
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
})