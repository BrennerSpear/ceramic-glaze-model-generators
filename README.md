# Ceramic / Glaze Model Generation Scripts

## Set up

```bash
yarn install
```

If you already have a DID Key, you can create a `.env` file and put it in there

```bash
touch .env
```

If you don't already have one this will generate one for you and write it to `.env`):

```bash
yarn run generateKey
```

To run a local Ceramic node to deploy your data models, in a new terminal window, run:

```bash
yarn global add @ceramicnetwork/cli

ceramic daemon
```

For full instructions / troubleshooting. please refer to the [official documentation](https://developers.ceramic.network/build/cli/installation/#cli-installation).

The deploy stcripts are by default pointed to your local node (`http://localhost:7007`)

If you'd like to deploy to a different network you can change `CERAMIC_NODE_URL` in `constants.ts`.

## Models

Glaze uses IDX data models. To learn more about these models, check out the protocol design [here](https://developers.ceramic.network/tools/idx/overview/#protocol-design).

Schemas & Defininitions are defined in typescript files and deployed using deploy scripts.

## Schema Generation

Schemas are saved in the `schemas/` folder

As an example you'll find `SimpleNote.ts` in the folder already.

```typescript
export const schemaAlias = 'SimpleNote';
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

## Definition Generation

Definitions are saved in the `definitions/` folder

As an example you'll find `MyNote.ts` in the folder already.

```typescript
export const alias = 'myNote';
export const definitionName = 'a note';
export const description = 'A simple text note';
export { schemaAlias } from '../schemas/SimpleNote';
```

To deploy this Definition to the network and write it to `model.json`, you run:

```bash
yarn run deployDefinition MyNote
```

It will use the `SimpleNote` Schema in the `model.json` file.

## Future use cases / development

A `yarn run deployAll` script will probably useful.

This could pretty easily be turned into a web app with a GUI for defining and deploying Schemas and Definitions.

If you have any questions DM on twitter [@brennerspear](https://twitter.com/BrennerSpear) or @ me (@brenner) in the [Ceramic discord](https://discord.gg/Jj3mG9Q7) support channel.
