import React from 'react';
import './test.css';
import { Redirect } from 'react-router-dom';
import request from 'superagent';

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: 2,
            numero: '',
            mensaje: '',
            objeto: {
                number: '',
                message: '',
                token: window.localStorage.getItem('token')
            }
        }     
    }
    render() {
        if (this.state.redirect === 1) {
            return <Redirect push to="/"/>
        } else if (this.state.redirect === 0){
            return <Redirect push to="/login"/>
        }
        return(
            <div>
                <div id="head">
                    <h2 style={{color: 'white', textAlign: 'left'}}>Api Test</h2>
                </div>
                <h4 style={{margin: '40px 30px'}}>Enviar Mensaje</h4>
                <div id="bodyTest" className="row justify-content-around">
                    <div className="col-5 menTest">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Número:</label>
                            <input type="number" class="form-control" id="exampleFormControlInput1" onChange={this.number.bind(this)} placeholder="593854652789"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Mensaje:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" onChange={this.mensa.bind(this)} placeholder="Hola, esto es una prueba."/>
                        </div>
                        <button type="button" class="btn btn-primary" onClick={this.send.bind(this)} style={{backgroundColor: 'black', borderColor: 'black', marginTop: '20px'}}>Enviar</button>
                    </div>
                    <div className="col-6 menTest">
                        <p className="objeto" style={{fontWeight: 'bold'}}>POST http://localhost:3000/api/sendMessage</p>
                        <p className="objeto">{'{'}</p>
                        <p className="objeto">number: "{this.state.numero}"</p>
                        <p className="objeto">message: "{this.state.mensaje}"</p>
                        <p className="objeto">token: "{window.localStorage.getItem('token')}" </p>
                        <p className="objeto">{'}'}</p>
                        <div class="form-group" style={{marginTop: '10px'}}>
                            <label for="exampleFormControlTextarea1">Respuesta:</label>
                            <textarea class="form-control" id="respuestaTest" rows="3" disabled></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    send() {
        document.getElementById('respuestaTest').innerHTML = '';
        request
            .post('http://localhost:3000/api/sendMessage')
            .send(this.state.objeto)
            .then(res => {
                const text = document.createTextNode(res.body.estado);
                document.getElementById('respuestaTest').appendChild(text);
            })
    }

    number(event) {
        this.setState({numero: event.target.value});
        this.state.objeto.number = event.target.value;
    }

    mensa(event) {
        this.setState({mensaje: event.target.value});
        this.state.objeto.message = event.target.value;
    }

    componentDidMount() {
        if (window.localStorage.getItem('token')) {
            if (window.localStorage.getItem('instancia') === '1') {
                console.log('ok');
            } else {
                this.setState({redirect: 1});
            }
        } else {
            this.setState({redirect: 0});
        }
    }
}
export default Test;