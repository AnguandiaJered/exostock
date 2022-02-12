import React,{ useState, useEffect } from 'react';
import Modal from './Modal.css';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

const Addstock = ({ closeModal}) =>{    
    let history = useHistory();
    const {id}= useParams();
    const [stock,setStock] = useState({       
        produit:"",
        SI:"",
        dateActuel:""
    });

    const {produit,SI,dateActuel} = stock;
    const handleChange = e =>{
        setStock({...stock,[e.target.name] : e.target.value});
    }
    
    
    useEffect(() =>{
        loadStock();
    },[]);

    const loadStock = async e =>{
        const res = await axios.get(`http://localhost:82/backend/getStock.php/${id}`);
        setStock(res.data);
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:82/backend/editStock.php/${id}`,stock);
        history.push("/");
    };
    return(
        <div className='container'>
            <div className='col-md-8 offset-2 mt-5 modalContainer'>
                <button className='btn btn-danger offset-11' onClick={()=>{closeModal(false)}}>X</button>
                <div className='body'>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="col-md-7 ml-3">
                                <div className="form-group">
                                    <label htmlFor="produit">Produits</label>
                                    <select  className="form-control"  
                                    name="produit" 
                                    value={produit} 
                                    onChange={e => handleChange(e)} >
                                        <option>Ordinateur</option>
                                        <option>Imprimante</option>
                                        <option>Projecteur</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="si">SI</label>
                                    <input type="number" 
                                    className="form-control" 
                                    placeholder="SI" 
                                    name="username" 
                                    value={SI} 
                                    onChange={e => handleChange(e)} />
                                </div>                                                                            
                                <div className="form-group">
                                    <label htmlFor="dateActuel">Date Actuelle</label>
                                    <input 
                                    type="date" 
                                    className="form-control" 
                                    placeholder="Date actuelle" 
                                    name="dateActuel" 
                                    value={dateActuel} 
                                    onChange={e => handleChange(e)} />
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

export default Addstock;
