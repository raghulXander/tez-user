import React, { Component } from 'react';

import PeopleList from './containers/peopleListView/people_list_view'

import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCOhhHDWVhcRxxx8yCxqALdCmDnOCUUgVI",
  authDomain: "peoplefeed-faf16.firebaseapp.com",
  databaseURL: "https://peoplefeed-faf16.firebaseio.com",
  projectId: "peoplefeed-faf16",
  storageBucket: "gs://peoplefeed-faf16.appspot.com",
  messagingSenderId: "445724566167"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <PeopleList />
    );
  }
}

export default App;
