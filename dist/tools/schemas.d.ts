import { ReliantClient } from '../client.js';
export declare const schemaTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name?: undefined;
            description?: undefined;
            fields?: undefined;
            system_prompt?: undefined;
            fallback_providers?: undefined;
            schema_id?: undefined;
        };
        required?: undefined;
    };
    handler: (client: ReliantClient, _args: any) => Promise<string>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            fields: {
                type: string;
                description: string;
                items: {
                    type: string;
                    properties: {
                        name: {
                            type: string;
                        };
                        type: {
                            type: string;
                            enum: string[];
                        };
                        description: {
                            type: string;
                        };
                        required: {
                            type: string;
                            default: boolean;
                        };
                    };
                    required: string[];
                };
            };
            system_prompt: {
                type: string;
                description: string;
            };
            fallback_providers: {
                type: string;
                items: {
                    type: string;
                    enum: string[];
                };
                description: string;
            };
            schema_id?: undefined;
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
            schema_id: {
                type: string;
                description: string;
            };
            name?: undefined;
            description?: undefined;
            fields?: undefined;
            system_prompt?: undefined;
            fallback_providers?: undefined;
        };
        required: string[];
    };
    handler: (client: ReliantClient, args: any) => Promise<string>;
})[];
//# sourceMappingURL=schemas.d.ts.map