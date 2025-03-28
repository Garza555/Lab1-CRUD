import React from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table,Button,Container,FormGroup,
Modal,ModalHeader,ModalBody,ModalFooter,
Form,
} from "reactstrap";

const data = [
    { id: 1, nombre: "Rodrigo Garza", empresa: "Tec", puesto:"Software Architect / Flex", expertise:"Senior", edad: 21 },
    { id: 2, nombre: "Ana Aramoni", empresa: "Tec", puesto:"Backend Developer", expertise:"Senior", edad: 21 },
    { id: 3, nombre: "Yuting Lin", empresa: "Tec", puesto:"QA Engineer & Tester", expertise:"Senior", edad: 21 },
    { id: 4, nombre: "René Macías", empresa: "Tec", puesto:"SCRUM Master / Flex", expertise:"Senior", edad: 21 },
    { id: 5, nombre: "Eugenio Mejía", empresa: "Tec", puesto:"Database Engineer", expertise:"Senior", edad: 21 },
    { id: 6, nombre: "Pedro Palafox", empresa: "Tec", puesto:"Frontend Developer", expertise:"Senior", edad: 21 },
    
];

class Managers extends React.Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            nombre: "",
            empresa: "",
            puesto: "",
            expertise: "",
            edad: "",
        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                arreglo[contador].nombre = dato.nombre;
                arreglo[contador].empresa = dato.empresa;
                arreglo[contador].puesto = dato.puesto;
                arreglo[contador].expertise = dato.expertise;
                arreglo[contador].edad = dato.edad;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };
       
    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }};
    
    insertar= ()=>{
        var valorNuevo= {...this.state.form};
        valorNuevo.id=this.state.data.length+1;
        var lista= this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }

    handleChange = (e) => {
        this.setState({
            form: {...this.state.form,
            [e.target.name]: e.target.value,
            },
        });
    };

    render () {
    return (
        <>
        <Container>
            <br />
                <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
            <br />
            <br />
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Puesto</th>
                            <th>Expertise</th>
                            <th>Edad</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombre}</td>
                                <td>{dato.empresa}</td>
                                <td>{dato.puesto}</td>
                                <td>{dato.expertise}</td>
                                <td>{dato.edad}</td>
                                <td>
                                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)} >Editar</Button>{" "}
                                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div><h3>Insertar nombre</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id: </label>
                        <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre: </label>
                        <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Empresa: </label>
                        <input className="form-control" name="empresa" type="text" onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Puesto: </label>
                        <input className="form-control" name="puesto" type="text" onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Expertise: </label>
                        <input className="form-control" name="expertise" type="text" onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Edad: </label>
                        <input className="form-control" name="edad" type="text" onChange={this.handleChange}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.insertar()} >Insertar </Button>
                    <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}
                    >Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalActualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label> Id:</label>
                        <input className="form-control" readOnly type="text" value={this.state.form.id} />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre:</label>
                        <input className="form-control" name="nombre" type="text"
                        onChange={this.handleChange} value={this.state.form.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <label>Empresa:</label>
                        <input className="form-control" name="empresa" type="text"
                        onChange={this.handleChange} value={this.state.form.empresa} />
                    </FormGroup>
                    <FormGroup>
                        <label>Puesto:</label>
                        <input className="form-control" name="puesto" type="text"
                        onChange={this.handleChange} value={this.state.form.puesto} />
                    </FormGroup>
                    <FormGroup>
                        <label>Expertise:</label>
                        <input className="form-control" name="expertise" type="text"
                        onChange={this.handleChange} value={this.state.form.expertise} />
                    </FormGroup>
                    <FormGroup>
                        <label>Edad:</label>
                        <input className="form-control" name="edad" type="text"
                        onChange={this.handleChange} value={this.state.form.edad} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.editar(this.state.form)} >
                    Editar</Button>
                    <Button color="danger" onClick={() => this.cerrarModalActualizar()} >
                    Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
    } 
}
export default Managers