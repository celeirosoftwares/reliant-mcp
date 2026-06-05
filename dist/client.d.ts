export declare class ReliantClient {
    private readonly apiKey;
    private readonly baseUrl;
    readonly userId: string;
    constructor(apiKey: string, baseUrl: string, userId: string);
    private request;
    get(path: string): Promise<any>;
    post(path: string, body: any): Promise<any>;
    put(path: string, body: any): Promise<any>;
    delete(path: string): Promise<any>;
}
//# sourceMappingURL=client.d.ts.map