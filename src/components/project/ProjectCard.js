import Styles from  './ProjectCard.module.css';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ProjectCard({id, name, budget, category, handleRemove}) {
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
                <Link to="/">
                    <BsPencil /> Editar
                </Link>
                <button>
                    <BsFillTrashFill />  Excluir
                </button>
            </div>
        </div>
     );
}

export default ProjectCard;