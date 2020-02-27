import React from 'react';
import './Quoter.css';

const Quoter = props => {
  return (
    <div className='quote'>
      <div className='quoteText'>
        <h3>{props.quote.text}</h3>
        <h4>- {props.quote.author}</h4>
      </div>
      <div className='buttonSection'>
        <button onClick={() => {props.getNewQuote();}}>Generate Quote</button>
      </div>
    </div>
  );
}

export default Quoter;