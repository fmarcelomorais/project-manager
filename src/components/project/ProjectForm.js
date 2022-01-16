import Styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubimitButton from '../form/SubimitButton';
import {useState, useEffect} from 'react';

function ProjectForm({btnText}) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: 'GET',
            headers:{
                'Contect-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    
    }, [])

    return ( 
        <form className={Styles.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name"
                placeholder="Insira o nome do projeto"
            />

            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="budget"
                placeholder="Insira o orcamento total"
            />
            <Select 
                name="category_id" 
                text="Selecione a categoria" 
                options={categories}
            />

            <div className={Styles.align}>
                <SubimitButton text={btnText}/>
            </div>
            
        </form>
     );
}

export default ProjectForm;