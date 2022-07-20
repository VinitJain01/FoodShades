import {useRef , useState} from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const [nameIsValid , setNameIsValid] = useState(true);
    const [streetIsValid , setStreetIsValid] = useState(true);
    const [postalIsValid , setPostalIsValid] = useState(true);
    const [cityIsValid , setCityIsValid] = useState(true);

    const isNotEmpty = value => {
        return value.trim() !== '' ;
    }
    const hasSixChars = value => value.trim().length === 6;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredNameValue = nameRef.current.value;
    const enteredStreetValue = streetRef.current.value;
    const enteredPostalValue = postalRef.current.value;
    const enteredCityValue = cityRef.current.value;

    const enteredNameisValid = isNotEmpty(enteredNameValue);
    const enteredStreetisValid = isNotEmpty(enteredStreetValue);
    const enteredPostalisValid = hasSixChars(enteredPostalValue);
    const enteredCityisValid = isNotEmpty(enteredCityValue);

        setNameIsValid(enteredNameisValid);
        setStreetIsValid(enteredStreetisValid);
        setPostalIsValid(enteredPostalisValid);
        setCityIsValid(enteredCityisValid);

    const formIsValid = enteredNameisValid && enteredStreetisValid && enteredPostalisValid && enteredCityisValid;
    if (!formIsValid){
        return;
    }
    props.onConfirm({
        name: enteredNameValue,
        street : enteredStreetValue,
        city : enteredCityValue,
        postal : enteredPostalValue
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameIsValid ? '' : classes.invalid }`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!nameIsValid && <p>Name field can not be left Empty</p>}
      </div>
      <div className={`${classes.control} ${streetIsValid ? '' : classes.invalid }`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        {!streetIsValid && <p>Street field can not be left Empty</p>}
      </div>
      <div className={`${classes.control} ${postalIsValid ? '' : classes.invalid }`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef}/>
        {!postalIsValid && <p>Postal field is Invalid</p>}
      </div>
      <div className={`${classes.control} ${cityIsValid ? '' : classes.invalid }`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
        {!cityIsValid && <p>City field can not be left Empty</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
// Cancel button is converted to type button and CONFIRM Button is the submit button. On confirm will
// submit the form which will send the user data by calling finalSubmitOrderHandler in <Cart>
export default Checkout;