import { writeFileSync } from 'fs';
import { getCeramicManager, getSchemalInfo } from '../utils/utils';

const [filePath] = process.argv.slice(2);

async function main() {
    const { schemaAlias, schema } = await getSchemalInfo(filePath);
    const manager = await getCeramicManager();

    const schemaID = await manager.createSchema(schemaAlias, schema);

    console.log('schemaID created:', schemaID);

    const model = await manager.toPublished();
    console.log('model:', model);
    writeFileSync(`./model.json`, JSON.stringify(model));

    console.log('model writen');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
