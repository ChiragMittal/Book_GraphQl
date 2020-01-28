import React,{Component} from 'react';
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'
import {getBookQuery,dleteBook} from '../queries/queries'
import BookDetails from '../container_components/bookDetails.react'


class BookList extends Component {

  constructor(props){
    super(props);

    this.state = {

      selected : null

    };
}

deleteSingleBook = (id) =>{
  //e.preventDefault();
  console.log(id)
  this.props.dleteBook({ variables:{ id },
      refetchQueries :[{query : getBookQuery}]
    
})
console.log(id) 
}

showBooks(){
    var data = this.props.getBookQuery
    console.log(data)
    if(data.loading){
        return (<div>Loading</div>)
    }
    else{
        return data.all_books.map(({id,name})  =>{

            return (
              <div>
                <li key={id} onClick={(e) => {this.setState ({ selected : id })}}>{name}    
                </li>

                  <button onClick={() => this.deleteSingleBook(id)}>
                  delete
                  </button>
            </div>
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


export default compose (
  graphql(getBookQuery , {name:'getBookQuery'}),
  graphql(dleteBook, {name:'dleteBook'})
)(BookList);
