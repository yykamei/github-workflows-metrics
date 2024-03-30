export type OctokitCachedData = {
	readonly etag?: string;
	readonly data: unknown;
};

export interface CacheStore {
	setup(): Promise<void>;
	read(cacheKey: string): Promise<OctokitCachedData | null>;
	write(cacheKey: string, cache: OctokitCachedData): Promise<void>;
	settle(): Promise<void>;
}
