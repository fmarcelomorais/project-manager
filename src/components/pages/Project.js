import Styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

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

    return (
        <>
            <Container customClass="center">
                {project.name ?
                    <div className={Styles.project_card}>
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
                                    <p>Form</p>
                                </div>
                            )}
                        </div>
                        <div className={Styles.center}>
                            <button onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                        </div>
                    </div>
                : (<Loading />)}
            </Container>
        </>
    );
}

export default Project;