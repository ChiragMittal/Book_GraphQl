import {gql} from 'apollo-boost'

export const getBookQuery= gql`
{
    all_books{
        name
        id
    }
}    
`

export const getAuthorQuery= gql`
{
    all_authors{
        name
        id
    }
}    
`

export const addBookMutation= gql`
mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            
        }
}
`