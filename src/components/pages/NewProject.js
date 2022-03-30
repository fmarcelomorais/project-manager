import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import Styles from './NewProject.module.css';
const api = require('../service/api')

function NewProject() {
    const history = useNavigate()

    function createPost(project) {
        // initialize cost and services
        project.cost = 0
        project.services = []

        api.post('/projects/create', project)
        .then(() => {
            history('/projects', { state: { message: 'Projeto criado com sucesso!' } })
        }).catch(error => console.log(error))
    }

    return (
        <div className={Styles.newproject_continer}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <h2>Formulário</h2>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
    );
}

export default NewProject