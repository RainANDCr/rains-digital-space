import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export default function NotFound() { const { t } = useTranslation(); return <section className="container section"><p className="eyebrow">404</p><h1>{t('notFound')}</h1><p>{t('notFoundText')}</p><Link className="button" to="/">{t('home')}</Link></section> }
