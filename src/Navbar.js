import React from 'react';
import {icon, usrImg} from "./svgImages";

function Navbar() {
    return <nav className="navbar navbar-light navbar-expand-sm bg-warning fixed-top">
        <SidebarToggle/>
        <Title/>
        <SearchForm/>
        <User/>
    </nav>;
}

function SidebarToggle() {
    return <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebar"
                   aria-controls="left-sidebar" aria-expanded="false" aria-label="Toggle sidebar">
        <span className="navbar-toggler-icon"/>
    </button>;
}

function Title () {
    return <a className="navbar-brand" href="#">
        {icon}
        TODO Manager
    </a>;
}

function SearchForm() {
    return <form className="form-inline my-2 my-lg-0 mx-auto d-none d-sm-block" action="#" role="search"
                 aria-label="Quick search">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search query"/>
        {/*<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
    </form>;
}

function User() {
    return <div className="navbar-nav ml-md-auto">
        <a className="nav-item nav-link" href="#">
            {usrImg}
        </a>
    </div>;
}

export default Navbar;