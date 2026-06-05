import { ReliantClient } from '../client.js';
export declare const guardTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            user_message: {
                type: string;
                description: string;
            };
            guard_id: {
                type: string;
                description: string;
            };
            end_user_id: {
                type: string;
                description: string;
            };
            name?: undefined;
            provider?: undefined;
            model?: undefined;
            allowed_topics?: undefined;
            blocked_topics?: undefined;
            blocked_keywords?: undefined;
            tone_rules?: undefined;
            safe_response?: undefined;
            max_executions_per_user?: undefined;
            user_period_type?: undefined;
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
            user_message?: undefined;
            guard_id?: undefined;
            end_user_id?: undefined;
            name?: undefined;
            provider?: undefined;
            model?: undefined;
            allowed_topics?: undefined;
            blocked_topics?: undefined;
            blocked_keywords?: undefined;
            tone_rules?: undefined;
            safe_response?: undefined;
            max_executions_per_user?: undefined;
            user_period_type?: undefined;
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
            allowed_topics: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            blocked_topics: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            blocked_keywords: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            tone_rules: {
                type: string;
                description: string;
            };
            safe_response: {
                type: string;
                description: string;
                default: string;
            };
            max_executions_per_user: {
                type: string;
                description: string;
            };
            user_period_type: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            user_message?: undefined;
            guard_id?: undefined;
            end_user_id?: undefined;
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
            guard_id: {
                type: string;
                description: string;
            };
            user_message?: undefined;
            end_user_id?: undefined;
            name?: undefined;
            provider?: undefined;
            model?: undefined;
            allowed_topics?: undefined;
            blocked_topics?: undefined;
            blocked_keywords?: undefined;
            tone_rules?: undefined;
            safe_response?: undefined;
            max_executions_per_user?: undefined;
            user_period_type?: undefined;
        };
        required: string[];
    };
    handler: (client: ReliantClient, args: any) => Promise<string>;
})[];
//# sourceMappingURL=guard.d.ts.map