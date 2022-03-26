import {useState, useEffect} from 'react';
import Styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubimitButton from '../form/SubmitButton';


function ProjectForm({handleSubmit, btnText, projectData}) {

    const [project, setProject] = useState(projectData || {})
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://18.230.70.230:3001/categories", {
            method: 'GET',
            headers:{
                'Contect-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
        //console.log(project)
        
    }

    function handleChange (e){
        setProject({ ...project, [e.target.name]: e.target.value})
    }

    function handleCategory (e){
        setProject({ 
            ...project, 
            category: {
              id: e.target.value,
              name: e.target.options[e.target.selectedIndex].text,
        },
      })
    }


    return ( 
        <form onSubmit={submit} className={Styles.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value = {project.name ? project.name: ''}
            />

            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="budget"
                placeholder="Insira o orcamento total"
                handleOnChange={handleChange}
                value = {project.budget ? project.budget: ''}
            />
            <Select 
                name="category_id" 
                text="Selecione a categoria" 
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
                
            />
            <div className={Styles.align}>
                <SubimitButton text={btnText}/>
            </div>
            
        </form>
     );
}

export default ProjectForm;