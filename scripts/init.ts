import { randomBytes } from '@stablelib/random';
import { readFile } from 'fs/promises';
import { existsSync, writeFileSync } from 'fs';

async function main() {
    if (!existsSync('model.json')) {
        const emptyModel = await readFile('emptyModel.json', 'utf-8');
        writeFileSync('./model.json', emptyModel);
        console.log('No model.json found. model.json copied from emptyModel.json');
    }

    if (existsSync('.env')) {
        const env = await readFile('.env', 'utf-8');
        if (env.includes('DID_KEY')) {
            console.log('DID_KEY already exists in your .env file');
            return;
        }
    }

    const seed = randomBytes(32);
    const hex = Buffer.from(seed).toString('hex');
    writeFileSync('./.env', `DID_KEY="${hex}"`);
    console.log('DID_KEY generated and written to .env');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
