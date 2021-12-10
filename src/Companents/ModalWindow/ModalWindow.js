import './ModalWindow.css'
import React from "react";
import cross from "./17047.png"


const ModalWindow = ({ handleClose, show, item }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <img src={cross} className="closeImg" width="20px" height="20px" onClick={handleClose} alt="cross" />
                </div>
                <div>
                    <img src={item.picture.large} alt="avatar"/>
                    <ul>
                        <li>{`street: ${item.location.street}`}</li>
                        <li>{`city: ${item.location.city}`}</li>
                        <li>{`state: ${item.location.state}`}</li>
                        <li>{`email: ${item.email}`}</li>
                        <li>{`phone: ${item.phone}`}</li>
                        <li>{`postcode: ${item.location.postcode}`}</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};
export default ModalWindow;