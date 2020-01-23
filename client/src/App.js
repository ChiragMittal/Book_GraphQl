import React,{Component} from 'react';
import BookList from './container_components/bookList.react'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import AddBook from './container_components/addBook.react'

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql"
});

class App extends Component {

  render(){
  return (
    <ApolloProvider client={client}>
        <div className="App">
          <h1>Hello World</h1>
          <BookList />
          <AddBook />
        </div>
    </ApolloProvider>
  );
  }
}

export default App;
