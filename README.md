# Ceramic / Glaze Model Generation Scripts

## Set up
### Init

```bash
yarn install
yarn run init
```

`init` does two things:
1. generate a `DID_KEY` and write it to `.env`
2. copy `emptyModel.json` to `model.json`

Both `.env` and `model.json` are `.gitignore`'d. `model.json` is where your published models will be recorded.

If you have a specific `DID_KEY` you want to use, you can edit the `.env` file
<br><br>

### Running a local Ceramic node
To run a local Ceramic node to deploy your data models, in a new terminal window, run:

```bash
yarn global add @ceramicnetwork/cli

ceramic daemon
```

For full instructions / troubleshooting. please refer to the [official documentation](https://developers.ceramic.network/build/cli/installation/#cli-installation).

The deploy stcripts are by default pointed to your local node (`http://localhost:7007`)

If you'd like to deploy to a different network you can change `CERAMIC_NODE_URL` in `constants.ts`.
<br><br>

## Models

Glaze uses IDX data models. To learn more about these models, check out the protocol design [here](https://developers.ceramic.network/tools/idx/overview/#protocol-design).

Schemas & Defininitions are defined in typescript files and deployed using deploy scripts.
<br><br>
## Schema Generation

Schemas are saved in the `schemas/` folder

As an example you'll find `SimpleNote.ts` in the folder already.

```typescript
export const alias = 'SimpleNote';
export const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'SimpleNote',
    type: 'object',
    properties: {
        text: {
            type: 'string',
            title: 'text',
            maxLength: 4000,
        },
    },
};
```

To deploy this Schema to the network and write it to `model.json`, you run:

```bash
yarn run deploySchema SimpleNote
```
<br><br>
## Definition Generation

Definitions are saved in the `definitions/` folder

As an example you'll find `MyNote.ts` in the folder already.

```typescript
export const alias = 'myNote';
export const definitionName = 'a note';
export const description = 'A simple text note';
export { alias as schemaAlias } from '../schemas/SimpleNote';
```

To deploy this Definition to the network and write it to `model.json`, you run:

```bash
yarn run deployDefinition MyNote
```

It will use the `SimpleNote` Schema in the `model.json` file.
<br><br>
## Future use cases / development

A `yarn run deployAll` script will probably useful.

This could pretty easily be turned into a web app with a GUI for defining and deploying Schemas and Definitions.

If you have any questions DM on twitter [@brennerspear](https://twitter.com/BrennerSpear) or @ me (@brenner) in the [Ceramic discord](https://discord.gg/Jj3mG9Q7) support channel.
