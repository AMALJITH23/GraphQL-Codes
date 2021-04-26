import { GraphQLServer } from 'graphql-yoga';
import {v4 as uuidv4} from 'uuid';
// mutation create, delete and inputs
let users = [{
    id: '1',
    name: 'Amal',
    email: 'amaljith@abc.com',
    age: 27
}, {
    id: '2',
    name: 'Jaimey',
    email: 'jaimey@abc.com'
}, {
    id: '3',
    name: 'Harry',
    email: 'miharry@abc.com'
}, {
    id: '4',
    name: 'Peter',
    email: 'peter@abc.com'
}];

let posts = [{
    id: '10',
    title: 'Post1',
    body: 'This is my first post',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'Post2',
    body: 'This is my second post',
    published: false,
    author: '2'
}, {
    id: '12',
    title: 'Post3',
    body: 'This is my third post',
    published: false,
    author: '2'
}, {
    id: '13',
    title: 'Post4',
    body: 'This is my fourth post',
    published: false,
    author: '3'
}];

let comments = [{
    id: '101',
    text: 'Hi, It looks beautiful',
    author: '3',
    post: '10'
}, {
    id: '102',
    text: 'Good work dude.',
    author: '1',
    post: '11'
}, {
    id: '103',
    text: 'It is amazing post bro.',
    author: '2',
    post: '11'
}, {
    id: '104',
    text: 'That is an amazing content',
    author: '1',
    post: '10'
}];


const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) return users;

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) return posts;

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        comments(parent, args, ctx, info) {
            return comments
        },
        me() {
            return {
                id: '123456',
                name: 'Amaljith',
                email: 'amaljith@abc.com'
            }
        },
        post() {
            return {
                id: '062',
                title: 'My post',
                body: '',
                published: false
            }
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user=>user.email === args.data.email);
            if (emailTaken) throw new Error('Email already exist.');
            
            const user = {
                id: uuidv4(),
                ...args.data
            }
            users.push(user);
            return user;
        },
        deleteUser(parent, args, ctx, info){
            const userIndex = users.findIndex(user=>args.id==user.id);
            if(userIndex==-1) throw new Error("User not found");

            const deletedUser=users.splice(userIndex,1)[0];

            posts = posts.filter((post) => {
                const match = post.author === args.id;
                if (match) {
                    comments = comments.filter((comment) => comment.post !== post.id);
                }

                return !match
            })
            comments = comments.filter((comment) => comment.author !== args.id);

            return deletedUser;
            
        },
        createPost(parent, args, ctx, info) {
            const userExist = users.some(user=>user.id === args.data.author);
            if (!userExist) throw new Error ("User does not exist");

            const post = {
                id: uuidv4(),
                ...args.data
            }
            posts.push(post);
            return post;
        },
        deletePost(parent, args, ctx, info){
            const postIndex = posts.findIndex(post=>args.id==post.id);
            if(postIndex==-1) throw new Error("Post not found");

            const deletedPost=posts.splice(postIndex,1)[0];
            comments = comments.filter((comment) => comment.post !== args.id);

            return deletedPost;
        },
        createComment(parent, args, ctx, info){
            const userExist = users.some(user=>user.id === args.data.author);
            const postExist = posts.some(post=>post.id === args.data.post && post.published === true);

            if(!userExist) throw new Error("Invalid user!");
            if(!postExist) throw new Error("Post doesn't exist!");

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment);
            return comment;
        },
        deleteComment(parent, args, ctx, info){
            const commentIndex = comments.findIndex(comment=>args.id==comment.id);
            if(commentIndex==-1) throw new Error("Comment not found");

            const deletedComment=posts.splice(postIndex,1)[0];

            return deletedComment;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id;
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post;
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is listening now...')
})