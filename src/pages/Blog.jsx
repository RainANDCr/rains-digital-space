import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { posts, readingMinutes } from '../data/posts'
import { filterPosts } from '../utils/filter'
import { Card, Button, Filters } from '../components/UI'
export default function Blog() {
 const { t } = useTranslation()
 const [query, setQuery] = useState(''), [tag, setTag] = useState(''), [category, setCategory] = useState('')
 const visible = filterPosts(posts, { query, tag, category })
 return <section className="container section"><p className="eyebrow">{t('notes')}</p><h1>{t('blog')}</h1><p className="muted">{t('blogIntro')}</p>
  <div className="search-panel"><label htmlFor="search">{t('search')}</label><div className="search-row"><input id="search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t('search')} /><Button secondary onClick={() => setQuery('')}>{t('clear')}</Button></div>
   <Filters label={t('category')} value={category} onChange={setCategory} items={[{ id: '', label: t('all') }, ...[...new Set(posts.map(p => p.category))].map(id => ({ id, label: t('categories.' + id) }))]} />
   <Filters label={t('tags')} value={tag} onChange={setTag} items={[{ id: '', label: t('tags') + ': ' + t('all') }, ...[...new Set(posts.flatMap(p => p.tags))].map(id => ({ id, label: id }))]} />
   <Button secondary onClick={() => { setQuery(''); setTag(''); setCategory('') }}>{t('reset')}</Button>
  </div>
  <p role="status">{t('results', { count: visible.length })}</p><div className="blog-grid">{visible.map(post => <Card key={post.slug}>
   <small className="accent">{post.draft ? t('draft') : t('published')} · {t('categories.' + post.category)} · {post.language}</small><h2>{post.title}</h2><p>{post.summary}</p><p className="muted"><time dateTime={post.date}>{post.date}</time> · {t('minutes', { count: readingMinutes(post.body) })}</p>
   <div className="tags">{post.tags.map(x => <button key={x} aria-pressed={tag === x} onClick={() => setTag(x)}>{x}</button>)}</div><Button to={'/blog/' + post.slug} secondary>{t('read')} ↗</Button>
  </Card>)}</div>{!visible.length && <p className="empty">{t('empty')}</p>}
 </section>
}

