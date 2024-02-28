export interface Aggregator {
	fetch(): Promise<void>;
}
