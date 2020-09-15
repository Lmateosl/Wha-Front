import React from 'react';
import './menu.css';
import { NavLink } from 'react-router-dom';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }     
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/login"/>
        }
        return(
            <div id="menuBack">
                <h3 style={{textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '20px', paddingBottom: '10px', marginBottom: '20px'}}>Guatsapp</h3>
                <div id="menuIn">
                    <div className="optMenu">
                        <NavLink to="/" className="menuIcon"><p style={{marginBottom: '0px'}}><i class="fa fa-home" style={{marginRight: '10px'}}></i>Home</p></NavLink>
                    </div>
                    <div className="optMenu">
                        <NavLink to="/test" className="menuIcon"><p style={{marginBottom: '0px'}}><i class="fa fa-pencil-square-o" style={{marginRight: '10px'}}></i>Api Test</p></NavLink>
                    </div>
                    <div className="optMenu" onClick={this.logout.bind(this)}>
                        <NavLink to="/documentation" className="menuIcon"><p style={{marginBottom: '0px'}}><i class="fa fa-bookmark" style={{marginRight: '10px'}}></i>Documentation</p></NavLink>
                    </div>
                    <div className="optMenu" onClick={this.logout.bind(this)}>
                        <NavLink to="/test" className="menuIcon"><p style={{marginBottom: '0px'}}><i class="fa fa-user-times" style={{marginRight: '10px'}}></i>Logout</p></NavLink>
                    </div>
                </div>
            </div>
        )
    }

    logout() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('conectado');
        window.location.reload();
    }

    componentDidMount() {
        document.getElementById('menuBack').style.height = (window.screen.height - 110) + 'px';
    }
}
export default Menu;