# Project Astrolog

This project allows search and visualization of Near-Earth Objects' historical info & details through NASA's APIs.

<br/>

## Summary

- [Features](#features)
- [Future Work](#future-work)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Cloning Instructions](#cloning-instructions)
- [Install & Run](#install-and-run)
- [Author](#author)

<br/>

## Features

- Search for Near Earth Objects'
  - limited to queries ranging up to 180 days
- Lists NEOs' data
- Displays request error & search feedbacks
- Displays feedback regarding API tickets spent

Non Functional features:

- Data normalization
- Comprehensive and reusable style theming
- Componentization leveraging reusability

## Future Work

- Would be nice to provide user with alternative for boundless queries.
  - Webworkers with staggered requests could be employed to serve a large data amount on a budget
- Expand test coverage, especially on service layer
- Refactors for readability, better represent and unify types/modelling
- Implement performance-oriented changes

## Technologies

### [React](https://reactjs.org/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

- [React Hooks](https://reactjs.org/docs/hooks-intro.html)

### Styling

- [Styled Components](https://styled-components.com/)

### Testing

- [Jest](https://jestjs.io/)

### Project Support

- Linter: [ESLint](https://eslint.org/)
- Formatter: [Prettier](https://prettier.io/)

<br/><br/>

## Project Structure

The following presents a scalable concept for a React application:

```
project-astrolog
    └── src
        ├── assets
        │     └── Fonts
        │     └── Icons
        ├── core
        │     ├── api
        │     │    └── endpoints, utils & constants
        │     ├── theme
        │     │    └── color presets
        │     │    └── theming component
        │     ├── App.tsx
        ├── services
        │     └── data IO layer
        ├── state
        │     ├──  models
        │     └──  data normalizers
        ├── utils
        │     ├──  data/input validators
        │     └──  data parsers
        ├── view
        │     ├── Feature/Business Components
        │     ├── Shared/Generic Components & functions
        │     └── ViewTemplate
        ├── index.css
        └── index.tsx
```

<br/>

## Requirements

- To execute the application you`ll need to download and install [NodeJs](https://nodejs.org/en/download/)
- To go one step further, the recommended approach would be to setup a [Node Version Manager](https://docs.npmjs.com/cli/v7/configuring-npm/install#using-a-node-version-manager-to-install-nodejs-and-npm)

## Cloning instructions

### How to get the project?

This project source code is currently hosted at GitHub, [here](https://github.com/BadPriest/project-astrolog).

Open the folder where you intend to download Astrolog, open a `bash` or `cmd` terminal and [clone](https://www.git-scm.com/docs/git-clone) the project by running:

```
git clone https://github.com/BadPriest/project-astrolog.git
```

You may have to authenticate to proceed. This will download the projects' code on the folder you currently are.

Then move to the project's root folder with

```
cd project-astrolog
```

## Install and Run

1. On the project's root folder, solve the dependencies by running:

```
npm install
```

2. Start the application in development mode with:

```
npm start
```

3. To see the app running, open your browser and navigate to [localhost:4242](localhost:4242)

<br/>

## Running tests

To run all tests, go to the root folder and run:

```
npm test
```

Alternatively, you could pass a filename as the second parameter. That would execute only the files it finds in the given folder.

```
npm test fetchNeoData
```

or even

```
npm test src\utils\*
```

## Author

**Bruno Vinicius Vergatti** - [LinkedIn](https://www.linkedin.com/in/bruno-vergatti/)

Passionate about knowledge, collaboration, communication and craftsmanship.
