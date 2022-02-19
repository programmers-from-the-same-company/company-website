import React from 'react';
import UsernameInput from './UsernameInput';
import JokeQuote from './JokeQuote';

function Home() {
  return (
    <div className="container col">
      <header className="row align-self-center m-5">
        <h1 className="text-center">
          A group where we all pretend to be programmers
          from the same company
        </h1>
        <h3 className="text-center fst-italic mt-5">
          <JokeQuote />
        </h3>
      </header>
      <div className="row align-self-center">
        <UsernameInput />
      </div>
    </div>
  );
}

export default Home;
