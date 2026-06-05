import { ReliantClient } from '../client.js';
export declare const slaTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            schema_id: {
                type: string;
                description: string;
            };
            target_success_rate?: undefined;
            target_latency_p95_ms?: undefined;
            target_latency_avg_ms?: undefined;
            alert_window_minutes?: undefined;
            min_executions_to_alert?: undefined;
            alert_webhook_url?: undefined;
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
            target_success_rate: {
                type: string;
                description: string;
                default: number;
            };
            target_latency_p95_ms: {
                type: string;
                description: string;
            };
            target_latency_avg_ms: {
                type: string;
                description: string;
            };
            alert_window_minutes: {
                type: string;
                description: string;
                default: number;
            };
            min_executions_to_alert: {
                type: string;
                description: string;
                default: number;
            };
            alert_webhook_url: {
                type: string;
                description: string;
            };
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
            schema_id?: undefined;
            target_success_rate?: undefined;
            target_latency_p95_ms?: undefined;
            target_latency_avg_ms?: undefined;
            alert_window_minutes?: undefined;
            min_executions_to_alert?: undefined;
            alert_webhook_url?: undefined;
        };
        required?: undefined;
    };
    handler: (client: ReliantClient, _args: any) => Promise<string>;
})[];
//# sourceMappingURL=sla.d.ts.map