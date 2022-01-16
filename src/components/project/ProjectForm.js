import Styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubimitButton from '../form/SubimitButton';

function ProjectForm({btnText}) {
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
            <Select name="category_id" text="Selecione a categoria"/>

            <div className={Styles.align}>
                <SubimitButton text={btnText}/>
            </div>
            
        </form>
     );
}

export default ProjectForm;