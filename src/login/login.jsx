import React from 'react';
import './login.css';
import * as request from 'superagent';
import BotonEmail from '../../assets/inputEmail.jsx';
import BotonPass from '../../assets/inputPass.jsx';
import BotonName from '../../assets/inputNombre.jsx';
import BotonId from '../../assets/inputCedula.jsx';
import { Redirect } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        };
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>
        }
        return(
            <div className="row" id="logiin">
                <div className="col-8" id="info">
                    <img id="logoGua" src="https://res.cloudinary.com/indev/image/upload/v1597686952/Assets/Captura_de_pantalla_de_2020-08-17_12-54-04_wo6adr.png"/>
                </div>
                <div className="col-4" id="log">
                    <div id="espacio" style={{padding: '5px', marginBottom: '0px'}}></div>
                    <h2 id="loggin2" style={{marginBottom: '20px', textAlign: 'center', color: 'white'}}>Iniciar Sesión</h2>
                    <h2 id="singIn2" hidden style={{marginBottom: '20px', textAlign: 'center', color: 'white'}}>Crear Cuenta</h2>
                    <div id="loginFondo">
                        <div id="logForm">
                            <div id="singIn1" hidden>
                                <BotonName />
                                <BotonId />
                                <BotonEmail />
                                <BotonPass />
                                <small id="help" style={{color: 'red', marginBottom: '10px'}} hidden>Correo o contraseña incorrectos.</small>
                                <div>
                                    <button type="button" class="btn btn-primary" onClick={this.enviar2.bind(this)} style={{color: 'white', backgroundColor: 'black', borderColor: 'black', margin: '10px'}}>Continuar</button>
                                </div>
                            </div>
                            <div id="loggin1">
                                <BotonEmail/>
                                <BotonPass/>
                                <small id="help2" style={{color: 'red', marginBottom: '10px'}} hidden>Correo o contraseña incorrectos.</small>
                                <div>
                                    <button type="button" class="btn btn-primary" onClick={this.enviar.bind(this)} style={{color: 'white', backgroundColor: 'black', borderColor: 'black', margin: '10px'}}>Continuar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <small className="noCuenta" lang="1" id="loggin" onClick={this.cambiarCuenta.bind(this)}>¿No tienes una cuenta? Da click aquí para crear una.</small>
                    <small hidden className="noCuenta" lang="2" id="singIn" onClick={this.cambiarCuenta.bind(this)}>¿Ya tienes una cuenta? Da click aquí para ingresar.</small>
                </div>
            </div>
        )
    }

    cambiarCuenta(event) {
        if (event.target.lang === '1') {
            document.getElementById('loggin').setAttribute('hidden', '');
            document.getElementById('loggin1').setAttribute('hidden', '');
            document.getElementById('loggin2').setAttribute('hidden', '');
            document.getElementById('singIn').removeAttribute('hidden');
            document.getElementById('singIn1').removeAttribute('hidden');
            document.getElementById('singIn2').removeAttribute('hidden');
        } else {
            document.getElementById('singIn').setAttribute('hidden', '');
            document.getElementById('singIn1').setAttribute('hidden', '');
            document.getElementById('singIn2').setAttribute('hidden', '');
            document.getElementById('loggin').removeAttribute('hidden');
            document.getElementById('loggin1').removeAttribute('hidden');
            document.getElementById('loggin2').removeAttribute('hidden');
        }
    }

    enviar() {
        const email = window.sessionStorage.getItem('mail');
        const password =  window.sessionStorage.getItem('pass');
        request
            .post('http://localhost:3000/api/login')
            .send({'email': email, 'password': password})
            .then(res => {
                console.log(res.body);
                if (res.body.responde) {
                    document.getElementById('help2').innerHTML = res.body.responde;
                    document.getElementById('help2').removeAttribute('hidden');
                    this.setState({redirect: false});
                } else {
                    document.getElementById('help').setAttribute('hidden', '');
                    window.localStorage.setItem('token', res.body.token);
                    window.localStorage.setItem('conectado', JSON.stringify(res.body.dataUser));
                    this.setState({redirect: true});
                }
            });
    }

    enviar2 () {
        const email = window.sessionStorage.getItem('mail');
        const password =  window.sessionStorage.getItem('pass');
        const nombres = window.sessionStorage.getItem('name');
        const id = window.sessionStorage.getItem('id');
        request
            .post('http://localhost:3000/api/singin')
            .send({'email': email, 'password': password, 'nombres': nombres, 'id': id})
            .then(res => {
                console.log(res.body);
                if (res.body.responde) {
                    document.getElementById('help').innerHTML = res.body.responde;
                    document.getElementById('help').removeAttribute('hidden');
                    this.setState({redirect: false});
                } else {
                    document.getElementById('help').setAttribute('hidden', '');
                    window.localStorage.setItem('token', res.body.token);
                    window.localStorage.setItem('conectado', JSON.stringify(res.body.dataUser));
                    this.setState({redirect: true});
                }
            }) 
    }

    componentDidMount() {
        request
            .get('http://localhost:3000/')
            .then(res => {
                console.log(res.body);
            })
        const largo = window.screen.height + 'px';
        document.getElementById('logiin').style.height = largo;
        document.getElementById('logoGua').style.marginTop = ((window.screen.height/2) - 200) + 'px';
        document.getElementById('espacio').style.marginTop = ((window.screen.height/2) - 250) + 'px';
        /*if (window.localStorage.getItem('token')) {
            this.setState({redirect: true});
        } else {
            this.setState({redirect: false});
        }*/
    }
}

export default Login;