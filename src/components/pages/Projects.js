import Messager from "../layout/Messager";
import Styles from './Projects.module.css';
import { useLocation } from 'react-router-dom';
import Container from '../layout/Container';
import LinkButton from "../layout/LinkButton";
import { useState, useEffect } from 'react';
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";


function Project() {

    const [removeloader, setRemoveloader] = useState(false)
    const [projects, setProjects] = useState([])
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://18.230.70.230:3001/projects/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
                //console.log(data)
                setRemoveloader(true)
            })
            .catch((err) => console.log(err))
        }, 100)
    }, [])

    function removeProject(_id){
        fetch(`http://18.230.70.230:3001/projects/delete/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(projects.filter((project) => project._id !== _id))
                setProjectMessage('Projeto removido com sucesso!')          
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={Styles.project_container}>

            <div className={Styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            
            {message && <Messager msg={message} type='success' />}
            {projectMessage && <Messager msg={projectMessage} type='success' />}

            <Container customClass="center">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            name={project.name}
                            id={project._id}
                            budget={project.budget}
                            category={project.category.name}
                            key={project._id}
                            handleRemove={removeProject}
                            
                        />
                    ))}
                    {!removeloader && <Loading/>}
                    {/* {!removeloader && projects.length === 0 && <p>Não há projetos cadastrados!</p> } */}
            </Container>
        </div>
    );
}

export default Project;