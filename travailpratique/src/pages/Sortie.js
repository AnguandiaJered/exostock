import React,{ useState,useEffect } from "react";
import ModalClient from "../Modals/ModalClient";
import UpdateSortie from "../Modals/UpdateSortie";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export const Sortie = () =>{
    return(
        <div className='container'>

        </div>
    )
}
export const Sorties= () =>{
    let history = useHistory();    
    const [sortie,setSortie] = useState({      
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
    
    const onSubmit = async e =>{
        e.preventDefault();
      await axios.post('http://localhost:82/backend/saveSortie.php', client, {
            mode: 'no-cors',
          });
        history.push("/");
    };
    
    
    const [sorties,setSorties]=useState([]);

    useEffect(() =>{
        loadSorties();
    },[]);

    const loadSorties = async () => {
        const res = await axios.get("http://localhost:82/backend/viewSortie.php");
        setSorties(res.data.reverse());
    };

    const deleteSortie = (id) =>{
        axios.delete('http://localhost:82/backend/deleteSortie.php'+id)
        .then((res)=>{
            loadSorties();
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
                     <h4>Sorties</h4>
                     <p>Clients</p>
                 </div>
            </div>               
        </div>       
        { openModal && <ModalClient closeModal={setOpenModal}/>}
        { openModalup && <UpdateSortie closeModal={setOpenModalup}/>}
        <div className="container" id="conte">
        <form onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="col-md-5 ml-5 mt-3">                            
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
                                        name='prix' 
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
                            <input type="submit" className="btn btn-primary col-md-3 mt-3 offset-1" value="Enregistrer" />
                        </div> 
                    </form>
           
             <div>
                 <a onClick={()=>{setOpenModal(true)}} href="#" className="btn btn-primary offset-10"><i className="fa fa-plus"> Add Client</i> </a>
                 <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Vente..." />
                    </form>
                 <table className="table table-bordered table-tripped table-hover mt-3">
             
                     <thead className="text-center">
                         <tr>
                             <th>#</th>
                             <th>Clients</th>
                             <th>Produit</th>
                             <th>Quantité</th>
                             <th>Prix unitaire</th>
                             <th>Devise</th>
                             <th>Date</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                             sorties.map(liste =>(
                            <tr key={liste.id}>
                                <td>{liste.id}</td>
                                <td>{liste.client}</td>
                                <td>{liste.produit}</td>
                                <td>{liste.quantite}</td>
                                <td>{liste.prix}</td>
                                <td>{liste.devise}</td>
                                <td>{liste.dateoperation}</td>
                                <td>
                                    <Link onClick={()=>{setOpenModalup(true)}} to={/edit/+ liste.id} className="btn btn-primary" id="btd"><i className="fa fa-pencil-square-o"></i></Link>
                                    <Link onClick={() => deleteSortie(liste.id)} to="#" className="btn btn-danger ml-3" id="btd"><i className="fa fa-trash"></i></Link>
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

export const Perteproduit = () =>{
    return(
        <div className='container'>

        </div>
    )
}