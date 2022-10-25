# Project Astrolog

This project allows search and visualization of Near-Earth Objects' historical info & details through NASA's APIs.

### Disclaimer

This is a work in progress and as such is subject to sudden and unexpected changes. The code has been created mostly in exploratory fashion, being iterated upon. There are no tests at the moment, though they are intended.

This represents roughly and effectively 8 ~ 12h of work on research, exploration and implementation.

<br/>

## Summary

- [Features](#features)
- [Future Work](#future-work)
- [Nice to haves](#nice-to-haves)
- [What's not planned](#whats-not-planned)
- [Known issues](#known-issues)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Cloning Instructions](#cloning-instructions)
- [Install & Run](#install-and-run)
- [Author](#author)

<br/>

## Features

- Search for Near Earth Objects' within API's date range (7 days)
  - Either local mock file or live API with DEMO_KEY
- Lists NEO's data

Non Functional features:

- Data normalization
- Comprehensive and reusable style theming
- Componentization leveraging reusability

## Future Work

- ~~Search for NEO's with no date range limitation~~ 
  - Done, feedback not 100%
  - Want to let user see ticket usage (even before submitting), which queries failed, etc. 
- ~~Tests~~ 
  - there are some, more to come
- ~~Input validation~~
  - done
- ~~Input error handling~~
  - done
- Better styles for entries info

## Nice to haves

- ~~Input masking: users should view dates with their own locale settings~~
  - done
- Search/filter results: search/filter for specific entries in the list (good to know some of those NEOs are Potentially Hazardous)
- Infinite/virtual scrolling!
- Select a given entry and open focused view with more detailed info
- Some search caching

## What's not planned

Things deemeed either too effortful or unnecessary for the current purposes.

- Comprehensive centralized API error handling (effort)
- State handling (will try to avoid as much as possible having state)
- Pagination

## Known issues

- There's so much magical numbers right now! This is because of exploration. The idea is to minimize/eliminate that.
- ~~- When there's already items on the list, making a new search does not switch states gracefully before replacing the content~~
  - fixed
- Change convention on folder naming to PascalCase, instead of camelCase (will be more consistent)
- Use named files instead of `index.tsx`?
- Responsiveness is not 100% - layout and styles are not as well. 
<br/>

---

## Project Structure

The following presents a scalable concept for a React application:

```
project-astrolog
    └── src
        ├── core
        │     ├── api
        │     │    └── endpoints, utils & constants
        │     ├── theme
        │     │    └── color presets
        │     │    └── theming component
        │     ├── ViewTemplate
        │     │    └── Header, Content & Footer structures
        │     └── App.tsx
        │     └── App.test.tsx
        ├── view
        │     ├── Feature/Business Components
        │     └── Shared/Generic Components & Interfaces
        ├── assets
        │     └── Fonts
        │     └── Icons
        ├── utils (future)
        │     ├── TestFixtures
        │     └── utility functions (parsers, sorters, etc)
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

## Author

**Bruno Vinicius Vergatti** - [LinkedIn](https://www.linkedin.com/in/bruno-vergatti/)

Passionate about knowledge, collaboration, communication and craftsmanship.
