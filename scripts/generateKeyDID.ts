import { randomBytes } from '@stablelib/random';

async function main() {
    const seed = randomBytes(32);
    const hex = Buffer.from(seed).toString('hex');
    console.log(hex);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
