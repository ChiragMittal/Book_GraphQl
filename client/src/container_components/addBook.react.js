import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'

import {getAuthorQuery,addBookMutation,getBookQuery} from '../queries/queries'

class AddBook extends Component {

    constructor(props){
        super(props);

        this.state = {

            name : '',
            genre: '',
            authorId : ''

        };
    }

    showAuthors(){
        var data = this.props.getAuthorQuery
        if(data.loading){
            return (<div>Loading</div>)
        }
        else{
            return data.all_authors.map(author  =>{
    
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
    
            })
        }
    }

    formSubmit = (e) => {
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries :[{query : getBookQuery}]
            
        })

    }
    
      render(){
          console.log(this.props)
      return (
        <div className="book_list">
          <form id="add_Book" onSubmit={this.formSubmit.bind(this)}>

                <div className="field">

                    <label>Book Name:</label>
                    <input type='text' onChange = {(e) => this.setState ({ name : e.target.value })}/>

                </div>

                <div className="field">

                    <label>Genre:</label>
                    <input type='text'  onChange = {(e) => this.setState ({ genre : e.target.value })}/>
                
                </div>

                <div className="field">

                <label>Author:</label>
                <select onChange = {(e) => this.setState ({ authorId : e.target.value })}>
                    <option>Select Author</option>
                    {this.showAuthors()}
                </select>
                
                </div>

                <button>+</button>

          </form>
        </div>
      );
      }
    }
    
    export default compose (
        graphql(getAuthorQuery , {name:'getAuthorQuery'}),
        graphql(addBookMutation,{name:'addBookMutation'})
    )(AddBook);
    