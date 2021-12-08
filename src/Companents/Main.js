import React from "react";
import ModalWindow from './ModalWindow/ModalWindow'
import './Main.css'

export default class Main extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        items: [],
        modalIsOpen: false,
        setIsOpen: false,
        modalId: 0,
        value: ""
    }


    componentDidMount() {
        fetch("https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture")
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: response.results
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

    openModal = (modalId) => this.setState({
                                    modalId,
                                    setIsOpen: !this.state.setIsOpen
                            })


    closeModal = () => this.setState({setIsOpen: !this.state.setIsOpen});

    sortByFirstName = (e) => {
        this.setState({value: e.target.value})
        this.state.items.sort((a, b) => {
            if (this.state.value === "Сортировка по алфавиту") {
                return b.name.first.localeCompare(a.name.first)
            } else if (this.state.value === "Обратная сортировка") {
                return a.name.first.localeCompare(b.name.first)
            }
            return this.state.items;
        })
    }

    _renderError = () => <p>Error {this.state.error.message}</p>

    _renderLoading = () => <p>Loading...</p>

   // _onClose = () => this.setState({ activeId: null })

    render() {
        const {error, isLoaded, items, modalId} = this.state;

        // return(
        //     <div>
        //         <ItemsList />
        //         {this.state.activeId && <ModalWindow item={items[this.state.activeId]} onCLose={this._onClose} />}
        //     </div>
        // )

        if (error) {
            return this._renderError()
        }

        if (!isLoaded) {
            return this._renderLoading()
        }

        return (
            <div className="content-container">
                <select id="selectSort" onChange={this.sortByFirstName}>
                    <option id="sortByAlphabet" value="Сортировка по алфавиту" >Сортировка по алфавиту</option>
                    <option id="sortByReverseAlphabet" value="Обратная сортировка">Обратная сортировка</option>
                </select>
                <div>
                    <ul className="ul-content">
                        {items.map(( item, i) => (
                            <li className="li-content" key={ i }>
                                <img src={ item.picture.medium } onClick={() => { this.openModal(i) }} alt="avatar"/><br/>
                                <ModalWindow show={this.state.setIsOpen && modalId === i}
                                              handleClose={this.closeModal}>
                                    <img src={item.picture.large} alt="avatar"/>
                                    <ul>
                                        <li>{`street: ${item.location.street}`}</li>
                                        <li>{`city: ${item.location.city}`}</li>
                                        <li>{`state: ${item.location.state}`}</li>
                                        <li>{`email: ${item.email}`}</li>
                                        <li>{`phone: ${item.phone}`}</li>
                                        <li>{`postcode: ${item.location.postcode}`}</li>
                                    </ul>
                                </ModalWindow>
                                <span>{`${ item.name.title }. ${ item.name.first } ${ item.name.last }`}</span> <br/><br/><br/>
                            </li>
                        ))}
                    </ul>
                    {/*<ModalWindow show={ this.state.setIsOpen } items={items[modalId]} handleClose={ this.closeModal() }/>*/}
                </div>
            </div>
        )
    }
}