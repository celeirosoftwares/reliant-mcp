export class ReliantClient {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl: string,
    public readonly userId: string
  ) {}

  private async request(path: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${path}`
    const res = await fetch(url, {
      ...options,
      headers: {
        'X-Reliant-Key': this.apiKey,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    })

    const text = await res.text()
    let data: any
    try {
      data = JSON.parse(text)
    } catch {
      data = { raw: text }
    }

    if (!res.ok) {
      throw new Error(data?.error || data?.message || `HTTP ${res.status}`)
    }

    return data
  }

  async get(path: string) {
    return this.request(path, { method: 'GET' })
  }

  async post(path: string, body: any) {
    return this.request(path, { method: 'POST', body: JSON.stringify(body) })
  }

  async put(path: string, body: any) {
    return this.request(path, { method: 'PUT', body: JSON.stringify(body) })
  }

  async delete(path: string) {
    return this.request(path, { method: 'DELETE' })
  }
}
