import Styles from  './ProjectCard.module.css';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ProjectCard({_id, name, budget, category, handleRemove}) {

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(_id)
    }
    
    return ( 
        <div className={Styles.project_card}>
            <h2>{name}</h2>
            <p>                
                <span>Orçamento: </span> R$ {budget}
            </p>
            <p className={Styles.category_text}> 
                <span className={`${Styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={Styles.project_card_actions}>
                <Link to={`/project/${_id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill />  Excluir
                </button>
            </div>
        </div>
     );
}

export default ProjectCard;