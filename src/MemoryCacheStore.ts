import type { CacheStore, OctokitCachedData } from "./CacheStore";

export class MemoryCacheStore implements CacheStore {
	private readonly data: { [key: string]: OctokitCachedData } = {};

	async read(cacheKey: string): Promise<OctokitCachedData | null> {
		return this.data[cacheKey] || null;
	}

	async write(cacheKey: string, cache: OctokitCachedData): Promise<void> {
		this.data[cacheKey] = cache;
	}
}
