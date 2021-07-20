import { NextFunction, Request, Response } from "express";
import moment from "moment";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

var transport = new DailyRotateFile({
	filename: "log-%DATE%.log",
	datePattern: "YYYY-MM-DD-HH",
	maxSize: "10mb",
	maxFiles: "5",
	dirname: "./log",
});

const logger = winston.createLogger({
	transports: [transport],
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
