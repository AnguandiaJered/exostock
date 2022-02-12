import React,{ useState, useEffect } from 'react';
import Modal from './Modal.css';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

const UpdateClient = ({ closeModal}) =>{
    let history = useHistory();
    const {id}= useParams();
    const [client,setClient] = useState({ 
        idclient:"",       
        nom:"",
        prenom:"",
        sexe:"",
        adresse:"",
        telephone:"",
        mail:""
    });
    const {nom,prenom,sexe,adresse,telephone,mail,idclient} = client;
    const handleChange = e =>{
        setClient({...client,[e.target.name] : e.target.value});
    }
    
    useEffect(() =>{
        loadClient();
    },[]);

    const loadClient = async e =>{
        const res = await axios.get(`http://localhost:82/backend/getClient.php/${id}`);
        setClient(res.data);
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:82/backend/editclient.php/${id}`,client);
        history.push("/");
    };

    return(
        <div className='modalBackground'>
            <div className='col-md-8 offset-2 mt-5 modalContainer'>
                <button className='btn btn-danger offset-11' onClick={()=>{closeModal(false)}}>X</button>
                <div className='body'>
                <form onSubmit={e => onSubmit(e)} >
                        <div className="row">
                            <div className="col-md-5 ml-5 mt-3">
                                <div className="form-group">                                           
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="id" name="idclient" 
                                    onChange={e => handleChange(e)} 
                                    value={id} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nom">Nom</label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Entré le nom" 
                                    name='nom' 
                                    onChange={e => handleChange(e)} 
                                    value={nom} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prenom">Prénom</label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Entré le prénom" 
                                    name='prenom' 
                                    onChange={e => handleChange(e)} 
                                    value={prenom} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sexe">Sexe</label>
                                    <select  className="form-control" 
                                    name='sexe' 
                                    onChange={e => handleChange(e)} 
                                    value={sexe} >
                                            <option>M</option>
                                            <option>F</option>
                                    </select>
                                </div>                                                 
                            </div>
                            <div className="col-md-5 ml-5 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="adresse">Adresse</label>
                                        <input type="text" 
                                        className="form-control" 
                                        placeholder="Entré l'adresse" 
                                        name='adresse' 
                                        onChange={e => handleChange(e)} 
                                        value={adresse} />
                                    </div> 
                                    <div className="form-group">
                                        <label htmlFor="telephone">Telephone</label>
                                        <input type="tel" 
                                        className="form-control" 
                                        placeholder="+243 ... ... ..." 
                                        name='telephone' 
                                        onChange={e => handleChange(e)} 
                                        value={telephone} />
                                    </div>                             
                                    <div className="form-group">
                                        <label htmlFor="adresse">Email</label>
                                        <input type="email" 
                                        className="form-control" 
                                        placeholder="exemple@gmail.com" 
                                        name='mail' 
                                        onChange={e => handleChange(e)} 
                                        value={mail} />
                                    </div>
                                </div>      
                        </div>                        
                        <div className="form-group">                               
                            <input type="submit" className="btn btn-primary col-md-4 mt-4 ml-5" value="Modifier" />
                        </div> 
                    </form>
                </div>               
            </div>
        </div>
    )
}

export default UpdateClient;