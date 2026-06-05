import { ReliantClient } from '../client.js';
export declare const executionTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            prompt: {
                type: string;
                description: string;
            };
            schema_id: {
                type: string;
                description: string;
            };
            provider: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            model: {
                type: string;
                description: string;
                default: string;
            };
            contract_id: {
                type: string;
                description: string;
            };
            max_retries: {
                type: string;
                description: string;
                default: number;
            };
            limit?: undefined;
            status?: undefined;
        };
        required: string[];
    };
    handler: (client: ReliantClient, args: any) => Promise<string>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            limit: {
                type: string;
                description: string;
                default: number;
            };
            schema_id: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            prompt?: undefined;
            provider?: undefined;
            model?: undefined;
            contract_id?: undefined;
            max_retries?: undefined;
        };
        required?: undefined;
    };
    handler: (client: ReliantClient, args: any) => Promise<string>;
})[];
//# sourceMappingURL=execute.d.ts.map