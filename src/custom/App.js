import React, { Component } from 'react';
import './App.css';
import Quoter from './Quoter.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [
        {
          text: 'Welcome to the Quote Generator.',
          author: 'Created by K. Josiah Park'
        },
        {
          text: 'what would happen if I put a really really really really really really really' +
          ' really really really really really really really really really really really really' +
          ' really really really really really really really really really really really really' +
          ' really really really really really really really really really really really really' +
          ' really really long quote in here?',
          author: 'K. Josiah Park'
        },
        {
          text: 'He who rose the boat can travel the furthest.',
          author: 'Justin A. Becker'
        },
        {
          text: 'He who paints the foundations of society eats the greatest feast.',
          author: 'Justin A. Becker'
        },
      ],
      qi: 0
    };
  }

  populateQuotes = () => {
    fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => {
      for (const row of data) {
        this.setState(prevState => {
          let authorName = null;
          if (row['author'] == null) {
            authorName = 'Anonymous';
          } else {
            authorName = row['author'];
          }
          prevState.quotes = [...prevState.quotes, { text: row['text'], author: authorName }];
          return prevState;
        })
      }
    });
  }

  getNewQuote = () => {
    this.setState(prevState => {
      var newqi = prevState.qi;
      while (newqi === prevState.qi) {
        newqi = Math.floor(Math.random() * (prevState.quotes.length - 1)) + 1;
      }
      return prevState.qi = newqi;
    });
  }

  checkOverflow = space => {
    if (space.offsetHeight < space.scrollHeight) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className='main-obj'>
        <div>
          <Quoter quote={this.state.quotes[this.state.qi]} getNewQuote={this.getNewQuote} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.populateQuotes()
  }

  componentDidUpdate() {
    var quoteSpace = document.getElementsByClassName('quoteText');
    if (quoteSpace.length !== 0) {
      quoteSpace = quoteSpace.item(0);
      quoteSpace = quoteSpace.getElementsByTagName('h3').item(0);
      
      quoteSpace.style.fontSize = "80px";
      if (this.checkOverflow(quoteSpace)) {
        var maxFontSize = 80;

        while (this.checkOverflow(quoteSpace)) {
          maxFontSize -= 2.5;
          quoteSpace.style.fontSize = maxFontSize + "px";
        }
      }
    }
  }
}

export default App;
