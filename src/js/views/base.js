export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchRes : document.querySelector('.results'),
    searchResList : document.querySelector('.results__list'),
    searchResPages : document.querySelector('.results__pages')
}


export const renderLoader = (parent) => {

    const loader = `
        <div class ="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>

    `;
    parent.insertAdjacentHTML('afterbegin',loader);

};

export const clearLoader = () => {
    console.log('inside clear loader');
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentNode.removeChild(loader);
    }
}