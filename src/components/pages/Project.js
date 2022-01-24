import Styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Messager from '../layout/Messager';

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Contect-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                })
                .catch((err) => console.log(err))
        }, 500)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggServiceForm() {
        setShowServiceForm(!showServiceForm)
    }


    function editPost(project) {
        setMessage('')

        // budget validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('erro')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(!showProjectForm)
                setMessage('Projeto atualizado!')
                setType('success')
            })
    }

    return (
        <>
            <Container customClass="column">
                <br />
                {project.name ?
                    <div>
                        <div className={Styles.project_card}>
                            {message && <Messager type={type} msg={message} />}
                            <div>
                                <h2>{project.name}</h2>
                                {!showProjectForm ? (
                                    <div>
                                        <p>
                                            <span>Categoria: </span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Total de Orçamento: </span> R$ {project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado: </span> R$ {project.cost}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <ProjectForm
                                            handleSubmit={editPost}
                                            btnText="Concluir edição"
                                            projectData={project}
                                        />
                                    </div>
                                )}
                                <div className={Styles.center}>
                                    <button onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                                </div>
                            </div>

                        </div>
                        <div className={Styles.project_card}>
                            <h2>Adicione um serviço</h2>
                            <div className={Styles.center}>
                                <button onClick={toggServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                            </div>
                        </div>
                        <div className={Styles.project_card}>
                            <h2>Serviços</h2>
                            <p>Item...</p>
                        </div>
                    </div>
                    : (<Loading />)}
            </Container>
        </>
    );
}

export default Project;