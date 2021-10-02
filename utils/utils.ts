import dotenv from 'dotenv';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ModelManager } from '@glazed/devtools';
import type { Definition } from '@glazed/did-datastore-model';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import { fromString } from 'uint8arrays';
import { CERAMIC_NODE_URL } from './constants';

dotenv.config();

export const getCeramicManager = async (): Promise<ModelManager> => {
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
    schemaID: string,
): Definition<Record<string, string>> => {
    return {
        name: definitionName,
        description,
        schema: schemaID,
    };
};
export const getSchemalInfo = async (
    file: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ alias: string; schema: Record<any, any> }> =>
    await import(`../schemas/${file}.ts`);

export const getDefinitionInfo = async (
    file: string,
): Promise<{ alias: string; definitionName: string; description: string; schemaAlias: string }> =>
    await import(`../definitions/${file}.ts`);

export const checkAliasExistence = (
    model: Record<string, Record<string, string>>,
    modelType: string,
    alias: string,
): boolean => {
    return !!model[modelType][alias];
};

export const preventOverwrite = (
    model: Record<string, Record<string, string>>,
    modelType: string,
    alias: string,
    overwrite: string,
): boolean => {
    if (overwrite != 'overwrite') {
        if (checkAliasExistence(model, modelType, alias)) {
            console.log(
                `model.json already has a ${alias} schema. Please pass 'overwrite' as an additional param to the deploy script to override this`,
            );
            return true;
        }
    }

    return false;
};
