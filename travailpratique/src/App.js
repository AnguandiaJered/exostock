import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Fournisseur from './pages/Fournisseur';
import {Sortie,Sorties,Perteproduit} from './pages/Sortie';
import {Commande,Commandeclients,Entreprise} from './pages/Commande';
import Rapport from './pages/Rapport';
import {Parametre,Users,Personnel,AlerteStock} from './pages/Users';
import ErrorPage from './pages/ErrorPage';
import Client from './pages/Client';
import {Approvision,Produit,Aprovisionnement} from './pages/Produit';

function App() {
  return (
    <Router>
      <Sidebar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/fournisseur' component={Fournisseur} />
          <Route path='/aprovision' component={Approvision} />          
          <Route path='/produit' component={Produit} />           
          <Route path='/aprovision' component={Aprovisionnement} />           
          <Route path='/client' component={Client} />
          <Route path='/sortie' component={Sortie} />
          <Route path='/sorties' component={Sorties} />
          <Route path='/perte' component={Perteproduit} />
          <Route path='/commandes' component={Commande} />
          <Route path='/commandeclients' component={Commandeclients} />
          <Route path='/entreprise' component={Entreprise} />
          <Route path='/rapports' component={Rapport} />
          <Route path='/parametre' component={Parametre} />
          <Route path='/agents' component={Personnel} />
          <Route path='/users' component={Users} />
          <Route path='/alerte' component={AlerteStock} />
          <Route component={ErrorPage} />
        </Switch>      
    </Router>
  );
}

export default App;
