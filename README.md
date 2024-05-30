# Candidate manager

Application written in Typescript to manage candidates in a recruitment process.

## Requirements

- Node 20

## Getting started

1. Install dependencies `npm install`
2. Generate a "database" `npm run create:db`
3. Start DB server, backend server and web app simultanously `npm start` 

or run them separately

1. Start DB server `npm run start:db`
2. Start backend `npm run start:api`
3. Start web app `npm run dev`

## Project structure

### Language: Typescript

Not always a fan of Typescript but it's good to get that extra layer of comfort. Also, it's seems like it's the way to go in the future.

### Database: JSON Server

I used `json-server` to quickly mimic a JSON database. I would replace this with a real DB with more time.

### Backend: Express

I still wanted to showcase some backend skills, so I added a basic REST API as a proxy to the JSON server.

### Frontend framework: React

The frontend tool I'm most used to work with for single page applications. I chose to go plain React over larger SSR frameworks like Next.js and Remix due to the nature of the app.

### State management (data): React Query

I try to always separate between data state and app state, and React Query does a great job managing the first without having to deal with boilerplate heavy tools like Redux. 

### State management (app): React Context/State

For apps this size I think React Context and state is enough. For I larger project I would reach towards something like Jotai for application state.

### Form management: React hook form

I like the thought of only using browser native FormData for forms, like in Remix, but `react-hook-form` makes it very easy to get going quickly with forms.

### Build tool: Vite

I wanted to try this for the first time and I wasn't disappointed. Very easy to setup.

### Styling: CSS (Modules)

I prefer regular CSS over preprocessors like SASS or frameworks like Tailwind, since I feel CSS is so mature nowadays to so that a pre-processor is redundant. I did use a mix between global CSS and CSS modules though for better separation of concerns.
