const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull} = require('graphql')

const Books = require('../models/books')
const Authors = require('../models/author')

const Book = new GraphQLObjectType({
    name:"book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:Author,
            resolve(parent,args){
                return Authors.findById(parent.authorId)
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
                return Books.findById({authorId:parent.id})
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
                return Books.findById(args.id)
        }
    },
    author:{
        type:Author,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
            return Authors.findById(args.id)
        }
    },
    all_books:{
        type: new GraphQLList(Book),
        resolve(parent,args){
            return Books.find({})
        }
    },
    all_authors:{
        type: new GraphQLList(Author),
        resolve(parent,args){
            return Authors.find({})
        }
    }
}
});

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:Author,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Authors({
                    name:args.name,
                    age:args.age
                })

                return author.save()
            }
        },
        addBook:{
            type:Book,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Books({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })

                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})