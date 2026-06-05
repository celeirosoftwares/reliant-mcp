export declare const tools: ({
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
} | {
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
    handler: (client: import("../client.js").ReliantClient, _args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
} | {
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, _args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
            target_success_rate?: undefined;
            target_latency_p95_ms?: undefined;
            target_latency_avg_ms?: undefined;
            alert_window_minutes?: undefined;
            min_executions_to_alert?: undefined;
            alert_webhook_url?: undefined;
        };
        required: string[];
    };
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, _args: any) => Promise<string>;
} | {
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
    handler: (client: import("../client.js").ReliantClient, _args: any) => Promise<string>;
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
} | {
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
    handler: (client: import("../client.js").ReliantClient, args: any) => Promise<string>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            days?: undefined;
        };
    };
    handler: (client: import("../client.js").ReliantClient, _args: any) => Promise<string>;
})[];
//# sourceMappingURL=index.d.ts.map