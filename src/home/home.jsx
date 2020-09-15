import React from 'react';
import './home.css';
import * as request from 'superagent';
import { Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            url: <div class="text-center" style={{marginTop: '100px'}}>
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>,
            imagen: '',
            hola: ''
        }  
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/login"/>
        }
        return(
            <div id="homeBack">
                <div id="head">
                    <h2 style={{color: 'white', textAlign: 'left'}}>Home</h2>
                </div>
                <div>
                    {this.state.url}
                </div>
            </div>
        )
    }

    continuar () {
        const html = 
                <div id="qrCode">
                    <div style={{width: '55%', display: 'block', margin: '0 auto', backgroundColor: 'white', borderRadius: '5px', padding: '30px'}}>
                        <h3 style={{textAlign: 'center', margin: '20px'}}>Escanea el código QR: </h3>
                        <img src={this.state.imagen} style={{display: 'block', margin: '0 auto', backgroundColor: 'white'}}/>
                    </div>
                </div>;
        this.setState({url: html})
    }

    componentDidMount() {
        const socket = socketIOClient.connect('http://localhost:3000', {'forceNew': true});
        if (window.localStorage.getItem('token')) {
            const conectado = JSON.parse(window.localStorage.getItem('conectado'));
            this.setState({hola: conectado.nombre})
            document.getElementById('opt').removeAttribute('hidden');
            document.getElementById('content').className = 'col-10';
            this.setState({redirect: false});
            request
                .post('http://localhost:3000/api/qr')
                .send({'token': window.localStorage.getItem('token')})
                .then(res => {
                    console.log(res.body);
                });
            socket.on('qr', (img) => {
                console.log(img);
                if (img.logeado === 0) {
                    console.log('whait');
                    window.localStorage.setItem('instancia', '0');
                } else if (img.logeado === 1) {
                    window.localStorage.setItem('instancia', '0');
                    this.state.imagen = img.nombre;
                    const html =
                        <div id="qrCode">
                            <h2 style={{color: 'white', textAlign: 'center'}}>No tiene una instancia iniciada.</h2>
                            <h4 style={{color: 'white', textAlign: 'center'}}>Para iniciar la estancia siga los siguientes pasos: </h4>
                            <div className="row" style={{width: "100%"}}>
                                <div className="col-6" style={{padding: '18px', color: 'white', textAlign: 'left', fontSize: '20px'}}>
                                    <p>1. En su dispositivo movil ingrese en la aplicación de whatsapp.</p>
                                    <p>2. En el menú de opciones de la aplicación seleccione la opción de Whatsapp Web.</p>
                                    <p>3. Por último escanée el código QR que se le mostrará a continuación.</p>
                                    <button onClick={this.continuar.bind(this)} type="button" class="btn btn-primary" style={{backgroundColor: 'black', borderColor: 'black', marginTop: '20px'}}>Continuar</button>
                                </div>
                                <div className="col-6" style={{padding: '20px'}}>
                                    <img src="https://res.cloudinary.com/indev/image/upload/v1597720049/Assets/whatsapp-web-phone_qizays.png" width="60%" style={{display: 'block', margin: '0 auto'}}/>
                                </div>
                            </div>
                        </div>;
                    this.setState({url: html})
                } else if (img.logeado === 2) {
                    window.localStorage.setItem('instancia', '1');
                    const token = 'Token: ' + window.localStorage.getItem('token');
                    const html = 
                        <div style={{width: '90%', display: 'block', margin: '0 auto', padding: '30px'}}>
                            <div className="row">
                                <div className="col-6">
                                    <h3 style={{marginRight: '10px'}}>Instacia: Activa<i style={{color: 'rgb(56, 134, 89)', marginLeft: '10px'}} class="fa fa-check-circle"></i></h3>
                                </div>
                                <div className="col-6">
                                    <h3 style={{marginRight: '10px'}}>{token}<i style={{color: 'rgb(56, 134, 89)', marginLeft: '10px'}} class="fa fa-check-circle"></i></h3>
                                </div>
                            </div>
                            <h2 id="holaTal" style={{textAlign: 'center', marginTop: '150px'}}>¡Hola {this.state.hola}! Bienvenido a Guatsapp versión beta.</h2>
                        </div>;
                    this.setState({url: html});
                }
            });
        } else {
            document.getElementById('opt').setAttribute('hidden', '');
            document.getElementById('content').className = 'col-12';
            this.setState({redirect: true})
        }
    }
}
export default Home;