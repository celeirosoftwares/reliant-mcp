import { ReliantClient } from '../client.js';
export declare const auditTools: ({
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
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            schema_id: {
                type: string;
                description: string;
            };
            execution_id?: undefined;
        };
        required?: undefined;
    };
    handler: (client: ReliantClient, args: any) => Promise<string>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            execution_id: {
                type: string;
                description: string;
            };
            limit?: undefined;
            status?: undefined;
            schema_id?: undefined;
        };
        required: string[];
    };
    handler: (client: ReliantClient, args: any) => Promise<string>;
})[];
//# sourceMappingURL=audit.d.ts.map