import dotenv from 'dotenv';
import z from 'zod';

dotenv.config({
    path: "../../.env",
})

const envScehma = z.object({
    SERVER_NODE_ENV: z.enum(['development', 'production']),
    SERVER_PORT: z.string().default('8787').transform((val) => parseInt(val, 10)),
    SERVER_JWT_SECRET: z.string().transform((val) => val.trim()),
})

function parseScehma() {
    try {
        return envScehma.parse(process.env);
    } catch (err) {
        console.error("errror while parsing env : ", err);
        process.exit(1);
    }
}

const env = parseScehma();

export default env;