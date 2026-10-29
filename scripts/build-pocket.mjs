import {readFileSync,writeFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {offlineRoutes} from '../src/data/extensions.js'
const assets=readdirSync('dist/assets').filter(file=>/\.(js|css)$/.test(file)).map(file=>'/assets/'+file)
const resources=['/index.html','/theme-init.js','/favicon.svg','/manifest.webmanifest','/icons/app-192.png','/icons/app-512.png',...assets]
const template=readFileSync('scripts/pocket-worker.js','utf8')
const hash=createHash('sha256').update(template).update(JSON.stringify(offlineRoutes));for(const path of resources)hash.update(readFileSync('dist'+path))
const prefix='rain-pocket-',version=prefix+hash.digest('hex').slice(0,16)
writeFileSync('dist/sw.js',`const CACHE=${JSON.stringify(version)}, PREFIX=${JSON.stringify(prefix)}, RESOURCES=${JSON.stringify(resources)}, ROUTES=${JSON.stringify(offlineRoutes)};\n`+template)
console.log('Pocket archive worker prepared:',version,'public shell resources:',resources.length)
