import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {
    PopupboxManager,
    PopupboxContainer
  } from 'react-popupbox';
  import "react-popupbox/dist/react-popupbox.css"
class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nombre: '', email: '', celular: '', rango: '' ,errors:{}};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    openPopupbox() {
        const content = (
          <div>
              <h3>Tu información fue enviada con éxito, estaremos en contacto contigo</h3>
          </div>
        )
        PopupboxManager.open({ content })
      }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleValidation() {
        let errors = {};
        let formIsValid = true;
        //Nombre
        if (!this.state.nombre) {
            formIsValid = false;
            errors["nombre"] = "El nombre no puede estar vacio";
        }
        //Email
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "El email no puede estar vacio";
        }
        if (typeof this.state.email !== "undefined") {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "El email no coincide con el formato";
            }
        }
        if (!this.state.celular) {
            formIsValid = false;
            errors["celular"] = "El celular no puede estar vacio";
        }
        if (!this.state.rango) {
            formIsValid = false;
            errors["rango"] = "El rango no puede estar vacio";
        }
        if (this.state.rango<18||this.state.rango>100) {
            formIsValid = false;
            errors["rango"] = "El rango no puede ser menor a 18 ni mayor a 100";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    validateEmail(email) {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if (result === true) {
            this.setState({
                emailError: false,
                email: email
            })
        } else {
            this.setState({
                emailError: true
            })
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            const params = {
                nombre: this.state.nombre,
                email: this.state.email,
                celular: this.state.celular,
                rango: this.state.rango
            }
            this.openPopupbox();
            console.log(params);
            setTimeout(() => {
                PopupboxManager.close()
            }, 5000);
        } 
    }
    render() {
        return (
            <Container>
                <h5>Hola, bienvenido, sabemos que quieres viajar en un {this.props.company},por favor diligencia el siguiente formulario:</h5>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Nombre completo </Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nombre completo" name="nombre" value={this.state.nombre} onChange={this.handleChange} />
                        <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Ingrese su email" name="email" value={this.state.email} onChange={this.handleChange} />
                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                    </Form.Group>
                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese su celular" name="celular" value={this.state.celular} onChange={this.handleChange} />
                        <span style={{ color: "red" }}>{this.state.errors["celular"]}</span>
                    </Form.Group>
                    <Form.Group controlId="formBasicAge">
                        <Form.Label>Rango de edad</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese su rango de edad" name="rango" value={this.state.rango} onChange={this.handleChange} />
                        <span style={{ color: "red" }}>{this.state.errors["rango"]}</span>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </form>
                <PopupboxContainer />
            </Container>
        )
    }
}
export default FormComponent