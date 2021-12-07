import React from "react";
import ModalWindow from './ModalWindow/ModalWindow'

export default class Main extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        items: [],
        modalIsOpen: false,
        setIsOpen: false,
        modalId: 0,
        array: [],
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

    sortByFirstName = (event) => {
        this.setState({value: event.target.value})
        this.state.items.map((obj) => {
            this.state.array.push(obj);
            if (this.state.value === "sortByAlphabet") {
                return this.state.array.sort((a, b) => a.name.first.localeCompare(b.name.first));
            } else {
                return this.state.array.sort((a, b) => b.name.first.localeCompare(a.name.first));
            }
        })
    }
        /*this.state.array.push(object.name.first);
        return this.state.array.sort((a,b) => a.localeCompare(b));*/



   // _renderError = () => <p>Error {this.state.error.message}</p>

   // _onClose = () => this.setState({ activeId: null })

    render() {
        const {error, isLoaded, array} = this.state;

        // return(
        //     <div>
        //         <ItemsList />
        //         {this.state.activeId && <ModalWindow item={items[this.state.activeId]} onCLose={this._onClose} />}
        //     </div>
        // )

        if (error) {
            return <p>Error {error.message}</p>
        }

        if (!isLoaded) {
            return <p>Loading...</p>
        }

        return (
            <div className="content-container">
                <select id="selectSort" onChange={this.sortByFirstName}>
                    <option id="sortByAlphabet" value="Сортировка по алфавиту">Сортировка по алфавиту</option>
                    <option id="sortByReverseAlphabet" value="Обратная сортировка">Обратная сортировка</option>
                </select>
                <ul>
                    {array.map((item, i) => (
                        <li key={i}>
                            {/*SortByName array={this.state.array} object={this.state.items}*/}
                            <img src={item.picture.medium} onClick={() => { this.openModal(i) }} alt="avatar"/>
                            <ModalWindow show={ this.state.setIsOpen && this.state.modalId === i } handleClose={ this.closeModal }>
                                <img src={item.picture.large} alt="avatar"/>
                                <ul>
                                    <li>{"street: " + item.location.street}</li>
                                    <li>{"city: " + item.location.city}</li>
                                    <li>{"state: " + item.location.state}</li>
                                    <li>{"email: " + item.email}</li>
                                    <li>{"phone: " + item.phone}</li>
                                    <li>{"postcode: " + item.location.postcode}</li>
                                </ul>
                            </ModalWindow><br/>
                            <span>{`${item.name.title}. ${item.name.first} ${item.name.last}`}</span> <br/><br/><br/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}