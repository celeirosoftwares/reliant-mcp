import { ReliantClient } from '../client.js';
export declare const contractTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name?: undefined;
            schema_id?: undefined;
            on_violation?: undefined;
            rules?: undefined;
            semantic_rules?: undefined;
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
            schema_id: {
                type: string;
                description: string;
            };
            on_violation: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            rules: {
                type: string;
                description: string;
                items: {
                    type: string;
                    properties: {
                        field: {
                            type: string;
                            description: string;
                        };
                        op: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                        value: {
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
            };
            semantic_rules: {
                type: string;
                description: string;
                items: {
                    type: string;
                    properties: {
                        description: {
                            type: string;
                            description: string;
                        };
                        weight: {
                            type: string;
                            enum: string[];
                            description: string;
                            default: string;
                        };
                    };
                    required: string[];
                };
            };
        };
        required: string[];
    };
    handler: (client: ReliantClient, args: any) => Promise<string>;
})[];
//# sourceMappingURL=contracts.d.ts.map