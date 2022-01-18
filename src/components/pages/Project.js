import Messager from "../layout/Messager";
import {useLocation} from 'react-router-dom';

function Project() {
    const location = useLocation()
    let message=''
    if(location.state){
        message = location.state.message
    }

    return ( 
        <div>
            <h1>Meus projetos</h1>
            {message && <Messager msg={message}  type='success'/>}
        </div>
     );
}

export default Project;