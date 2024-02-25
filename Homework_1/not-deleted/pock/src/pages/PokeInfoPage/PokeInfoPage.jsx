import React from 'react';
import { Link } from 'react-router-dom';
import StatBlock from './components/StatBlock/StatBlock';
import './PokeInfoPage.css'
import { useParams } from 'react-router-dom';

const PokeInfoPage = () => {

    let {name} = useParams()

    return (
        <div className="wrapper">
            <div className="header-info">
                <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                    <path d="M14 7l-5 5 5 5V7z" fill="white"/>
                </svg>

                </Link>
            </div>
            <div className="content-info">
                <StatBlock name = {name}/>
            </div>
        </div>
    );
};

export default PokeInfoPage;