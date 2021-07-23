import redis from "handy-redis";
import console from "@utils/console";
import { createNodeRedisClient } from "handy-redis";

class Redis {
	public client: redis.WrappedNodeRedisClient;
	private static _redisConf = {
		host: `redis-14320.c226.eu-west-1-3.ec2.cloud.redislabs.com`,
		port: 14320,
		password: "RwrBS7J6DHsB0GSSg8Npe2iBiptMLlNK",
	};
	private _connect() {
		const client = createNodeRedisClient(Redis._redisConf);

		client.nodeRedis.on("error", (msg) => {
			console.error(msg);
		});

		client.nodeRedis.on("end", () => {
			console.warn("Server disconnected from Redis database!");
		});

		client.nodeRedis.on("ready", () => {
			console.log("Server successfully connected to Redis database!");
		});

		return client;
	}
	constructor() {
		this.client = this._connect();
	}
}

export = new Redis();
