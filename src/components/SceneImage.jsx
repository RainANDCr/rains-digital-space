import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {visualAssets} from '../data/visuals'
import {localized} from '../i18n'

export default function SceneImage({assetId,...props}) {
 const asset=visualAssets[assetId]
 // A new asset remounts the loading state, including after a failed world image.
 return <SceneAsset key={assetId} asset={asset} {...props} />
}
function SceneAsset({asset,className='',priority=false,sizes='(max-width: 720px) 100vw, 1200px',position='center',decorative=false}) {
 const {i18n,t}=useTranslation(),[state,setState]=useState('loading')
 const variants=asset?.variants,large=variants?.at(-1)
 return <span className={'scene-image '+className} data-state={!asset?'error':state} style={{'--scene-position':position}}>
  {asset&&state!=='error'&&<img src={large.src} srcSet={variants.map(v=>`${v.src} ${v.width}w`).join(', ')} sizes={sizes} width={large.width} height={large.height} alt={decorative?'':localized(asset.alt,i18n.language)} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" onLoad={()=>setState('ready')} onError={()=>setState('error')} />}
  {(!asset||state==='error')&&<span className="scene-fallback" role={decorative?undefined:'img'} aria-label={decorative?undefined:t('space.artUnavailable')} aria-hidden={decorative||undefined}>✧</span>}
 </span>
}
