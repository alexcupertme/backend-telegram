import { NextFunction, Request, Response } from "express";
import moment from "moment";
import path from "path";
import winston from "winston";

const logger = winston.createLogger({
	transports: [new winston.transports.File({ filename: path.join("log", `log-${moment().format("YYYY-MM-DD HH-mm-ss-ms")}.log`), level: "info" })],
	format: winston.format.combine(
		winston.format.printf((info) => {
			return `${info.message}`;
		})
	),
});

export async function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
	logger.info(`HTTP [${request.method}] ${moment().format("YYYY-MM-DD HH:mm:ss:ms")} ${request.path} ${request.ip} Query: ${JSON.stringify(request.query)}`);
	next();
}
