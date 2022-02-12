import React,{ useState, useEffect } from 'react';
import Modal from './Modal.css';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

const Updateuser = ({ closeModal}) =>{
    
    let history = useHistory();
    const {id}= useParams();
    const [user,setUser] = useState({
        iduser:"",
        noms:"",
        username:"",
        password:"",
        role:""
    });
    const {noms,username,password,role,iduser} = user;
    const handleChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    };
    
    useEffect(() =>{
        loadUser();
    },[]);

    const loadUser = async () =>{
        const res = await axios.get(`http://localhost:82/backend/getuser.php/${id}`);
        setUser(res.data);
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:82/backend/edituser.php/${id}`,user);
        history.push("/");
    };

    return(
        <div>
           <div className='col-md-8 offset-2 mt-5 modalContainer'>
                <button className='btn btn-danger offset-11' onClick={()=>{closeModal(false)}}>X</button>
                <div className='body'>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="row">
                        <div className="form-group">                                           
                                    <input type="hidden" 
                                    className="form-control" 
                                    placeholder="id" 
                                    name="iduser" 
                                    onChange={e => handleChange(e)} 
                                    value={id} />
                                </div>
                            <div className="col-md-5 ml-3">
                                
                                <div className="form-group">
                                    <label htmlFor="noms">Noms</label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="names" 
                                    name="noms" 
                                    onChange={e => handleChange(e)} 
                                    value={noms} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prenom">Username</label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="username" 
                                    name="username" 
                                    onChange={e => handleChange(e)} 
                                    value={username}/>
                                </div>                                                                               
                            </div>
                            <div className="col-md-5 ml-3">
                                <div className="form-group">
                                    <label htmlFor="adresse">Password</label>
                                    <input type="password" 
                                    className="form-control" 
                                    placeholder="Password" 
                                    name="password" 
                                    onChange={e => handleChange(e)} 
                                    value={password}/>
                                </div>  
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Role" 
                                    name="role" 
                                    onChange={e => handleChange(e)} 
                                    value={role} />
                                </div>  
                            </div>  
                        </div>                        
                        <div className="form-group">                               
                            <input type="submit" className="btn btn-primary col-md-5 mt-4 ml-5" value="Modifier" />
                        </div> 
                    </form>           
                </div>               
            </div>
        </div>
    )
}

export default Updateuser;