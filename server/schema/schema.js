const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList} = require('graphql')

const Book = new GraphQLObjectType({
    name:"book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:Author,
            resolve(parent,args){

            }
        }
    })
});

const Author = new GraphQLObjectType({
    name:"author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        book:{
            type:new GraphQLList(Book),
            resolve(parent,args){
                
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:"root",
    fields:{
    book:{
        type:Book,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){

        }
    },
    author:{
        type:Author,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){

        }
    },
    all_books:{
        type: new GraphQLList(Book),
        resolve(parent,args){

        }
    },
    all_authors:{
        type: new GraphQLList(Author),
        resolve(parent,args){
            
        }
    }
}
});

module.exports = new GraphQLSchema({
    query:RootQuery
})