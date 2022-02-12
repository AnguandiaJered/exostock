import React,{ useState } from 'react';
import Modal from './Modal.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Categorie = ({ closeModal}) =>{

    let history = useHistory();    
    const [categorie,setCategorie] = useState({       
        designation:""
    });

    const {designation} = categorie;
    const handleChange = e =>{
        setCategorie({...categorie,[e.target.name] : e.target.value});
    }
    
    const onSubmit = async e =>{
        e.preventDefault();
      await axios.post('http://localhost:82/backend/saveCategorie.php', categorie, {
            mode: 'no-cors',
          });
        history.push("/");
    }  
    return(
        <div className=''>
        <div className='col-md-5 offset-4 mt-5 modalContainer'>
            <button className='btn btn-danger offset-11' onClick={()=>{closeModal(false)}}>X</button>
            <div className='body'>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="row">
                        <div className="col-md-8 ml-5 mt-3">
                            <div className="form-group">
                                <label htmlFor="designation">Designation</label>
                                <input type="text" 
                                className="form-control" 
                                placeholder="Entré le nom" 
                                name='designation' 
                                onChange={e => handleChange(e)} 
                                value={designation} />
                            </div>                                                                   
                        </div>                   
                    </div>            
                    <div className="form-group">                               
                        <input type="submit" className="btn btn-primary col-md-4 mt-4 ml-5" value="Enregistrer" />
                    </div> 
                </form>
            </div>               
        </div>
    </div>
    )
}

export default Categorie;