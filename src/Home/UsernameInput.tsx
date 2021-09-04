import React, { useEffect, useState } from 'react';

function UsernameInput() {
    const [username, setUsername] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [currentMembers, setCurrentMembers] = useState([]);
    const [pendingMembers, setPendingMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const apiEndpoint = "https://company-website-api.herokuapp.com/";
    const sendInvitation = async () => {
        // Call our api to send invitation to user.
        // Set api response
        fetch(apiEndpoint + "users/invite", {
            method: "POST",
            body: JSON.stringify({ Login: username })
        }).then(
            (res) => setApiResponse(
                "Hey " + username + " here is your api response: " + res.status + " " + res.statusText)
        ).catch(
            (error) => console.error(error)
        );
    }

    const makeListItem = (member: string) => {
        return <li key={member}>{member}</li>;
    }

    const getMembers = async () => {
        const extractUsername = (user: any) => user.login;
        fetch(apiEndpoint + "users").then((res) => {
            return res.json();
        }).then((json) => {
            setCurrentMembers(json.active.map(extractUsername));
            setPendingMembers(json.pending.map(extractUsername));
            setIsLoading(false)
        }).catch((error) => console.error(error));
    }

    // OnMount
    useEffect(() => {
        // Call api to get current members and pending members and set state
        getMembers();
    }, [apiResponse]);

    const SpinnerComponent = (
        <div className="spinner-grow" role="status"/>
    )

    return (
        <div className="container text-center">
            <h2 className="m-2">
                Enter your github username
            </h2>

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control m-2 w-50 text-center mx-auto"
            />
            <button
                onClick={(e) => sendInvitation()}
                className="btn btn-outline-success"
            >
                Send Invitation
            </button>

            <h3 className="mt-5">{apiResponse}</h3>
            <div className= "m-2">Please check for your name in the pending Invitations section after you have sent your invitation.</div>
            <div className= "m-2">Click this <a href="https://github.com/programmers-from-the-same-company">link</a> or check your email to accept.</div>
            <div className="row m-5">
                <div className="col text-center">
                    <h2>Pending Invitations</h2>
                    {
                        isLoading ? SpinnerComponent : 
                        (
                            <ul className="list-unstyled">
                                {pendingMembers.map(makeListItem)}                     
                            </ul> 
                        )
                    }
                </div>
                <div className="col text-center">
                    <h2>Current Members</h2>
                    {
                        isLoading ? SpinnerComponent : 
                        (
                            <ul className="list-unstyled">
                                {currentMembers.map(makeListItem)}
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default UsernameInput;
