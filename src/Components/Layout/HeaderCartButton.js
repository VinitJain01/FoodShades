import { useContext,useEffect , useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import cartContext from '../../Source/cart-context';

const HeaderCartButton = props => {

    const ctx = useContext(cartContext);
    const [cartBtnIsHighlighted,setCartBtnIsHighlighted] = useState(false);   // This will help in updating amount on cart button also as this will make this comp execute again
    const btnClass = ` ${classes.button} ${cartBtnIsHighlighted ? classes.bump : ''} `
    useEffect( () => {
        if(ctx.itemList.length === 0){
            return;// We dont want to bump the Cart button if no item is added in cart.
        }

        setCartBtnIsHighlighted(true);

        const timerId=setTimeout( ()=>{
        setCartBtnIsHighlighted(false)}
         , 300 );

         return () => {
             clearTimeout(timerId);
         }
    } , [ctx.itemList]);
    var noOfCartItems = 0;
    const arr = ctx.itemList.map( (item) => item.amount );  // Array of amount of items in cart
    for ( let i=0 ; i< arr.length ; i++){
        noOfCartItems+=arr[i];
    }
    // We can also use .reduce() array method as shown below
   /* const noOfCartItems = ctx.itemList.reduce( (currNumber,item) => {
        return currNumber + item.amount;
    } ,0 );   //We use this to count no. of times any meal is added.
    /*We should not use ctx.itemList.length as it will not give correct no. of meals ordered as it will not count 
    the amount(no. of times) the meal is ordered*/

    return <button className={btnClass} onClick={props.onClick} >
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}> {/*This is to show no. of items in cart */}
            {noOfCartItems}
        </span>
    </button>
}

// First span has CartIcom component which stores svg code
// This is just to render that icon before the Your Cart text in the Cart button.
// We can igone this as well

export default HeaderCartButton ;