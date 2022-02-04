import Styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Messager from '../layout/Messager';
import ServiceForm from '../service/ServiceForm';
import { v4 as uuidv4 } from 'uuid';
import ServiceCard from '../service/ServiceCard'

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [services, setServices] = useState([])

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
                    setServices(data.services)
                })
                .catch((err) => console.log(err))
        }, 500)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function createService(project) {
        // last service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('erro')
            project.services.pop()
            return false
        }

        // add service cost to project cost total
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setServices(data.services)
                setShowServiceForm(!showServiceForm)
                setMessage('Serviço adicionado!')
                setType('success')
            })
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
                setServices(data.services)
                setShowServiceForm(!showServiceForm)
                setMessage('Serviço adicionado!')
                setType('success')
            })
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
          (service) => service.id !== id,
        )
    
        const projectUpdated = project
    
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
    
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectUpdated),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
          })
      }

    return (
        <>
            <Container customClass="column">
                <br />
                {message && <Messager type={type} msg={message} />}
                {project.name ?
                    <div>
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
                            <div className={Styles.form}>
                                {showServiceForm && (
                                    <div>
                                        <ServiceForm
                                            handleSubmit={createService}
                                            btnText="Adicionar Serviço"
                                            projectData={project}
                                        />
                                    </div>
                                )}
                                <div className={Styles.center}>
                                    <button onClick={toggleServiceForm}> {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'} </button>
                                </div>
                            </div>
                        </div>

                        <div className={Styles.project_card}>
                            <h2>Serviços</h2>
                            <Container customClass="start">
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))}
                                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                            </Container>
                        </div>
                    </div>
                    : (

                    <Loading />
                    
                    )}
            </Container>
        </>
    );
}

export default Project;