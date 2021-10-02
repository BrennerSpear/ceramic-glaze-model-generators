import { promises as fs } from 'fs';
import { getCeramicManager, getSchemalInfo } from '../utils/utils';

const [filePath] = process.argv.slice(2);

async function main() {
    const { schemaName, schema } = await getSchemalInfo(filePath);
    const manager = await getCeramicManager();

    const schemaID = await manager.createSchema(schemaName, schema);

    console.log('schemaID created:', schemaID);

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
