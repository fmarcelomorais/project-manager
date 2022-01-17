import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import Styles from './NewProject.module.css';

function NewProject() {
    const history = useNavigate()

    function createPost(project) {
        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                history('/project', { state: { message: 'Projeto criado com sucesso!' } })
            })
    }

    return (
        <div className={Styles.nemproject_continer}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <h2>Formulário</h2>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
    );
}

export default NewProject