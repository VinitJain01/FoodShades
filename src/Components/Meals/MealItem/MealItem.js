import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from "./MealItemForm";
import cartContext from '../../../Source/cart-context';

const MealIem = props => {

    const cartCtx = useContext(cartContext);

    const price = ` $${props.price.toFixed(2)} `;
//We can simply use {props.price} but we wanted to add '$' before price and want to have 2 digits after decimal in price
//So we created a price const with BackTicks Method for that.

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id:props.id,
            name:props.mealName,
            price:props.price,
            amount:amount     // As we will get the amount from mealForm .
        }
        );
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.mealName}</h3>
                <div className={classes.description}>
                    {props.description}
                </div>
                <div className={classes.price}>
                    {price}
                </div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealIem;