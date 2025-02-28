import Styles from './Select.module.css';

function Select({text, name, options, handleOnChange, value}) {
    return ( 
        <div className={Styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''} >
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option._id} key={option._id}>{option.name}</option>
                ))}
            </select>
        </div>
     );
}

export default Select;