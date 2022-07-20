import {Fragment} from 'react';
import ReactDom from "react-dom";

import styles from './Modal.module.css' ;

const BackDrop = props => {
    return <div className={styles.backdrop}></div>
}
const ModalOverlay = props => {
    return (<div className={styles.modal}>
               <div className={styles.content}> {props.children} </div>
            </div>)
}
function Modal (props){
    return(
        <Fragment>
            {ReactDom.createPortal(<BackDrop />,document.getElementById('overlay') )}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlay') )}
        </Fragment>
    );
}

export default Modal;