import { writeFileSync } from 'fs';
import {
    definitionDataGenerator,
    getCeramicManager,
    getDefinitionInfo,
    preventOverwrite,
} from '../utils/utils';
import model from '../model.json';
import deepExtend from 'deep-extend';

const schemas: Record<string, string> = model.schemas;

const [file, overwrite] = process.argv.slice(2);

async function main() {
    const { alias, definitionName, description, schemaAlias } = await getDefinitionInfo(file);

    // prevents from overwriting models already in model.js by accident
    if (preventOverwrite(model, 'definitions', alias, overwrite)) {
        return;
    }

    const manager = await getCeramicManager();

    const schemaURL = schemas[schemaAlias];
    if (!schemaURL) {
        console.log(`You need to deploy the schema for ${schemaAlias} first`);
        return;
    }
    const definitionData = definitionDataGenerator(definitionName, description, schemaURL);
    const definitionID = await manager.createDefinition(alias, definitionData);

    console.log('definitionID created:', definitionID, '\n');

    const newModel = await manager.toPublished();
    deepExtend(model, newModel);

    writeFileSync(`./model.json`, JSON.stringify(model));
    console.log('model generated:', model);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
