import ProjectForm from '../project/ProjectForm';
import Styles from './NewProject.module.css'; 

function NewProject() {
    return ( 
        <div className={Styles.nemproject_continer}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>

            <h2>Formulário</h2>
            <ProjectForm btnText="Criar projeto"/>
        </div>
     );
} 

export default NewProject;