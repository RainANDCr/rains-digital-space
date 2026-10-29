import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import WorldMirror from '../components/WorldMirror'
import ExtensionHeading from '../components/ExtensionHeading'
import {useContentNodes} from '../hooks/useContentNodes'
export default function Mirror(){const {t}=useTranslation(),nodes=useContentNodes();return <section className="container section"><ExtensionHeading id="mirror" /><WorldMirror label /><p className="muted">{t('ext.relationHint')}</p><div className="nexus-results">{nodes.slice(0,6).map(node=><Link className="card" key={node.id} to={node.link}>{node.title}</Link>)}</div></section>}
