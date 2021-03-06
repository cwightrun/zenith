import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DocumentMeta from 'react-document-meta';
import ReactGA from 'react-ga';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactGA.initialize('UA-131476535-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class AppWrapper extends Component {
  render() {
    const meta = {
      title: 'counterspell.app | A counter app.',
      description: 'A counter for life, mana, tokens, etc. - Primarily meant for Magic the Gathering, but has numerous other uses.',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'react,meta,document,html,tags',
          viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        }
      }
    };

    return (
      <DocumentMeta {...meta}>
        <App />
      </DocumentMeta>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
