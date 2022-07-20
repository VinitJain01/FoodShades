import { useReducer } from 'react';
import cartContext from './cart-context' ;

const defaultCartState = {
    itemList : [],
    totalAmount : 0
};
const cartReducer = (state,action) => {
    if(action.type === 'ADDED'){
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.itemList.findIndex( item => item.id === action.item.id );
        const existingCartItem = state.itemList[existingCartItemIndex];
       // let updateditemInList;
        let updatedItemsList ;

        if(existingCartItem){
            existingCartItem.amount = (existingCartItem.amount + action.item.amount);
            // To update the amount by overwritting on amount in existingCartItem
            /*updateditemInList = {
                ...existingCartItem,
                amount : (existingCartItem.amount + action.item.amount)// To update the amount by overwritting on amount in existingCartItem
            }; */
            updatedItemsList = [...state.itemList];
            updatedItemsList[existingCartItemIndex] = existingCartItem;
        }else{
            updatedItemsList = state.itemList.concat(action.item);
        };
        return ({
            itemList : updatedItemsList,
            totalAmount : newTotalAmount
        });
    }
    if(action.type === 'REMOVED'){
        const existingCartItemIndex = state.itemList.findIndex( (item) => item.id === action.id );
        const existingCartItem = state.itemList[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItemList;
        if(existingCartItem.amount === 1 ){
            updatedItemList = state.itemList.filter( item => item.id !== action.id);
        }else{
            const updatedExistingCartItem ={ ...existingCartItem , amount : existingCartItem.amount - 1 };
            updatedItemList = [...state.itemList];
            updatedItemList[existingCartItemIndex] = updatedExistingCartItem;
        }
        return ({
            itemList : updatedItemList,
            totalAmount : updatedTotalAmount
        });
    }
    if(action.type === 'CLEAR'){
        return defaultCartState;
    }
    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState , dispatchCartAction] = useReducer(cartReducer , defaultCartState);

    const addItemtoCartHandler = (item) => {
        dispatchCartAction( {type:'ADDED', item:item
         } );
    };
    const removeItemtoCartHandler = (id) => {
        dispatchCartAction( {type:'REMOVED', id:id
         } );
    };
    const clearCartHandler = () => {
        dispatchCartAction( {type:'CLEAR'} );
    }

    const values = {                              // INITIAL STATEs
        itemList : cartState.itemList,
        totalAmount : cartState.totalAmount, 
        addItem : addItemtoCartHandler ,
        removeItem: removeItemtoCartHandler,
        clearCart : clearCartHandler
    };

    return (<cartContext.Provider value={values}>
        {props.children}
    </cartContext.Provider>);
}

export default CartProvider;