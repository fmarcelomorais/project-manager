import Messager from "../layout/Messager";
import Styles from './Project.module.css';
import {useLocation} from 'react-router-dom';
import Container from '../layout/Container';
import LinkButton from "../layout/LinkButton";
import {useState, useEffect} from 'react';
import ProjectCard from "./ProjectCard";


function Project() {

    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message=''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(data)
            //console.log(data)
        })
        .catch((err) => console.log(err))
    }, [])

    return ( 
        <div className={Styles.project_container}>
            <div className={Styles.title_container}> 
                <h1>Meus projetos</h1>
                <LinkButton to = '/newproject' text = 'Criar Projeto'/>
            </div>
            {message && <Messager msg={message}  type='success'/>}

            <Container customClass="start">
                {projects.length > 0 && 
                  projects.map((project) => <ProjectCard name={project.name}/>)}
            </Container>
        </div>
     );
}

export default Project;