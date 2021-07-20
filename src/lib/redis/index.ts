import redis from "handy-redis";
import { createNodeRedisClient } from "handy-redis";

class Redis {
	public client: redis.WrappedNodeRedisClient;
	private _connect() {
		const client = createNodeRedisClient();

		client.nodeRedis.on("error", function (error) {
			console.error(error);
		});

		return client;
	}
	constructor() {
		this.client = this._connect();
	}
}

export = new Redis();
