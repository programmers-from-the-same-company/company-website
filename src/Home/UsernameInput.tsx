import { useEffect, useState } from 'react';
import SpinnerComponent from '../Global/GlobalComponents';
type Users = {
    "active": User[] | null,
    "pending": User[] | null
}

type User = {
    "login": string | null
}

function UsernameInput() {
    const [username, setUsername] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [currentMembers, setCurrentMembers] = useState<string[]>([]);
    const [pendingMembers, setPendingMembers] = useState<string[]>([]);
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const apiEndpoint = "https://company-website-api.herokuapp.com/";
    const sendInvitation = async () => {
        // Call our api to send invitation to user.
        // Set api response
        fetch(apiEndpoint + "users/invite", {
            method: "POST",
            body: JSON.stringify({ Login: username })
        }).then(
            (res) => {
                const salutation = !username || username === "" ? "Hey" : "Hey " + username;
                setApiResponse(
                    salutation + ", here is your api response: " + res.status + " " + res.statusText)
            }
        ).catch(
            (error) => console.error(error)
        );
    }

    const makeListItem = (member: string) => {
        return <li key={member}>
            <div className="card shadow-sm my-2">
                <div className="card-body">{member}</div>
            </div>
        </li>;
    }

    const getMembers = async () => {
        const extractUsername = (user: User) => user.login ?? "";

        fetch(apiEndpoint + "users").then((res) => {
            return res.json();
        }).then((json: Users) => {
            setCurrentMembers(json.active != null ? json.active.map(extractUsername) : []);
            setPendingMembers(json.pending != null ? json.pending.map(extractUsername) : []);
            setIsLoading(false)
        }).catch((error) => console.error(error));
    }

    // OnMount
    useEffect(() => {
        // Call api to get current members and pending members and set state
        getMembers();
    }, [apiResponse]);


    const filterFunction = (member: string) => (search !== "" ? member.toUpperCase().includes(search.toUpperCase()) : true)

    return (
        <div className="container text-center">
            <h2 className="">
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
            <div className="m-2">Please check for your name in the pending Invitations section after you have sent your invitation.</div>
            <div className="m-2">Click this <a href="https://github.com/programmers-from-the-same-company">link</a> or check your email to accept.</div>

            <div className="container my-4">
                <h2>Search for a username</h2>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control m-2 w-50 text-center mx-auto"
                />
            </div>

            <div className="row m-5">
                <div className="col text-center">
                    <h2>Pending Invitations</h2>
                    {
                        isLoading ? SpinnerComponent :
                            (
                                <ul className="list-unstyled">
                                    {pendingMembers.filter(filterFunction).map(makeListItem)}
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
                                    {currentMembers.filter(filterFunction).map(makeListItem)}
                                </ul>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default UsernameInput;
