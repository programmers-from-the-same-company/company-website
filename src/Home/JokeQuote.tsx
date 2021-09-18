import React, { useState, useEffect } from "react";

// just some smart people I found on the web
// https://www.rasmussen.edu/degrees/technology/blog/famous-computer-scientists-who-impacted-the-industry/
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

function JokeQuote()
{
	const [gotJoke, setGotJoke] = useState(false);
	const [joke, setJoke] = useState("");
	const [peep, setPeep] = useState("");
	
	const apiEndpoint = "https://v2.jokeapi.dev/joke/Programming?format=txt&type=single";

	// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
	const getRandomInt = (min:number, max:number) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
	}

	const getRandomSmarty = () => {
		return SmartPeople[getRandomInt(0, SmartPeople.length)];
	}

	  
	const getJoke = async() => {
		fetch(apiEndpoint)
		.then(res => {
			res.text()
			.then((text) => {
				setJoke(text);
				setPeep(getRandomSmarty());
				setGotJoke(true);
			})
		})
		.catch(error => console.error(error));		
	}

	useEffect(() => {
		getJoke();
	},[]);
	

	return(
	<>
	{ gotJoke &&
		<>
			<div>
				" {joke} "
			</div>
			<div>
				- {peep}
			</div>
		</>
	}		
	</>);
}

export default JokeQuote;
