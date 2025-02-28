import Styles from '../project/ProjectCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({ id, name, cost, description, handleRemove }) {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id, cost)
  }

  return (
    <div className={Styles.project_card}>
      <h2>{name}</h2>
        <p hidden><span>Cód:</span> {id}</p>
      <p>
        <span>Custo total:</span> R$ {cost}
      </p>
      <p>{description}</p>
      <div>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default ServiceCard