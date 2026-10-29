import '../styles/paper-corner.css'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { posts, readingMinutes } from '../data/posts'
import NotFound from './NotFound'
import CollageDecoration from '../components/CollageDecoration'
import { historyMeta } from '../data/spaces'
import { safeExternal } from '../utils/filter'
export default function BlogDetail() {
 const { slug } = useParams(), { t, i18n } = useTranslation()
 const post = posts.find(p => p.slug === slug)
 if (!post) return <NotFound />
 const headings=[]
 let fenced=false
 for(const [index,line] of post.body.split('\n').entries()) { if(/^\s*(```|~~~)/.test(line)){fenced=!fenced;continue}const match=!fenced&&/^#{2,3}\s+(.+)$/.exec(line);if(match)headings.push({title:match[1],line:index+1}) }
 const heading = Tag => ({node,children}) => <Tag id={'section-'+node.position.start.line} tabIndex={-1}>{children}</Tag>
 return <article className="reading section"><Link to="/blog">← {t('back')}</Link><header><p className="eyebrow">{post.draft ? t('draft') : t('published')} · {t('categories.' + post.category)}</p><h1>{post.title}</h1><p>{post.summary}</p>
  <p className="muted">{post.draft ? t('drafted') : t('published')}: <time dateTime={post.date}>{post.date}</time> · {t('updated')}: <time dateTime={post.updated}>{post.updated}</time> · {t('minutes', { count: readingMinutes(post.body) })}</p><CollageDecoration className="tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</CollageDecoration></header>
  {i18n.language !== post.language && <p className="notice">{t('untranslated', { language: post.language === 'en' ? 'English' : '简体中文' })}</p>}
  {headings.length>0&&<details className="article-contents" data-glass="regular"><summary className="paper-corner">{t('space.contents')}</summary><ol>{headings.map(item=><li key={item.line}><a href={'#section-'+item.line}>{item.title}</a></li>)}</ol></details>}
  <div className="prose" lang={post.language}><Markdown skipHtml remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={{ h2:heading('h2'),h3:heading('h3'),img: ({node,...props}) => <img {...props} loading="lazy" />, table: ({node,...props}) => <div className="table-scroll" tabIndex={0}><table {...props} /></div> }}>{post.body}</Markdown></div>
  {historyMeta[post.slug]?.sources?.filter(source=>safeExternal(source.url)).length>0&&<section><h2>{t('space.source')}</h2><ul>{historyMeta[post.slug].sources.filter(source=>safeExternal(source.url)).map(source=><li key={source.url}><a href={safeExternal(source.url)} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ul></section>}
  <Link to="/blog">← {t('back')}</Link>
 </article>
}
