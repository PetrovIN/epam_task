import './ModalWindow.css'
import React from "react";
import cross from "./17047.png"


const ModalWindow = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <img src={cross} className="closeImg" width="20px" height="20px" onClick={handleClose} alt="cross" />
                </div>
                {children}
            </section>
        </div>
    );
};
export default ModalWindow;