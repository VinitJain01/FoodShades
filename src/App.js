import React,{Fragment,useState} from "react";
import Header from './Components/Layout/Header';
import Meals from "./Components/Meals/Meals";
import Cart from './Components/Cart/Cart';
import CartProvider from "./Source/CartProvider";

function App() {

  const [cartIsShown,setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }
  const hideCartHandler = () => {
    setCartIsShown(false);
  }
    return (
    <CartProvider>
      {cartIsShown===true && <Cart onClickOnClose={hideCartHandler}/>}
      <Header onClickOnCartButton={showCartHandler}/>    
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}
// onClickOnCartButton is from headercartbutton. Cart will be shown when cartButton would be clicked
export default App;
