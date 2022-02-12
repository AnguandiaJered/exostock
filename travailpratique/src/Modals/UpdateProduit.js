import React,{ useState, useEffect } from 'react';
import Modal from './Modal.css';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

const UpdateProduit = ({ closeModal}) =>{
    let history = useHistory();
    const {id}= useParams();
    const [produit,setProduit] = useState({
        idprod:"",       
        designation:"",
        quantite:"",
        prix:"",
        devise:"",
        dateoperation:"",
        categorie:"",
        fournisseur:"",
    });
    const {designation,quantite,prix,devise,dateoperation,categorie,fournisseur,idprod} = produit;
    const handleChange = e =>{
        setProduit({...produit,[e.target.name] : e.target.value});
    };
    
    useEffect(() =>{
        loadProduit();
    },[]);

    const loadProduit = async e =>{
        const res = await axios.get(`http://localhost:82/backend/getProduit.php/${id}`);
        setProduit(res.data);
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:82/backend/editProduit.php/${id}`,produit);
        history.push("/");
    };

    return(
        <div className='container'>
            <div className='col-md-8 offset-2 mt-5 modalContainer'>
             <button className='btn btn-danger offset-11' onClick={()=>{closeModal(false)}}>X</button>
            <div className='body'>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="row">
                        <div className="col-md-5 ml-5 mt-3">
                            <div className="form-group">                                           
                                <input type="text" 
                                className="form-control" 
                                placeholder="id" name="idprod" 
                                onChange={e => handleChange(e)} 
                                value={id} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="designation">Designation</label>
                                <input type="text" 
                                className="form-control" 
                                placeholder="designation" 
                                name='designation' 
                                onChange={e => handleChange(e)} 
                                value={designation} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantite">Quantité</label>
                                <input type="number" 
                                className="form-control" 
                                placeholder="quantité"  
                                name='quantite' 
                                onChange={e => handleChange(e)} 
                                value={quantite} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prix">Prix unitaire</label>
                                <input type="number" 
                                className="form-control" 
                                placeholder="Prix unitaire" 
                                name='prix' 
                                onChange={e => handleChange(e)} 
                                value={prix} />
                            </div> 
                            <div className="form-group">
                                <label htmlFor="devise">Devise</label>
                            <select  
                                className="form-control" 
                                name='devise' 
                                onChange={e => handleChange(e)} 
                                value={devise}>
                                    <option>USD</option>
                                    <option>FC</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-md-5 ml-5 mt-3">
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input type="date" 
                                className="form-control" 
                                placeholder="designation" 
                                name='dateoperation' 
                                onChange={e => handleChange(e)} 
                                value={dateoperation} />
                            </div>                            
                            <div className="form-group">
                                <label htmlFor="categorie">Categorie Produit</label>
                                <select  
                                    className="form-control" 
                                    name='categorie' 
                                    onChange={e => handleChange(e)} 
                                    value={categorie} >
                                        <option>Ordinateur</option>
                                        <option>Cable</option>
                                        <option>Portable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fournisseur">Fournisseur</label>
                            <select  
                                className="form-control" 
                                name='fournisseur' 
                                onChange={e => handleChange(e)} 
                                value={fournisseur}>
                                    <option>Bob Ted</option>
                                    <option>Jolie ben</option>
                                    <option>Jeanine Katarine</option>
                            </select>
                            </div>
                            <div className="form-group">                               
                                <input type="submit" className="btn btn-primary col-md-6 mt-4" value="Modifier" />
                            </div> 
                        </div>
                    </div>
                </form>           
             </div>               
         </div>
     </div>
    )
}

export default UpdateProduit;
