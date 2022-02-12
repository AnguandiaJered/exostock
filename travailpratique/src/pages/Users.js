import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Adduser from "../Modals/Adduser";
import Updateuser from "../Modals/Updateuser";

export const Parametre = () =>{
    return(
        <div className='container'>

        </div>
    )
}
export const Personnel = () =>{
    return(
        <div className='container'>

        </div>
    )
}

export const Users= ()=>{
    
    const [user,setUser]=useState([]);

    useEffect(() =>{
        loadUsers();
    },[]);

    const loadUsers = async () => {
        const res = await axios.get("http://localhost:82/backend/viewuser.php");
        setUser(res.data);
    };

    const deleteUser = (id) =>{
        axios.delete('http://localhost:82/backend/deleteuser.php'+id)
        .then((res)=>{
            loadUsers();
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
                     <span className="fa fa-users text-primary mt-2 faicone"></span>
                </div>
                <div className="mt-3 ml-3">
                     <h4>Nos utilisateurs</h4>
                     <p>Users</p>
                 </div>
            </div>               
        </div>
        { openModal && <Adduser closeModal={setOpenModal}/>}
        { openModalup && <Updateuser closeModal={setOpenModalup}/>}
        <div className="container" id="conte">             
             <div>
                 <a onClick={()=>{setOpenModal(true)}} href="#" className="btn btn-primary offset-10 mt-3"><i className="fa fa-plus">  Add User</i> </a>
                 <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Users..." />
                    </form>
                 <table className="table table-bordered table-tripped table-hover mt-3">
             
                     <thead className="text-center">
                         <tr>
                             <th>#</th>
                             <th>Noms</th>
                             <th>Username</th>
                             <th>Password</th>
                             <th>Role</th>                            
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         { user.map(liste =>(
                            <tr key={liste.id}>
                              <td>{liste.id}</td>
                              <td>{liste.noms}</td>
                              <td>{liste.username}</td>
                              <td>{liste.password}</td>                            
                              <td>{liste.role}</td>
                              <td>
                                  <Link onClick={()=>{setOpenModalup(true)}} to="#" className="btn btn-primary" id="btd"><i className="fa fa-pencil-square-o"></i></Link>
                                  <Link onClick={() => deleteUser(liste.id)} to="#" className="btn btn-danger ml-3" id="btd"><i className="fa fa-trash"></i></Link>
                              </td>
                            </tr>
                        ))}
                       
                     </tbody>
                 </table>              
                 <br />
                 <br />
             </div>
        </div>
     </div>
    )
}

export const AlerteStock = () =>{
    return(
        <div className='container'>

        </div>
    )
}
