import React, { useState, useEffect } from "react";
// https://react-icons.github.io/react-icons
import { BiRefresh } from "react-icons/bi";
import SpinnerComponent from "../Global/GlobalComponents";
// Just some smart people I found on the web
// 	https://www.rasmussen.edu/degrees/technology/blog/famous-computer-scientists-who-impacted-the-industry/
const SmartPeople = [
	"Barbara Liskov",
	"Elon Musk",
	"Larry Page",
	"Carl Sassenrath",
	"Guido Van Rassum",
	"Mark Zuckerburg",
	"Brendan Eich",
	"Tim Berners-Lee",
	"Hedy Lamarr",
	"Bill Gates"
];

function JokeQuote() {
	const [gotJoke, setGotJoke] = useState(false);
	const [joke, setJoke] = useState("");
	const [peep, setPeep] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const apiEndpoint = "https://v2.jokeapi.dev/joke/Programming?format=txt&type=single";

	// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
	const getRandomInt = (min: number, max: number) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		// The maximum is exclusive and the minimum is inclusive.
		return Math.floor(Math.random() * (max - min) + min);
	}

	const getRandomSmarty = React.useCallback(() => {
		return SmartPeople[getRandomInt(0, SmartPeople.length)];
	}, []);

	const getJoke = React.useCallback(async () => {
		setIsLoading(true);
		fetch(apiEndpoint)
			.then(res => {
				res.text()
					.then((text) => {
						setJoke(text);
						setPeep(getRandomSmarty());
						setGotJoke(true);
					})
				setIsLoading(false);
			})
			.catch(error => console.error(error));
	}, [getRandomSmarty]);


	useEffect(() => {
		getJoke();
	}, [getJoke]);


	return (
		<>
			{gotJoke &&
				<>
					<div>
						"{joke}"
					</div>
					<div>
						- {peep}
					</div>
					<div>
						{isLoading ? SpinnerComponent : <BiRefresh onClick={getJoke} />}
					</div>
				</>
			}
		</>);
}

export default JokeQuote;
