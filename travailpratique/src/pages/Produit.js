import React,{ useState,useEffect } from "react";
import Categorie from "../Modals/Categorie";
import UpdateProduit from '../Modals/UpdateProduit';
import { Link } from "react-router-dom";
import axios from 'axios';
import Addstock from "../Modals/Addstock";
import UpdateStock from "../Modals/UpdateStock";
import { useHistory } from "react-router-dom";

export const Approvision=()=>{
    return(
        <div className='container'>
            
        </div>
    )
}

export const Produit= ()=>{
    let history = useHistory();    
    const [produit,setProduit] = useState({       
        designation:"",
        quantite:"",
        prix:"",
        devise:"",
        dateoperation:"",
        categorie:"",
        fournisseur:"",
    });
    const {designation,quantite,prix,devise,dateoperation,categorie,fournisseur} = produit;
    const handleChange = e =>{
        setProduit({...produit,[e.target.name] : e.target.value});
    };
    
    const onSubmit = async e =>{
        e.preventDefault();
      await axios.post('http://localhost:82/backend/saveProduit.php', produit, {
            mode: 'no-cors',
          });
        history.push("/");
    };  

    const [produits,setProduits]=useState([]);

    useEffect(() =>{
        loadProduits();
    },[]);

    const loadProduits = async () => {
        const res = await axios.get("http://localhost:82/backend/viewproduit.php");
        setProduits(res.data.reverse());
    };

    const deleteProduit = (id) =>{
        axios.delete('http://localhost:82/backend/deleteProduit.php'+id)
        .then((res)=>{
            loadProduits();
        })
        .catch(() =>{
            alert('Erreur dans le code');
        });
    };

    const [openModal,setOpenModal]= useState(false);
    const [openModalup,setOpenModalup]= useState(false);

    return(
        <div className="">
           
           <div className="page-header">
               <div className="row">               
                   <div className="pop mt-3">
                        <span className="fa fa-shopping-cart text-primary mt-2 faicone"></span>
                   </div>
                   <div className="mt-3 ml-3">
                        <h4>Nos Produits</h4>
                        <p>Produits</p>
                    </div>
               </div>               
           </div>
           { openModal && <Categorie closeModal={setOpenModal}/>}
           { openModalup && <UpdateProduit closeModal={setOpenModalup}/>}
           <div className="container" id="conte">
           <form onSubmit={e => onSubmit(e)}>
                    <div className="row">
                        <div className="col-md-5 ml-5 mt-3">                           
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
                                <label htmlFor="devise">Fournisseur</label>
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
            <div>
                   
                    <a onClick={()=>{setOpenModal(true)}} href="#" className="btn btn-primary offset-10"><i className="fa fa-plus"> Add Categorie</i> </a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Product..." />
                    </form>
                    <table className="table table-bordered table-tripped table-hover mt-3">
                
                        <thead className="text-center">
                            <tr>
                                <th>#</th>
                                <th>Designation</th>
                                <th>Quantité</th>
                                <th>Prix unitaire</th>
                                <th>Devise</th>
                                <th>Categorie</th>
                                <th>Fournisseur</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                produits.map(liste =>(
                                <tr key={liste.id}>
                                    <td>{liste.id}</td>
                                    <td>{liste.designation}</td>
                                    <td>{liste.quantite}</td>
                                    <td>{liste.prix}</td>
                                    <td>{liste.devise}</td>
                                    <td>{liste.dateoperation}</td>
                                    <td>{liste.categorie}</td>
                                    <td>{liste.fournisseur}</td>
                                    <td>
                                        <Link onClick={()=>{setOpenModalup(true)}} to={/edit/+ liste.id} className="btn btn-primary" id="btd"><i className="fa fa-pencil-square-o"></i></Link>
                                        <Link onClick={() => deleteProduit(liste.id)} to="#" className="btn btn-danger ml-3" id="btd"><i className="fa fa-trash"></i></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table><br />
                 <br />
                </div>
           </div>
        </div>
    )
}

export const Aprovisionnement = () =>{
    return(
        <div className='container'>

        </div>
    )
}