import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/",
        icon: <AiIcons.AiFillHome />     
    },
    {
        title: "Fournisseur",
        path: "/fournisseur",
        icon: <FaIcons.FaUser />     
    },
    {
        title: "Entrées en Stock",
        path: "/aprovision",
        icon: <FaIcons.FaCartPlus />, 
        iconClosed:<IoIcons.IoIosArrowDown />,
        iconOpened :<IoIcons.IoIosArrowUp />,
        subNav:[
            {
                title: "Produits",
                path: "/produit",
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: "Aprovisionnement",
                path: "/aprovision",
                icon: <IoIcons.IoIosPaper />,
            }           
        ]
    },
    {
        title: "Clients",
        path: "/client",
        icon: <FaIcons.FaUser />     
    },
    {
        title: "Sorties en Stock",
        path: "/sortie",
        icon: <FaIcons.FaCartPlus />, 
        iconClosed:<IoIcons.IoIosArrowDown />,
        iconOpened :<IoIcons.IoIosArrowUp />,
        subNav:[
            {
                title: "Sorties",
                path: "/sorties",
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: "Pertes Produits",
                path: "/perte",
                icon: <IoIcons.IoIosPaper />,
            }           
        ]
    },
    {
        title: "Commandes",
        path: "/commandes",
        icon: <AiIcons.AiFillMacCommand />,
        iconClosed:<IoIcons.IoIosArrowDown />,
        iconOpened :<IoIcons.IoIosArrowUp />,
        subNav:[
            {
                title: "Commandes Clients",
                path: "/commandeclients",
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: "Nos Commandes",
                path: "/entreprise",
                icon: <FaIcons.FaCompressArrowsAlt />,
            }           
        ]
    },    
    {
        title: "Rapports",
        path: "/rapports",
        icon: <IoIcons.IoIosDocument /> 
    },
    {
        title: "Parametres",
        path: "/parametre",
        icon: <AiIcons.AiFillSetting />,
        iconClosed:<IoIcons.IoIosArrowDown />,
        iconOpened :<IoIcons.IoIosArrowUp />,
        subNav:[
            {
                title: "Personnel",
                path: "/agents",
                icon: <FaIcons.FaUser />
            },
            {
                title: "Nos utilisateurs",
                path: "/users",
                icon: <FaIcons.FaUser />,
            },
            {
                title: "Stock Alerte",
                path: "/alerte",
                icon: <IoIcons.IoIosPaper />,
            }             
        ]
    }
];