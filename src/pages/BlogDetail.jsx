import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { posts, readingMinutes } from '../data/posts'
import NotFound from './NotFound'
export default function BlogDetail() {
 const { slug } = useParams(), { t, i18n } = useTranslation()
 const post = posts.find(p => p.slug === slug)
 if (!post) return <NotFound />
 return <article className="reading section"><Link to="/blog">← {t('back')}</Link><header><p className="eyebrow">{post.draft ? t('draft') : t('published')} · {t('categories.' + post.category)}</p><h1>{post.title}</h1><p>{post.summary}</p>
  <p className="muted">{post.draft ? t('drafted') : t('published')}: <time dateTime={post.date}>{post.date}</time> · {t('updated')}: <time dateTime={post.updated}>{post.updated}</time> · {t('minutes', { count: readingMinutes(post.body) })}</p><div className="tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div></header>
  {i18n.language !== post.language && <p className="notice">{t('untranslated', { language: post.language === 'en' ? 'English' : '简体中文' })}</p>}
  <div className="prose" lang={post.language}><Markdown skipHtml remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={{ img: props => <img {...props} loading="lazy" />, table: props => <div className="table-scroll" tabIndex={0}><table {...props} /></div> }}>{post.body}</Markdown></div>
  <Link to="/blog">← {t('back')}</Link>
 </article>
}
