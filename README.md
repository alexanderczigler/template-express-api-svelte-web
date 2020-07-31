# template-express-api-svelte-web

Template JS based monorepo with a restful Express API and a Svelte web app.

I have created this to show how I usually strucutre my projects and to keep a clean copy of what unit tests look like.

# Running

## What you need

I have based this project on the LTS version of node, which currently is 12. So either install that or install `nvm`.

## Running

After cloning the repo, make sure you have two terminal windows or tabs open. In one of them, go to the web/ directory and in the other, go to the api/ directory.

If you are using `nvm`, run `nvm install` and then `nvm use` to ensure you have activated node 12.

In both terminal windows/tabs, run `npm ci` and then `npm run dev`. This will start the api and the web on ports 3000 and 5000 respectively. You should now be able to open http://localhost:5000 in your browser to access the web app.

## Tests

Open a new terminal and go to the api/ directory, then run `npm run test -- --watch`. This will run jest and keep it running, watching for any file changes in the api project. Whenever you edit code the tests will run and you immideately know if you broke something that is covered by any test(s).

The tests are found in the `__tests__` directories and called x.spec.js where x is the name of the module under test.

## Quick start

You can run the project with Docker too, there is a compose stack file in the project root directory.

```bash
docker-compose up
```
