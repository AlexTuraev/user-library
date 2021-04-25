/*export default class BookService{
    async getBooks (q, page='1') {
        const url = `https://openlibrary.org/search.json?q=${q}&page=${page}`;

        try{
            const result = await fetch(url);
            return await result.json();
        } catch(err){
            throw new Error(err);
        }
        
    }
}*/

export default class BookService{
    /*constructor(){
        this.url = url;
    }*/

    getBooks (q, page='1') {
        const url = `https://openlibrary.org/search.json?q=${q}&page=${page}`;

        return fetch(url)
            .then((res)=>{
                return res.json();
            })
            .catch(err => {
                console.log(`Ошибка ${err}`);
                throw new Error(err);
            });
    }
}