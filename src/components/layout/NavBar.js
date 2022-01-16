import { Link } from "react-router-dom";
import Styles from './NavBar.module.css';
import Logo from '../../img/costs_logo.png';
import Container from "./Container";

function NavBar() {
    return ( 
        <nav className={Styles.navbar}>
            <Container>
                <Link to="/"> <img src={Logo} alt="Logo"/></Link>

                <ul className={Styles.list}>
                    <li className={Styles.item}>
                        <Link to= "/">Home</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to= "/project">Projeto</Link> 
                    </li>
                    <li className={Styles.item}>
                        <Link to= "/newproject">Novo projeto</Link> 
                    </li>
                    <li className={Styles.item}>
                        <Link to= "/company">Empresa</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to= "/contact">Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
     );
}

export default NavBar;