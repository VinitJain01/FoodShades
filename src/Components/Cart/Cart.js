import React, { useContext , useState } from 'react';
import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import CartItem from './CartItem';
import cartContext from '../../Source/cart-context';
import Checkout from './Checkout';

function Cart (props) {

    const [isOrdered , setIsOrdered] = useState(false);
    const [isSubmitting , setIsSubmitting] =useState(false);
    const [didSubmitted , setDidSubmitted] =useState(false);

    const cartCtx = useContext(cartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItemInCart = cartCtx.itemList.length>0;    // Only then it will show order button

    const CartItemAddHandler = (item) => {
        cartCtx.addItem({...item , amount:1});  // on clicking on + button we want to add only 1 amount of that item 
    };
    const CartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };    
    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.itemList.map( (item) => 
            <CartItem key={item.id} 
                    name={item.name} 
                    price={item.price} 
                    amount={item.amount} 
                    onAdd={CartItemAddHandler.bind(null, item)}
                    onRemove={CartItemRemoveHandler.bind(null, item.id)}/>)}
        </ul>
    );

    const orderClickHandler = () => {
        setIsOrdered(true);
    }

    const finalSubmitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch('https://react-app-fff65-default-rtdb.firebaseio.com/orders.json' , {
            method : 'POST',
            body : JSON.stringify({
                user : userData,
                orderedItems : cartCtx.itemList
            })
        } );
        setIsSubmitting(false);
        setDidSubmitted(true);
        cartCtx.clearCart();
    }

    const modalContent = <React.Fragment>
        {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isOrdered && <Checkout onConfirm = {finalSubmitOrderHandler} onCancel={props.onClickOnClose}/>}
            {!isOrdered && <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClickOnClose} >Close</button>
                {hasItemInCart&&<button className={styles.button} onClick={orderClickHandler} >Order</button>}
            </div>} 
    </React.Fragment>

    const modalContentWhileSubmitting = <p>Submitting your request.....</p>
    const modalContentafterSubmitted = <React.Fragment>
        <p>Your Order is Placed</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onClickOnClose} >Close</button>
            </div>
        </React.Fragment> 

    return(
        <Modal>
            {!isSubmitting && !didSubmitted && modalContent}
            {isSubmitting && modalContentWhileSubmitting}
            {didSubmitted && !isSubmitting && modalContentafterSubmitted}
        </Modal>
    );
}

export default Cart;