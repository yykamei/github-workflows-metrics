import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { restoreCache, saveCache } from "@actions/cache";
import type {
	DownloadOptions,
	UploadOptions,
} from "@actions/cache/lib/options";
import type { CacheStore, OctokitCachedData } from "./CacheStore";

const CACHE_BASE_DIR = ".octokit-cache";

type RestoreCacheType = (
	paths: string[],
	primaryKey: string,
	restoreKeys?: string[],
	options?: DownloadOptions,
	enableCrossOsArchive?: boolean,
) => Promise<string | undefined>;

type SaveCacheType = (
	paths: string[],
	key: string,
	options?: UploadOptions,
	enableCrossOsArchive?: boolean,
) => Promise<number>;

export class GitHubActionsCacheStore implements CacheStore {
	constructor(
		private readonly baseDir: string = CACHE_BASE_DIR,
		private readonly restore: RestoreCacheType = restoreCache,
		private readonly save: SaveCacheType = saveCache,
	) {}

	async read(cacheKey: string): Promise<OctokitCachedData | null> {
		await this.restore([this.baseDir], cacheKey);

		const dir = join(this.baseDir, cacheKey);
		try {
			const etag = await readFile(join(dir, "etag"), "utf-8");
			const data = await readFile(join(dir, "data"), "utf-8");
			return { etag, data: JSON.parse(data) };
		} catch {
			return null;
		}
	}

	async write(cacheKey: string, cache: OctokitCachedData): Promise<void> {
		const dir = join(this.baseDir, cacheKey);
		await mkdir(dir, { recursive: true });
		if (cache.etag) {
			await writeFile(join(dir, "etag"), cache.etag);
		}
		await writeFile(join(dir, "data"), JSON.stringify(cache.data));
		await this.save([this.baseDir], cacheKey);
	}
}
