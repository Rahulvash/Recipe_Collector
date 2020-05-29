import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe () {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            // console.log(res.data.recipe);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch (error) {
            console.log('Alert from controlSearch from Recipe.js',error);
            alert('Alert from controlSearch from Recipe.js',error);
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        const time = periods * 15;
    }

    calServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLongs = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','cup','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tp','tp','cups','cup','pounds'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            
            //uniform units
            let ingredient = el.toLowerCase();
            unitsLongs.forEach((unit,i) => {
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });

            //remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //parse ingredients into count,unit and ingredients
            console.log(ingredient);

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if(unitIndex > -1){
                // there is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                }
                else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count: count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            }
            else if(parseInt(arrIng[0],10)) {
                // there is no unit but first element is number
                objIng = {
                    count: arrIng[0],
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }
            else if(unitIndex === -1){
                // there is no unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;

    }
    
}