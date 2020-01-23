import React,{Component} from 'react';
import {graphql} from 'react-apollo'

import {getBookQuery} from '../queries/queries'


class BookList extends Component {

showBooks(){
    var data = this.props.data
    console.log(data.all_books)
    if(data.loading){
        return (<div>Loading</div>)
    }
    else{
        return data.all_books.map(book  =>{

            return (
                <li key={book.id}>{book.name}</li>
            )

        })
    }
}

  render(){
      
  return (
    <div className="book_list">
      <ul>
          {this.showBooks()}
      </ul>
    </div>
  );
  }
}

export default graphql(getBookQuery)(BookList);
