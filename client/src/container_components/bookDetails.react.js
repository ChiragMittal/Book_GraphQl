import React,{Component} from 'react';
import {graphql} from 'react-apollo'

import {getSingleBookQuery} from '../queries/queries'


class BookDetails extends Component {

    bookDetails = (e) => {

       // e.preventDefault();
        const single_book_detail = this.props.data.book
       

        if(single_book_detail){
            return(
                <div>
                        <p>{single_book_detail.name}</p>
                        <p>{single_book_detail.genre}</p>
                        <p>{single_book_detail.author.name}</p>
                </div>
            )
        }else{
            return(
                <p>No detail available</p>
            )
        }

    }


  render(){
    
  return (
    <div className="book_list">
      <h1>Details here</h1>
      {this.bookDetails()}
    </div>
  );
  }
}

export default graphql(getSingleBookQuery,{
    options:(props)=>{
        return{
            variables:{
                id:props.book_id
            }
        }
    }
})(BookDetails);
