import { useRef , useState} from 'react';
import styles from './MealItemForm.module.css';
import Input from "../../UI/Input";

const MealItemForm = props => {

    const amountInputRef = useRef();
    const [isAmountValid , setIsAmountValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredAmount = amountInputRef.current.value; // Since input always returns a string. 
        //Convert it in number.
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length ==  0 || enteredAmountNumber<1 || enteredAmountNumber>5 ){
            setIsAmountValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }
    return (<form className={styles.form} onSubmit={submitHandler} >
        <Input label="Amount" input={{
            ref:amountInputRef,
            type:'number',
            id:'amount_' +props.id ,
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }}/>
        <button>+ Add</button>
        {!isAmountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>);
}

export default MealItemForm;