import dotenv from 'dotenv';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ModelManager } from '@glazed/devtools';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import { fromString } from 'uint8arrays';
import { CERAMIC_NODE_URL } from './constants';

dotenv.config();

export const getCeramicManager = async () => {
    // The key must be provided as an environment variable
    const key = fromString(process.env.DID_KEY || '', 'base16');
    // Create and authenticate the DID
    const did = new DID({
        provider: new Ed25519Provider(key),
        resolver: getResolver(),
    });
    await did.authenticate();

    // Connect to the local Ceramic node
    const ceramic = new CeramicClient(CERAMIC_NODE_URL);
    ceramic.did = did;

    // Create a manager for the model
    const manager = new ModelManager(ceramic);

    return manager;
};

export const definitionDataGenerator = (
    definitionName: string,
    description: string,
    schemaID: any,
) => {
    return {
        name: definitionName,
        description,
        schema: schemaID,
    };
};
export const getSchemalInfo = async (file: string): Promise<{ schemaName: string; schema: any }> =>
    await import(`../schemas/${file}`);

export const getDefinitionInfo = async (
    file: string,
): Promise<{ alias: string; definitionName: string; description: string; schemaName: string }> =>
    await import(`../definitions/${file}`);
