import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'
import { mkdir, appendFile } from 'fs/promises'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logEvents = async (message, logFile) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await mkdir(path.join(__dirname, '..', 'logs'))
        }

        await appendFile(path.join(__dirname, '..', 'logs', logFile), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    //console.log(`${req.method} ${req.path}`)
    next()
}

export default logger