const log4js = require("log4js");
require("dotenv").config();
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SENDER = process.env.SMTP_SENDER;
const SMTP_RECP = process.env.SMTP_RECP;

const LOG_PATH = "./logs";

log4js.configure({
	pm2: process.env.APP_ENV == "local" ? false : true,
	appenders: {
		email: {
			type: "@log4js-node/smtp",
			transport: {
				plugin: "smtp",
				options: {
					host: SMTP_HOST,
					port: SMTP_PORT,
					auth: {
						user: SMTP_USER,
						pass: SMTP_PASS
					}
				}
			},
			recipients: SMTP_RECP,
			sender: SMTP_SENDER
		},
		access: {
			type: "dateFile",
			filename: `${LOG_PATH}/access.log`,
			pattern: "-yyyy-MM-dd",
			backups: 3
		},
		debug: {
			type: "dateFile",
			filename: `${LOG_PATH}/debug.log`,
			pattern: "-yyyy-MM-dd",
			backups: 3
		},
		error: {
			type: "dateFile",
			filename: `${LOG_PATH}/error.log`,
			pattern: "-yyyy-MM-dd",
			backups: 3
		}
	},
	categories: {
		default: { appenders: ["access"], level: "ALL" },
		access: { appenders: ["access"], level: "DEBUG" },
		debug: { appenders: ["debug"], level: "DEBUG" },
		email: { appenders: ["email", "error"], level: "ERROR" }
	}
});

module.exports = {
	access: log4js.getLogger("access"),
	email: log4js.getLogger("email"),
	debug: log4js.getLogger("debug"),
	express: log4js.connectLogger(log4js.getLogger("access"), {
		level: "auto",
		format: (req, res, format) => {
			return format(
				`:remote-addr - :method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent" --data : ${JSON.stringify(
					req.body
				)}`
			);
		}
	})
};
