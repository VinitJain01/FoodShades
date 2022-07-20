import React from 'react' ;

const cartContext = React.createContext({
    itemList : [],                          // these are the initial values of the state stored in this context
    totalAmount : 0,     // Total Price of the ites in carts 
    addItem : (item) => {} ,
    removeItem: (id) => {} ,
    clearCart : () => {}
});

export default cartContext;