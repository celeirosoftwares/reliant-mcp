import { ReliantClient } from '../client.js';
export declare const metricsTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            days: {
                type: string;
                description: string;
                default: number;
            };
        };
    };
    handler: (client: ReliantClient, args: any) => Promise<string>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            days?: undefined;
        };
    };
    handler: (client: ReliantClient, _args: any) => Promise<string>;
})[];
//# sourceMappingURL=metrics.d.ts.map