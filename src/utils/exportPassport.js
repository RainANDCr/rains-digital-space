export async function exportPassport(title,entries){
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=220+Math.ceil(entries.length/3)*125
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable')
 ctx.fillStyle='#15213a';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#ede6d8';ctx.font='bold 38px sans-serif';ctx.fillText(title,50,65);ctx.font='20px sans-serif';ctx.fillText("Rain's Digital Space · "+new Date().toLocaleDateString(),50,108)
 entries.forEach((entry,i)=>{const x=50+i%3*370,y=150+Math.floor(i/3)*125;ctx.strokeStyle=entry.unlocked?'#c0ac7b':'#71819a';ctx.strokeRect(x,y,345,105);ctx.fillStyle=entry.unlocked?'#ece6d9':'#9baabe';ctx.font='22px sans-serif';ctx.fillText(entry.label,x+15,y+38,310);ctx.font='17px sans-serif';ctx.fillText(entry.date||'—',x+15,y+76,310)})
 const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('Export unavailable')
 const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='rain-visitor-passport.png';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
