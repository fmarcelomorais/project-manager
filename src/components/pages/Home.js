import Styles from './Home.module.css';
import savings from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton';

function Home() {
    return ( 
        <section className={Styles.home_container}>
            <div>
                <h1>Bem-vindo ao <span>Coin Manager</span></h1>
                <p>Comece a gerenciar os seus projetos agora mesmo!</p>
                <LinkButton to = '/newproject' text = 'Criar Projeto'/>
            </div>
            <div>
                <img src={savings} alt='Coin Manager'/>
            </div>
        </section>
     );
}

export default Home;