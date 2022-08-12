import React from 'react';
import "./Main.css";

function Main(props) {
    return (
        <div className="container">
            <div className="row content">
                <div className="text-left container" id="main_contex">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Main;