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

const db = {
    users,
    posts,
    comments
}

export { db as default }