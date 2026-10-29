import { Link } from 'react-router-dom'
import { safeExternal } from '../utils/filter'
export function Button({ to, href, children, secondary = false, glass = 'clear', ...props }) {
 const className = 'button' + (secondary ? ' secondary' : '')
 if (to) return <Link className={className} data-glass={glass||undefined} to={to} {...props}>{children}</Link>
 if (href) { const safe = safeExternal(href); return safe ? <a className={className} data-glass={glass||undefined} href={safe} target="_blank" rel="noopener noreferrer" {...props}>{children} ↗</a> : null }
 return <button className={className} data-glass={glass||undefined} type="button" {...props}>{children}</button>
}
export function Card({ children, className = '', glass, ...props }) { return <article className={'card ' + className} data-glass={glass} {...props}>{children}</article> }
export function Filters({ items, value, onChange, label }) {
 return <div className="filters" role="group" aria-label={label}>{items.map(item => <button type="button" key={item.id} aria-pressed={value === item.id} onClick={() => onChange(item.id)}>{item.label}</button>)}</div>
}
