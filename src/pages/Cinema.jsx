import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mediaAlbums } from '../data/spaces'
import { localized } from '../i18n'
import { Filters } from '../components/UI'
import PhotoGallery from '../components/PhotoGallery'
import SpaceHeading from '../components/SpaceHeading'
export default function Cinema({ media = mediaAlbums }) {
 const {t,i18n}=useTranslation(),l=v=>localized(v,i18n.language),[view,setView]=useState('film')
 const albums=media.filter(a=>a.visibility==='public'&&a.confirmed===true)
 return <section className={'container section cinema-page cinema-'+view}><SpaceHeading name="cinema" mark="08" /><Filters label={t('space.cinema')} value={view} onChange={setView} items={['film','albums','viewing'].map(id=>({id,label:t('space.'+id)}))} />{!albums.length?<div className="cinema-empty"><span aria-hidden="true">▧</span><h2>{t('space.noMedia')}</h2><p>{t('space.noMediaHint')}</p></div>:<div className="cinema-albums">{albums.map(album=><section key={album.id}><h2>{l(album.title)}</h2>{album.date&&<small>{album.date}</small>}<p>{l(album.story)}</p><PhotoGallery photos={album.photos||[]} />{album.video?.src&&<video controls preload="none" poster={album.video.poster} aria-label={l(album.video.title)}><source src={album.video.src} />{album.video.captions&&<track default kind="captions" src={album.video.captions} srcLang={album.video.language||'zh'} label={l(album.video.title)} />}</video>}</section>)}</div>}</section>
}
