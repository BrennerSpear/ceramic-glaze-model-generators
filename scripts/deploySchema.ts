import { writeFileSync } from 'fs';
import deepExtend from 'deep-extend';
import { preventOverwrite, getCeramicManager, getSchemalInfo } from '../utils/utils';
import model from '../model.json';

const [file, overwrite] = process.argv.slice(2);

async function main() {
    const { alias, schema } = await getSchemalInfo(file);

    // prevents from overwriting models already in model.js by accident
    if (preventOverwrite(model, 'schemas', alias, overwrite)) {
        return;
    }

    const manager = await getCeramicManager();

    const schemaURL = await manager.createSchema(alias, schema);

    console.log('schemaURL created:', schemaURL);

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
