import React,{Component} from 'react';
import {graphql} from 'react-apollo'

import {getBookQuery} from '../queries/queries'
import BookDetails from '../container_components/bookDetails.react'


class BookList extends Component {

  constructor(props){
    super(props);

    this.state = {

      selected : null

    };
}

showBooks(){
    var data = this.props.data
    console.log(data.all_books)
    if(data.loading){
        return (<div>Loading</div>)
    }
    else{
        return data.all_books.map(book  =>{

            return (
                <li key={book.id} onClick={(e) => {this.setState ({ selected : book.id })}}>{book.name}</li>
            )

        })
    }
}

  render(){
      
  return (
    <div className="book_list">
      <ul>
          {this.showBooks()}
          <BookDetails book_id={this.state.selected}/>
      </ul>
    </div>
  );
  }
}

export default graphql(getBookQuery)(BookList);
