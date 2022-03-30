import Styles from './SubmitButton.module.css';

function SubimitButton({text}) {
    return ( 
        <div>
            <button className={Styles.btn}>{text}</button>
        </div>
     );
}

export default SubimitButton;