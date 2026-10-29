export const extensionFeatures = [
 ['nexus','✧','cover-constellation'],['mirror','◈','world-transition'],['passport','▣','cover-memory-express'],
 ['planner','⌁','cover-memory-express'],['lab','⌘','cover-rainos'],['workshop','▦',null],
 ['exhibitions','▧','cover-film-darkroom'],['making-of','✎','cover-little-desk'],['museum','◇',null],['pocket','▤',null],
].map(([id,glyph,assetId])=>({id,path:'/'+id,glyph,assetId}))
export const visitRoutes = ['/', '/projects','/travel','/blog','/archive','/hardware','/history','/learning','/cinema','/letters',...extensionFeatures.map(f=>f.path)]
export const tourRoutes = [
 {id:'intro',minutes:3,stops:['/#about','/projects','/letters']},
 {id:'creations',minutes:10,stops:['/projects','/lab','/making-of','/hardware']},
 {id:'universe',minutes:20,stops:['/explore','/nexus','/travel','/archive','/exhibitions','/museum','/passport']},
]
// Curated references to existing public content, not claims of past physical exhibitions.
export const exhibitions = [{id:'learning-and-making',titleKey:'exhibitionTitle',summaryKey:'exhibitionIntro',curatorNoteKey:'curatorNote',theme:['learning','creation'],visibility:'public',startDate:'2026-10-29',endDate:'2027-12-31',itemIds:['article:cs-data-structures','project:datastruct-lab','article:cs-ai-llm','project:rains-digital-space']}]
// Add only owner-confirmed public objects; private stories do not belong in this file.
export const artifacts = []
export const labProjectIds = ['datastruct-lab','game-2048','snake-lab']
export const teachingParts = ['board','cpu','memory','storage','gpu','psu']
export const offlineRoutes=['/','/pocket','/projects','/projects/rains-digital-space','/blog/cs-data-structures','/blog/cs-ai-llm','/blog/calculus-limits']
