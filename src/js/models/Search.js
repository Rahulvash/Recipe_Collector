import axios from 'axios';

export default class Search {

    constructor(query){
        this.query = query;
    }
    async getResults () {
        console.log(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`)
            // .then( result1 => {
            //     return result1.json();
            // })
            // .then ( finalResult => {
            //     // console.log(finalResult);
            //     this.result = res.data.recipes;
            // })
            this.result = res.data.recipes;
            // console.log(this.result);    
        }
        catch (error) {
            alert(error);
        }
       
    }

}

