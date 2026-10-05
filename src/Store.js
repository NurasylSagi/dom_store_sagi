class Store{
    #items=[];

    constructor(items=[]){
        this.#items = [...items];
    }
    add (item){
        this.#items.push(items);
        return item;
    
    }
    remove(index){
        if(index >= 0 && index <= this.#items.length){
            this.#items.splice(index , 1);
            return true;

        }
        return false;

    }
    
    updateQty(index , qty){
        if(index >=0 && index <= this.#items.length){
            this.#items[index].qty = qty;
            return this.items[index];

        }
        return null; 
    }
    get items(){
        return this.#items;

    }

    get total(){
        return this.#items.reduce(
            (Subm , item) => sum + item.price * item.qty, 0
        )
    }

}

export default Store;