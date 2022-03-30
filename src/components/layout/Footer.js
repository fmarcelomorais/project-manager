import Styles from './Footer.module.css';
function Footer() {
    return (
        <footer>
            <p className={Styles.item2}>Site desenvolvido por <strong>Kaio Vinicius</strong></p>
            <p className={Styles.item2}>Coin Manager &copy; 2022</p>
            <div className={Styles.redesSociais}>
                <nav>
                    <p className={Styles.item1}>Redes Sociais</p>
                    <a className={Styles.item3} href="https://www.linkedin.com/in/kaioviniciusdev"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" /></a>
                    <a href="https://github.com/kaiolabs"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="github" /></a>
                </nav>
            </div>
        </footer>
    );
}
export default Footer;