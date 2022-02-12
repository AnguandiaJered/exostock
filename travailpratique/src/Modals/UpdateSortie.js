import React,{ useState, useEffect } from 'react';
import Modal from './Modal.css';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";


const UpdateSortie = ({ closeModal}) =>{
    let history = useHistory();
    const {id}= useParams();
    const [sortie,setSortie] = useState({
        idsort:"",       
        client:"",
        produit:"",
        quantite:"",
        prix:"",
        devise:"",
        dateoperation:""
    });
    const {client,produit,quantite,prix,devise,dateoperation,idsort} = sortie;
    const handleChange = e =>{
        setSortie({...sortie,[e.target.name] : e.target.value});
    };
    
    useEffect(() =>{
        loadSortie();
    },[]);

    const loadSortie = async e =>{
        const res = await axios.get(`http://localhost:82/backend/getSortie.php/${id}`);
        setSortie(res.data);
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:82/backend/editSortie.php/${id}`,sortie);
        history.push("/");
    };

    return(
        <div className='modalBackground'>
            <div className='col-md-8 offset-2 mt-5 modalContainer'>
                <button className='btn btn-danger offset-11' onClick={()=>{closeModal(false)}}>X</button>
                <div className='body'>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="col-md-5 ml-5 mt-3">
                                <div className="form-group">                                           
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="id" 
                                    name="idfourn" 
                                    onChange={e => handleChange(e)} 
                                    value={idsort} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="client">Clients</label>
                                    <select 
                                        className="form-control" 
                                        name="client" 
                                        onChange={e => handleChange(e)} 
                                        value={client} >
                                            <option>John</option>
                                            <option>Jered</option>
                                            <option>Patoraking</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="produit">Produit</label>
                                    <select  
                                        className="form-control"  
                                        name="produit" 
                                        onChange={e => handleChange(e)} 
                                        value={produit} >
                                        <option>Ordinateur</option>
                                        <option>Cable</option>
                                        <option>Portable</option>
                                    </select>
                                </div>                         
                                <div className="form-group">
                                    <label htmlFor="quantite">Quantité</label>
                                    <input type="number" 
                                        className="form-control" 
                                        placeholder="quantité"  
                                        name="quantite" 
                                        onChange={e => handleChange(e)} 
                                        value={quantite} />
                                </div>                                                    
                            </div>
                            <div className="col-md-5 ml-5 mt-3">  
                                <div className="form-group">
                                    <label htmlFor="prix">Prix unitaire</label>
                                    <input type="number" 
                                        className="form-control" 
                                        placeholder="Prix unitaire" 
                                        name="prix" 
                                        onChange={e => handleChange(e)} 
                                        value={prix} />
                                </div>                       
                                <div className="form-group">
                                    <label htmlFor="devise">Devise</label>
                                    <select  
                                        className="form-control" 
                                        name="devise" 
                                        onChange={e => handleChange(e)} 
                                        value={devise} >
                                        <option>USD</option>
                                        <option>FC</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" 
                                        className="form-control" 
                                        placeholder="designation" 
                                        name="dateoperation" 
                                        onChange={e => handleChange(e)} 
                                        value={dateoperation} />
                                </div>                        
                            </div>
                        </div>
                        <div className="form-group">                               
                            <input type="submit" className="btn btn-primary col-md-3 mt-3 offset-1" value="Modifier" />
                        </div> 
                    </form>
                </div>               
            </div>
        </div>
    )
}

export default UpdateSortie;