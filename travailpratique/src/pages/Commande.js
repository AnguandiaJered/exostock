import React,{ useState,useEffect } from "react";
import ModalClient from "../Modals/ModalClient";
import ModalFournisseur from "../Modals/ModalFournisseur";
import UpdateCmdClient from '../Modals/UpdateCmdClient';
import UpdateCmdcompany from '../Modals/UpdateCmdcompany';
import { Link } from "react-router-dom";
import axios from 'axios';
import Addstock from "../Modals/Addstock";
import UpdateStock from "../Modals/UpdateStock";
import { useHistory } from "react-router-dom";


export const Commande=()=>{
    return(
        <div className='container'>
            
        </div>
    )
}
export const Commandeclients = () =>{
    let history = useHistory();    
    const [cmdclient,setCmdclient] = useState({
        idcmd:"",       
        client:"",
        produit:"",
        quantite:"",
        prix:"",
        devise:"",
        dateoperation:""
    });

    const {client,produit,quantite,prix,devise,dateoperation,idcmd} = cmdclient;
    const handleChange = e =>{
        setCmdclient({...cmdclient,[e.target.name] : e.target.value});
    }
    const onSubmit = async e =>{
        e.preventDefault();
      await axios.post('http://localhost:82/backend/saveCmdclient.php', cmdclient, {
            mode: 'no-cors',
          });
        history.push("/");
    }; 
    
    
    const [cmdclients,setCmdclients]=useState([]);

    useEffect(() =>{
        loadCmdclients();
    },[]);

    const loadCmdclients = async () => {
        const res = await axios.get("http://localhost:82/backend/viewcmdclient.php");
        setCmdclients(res.data.reverse());
    };

    const deleteCmdclient = (id) =>{
        axios.delete('http://localhost:82/backend/deleteCmdclient.php'+id)
        .then((res)=>{
            loadCmdclients();
        })
        .catch(() =>{
            alert('Erreur dans le code');
        });
    };
    const [openModal,setOpenModal]= useState(false);
    const [openModalup,setOpenModalup]= useState(false);

    return(
        <div>
        <div className="page-header">
            <div className="row">               
                <div className="pop mt-3">
                     <span className="fa fa-shopping-cart text-primary mt-2 faicone"></span>
                </div>
                <div className="mt-3 ml-3">
                     <h4>Commandes Client</h4>
                     <p>Clients</p>
                 </div>
            </div>               
        </div>
        { openModal && <ModalClient closeModal={setOpenModal}/>}
        { openModalup && <UpdateCmdClient closeModal={setOpenModalup}/>}
        <div className="container" id="conte">
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="col-md-5 ml-5 mt-3">                               
                                <div className="form-group">
                                    <label htmlFor="client">Clients</label>
                                    <select  
                                        className="form-control" 
                                        name='client' 
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
                                        name='produit' 
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
                                    name='quantite' 
                                    onChange={e => handleChange(e)} 
                                    value={quantite} />
                                </div>                                                    
                            </div>
                            <div className="col-md-5 ml-5 mt-3">
                            <div className="form-group">
                                <div className="form-group">
                                    <label htmlFor="prix">Prix unitaire</label>
                                    <input type="number" 
                                    className="form-control" 
                                    placeholder="Prix unitaire"
                                    name='prix' 
                                    onChange={e => handleChange(e)} 
                                    value={prix} />
                                </div>
                                    <label htmlFor="devise">Devise</label>
                                    <select  className="form-control" 
                                        name='devise' 
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
                                        name='dateoperation' 
                                        onChange={e => handleChange(e)} 
                                        value={dateoperation} />
                                </div>
                                <div className="form-group">                               
                                    <input type="submit" className="btn btn-primary col-md-6 mt-4" value="Enregistrer" />
                                </div> 
                            </div>
                        </div>
                    </form>
             <div>
                 <a onClick={()=>{setOpenModal(true)}} href="#" className="btn btn-primary offset-10"><i className="fa fa-plus"> Add Clients</i> </a>
                 <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Commande..." />
                 </form>
                 <table className="table table-bordered table-tripped table-hover mt-3">             
                     <thead className="text-center">
                         <tr>
                             <th>#</th>
                             <th>Clients</th>
                             <th>Produits</th>
                             <th>Quantité</th>
                             <th>Prix unitaire</th>
                             <th>Devise</th>
                             <th>Date</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         { 
                            cmdclients.map(liste=>(
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
                                  <Link onClick={() => deleteCmdclient(liste.id)} to="#" className="btn btn-danger ml-3" id="btd"><i className="fa fa-trash"></i></Link>
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
export const Entreprise = () =>{
    let history = useHistory();    
    const [cmdese,setCmdEse] = useState({
        idcmd:"",       
        fournisseur:"",
        produit:"",
        quantite:"",
        prix:"",
        devise:"",
        dateoperation:""
    });

    const {fournisseur,produit,quantite,prix,devise,dateoperation,idcmd} = cmdese;
    const handleChange = e =>{
        setCmdEse({...cmdese,[e.target.name] : e.target.value});
    };
    
    const onSubmit = async e =>{
        e.preventDefault();
      await axios.post('http://localhost:82/backend/saveCmdEse.php', cmdese, {
            mode: 'no-cors',
          });
        history.push("/");
    };


    const [cmdEses,setCmdEses]=useState([]);

    useEffect(() =>{
        loadEses();
    },[]);

    const loadEses = async () => {
        const res = await axios.get("http://localhost:82/backend/viewCmdEse.php");
        setCmdEses(res.data.reverse());
    };

    const deleteEse = (id) =>{
        axios.delete('http://localhost:82/backend/deleteCmdEse.php'+id)
        .then((res)=>{
            loadEses();
        })
        .catch(() =>{
            alert('Erreur dans le code');
        });
    };
    const [openModal,setOpenModal]= useState(false);
    const [openModalup,setOpenModalup]= useState(false);

    return(
        <div>
        <div className="page-header">
            <div className="row">               
                <div className="pop mt-3">
                     <span className="fa fa-shopping-cart text-primary mt-2 faicone"></span>
                </div>
                <div className="mt-3 ml-3">
                     <h4>Commandes Entreprise</h4>
                     <p>Fournisseurs</p>
                 </div>
            </div>               
        </div>
        { openModal && <ModalFournisseur closeModal={setOpenModal}/>}
        { openModalup && <UpdateCmdcompany closeModal={setOpenModalup}/>}
        <div className="container" id="conte">
                <form onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="col-md-5 ml-5 mt-3">                               
                                <div className="form-group">
                                    <label htmlFor="client">Fournisseurs</label>
                                    <select  
                                        className="form-control" 
                                        name='fournisseur' 
                                        onChange={e => handleChange(e)} 
                                        value={fournisseur} >
                                        <option>John</option>
                                        <option>Jered</option>
                                        <option>Patoraking</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="produit">Produit</label>
                                    <select  
                                        className="form-control" 
                                        name='produit' 
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
                                    name='quantite' 
                                    onChange={e => handleChange(e)} 
                                    value={quantite} />
                                </div>                                                    
                            </div>
                            <div className="col-md-5 ml-5 mt-3">
                            <div className="form-group">
                                <div className="form-group">
                                    <label htmlFor="prix">Prix unitaire</label>
                                    <input type="number" 
                                    className="form-control" 
                                    placeholder="Prix unitaire"
                                    name='prix' 
                                    onChange={e => handleChange(e)} 
                                    value={prix} />
                                </div>
                                    <label htmlFor="devise">Devise</label>
                                    <select  className="form-control" 
                                        name='devise' 
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
                                        name='dateoperation' 
                                        onChange={e => handleChange(e)} 
                                        value={dateoperation} />
                                </div>
                                <div className="form-group">                               
                                    <input type="submit" className="btn btn-primary col-md-6 mt-4" value="Enregistrer" />
                                </div> 
                            </div>
                        </div>
                    </form>
             <div>
                 <button onClick={()=>{setOpenModal(true)}} href="#" className="btn btn-primary offset-10"><i className="fa fa-plus"></i>Add Fournisseur</button>
                 <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Commande..." />
                </form>
                 <table className="table table-bordered table-tripped table-hover mt-3">
             
                     <thead className="text-center">
                         <tr>
                             <th>#</th>
                             <th>Fournisseurs</th>
                             <th>Produits</th>
                             <th>Quantité</th>
                             <th>Prix unitaire</th>
                             <th>Devise</th>
                             <th>Date</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                     { 
                            cmdEses.map(list=>(
                            <tr key={list.id}>
                                <td>{list.id}</td>
                                <td>{list.fournisseur}</td>
                                <td>{list.produit}</td>
                                <td>{list.quantite}</td>
                                <td>{list.prix}</td>
                                <td>{list.devise}</td>
                                <td>{list.dateoperation}</td>
                                <td>
                                  <Link onClick={()=>{setOpenModalup(true)}} to={list.id} className="btn btn-primary" id="btd"><i className="fa fa-pencil-square-o"></i></Link>
                                  <Link onClick={() => deleteEse(list.id)} to="#" className="btn btn-danger ml-3" id="btd"><i className="fa fa-trash"></i></Link>
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
