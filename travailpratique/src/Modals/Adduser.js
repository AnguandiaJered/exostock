import React,{ useState, useEffect } from 'react';
import Modal from './Modal.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Adduser = ({ closeModal}) =>{    
    let history = useHistory();    
    const [user,setUser] = useState({       
        noms:"",
        username:"",
        password:"",
        role:""
    });

    const {noms,username,password,role} = user;
    const handleChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }
    
    const onSubmit = async e =>{
        e.preventDefault();
      await axios.post('http://localhost:82/backend/user.php', user, {
            mode: 'no-cors',
          });
        history.push("/");
    }  

    return(
        <div className='container'>
            <div className='col-md-8 offset-2 mt-5 modalContainer'>
                <button className='btn btn-danger offset-11' onClick={()=>{closeModal(false)}}>X</button>
                <div className='body'>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="col-md-5 ml-3">
                                <div className="form-group">
                                    <label htmlFor="nom">Noms</label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="names" 
                                    name="noms" 
                                    value={noms} 
                                    onChange={e => handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="username" 
                                    name="username" 
                                    value={username} 
                                    onChange={e => handleChange(e)} />
                                </div>                                                                               
                            </div>
                            <div className="col-md-5 ml-3">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password" 
                                    name="password" 
                                    value={password} 
                                    onChange={e => handleChange(e)} />
                                </div>  
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Role" name="role" 
                                    value={role} 
                                    onChange={e => handleChange(e)} />
                                </div>  
                            </div>  
                        </div>                        
                        <div className="form-group">                               
                            <input type="submit" className="btn btn-primary col-md-5 mt-4 ml-5" value="Enregistrer" />
                        </div> 
                    </form>                                                           
                </div>               
            </div>
        </div>
    )
}

export default Adduser;
