import { promises as fs } from 'fs';
import { definitionDataGenerator, getCeramicManager, getDefinitionInfo } from '../utils/utils';
import modelAliases from '../model.json';

const schemas: Record<string, string> = modelAliases.schemas;

const [file] = process.argv.slice(2);

async function main() {
    const { alias, definitionName, description, schemaAlias } = await getDefinitionInfo(file);
    const manager = await getCeramicManager();

    const schemaID = schemas[schemaAlias];
    const definitionData = definitionDataGenerator(definitionName, description, schemaID);
    const definition = await manager.createDefinition(alias, definitionData);

    const model = await manager.toPublished();
    console.log('model:', model);
    await fs.writeFile(`./model.json`, JSON.stringify(model));
    console.log('model writen');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
