import React from 'react';

function UsernameInput() {
    return (
        <div className="container">
            <h2 className="text-center m-2">
                Enter your github username
            </h2>
            <form className="text-center">
                <input
                    type="text"
                    className="form-control m-2"
                />
                <button
                    className="btn btn-outline-success"
                >
                    Send Invitation
                </button>
            </form>
        </div>
    );
}

export default UsernameInput;
