import React from 'react';
import styles from './Header.module.css';
import mealsImage from '../../Assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={styles.header} > 
                <h1>FOODSHADES</h1>
                <HeaderCartButton onClick={props.onClickOnCartButton}/>
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="A Dinning table full of meals"/>
            </div>
        </React.Fragment>
    )
}

export default Header;