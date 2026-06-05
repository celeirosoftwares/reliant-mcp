"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReliantClient = void 0;
class ReliantClient {
    apiKey;
    baseUrl;
    userId;
    constructor(apiKey, baseUrl, userId) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.userId = userId;
    }
    async request(path, options = {}) {
        const url = `${this.baseUrl}${path}`;
        const res = await fetch(url, {
            ...options,
            headers: {
                'X-Reliant-Key': this.apiKey,
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });
        const text = await res.text();
        let data;
        try {
            data = JSON.parse(text);
        }
        catch {
            data = { raw: text };
        }
        if (!res.ok) {
            throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
        }
        return data;
    }
    async get(path) {
        return this.request(path, { method: 'GET' });
    }
    async post(path, body) {
        return this.request(path, { method: 'POST', body: JSON.stringify(body) });
    }
    async put(path, body) {
        return this.request(path, { method: 'PUT', body: JSON.stringify(body) });
    }
    async delete(path) {
        return this.request(path, { method: 'DELETE' });
    }
}
exports.ReliantClient = ReliantClient;
//# sourceMappingURL=client.js.map