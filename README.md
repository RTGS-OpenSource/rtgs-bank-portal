## RTGS Bank Portal Client and API

#### Install and run

The app is built using an Express server and a React client. It leverages `npm-run-all` to compose running the app and server together locally.

To run, simply:

- run `nvm use` to ensure you are using the correct Node version
- run `yarn`
- run `yarn install:all`
- run `yarn start`

To run with mocked responses based on the gql schema, run all the above with the below tweak:

- run `yarn start:mocked` instead of `yarn start`

#### Prettier

Both server and client use Prettier for formatting. Visit [the Prettier website](https://prettier.io/docs/en/editors.html) for instructions on how to integrate with your favourite editor.
