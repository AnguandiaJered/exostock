import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import ModalFournisseur from "../Modals/ModalFournisseur";
import UpdateFournisseur from "../Modals/UpdateFournisseur";

const Fournisseur= ()=>{

    const [fournisseur,setFournisseur]=useState([]);

    useEffect(() =>{
        loadFournisseurs();
    },[]);

    const loadFournisseurs = async () => {
        const res = await axios.get("http://localhost:82/backend/viewfournisseur.php");
        setFournisseur(res.data.reverse());
    };

    const deleteFournisseur = (id) =>{
        axios.delete('http://localhost:82/backend/deletefournisseur.php/'+id)
        .then((res)=>{
            loadFournisseurs();
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
                     <h4>Nos Fournisseurs</h4>
                     <p>fournisseur</p>
                 </div>
            </div>               
        </div>
        { openModal && <ModalFournisseur closeModal={setOpenModal}/>}
        { openModalup && <UpdateFournisseur closeModal={setOpenModalup}/>}
        <div className="container" id="conte">           
             <div>
                 <button onClick={()=>{setOpenModal(true)}} className="btn btn-primary offset-10 mt-3"><i className="fa fa-plus"></i>Add fournisseur</button>
                 <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Fournisseur..." />
                    </form>
                 <table className="table table-bordered table-tripped table-hover mt-3">
             
                     <thead className="text-center">
                         <tr>
                             <th>#</th>
                             <th>Nom</th>
                             <th>Prénom</th>
                             <th>Sexe</th>
                             <th>Adresse</th>
                             <th>Telephone</th>
                             <th>Email</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                        {
                            fournisseur.map(liste =>(
                            <tr key={liste.id}>
                                <td>{liste.id}</td>
                                <td>{liste.nom}</td>
                                <td>{liste.prenom}</td>
                                <td>{liste.sexe}</td>
                                <td>{liste.adresse}</td>
                                <td>{liste.telephone}</td>
                                <td>{liste.mail}</td>
                                <td>
                                  <Link onClick={()=>{setOpenModalup(true)}} to={liste.id} className="btn btn-primary" id="btd"><i className="fa fa-pencil-square-o"></i></Link>
                                  <Link onClick={() => deleteFournisseur(liste.id)} to="#" className="btn btn-danger ml-3" id="btd"><i className="fa fa-trash"></i></Link>
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

export default Fournisseur;