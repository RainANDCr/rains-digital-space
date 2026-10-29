import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {usePocket} from '../components/PocketProvider'
import {offlineRoutes} from '../data/extensions'
import {posts} from '../data/posts'
import {Button,Card} from '../components/UI'
import ExtensionHeading from '../components/ExtensionHeading'
export default function Pocket(){const {t}=useTranslation(),pocket=usePocket();return <section className="container section"><ExtensionHeading id="pocket" /><p role="status">{t(pocket.online?'ext.online':'ext.offline')} · {pocket.ready?t('ext.offlineReady'):t('ext.offlineSelection')}</p>{!pocket.production&&<p className="notice">{t('ext.developmentOffline')}</p>}<Card><h2>{t('ext.offlineSelection')}</h2><ul>{offlineRoutes.map(path=><li key={path}><Link to={path}>{posts.find(post=>'/blog/'+post.slug===path)?.title||path}</Link></li>)}</ul><p>{t('ext.offlineLimit')}</p><div className="actions"><Button disabled={!pocket.available||pocket.busy} onClick={pocket.prepare}>{t(pocket.busy?'ext.saving':'ext.saveOffline')}</Button><Button secondary disabled={!pocket.available||pocket.busy} onClick={pocket.clear}>{t('ext.clearOffline')}</Button></div>{pocket.error&&<p role="alert">{t('ext.offlineError')}</p>}</Card>{pocket.waiting&&<div className="notice"><p>{t('ext.updateReady')}</p><Button onClick={pocket.update}>{t('ext.applyUpdate')}</Button></div>}<section className="space-block"><h2>{t('ext.installApp')}</h2><p>{t('ext.installHint')}</p>{pocket.canInstall&&<Button onClick={pocket.install}>{t('ext.installApp')}</Button>}</section></section>}
