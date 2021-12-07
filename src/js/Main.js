import React from "react";
import ModalWindow from './ModalWindow'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            modalIsOpen: false,
            setIsOpen: false,
            modalId: 0
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal = (modalId) => this.setState({
                                    modalId,
                                    setIsOpen: !this.state.setIsOpen
                            })


    closeModal = () => this.setState({setIsOpen: !this.state.setIsOpen});


    componentDidMount() {
        fetch("https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.results
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const{error, isLoaded, items} = this.state;
        if (error) {
            return <p>Error {error.message}</p>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return(
                <ul>
                    {items.map((item, i) => (
                        <li key={item.name} >
                            <img src={item.picture.medium} onClick={() => {this.openModal(i)}} alt="picture"/>
                            <ModalWindow show={this.state.setIsOpen && this.state.modalId === i} handleClose={this.closeModal}>
                                <img src={item.picture.large} alt="picture"/>
                                <ul>
                                    <li>{"street: " + item.location.street}</li>
                                    <li>{"city: " + item.location.city}</li>
                                    <li>{"state: " + item.location.state}</li>
                                    <li>{"email: " + item.email}</li>
                                    <li>{"phone: " + item.phone}</li>
                                    <li>{"postcode: " + item.location.postcode}</li>
                                </ul>
                            </ModalWindow><br/>
                            <button onClick={() => {this.openModal(i)}}>{item.name.title + "." + item.name.first + " " + item.name.last}</button> <br/><br/><br/>
                        </li>
                    ))}
                </ul>
            )
        }
    }
}