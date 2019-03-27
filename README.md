
# Woca

[![N|Solid](https://www.dictionaryapi.com/images/MWLogo_120x120.png)](https://www.dictionaryapi.com/)

[![Build Status](https://travis-ci.org/rufatZZ/woca.svg?branch=master)](https://travis-ci.org/rufatZZ/woca)

Woca is a api-based, React/Node powered vocabulary app.

  - Search some words from Merriam-Webster Dictionary
  - See your search history
  - Save your words to MongoDB via Express/Mongoose


### Tech

Woca uses a number of open source projects to work properly:

* [ReactJS](https://reactjs.org) - JavaScript library for building user interfaces!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [mongoose](https://mongoosejs.com/) - elegant mongodb object modeling for node.js
* [MongoDB](https://www.mongodb.com) - document database with the scalability and flexibility
* [styled-components](https://www.styled-components.com/) -  CSS-in-JS library

And of course woca itself is open source with a [public repository][woca]
 on GitHub.

### Installation

Woca requires [Node.js](https://nodejs.org/) v8+ and MongoDB v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd woca
$ npm install -d
$ npm run start
```

First Tab (run server side):
```sh
$ node server/app.js
```

Second Tab (run client side):
```sh
$ npm run start
```

#### Building for source
For production release:
```sh
$ npm run build
```

## License

Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the [MIT](LICENSE.txt) License.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [woca]: <https://github.com/rufatZZ/woca>
   [git-repo-url]: <https://github.com/rufatZZ/woca.git>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [express]: <http://expressjs.com>

