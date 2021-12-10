import React from "react";
import ModalWindow from './ModalWindow/ModalWindow'
import './Main.css'
import Select from "react-select";


const options = [
    {value: 'SortByAlphabet', label:'Сортировка по алфавиту'},
    {value: 'SortByReverseAlphabet', label:'Обратная сортировка'}
];

export default class Main extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        items: [],
        modalIsOpen: false,
        setIsOpen: false,
        modalId: 0,
        selectedOption: null
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

    sortByFirstName = (selectedOption) => {
        this.setState({selectedOption});
        this.state.items.sort((a, b) => {
            if (selectedOption.value === "SortByReverseAlphabet") {
            return b.name.first.localeCompare(a.name.first)
            } else if (selectedOption.value === "SortByAlphabet") {
                return a.name.first.localeCompare(b.name.first)
            }
            return this.state.items;
        })

    }

    _renderError = () => <p>Error {this.state.error.message}</p>

    _renderLoading = () => <p>Loading...</p>

    render() {
        const {error, isLoaded, items, modalId, selectedOption} = this.state;

        if (error) {
            return this._renderError()
        }

        if (!isLoaded) {
            return this._renderLoading()
        }

        return (
            <div className="content-container">
                <div>
                    <Select
                        value = {selectedOption}
                        onChange = {this.sortByFirstName}
                        options = {options}
                        defaultValue={'SortByAlphabet'}
                    />
                </div>
                <div>
                    <ul className="ul-content">
                        {items.map(( item, i) => (
                            <li className="li-content" key={ i }>
                                <img src={ item.picture.medium } onClick={() => { this.openModal(i) }} alt="avatar"/><br/>
                                <ModalWindow show={this.state.setIsOpen && modalId === i} handleClose={ this.closeModal } item={item} />
                                <span>{`${ item.name.title }. ${ item.name.first } ${ item.name.last }`}</span> <br/><br/><br/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}