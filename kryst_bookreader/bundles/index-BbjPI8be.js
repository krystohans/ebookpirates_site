var hc=Object.defineProperty;var fc=(i,e,t)=>e in i?hc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var He=(i,e,t)=>fc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();class pc{constructor(e=100){He(this,"words",[]);He(this,"currentStartIndex",0);He(this,"visibleWordCount",100);He(this,"isAnimating",!1);He(this,"leadingSpacerLines",0);He(this,"trailingSpacerLines",0);He(this,"inlineSpacerWidth",0);He(this,"anchoredWordIndex",null);this.visibleWordCount=e}setText(e,t=0){if(this.leadingSpacerLines=0,this.trailingSpacerLines=0,this.inlineSpacerWidth=0,this.anchoredWordIndex=null,!e){this.words=[],this.currentStartIndex=0;return}this.words=e.split(/\s+/).filter(n=>n.length>0),this.currentStartIndex=Math.max(0,Math.min(t,Math.max(0,this.words.length-1)))}getEffectiveCapacity(){return this.visibleWordCount}setVisibleWordCount(e){this.visibleWordCount=Math.max(10,e)}getCandidateTokens(e=260){const t=Math.min(this.currentStartIndex+e,this.words.length),n=[];for(let r=this.currentStartIndex;r<t;r++)n.push({index:r,word:this.words[r],isLastVisible:r===t-1});return n}getVisibleTokens(){const e=Math.min(this.currentStartIndex+this.visibleWordCount,this.words.length),t=[];for(let n=this.currentStartIndex;n<e;n++)t.push({index:n,word:this.words[n],isLastVisible:n===e-1});return t}getLastVisibleWordIndex(){const e=Math.min(this.currentStartIndex+this.visibleWordCount,this.words.length);return Math.max(this.currentStartIndex,e-1)}getCurrentIndex(){return this.currentStartIndex}getTotalWordCount(){return this.words.length}getSnippetAt(e,t=18){const n=Math.max(0,e),r=Math.min(n+t,this.words.length);return this.words.slice(n,r).join(" ")+(r<this.words.length?"...":"")}isBusyAnimating(){return this.isAnimating}isAtChapterEnd(e){return(e!==void 0&&e>=this.currentStartIndex?e:this.getLastVisibleWordIndex())>=this.words.length-1}isAtChapterBeginning(e){return(e!==void 0&&e>=0?e:this.currentStartIndex)<=0&&this.currentStartIndex<=0}stepForward(e,t){if(this.isAnimating)return!1;let n,r=t;typeof e=="function"?(r=e,n=void 0):n=e;const s=n!==void 0&&n>=this.currentStartIndex?n:this.getLastVisibleWordIndex();return s>=this.words.length-1?!1:(this.isAnimating=!0,this.currentStartIndex=s,this.leadingSpacerLines=0,this.trailingSpacerLines=0,this.inlineSpacerWidth=0,this.anchoredWordIndex=null,setTimeout(()=>{this.isAnimating=!1,r&&r()},180),!0)}stepBackward(e,t){if(this.isAnimating||this.currentStartIndex<=0)return!1;let n,r=t;typeof e=="function"?(r=e,n=void 0):n=e,this.isAnimating=!0;const s=n!==void 0&&n>=0?n:this.currentStartIndex,a=Math.max(1,this.visibleWordCount-1);return this.currentStartIndex=Math.max(0,s-a),this.leadingSpacerLines=0,this.trailingSpacerLines=0,this.inlineSpacerWidth=0,this.anchoredWordIndex=null,setTimeout(()=>{this.isAnimating=!1,r&&r()},180),!0}dragOffset(e){const t=this.currentStartIndex+e;this.currentStartIndex=Math.max(0,Math.min(t,Math.max(0,this.words.length-this.visibleWordCount)))}jumpToWord(e){this.currentStartIndex=Math.max(0,Math.min(e,Math.max(0,this.words.length-1))),this.leadingSpacerLines=0,this.trailingSpacerLines=0,this.inlineSpacerWidth=0,this.anchoredWordIndex=null}getLeadingSpacerLines(){return this.leadingSpacerLines}getTrailingSpacerLines(){return this.trailingSpacerLines}setSpacers(e,t){this.leadingSpacerLines=Math.max(0,e),this.trailingSpacerLines=Math.max(0,t)}getInlineSpacerWidth(){return this.inlineSpacerWidth}getAnchoredWordIndex(){return this.anchoredWordIndex}setInlineSpacer(e,t){this.inlineSpacerWidth=Math.max(0,e),this.anchoredWordIndex=t}anchorWord2D(e,t,n,r=600,s=280,a=31.5){if(this.words.length===0)return;e=Math.max(0,Math.min(e,this.words.length-1)),this.anchoredWordIndex=e;const o=Math.max(3,Math.floor(s/a)),c=Math.max(0,Math.min(Math.floor(n/a),o-1)),l=60,f=Math.max(300,r||600),u=Math.max(4,Math.floor(f/l)),d=Math.max(0,f-80),m=Math.min(Math.max(0,t),d);let _=Math.floor(m/l);_=Math.max(0,Math.min(_,u-1));const M=m-_*l;this.inlineSpacerWidth=M>8?Math.round(M):0;const h=c*u+_;if(e>=h)this.currentStartIndex=e-h,this.leadingSpacerLines=0;else{this.currentStartIndex=0;const p=Math.max(0,e-_),S=Math.ceil(p/u);this.leadingSpacerLines=Math.max(0,c-S)}this.trailingSpacerLines=0}anchorWordToLine(e,t,n=8,r=9){this.anchorWord2D(e,0,t*31.5,r*65,n*31.5,31.5)}}class mc{constructor(e){He(this,"reflowEngine");He(this,"currentActiveWordIndex",0);He(this,"isAutoAdvancing",!1);He(this,"isManualNavigating",!1);He(this,"onWordFocusCallback");He(this,"onPageTurnCallback");this.reflowEngine=e}onWordFocus(e){this.onWordFocusCallback=e}onPageTurn(e){this.onPageTurnCallback=e}setManualNavigating(e){this.isManualNavigating=e}syncAudioProgress(e){if(this.isManualNavigating)return;this.currentActiveWordIndex=e;const t=this.reflowEngine.getVisibleTokens(),n=t[t.length-1];this.onWordFocusCallback&&this.onWordFocusCallback(this.currentActiveWordIndex),n&&e>=n.index&&!this.isAutoAdvancing&&(this.isAutoAdvancing=!0,this.reflowEngine.stepForward(n.index,()=>{this.isAutoAdvancing=!1,this.onPageTurnCallback&&this.onPageTurnCallback()}))}getActiveWordIndex(){return this.currentActiveWordIndex}setActiveWordIndex(e){this.currentActiveWordIndex=e,this.onWordFocusCallback&&this.onWordFocusCallback(e)}}class gc{constructor(){He(this,"audioCtx",null);He(this,"bgmAudio",null);He(this,"bgmGainNode",null);He(this,"bgmVolume",.6);He(this,"voiceAudio",null);He(this,"voiceGainNode",null);He(this,"voiceFilterNode",null);He(this,"voiceVolume",.9);He(this,"playbackRate",1);He(this,"isDucking",!1);He(this,"narratorType","studio_master")}ensureAudioContext(){if(!this.audioCtx){const e=window.AudioContext||window.webkitAudioContext;this.audioCtx=new e}this.audioCtx.state==="suspended"&&this.audioCtx.resume()}setBgmVolume(e){this.bgmVolume=Math.max(0,Math.min(e,1)),this.applyBgmGain()}getBgmVolume(){return this.bgmVolume}setVoiceVolume(e){this.voiceVolume=Math.max(0,Math.min(e,1)),this.voiceGainNode&&this.audioCtx&&this.voiceGainNode.gain.setTargetAtTime(this.voiceVolume,this.audioCtx.currentTime,.05)}getVoiceVolume(){return this.voiceVolume}setPlaybackRate(e){this.playbackRate=Math.max(.7,Math.min(e,2)),this.voiceAudio&&(this.voiceAudio.playbackRate=this.playbackRate)}getPlaybackRate(){return this.playbackRate}setDucking(e){this.isDucking=e,this.applyBgmGain()}applyBgmGain(){if(!this.bgmGainNode||!this.audioCtx)return;const e=this.isDucking?this.bgmVolume*.32:this.bgmVolume;this.bgmGainNode.gain.setTargetAtTime(e,this.audioCtx.currentTime,.15)}loadBgm(e,t=!0){if(this.ensureAudioContext(),this.bgmAudio&&this.bgmAudio.pause(),this.bgmAudio=new Audio(e),this.bgmAudio.loop=t,this.bgmAudio.crossOrigin="anonymous",this.audioCtx){const n=this.audioCtx.createMediaElementSource(this.bgmAudio);this.bgmGainNode=this.audioCtx.createGain(),this.applyBgmGain(),n.connect(this.bgmGainNode),this.bgmGainNode.connect(this.audioCtx.destination)}}loadVoice(e,t,n,r=0){if(this.ensureAudioContext(),this.voiceAudio&&this.voiceAudio.pause(),this.voiceAudio=new Audio(e),this.voiceAudio.crossOrigin="anonymous",this.voiceAudio.playbackRate=this.playbackRate,this.audioCtx){const s=this.audioCtx.createMediaElementSource(this.voiceAudio);this.voiceGainNode=this.audioCtx.createGain(),this.voiceGainNode.gain.value=this.voiceVolume,this.voiceFilterNode=this.audioCtx.createBiquadFilter(),this.voiceFilterNode.type="peaking",this.voiceFilterNode.frequency.value=2400,this.voiceFilterNode.gain.value=1.5,s.connect(this.voiceFilterNode),this.voiceFilterNode.connect(this.voiceGainNode),this.voiceGainNode.connect(this.audioCtx.destination)}if(r>0){const s=()=>{this.voiceAudio&&this.voiceAudio.duration&&(this.voiceAudio.currentTime=Math.min(Math.max(0,this.voiceAudio.duration-.2),r))};this.voiceAudio.readyState>=1?s():this.voiceAudio.addEventListener("loadedmetadata",s,{once:!0})}t&&(this.voiceAudio.onended=()=>{this.setDucking(!1),t()}),n&&(this.voiceAudio.ontimeupdate=()=>{this.voiceAudio&&n(this.voiceAudio.currentTime)})}play(){this.ensureAudioContext(),this.bgmAudio&&this.bgmAudio.paused&&this.bgmAudio.play().catch(e=>console.warn("BGM play hiba:",e)),this.voiceAudio&&this.voiceAudio.paused&&(this.setDucking(!0),this.voiceAudio.play().catch(e=>console.warn("Voice play hiba:",e)))}pause(){this.voiceAudio&&!this.voiceAudio.paused&&this.voiceAudio.pause(),this.bgmAudio&&!this.bgmAudio.paused&&this.bgmAudio.pause(),this.setDucking(!1)}seek(e){this.voiceAudio&&(this.voiceAudio.currentTime=Math.max(0,e))}getCurrentTime(){return this.voiceAudio?this.voiceAudio.currentTime:0}getDuration(){return this.voiceAudio&&this.voiceAudio.duration||0}isVoicePlaying(){return!!(this.voiceAudio&&!this.voiceAudio.paused)}hasVoice(){return!!(this.voiceAudio&&this.voiceAudio.src)}stopVoice(){this.voiceAudio&&(this.voiceAudio.pause(),this.voiceAudio.currentTime=0),this.setDucking(!1)}clearVoice(){this.voiceAudio&&(this.voiceAudio.pause(),this.voiceAudio.ontimeupdate=null,this.voiceAudio.onended=null,this.voiceAudio.src="",this.voiceAudio=null),this.setDucking(!1)}}const _c=[{id:"water_deep",name:"Mélytenger / Árok",color:"#0b1d3a",category:"water",range:"< -2000m",tooltip:"Abisszális tengeri árkok (< -2000m)"},{id:"water_mid",name:"Nyílt Óceán",color:"#1a3c6e",category:"water",range:"-2000m .. -200m",tooltip:"Közepes tengermélység (-2000m .. -200m)"},{id:"water_shallow",name:"Sekély Tenger / Part",color:"#4fa3d1",category:"water",range:"-200m .. 0m",tooltip:"Part menti sekély vizek (-200m .. 0m)"},{id:"depression",name:"Mélyföld",color:"#1b4332",category:"lowland",range:"< 0m (Szárazföld)",tooltip:"Tengerszint alatti szárazföldi depressziók"},{id:"plain_low",name:"Alacsony Alföld",color:"#52b788",category:"lowland",range:"0m .. 100m",tooltip:"Tengerparti síkságok (0m .. 100m)"},{id:"plain_high",name:"Magas Alföld / Síkság",color:"#95d5b2",category:"lowland",range:"100m .. 200m",tooltip:"Emelkedő síkvidékek (100m .. 200m)"},{id:"hill_low",name:"Alacsony Dombság",color:"#e9d8a6",category:"hill",range:"200m .. 350m",tooltip:"Lankás dombvidékek (200m .. 350m)"},{id:"hill_high",name:"Magas Dombság",color:"#ee9b00",category:"hill",range:"350m .. 500m",tooltip:"Hullámos dombságok (350m .. 500m)"},{id:"mountain_low",name:"Alacsony Középhegység",color:"#ca6702",category:"mountain",range:"500m .. 800m",tooltip:"Erdős középhegységek (500m .. 800m)"},{id:"mountain_mid",name:"Középhegység",color:"#bb3e03",category:"mountain",range:"800m .. 1100m",tooltip:"Meredek hegygerincek (800m .. 1100m)"},{id:"mountain_high",name:"Magas Középhegység",color:"#9b2226",category:"mountain",range:"1100m .. 1500m",tooltip:"Fenyves bércek (1100m .. 1500m)"},{id:"alpine_rock",name:"Alpesi Sziklavilág",color:"#4a4e69",category:"mountain",range:"1500m .. 2200m",tooltip:"Fahatár feletti sziklák (1500m .. 2200m)"},{id:"alpine_peak",name:"Magashegység / Csúcs",color:"#6c757d",category:"mountain",range:"2200m .. 3000m",tooltip:"Ormok és csúcsok (2200m .. 3000m)"},{id:"snow_glacier",name:"Örök Hó & Gleccser",color:"#ffffff",category:"mountain",range:"> 3000m",tooltip:"Állandó hómezők (> 3000m)"},{id:"volcano_lava",name:"Vulkáni / Parázsmező",color:"#7f1d1d",category:"special",range:"Vulkáni Zóna",tooltip:"Vulkáni bazalt és láva"},{id:"wetland_swamp",name:"Mocsár / Lagúna",color:"#2d6a4f",category:"special",range:"Vadvíz / Láp",tooltip:"Tőzeglápok és mangrove"}];class vc{constructor(){He(this,"mapData",null);He(this,"zoom",1);He(this,"panX",0);He(this,"panY",0);He(this,"isDragging",!1);He(this,"lastDragX",0);He(this,"lastDragY",0);He(this,"onTargetChangedCallback");He(this,"idCanvas",null);He(this,"idCtx",null)}loadMap(e){var t;if(this.mapData=e,this.zoom=1,this.panX=0,this.panY=0,this.idCanvas=null,this.idCtx=null,(t=e.vectorZoneLayer)!=null&&t.idMaskDataUrl){const n=new Image;n.onload=()=>{this.idCanvas=document.createElement("canvas"),this.idCanvas.width=n.naturalWidth||n.width||1408,this.idCanvas.height=n.naturalHeight||n.height||768,this.idCtx=this.idCanvas.getContext("2d",{willReadFrequently:!0}),this.idCtx&&(this.idCtx.drawImage(n,0,0),this.evaluateTarget())},n.src=e.vectorZoneLayer.idMaskDataUrl}this.evaluateTarget()}onTargetChanged(e){this.onTargetChangedCallback=e}setZoom(e){this.zoom=Math.max(.45,Math.min(e,5)),this.evaluateTarget()}getZoom(){return this.zoom}zoomIn(e=.25){this.setZoom(this.zoom+e)}zoomOut(e=.25){this.setZoom(this.zoom-e)}zoomByRatio(e){this.setZoom(this.zoom*e)}resetZoom(){this.zoom=1,this.panX=0,this.panY=0,this.evaluateTarget()}startDrag(e,t){this.isDragging=!0,this.lastDragX=e,this.lastDragY=t}dragMove(e,t){if(!this.isDragging)return;const n=e-this.lastDragX,r=t-this.lastDragY;this.panX+=n,this.panY+=r,this.lastDragX=e,this.lastDragY=t,this.evaluateTarget()}endDrag(){this.isDragging=!1}getPan(){return{x:this.panX,y:this.panY}}getCurrentCoordinates(){const e=Math.max(0,Math.min(100,50-this.panX/(300*this.zoom)*100)),t=Math.max(0,Math.min(100,50-this.panY/(300*this.zoom)*100)),n=Math.floor(10+t/100*8),r=Math.floor(t%10*6),s=Math.floor(65+e/100*15),a=Math.floor(e%10*6);return`ÉSz ${n}°${r.toString().padStart(2,"0")}', NYh ${s}°${a.toString().padStart(2,"0")}'`}evaluateTarget(){var c,l;if(!this.mapData||!this.onTargetChangedCallback)return;const e=Math.max(0,Math.min(100,50-this.panX/(300*this.zoom)*100)),t=Math.max(0,Math.min(100,50-this.panY/(300*this.zoom)*100)),n=this.getCurrentCoordinates();let r=null,s=7.5;for(const f of this.mapData.anchors){const u=Math.hypot(f.xPercent-e,f.yPercent-t);u<s&&(s=u,r=f)}let a=null;if((c=this.mapData.vectorZoneLayer)!=null&&c.zones){const d=e/100*1408,m=t/100*768;for(const _ of this.mapData.vectorZoneLayer.zones)if(_.geometry&&_.geometry.length>0&&this.pointInMultiPolygon([d,m],_.geometry)){a=_;break}if(!a&&this.idCanvas&&this.idCtx){const _=Math.floor(e/100*this.idCanvas.width),M=Math.floor(t/100*this.idCanvas.height);if(_>=0&&_<this.idCanvas.width&&M>=0&&M<this.idCanvas.height){const h=this.idCtx.getImageData(_,M,1,1).data;if(h[3]>=30){const p=h[0]<<8|h[1];a=this.mapData.vectorZoneLayer.zones.find(S=>S.numericId===p)||null}}}}let o=null;if((l=this.mapData.elevationLayer)!=null&&l.levels){const d=e/100*1408,m=t/100*768;for(const _ of _c){const M=this.mapData.elevationLayer.levels[_.id];if(M&&M.length>0&&this.pointInMultiPolygon([d,m],M)){o=_;break}}}this.onTargetChangedCallback(r,n,a,o)}pointInRing(e,t){let n=!1;const r=e[0],s=e[1];for(let a=0,o=t.length-1;a<t.length;o=a++){const c=t[a][0],l=t[a][1],f=t[o][0],u=t[o][1];l>s!=u>s&&r<(f-c)*(s-l)/(u-l)+c&&(n=!n)}return n}pointInPolygon(e,t){if(!t||t.length===0||!this.pointInRing(e,t[0]))return!1;for(let n=1;n<t.length;n++)if(this.pointInRing(e,t[n]))return!1;return!0}pointInMultiPolygon(e,t){if(!t)return!1;for(const n of t)if(this.pointInPolygon(e,n))return!0;return!1}}class xc{constructor(){He(this,"isScrollMode",!1)}activate(e){this.isScrollMode=e}getStatusBadge(){return this.isScrollMode?{text:"📜 Soványított LETkristály Másolat (Zene és 3D Álomkép nélkül)",color:"#94a3b8",isDegraded:!0}:{text:"💎 Felszentelt Kristálykönyv (Full Multimédiás Éber Álom)",color:"#d4af37",isDegraded:!1}}allowsMultimedia(){return!this.isScrollMode}}const dr=class dr{constructor(){He(this,"bookmarks",[]);this.loadFromStorage()}loadFromStorage(){try{const e=localStorage.getItem(dr.STORAGE_KEY);e?this.bookmarks=JSON.parse(e):this.bookmarks=[]}catch(e){console.warn("[KrystBookmarkEngine] Nem sikerült beolvasni a könyvjelzőket:",e),this.bookmarks=[]}}saveToStorage(){try{localStorage.setItem(dr.STORAGE_KEY,JSON.stringify(this.bookmarks))}catch(e){console.error("[KrystBookmarkEngine] Hiba a könyvjelzők mentésekor:",e)}}addBookmark(e){var a,o;const t=new Date().toISOString(),n=`bm_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,r=(a=e.title)!=null&&a.trim()?e.title.trim():`${e.chapterTitle} (${new Date().toLocaleTimeString("hu-HU",{hour:"2-digit",minute:"2-digit"})})`,s={id:n,bookId:e.bookId,title:r,charOffset:e.charOffset,wordIndex:e.wordIndex,chapterIndex:e.chapterIndex,chapterTitle:e.chapterTitle,quoteSnippet:e.quoteSnippet.trim(),note:((o=e.note)==null?void 0:o.trim())||"",audioTimestamp:e.audioTimestamp,isAuto:!!e.isAuto,createdAt:t,updatedAt:t};return s.isAuto&&(this.bookmarks=this.bookmarks.filter(c=>!(c.bookId===e.bookId&&c.isAuto))),this.bookmarks.unshift(s),this.saveToStorage(),s}updateBookmark(e,t){const n=this.bookmarks.find(r=>r.id===e);return n?(t.title!==void 0&&(n.title=t.title.trim()),t.note!==void 0&&(n.note=t.note.trim()),n.updatedAt=new Date().toISOString(),this.saveToStorage(),!0):!1}deleteBookmark(e){const t=this.bookmarks.length;return this.bookmarks=this.bookmarks.filter(n=>n.id!==e),this.bookmarks.length!==t?(this.saveToStorage(),!0):!1}async copyBookmarkToClipboard(e){const t=this.bookmarks.find(s=>s.id===e);if(!t)throw new Error("A könyvjelző nem található.");const n=t.audioTimestamp!==void 0?` (Időkód: ${Math.floor(t.audioTimestamp/60)}:${Math.floor(t.audioTimestamp%60).toString().padStart(2,"0")})`:"";let r=`«${t.quoteSnippet}»
— ${t.chapterTitle}${n}`;return t.note&&(r+=`
📝 Jegyzet: ${t.note}`),navigator.clipboard&&navigator.clipboard.writeText&&await navigator.clipboard.writeText(r),r}searchBookmarks(e,t){let n=this.bookmarks;t&&(n=n.filter(s=>s.bookId===t));const r=e.trim().toLowerCase();return r?n.filter(s=>s.title.toLowerCase().includes(r)||s.note.toLowerCase().includes(r)||s.quoteSnippet.toLowerCase().includes(r)||s.chapterTitle.toLowerCase().includes(r)):n}getAutoBookmark(e){return this.bookmarks.find(t=>t.bookId===e&&t.isAuto)}getBookmarksByBook(e){return this.bookmarks.filter(t=>t.bookId===e)}};He(dr,"STORAGE_KEY","kryst_reader_bookmarks_v32");let Qs=dr;const ho=[{id:"ferenc",name:"Ferenc",role:"Kalandor",icon:"⚓",gender:"male",description:"Mély, magabiztos tengerész férfihang"},{id:"peter",name:"Péter",role:"Fiatal kalóz",icon:"⚡",gender:"male",description:"Pörgős, vagány, érces kalózhang"},{id:"zenia",name:"Zénia",role:"Tengerésznő",icon:"🌊",gender:"female",description:"Tiszta, dallamos tengerész női hang"},{id:"csaba",name:"Csaba",role:"Veterán kapitány",icon:"📜",gender:"male",description:"Rekedtes, megfontolt mély bariton"}];function yc(i,e="audio/wav"){const t=window.atob(i),n=t.length,r=new Uint8Array(n);for(let a=0;a<n;a++)r[a]=t.charCodeAt(a);const s=new Blob([r],{type:e});return URL.createObjectURL(s)}async function Sc(i,e="ferenc",t=1){try{const n=new AbortController,r=setTimeout(()=>n.abort(),15e3),s=await fetch("http://127.0.0.1:5005/synthesize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:i,voice:e.toLowerCase(),lang:"hu",speed:t}),signal:n.signal});if(clearTimeout(r),!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);const a=await s.json();if(a.success&&a.audioBase64)return{success:!0,audioUrl:yc(a.audioBase64,"audio/wav"),engine:a.engine||"local_piper"};throw new Error(a.message||"Beszédszintézis nem adott vissza hanganyagot.")}catch(n){const r=n instanceof Error?n.message:String(n);return console.warn(`[PiperTtsBridge] Helyi Piper nem érhető el (${r}), tartalék motorra váltás.`),{success:!1,engine:"fallback_webspeech",error:r}}}function ea(i,e,t,n){if(!("speechSynthesis"in window)){console.error("Web Speech API nem támogatott a jelenlegi böngészőben."),n&&n();return}window.speechSynthesis.cancel();const r=new SpeechSynthesisUtterance(i);r.lang="hu-HU";const a=window.speechSynthesis.getVoices().find(l=>l.lang.toLowerCase().startsWith("hu"));a&&(r.voice=a);const o=e.toLowerCase();o==="ferenc"?(r.pitch=.92,r.rate=1):o==="peter"?(r.pitch=1.15,r.rate=1.18):o==="zenia"?(r.pitch=1.25,r.rate=1.02):o==="csaba"&&(r.pitch=.82,r.rate=.88);let c=0;r.onboundary=l=>{l.name==="word"&&(t&&t(c),c++)},r.onend=()=>{n&&n()},r.onerror=l=>{console.warn("[WebSpeech Fallback] Lejátszási hiba:",l),n&&n()},window.speechSynthesis.speak(r)}class Mc{constructor(){He(this,"state");He(this,"reflowEngine");He(this,"guideEngine");He(this,"audioMixer");He(this,"dreamStage");He(this,"mapEngine");He(this,"scrollReader");He(this,"bookmarkEngine");He(this,"activeBook",null);He(this,"activeMap",null);He(this,"onStateChangeCallback");this.reflowEngine=new pc(75),this.guideEngine=new mc(this.reflowEngine),this.audioMixer=new gc,this.mapEngine=new vc,this.scrollReader=new xc,this.bookmarkEngine=new Qs,this.state={mode:"browse",activeBookId:null,activeChapterIndex:0,activeWordIndex:0,isPlaying:!1,volumeBgm:.6,volumeVoice:.9,playbackRate:1,narratorType:"studio_master",selectedSingleVoice:"Ferenc",isDucking:!1,activeMapId:null,mapZoom:1,mapPanX:0,mapPanY:0}}setDreamStage(e){this.dreamStage=e}onStateChange(e){this.onStateChangeCallback=e}notify(){this.onStateChangeCallback&&this.onStateChangeCallback({...this.state})}setMode(e){this.state.mode=e,this.dreamStage&&this.dreamStage.setVisible(e==="audio_dream"),this.notify()}loadChapter(e,t=!1){if(!this.activeBook||e<0||e>=this.activeBook.chapters.length)return!1;this.state.activeChapterIndex=e;const n=this.activeBook.type==="scroll"||this.activeBook.type==="copy",r=this.activeBook.chapters[e];if(r){const s=r.paragraphs.join(`

`);let a=0;if(t){const o=s.split(/\s+/).filter(l=>l.length>0),c=Math.max(1,70);a=Math.max(0,o.length-c)}this.reflowEngine.setText(s,a),this.guideEngine.setActiveWordIndex(a),this.state.activeWordIndex=a,this.audioMixer.clearVoice(),"speechSynthesis"in window&&window.speechSynthesis.cancel(),this.state.isPlaying=!1,r.audioUrl&&!n&&this.audioMixer.loadVoice(r.audioUrl,()=>{this.state.isPlaying=!1,this.notify()},o=>{if(r.tokens&&r.tokens.length>0){const c=r.tokens.findIndex(l=>o>=l.startSec&&o<=l.endSec);c!==-1&&this.guideEngine.syncAudioProgress(c*8)}})}return this.notify(),!0}loadBook(e,t=0,n=0){this.activeBook=e,this.state.activeBookId=e.id;const r=e.type==="scroll"||e.type==="copy";this.scrollReader.activate(r),this.loadChapter(t,!1),n>0&&(this.reflowEngine.jumpToWord(n),this.guideEngine.setActiveWordIndex(n),this.state.activeWordIndex=n,this.notify())}loadMap(e){this.activeMap=e,this.state.activeMapId=e.id,this.mapEngine.loadMap(e),this.setMode("map")}handleContentTap(){if(!(this.state.mode==="browse"||this.state.mode==="bookmarks")){if(this.state.isPlaying&&(this.audioMixer.pause(),"speechSynthesis"in window&&window.speechSynthesis.speaking&&window.speechSynthesis.cancel(),this.dreamStage&&this.dreamStage.setPaused(!0),this.state.isPlaying=!1),this.activeBook){const e=this.activeBook.chapters[this.state.activeChapterIndex],t=this.guideEngine.getActiveWordIndex(),n=this.reflowEngine.getSnippetAt(t,16);this.bookmarkEngine.addBookmark({bookId:this.activeBook.id,chapterIndex:this.state.activeChapterIndex,chapterTitle:e?e.title:"Fejezet",wordIndex:t,charOffset:t*6,quoteSnippet:n,title:`Auto-Mentés: ${e?e.title:""}`,audioTimestamp:this.audioMixer.getCurrentTime(),isAuto:!0})}this.setMode("browse")}}resumeFromAutoBookmark(e){const t=this.bookmarkEngine.getAutoBookmark(e);if(!t||!this.activeBook)return!1;this.state.activeChapterIndex=t.chapterIndex;const n=this.activeBook.chapters[t.chapterIndex];return n&&(this.reflowEngine.setText(n.paragraphs.join(`

`),t.wordIndex),this.guideEngine.setActiveWordIndex(t.wordIndex),t.audioTimestamp!==void 0&&this.audioMixer.seek(t.audioTimestamp)),this.setMode("read_listen"),!0}togglePlayPause(){if(!(this.state.mode==="browse"||this.state.mode==="map"||this.state.mode==="bookmarks"))if(this.state.isPlaying)this.audioMixer.pause(),"speechSynthesis"in window&&window.speechSynthesis.speaking&&window.speechSynthesis.pause(),this.dreamStage&&this.dreamStage.setPaused(!0),this.state.isPlaying=!1,this.notify();else if(this.audioMixer.hasVoice())this.audioMixer.play(),"speechSynthesis"in window&&window.speechSynthesis.paused&&window.speechSynthesis.resume(),this.dreamStage&&this.dreamStage.setPaused(!1),this.state.isPlaying=!0,this.notify();else{const e=this.reflowEngine.getCurrentIndex();this.playChapterVoice(this.state.activeChapterIndex,this.state.selectedSingleVoice,e)}}seekAudioToWordIndex(e){var n;const t=this.reflowEngine.getTotalWordCount();if(!(t<=0)){if(this.guideEngine.setActiveWordIndex(e),this.state.activeWordIndex=e,this.audioMixer.hasVoice()){const r=this.audioMixer.getDuration();if(r>0){const a=Math.max(0,Math.min(.999,e/t))*r;this.audioMixer.seek(a)}}else if(this.state.isPlaying&&"speechSynthesis"in window&&window.speechSynthesis.speaking){window.speechSynthesis.cancel();const r=(n=this.activeBook)==null?void 0:n.chapters[this.state.activeChapterIndex];if(r){const a=r.paragraphs.join(`

`).split(/\s+/).filter(o=>o.length>0);ea(a.slice(e).join(" "),this.state.selectedSingleVoice||"ferenc",o=>{this.guideEngine.syncAudioProgress(e+o)},()=>{this.state.isPlaying=!1,this.notify()})}}}}async playChapterVoice(e,t,n=0,r){if(!this.activeBook||e<0||e>=this.activeBook.chapters.length)return;this.state.activeChapterIndex=e;const s=this.activeBook.type==="scroll"||this.activeBook.type==="copy",a=this.activeBook.chapters[e];if(!a)return;const o=t||this.state.selectedSingleVoice||"ferenc";this.state.selectedSingleVoice=o,this.audioMixer.clearVoice(),"speechSynthesis"in window&&window.speechSynthesis.cancel();const c=a.paragraphs.join(`

`);if(!c.trim())return;this.reflowEngine.setText(c,n),this.guideEngine.setActiveWordIndex(n),this.state.activeWordIndex=n;const l=c.split(/\s+/).filter(d=>d.length>0),f=l.length;if(a.audioUrl&&!s){r&&r(`🎧 Stúdió szinkron (${a.title})...`);let d=0;n>0&&f>0&&(d=Math.min(.999,n/f)*(this.audioMixer.getDuration()||30)),this.audioMixer.loadVoice(a.audioUrl,()=>{this.state.isPlaying=!1,this.notify();const m=this.state.activeChapterIndex+1;this.activeBook&&m<this.activeBook.chapters.length&&this.playChapterVoice(m,o,0,r)},m=>{if(a.tokens&&a.tokens.length>0){const _=a.tokens.findIndex(M=>m>=M.startSec&&m<=M.endSec);_!==-1&&this.guideEngine.syncAudioProgress(_*8)}},d),this.audioMixer.play(),this.state.isPlaying=!0,this.notify();return}r&&r(`🎙️ Piper szintézis: ${o.toUpperCase()} (Fejezet ${e+1})...`);const u=await Sc(c,o,this.state.playbackRate);if(u.success&&u.audioUrl){r&&r(`🔊 Felolvasás: ${o.toUpperCase()} (Piper)`);let d=0;n>0&&f>0&&(d=Math.min(.999,n/f)*30),this.audioMixer.loadVoice(u.audioUrl,()=>{this.state.isPlaying=!1,this.notify();const m=this.state.activeChapterIndex+1;this.activeBook&&m<this.activeBook.chapters.length&&this.playChapterVoice(m,o,0,r)},m=>{const _=this.audioMixer.getDuration();if(_>0&&f>0){const M=Math.min(.999,m/_),h=Math.floor(M*f);this.guideEngine.syncAudioProgress(h)}},d),this.audioMixer.play(),this.state.isPlaying=!0,this.notify()}else r&&r(`🔊 Felolvasás: ${o.toUpperCase()} (Böngésző)`),this.state.isPlaying=!0,this.notify(),ea(l.slice(n).join(" "),o,d=>{this.guideEngine.syncAudioProgress(n+d)},()=>{this.state.isPlaying=!1,this.notify();const d=this.state.activeChapterIndex+1;this.activeBook&&d<this.activeBook.chapters.length&&this.playChapterVoice(d,o,0,r)})}async playBookWithVoice(e,t="ferenc",n=0,r){this.activeBook=e,this.state.activeBookId=e.id,this.state.selectedSingleVoice=t;const s=e.type==="scroll"||e.type==="copy";this.scrollReader.activate(s),this.setMode("read_listen"),await this.playChapterVoice(this.state.activeChapterIndex||0,t,n,r)}async playScrollWithVoice(e,t="ferenc",n=0,r){return this.playBookWithVoice(e,t,n,r)}setBgmVolume(e){this.state.volumeBgm=e,this.audioMixer.setBgmVolume(e),this.notify()}setVoiceVolume(e){this.state.volumeVoice=e,this.audioMixer.setVoiceVolume(e),this.notify()}setPlaybackRate(e){const t=Math.max(.6,Math.min(e,2));this.state.playbackRate=t,this.audioMixer.setPlaybackRate(t),this.dreamStage&&this.dreamStage.setPlaybackSpeed(t),this.notify()}stepForward(e){if(this.reflowEngine.isBusyAnimating())return!1;const t=this.state.isPlaying||this.state.mode==="read_listen"||this.state.mode==="audio_dream";if(this.reflowEngine.isAtChapterEnd(e)){if(this.activeBook){const r=this.state.activeChapterIndex+1;if(r<this.activeBook.chapters.length)return t?this.playChapterVoice(r,this.state.selectedSingleVoice,0):this.loadChapter(r,!1),!0}return!1}if(this.guideEngine.setManualNavigating(!0),this.reflowEngine.stepForward(e,()=>{this.guideEngine.setManualNavigating(!1)})){const r=this.reflowEngine.getCurrentIndex();return this.seekAudioToWordIndex(r),this.notify(),!0}if(this.activeBook){const r=this.state.activeChapterIndex+1;if(r<this.activeBook.chapters.length)return t?this.playChapterVoice(r,this.state.selectedSingleVoice,0):this.loadChapter(r,!1),!0}return!1}stepBackward(e){if(this.reflowEngine.isBusyAnimating())return!1;const t=this.state.isPlaying||this.state.mode==="read_listen"||this.state.mode==="audio_dream";if(this.reflowEngine.isAtChapterBeginning(e)){if(this.activeBook){const r=this.state.activeChapterIndex-1;if(r>=0){if(t){const a=this.activeBook.chapters[r].paragraphs.join(`

`).split(/\s+/).filter(c=>c.length>0),o=Math.max(0,a.length-70);this.playChapterVoice(r,this.state.selectedSingleVoice,o)}else this.loadChapter(r,!0);return!0}}return!1}if(this.guideEngine.setManualNavigating(!0),this.reflowEngine.stepBackward(e,()=>{this.guideEngine.setManualNavigating(!1)})){const r=this.reflowEngine.getCurrentIndex();return this.seekAudioToWordIndex(r),this.notify(),!0}if(this.activeBook){const r=this.state.activeChapterIndex-1;if(r>=0){if(t){const a=this.activeBook.chapters[r].paragraphs.join(`

`).split(/\s+/).filter(c=>c.length>0),o=Math.max(0,a.length-70);this.playChapterVoice(r,this.state.selectedSingleVoice,o)}else this.loadChapter(r,!0);return!0}}return!1}getState(){return{...this.state}}getActiveBook(){return this.activeBook}getActiveMap(){return this.activeMap}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ka="187",Ec=0,fo=1,bc=2,Qr=1,Tc=2,or=3,Ti=0,un=1,Qn=2,Vi=0,cr=1,ta=2,po=3,mo=4,Ac=5,Gi=100,wc=101,Rc=102,Cc=103,Lc=104,Pc=200,Ic=201,Dc=202,Nc=203,fl=204,pl=205,Uc=206,kc=207,Fc=208,Oc=209,Bc=210,zc=211,Hc=212,Gc=213,Vc=214,na=0,ia=1,ra=2,ur=3,sa=4,aa=5,oa=6,la=7,ml=0,Wc=1,Xc=2,ti=0,gl=1,_l=2,vl=3,xl=4,yl=5,Sl=6,Ml=7,El=300,$i=301,hr=302,bs=303,Ts=304,ca=1e3,ei=1001,da=1002,Jt=1003,$c=1004,wr=1005,dn=1006,As=1007,fi=1008,_n=1009,bl=1010,Tl=1011,fr=1012,qa=1013,zn=1014,Fn=1015,Hn=1016,Ya=1017,Za=1018,Ki=1020,Al=35902,wl=35899,Rl=1021,Cl=1022,On=1023,gi=1026,pi=1027,Ll=1028,Ja=1029,Ai=1030,ja=1031,Qa=1033,es=33776,ts=33777,ns=33778,is=33779,ua=35840,ha=35841,fa=35842,pa=35843,ma=36196,ga=37492,_a=37496,va=37488,xa=37489,ss=37490,ya=37491,Sa=37808,Ma=37809,Ea=37810,ba=37811,Ta=37812,Aa=37813,wa=37814,Ra=37815,Ca=37816,La=37817,Pa=37818,Ia=37819,Da=37820,Na=37821,Ua=36492,ka=36494,Fa=36495,Oa=36283,Ba=36284,as=36285,za=36286,Kc=3200,Ha=0,qc=1,hi="",Sn="srgb",os="srgb-linear",ls="linear",Et="srgb",ws=7680,Yc=519,Zc=512,Jc=513,jc=514,Pl=515,Qc=516,ed=517,Il=518,Dl=519,td=35044,go="300 es",In=2e3,pr=2001;function nd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function cs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function id(){const i=cs("canvas");return i.style.display="block",i}const _o={};function vo(...i){const e="THREE."+i.shift();console.log(e,...i)}function Nl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Qe(...i){i=Nl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function vt(...i){i=Nl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Wi(...i){const e=i.join(" ");e in _o||(_o[e]=!0,Qe(...i))}function rd(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const sd={[na]:na,[ra]:oa,[sa]:sa,[ur]:aa,[ia]:ia,[oa]:ra,[la]:la,[aa]:ur};class Ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rs=Math.PI/180,Ga=180/Math.PI;function gr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function dt(i,e,t){return Math.max(e,Math.min(t,i))}function ad(i,e){return(i%e+e)%e}function Cs(i,e,t){return(1-t)*i+t*e}function od(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function eo(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ld(i,e){if(e.constructor===Float32Array)return i;const t=eo(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function cd(i,e){if(e.constructor===Float32Array)return i;const t=eo(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const oo=class oo{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};oo.prototype.isVector2=!0;let ot=oo;class Zi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],f=n[r+2],u=n[r+3],d=s[a+0],m=s[a+1],_=s[a+2],M=s[a+3];if(u!==M||c!==d||l!==m||f!==_){let h=c*d+l*m+f*_+u*M;h<0&&(d=-d,m=-m,_=-_,M=-M,h=-h);let p=1-o;if(h<.9995){const S=Math.acos(h),w=Math.sin(S);p=Math.sin(p*S)/w,o=Math.sin(o*S)/w,c=c*p+d*o,l=l*p+m*o,f=f*p+_*o,u=u*p+M*o}else{c=c*p+d*o,l=l*p+m*o,f=f*p+_*o,u=u*p+M*o;const S=1/Math.sqrt(c*c+l*l+f*f+u*u);c*=S,l*=S,f*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=f,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],f=n[r+3],u=s[a],d=s[a+1],m=s[a+2],_=s[a+3];return e[t]=o*_+f*u+c*m-l*d,e[t+1]=c*_+f*d+l*u-o*m,e[t+2]=l*_+f*m+o*d-c*u,e[t+3]=f*_-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),f=o(r/2),u=o(s/2),d=c(n/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*f*u+l*m*_,this._y=l*m*u-d*f*_,this._z=l*f*_+d*m*u,this._w=l*f*u-d*m*_;break;case"YXZ":this._x=d*f*u+l*m*_,this._y=l*m*u-d*f*_,this._z=l*f*_-d*m*u,this._w=l*f*u+d*m*_;break;case"ZXY":this._x=d*f*u-l*m*_,this._y=l*m*u+d*f*_,this._z=l*f*_+d*m*u,this._w=l*f*u-d*m*_;break;case"ZYX":this._x=d*f*u-l*m*_,this._y=l*m*u+d*f*_,this._z=l*f*_-d*m*u,this._w=l*f*u+d*m*_;break;case"YZX":this._x=d*f*u+l*m*_,this._y=l*m*u+d*f*_,this._z=l*f*_-d*m*u,this._w=l*f*u-d*m*_;break;case"XZY":this._x=d*f*u-l*m*_,this._y=l*m*u-d*f*_,this._z=l*f*_+d*m*u,this._w=l*f*u+d*m*_;break;default:Qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],f=t[6],u=t[10],d=n+o+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(f-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(f-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,f=t._w;return this._x=n*f+a*o+r*l-s*c,this._y=r*f+a*c+s*o-n*l,this._z=s*f+a*l+n*c-r*o,this._w=a*f-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),f=Math.sin(l);c=Math.sin(c*l)/f,t=Math.sin(t*l)/f,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const lo=class lo{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),f=2*(o*t-s*r),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*f,this.y=n+c*f+o*l-s*u,this.z=r+c*u+s*f-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ls.copy(this).projectOnVector(e),this.sub(Ls)}reflect(e){return this.sub(Ls.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};lo.prototype.isVector3=!0;let q=lo;const Ls=new q,xo=new Zi,co=class co{constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=t,f[4]=s,f[5]=c,f[6]=n,f[7]=a,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],f=n[4],u=n[7],d=n[2],m=n[5],_=n[8],M=r[0],h=r[3],p=r[6],S=r[1],w=r[4],T=r[7],C=r[2],R=r[5],g=r[8];return s[0]=a*M+o*S+c*C,s[3]=a*h+o*w+c*R,s[6]=a*p+o*T+c*g,s[1]=l*M+f*S+u*C,s[4]=l*h+f*w+u*R,s[7]=l*p+f*T+u*g,s[2]=d*M+m*S+_*C,s[5]=d*h+m*w+_*R,s[8]=d*p+m*T+_*g,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8];return t*a*f-t*o*l-n*s*f+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],u=f*a-o*l,d=o*c-f*s,m=l*s-a*c,_=t*u+n*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return e[0]=u*M,e[1]=(r*l-f*n)*M,e[2]=(o*n-r*a)*M,e[3]=d*M,e[4]=(f*t-r*c)*M,e[5]=(r*s-o*t)*M,e[6]=m*M,e[7]=(n*c-l*t)*M,e[8]=(a*t-n*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Wi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ps.makeScale(e,t)),this}rotate(e){return Wi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ps.makeRotation(-e)),this}translate(e,t){return Wi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ps.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};co.prototype.isMatrix3=!0;let tt=co;const Ps=new tt,yo=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),So=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function dd(){const i={enabled:!0,workingColorSpace:os,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Et&&(r.r=ni(r.r),r.g=ni(r.g),r.b=ni(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Et&&(r.r=Xi(r.r),r.g=Xi(r.g),r.b=Xi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===hi?ls:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[os]:{primaries:e,whitePoint:n,transfer:ls,toXYZ:yo,fromXYZ:So,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:e,whitePoint:n,transfer:Et,toXYZ:yo,fromXYZ:So,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),i}const ht=dd();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Li;class ud{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Li===void 0&&(Li=cs("canvas")),Li.width=e.width,Li.height=e.height;const r=Li.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ni(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hd=0;class to{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=gr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Is(r[a].image)):s.push(Is(r[a]))}else s=Is(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Is(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ud.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Qe("Texture: Unable to serialize Texture."),{})}let fd=0;const Ds=new q;class sn extends Ri{constructor(e=sn.DEFAULT_IMAGE,t=sn.DEFAULT_MAPPING,n=ei,r=ei,s=dn,a=fi,o=On,c=_n,l=sn.DEFAULT_ANISOTROPY,f=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=gr(),this.name="",this.source=new to(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ds).x}get height(){return this.source.getSize(Ds).y}get depth(){return this.source.getSize(Ds).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Qe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==El)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ca:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ca:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=El;sn.DEFAULT_ANISOTROPY=1;const uo=class uo{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],f=c[4],u=c[8],d=c[1],m=c[5],_=c[9],M=c[2],h=c[6],p=c[10];if(Math.abs(f-d)<.01&&Math.abs(u-M)<.01&&Math.abs(_-h)<.01){if(Math.abs(f+d)<.1&&Math.abs(u+M)<.1&&Math.abs(_+h)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,T=(m+1)/2,C=(p+1)/2,R=(f+d)/4,g=(u+M)/4,E=(_+h)/4;return w>T&&w>C?w<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(w),r=R/n,s=g/n):T>C?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=R/r,s=E/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=g/s,r=E/s),this.set(n,r,s,t),this}let S=Math.sqrt((h-_)*(h-_)+(u-M)*(u-M)+(d-f)*(d-f));return Math.abs(S)<.001&&(S=1),this.x=(h-_)/S,this.y=(u-M)/S,this.z=(d-f)/S,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};uo.prototype.isVector4=!0;let It=uo;class pd extends Ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];const r=n.count;for(let s=0;s<r;s++)this.textures[s]=new sn({width:e,height:t,depth:n.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new to(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bn extends pd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ul extends sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class md extends sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const hs=class hs{constructor(e,t,n,r,s,a,o,c,l,f,u,d,m,_,M,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,f,u,d,m,_,M,h)}set(e,t,n,r,s,a,o,c,l,f,u,d,m,_,M,h){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=f,p[10]=u,p[14]=d,p[3]=m,p[7]=_,p[11]=M,p[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new hs().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Pi.setFromMatrixColumn(e,0).length(),s=1/Pi.setFromMatrixColumn(e,1).length(),a=1/Pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),f=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*f,m=a*u,_=o*f,M=o*u;t[0]=c*f,t[4]=-c*u,t[8]=l,t[1]=m+_*l,t[5]=d-M*l,t[9]=-o*c,t[2]=M-d*l,t[6]=_+m*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*f,m=c*u,_=l*f,M=l*u;t[0]=d+M*o,t[4]=_*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*f,t[9]=-o,t[2]=m*o-_,t[6]=M+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*f,m=c*u,_=l*f,M=l*u;t[0]=d-M*o,t[4]=-a*u,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*f,t[9]=M-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*f,m=a*u,_=o*f,M=o*u;t[0]=c*f,t[4]=_*l-m,t[8]=d*l+M,t[1]=c*u,t[5]=M*l+d,t[9]=m*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,m=a*l,_=o*c,M=o*l;t[0]=c*f,t[4]=M-d*u,t[8]=_*u+m,t[1]=u,t[5]=a*f,t[9]=-o*f,t[2]=-l*f,t[6]=m*u+_,t[10]=d-M*u}else if(e.order==="XZY"){const d=a*c,m=a*l,_=o*c,M=o*l;t[0]=c*f,t[4]=-u,t[8]=l*f,t[1]=d*u+M,t[5]=a*f,t[9]=m*u-_,t[2]=_*u-m,t[6]=o*f,t[10]=M*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gd,e,_d)}lookAt(e,t,n){const r=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),si.crossVectors(n,mn),si.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),si.crossVectors(n,mn)),si.normalize(),Rr.crossVectors(mn,si),r[0]=si.x,r[4]=Rr.x,r[8]=mn.x,r[1]=si.y,r[5]=Rr.y,r[9]=mn.y,r[2]=si.z,r[6]=Rr.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],f=n[1],u=n[5],d=n[9],m=n[13],_=n[2],M=n[6],h=n[10],p=n[14],S=n[3],w=n[7],T=n[11],C=n[15],R=r[0],g=r[4],E=r[8],F=r[12],I=r[1],k=r[5],G=r[9],j=r[13],D=r[2],K=r[6],ne=r[10],B=r[14],ue=r[3],Q=r[7],le=r[11],he=r[15];return s[0]=a*R+o*I+c*D+l*ue,s[4]=a*g+o*k+c*K+l*Q,s[8]=a*E+o*G+c*ne+l*le,s[12]=a*F+o*j+c*B+l*he,s[1]=f*R+u*I+d*D+m*ue,s[5]=f*g+u*k+d*K+m*Q,s[9]=f*E+u*G+d*ne+m*le,s[13]=f*F+u*j+d*B+m*he,s[2]=_*R+M*I+h*D+p*ue,s[6]=_*g+M*k+h*K+p*Q,s[10]=_*E+M*G+h*ne+p*le,s[14]=_*F+M*j+h*B+p*he,s[3]=S*R+w*I+T*D+C*ue,s[7]=S*g+w*k+T*K+C*Q,s[11]=S*E+w*G+T*ne+C*le,s[15]=S*F+w*j+T*B+C*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],f=e[2],u=e[6],d=e[10],m=e[14],_=e[3],M=e[7],h=e[11],p=e[15],S=c*m-l*d,w=o*m-l*u,T=o*d-c*u,C=a*m-l*f,R=a*d-c*f,g=a*u-o*f;return t*(M*S-h*w+p*T)-n*(_*S-h*C+p*R)+r*(_*w-M*C+p*g)-s*(_*T-M*R+h*g)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],f=e[10];return t*(a*f-o*l)-n*(s*f-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],u=e[9],d=e[10],m=e[11],_=e[12],M=e[13],h=e[14],p=e[15],S=t*o-n*a,w=t*c-r*a,T=t*l-s*a,C=n*c-r*o,R=n*l-s*o,g=r*l-s*c,E=f*M-u*_,F=f*h-d*_,I=f*p-m*_,k=u*h-d*M,G=u*p-m*M,j=d*p-m*h,D=S*j-w*G+T*k+C*I-R*F+g*E;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const K=1/D;return e[0]=(o*j-c*G+l*k)*K,e[1]=(r*G-n*j-s*k)*K,e[2]=(M*g-h*R+p*C)*K,e[3]=(d*R-u*g-m*C)*K,e[4]=(c*I-a*j-l*F)*K,e[5]=(t*j-r*I+s*F)*K,e[6]=(h*T-_*g-p*w)*K,e[7]=(f*g-d*T+m*w)*K,e[8]=(a*G-o*I+l*E)*K,e[9]=(n*I-t*G-s*E)*K,e[10]=(_*R-M*T+p*S)*K,e[11]=(u*T-f*R-m*S)*K,e[12]=(o*F-a*k-c*E)*K,e[13]=(t*k-n*F+r*E)*K,e[14]=(M*w-_*C-h*S)*K,e[15]=(f*C-u*w+d*S)*K,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,f=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,f*o+n,f*c-r*a,0,l*c-r*o,f*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,f=a+a,u=o+o,d=s*l,m=s*f,_=s*u,M=a*f,h=a*u,p=o*u,S=c*l,w=c*f,T=c*u,C=n.x,R=n.y,g=n.z;return r[0]=(1-(M+p))*C,r[1]=(m+T)*C,r[2]=(_-w)*C,r[3]=0,r[4]=(m-T)*R,r[5]=(1-(d+p))*R,r[6]=(h+S)*R,r[7]=0,r[8]=(_+w)*g,r[9]=(h-S)*g,r[10]=(1-(d+M))*g,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Pi.set(r[0],r[1],r[2]).length();const o=Pi.set(r[4],r[5],r[6]).length(),c=Pi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Rn.copy(this);const l=1/a,f=1/o,u=1/c;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=f,Rn.elements[5]*=f,Rn.elements[6]*=f,Rn.elements[8]*=u,Rn.elements[9]*=u,Rn.elements[10]*=u,t.setFromRotationMatrix(Rn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=In,c=!1){const l=this.elements,f=2*s/(t-e),u=2*s/(n-r),d=(t+e)/(t-e),m=(n+r)/(n-r);let _,M;if(c)_=s/(a-s),M=a*s/(a-s);else if(o===In)_=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===pr)_=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=In,c=!1){const l=this.elements,f=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),m=-(n+r)/(n-r);let _,M;if(c)_=1/(a-s),M=a/(a-s);else if(o===In)_=-2/(a-s),M=-(a+s)/(a-s);else if(o===pr)_=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=_,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};hs.prototype.isMatrix4=!0;let Lt=hs;const Pi=new q,Rn=new Lt,gd=new q(0,0,0),_d=new q(1,1,1),si=new q,Rr=new q,mn=new q,Mo=new Lt,Eo=new Zi;class _i{constructor(e=0,t=0,n=0,r=_i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],f=r[9],u=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(dt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:Qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Eo.setFromEuler(this),this.setFromQuaternion(Eo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_i.DEFAULT_ORDER="XYZ";class kl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vd=0;const bo=new q,Ii=new Zi,qn=new Lt,Cr=new q,nr=new q,xd=new q,yd=new Zi,To=new q(1,0,0),Ao=new q(0,1,0),wo=new q(0,0,1),Ro={type:"added"},Sd={type:"removed"},Di={type:"childadded",child:null},Ns={type:"childremoved",child:null};class an extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=an.DEFAULT_UP.clone();const e=new q,t=new _i,n=new Zi,r=new q(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Lt},normalMatrix:{value:new tt}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=an.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.premultiply(Ii),this}rotateX(e){return this.rotateOnAxis(To,e)}rotateY(e){return this.rotateOnAxis(Ao,e)}rotateZ(e){return this.rotateOnAxis(wo,e)}translateOnAxis(e,t){return bo.copy(e).applyQuaternion(this.quaternion),this.position.add(bo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(To,e)}translateY(e){return this.translateOnAxis(Ao,e)}translateZ(e){return this.translateOnAxis(wo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cr.copy(e):Cr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(nr,Cr,this.up):qn.lookAt(Cr,nr,this.up),this.quaternion.setFromRotationMatrix(qn),r&&(qn.extractRotation(r.matrixWorld),Ii.setFromRotationMatrix(qn),this.quaternion.premultiply(Ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ro),Di.child=e,this.dispatchEvent(Di),Di.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sd),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ro),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,e,xd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,yd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),f=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),f.length>0&&(n.images=f),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(o){const c=[];for(const l in o){const f=o[l];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}an.DEFAULT_UP=new q(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Lr extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Md={type:"move"};class Us{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const h=t.getJointPose(M,n),p=this._getHandJoint(l,M);h!==null&&(p.matrix.fromArray(h.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=h.radius),p.visible=h!==null}const f=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=f.position.distanceTo(u.position),m=.02,_=.005;l.inputState.pinching&&d>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Md)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Lr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Fl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function ks(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ct{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=ht.workingColorSpace){if(e=ad(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ks(a,s,e+1/3),this.g=ks(a,s,e),this.b=ks(a,s,e-1/3)}return ht.colorSpaceToWorking(this,r),this}setStyle(e,t=Sn){function n(s){s!==void 0&&parseFloat(s)<1&&Qe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Qe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Sn){const n=Fl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return ht.workingToColorSpace(Qt.copy(this),e),Math.round(dt(Qt.r*255,0,255))*65536+Math.round(dt(Qt.g*255,0,255))*256+Math.round(dt(Qt.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,r=Qt.g,s=Qt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const f=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=f<=.5?u/(a+o):u/(2-a-o),a){case n:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-n)/u+2;break;case s:c=(n-r)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=f,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Sn){ht.workingToColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,r=Qt.b;return e!==Sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ai),this.setHSL(ai.h+e,ai.s+t,ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ai),e.getHSL(Pr);const n=Cs(ai.h,Pr.h,t),r=Cs(ai.s,Pr.s,t),s=Cs(ai.l,Pr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new ct;ct.NAMES=Fl;class Ed extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Cn=new q,Yn=new q,Fs=new q,Zn=new q,Ni=new q,Ui=new q,Co=new q,Os=new q,Bs=new q,zs=new q,Hs=new It,Gs=new It,Vs=new It;class Pn{constructor(e=new q,t=new q,n=new q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Cn.subVectors(e,t),r.cross(Cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Cn.subVectors(r,t),Yn.subVectors(n,t),Fs.subVectors(e,t);const a=Cn.dot(Cn),o=Cn.dot(Yn),c=Cn.dot(Fs),l=Yn.dot(Yn),f=Yn.dot(Fs),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,m=(l*c-o*f)*d,_=(a*f-o*c)*d;return s.set(1-m-_,_,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Zn.x),c.addScaledVector(a,Zn.y),c.addScaledVector(o,Zn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Hs.setScalar(0),Gs.setScalar(0),Vs.setScalar(0),Hs.fromBufferAttribute(e,t),Gs.fromBufferAttribute(e,n),Vs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Hs,s.x),a.addScaledVector(Gs,s.y),a.addScaledVector(Vs,s.z),a}static isFrontFacing(e,t,n,r){return Cn.subVectors(n,t),Yn.subVectors(e,t),Cn.cross(Yn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),Cn.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Pn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Ni.subVectors(r,n),Ui.subVectors(s,n),Os.subVectors(e,n);const c=Ni.dot(Os),l=Ui.dot(Os);if(c<=0&&l<=0)return t.copy(n);Bs.subVectors(e,r);const f=Ni.dot(Bs),u=Ui.dot(Bs);if(f>=0&&u<=f)return t.copy(r);const d=c*u-f*l;if(d<=0&&c>=0&&f<=0&&c-f>0)return a=c/(c-f),t.copy(n).addScaledVector(Ni,a);zs.subVectors(e,s);const m=Ni.dot(zs),_=Ui.dot(zs);if(_>=0&&m<=_)return t.copy(s);const M=m*l-c*_;if(M<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(Ui,o);const h=f*_-m*u;if(h<=0&&u-f>=0&&m-_>=0)return Co.subVectors(s,r),o=(u-f)/(u-f+(m-_)),t.copy(r).addScaledVector(Co,o);const p=1/(h+M+d);return a=M*p,o=d*p,t.copy(n).addScaledVector(Ni,a).addScaledVector(Ui,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _r{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ln):Ln.fromBufferAttribute(s,a),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ir.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ir.copy(n.boundingBox)),Ir.applyMatrix4(e.matrixWorld),this.union(Ir)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),Dr.subVectors(this.max,ir),ki.subVectors(e.a,ir),Fi.subVectors(e.b,ir),Oi.subVectors(e.c,ir),oi.subVectors(Fi,ki),li.subVectors(Oi,Fi),Si.subVectors(ki,Oi);let t=[0,-oi.z,oi.y,0,-li.z,li.y,0,-Si.z,Si.y,oi.z,0,-oi.x,li.z,0,-li.x,Si.z,0,-Si.x,-oi.y,oi.x,0,-li.y,li.x,0,-Si.y,Si.x,0];return!Ws(t,ki,Fi,Oi,Dr)||(t=[1,0,0,0,1,0,0,0,1],!Ws(t,ki,Fi,Oi,Dr))?!1:(Nr.crossVectors(oi,li),t=[Nr.x,Nr.y,Nr.z],Ws(t,ki,Fi,Oi,Dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Jn=[new q,new q,new q,new q,new q,new q,new q,new q],Ln=new q,Ir=new _r,ki=new q,Fi=new q,Oi=new q,oi=new q,li=new q,Si=new q,ir=new q,Dr=new q,Nr=new q,Mi=new q;function Ws(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Mi.fromArray(i,s);const o=r.x*Math.abs(Mi.x)+r.y*Math.abs(Mi.y)+r.z*Math.abs(Mi.z),c=e.dot(Mi),l=t.dot(Mi),f=n.dot(Mi);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>o)return!1}return!0}const zt=new q,Ur=new ot;let bd=0;class mi extends Ri{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=td,this.updateRanges=[],this.gpuType=Fn,this.version=0,this._normalizationScale=e!==void 0?eo(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ur.fromBufferAttribute(this,t),Ur.applyMatrix3(e),this.setXY(t,Ur.x,Ur.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):ld(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):cd(e,this.array)}}class Ol extends mi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Bl extends mi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class En extends mi{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Td=new _r,rr=new q,Xs=new q;class fs{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Td.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);const t=rr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(rr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(Xs)),this.expandByPoint(rr.copy(e.center).sub(Xs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Ad=0;const yn=new Lt,$s=new an,Bi=new q,gn=new _r,sr=new _r,$t=new q;class Gn extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=gr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nd(e)?Bl:Ol)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new tt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return $s.lookAt(e),$s.updateMatrix(),this.applyMatrix4($s.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new En(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];gn.setFromBufferAttribute(s),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];sr.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(gn.min,sr.min),gn.expandByPoint($t),$t.addVectors(gn.max,sr.max),gn.expandByPoint($t)):(gn.expandByPoint(sr.min),gn.expandByPoint(sr.max))}gn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)$t.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared($t));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,f=o.count;l<f;l++)$t.fromBufferAttribute(o,l),c&&(Bi.fromBufferAttribute(e,l),$t.add(Bi)),r=Math.max(r,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new mi(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let F=0;F<n.count;F++)o[F]=new q,c[F]=new q;const f=new q,u=new q,d=new q,m=new ot,_=new ot,M=new ot,h=new q,p=new q;function S(F,I,k){l[F]=l[I]=l[k]=1,f.fromBufferAttribute(n,F),u.fromBufferAttribute(n,I),d.fromBufferAttribute(n,k),m.fromBufferAttribute(s,F),_.fromBufferAttribute(s,I),M.fromBufferAttribute(s,k),u.sub(f),d.sub(f),_.sub(m),M.sub(m);const G=1/(_.x*M.y-M.x*_.y);isFinite(G)&&(h.copy(u).multiplyScalar(M.y).addScaledVector(d,-_.y).multiplyScalar(G),p.copy(d).multiplyScalar(_.x).addScaledVector(u,-M.x).multiplyScalar(G),o[F].add(h),o[I].add(h),o[k].add(h),c[F].add(p),c[I].add(p),c[k].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let F=0,I=w.length;F<I;++F){const k=w[F],G=k.start,j=k.count;for(let D=G,K=G+j;D<K;D+=3)S(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const T=new q,C=new q,R=new q,g=new q;function E(F){R.fromBufferAttribute(r,F),g.copy(R);const I=o[F];T.copy(I),T.sub(R.multiplyScalar(R.dot(I))).normalize(),C.crossVectors(g,I);const G=C.dot(c[F])<0?-1:1;a.setXYZW(F,T.x,T.y,T.z,G)}for(let F=0,I=n.count;F<I;++F)l[F]&&E(F);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new mi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const r=new q,s=new q,a=new q,o=new q,c=new q,l=new q,f=new q,u=new q;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),M=e.getX(d+1),h=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,h),f.subVectors(a,s),u.subVectors(r,s),f.cross(u),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,h),o.add(f),c.add(f),l.add(f),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(h,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),f.subVectors(a,s),u.subVectors(r,s),f.cross(u),n.setXYZ(d+0,f.x,f.y,f.z),n.setXYZ(d+1,f.x,f.y,f.z),n.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,c){const l=o.array,f=o.itemSize,u=o.normalized,d=new l.constructor(c.length*f);let m=0,_=0;for(let M=0,h=c.length;M<h;M++){o.isInterleavedBufferAttribute?m=c[M]*o.data.stride+o.offset:m=c[M]*f;for(let p=0;p<f;p++)d[_++]=l[m++]}return new mi(d,f,u)}if(this.index===null)return Qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gn,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let f=0,u=l.length;f<u;f++){const d=l[f],m=e(d,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let u=0,d=l.length;u<d;u++){const m=l[u];f.push(m.toJSON(e.data))}f.length>0&&(r[c]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const f=r[l];this.setAttribute(l,f.clone(t))}const s=e.morphAttributes;for(const l in s){const f=[],u=s[l];for(let d=0,m=u.length;d<m;d++)f.push(u[d].clone(t));this.morphAttributes[l]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,f=a.length;l<f;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ks=new q,wd=new q,Rd=new tt;class di{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ks.subVectors(n,t).cross(wd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Ks),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Rd.getNormalMatrix(e),r=this.coplanarPoint(Ks).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Cd=0;class Ji extends Ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=gr(),this.name="",this.type="Material",this.blending=cr,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fl,this.blendDst=pl,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Qe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new di().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ot().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const jn=new q,qs=new q,kr=new q,Fr=new q;class zl{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){qs.copy(e).add(t).multiplyScalar(.5),kr.copy(t).sub(e).normalize(),Fr.copy(this.origin).sub(qs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(kr),o=Fr.dot(this.direction),c=-Fr.dot(kr),l=Fr.lengthSq(),f=Math.abs(1-a*a);let u,d,m,_;if(f>0)if(u=a*c-o,d=a*o-c,_=s*f,u>=0)if(d>=-_)if(d<=_){const M=1/f;u*=M,d*=M,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-_?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=_?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(qs).addScaledVector(kr,d),m}intersectSphere(e,t){if(e.radius<0)return null;jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),r=jn.dot(jn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,f=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),f>=0?(s=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,f=o.z,u=e.x-a.x,d=e.y-a.y,m=e.z-a.z,_=t.x-a.x,M=t.y-a.y,h=t.z-a.z,p=n.x-a.x,S=n.y-a.y,w=n.z-a.z,T=Math.abs(c),C=Math.abs(l),R=Math.abs(f);let g,E,F,I,k,G,j,D,K,ne,B,ue;if(T>=C&&T>=R?(F=c,G=u,K=_,ue=p,c>=0?(g=l,E=f,I=d,k=m,j=M,D=h,ne=S,B=w):(g=f,E=l,I=m,k=d,j=h,D=M,ne=w,B=S)):C>=R?(F=l,G=d,K=M,ue=S,l>=0?(g=f,E=c,I=m,k=u,j=h,D=_,ne=w,B=p):(g=c,E=f,I=u,k=m,j=_,D=h,ne=p,B=w)):(F=f,G=m,K=h,ue=w,f>=0?(g=c,E=l,I=u,k=d,j=_,D=M,ne=p,B=S):(g=l,E=c,I=d,k=u,j=M,D=_,ne=S,B=p)),F===0)return null;const Q=g/F,le=E/F,he=1/F,ke=I-Q*G,$e=k-le*G,te=j-Q*K,Ae=D-le*K,Pe=ne-Q*ue,Fe=B-le*ue,Re=Pe*Ae-Fe*te,Ze=ke*Fe-$e*Pe,Mt=te*$e-Ae*ke;if(r){if(Re<0||Ze<0||Mt<0)return null}else if((Re<0||Ze<0||Mt<0)&&(Re>0||Ze>0||Mt>0))return null;const qe=Re+Ze+Mt;if(qe===0)return null;const gt=he*(Re*G+Ze*K+Mt*ue);return(qe>0?gt<0:gt>0)?null:this.at(gt/qe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ld extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=ml,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Lo=new Lt,Ei=new zl,Or=new fs,Po=new q,Br=new q,zr=new q,Hr=new q,Ys=new q,Gr=new q,Io=new q,Vr=new q;class vi extends an{constructor(e=new Gn,t=new Ld){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Gr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const f=o[c],u=s[c];f!==0&&(Ys.fromBufferAttribute(u,e),a?Gr.addScaledVector(Ys,f):Gr.addScaledVector(Ys.sub(t),f))}t.add(Gr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(s),Ei.copy(e.ray).recast(e.near),!(Or.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Or,Po)===null||Ei.origin.distanceToSquared(Po)>(e.far-e.near)**2))&&(Lo.copy(s).invert(),Ei.copy(e.ray).applyMatrix4(Lo),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,f=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=d.length;_<M;_++){const h=d[_],p=a[h.materialIndex],S=Math.max(h.start,m.start),w=Math.min(o.count,Math.min(h.start+h.count,m.start+m.count));for(let T=S,C=w;T<C;T+=3){const R=o.getX(T),g=o.getX(T+1),E=o.getX(T+2);r=Wr(this,p,e,n,l,f,u,R,g,E),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let h=_,p=M;h<p;h+=3){const S=o.getX(h),w=o.getX(h+1),T=o.getX(h+2);r=Wr(this,a,e,n,l,f,u,S,w,T),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,M=d.length;_<M;_++){const h=d[_],p=a[h.materialIndex],S=Math.max(h.start,m.start),w=Math.min(c.count,Math.min(h.start+h.count,m.start+m.count));for(let T=S,C=w;T<C;T+=3){const R=T,g=T+1,E=T+2;r=Wr(this,p,e,n,l,f,u,R,g,E),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let h=_,p=M;h<p;h+=3){const S=h,w=h+1,T=h+2;r=Wr(this,a,e,n,l,f,u,S,w,T),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}}}function Pd(i,e,t,n,r,s,a,o){let c;if(e.side===un?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Ti,o),c===null)return null;Vr.copy(o),Vr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Vr);return l<t.near||l>t.far?null:{distance:l,point:Vr.clone(),object:i}}function Wr(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,Br),i.getVertexPosition(c,zr),i.getVertexPosition(l,Hr);const f=Pd(i,e,t,n,Br,zr,Hr,Io);if(f){const u=new q;Pn.getBarycoord(Io,Br,zr,Hr,u),r&&(f.uv=Pn.getInterpolatedAttribute(r,o,c,l,u,new ot)),s&&(f.uv1=Pn.getInterpolatedAttribute(s,o,c,l,u,new ot)),a&&(f.normal=Pn.getInterpolatedAttribute(a,o,c,l,u,new q),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new q,materialIndex:0};Pn.getNormal(Br,zr,Hr,d.normal),f.face=d,f.barycoord=u}return f}class Id extends sn{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Jt,f=Jt,u,d){super(null,a,o,c,l,f,r,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bi=new fs,Dd=new ot(.5,.5),Xr=new q;class mr{constructor(e=new di,t=new di,n=new di,r=new di,s=new di,a=new di){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],f=s[4],u=s[5],d=s[6],m=s[7],_=s[8],M=s[9],h=s[10],p=s[11],S=s[12],w=s[13],T=s[14],C=s[15];if(r[0].setComponents(l-a,m-f,p-_,C-S).normalize(),r[1].setComponents(l+a,m+f,p+_,C+S).normalize(),r[2].setComponents(l+o,m+u,p+M,C+w).normalize(),r[3].setComponents(l-o,m-u,p-M,C-w).normalize(),n)r[4].setComponents(c,d,h,T).normalize(),r[5].setComponents(l-c,m-d,p-h,C-T).normalize();else if(r[4].setComponents(l-c,m-d,p-h,C-T).normalize(),t===In)r[5].setComponents(l+c,m+d,p+h,C+T).normalize();else if(t===pr)r[5].setComponents(c,d,h,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(e){bi.center.set(0,0,0);const t=Dd.distanceTo(e.center);return bi.radius=.7071067811865476+t,bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Xr.x=r.normal.x>0?e.max.x:e.min.x,Xr.y=r.normal.y>0?e.max.y:e.min.y,Xr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Do=new Lt;class no{constructor(){this.coordinateSystem=In,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){const s=t[r];Do.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new mr),n[r].setFromProjectionMatrix(Do,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new mr),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new no().copy(this)}}class Hl extends Ji{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const No=new Lt,Va=new zl,$r=new fs,Kr=new q;class Nd extends an{constructor(e=new Gn,t=new Hl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),$r.radius+=s,e.ray.intersectsSphere($r)===!1)return;No.copy(r).invert(),Va.copy(e.ray).applyMatrix4(No);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=d,M=m;_<M;_++){const h=l.getX(_);Kr.fromBufferAttribute(u,h),Uo(Kr,h,c,r,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=d,M=m;_<M;_++)Kr.fromBufferAttribute(u,_),Uo(Kr,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Uo(i,e,t,n,r,s,a){const o=Va.distanceSqToPoint(i);if(o<t){const c=new q;Va.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Gl extends sn{constructor(e=[],t=$i,n,r,s,a,o,c,l,f){super(e,t,n,r,s,a,o,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qi extends sn{constructor(e,t,n=zn,r,s,a,o=Jt,c=Jt,l,f=gi,u=1){if(f!==gi&&f!==pi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,r,s,a,o,c,f,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new to(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Vl extends qi{constructor(e,t=zn,n=$i,r,s,a=Jt,o=Jt,c,l=gi){const f={width:e,height:e,depth:1},u=[f,f,f,f,f,f];super(e,e,t,n,r,s,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Wl extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vr extends Gn{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],f=[],u=[];let d=0,m=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,r,a,2),_("x","z","y",1,-1,e,n,-t,r,a,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new En(l,3)),this.setAttribute("normal",new En(f,3)),this.setAttribute("uv",new En(u,2));function _(M,h,p,S,w,T,C,R,g,E,F){const I=T/g,k=C/E,G=T/2,j=C/2,D=R/2,K=g+1,ne=E+1;let B=0,ue=0;const Q=new q;for(let le=0;le<ne;le++){const he=le*k-j;for(let ke=0;ke<K;ke++){const $e=ke*I-G;Q[M]=$e*S,Q[h]=he*w,Q[p]=D,l.push(Q.x,Q.y,Q.z),Q[M]=0,Q[h]=0,Q[p]=R>0?1:-1,f.push(Q.x,Q.y,Q.z),u.push(ke/g),u.push(1-le/E),B+=1}}for(let le=0;le<E;le++)for(let he=0;he<g;he++){const ke=d+he+K*le,$e=d+he+K*(le+1),te=d+(he+1)+K*(le+1),Ae=d+(he+1)+K*le;c.push(ke,$e,Ae),c.push($e,te,Ae),ue+=6}o.addGroup(m,ue,F),m+=ue,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class io extends Gn{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],a=[];o(r),l(n),f(),this.setAttribute("position",new En(s,3)),this.setAttribute("normal",new En(s.slice(),3)),this.setAttribute("uv",new En(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const w=new q,T=new q,C=new q;for(let R=0;R<t.length;R+=3)m(t[R+0],w),m(t[R+1],T),m(t[R+2],C),c(w,T,C,S)}function c(S,w,T,C){const R=C+1,g=[];for(let E=0;E<=R;E++){g[E]=[];const F=S.clone().lerp(T,E/R),I=w.clone().lerp(T,E/R),k=R-E;for(let G=0;G<=k;G++)G===0&&E===R?g[E][G]=F:g[E][G]=F.clone().lerp(I,G/k)}for(let E=0;E<R;E++)for(let F=0;F<2*(R-E)-1;F++){const I=Math.floor(F/2);F%2===0?(d(g[E][I+1]),d(g[E+1][I]),d(g[E][I])):(d(g[E][I+1]),d(g[E+1][I+1]),d(g[E+1][I]))}}function l(S){const w=new q;for(let T=0;T<s.length;T+=3)w.x=s[T+0],w.y=s[T+1],w.z=s[T+2],w.normalize().multiplyScalar(S),s[T+0]=w.x,s[T+1]=w.y,s[T+2]=w.z}function f(){const S=new q;for(let w=0;w<s.length;w+=3){S.x=s[w+0],S.y=s[w+1],S.z=s[w+2];const T=h(S)/2/Math.PI+.5,C=p(S)/Math.PI+.5;a.push(T,1-C)}_(),u()}function u(){for(let S=0;S<a.length;S+=6){const w=a[S+0],T=a[S+2],C=a[S+4],R=Math.max(w,T,C),g=Math.min(w,T,C);R>.9&&g<.1&&(w<.2&&(a[S+0]+=1),T<.2&&(a[S+2]+=1),C<.2&&(a[S+4]+=1))}}function d(S){s.push(S.x,S.y,S.z)}function m(S,w){const T=S*3;w.x=e[T+0],w.y=e[T+1],w.z=e[T+2]}function _(){const S=new q,w=new q,T=new q,C=new q,R=new ot,g=new ot,E=new ot;for(let F=0,I=0;F<s.length;F+=9,I+=6){S.set(s[F+0],s[F+1],s[F+2]),w.set(s[F+3],s[F+4],s[F+5]),T.set(s[F+6],s[F+7],s[F+8]),R.set(a[I+0],a[I+1]),g.set(a[I+2],a[I+3]),E.set(a[I+4],a[I+5]),C.copy(S).add(w).add(T).divideScalar(3);const k=h(C);M(R,I+0,S,k),M(g,I+2,w,k),M(E,I+4,T,k)}}function M(S,w,T,C){C<0&&S.x===1&&(a[w]=S.x-1),T.x===0&&T.z===0&&(a[w]=C/2/Math.PI+.5)}function h(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new io(e.vertices,e.indices,e.radius,e.detail)}}class ro extends io{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ro(e.radius,e.detail)}}class ps extends Gn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,f=c+1,u=e/o,d=t/c,m=[],_=[],M=[],h=[];for(let p=0;p<f;p++){const S=p*d-a;for(let w=0;w<l;w++){const T=w*u-s;_.push(T,-S,0),M.push(0,0,1),h.push(w/o),h.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){const w=S+l*p,T=S+l*(p+1),C=S+1+l*(p+1),R=S+1+l*p;m.push(w,T,R),m.push(T,C,R)}this.setIndex(m),this.setAttribute("position",new En(_,3)),this.setAttribute("normal",new En(M,3)),this.setAttribute("uv",new En(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.width,e.height,e.widthSegments,e.heightSegments)}}function Yi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(ko(r))r.isRenderTargetTexture?(Qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(ko(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function rn(i){const e={};for(let t=0;t<i.length;t++){const n=Yi(i[t]);for(const r in n)e[r]=n[r]}return e}function ko(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ud(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Xl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const kd={clone:Yi,merge:rn};var Fd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wi extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fd,this.fragmentShader=Od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=Ud(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new ct().setHex(r.value);break;case"v2":this.uniforms[n].value=new ot().fromArray(r.value);break;case"v3":this.uniforms[n].value=new q().fromArray(r.value);break;case"v4":this.uniforms[n].value=new It().fromArray(r.value);break;case"m3":this.uniforms[n].value=new tt().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Lt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Bd extends wi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class zd extends Ji{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ha,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hd extends zd{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new ct(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ct(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ct(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Wi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Wi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Gd extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Kc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Vd extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class $l extends an{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Zs=new Lt,Fo=new q,Oo=new q;class Wd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new Lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mr,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Fo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fo),Oo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Zs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Zs,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===pr||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Zs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const qr=new q,Yr=new Zi,Nn=new q;class Kl extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qr,Yr,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Yr,Nn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(qr,Yr,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Yr,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ci=new q,Bo=new ot,zo=new ot;class Mn extends Kl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ga*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ga*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ci.x,ci.y).multiplyScalar(-e/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-e/ci.z)}getViewSize(e,t){return this.getViewBounds(e,Bo,zo),t.subVectors(zo,Bo)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Rs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Xd extends Wd{constructor(){super(new Mn(90,1,.5,500)),this.isPointLightShadow=!0}}class $d extends $l{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Xd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Kd extends Kl{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class qd extends $l{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const zi=-90,Hi=1;class Wa extends an{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Mn(zi,Hi,e,t);r.layers=this.layers,this.add(r);const s=new Mn(zi,Hi,e,t);s.layers=this.layers,this.add(s);const a=new Mn(zi,Hi,e,t);a.layers=this.layers,this.add(a);const o=new Mn(zi,Hi,e,t);o.layers=this.layers,this.add(o);const c=new Mn(zi,Hi,e,t);c.layers=this.layers,this.add(c);const l=new Mn(zi,Hi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,f]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;e.isWebGLRenderer===!0?h=e.state.buffers.depth.getReversed():h=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=M,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(u,d,m),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Yd extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}function Ho(i,e,t,n){const r=Zd(n);switch(t){case Rl:return i*e;case Ll:return i*e/r.components*r.byteLength;case Ja:return i*e/r.components*r.byteLength;case Ai:return i*e*2/r.components*r.byteLength;case ja:return i*e*2/r.components*r.byteLength;case Cl:return i*e*3/r.components*r.byteLength;case On:return i*e*4/r.components*r.byteLength;case Qa:return i*e*4/r.components*r.byteLength;case es:case ts:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ns:case is:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ha:case pa:return Math.max(i,16)*Math.max(e,8)/4;case ua:case fa:return Math.max(i,8)*Math.max(e,8)/2;case ma:case ga:case va:case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _a:case ss:case ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ma:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case wa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case La:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Da:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ua:case ka:case Fa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Oa:case Ba:return Math.ceil(i/4)*Math.ceil(e/4)*8;case as:case za:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Zd(i){switch(i){case _n:case bl:return{byteLength:1,components:1};case fr:case Tl:case Hn:return{byteLength:2,components:1};case Ya:case Za:return{byteLength:2,components:4};case zn:case qa:case Fn:return{byteLength:4,components:1};case Al:case wl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ka}}));typeof window<"u"&&(window.__THREE__?Qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ka);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ql(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Jd(i){const e=new WeakMap;function t(o,c){const l=o.array,f=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,f),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const f=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,f);else{u.sort((m,_)=>m.start-_.start);let d=0;for(let m=1;m<u.length;m++){const _=u[d],M=u[m];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++d,u[d]=M)}u.length=d+1;for(let m=0,_=u.length;m<_;m++){const M=u[m];i.bufferSubData(l,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var jd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,eu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,iu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ru=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,su=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,au=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,ou=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,du=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,uu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_u=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,vu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Su=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Mu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Eu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Au=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ru=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Lu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Pu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Iu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Du=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Nu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ku=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ou=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Bu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Vu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Wu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$u=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ku=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yu=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Zu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ju=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ju=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qu=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,eh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,th=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ih=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ah=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,oh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ch=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,uh=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ph=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gh=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_h=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,yh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Eh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Th=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ah=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,wh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ch=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ph=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ih=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Nh=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Uh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kh=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Oh=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zh=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Hh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xh=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$h=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Kh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Zh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jh=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ef=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,sf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,af=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,of=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,df=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ff=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_f=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ef=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Af=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,at={alphahash_fragment:jd,alphahash_pars_fragment:Qd,alphamap_fragment:eu,alphamap_pars_fragment:tu,alphatest_fragment:nu,alphatest_pars_fragment:iu,aomap_fragment:ru,aomap_pars_fragment:su,batching_pars_vertex:au,batching_vertex:ou,begin_vertex:lu,beginnormal_vertex:cu,bsdfs:du,iridescence_fragment:uu,bumpmap_pars_fragment:hu,clipping_planes_fragment:fu,clipping_planes_pars_fragment:pu,clipping_planes_pars_vertex:mu,clipping_planes_vertex:gu,color_fragment:_u,color_pars_fragment:vu,color_pars_vertex:xu,color_vertex:yu,common:Su,defaultnormal_vertex:Mu,displacementmap_pars_vertex:Eu,displacementmap_vertex:bu,emissivemap_fragment:Tu,emissivemap_pars_fragment:Au,colorspace_fragment:wu,colorspace_pars_fragment:Ru,envmap_fragment:Cu,envmap_common_pars_fragment:Lu,envmap_pars_fragment:Pu,envmap_pars_vertex:Iu,envmap_physical_pars_fragment:Vu,envmap_vertex:Du,fog_vertex:Nu,fog_pars_vertex:Uu,fog_fragment:ku,fog_pars_fragment:Fu,gradientmap_pars_fragment:Ou,lightmap_pars_fragment:Bu,lights_lambert_fragment:zu,lights_lambert_pars_fragment:Hu,lights_pars_begin:Gu,lights_toon_fragment:Wu,lights_toon_pars_fragment:Xu,lights_phong_fragment:$u,lights_phong_pars_fragment:Ku,lights_physical_fragment:qu,lights_physical_pars_fragment:Yu,lights_fragment_begin:Zu,lights_fragment_maps:Ju,lights_fragment_end:ju,lightprobes_pars_fragment:Qu,logdepthbuf_fragment:eh,logdepthbuf_pars_fragment:th,logdepthbuf_pars_vertex:nh,logdepthbuf_vertex:ih,map_fragment:rh,map_pars_fragment:sh,map_particle_fragment:ah,map_particle_pars_fragment:oh,metalnessmap_fragment:lh,metalnessmap_pars_fragment:ch,morphinstance_vertex:dh,morphcolor_vertex:uh,morphnormal_vertex:hh,morphtarget_pars_vertex:fh,morphtarget_vertex:ph,normal_fragment_begin:mh,normal_fragment_maps:gh,normal_pars_fragment:_h,normal_pars_vertex:vh,normal_vertex:xh,normalmap_pars_fragment:yh,clearcoat_normal_fragment_begin:Sh,clearcoat_normal_fragment_maps:Mh,clearcoat_pars_fragment:Eh,iridescence_pars_fragment:bh,opaque_fragment:Th,packing:Ah,premultiplied_alpha_fragment:wh,project_vertex:Rh,dithering_fragment:Ch,dithering_pars_fragment:Lh,roughnessmap_fragment:Ph,roughnessmap_pars_fragment:Ih,shadowmap_pars_fragment:Dh,shadowmap_pars_vertex:Nh,shadowmap_vertex:Uh,shadowmask_pars_fragment:kh,skinbase_vertex:Fh,skinning_pars_vertex:Oh,skinning_vertex:Bh,skinnormal_vertex:zh,specularmap_fragment:Hh,specularmap_pars_fragment:Gh,tonemapping_fragment:Vh,tonemapping_pars_fragment:Wh,transmission_fragment:Xh,transmission_pars_fragment:$h,uv_pars_fragment:Kh,uv_pars_vertex:qh,uv_vertex:Yh,worldpos_vertex:Zh,background_vert:Jh,background_frag:jh,backgroundCube_vert:Qh,backgroundCube_frag:ef,cube_vert:tf,cube_frag:nf,depth_vert:rf,depth_frag:sf,distance_vert:af,distance_frag:of,equirect_vert:lf,equirect_frag:cf,linedashed_vert:df,linedashed_frag:uf,meshbasic_vert:hf,meshbasic_frag:ff,meshlambert_vert:pf,meshlambert_frag:mf,meshmatcap_vert:gf,meshmatcap_frag:_f,meshnormal_vert:vf,meshnormal_frag:xf,meshphong_vert:yf,meshphong_frag:Sf,meshphysical_vert:Mf,meshphysical_frag:Ef,meshtoon_vert:bf,meshtoon_frag:Tf,points_vert:Af,points_frag:wf,shadow_vert:Rf,shadow_frag:Cf,sprite_vert:Lf,sprite_frag:Pf},Ie={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},kn={basic:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:rn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:rn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new ct(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:rn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:rn([Ie.points,Ie.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:rn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:rn([Ie.common,Ie.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:rn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:rn([Ie.sprite,Ie.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:rn([Ie.common,Ie.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:rn([Ie.lights,Ie.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};kn.physical={uniforms:rn([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new tt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const Zr={r:0,b:0,g:0},If=new Lt,Yl=new tt;Yl.set(-1,0,0,0,1,0,0,0,1);function Df(i,e,t,n,r,s){const a=new ct(0);let o=r===!0?0:1,c,l,f=null,u=0,d=null;function m(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){const T=S.backgroundBlurriness>0;w=e.get(w,T)}return w}function _(S){let w=!1;const T=m(S);T===null?h(a,o):T&&T.isColor&&(h(T,1),w=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(S,w){const T=m(w);T&&T.isCubeTexture?(l===void 0&&(l=new vi(new vr(1,1,1),new wi({name:"BackgroundCubeMaterial",uniforms:Yi(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,R,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(If.makeRotationFromEuler(w.backgroundRotation)).transpose(),T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Yl),l.material.toneMapped=ht.getTransfer(T.colorSpace)!==Et,(f!==T||u!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=T,u=T.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new vi(new ps(2,2),new wi({name:"BackgroundMaterial",uniforms:Yi(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=ht.getTransfer(T.colorSpace)!==Et,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(f!==T||u!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=T,u=T.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function h(S,w){S.getRGB(Zr,Xl(i)),t.buffers.color.setClear(Zr.r,Zr.g,Zr.b,w,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),o=w,h(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,h(a,o)},render:_,addToRenderList:M,dispose:p}}function Nf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(k,G,j,D,K){let ne=!1;const B=u(k,D,j,G);s!==B&&(s=B,l(s.object)),ne=m(k,D,j,K),ne&&_(k,D,j,K),K!==null&&e.update(K,i.ELEMENT_ARRAY_BUFFER),(ne||a)&&(a=!1,T(k,G,j,D),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function c(){return i.createVertexArray()}function l(k){return i.bindVertexArray(k)}function f(k){return i.deleteVertexArray(k)}function u(k,G,j,D){const K=D.wireframe===!0;let ne=n[G.id];ne===void 0&&(ne={},n[G.id]=ne);const B=k.isInstancedMesh===!0?k.id:0;let ue=ne[B];ue===void 0&&(ue={},ne[B]=ue);let Q=ue[j.id];Q===void 0&&(Q={},ue[j.id]=Q);let le=Q[K];return le===void 0&&(le=d(c()),Q[K]=le),le}function d(k){const G=[],j=[],D=[];for(let K=0;K<t;K++)G[K]=0,j[K]=0,D[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:j,attributeDivisors:D,object:k,attributes:{},index:null}}function m(k,G,j,D){const K=s.attributes,ne=G.attributes;let B=0;const ue=j.getAttributes();for(const Q in ue)if(ue[Q].location>=0){const he=K[Q];let ke=ne[Q];if(ke===void 0&&(Q==="instanceMatrix"&&k.instanceMatrix&&(ke=k.instanceMatrix),Q==="instanceColor"&&k.instanceColor&&(ke=k.instanceColor)),he===void 0||he.attribute!==ke||ke&&he.data!==ke.data)return!0;B++}return s.attributesNum!==B||s.index!==D}function _(k,G,j,D){const K={},ne=G.attributes;let B=0;const ue=j.getAttributes();for(const Q in ue)if(ue[Q].location>=0){let he=ne[Q];he===void 0&&(Q==="instanceMatrix"&&k.instanceMatrix&&(he=k.instanceMatrix),Q==="instanceColor"&&k.instanceColor&&(he=k.instanceColor));const ke={};ke.attribute=he,he&&he.data&&(ke.data=he.data),K[Q]=ke,B++}s.attributes=K,s.attributesNum=B,s.index=D}function M(){const k=s.newAttributes;for(let G=0,j=k.length;G<j;G++)k[G]=0}function h(k){p(k,0)}function p(k,G){const j=s.newAttributes,D=s.enabledAttributes,K=s.attributeDivisors;j[k]=1,D[k]===0&&(i.enableVertexAttribArray(k),D[k]=1),K[k]!==G&&(i.vertexAttribDivisor(k,G),K[k]=G)}function S(){const k=s.newAttributes,G=s.enabledAttributes;for(let j=0,D=G.length;j<D;j++)G[j]!==k[j]&&(i.disableVertexAttribArray(j),G[j]=0)}function w(k,G,j,D,K,ne,B){B===!0?i.vertexAttribIPointer(k,G,j,K,ne):i.vertexAttribPointer(k,G,j,D,K,ne)}function T(k,G,j,D){M();const K=D.attributes,ne=j.getAttributes(),B=G.defaultAttributeValues;for(const ue in ne){const Q=ne[ue];if(Q.location>=0){let le=K[ue];if(le===void 0&&(ue==="instanceMatrix"&&k.instanceMatrix&&(le=k.instanceMatrix),ue==="instanceColor"&&k.instanceColor&&(le=k.instanceColor)),le!==void 0){const he=le.normalized,ke=le.itemSize,$e=e.get(le);if($e===void 0)continue;const te=$e.buffer,Ae=$e.type,Pe=$e.bytesPerElement,Fe=Ae===i.INT||Ae===i.UNSIGNED_INT||le.gpuType===qa;if(le.isInterleavedBufferAttribute){const Re=le.data,Ze=Re.isInterleavedBuffer===!0?Re.stride:Re.itemSize,Mt=le.offset;if(Re.isInstancedInterleavedBuffer||Re.isInstancedBufferAttribute){for(let qe=0;qe<Q.locationSize;qe++)p(Q.location+qe,Re.meshPerAttribute);k.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let qe=0;qe<Q.locationSize;qe++)h(Q.location+qe);i.bindBuffer(i.ARRAY_BUFFER,te);for(let qe=0;qe<Q.locationSize;qe++)w(Q.location+qe,ke/Q.locationSize,Ae,he,Ze*Pe,(Mt+ke/Q.locationSize*qe)*Pe,Fe)}else{if(le.isInstancedBufferAttribute){for(let Re=0;Re<Q.locationSize;Re++)p(Q.location+Re,le.meshPerAttribute);k.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Re=0;Re<Q.locationSize;Re++)h(Q.location+Re);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Re=0;Re<Q.locationSize;Re++)w(Q.location+Re,ke/Q.locationSize,Ae,he,ke*Pe,ke/Q.locationSize*Re*Pe,Fe)}}else if(B!==void 0){const he=B[ue];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(Q.location,he);break;case 3:i.vertexAttrib3fv(Q.location,he);break;case 4:i.vertexAttrib4fv(Q.location,he);break;default:i.vertexAttrib1fv(Q.location,he)}}}}S()}function C(){F();for(const k in n){const G=n[k];for(const j in G){const D=G[j];for(const K in D){const ne=D[K];for(const B in ne)f(ne[B].object),delete ne[B];delete D[K]}}delete n[k]}}function R(k){if(n[k.id]===void 0)return;const G=n[k.id];for(const j in G){const D=G[j];for(const K in D){const ne=D[K];for(const B in ne)f(ne[B].object),delete ne[B];delete D[K]}}delete n[k.id]}function g(k){for(const G in n){const j=n[G];for(const D in j){const K=j[D];if(K[k.id]===void 0)continue;const ne=K[k.id];for(const B in ne)f(ne[B].object),delete ne[B];delete K[k.id]}}}function E(k){for(const G in n){const j=n[G],D=k.isInstancedMesh===!0?k.id:0,K=j[D];if(K!==void 0){for(const ne in K){const B=K[ne];for(const ue in B)f(B[ue].object),delete B[ue];delete K[ne]}delete j[D],Object.keys(j).length===0&&delete n[G]}}}function F(){I(),a=!0,s!==r&&(s=r,l(s.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:F,resetDefaultState:I,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfObject:E,releaseStatesOfProgram:g,initAttributes:M,enableAttribute:h,disableUnusedAttributes:S}}function Uf(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,f){f!==0&&(i.drawArraysInstanced(n,c,l,f),t.update(l,n,f))}function o(c,l,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,f);let d=0;for(let m=0;m<f;m++)d+=l[m];t.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function kf(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const g=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(g){return!(g!==On&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){const E=g===Hn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(g!==_n&&g!==Fn&&!E&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const f=c(l);f!==l&&(Qe("WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Qe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:h,maxAttributes:p,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:T,maxSamples:C,samples:R}}function Ff(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new di,o=new tt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||r;return r=d,n=u.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=f(u,d,0)},this.setState=function(u,d,m){const _=u.clippingPlanes,M=u.clipIntersection,h=u.clipShadows,p=i.get(u);if(!r||_===null||_.length===0||s&&!h)s?f(null):l();else{const S=s?0:n,w=S*4;let T=p.clippingState||null;c.value=T,T=f(_,d,w,m);for(let C=0;C!==w;++C)T[C]=t[C];p.clippingState=T,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(u,d,m,_){const M=u!==null?u.length:0;let h=null;if(M!==0){if(h=c.value,_!==!0||h===null){const p=m+M*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(h===null||h.length<p)&&(h=new Float32Array(p));for(let w=0,T=m;w!==M;++w,T+=4)a.copy(u[w]).applyMatrix4(S,o),a.normal.toArray(h,T),h[T+3]=a.constant}c.value=h,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,h}}class so extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Gl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new vr(5,5,5),s=new wi({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:un,blending:Vi});s.uniforms.tEquirect.value=t;const a=new vi(r,s),o=t.minFilter;return t.minFilter===fi&&(t.minFilter=dn),new Wa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const Go=256,Of=3,Bf=20,Zl=256,Jl=16,zf=3,Hf=new q,Gf=new ct;class ds{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Wa(1,10,null),this._boxMesh=new vi(new vr(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=Hf}=s,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),f=this._getSourceTarget(!0);t>0&&(f.texture.mipmapsAutoUpdate=!1);const u=c.autoClear,d=c.autoClearColor,m=c.autoClearDepth,_=c.autoClearStencil,M=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,M===null&&(e.background=c.getClearColor(Gf));const h=new Wa(n,r,f);return h.position.copy(o),h.update(c,e),c.autoClear=u,c.autoClearColor=d,c.autoClearDepth=m,c.autoClearStencil=_,e.background=M,t>0&&(f.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Go,od(e))}_fromTexture(e,t){e.mapping===$i||e.mapping===hr?this._setSize(e.image.length===0?Go:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=Vo(e,!1,!1),n=Math.log2(e)-Of;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Vo(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const r=this._boxMesh,s=this._cubeCamera;r.material=n,s.renderTarget=e,s.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===$i||e.mapping===hr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xo()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Wo()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Vf(),this._integrationMaterial=Wf());const t=this._cubeSize,n=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/Jl);for(let a=0;a<=n;a++){const o=ds.lodToRoughness(a,n);if(a>n-zf)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(Zl*Math.pow(o,4)))+.5:0;r.roughness.value=o,r.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Xf());const n=this._blurMaterial,r=n.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(s,0,n)}}function Vo(i,e,t){return new so(i,{minFilter:fi,generateMipmaps:e,type:Hn,colorSpace:os,depthBuffer:t})}function xr(i,e,t){return new wi({name:i,uniforms:e,vertexShader:at.cube_vert,fragmentShader:t,side:un,blending:Vi,depthTest:!1,depthWrite:!1})}function Vf(){return xr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Zl}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Wf(){return xr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Jl}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Xf(){return xr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Bf}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Wo(){return xr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Xo(){return xr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function $f(i){let e=new WeakMap,t=new WeakMap,n=null;function r(d,m=!1){return d==null?null:m?a(d):s(d)}function s(d){if(d&&d.isTexture){const m=d.mapping;if(m===bs||m===Ts)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const M=new so(_.height);return M.fromEquirectangularTexture(i,d),e.set(d,M),d.addEventListener("dispose",l),o(M.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const m=d.mapping,_=m===bs||m===Ts,M=m===$i||m===hr;if(_||M){let h=t.get(d);const p=h!==void 0?h.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new ds(i)),h=_?n.fromEquirectangular(d,h):n.fromCubemap(d,h),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),h.texture;if(h!==void 0)return h.texture;{const S=d.image;return _&&S&&S.height>0||M&&S&&c(S)?(n===null&&(n=new ds(i)),h=_?n.fromEquirectangular(d):n.fromCubemap(d),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),d.addEventListener("dispose",f),h.texture):null}}}return d}function o(d,m){return m===bs?d.mapping=$i:m===Ts&&(d.mapping=hr),d}function c(d){let m=0;const _=6;for(let M=0;M<_;M++)d[M]!==void 0&&m++;return m===_}function l(d){const m=d.target;m.removeEventListener("dispose",l);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function f(d){const m=d.target;m.removeEventListener("dispose",f);const _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function Kf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Wi("WebGLRenderer: "+n+" extension not supported."),r}}}function qf(i,e,t,n){const r={},s=new WeakMap,a=new FinalizationRegistry(_=>delete r[_]);function o(_){c(_.target)}function c(_){_.index!==null&&e.remove(_.index);for(const h in _.attributes)e.remove(_.attributes[h]);_.removeEventListener("dispose",o),delete r[_.id],a.unregister(_);const M=s.get(_);M&&(e.remove(M),s.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function l(_,M){return r[M.id]!==void 0||(M.addEventListener("dispose",o),r[M.id]=new WeakRef(M),a.register(M,M.id,M),t.memory.geometries++),M}function f(_){const M=_.attributes;for(const h in M)e.update(M[h],i.ARRAY_BUFFER)}function u(_){const M=_.index,h=_.attributes.position;let p=0;if(h===void 0)return;const S=M!==null?M.array.length:h.array.length/3-1,w=h.count>=65535?Bl:Ol,T=new w(Math.ceil(S/3)*6,1),C=T.array;if(M!==null){const g=M.array;p=M.version;for(let E=0,F=0;E<S;E+=3){const I=g[E+0],k=g[E+1],G=g[E+2];C[F++]=I,C[F++]=k,C[F++]=k,C[F++]=G,C[F++]=G,C[F++]=I}}else{p=h.version;for(let g=0,E=0;g<S;g+=3){const F=g+0,I=g+1,k=g+2;C[E++]=F,C[E++]=I,C[E++]=I,C[E++]=k,C[E++]=k,C[E++]=F}}T.version=p;const R=s.get(_);R&&e.remove(R),s.set(_,T)}function d(_){const M=s.get(_);if(M){const h=_.index;h!==null&&M.version<h.version&&u(_)}else u(_);return s.get(_)}function m(){for(const _ in r){const M=r[_].deref();M!==void 0&&c(M)}}return{get:l,update:f,getWireframeAttribute:d,dispose:m}}function Yf(i,e,t){let n;function r(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function c(u,d){i.drawElements(n,d,s,u*a),t.update(d,n,1)}function l(u,d,m){m!==0&&(i.drawElementsInstanced(n,d,s,u*a,m),t.update(d,n,m))}function f(u,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,m);let M=0;for(let h=0;h<m;h++)M+=d[h];t.update(M,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=f}function Zf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:vt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Jf(i,e,t){const n=new WeakMap,r=new It;function s(a,o,c){const l=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=f!==void 0?f.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let I=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",I)};var m=I;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,h=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let T=0;_===!0&&(T=1),M===!0&&(T=2),h===!0&&(T=3);let C=o.attributes.position.count*T,R=1;C>e.maxTextureSize&&(R=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const g=new Float32Array(C*R*4*u),E=new Ul(g,C,R,u);E.type=Fn,E.needsUpdate=!0;const F=T*4;for(let k=0;k<u;k++){const G=p[k],j=S[k],D=w[k],K=C*R*4*k;for(let ne=0;ne<G.count;ne++){const B=ne*F;_===!0&&(r.fromBufferAttribute(G,ne),g[K+B+0]=r.x,g[K+B+1]=r.y,g[K+B+2]=r.z,g[K+B+3]=0),M===!0&&(r.fromBufferAttribute(j,ne),g[K+B+4]=r.x,g[K+B+5]=r.y,g[K+B+6]=r.z,g[K+B+7]=0),h===!0&&(r.fromBufferAttribute(D,ne),g[K+B+8]=r.x,g[K+B+9]=r.y,g[K+B+10]=r.z,g[K+B+11]=D.itemSize===4?r.w:1)}}d={count:u,texture:E,size:new ot(C,R)},n.set(o,d),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let _=0;for(let h=0;h<l.length;h++)_+=l[h];const M=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(i,"morphTargetBaseInfluence",M),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function jf(i,e,t,n,r){let s=new WeakMap;function a(l){const f=r.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==f&&(e.update(d),s.set(d,f)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==f&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,f))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==f&&(m.update(),s.set(m,f))}return d}function o(){s=new WeakMap}function c(l){const f=l.target;f.removeEventListener("dispose",c),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const Qf={[gl]:"LINEAR_TONE_MAPPING",[_l]:"REINHARD_TONE_MAPPING",[vl]:"CINEON_TONE_MAPPING",[xl]:"ACES_FILMIC_TONE_MAPPING",[Sl]:"AGX_TONE_MAPPING",[Ml]:"NEUTRAL_TONE_MAPPING",[yl]:"CUSTOM_TONE_MAPPING"};function ep(i,e,t,n,r,s){const a=new Bn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const f=new Gn;f.setAttribute("position",new En([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new En([0,2,0,0,2,0],2));const u=new Bd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new vi(f,u),m=new Kd(-1,1,1,-1,0,1);let _=null,M=null,h=!1,p,S=null,w=[],T=!1;this.setSize=function(C,R){a.setSize(C,R),o!==null&&o.setSize(C,R),c!==null&&c.setSize(C,R);for(let g=0;g<w.length;g++){const E=w[g];E.setSize&&E.setSize(C,R)}},this.setEffects=function(C){w=C,T=w.length>0&&w[0].isRenderPass===!0;const R=a.width,g=a.height;w.length>0&&o===null&&(o=new Bn(R,g,{type:Hn,depthBuffer:!1,stencilBuffer:!1}),c=new Bn(R,g,{type:Hn,depthBuffer:!1,stencilBuffer:!1}));const E=r===!0&&w.some(F=>F.needsDepthTexture===!0);E!==(a.depthTexture!==null)&&(E===!0&&l===null&&(l=new qi(R,g),s===!0&&(l.format=pi,l.type=Ki)),a.dispose(),a.depthTexture=E?l:null,a.resolveDepthBuffer=E,a.storeMultisampledDepthBuffer=E);for(let F=0;F<w.length;F++){const I=w[F];I.setSize&&I.setSize(R,g),E&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(l)}},this.begin=function(C,R){if(h||C.toneMapping===ti&&w.length===0)return!1;if(S=R,R!==null){const g=R.width,E=R.height;(a.width!==g||a.height!==E)&&this.setSize(g,E)}return T===!1&&C.setRenderTarget(a),p=C.toneMapping,C.toneMapping=ti,!0},this.hasRenderPass=function(){return T},this.end=function(C,R){C.toneMapping=p,h=!0;let g=a,E=o;for(let F=0;F<w.length;F++){const I=w[F];I.enabled!==!1&&(I.render(C,E,g,R),I.needsSwap!==!1&&(g=E,E=E===o?c:o))}if(_!==C.outputColorSpace||M!==C.toneMapping){_=C.outputColorSpace,M=C.toneMapping,u.defines={},ht.getTransfer(_)===Et&&(u.defines.SRGB_TRANSFER="");const F=Qf[M];F&&(u.defines[F]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=g.texture,C.setRenderTarget(S),C.render(d,m),S=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),f.dispose(),u.dispose()}}const jl=new sn,Ql=new qi(1,1),ec=new Vl(1),tc=new Ul,nc=new md,ic=new Gl,$o=[],Ko=[],qo=new Float32Array(16),Yo=new Float32Array(9),Zo=new Float32Array(4);function ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=$o[r];if(s===void 0&&(s=new Float32Array(r),$o[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Wt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ms(i,e){let t=Ko[e];t===void 0&&(t=new Int32Array(e),Ko[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function tp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function np(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Wt(t,e)}}function ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Wt(t,e)}}function rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Wt(t,e)}}function sp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;Zo.set(n),i.uniformMatrix2fv(this.addr,!1,Zo),Wt(t,n)}}function ap(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;Yo.set(n),i.uniformMatrix3fv(this.addr,!1,Yo),Wt(t,n)}}function op(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;qo.set(n),i.uniformMatrix4fv(this.addr,!1,qo),Wt(t,n)}}function lp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Wt(t,e)}}function dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Wt(t,e)}}function up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Wt(t,e)}}function hp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Wt(t,e)}}function pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Wt(t,e)}}function mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Wt(t,e)}}function gs(i){return i.version===0&&(i.compareFunction=Dl,i.needsUpdate=!0),i}function gp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?s=gs(Ql):s=jl,t.setTexture2D(e||s,r)}function _p(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||nc,r)}function vp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_CUBE_SHADOW?s=gs(ec):s=ic,t.setTextureCube(e||s,r)}function xp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||tc,r)}function yp(i){switch(i){case 5126:return tp;case 35664:return np;case 35665:return ip;case 35666:return rp;case 35674:return sp;case 35675:return ap;case 35676:return op;case 5124:case 35670:return lp;case 35667:case 35671:return cp;case 35668:case 35672:return dp;case 35669:case 35673:return up;case 5125:return hp;case 36294:return fp;case 36295:return pp;case 36296:return mp;case 35678:case 36198:case 36298:case 36306:case 35682:return gp;case 35679:case 36299:case 36307:return _p;case 35680:case 36300:case 36308:case 36293:return vp;case 36289:case 36303:case 36311:case 36292:return xp}}function Sp(i,e){i.uniform1fv(this.addr,e)}function Mp(i,e){const t=ji(e,this.size,2);i.uniform2fv(this.addr,t)}function Ep(i,e){const t=ji(e,this.size,3);i.uniform3fv(this.addr,t)}function bp(i,e){const t=ji(e,this.size,4);i.uniform4fv(this.addr,t)}function Tp(i,e){const t=ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ap(i,e){const t=ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function wp(i,e){const t=ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Rp(i,e){i.uniform1iv(this.addr,e)}function Cp(i,e){i.uniform2iv(this.addr,e)}function Lp(i,e){i.uniform3iv(this.addr,e)}function Pp(i,e){i.uniform4iv(this.addr,e)}function Ip(i,e){i.uniform1uiv(this.addr,e)}function Dp(i,e){i.uniform2uiv(this.addr,e)}function Np(i,e){i.uniform3uiv(this.addr,e)}function Up(i,e){i.uniform4uiv(this.addr,e)}function kp(i,e,t){const n=this.cache,r=e.length,s=ms(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Wt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=gs(Ql):a=jl;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Fp(i,e,t){const n=this.cache,r=e.length,s=ms(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Wt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||nc,s[a])}function Op(i,e,t){const n=this.cache,r=e.length,s=ms(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Wt(n,s));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=gs(ec):a=ic;for(let o=0;o!==r;++o)t.setTextureCube(e[o]||a,s[o])}function Bp(i,e,t){const n=this.cache,r=e.length,s=ms(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Wt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||tc,s[a])}function zp(i){switch(i){case 5126:return Sp;case 35664:return Mp;case 35665:return Ep;case 35666:return bp;case 35674:return Tp;case 35675:return Ap;case 35676:return wp;case 5124:case 35670:return Rp;case 35667:case 35671:return Cp;case 35668:case 35672:return Lp;case 35669:case 35673:return Pp;case 5125:return Ip;case 36294:return Dp;case 36295:return Np;case 36296:return Up;case 35678:case 36198:case 36298:case 36306:case 35682:return kp;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return Bp}}class Hp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=yp(t.type)}}class Gp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zp(t.type)}}class Vp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Js=/(\w+)(\])?(\[|\.)?/g;function Jo(i,e){i.seq.push(e),i.map[e.id]=e}function Wp(i,e,t){const n=i.name,r=n.length;for(Js.lastIndex=0;;){const s=Js.exec(n),a=Js.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Jo(t,l===void 0?new Hp(o,i,e):new Gp(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Vp(o),Jo(t,u)),t=u}}}class rs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Wp(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function jo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Xp=37297;let $p=0;function Kp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Qo=new tt;function qp(i){ht._getMatrix(Qo,ht.workingColorSpace,i);const e=`mat3( ${Qo.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(i)){case ls:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return Qe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function el(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Kp(i.getShaderSource(e),o)}else return s}function Yp(i,e){const t=qp(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Zp={[gl]:"Linear",[_l]:"Reinhard",[vl]:"Cineon",[xl]:"ACESFilmic",[Sl]:"AgX",[Ml]:"Neutral",[yl]:"Custom"};function Jp(i,e){const t=Zp[e];return t===void 0?(Qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Jr=new q;function jp(){ht.getLuminanceCoefficients(Jr);const i=Jr.x.toFixed(4),e=Jr.y.toFixed(4),t=Jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function em(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function tm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function lr(i){return i!==""}function tl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function nl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const nm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xa(i){return i.replace(nm,im)}function im(i,e){const t=at[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Xa(t)}const rm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function il(i){return i.replace(rm,sm)}function sm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function rl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const am={[Qr]:"SHADOWMAP_TYPE_PCF",[or]:"SHADOWMAP_TYPE_VSM"};function om(i){return am[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const lm={[hr]:"ENVMAP_MODE_REFRACTION"};function cm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":lm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const dm={[ml]:"ENVMAP_BLENDING_MULTIPLY",[Wc]:"ENVMAP_BLENDING_MIX",[Xc]:"ENVMAP_BLENDING_ADD"};function um(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":dm[i.combine]||"ENVMAP_BLENDING_NONE"}function hm(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=om(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",f=cm(t),u=um(t),d=Qp(t),m=em(s),_=r.createProgram();let M,h,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(M=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(lr).join(`
`),M.length>0&&(M+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(lr).join(`
`),h.length>0&&(h+=`
`)):(M=[rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),h=[rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+f:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?at.tonemapping_pars_fragment:"",t.toneMapping!==ti?Jp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,Yp("linearToOutputTexel",t.outputColorSpace),jp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lr).join(`
`)),a=Xa(a),a=tl(a,t),a=nl(a,t),o=Xa(o),o=tl(o,t),o=nl(o,t),a=il(a),o=il(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,M=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,h=["#define varying in",t.glslVersion===go?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=p+M+a,w=p+h+o,T=jo(r,r.VERTEX_SHADER,S),C=jo(r,r.FRAGMENT_SHADER,w);r.attachShader(_,T),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(I){if(i.debug.checkShaderErrors){const k=r.getProgramInfoLog(_)||"",G=r.getShaderInfoLog(T)||"",j=r.getShaderInfoLog(C)||"",D=k.trim(),K=G.trim(),ne=j.trim();let B=!0,ue=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,T,C);else{const Q=el(r,T,"vertex"),le=el(r,C,"fragment");vt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+D+`
`+Q+`
`+le)}else D!==""?Qe("WebGLProgram: Program Info Log:",D):(K===""||ne==="")&&(ue=!1);ue&&(I.diagnostics={runnable:B,programLog:D,vertexShader:{log:K,prefix:M},fragmentShader:{log:ne,prefix:h}})}r.deleteShader(T),r.deleteShader(C),g=new rs(r,_),E=tm(r,_)}let g;this.getUniforms=function(){return g===void 0&&R(this),g};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(_,Xp)),F},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$p++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=C,this}let fm=0;class pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new mm(e),t.set(e,n)),n}}class mm{constructor(e){this.id=fm++,this.code=e,this.usedTimes=0}}function gm(i){return i===Ai||i===ss||i===as}function _m(i,e,t,n,r,s){const a=new kl,o=new pm,c=new Set,l=[],f=new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(g){return c.add(g),g===0?"uv":`uv${g}`}function _(g,E,F,I,k,G){const j=I.fog,D=k.geometry,K=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?I.environment:null,ne=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,B=e.get(g.envMap||K,ne),ue=d[g.type];let Q=n.precision;g.precision!==null&&(Q=n.getMaxPrecision(g.precision),Q!==g.precision&&Qe("WebGLProgram.getParameters:",g.precision,"not supported, using",Q,"instead."));const le=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,he=le!==void 0?le.length:0;let ke=0;D.morphAttributes.position!==void 0&&(ke=1),D.morphAttributes.normal!==void 0&&(ke=2),D.morphAttributes.color!==void 0&&(ke=3);let $e,te,Ae,Pe;if(ue){const we=kn[ue];$e=we.vertexShader,te=we.fragmentShader}else{$e=g.vertexShader,te=g.fragmentShader;const we=o.getVertexShaderStage(g),pt=o.getFragmentShaderStage(g);o.update(g,we,pt),Ae=we.id,Pe=pt.id}const Fe=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),Ze=k.isInstancedMesh===!0,Mt=k.isBatchedMesh===!0,qe=!!g.map,gt=!!g.matcap,mt=!!B,rt=mt&&B.isPMREMTexture===!0,Ht=!!g.aoMap,At=!!g.lightMap,Gt=!!g.bumpMap&&g.wireframe===!1,bt=!!g.normalMap,en=!!g.displacementMap,wt=!!g.emissiveMap,on=!!g.metalnessMap,Ft=!!g.roughnessMap,Kt=g.anisotropy>0,O=g.clearcoat>0,tn=g.diffuseRoughness>0,Tt=g.dispersion>0,lt=g.retroreflectivity>0,xe=g.iridescence>0,nt=g.sheen>0,We=g.transmission>0,Ye=Kt&&!!g.anisotropyMap,A=O&&!!g.clearcoatMap,x=O&&!!g.clearcoatNormalMap,X=O&&!!g.clearcoatRoughnessMap,pe=tn&&!!g.diffuseRoughnessMap,ae=xe&&!!g.iridescenceMap,de=xe&&!!g.iridescenceThicknessMap,Te=nt&&!!g.sheenColorMap,ie=nt&&!!g.sheenRoughnessMap,se=!!g.specularMap,Ee=!!g.specularColorMap,P=!!g.specularIntensityMap,re=We&&!!g.transmissionMap,ee=We&&!!g.thicknessMap,be=!!g.gradientMap,ye=!!g.alphaMap,Me=g.alphaTest>0,Be=!!g.alphaHash,Je=!!g.extensions;let ge=ti;g.toneMapped&&(Fe===null||Fe.isXRRenderTarget===!0)&&(ge=i.toneMapping);const ze=rt?B.isCompressedCubeTexture?B.image[0].mipmaps:B.mipmaps:null,Ve={shaderID:ue,shaderType:g.type,shaderName:g.name,vertexShader:$e,fragmentShader:te,defines:g.defines,customVertexShaderID:Ae,customFragmentShaderID:Pe,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:Q,batching:Mt,batchingColor:Mt&&k._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&k.instanceColor!==null,instancingMorph:Ze&&k.morphTexture!==null,outputColorSpace:Fe===null?i.outputColorSpace:Fe.isXRRenderTarget===!0?Fe.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:qe,matcap:gt,envMap:mt,envMapMode:mt&&B.mapping,envMapPMREM:rt,envMapMaxLod:rt?ze.length-1:null,envMapSize:rt?ze[0].width:null,aoMap:Ht,lightMap:At,bumpMap:Gt,normalMap:bt,displacementMap:en,emissiveMap:wt,normalMapObjectSpace:bt&&g.normalMapType===qc,normalMapTangentSpace:bt&&g.normalMapType===Ha,packedNormalMap:bt&&g.normalMapType===Ha&&gm(g.normalMap.format),metalnessMap:on,roughnessMap:Ft,anisotropy:Kt,anisotropyMap:Ye,clearcoat:O,clearcoatMap:A,clearcoatNormalMap:x,clearcoatRoughnessMap:X,diffuseRoughness:tn,diffuseRoughnessMap:pe,dispersion:Tt,retroreflection:lt,iridescence:xe,iridescenceMap:ae,iridescenceThicknessMap:de,sheen:nt,sheenColorMap:Te,sheenRoughnessMap:ie,specularMap:se,specularColorMap:Ee,specularIntensityMap:P,transmission:We,transmissionMap:re,thicknessMap:ee,gradientMap:be,opaque:g.transparent===!1&&g.blending===cr&&g.alphaToCoverage===!1,alphaMap:ye,alphaTest:Me,alphaHash:Be,combine:g.combine,mapUv:qe&&m(g.map.channel),aoMapUv:Ht&&m(g.aoMap.channel),lightMapUv:At&&m(g.lightMap.channel),bumpMapUv:Gt&&m(g.bumpMap.channel),normalMapUv:bt&&m(g.normalMap.channel),displacementMapUv:en&&m(g.displacementMap.channel),emissiveMapUv:wt&&m(g.emissiveMap.channel),metalnessMapUv:on&&m(g.metalnessMap.channel),roughnessMapUv:Ft&&m(g.roughnessMap.channel),anisotropyMapUv:Ye&&m(g.anisotropyMap.channel),clearcoatMapUv:A&&m(g.clearcoatMap.channel),clearcoatNormalMapUv:x&&m(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&m(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:pe&&m(g.diffuseRoughnessMap.channel),iridescenceMapUv:ae&&m(g.iridescenceMap.channel),iridescenceThicknessMapUv:de&&m(g.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(g.sheenColorMap.channel),sheenRoughnessMapUv:ie&&m(g.sheenRoughnessMap.channel),specularMapUv:se&&m(g.specularMap.channel),specularColorMapUv:Ee&&m(g.specularColorMap.channel),specularIntensityMapUv:P&&m(g.specularIntensityMap.channel),transmissionMapUv:re&&m(g.transmissionMap.channel),thicknessMapUv:ee&&m(g.thicknessMap.channel),alphaMapUv:ye&&m(g.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(bt||Kt),vertexNormals:!!D.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!D.attributes.uv&&(qe||ye),fog:!!j,useFog:g.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||D.attributes.normal===void 0&&bt===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Re,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:ke,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:G.filter(we=>we.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:ge,decodeVideoTexture:qe&&g.map.isVideoTexture===!0&&ht.getTransfer(g.map.colorSpace)===Et,decodeVideoTextureEmissive:wt&&g.emissiveMap.isVideoTexture===!0&&ht.getTransfer(g.emissiveMap.colorSpace)===Et,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Qn,flipSided:g.side===un,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Je&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&g.extensions.multiDraw===!0||Mt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Ve.vertexUv1s=c.has(1),Ve.vertexUv2s=c.has(2),Ve.vertexUv3s=c.has(3),c.clear(),Ve}function M(g){const E=[];if(g.shaderID?E.push(g.shaderID):(E.push(g.customVertexShaderID),E.push(g.customFragmentShaderID)),g.defines!==void 0)for(const F in g.defines)E.push(F),E.push(g.defines[F]);return g.isRawShaderMaterial===!1&&(h(E,g),p(E,g),E.push(i.outputColorSpace)),E.push(g.customProgramCacheKey),E.join()}function h(g,E){g.push(E.precision),g.push(E.outputColorSpace),g.push(E.envMapMode),g.push(E.envMapPMREM),g.push(E.envMapMaxLod),g.push(E.envMapSize),g.push(E.mapUv),g.push(E.alphaMapUv),g.push(E.lightMapUv),g.push(E.aoMapUv),g.push(E.bumpMapUv),g.push(E.normalMapUv),g.push(E.displacementMapUv),g.push(E.emissiveMapUv),g.push(E.metalnessMapUv),g.push(E.roughnessMapUv),g.push(E.anisotropyMapUv),g.push(E.clearcoatMapUv),g.push(E.clearcoatNormalMapUv),g.push(E.clearcoatRoughnessMapUv),g.push(E.diffuseRoughnessMapUv),g.push(E.iridescenceMapUv),g.push(E.iridescenceThicknessMapUv),g.push(E.sheenColorMapUv),g.push(E.sheenRoughnessMapUv),g.push(E.specularMapUv),g.push(E.specularColorMapUv),g.push(E.specularIntensityMapUv),g.push(E.transmissionMapUv),g.push(E.thicknessMapUv),g.push(E.combine),g.push(E.fogExp2),g.push(E.sizeAttenuation),g.push(E.morphTargetsCount),g.push(E.numSunLights),g.push(E.numDirLights),g.push(E.numPointLights),g.push(E.numSpotLights),g.push(E.numSpotLightMaps),g.push(E.numHemiLights),g.push(E.numRectAreaLights),g.push(E.numSunLightShadows),g.push(E.numDirLightShadows),g.push(E.numPointLightShadows),g.push(E.numSpotLightShadows),g.push(E.numSpotLightShadowsWithMaps),g.push(E.numLightProbes),g.push(E.numLightProbeGrids),g.push(E.shadowMapType),g.push(E.toneMapping),g.push(E.numClippingPlanes),g.push(E.numClipIntersection),g.push(E.depthPacking)}function p(g,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.diffuseRoughness&&a.enable(25),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function S(g){const E=d[g.type];let F;if(E){const I=kn[E];F=kd.clone(I.uniforms)}else F=g.uniforms;return F}function w(g,E){let F=f.get(E);return F!==void 0?++F.usedTimes:(F=new hm(i,E,g,r),l.push(F),f.set(E,F)),F}function T(g){if(--g.usedTimes===0){const E=l.indexOf(g);l[E]=l[l.length-1],l.pop(),f.delete(g.cacheKey),g.destroy()}}function C(g){o.remove(g)}function R(){o.dispose()}return{getParameters:_,getProgramCacheKey:M,getUniforms:S,acquireProgram:w,releaseProgram:T,releaseShaderCache:C,programs:l,dispose:R}}function vm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function xm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function sl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function al(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,_,M,h,p){let S=i[e];return S===void 0?(S={id:d.id,object:d,geometry:m,material:_,materialVariant:a(d),groupOrder:M,renderOrder:d.renderOrder,z:h,group:p},i[e]=S):(S.id=d.id,S.object=d,S.geometry=m,S.material=_,S.materialVariant=a(d),S.groupOrder=M,S.renderOrder=d.renderOrder,S.z=h,S.group=p),e++,S}function c(d,m,_,M,h,p,S){S.reversedDepth===!0&&(h=-h);const w=o(d,m,_,M,h,p);_.transmission>0?n.push(w):_.transparent===!0?r.push(w):t.push(w)}function l(d,m,_,M,h,p){const S=o(d,m,_,M,h,p);_.transmission>0?n.unshift(S):_.transparent===!0?r.unshift(S):t.unshift(S)}function f(d,m){t.length>1&&t.sort(d||xm),n.length>1&&n.sort(m||sl),r.length>1&&r.sort(m||sl)}function u(){for(let d=e,m=i.length;d<m;d++){const _=i[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:u,sort:f}}function ym(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new al,i.set(n,[a])):r>=s.length?(a=new al,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Sm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new q,color:new ct};break;case"SpotLight":t={position:new q,direction:new q,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":t={color:new ct,position:new q,halfWidth:new q,halfHeight:new q};break}return i[e.id]=t,t}}}function Mm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Em=0;function bm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Tm(i){const e=new Sm,t=Mm(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new q);const r=new q,s=new Lt,a=new Lt;function o(l){let f=0,u=0,d=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let m=0,_=0,M=0,h=0,p=0,S=0,w=0,T=0,C=0,R=0,g=0,E=0,F=0,I=0;l.sort(bm);for(let G=0,j=l.length;G<j;G++){const D=l[G],K=D.color,ne=D.intensity,B=D.distance;let ue=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ai?ue=D.shadow.map.texture:ue=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=K.r*ne,u+=K.g*ne,d+=K.b*ne;else if(D.isLightProbe){for(let Q=0;Q<9;Q++)n.probe[Q].addScaledVector(D.sh.coefficients[Q],ne);I++}else if(D.isSunLight){const Q=e.get(D);if(Q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const le=D.shadow,he=t.get(D);he.shadowIntensity=le.intensity,he.shadowBias=le.bias,he.shadowNormalBias=le.normalBias,he.shadowRadius=le.radius,he.shadowMapSize.copy(le.mapSize).multiply(le.getFrameExtents()),n.sunShadow[_]=he,n.sunShadowMap[_]=ue;const ke=le.getViewportCount();for(let $e=0;$e<ke;$e++)n.sunShadowMatrix[M+$e]=le.getMatrix($e),n.sunShadowCascade[M+$e]=le._cascadeData[$e];M+=ke,_++}n.sun[m]=Q,m++}else if(D.isDirectionalLight){const Q=e.get(D);if(Q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const le=D.shadow,he=t.get(D);he.shadowIntensity=le.intensity,he.shadowBias=le.bias,he.shadowNormalBias=le.normalBias,he.shadowRadius=le.radius,he.shadowMapSize=le.mapSize,n.directionalShadow[h]=he,n.directionalShadowMap[h]=ue,n.directionalShadowMatrix[h]=D.shadow.matrix,C++}n.directional[h]=Q,h++}else if(D.isSpotLight){const Q=e.get(D);Q.position.setFromMatrixPosition(D.matrixWorld),Q.color.copy(K).multiplyScalar(ne),Q.distance=B,Q.coneCos=Math.cos(D.angle),Q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Q.decay=D.decay,n.spot[S]=Q;const le=D.shadow;if(D.map&&(n.spotLightMap[E]=D.map,E++,le.updateMatrices(D),D.castShadow&&F++),n.spotLightMatrix[S]=le.matrix,D.castShadow){const he=t.get(D);he.shadowIntensity=le.intensity,he.shadowBias=le.bias,he.shadowNormalBias=le.normalBias,he.shadowRadius=le.radius,he.shadowMapSize=le.mapSize,n.spotShadow[S]=he,n.spotShadowMap[S]=ue,g++}S++}else if(D.isRectAreaLight){const Q=e.get(D);Q.color.copy(K).multiplyScalar(ne),Q.halfWidth.set(D.width*.5,0,0),Q.halfHeight.set(0,D.height*.5,0),n.rectArea[w]=Q,w++}else if(D.isPointLight){const Q=e.get(D);if(Q.color.copy(D.color).multiplyScalar(D.intensity),Q.distance=D.distance,Q.decay=D.decay,D.castShadow){const le=D.shadow,he=t.get(D);he.shadowIntensity=le.intensity,he.shadowBias=le.bias,he.shadowNormalBias=le.normalBias,he.shadowRadius=le.radius,he.shadowMapSize=le.mapSize,he.shadowCameraNear=le.camera.near,he.shadowCameraFar=le.camera.far,n.pointShadow[p]=he,n.pointShadowMap[p]=ue,n.pointShadowMatrix[p]=D.shadow.matrix,R++}n.point[p]=Q,p++}else if(D.isHemisphereLight){const Q=e.get(D);Q.skyColor.copy(D.color).multiplyScalar(ne),Q.groundColor.copy(D.groundColor).multiplyScalar(ne),n.hemi[T]=Q,T++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=u,n.ambient[2]=d;const k=n.hash;(k.sunLength!==m||k.directionalLength!==h||k.pointLength!==p||k.spotLength!==S||k.rectAreaLength!==w||k.hemiLength!==T||k.numSunShadows!==_||k.numDirectionalShadows!==C||k.numPointShadows!==R||k.numSpotShadows!==g||k.numSpotMaps!==E||k.numLightProbes!==I)&&(n.sun.length=m,n.directional.length=h,n.spot.length=S,n.rectArea.length=w,n.point.length=p,n.hemi.length=T,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=C,n.directionalShadowMap.length=C,n.directionalShadowMatrix.length=C,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+E-F,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=I,k.sunLength=m,k.directionalLength=h,k.pointLength=p,k.spotLength=S,k.rectAreaLength=w,k.hemiLength=T,k.numSunShadows=_,k.numDirectionalShadows=C,k.numPointShadows=R,k.numSpotShadows=g,k.numSpotMaps=E,k.numLightProbes=I,n.version=Em++)}function c(l,f){let u=0,d=0,m=0,_=0,M=0,h=0;const p=f.matrixWorldInverse;for(let S=0,w=l.length;S<w;S++){const T=l[S];if(T.isSunLight){const C=n.sun[u];C.direction.setFromMatrixPosition(T.matrixWorld),C.direction.transformDirection(p),u++}else if(T.isDirectionalLight){const C=n.directional[d];C.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),d++}else if(T.isSpotLight){const C=n.spot[_];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),_++}else if(T.isRectAreaLight){const C=n.rectArea[M];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(p),a.identity(),s.copy(T.matrixWorld),s.premultiply(p),a.extractRotation(s),C.halfWidth.set(T.width*.5,0,0),C.halfHeight.set(0,T.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),M++}else if(T.isPointLight){const C=n.point[m];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(p),m++}else if(T.isHemisphereLight){const C=n.hemi[h];C.direction.setFromMatrixPosition(T.matrixWorld),C.direction.transformDirection(p),h++}}}return{setup:o,setupView:c,state:n}}function ol(i){const e=new Tm(i),t=[],n=[],r=[];function s(u){f.camera=u,t.length=0,n.length=0,r.length=0}function a(u){u.isLightProbeGrid?r.push(u):t.push(u)}function o(u){n.push(u)}function c(){e.setup(t),r.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function l(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Am(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ol(i),e.set(r,[o])):s>=a.length?(o=new ol(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Cm=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],Lm=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],ll=new Lt,ar=new q,js=new q;function Pm(i,e,t){let n=new mr;const r=new ot,s=new ot,a=new It,o=new Gd,c=new Vd,l={},f=t.maxTextureSize,u={[Ti]:un,[un]:Ti,[Qn]:Qn},d=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:wm,fragmentShader:Rm}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new Gn;_.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new vi(_,d),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qr;let p=this.type;this.render=function(R,g,E){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||R.length===0)return;this.type===Tc&&(Qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Qr);const F=i.getRenderTarget(),I=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),G=i.state;G.setBlending(Vi),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const j=p!==this.type;j&&g.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(K=>K.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,K=R.length;D<K;D++){const ne=R[D],B=ne.shadow;if(B===void 0){Qe("WebGLShadowMap:",ne,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const ue=B.getFrameExtents();r.multiply(ue),s.copy(B.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/ue.x),r.x=s.x*ue.x,B.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/ue.y),r.y=s.y*ue.y,B.mapSize.y=s.y));const Q=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=Q,B.map===null||j===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===or){if(ne.isPointLight){Qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Bn(r.x,r.y,{format:Ai,type:Hn,minFilter:dn,magFilter:dn,generateMipmaps:!1}),B.map.texture.name=ne.name+".shadowMap",B.map.depthTexture=new qi(r.x,r.y,Fn),B.map.depthTexture.name=ne.name+".shadowMapDepth",B.map.depthTexture.format=gi,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Jt,B.map.depthTexture.magFilter=Jt}else ne.isPointLight?(B.map=new so(r.x),B.map.depthTexture=new Vl(r.x,zn)):(B.map=new Bn(r.x,r.y),B.map.depthTexture=new qi(r.x,r.y,zn)),B.map.depthTexture.name=ne.name+".shadowMap",B.map.depthTexture.format=gi,this.type===Qr?(B.map.depthTexture.compareFunction=Q?Il:Pl,B.map.depthTexture.minFilter=dn,B.map.depthTexture.magFilter=dn):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Jt,B.map.depthTexture.magFilter=Jt);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==r.x||B.map.height!==r.y)&&B.map.setSize(r.x,r.y);const le=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();ne.isPointLight!==!0&&B.updateMatrices(ne,E);const he=(B.camera.layers.mask&4294967294)!==0?B.camera.layers:E.layers;for(let ke=0;ke<le;ke++){const $e=B.getCamera(ke);if(ne.isPointLight){const te=B.camera,Ae=B.matrix,Pe=ne.distance||te.far;Pe!==te.far&&(te.far=Pe,te.updateProjectionMatrix()),ar.setFromMatrixPosition(ne.matrixWorld),te.position.copy(ar),js.copy(te.position),js.add(Cm[ke]),te.up.copy(Lm[ke]),te.lookAt(js),te.updateMatrixWorld(),Ae.makeTranslation(-ar.x,-ar.y,-ar.z),ll.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),B._frustum.setFromProjectionMatrix(ll,te.coordinateSystem,te.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,ke),i.clear();else{ke===0&&(i.setRenderTarget(B.map),i.clear());const te=B.getViewport(ke);a.set(s.x*te.x,s.y*te.y,s.x*te.z,s.y*te.w),G.viewport(a)}n=B.getFrustum(ke),T(g,E,$e,ne,he,this.type)}B.isPointLightShadow!==!0&&this.type===or&&S(B,E),B.needsUpdate=!1}p=this.type,h.needsUpdate=!1,i.setRenderTarget(F,I,k)};function S(R,g){const E=e.update(M);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null?R.mapPass=new Bn(r.x,r.y,{format:Ai,type:Hn}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value.set(R.map.width,R.map.height),d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(g,null,E,d,M,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value.set(R.map.width,R.map.height),m.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(g,null,E,m,M,null)}function w(R,g,E,F){let I=null;const k=E.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(k!==void 0)I=k;else if(I=E.isPointLight===!0?c:o,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const G=I.uuid,j=g.uuid;let D=l[G];D===void 0&&(D={},l[G]=D);let K=D[j];K===void 0&&(K=I.clone(),D[j]=K,g.addEventListener("dispose",C)),I=K}if(I.visible=g.visible,I.wireframe=g.wireframe,F===or?I.side=g.shadowSide!==null?g.shadowSide:g.side:I.side=g.shadowSide!==null?g.shadowSide:u[g.side],I.alphaMap=g.alphaMap,I.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,I.map=g.map,I.clipShadows=g.clipShadows,I.clippingPlanes=g.clippingPlanes,I.clipIntersection=g.clipIntersection,I.displacementMap=g.displacementMap,I.displacementScale=g.displacementScale,I.displacementBias=g.displacementBias,I.wireframeLinewidth=g.wireframeLinewidth,I.linewidth=g.linewidth,E.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const G=i.properties.get(I);G.light=E}return I}function T(R,g,E,F,I,k){if(R.visible===!1)return;if(R.layers.test(I)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&k===or)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,R.matrixWorld);const D=e.update(R),K=R.material;if(Array.isArray(K)){const ne=D.groups;for(let B=0,ue=ne.length;B<ue;B++){const Q=ne[B],le=K[Q.materialIndex];if(le&&le.visible){const he=w(R,le,F,k);R.onBeforeShadow(i,R,g,E,D,he,Q),i.renderBufferDirect(E,null,D,he,R,Q),R.onAfterShadow(i,R,g,E,D,he,Q)}}}else if(K.visible){const ne=w(R,K,F,k);R.onBeforeShadow(i,R,g,E,D,ne,null),i.renderBufferDirect(E,null,D,ne,R,null),R.onAfterShadow(i,R,g,E,D,ne,null)}}const j=R.children;for(let D=0,K=j.length;D<K;D++)T(j[D],g,E,F,I,k)}function C(R){R.target.removeEventListener("dispose",C);for(const E in l){const F=l[E],I=R.target.uuid;I in F&&(F[I].dispose(),delete F[I])}}}function Im(i,e){function t(){let P=!1;const re=new It;let ee=null;const be=new It(0,0,0,0);return{setMask:function(ye){ee!==ye&&!P&&(i.colorMask(ye,ye,ye,ye),ee=ye)},setLocked:function(ye){P=ye},setClear:function(ye,Me,Be,Je,ge){ge===!0&&(ye*=Je,Me*=Je,Be*=Je),re.set(ye,Me,Be,Je),be.equals(re)===!1&&(i.clearColor(ye,Me,Be,Je),be.copy(re))},reset:function(){P=!1,ee=null,be.set(-1,0,0,0)}}}function n(){let P=!1,re=!1,ee=null,be=null,ye=null;return{setReversed:function(Me){if(re!==Me){const Be=e.get("EXT_clip_control");Me?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),re=Me;const Je=ye;ye=null,this.setClear(Je)}},getReversed:function(){return re},setTest:function(Me){Me?Re(i.DEPTH_TEST):Ze(i.DEPTH_TEST)},setMask:function(Me){ee!==Me&&!P&&(i.depthMask(Me),ee=Me)},setFunc:function(Me){if(re&&(Me=sd[Me]),be!==Me){switch(Me){case na:i.depthFunc(i.NEVER);break;case ia:i.depthFunc(i.ALWAYS);break;case ra:i.depthFunc(i.LESS);break;case ur:i.depthFunc(i.LEQUAL);break;case sa:i.depthFunc(i.EQUAL);break;case aa:i.depthFunc(i.GEQUAL);break;case oa:i.depthFunc(i.GREATER);break;case la:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=Me}},setLocked:function(Me){P=Me},setClear:function(Me){ye!==Me&&(ye=Me,re&&(Me=1-Me),i.clearDepth(Me))},reset:function(){P=!1,ee=null,be=null,ye=null,re=!1}}}function r(){let P=!1,re=null,ee=null,be=null,ye=null,Me=null,Be=null,Je=null,ge=null;return{setTest:function(ze){P||(ze?Re(i.STENCIL_TEST):Ze(i.STENCIL_TEST))},setMask:function(ze){re!==ze&&!P&&(i.stencilMask(ze),re=ze)},setFunc:function(ze,Ve,we){(ee!==ze||be!==Ve||ye!==we)&&(i.stencilFunc(ze,Ve,we),ee=ze,be=Ve,ye=we)},setOp:function(ze,Ve,we){(Me!==ze||Be!==Ve||Je!==we)&&(i.stencilOp(ze,Ve,we),Me=ze,Be=Ve,Je=we)},setLocked:function(ze){P=ze},setClear:function(ze){ge!==ze&&(i.clearStencil(ze),ge=ze)},reset:function(){P=!1,re=null,ee=null,be=null,ye=null,Me=null,Be=null,Je=null,ge=null}}}const s=new t,a=new n,o=new r;let c={};const l=new WeakMap;let f={},u={},d={},m=new WeakMap,_=[],M=null,h=!1,p=null,S=null,w=null,T=null,C=null,R=null,g=null,E=new ct(0,0,0),F=0,I=!1,k=null,G=null,j=null,D=null,K=null;const ne=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,ue=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec(Q)[1]),B=ue>=1):Q.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),B=ue>=2);let le=null,he={};const ke=i.getParameter(i.SCISSOR_BOX),$e=i.getParameter(i.VIEWPORT),te=new It().fromArray(ke),Ae=new It().fromArray($e);function Pe(P,re,ee,be){const ye=new Uint8Array(4),Me=i.createTexture();i.bindTexture(P,Me),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<ee;Be++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(re+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return Me}const Fe={};Fe[i.TEXTURE_2D]=Pe(i.TEXTURE_2D,i.TEXTURE_2D,1),Fe[i.TEXTURE_CUBE_MAP]=Pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Fe[i.TEXTURE_2D_ARRAY]=Pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Fe[i.TEXTURE_3D]=Pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Re(i.DEPTH_TEST),a.setFunc(ur),Gt(!1),bt(fo),Re(i.CULL_FACE),Ht(Vi);function Re(P){f[P]!==!0&&(i.enable(P),f[P]=!0)}function Ze(P){f[P]!==!1&&(i.disable(P),f[P]=!1)}function Mt(P,re){return d[P]!==re?(i.bindFramebuffer(P,re),d[P]=re,P===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=re),P===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=re),!0):!1}function qe(P,re){let ee=_,be=!1;if(P){ee=m.get(re),ee===void 0&&(ee=[],m.set(re,ee));const ye=P.textures;if(ee.length!==ye.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,Be=ye.length;Me<Be;Me++)ee[Me]=i.COLOR_ATTACHMENT0+Me;ee.length=ye.length,be=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,be=!0);be&&i.drawBuffers(ee)}function gt(P){return M!==P?(i.useProgram(P),M=P,!0):!1}const mt={[Gi]:i.FUNC_ADD,[wc]:i.FUNC_SUBTRACT,[Rc]:i.FUNC_REVERSE_SUBTRACT};mt[Cc]=i.MIN,mt[Lc]=i.MAX;const rt={[Pc]:i.ZERO,[Ic]:i.ONE,[Dc]:i.SRC_COLOR,[fl]:i.SRC_ALPHA,[Bc]:i.SRC_ALPHA_SATURATE,[Fc]:i.DST_COLOR,[Uc]:i.DST_ALPHA,[Nc]:i.ONE_MINUS_SRC_COLOR,[pl]:i.ONE_MINUS_SRC_ALPHA,[Oc]:i.ONE_MINUS_DST_COLOR,[kc]:i.ONE_MINUS_DST_ALPHA,[zc]:i.CONSTANT_COLOR,[Hc]:i.ONE_MINUS_CONSTANT_COLOR,[Gc]:i.CONSTANT_ALPHA,[Vc]:i.ONE_MINUS_CONSTANT_ALPHA};function Ht(P,re,ee,be,ye,Me,Be,Je,ge,ze){if(P===Vi){h===!0&&(Ze(i.BLEND),h=!1);return}if(h===!1&&(Re(i.BLEND),h=!0),P!==Ac){if(P!==p||ze!==I){if((S!==Gi||C!==Gi)&&(i.blendEquation(i.FUNC_ADD),S=Gi,C=Gi),ze)switch(P){case cr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ta:i.blendFunc(i.ONE,i.ONE);break;case po:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case mo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:vt("WebGLState: Invalid blending: ",P);break}else switch(P){case cr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ta:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case po:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mo:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",P);break}w=null,T=null,R=null,g=null,E.set(0,0,0),F=0,p=P,I=ze}return}ye=ye||re,Me=Me||ee,Be=Be||be,(re!==S||ye!==C)&&(i.blendEquationSeparate(mt[re],mt[ye]),S=re,C=ye),(ee!==w||be!==T||Me!==R||Be!==g)&&(i.blendFuncSeparate(rt[ee],rt[be],rt[Me],rt[Be]),w=ee,T=be,R=Me,g=Be),(Je.equals(E)===!1||ge!==F)&&(i.blendColor(Je.r,Je.g,Je.b,ge),E.copy(Je),F=ge),p=P,I=!1}function At(P,re){P.side===Qn?Ze(i.CULL_FACE):Re(i.CULL_FACE);let ee=P.side===un;re&&(ee=!ee),Gt(ee),P.blending===cr&&P.transparent===!1?Ht(Vi):Ht(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const be=P.stencilWrite;o.setTest(be),be&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),wt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Re(i.SAMPLE_ALPHA_TO_COVERAGE):Ze(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(P){k!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),k=P)}function bt(P){P!==Ec?(Re(i.CULL_FACE),P!==G&&(P===fo?i.cullFace(i.BACK):P===bc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ze(i.CULL_FACE),G=P}function en(P){P!==j&&(B&&i.lineWidth(P),j=P)}function wt(P,re,ee){P?(Re(i.POLYGON_OFFSET_FILL),(D!==re||K!==ee)&&(D=re,K=ee,a.getReversed()&&(re=-re,ee=-ee),i.polygonOffset(re,ee))):Ze(i.POLYGON_OFFSET_FILL)}function on(P){P?Re(i.SCISSOR_TEST):Ze(i.SCISSOR_TEST)}function Ft(P){P===void 0&&(P=i.TEXTURE0+ne-1),le!==P&&(i.activeTexture(P),le=P)}function Kt(P,re,ee){ee===void 0&&(le===null?ee=i.TEXTURE0+ne-1:ee=le);let be=he[ee];be===void 0&&(be={type:void 0,texture:void 0},he[ee]=be),(be.type!==P||be.texture!==re)&&(le!==ee&&(i.activeTexture(ee),le=ee),i.bindTexture(P,re||Fe[P]),be.type=P,be.texture=re)}function O(){const P=he[le];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function tn(){try{i.compressedTexImage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function Tt(){try{i.compressedTexImage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function lt(){try{i.texSubImage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function xe(){try{i.texSubImage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function nt(){try{i.compressedTexSubImage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function We(){try{i.compressedTexSubImage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function Ye(){try{i.texStorage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function A(){try{i.texStorage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function x(){try{i.texImage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function X(){try{i.texImage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function pe(P){return u[P]!==void 0?u[P]:i.getParameter(P)}function ae(P,re){u[P]!==re&&(i.pixelStorei(P,re),u[P]=re)}function de(P){te.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),te.copy(P))}function Te(P){Ae.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Ae.copy(P))}function ie(P,re){let ee=l.get(re);ee===void 0&&(ee=new WeakMap,l.set(re,ee));let be=ee.get(P);be===void 0&&(be=i.getUniformBlockIndex(re,P.name),i.uniformBlockBinding(re,be,be),ee.set(P,be))}function se(P,re,ee){const ye=l.get(re).get(P);c[ye]!==ee&&(i.bindBufferBase(i.UNIFORM_BUFFER,ye,ee),c[ye]=ee)}function Ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),f={},u={},le=null,he={},d={},c={},m=new WeakMap,_=[],M=null,h=!1,p=null,S=null,w=null,T=null,C=null,R=null,g=null,E=new ct(0,0,0),F=0,I=!1,k=null,G=null,j=null,D=null,K=null,te.set(0,0,i.canvas.width,i.canvas.height),Ae.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Re,disable:Ze,bindFramebuffer:Mt,drawBuffers:qe,useProgram:gt,setBlending:Ht,setMaterial:At,setFlipSided:Gt,setCullFace:bt,setLineWidth:en,setPolygonOffset:wt,setScissorTest:on,activeTexture:Ft,bindTexture:Kt,unbindTexture:O,compressedTexImage2D:tn,compressedTexImage3D:Tt,texImage2D:x,texImage3D:X,pixelStorei:ae,getParameter:pe,updateUBOMapping:ie,uniformBlockBinding:se,texStorage2D:Ye,texStorage3D:A,texSubImage2D:lt,texSubImage3D:xe,compressedTexSubImage2D:nt,compressedTexSubImage3D:We,scissor:de,viewport:Te,reset:Ee}}function Dm(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,f=new WeakMap,u=new Set;let d;const m=new WeakMap,_=new Set,M=new FinalizationRegistry(A=>_.delete(A));let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,x){return h?new OffscreenCanvas(A,x):cs("canvas")}function S(A,x,X){let pe=1;const ae=Ye(A);if((ae.width>X||ae.height>X)&&(pe=X/Math.max(ae.width,ae.height)),pe<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const de=Math.floor(pe*ae.width),Te=Math.floor(pe*ae.height);d===void 0&&(d=p(de,Te));const ie=x?p(de,Te):d;return ie.width=de,ie.height=Te,ie.getContext("2d").drawImage(A,0,0,de,Te),Qe("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+de+"x"+Te+")."),ie}else return"data"in A&&Qe("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),A;return A}function w(A){return A.generateMipmaps}function T(A){i.generateMipmap(A)}function C(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function R(A,x,X,pe,ae,de=!1){if(A!==null){if(i[A]!==void 0)return i[A];Qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Te;pe&&(Te=e.get("EXT_texture_norm16"),Te||Qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=x;if(x===i.RED&&(X===i.FLOAT&&(ie=i.R32F),X===i.HALF_FLOAT&&(ie=i.R16F),X===i.UNSIGNED_BYTE&&(ie=i.R8),X===i.UNSIGNED_SHORT&&Te&&(ie=Te.R16_EXT),X===i.SHORT&&Te&&(ie=Te.R16_SNORM_EXT)),x===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(ie=i.R8UI),X===i.UNSIGNED_SHORT&&(ie=i.R16UI),X===i.UNSIGNED_INT&&(ie=i.R32UI),X===i.BYTE&&(ie=i.R8I),X===i.SHORT&&(ie=i.R16I),X===i.INT&&(ie=i.R32I)),x===i.RG&&(X===i.FLOAT&&(ie=i.RG32F),X===i.HALF_FLOAT&&(ie=i.RG16F),X===i.UNSIGNED_BYTE&&(ie=i.RG8),X===i.UNSIGNED_SHORT&&Te&&(ie=Te.RG16_EXT),X===i.SHORT&&Te&&(ie=Te.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(ie=i.RG8UI),X===i.UNSIGNED_SHORT&&(ie=i.RG16UI),X===i.UNSIGNED_INT&&(ie=i.RG32UI),X===i.BYTE&&(ie=i.RG8I),X===i.SHORT&&(ie=i.RG16I),X===i.INT&&(ie=i.RG32I)),x===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),X===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),X===i.UNSIGNED_INT&&(ie=i.RGB32UI),X===i.BYTE&&(ie=i.RGB8I),X===i.SHORT&&(ie=i.RGB16I),X===i.INT&&(ie=i.RGB32I)),x===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),X===i.UNSIGNED_INT&&(ie=i.RGBA32UI),X===i.BYTE&&(ie=i.RGBA8I),X===i.SHORT&&(ie=i.RGBA16I),X===i.INT&&(ie=i.RGBA32I)),x===i.RGB&&(X===i.UNSIGNED_SHORT&&Te&&(ie=Te.RGB16_EXT),X===i.SHORT&&Te&&(ie=Te.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(ie=i.R11F_G11F_B10F)),x===i.RGBA){const se=de?ls:ht.getTransfer(ae);X===i.FLOAT&&(ie=i.RGBA32F),X===i.HALF_FLOAT&&(ie=i.RGBA16F),X===i.UNSIGNED_BYTE&&(ie=se===Et?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&Te&&(ie=Te.RGBA16_EXT),X===i.SHORT&&Te&&(ie=Te.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function g(A,x){let X;return A?x===null||x===zn||x===Ki?X=i.DEPTH24_STENCIL8:x===Fn?X=i.DEPTH32F_STENCIL8:x===fr&&(X=i.DEPTH24_STENCIL8,Qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===zn||x===Ki?X=i.DEPTH_COMPONENT24:x===Fn?X=i.DEPTH_COMPONENT32F:x===fr&&(X=i.DEPTH_COMPONENT16),X}function E(A,x){return w(A)===!0||A.isFramebufferTexture&&A.minFilter!==Jt&&A.minFilter!==dn?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function F(A){const x=new WeakRef(A);n.get(A).__ref=x,_.add(x),M.register(A,x,x)}function I(A){const x=n.get(A).__ref;x!==void 0&&(_.delete(x),M.unregister(x))}function k(A){j(A.target)}function G(A){D(A.target)}function j(A){A.removeEventListener("dispose",k),I(A),ne(A),A.isVideoTexture&&f.delete(A),A.isHTMLTexture&&u.delete(A)}function D(A){A.removeEventListener("dispose",G),I(A),ue(A)}function K(){for(const A of _){const x=A.deref();x!==void 0&&(x.isRenderTarget===!0?D(x):j(x))}_.clear(),u.clear()}function ne(A){const x=n.get(A);if(x.__webglInit===void 0)return;const X=A.source,pe=m.get(X);if(pe){const ae=pe[x.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&B(A),Object.keys(pe).length===0&&m.delete(X)}n.remove(A)}function B(A){const x=n.get(A);i.deleteTexture(x.__webglTexture);const X=A.source,pe=m.get(X);delete pe[x.__cacheKey],a.memory.textures--}function ue(A){const x=n.get(A);x.__depthDisposeCallback&&x.__depthDisposeCallback();const X=A.depthTexture;if(X&&X.renderTarget===A&&j(X),A.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(x.__webglFramebuffer[ae]))for(let de=0;de<x.__webglFramebuffer[ae].length;de++)i.deleteFramebuffer(x.__webglFramebuffer[ae][de]);else i.deleteFramebuffer(x.__webglFramebuffer[ae]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[ae])}else{if(Array.isArray(x.__webglFramebuffer))for(let ae=0;ae<x.__webglFramebuffer.length;ae++)i.deleteFramebuffer(x.__webglFramebuffer[ae]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let ae=0;ae<x.__webglColorRenderbuffer.length;ae++)x.__webglColorRenderbuffer[ae]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[ae]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const pe=A.textures;for(let ae=0,de=pe.length;ae<de;ae++){const Te=n.get(pe[ae]);Te.__webglTexture&&(i.deleteTexture(Te.__webglTexture),a.memory.textures--),n.remove(pe[ae])}n.remove(A)}let Q=0;function le(){Q=0}function he(){return Q}function ke(A){Q=A}function $e(){const A=Q;return A>=r.maxTextures&&Qe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),Q+=1,A}function te(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.mipmapsAutoUpdate),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function Ae(A,x){const X=n.get(A);if(A.isVideoTexture&&nt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&X.__version!==A.version){const pe=A.image;if(pe===null)Qe("WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)Qe("WebGLRenderer: Texture marked for update but image is incomplete");else{At(X,A,x);return}}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+x)}function Pe(A,x){const X=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version){At(X,A,x);return}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+x)}function Fe(A,x){const X=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version){At(X,A,x);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+x)}function Re(A,x){const X=n.get(A);if(A.version>0&&X.__version!==A.version){Gt(X,A,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+x)}const Ze={[ca]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[da]:i.MIRRORED_REPEAT},Mt={[Jt]:i.NEAREST,[$c]:i.NEAREST_MIPMAP_NEAREST,[wr]:i.NEAREST_MIPMAP_LINEAR,[dn]:i.LINEAR,[As]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},qe={[Zc]:i.NEVER,[Dl]:i.ALWAYS,[Jc]:i.LESS,[Pl]:i.LEQUAL,[jc]:i.EQUAL,[Il]:i.GEQUAL,[Qc]:i.GREATER,[ed]:i.NOTEQUAL};function gt(A,x){if(x.type===Fn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===dn||x.magFilter===As||x.magFilter===wr||x.magFilter===fi||x.minFilter===dn||x.minFilter===As||x.minFilter===wr||x.minFilter===fi)&&Qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Ze[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Ze[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Ze[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Mt[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Mt[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,qe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Jt||x.minFilter!==wr&&x.minFilter!==fi||x.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function mt(A,x){let X=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",k),F(x));const pe=x.source;let ae=m.get(pe);ae===void 0&&(ae={},m.set(pe,ae));const de=te(x);if(de!==A.__cacheKey){ae[de]===void 0&&(ae[de]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),ae[de].usedTimes++;const Te=ae[A.__cacheKey];Te!==void 0&&(ae[A.__cacheKey].usedTimes--,Te.usedTimes===0&&B(x)),A.__cacheKey=de,A.__webglTexture=ae[de].texture}return X}function rt(A,x,X){return Math.floor(Math.floor(A/X)/x)}function Ht(A,x,X,pe){const de=A.updateRanges;if(de.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,X,pe,x.data);else{de.sort((P,re)=>P.start-re.start);let Te=0;for(let P=1;P<de.length;P++){const re=de[Te],ee=de[P],be=re.start+re.count,ye=rt(ee.start,x.width,4),Me=rt(re.start,x.width,4);ee.start<=be+1&&ye===Me&&rt(ee.start+ee.count-1,x.width,4)===ye?re.count=Math.max(re.count,ee.start+ee.count-re.start):(++Te,de[Te]=ee)}de.length=Te+1;const ie=t.getParameter(i.UNPACK_ROW_LENGTH),se=t.getParameter(i.UNPACK_SKIP_PIXELS),Ee=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let P=0,re=de.length;P<re;P++){const ee=de[P],be=Math.floor(ee.start/4),ye=Math.ceil(ee.count/4),Me=be%x.width,Be=Math.floor(be/x.width),Je=ye,ge=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Me),t.pixelStorei(i.UNPACK_SKIP_ROWS,Be),t.texSubImage2D(i.TEXTURE_2D,0,Me,Be,Je,ge,X,pe,x.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ie),t.pixelStorei(i.UNPACK_SKIP_PIXELS,se),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function At(A,x,X){let pe=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(pe=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(pe=i.TEXTURE_3D);const ae=mt(A,x),de=x.source;t.bindTexture(pe,A.__webglTexture,i.TEXTURE0+X);const Te=n.get(de);if(de.version!==Te.__version||ae===!0){if(t.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ge=ht.getPrimaries(ht.workingColorSpace),ze=x.colorSpace===hi?null:ht.getPrimaries(x.colorSpace),Ve=x.colorSpace===hi||ge===ze?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let se=S(x.image,!1,r.maxTextureSize);se=We(x,se);const Ee=s.convert(x.format,x.colorSpace),P=s.convert(x.type);let re=R(x.internalFormat,Ee,P,x.normalized,x.colorSpace,x.isVideoTexture);gt(pe,x);let ee;const be=x.mipmaps,ye=x.isVideoTexture!==!0,Me=Te.__version===void 0||ae===!0,Be=de.dataReady,Je=E(x,se);if(x.isDepthTexture)re=g(x.format===pi,x.type),Me&&(ye?t.texStorage2D(i.TEXTURE_2D,1,re,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,re,se.width,se.height,0,Ee,P,null));else if(x.isDataTexture)if(be.length>0){ye&&Me&&t.texStorage2D(i.TEXTURE_2D,Je,re,be[0].width,be[0].height);for(let ge=0,ze=be.length;ge<ze;ge++)ee=be[ge],ye?Be&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,ee.width,ee.height,Ee,P,ee.data):t.texImage2D(i.TEXTURE_2D,ge,re,ee.width,ee.height,0,Ee,P,ee.data);x.generateMipmaps=!1}else ye?(Me&&t.texStorage2D(i.TEXTURE_2D,Je,re,se.width,se.height),Be&&Ht(x,se,Ee,P)):t.texImage2D(i.TEXTURE_2D,0,re,se.width,se.height,0,Ee,P,se.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ye&&Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,re,be[0].width,be[0].height,se.depth);for(let ge=0,ze=be.length;ge<ze;ge++)if(ee=be[ge],x.format!==On)if(Ee!==null)if(ye){if(Be)if(x.layerUpdates.size>0){const Ve=Ho(ee.width,ee.height,x.format,x.type);for(const we of x.layerUpdates){const pt=ee.data.subarray(we*Ve/ee.data.BYTES_PER_ELEMENT,(we+1)*Ve/ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,we,ee.width,ee.height,1,Ee,pt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,ee.width,ee.height,se.depth,Ee,ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ge,re,ee.width,ee.height,se.depth,0,ee.data,0,0);else Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ye?Be&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,ee.width,ee.height,se.depth,Ee,P,ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ge,re,ee.width,ee.height,se.depth,0,Ee,P,ee.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{ye&&Me&&t.texStorage2D(i.TEXTURE_2D,Je,re,be[0].width,be[0].height);for(let ge=0,ze=be.length;ge<ze;ge++)ee=be[ge],x.format!==On?Ee!==null?ye?Be&&t.compressedTexSubImage2D(i.TEXTURE_2D,ge,0,0,ee.width,ee.height,Ee,ee.data):t.compressedTexImage2D(i.TEXTURE_2D,ge,re,ee.width,ee.height,0,ee.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ye?Be&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,ee.width,ee.height,Ee,P,ee.data):t.texImage2D(i.TEXTURE_2D,ge,re,ee.width,ee.height,0,Ee,P,ee.data)}else if(x.isDataArrayTexture)if(ye){if(Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,re,se.width,se.height,se.depth),Be)if(x.layerUpdates.size>0){const ge=Ho(se.width,se.height,x.format,x.type);for(const ze of x.layerUpdates){const Ve=se.data.subarray(ze*ge/se.data.BYTES_PER_ELEMENT,(ze+1)*ge/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ze,se.width,se.height,1,Ee,P,Ve)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Ee,P,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,re,se.width,se.height,se.depth,0,Ee,P,se.data);else if(x.isData3DTexture)ye?(Me&&t.texStorage3D(i.TEXTURE_3D,Je,re,se.width,se.height,se.depth),Be&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Ee,P,se.data)):t.texImage3D(i.TEXTURE_3D,0,re,se.width,se.height,se.depth,0,Ee,P,se.data);else if(x.isFramebufferTexture){if(Me)if(ye)t.texStorage2D(i.TEXTURE_2D,Je,re,se.width,se.height);else{let ge=se.width,ze=se.height;for(let Ve=0;Ve<Je;Ve++)t.texImage2D(i.TEXTURE_2D,Ve,re,ge,ze,0,Ee,P,null),ge>>=1,ze>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const ge=i.canvas;if(ge.hasAttribute("layoutsubtree")||ge.setAttribute("layoutsubtree","true"),se.parentNode!==ge){ge.appendChild(se),u.add(x),ge.onpaint=ze=>{const Ve=ze.changedElements;for(const we of u)Ve.includes(we.image)&&(we.needsUpdate=!0)},ge.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,se);else{const Ve=i.RGBA,we=i.RGBA,pt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ve,we,pt,se)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(be.length>0){if(ye&&Me){const ge=Ye(be[0]);t.texStorage2D(i.TEXTURE_2D,Je,re,ge.width,ge.height)}for(let ge=0,ze=be.length;ge<ze;ge++)ee=be[ge],ye?Be&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,Ee,P,ee):t.texImage2D(i.TEXTURE_2D,ge,re,Ee,P,ee);x.generateMipmaps=!1}else if(ye){if(Me){const ge=Ye(se);t.texStorage2D(i.TEXTURE_2D,Je,re,ge.width,ge.height)}Be&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,P,se)}else t.texImage2D(i.TEXTURE_2D,0,re,Ee,P,se);w(x)&&x.mipmapsAutoUpdate===!0&&T(pe),Te.__version=de.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Gt(A,x,X){if(x.image.length!==6)return;const pe=mt(A,x),ae=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+X);const de=n.get(ae);if(ae.version!==de.__version||pe===!0){t.activeTexture(i.TEXTURE0+X);const Te=ht.getPrimaries(ht.workingColorSpace),ie=x.colorSpace===hi?null:ht.getPrimaries(x.colorSpace),se=x.colorSpace===hi||Te===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);const Ee=x.isCompressedTexture||x.image[0].isCompressedTexture,P=x.image[0]&&x.image[0].isDataTexture,re=[];for(let we=0;we<6;we++)!Ee&&!P?re[we]=S(x.image[we],!0,r.maxCubemapSize):re[we]=P?x.image[we].image:x.image[we],re[we]=We(x,re[we]);const ee=re[0],be=s.convert(x.format,x.colorSpace),ye=s.convert(x.type);let Me=R(x.internalFormat,be,ye,x.normalized,x.colorSpace);const Be=x.isVideoTexture!==!0,Je=de.__version===void 0||pe===!0,ge=ae.dataReady;let ze=E(x,ee);gt(i.TEXTURE_CUBE_MAP,x);let Ve;if(x.isDepthTexture){if(Me=g(x.format===pi,x.type),Je)if(Be)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,Me,ee.width,ee.height);else for(let we=0;we<6;we++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Me,ee.width,ee.height,0,be,ye,null)}else if(Ee){Be&&Je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ze,Me,ee.width,ee.height);for(let we=0;we<6;we++){Ve=re[we].mipmaps;for(let pt=0;pt<Ve.length;pt++){const Ot=Ve[pt];x.format!==On?be!==null?Be?ge&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt,0,0,Ot.width,Ot.height,be,Ot.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt,Me,Ot.width,Ot.height,0,Ot.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt,0,0,Ot.width,Ot.height,be,ye,Ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt,Me,Ot.width,Ot.height,0,be,ye,Ot.data)}}}else{if(Ve=x.mipmaps,Be&&Je){Ve.length>0&&ze++;const we=Ye(re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ze,Me,we.width,we.height)}for(let we=0;we<6;we++)if(P){Be?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,re[we].width,re[we].height,be,ye,re[we].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Me,re[we].width,re[we].height,0,be,ye,re[we].data);for(let pt=0;pt<Ve.length;pt++){const Dn=Ve[pt].image[we].image;Be?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt+1,0,0,Dn.width,Dn.height,be,ye,Dn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt+1,Me,Dn.width,Dn.height,0,be,ye,Dn.data)}}else{Be?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,be,ye,re[we]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Me,be,ye,re[we]);for(let pt=0;pt<Ve.length;pt++){const Ot=Ve[pt];Be?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt+1,0,0,be,ye,Ot.image[we]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt+1,Me,be,ye,Ot.image[we])}}}w(x)&&x.mipmapsAutoUpdate===!0&&T(i.TEXTURE_CUBE_MAP),de.__version=ae.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function bt(A,x,X,pe,ae,de){const Te=s.convert(X.format,X.colorSpace),ie=s.convert(X.type),se=R(X.internalFormat,Te,ie,X.normalized,X.colorSpace),Ee=n.get(x),P=n.get(X);if(P.__renderTarget=x,!Ee.__hasExternalTextures){const re=Math.max(1,x.width>>de),ee=Math.max(1,x.height>>de);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,de,se,re,ee,x.depth,0,Te,ie,null):t.texImage2D(ae,de,se,re,ee,0,Te,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),xe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,pe,ae,P.__webglTexture,0,lt(x)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,pe,ae,P.__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function en(A,x,X){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){const pe=x.depthTexture,ae=pe&&pe.isDepthTexture?pe.type:null,de=g(x.stencilBuffer,ae),Te=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xe(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(x),de,x.width,x.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(x),de,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,de,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,A)}else{const pe=x.textures;for(let ae=0;ae<pe.length;ae++){const de=pe[ae],Te=s.convert(de.format,de.colorSpace),ie=s.convert(de.type),se=R(de.internalFormat,Te,ie,de.normalized,de.colorSpace);xe(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(x),se,x.width,x.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(x),se,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,se,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(A,x,X){const pe=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ae=n.get(x.depthTexture);ae.__renderTarget=x;const de=pe?x.depthTexture.image[0]:x.depthTexture.image;(!ae.__webglTexture||de.width!==x.width||de.height!==x.height)&&(de.width=x.width,de.height=x.height,x.depthTexture.needsUpdate=!0),pe?Re(x.depthTexture,0):Ae(x.depthTexture,0);const Te=ae.__webglTexture,ie=lt(x),se=pe?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,Ee=x.depthTexture.format===pi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===gi)xe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,se,Te,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,se,Te,0);else if(x.depthTexture.format===pi)xe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,se,Te,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,se,Te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function on(A){const x=n.get(A),X=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const pe=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),pe){const ae=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,pe.removeEventListener("dispose",ae)};pe.addEventListener("dispose",ae),x.__depthDisposeCallback=ae}x.__boundDepthTexture=pe}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(X)for(let pe=0;pe<6;pe++)wt(x.__webglFramebuffer[pe],A,pe);else A.texture.mipmaps.length>0?wt(x.__webglFramebuffer[0],A,0):wt(x.__webglFramebuffer,A,0);else if(X){x.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[pe]),x.__webglDepthbuffer[pe]===void 0)x.__webglDepthbuffer[pe]=i.createRenderbuffer(),en(x.__webglDepthbuffer[pe],A,!1);else{const ae=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=x.__webglDepthbuffer[pe];i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,de)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),en(x.__webglDepthbuffer,A,!1);else{const ae=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,de)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(A,x,X){const pe=n.get(A);x!==void 0&&bt(pe.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&on(A)}function Kt(A){const x=A.texture,X=n.get(A),pe=n.get(x);A.addEventListener("dispose",G),F(A);const ae=A.textures,de=A.isWebGLCubeRenderTarget===!0,Te=ae.length>1;if(Te||(pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture()),pe.__version=x.version,a.memory.textures++),de){X.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(x.mipmaps.length>0){X.__webglFramebuffer[ie]=[];for(let se=0;se<x.mipmaps.length;se++)X.__webglFramebuffer[ie][se]=i.createFramebuffer()}else X.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(x.mipmaps.length>0){X.__webglFramebuffer=[];for(let ie=0;ie<x.mipmaps.length;ie++)X.__webglFramebuffer[ie]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Te)for(let ie=0,se=ae.length;ie<se;ie++){const Ee=n.get(ae[ie]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&xe(A)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ie=0;ie<ae.length;ie++){const se=ae[ie];X.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[ie]);const Ee=s.convert(se.format,se.colorSpace),P=s.convert(se.type),re=R(se.internalFormat,Ee,P,se.normalized,se.colorSpace,A.isXRRenderTarget===!0),ee=lt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,re,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,X.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),en(X.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,pe.__webglTexture),gt(i.TEXTURE_CUBE_MAP,x);for(let ie=0;ie<6;ie++)if(x.mipmaps.length>0)for(let se=0;se<x.mipmaps.length;se++)bt(X.__webglFramebuffer[ie][se],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,se);else bt(X.__webglFramebuffer[ie],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);w(x)?T(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}else if(Te){for(let ie=0,se=ae.length;ie<se;ie++){const Ee=ae[ie],P=n.get(Ee);let re=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(re=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,P.__webglTexture),gt(re,Ee),bt(X.__webglFramebuffer,A,Ee,i.COLOR_ATTACHMENT0+ie,re,0),w(Ee)&&T(re)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ie=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,pe.__webglTexture),gt(ie,x),x.mipmaps.length>0)for(let se=0;se<x.mipmaps.length;se++)bt(X.__webglFramebuffer[se],A,x,i.COLOR_ATTACHMENT0,ie,se);else bt(X.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,ie,0);w(x)?T(ie):x.mipmaps.length>0&&i.texParameteri(ie,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&on(A)}function O(A){const x=A.textures;for(let X=0,pe=x.length;X<pe;X++){const ae=x[X];if(w(ae)&&ae.mipmapsAutoUpdate===!0){const de=C(A),Te=n.get(ae).__webglTexture;t.bindTexture(de,Te),T(de),t.unbindTexture()}}}const tn=[];function Tt(A){if(A.samples>0){if(xe(A)===!1){const x=A.textures,X=A.width,pe=A.height;let ae=i.COLOR_BUFFER_BIT;const de=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(A),ie=x.length>1;if(ie)for(let Ee=0;Ee<x.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Ee=0;Ee<x.length;Ee++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);const P=n.get(x[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,P,0)}i.blitFramebuffer(0,0,X,pe,0,0,X,pe,ae,i.NEAREST),c===!0&&(tn.length=0,tn.push(i.COLOR_ATTACHMENT0+Ee),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&tn.push(de),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tn))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let Ee=0;Ee<x.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);const P=n.get(x[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,P,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){const x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function lt(A){return Math.min(r.maxSamples,A.samples)}function xe(A){const x=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function nt(A){const x=a.render.frame;f.get(A)!==x&&(f.set(A,x),A.update())}function We(A,x){const X=A.colorSpace,pe=A.format,ae=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||X!==os&&X!==hi&&(ht.getTransfer(X)===Et?(pe!==On||ae!==_n)&&Qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",X)),x}function Ye(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=$e,this.resetTextureUnits=le,this.getTextureUnits=he,this.setTextureUnits=ke,this.setTexture2D=Ae,this.setTexture2DArray=Pe,this.setTexture3D=Fe,this.setTextureCube=Re,this.rebindTextures=Ft,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=on,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=xe,this.dispose=K}function Nm(i,e){function t(n,r=hi){let s;const a=ht.getTransfer(r);if(n===_n)return i.UNSIGNED_BYTE;if(n===Ya)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Za)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Al)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===wl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===bl)return i.BYTE;if(n===Tl)return i.SHORT;if(n===fr)return i.UNSIGNED_SHORT;if(n===qa)return i.INT;if(n===zn)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===Hn)return i.HALF_FLOAT;if(n===Rl)return i.ALPHA;if(n===Cl)return i.RGB;if(n===On)return i.RGBA;if(n===gi)return i.DEPTH_COMPONENT;if(n===pi)return i.DEPTH_STENCIL;if(n===Ll)return i.RED;if(n===Ja)return i.RED_INTEGER;if(n===Ai)return i.RG;if(n===ja)return i.RG_INTEGER;if(n===Qa)return i.RGBA_INTEGER;if(n===es||n===ts||n===ns||n===is)if(a===Et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===es)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ts)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===es)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ts)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ns)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===is)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ua||n===ha||n===fa||n===pa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ua)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ha)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ma||n===ga||n===_a||n===va||n===xa||n===ss||n===ya)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ma||n===ga)return a===Et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===_a)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===va)return s.COMPRESSED_R11_EAC;if(n===xa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ss)return s.COMPRESSED_RG11_EAC;if(n===ya)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Sa||n===Ma||n===Ea||n===ba||n===Ta||n===Aa||n===wa||n===Ra||n===Ca||n===La||n===Pa||n===Ia||n===Da||n===Na)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Sa)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ma)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ea)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ba)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ta)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wa)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ra)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ca)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===La)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pa)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ia)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Da)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Na)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ua||n===ka||n===Fa)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ua)return a===Et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ka)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Oa||n===Ba||n===as||n===za)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Oa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ba)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===as)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===za)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ki?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Um=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,km=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Fm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Wl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wi({vertexShader:Um,fragmentShader:km,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vi(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Om extends Ri{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,f=null,u=null,d=null,m=null,_=null;const M=typeof XRWebGLBinding<"u",h=new Fm,p={},S=t.getContextAttributes();let w=null,T=null;const C=[],R=[],g=new ot;let E=null,F=null;const I=new Mn;I.viewport=new It;const k=new Mn;k.viewport=new It;const G=[I,k],j=new Yd;let D=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let Ae=C[te];return Ae===void 0&&(Ae=new Us,C[te]=Ae),Ae.getTargetRaySpace()},this.getControllerGrip=function(te){let Ae=C[te];return Ae===void 0&&(Ae=new Us,C[te]=Ae),Ae.getGripSpace()},this.getHand=function(te){let Ae=C[te];return Ae===void 0&&(Ae=new Us,C[te]=Ae),Ae.getHandSpace()};function ne(te){const Ae=R.indexOf(te.inputSource);if(Ae===-1)return;const Pe=C[Ae];Pe!==void 0&&(Pe.update(te.inputSource,te.frame,l||a),Pe.dispatchEvent({type:te.type,data:te.inputSource}))}function B(){r.removeEventListener("select",ne),r.removeEventListener("selectstart",ne),r.removeEventListener("selectend",ne),r.removeEventListener("squeeze",ne),r.removeEventListener("squeezestart",ne),r.removeEventListener("squeezeend",ne),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",ue);for(let te=0;te<C.length;te++){const Ae=R[te];Ae!==null&&(R[te]=null,C[te].disconnect(Ae))}D=null,K=null,h.reset();for(const te in p)delete p[te];if(e.setRenderTarget(w),m=null,d=null,u=null,r=null,T=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(g.width,g.height,!1),F!==null){const te=F.camera;te.fov=F.fov,te.zoom=F.zoom,te.updateProjectionMatrix(),F=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,n.isPresenting===!0&&Qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,n.isPresenting===!0&&Qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",ne),r.addEventListener("selectstart",ne),r.addEventListener("selectend",ne),r.addEventListener("squeeze",ne),r.addEventListener("squeezestart",ne),r.addEventListener("squeezeend",ne),r.addEventListener("end",B),r.addEventListener("inputsourceschange",ue),S.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(g),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,Fe=null,Re=null;S.depth&&(Re=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=S.stencil?pi:gi,Fe=S.stencil?Ki:zn);const Ze={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ze),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Bn(d.textureWidth,d.textureHeight,{format:On,type:_n,depthTexture:new qi(d.textureWidth,d.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const Pe={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,Pe),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new Bn(m.framebufferWidth,m.framebufferHeight,{format:On,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),$e.setContext(r),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ue(te){for(let Ae=0;Ae<te.removed.length;Ae++){const Pe=te.removed[Ae],Fe=R.indexOf(Pe);Fe>=0&&(R[Fe]=null,C[Fe].disconnect(Pe))}for(let Ae=0;Ae<te.added.length;Ae++){const Pe=te.added[Ae];let Fe=R.indexOf(Pe);if(Fe===-1){for(let Ze=0;Ze<C.length;Ze++)if(Ze>=R.length){R.push(Pe),Fe=Ze;break}else if(R[Ze]===null){R[Ze]=Pe,Fe=Ze;break}if(Fe===-1)break}const Re=C[Fe];Re&&Re.connect(Pe)}}function Q(te,Ae){Ae===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(Ae.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let Ae=te.near,Pe=te.far;h.texture!==null&&(h.depthNear>0&&(Ae=h.depthNear),h.depthFar>0&&(Pe=h.depthFar)),j.near=k.near=I.near=Ae,j.far=k.far=I.far=Pe,(D!==j.near||K!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),D=j.near,K=j.far),j.layers.mask=te.layers.mask|6,I.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;const Fe=te.parent,Re=j.cameras;Q(j,Fe);for(let Ze=0;Ze<Re.length;Ze++)Q(Re[Ze],Fe);j.projectionMatrix.copy(I.projectionMatrix),j.projectionMatrixInverse.copy(I.projectionMatrixInverse),F===null&&te.isPerspectiveCamera&&(F={camera:te,fov:te.fov,zoom:te.zoom}),le(te,j,Fe)};function le(te,Ae,Pe){Pe===null?te.matrix.copy(Ae.matrixWorld):(te.matrix.copy(Pe.matrixWorld),te.matrix.invert(),te.matrix.multiply(Ae.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(Ae.projectionMatrix),te.projectionMatrixInverse.copy(Ae.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Ga*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(te){c=te,d!==null&&(d.fixedFoveation=te),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=te)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(j)},this.getCameraTexture=function(te){return p[te]};let he=null;function ke(te,Ae){if(f=Ae.getViewerPose(l||a),_=Ae,f!==null){const Pe=f.views;m!==null&&(e.setRenderTargetFramebuffer(T,m.framebuffer),e.setRenderTarget(T));let Fe=!1;Pe.length!==j.cameras.length&&(j.cameras.length=0,Fe=!0);for(let qe=0;qe<Pe.length;qe++){const gt=Pe[qe];let mt=null;if(m!==null)mt=m.getViewport(gt);else{const Ht=u.getViewSubImage(d,gt);mt=Ht.viewport,qe===0&&(e.setRenderTargetTextures(T,Ht.colorTexture,Ht.depthStencilTexture),e.setRenderTarget(T))}let rt=G[qe];rt===void 0&&(rt=new Mn,rt.layers.enable(qe),rt.viewport=new It,G[qe]=rt),rt.matrix.fromArray(gt.transform.matrix),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.projectionMatrix.fromArray(gt.projectionMatrix),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert(),rt.viewport.set(mt.x,mt.y,mt.width,mt.height),qe===0&&(j.matrix.copy(rt.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),Fe===!0&&j.cameras.push(rt)}const Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const qe=u.getDepthInformation(Pe[0]);qe&&qe.isValid&&qe.texture&&h.init(qe,r.renderState)}if(Re&&Re.includes("camera-access")&&M){e.state.unbindTexture(),u=n.getBinding();for(let qe=0;qe<Pe.length;qe++){const gt=Pe[qe].camera;if(gt){let mt=p[gt];mt||(mt=new Wl,p[gt]=mt);const rt=u.getCameraImage(gt);mt.sourceTexture=rt}}}}for(let Pe=0;Pe<C.length;Pe++){const Fe=R[Pe],Re=C[Pe];Fe!==null&&Re!==void 0&&Re.update(Fe,Ae,l||a)}he&&he(te,Ae),Ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ae}),_=null}const $e=new ql;$e.setAnimationLoop(ke),this.setAnimationLoop=function(te){he=te},this.dispose=function(){}}}const Bm=new Lt,rc=new tt;rc.set(-1,0,0,0,1,0,0,0,1);function zm(i,e){function t(h,p){h.matrixAutoUpdate===!0&&h.updateMatrix(),p.value.copy(h.matrix)}function n(h,p){p.color.getRGB(h.fogColor.value,Xl(i)),p.isFog?(h.fogNear.value=p.near,h.fogFar.value=p.far):p.isFogExp2&&(h.fogDensity.value=p.density)}function r(h,p,S,w,T){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(h,p):p.isMeshLambertMaterial?(s(h,p),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(h,p),u(h,p)):p.isMeshPhongMaterial?(s(h,p),f(h,p),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(h,p),d(h,p),p.isMeshPhysicalMaterial&&m(h,p,T)):p.isMeshMatcapMaterial?(s(h,p),_(h,p)):p.isMeshDepthMaterial?s(h,p):p.isMeshDistanceMaterial?(s(h,p),M(h,p)):p.isMeshNormalMaterial?s(h,p):p.isLineBasicMaterial?(a(h,p),p.isLineDashedMaterial&&o(h,p)):p.isPointsMaterial?c(h,p,S,w):p.isSpriteMaterial?l(h,p):p.isShadowMaterial?(h.color.value.copy(p.color),h.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(h,p){h.opacity.value=p.opacity,p.color&&h.diffuse.value.copy(p.color),p.emissive&&h.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.bumpMap&&(h.bumpMap.value=p.bumpMap,t(p.bumpMap,h.bumpMapTransform),h.bumpScale.value=p.bumpScale,p.side===un&&(h.bumpScale.value*=-1)),p.normalMap&&(h.normalMap.value=p.normalMap,t(p.normalMap,h.normalMapTransform),h.normalScale.value.copy(p.normalScale),p.side===un&&h.normalScale.value.negate()),p.displacementMap&&(h.displacementMap.value=p.displacementMap,t(p.displacementMap,h.displacementMapTransform),h.displacementScale.value=p.displacementScale,h.displacementBias.value=p.displacementBias),p.emissiveMap&&(h.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,h.emissiveMapTransform)),p.specularMap&&(h.specularMap.value=p.specularMap,t(p.specularMap,h.specularMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest);const S=e.get(p),w=S.envMap,T=S.envMapRotation;w&&(h.envMap.value=w,h.envMapRotation.value.setFromMatrix4(Bm.makeRotationFromEuler(T)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&h.envMapRotation.value.premultiply(rc),h.reflectivity.value=p.reflectivity,h.ior.value=p.ior,h.refractionRatio.value=p.refractionRatio),p.lightMap&&(h.lightMap.value=p.lightMap,h.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,h.lightMapTransform)),p.aoMap&&(h.aoMap.value=p.aoMap,h.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,h.aoMapTransform))}function a(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform))}function o(h,p){h.dashSize.value=p.dashSize,h.totalSize.value=p.dashSize+p.gapSize,h.scale.value=p.scale}function c(h,p,S,w){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.size.value=p.size*S,h.scale.value=w*.5,p.map&&(h.map.value=p.map,t(p.map,h.uvTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function l(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.rotation.value=p.rotation,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function f(h,p){h.specular.value.copy(p.specular),h.shininess.value=Math.max(p.shininess,1e-4)}function u(h,p){p.gradientMap&&(h.gradientMap.value=p.gradientMap)}function d(h,p){h.metalness.value=p.metalness,p.metalnessMap&&(h.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,h.metalnessMapTransform)),h.roughness.value=p.roughness,p.roughnessMap&&(h.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,h.roughnessMapTransform)),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)}function m(h,p,S){h.ior.value=p.ior,p.diffuseRoughness>0&&(h.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(h.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,h.diffuseRoughnessMapTransform))),p.sheen>0&&(h.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),h.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(h.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,h.sheenColorMapTransform)),p.sheenRoughnessMap&&(h.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,h.sheenRoughnessMapTransform))),p.clearcoat>0&&(h.clearcoat.value=p.clearcoat,h.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(h.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,h.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(h.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===un&&h.clearcoatNormalScale.value.negate())),p.dispersion>0&&(h.dispersion.value=p.dispersion),p.retroreflectivity>0&&(h.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(h.iridescence.value=p.iridescence,h.iridescenceIOR.value=p.iridescenceIOR,h.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,h.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(h.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,h.iridescenceMapTransform)),p.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),p.transmission>0&&(h.transmission.value=p.transmission,h.transmissionSamplerMap.value=S.texture,h.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(h.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,h.transmissionMapTransform)),h.thickness.value=p.thickness,p.thicknessMap&&(h.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=p.attenuationDistance,h.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(h.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(h.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=p.specularIntensity,h.specularColor.value.copy(p.specularColor),p.specularColorMap&&(h.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,h.specularColorMapTransform)),p.specularIntensityMap&&(h.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,h.specularIntensityMapTransform))}function _(h,p){p.matcap&&(h.matcap.value=p.matcap)}function M(h,p){const S=e.get(p).light;h.referencePosition.value.setFromMatrixPosition(S.matrixWorld),h.nearDistance.value=S.shadow.camera.near,h.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Hm(i,e,t,n){let r={},s={};function a(S,w){const T=w.program;n.uniformBlockBinding(S,T,r[S.id])}function o(S,w){let T=r[S.id];T===void 0&&(_(S),T=c(S),r[S.id]=T,S.addEventListener("dispose",h));const C=w.program;n.updateUBOMapping(S,C);const R=e.render.frame;s[S.id]!==R&&(l(S),s[S.id]=R)}function c(S){const w=i.createBuffer(),T=S.__size,C=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,T,C),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function l(S){const w=r[S.id],T=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let R=0,g=T.length;R<g;R++){const E=T[R];if(Array.isArray(E))for(let F=0,I=E.length;F<I;F++)f(E[F],R,F,C);else f(E,R,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,w,T,C){if(d(S,w,T,C)===!0){const R=S.__offset,g=S.value;if(Array.isArray(g)){let E=0;for(let F=0;F<g.length;F++){const I=g[F],k=M(I,!0);u(I,S.__data,E),E+=k.storage/Float32Array.BYTES_PER_ELEMENT}}else u(g,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,R,S.__data)}}function u(S,w,T){typeof S=="number"||typeof S=="boolean"?w[T]=S:S.isMatrix3?(w[T]=S.elements[0],w[T+1]=S.elements[1],w[T+2]=S.elements[2],w[T+3]=0,w[T+4]=S.elements[3],w[T+5]=S.elements[4],w[T+6]=S.elements[5],w[T+7]=0,w[T+8]=S.elements[6],w[T+9]=S.elements[7],w[T+10]=S.elements[8],w[T+11]=0):ArrayBuffer.isView(S)?w.set(S.subarray(0,w.length-T),T):S.toArray(w,T)}function d(S,w,T,C){const R=S.value,g=w+"_"+T;if(Array.isArray(R)){C[g]===void 0&&(C[g]=[]);const E=C[g];let F=!1;for(let I=0;I<R.length;I++)m(R[I],E,I)===!0&&(F=!0);return F}return m(R,C,g)}function m(S,w,T){if(w[T]===void 0)return typeof S=="number"||typeof S=="boolean"?w[T]=S:ArrayBuffer.isView(S)?w[T]=S.slice():w[T]=S.clone(),!0;{const C=w[T];if(typeof S=="number"||typeof S=="boolean"){if(C!==S)return w[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(C.equals(S)===!1)return C.copy(S),!0}}return!1}function _(S){const w=S.uniforms;let T=0;const C=16;for(let g=0,E=w.length;g<E;g++){const F=Array.isArray(w[g])?w[g]:[w[g]];for(let I=0,k=F.length;I<k;I++){const G=F[I],j=Array.isArray(G.value)?G.value:[G.value],D=Array.isArray(w[g])||Array.isArray(G.value);let K=T;for(let B=0,ue=j.length;B<ue;B++){const Q=j[B],le=M(Q,D),he=T%C,ke=he%le.boundary,$e=he+ke;T+=ke,$e!==0&&C-$e<le.storage&&(T+=C-$e),B===0&&(K=T),T+=le.storage}const ne=G.type==="int"?Int32Array:G.type==="uint"?Uint32Array:Float32Array;G.__data=new ne((T-K)/Float32Array.BYTES_PER_ELEMENT),G.__offset=K}}const R=T%C;return R>0&&(T+=C-R),S.__size=T,S.__cache={},this}function M(S,w){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=16,T.storage=48):S.isMatrix4?(T.boundary=16,T.storage=64):S.isTexture?Qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Qe("WebGLRenderer: Unsupported uniform value type.",S),w===!0&&(T.boundary=16,T.storage=Math.ceil(T.storage/16)*16),T}function h(S){const w=S.target;w.removeEventListener("dispose",h),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function p(){for(const S in r)i.deleteBuffer(r[S]);r={},s={}}return{bind:a,update:o,dispose:p}}const Gm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Un=null;function Vm(){return Un===null&&(Un=new Id(Gm,16,16,Ai,Hn),Un.name="DFG_LUT",Un.minFilter=dn,Un.magFilter=dn,Un.wrapS=ei,Un.wrapT=ei,Un.generateMipmaps=!1,Un.needsUpdate=!0),Un}class Wm{constructor(e={}){const{canvas:t=id(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:m=_n}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const M=m,h=new Set([Qa,ja,Ja]),p=new Set([_n,zn,fr,Ki,Ya,Za]),S=new Uint32Array(4),w=new Int32Array(4),T={textures:[],min:[],max:[],resolution:[]};let C=null,R=null;const g=[],E=[];let F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let k=!1,G=null,j=null,D=null,K=null;this._outputColorSpace=Sn;let ne=0,B=0,ue=null,Q=-1,le=null;const he=new It,ke=new It;let $e=null;const te=new ct(0);let Ae=0,Pe=t.width,Fe=t.height,Re=1,Ze=null,Mt=null;const qe=new It(0,0,Pe,Fe),gt=new It(0,0,Pe,Fe);let mt=!1;const rt=new mr,Ht=new no;let At=!1,Gt=!1;const bt=new Lt,en=new q,wt=new It,on={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ft=!1;function Kt(){return ue===null?Re:1}let O=n;function tn(y,N){return t.getContext(y,N)}let Tt,lt,xe,nt,We,Ye,A,x,X,pe,ae,de,Te,ie,se,Ee,P,re,ee,be,ye,Me,Be;try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ka}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",Ve,!1),t.addEventListener("webglcontextcreationerror",we,!1),O===null){const N="webgl2";if(O=tn(N,y),O===null)throw tn(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(y){throw t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",Ve,!1),t.removeEventListener("webglcontextcreationerror",we,!1),vt("WebGLRenderer: "+y.message),y}function Je(){Tt=new Kf(O),Tt.init(),ye=new Nm(O,Tt),lt=new kf(O,Tt,e,ye),xe=new Im(O,Tt),lt.reversedDepthBuffer&&d&&xe.buffers.depth.setReversed(!0),j=O.createFramebuffer(),D=O.createFramebuffer(),K=O.createFramebuffer(),nt=new Zf(O),We=new vm,Ye=new Dm(O,Tt,xe,We,lt,ye,nt),A=new $f(I),x=new Jd(O),Me=new Nf(O,x),X=new qf(O,x,nt,Me),pe=new jf(O,X,x,Me,nt),re=new Jf(O,lt,Ye),se=new Ff(We),ae=new _m(I,A,Tt,lt,Me,se),de=new zm(I,We),Te=new ym,ie=new Am(Tt),P=new Df(I,A,xe,pe,_,c),Ee=new Pm(I,pe,lt),Be=new Hm(O,nt,lt,xe),ee=new Uf(O,Tt,nt),be=new Yf(O,Tt,nt),nt.programs=ae.programs,I.capabilities=lt,I.extensions=Tt,I.properties=We,I.renderLists=Te,I.shadowMap=Ee,I.state=xe,I.info=nt}M!==_n&&(F=new ep(M,t.width,t.height,o,r,s));const ge=new Om(I,O);this.xr=ge,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const y=Tt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Tt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Re},this.setPixelRatio=function(y){y!==void 0&&(Re=y,this.setSize(Pe,Fe,!1))},this.getSize=function(y){return y.set(Pe,Fe)},this.setSize=function(y,N,Y=!0){if(ge.isPresenting){Qe("WebGLRenderer: Can't change size while VR device is presenting.");return}Pe=y,Fe=N,t.width=Math.floor(y*Re),t.height=Math.floor(N*Re),Y===!0&&(t.style.width=y+"px",t.style.height=N+"px"),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(Pe*Re,Fe*Re).floor()},this.setDrawingBufferSize=function(y,N,Y){Pe=y,Fe=N,Re=Y,t.width=Math.floor(y*Y),t.height=Math.floor(N*Y),this.setViewport(0,0,y,N)},this.setEffects=function(y){if(M===_n){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let N=0;N<y.length;N++)if(y[N].isOutputPass===!0){Qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(he)},this.getViewport=function(y){return y.copy(qe)},this.setViewport=function(y,N,Y,H){y.isVector4?qe.set(y.x,y.y,y.z,y.w):qe.set(y,N,Y,H),xe.viewport(he.copy(qe).multiplyScalar(Kt()).round())},this.getScissor=function(y){return y.copy(gt)},this.setScissor=function(y,N,Y,H){y.isVector4?gt.set(y.x,y.y,y.z,y.w):gt.set(y,N,Y,H),xe.scissor(ke.copy(gt).multiplyScalar(Kt()).round())},this.getScissorTest=function(){return mt},this.setScissorTest=function(y){xe.setScissorTest(mt=y)},this.setOpaqueSort=function(y){Ze=y},this.setTransparentSort=function(y){Mt=y},this.getClearColor=function(y){return y.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(y=!0,N=!0,Y=!0){let H=0;if(y){let $=!1;if(ue!==null){const _e=ue.texture.format;$=h.has(_e)}if($){const _e=ue.texture.type,Ce=p.has(_e),Se=P.getClearColor(),Le=P.getClearAlpha(),Oe=Se.r,je=Se.g,st=Se.b;Ce?(S[0]=Oe,S[1]=je,S[2]=st,S[3]=Le,O.clearBufferuiv(O.COLOR,0,S)):(w[0]=Oe,w[1]=je,w[2]=st,w[3]=Le,O.clearBufferiv(O.COLOR,0,w))}else H|=O.COLOR_BUFFER_BIT}N&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),G=y},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",Ve,!1),t.removeEventListener("webglcontextcreationerror",we,!1),P.dispose(),Te.dispose(),ie.dispose(),Ye.dispose(),We.dispose(),A.dispose(),pe.dispose(),X.dispose(),Me.dispose(),Be.dispose(),ae.dispose(),ge.dispose(),ge.removeEventListener("sessionstart",ln),ge.removeEventListener("sessionend",yr),Vn.stop()};function ze(y){y.preventDefault(),vo("WebGLRenderer: Context Lost."),k=!0}function Ve(){vo("WebGLRenderer: Context Restored."),k=!1;const y=nt.autoReset,N=Ee.enabled,Y=Ee.autoUpdate,H=Ee.needsUpdate,$=Ee.type;Je(),nt.autoReset=y,Ee.enabled=N,Ee.autoUpdate=Y,Ee.needsUpdate=H,Ee.type=$}function we(y){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function pt(y){const N=y.target;N.removeEventListener("dispose",pt),Ot(N)}function Ot(y){Dn(y),We.remove(y)}function Dn(y){const N=We.get(y).programs;N!==void 0&&(N.forEach(function(Y){ae.releaseProgram(Y)}),y.isShaderMaterial&&ae.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,Y,H,$,_e){N===null&&(N=on);const Ce=$.isMesh&&$.matrixWorld.determinantAffine()<0,Se=xs(y,N,Y,H,$);xe.setMaterial(H,Ce);let Le=Y.index,Oe=1;if(H.wireframe===!0){if(Le=X.getWireframeAttribute(Y),Le===void 0)return;Oe=2}const je=Y.drawRange,st=Y.attributes.position;let De=je.start*Oe,et=(je.start+je.count)*Oe;_e!==null&&(De=Math.max(De,_e.start*Oe),et=Math.min(et,(_e.start+_e.count)*Oe)),Le!==null?(De=Math.max(De,0),et=Math.min(et,Le.count)):st!=null&&(De=Math.max(De,0),et=Math.min(et,st.count));const xt=et-De;if(xt<0||xt===1/0)return;Me.setup($,H,Se,Y,Le);let yt,_t=ee;if(Le!==null&&(yt=x.get(Le),_t=be,_t.setIndex(yt)),$.isMesh)H.wireframe===!0?(xe.setLineWidth(H.wireframeLinewidth*Kt()),_t.setMode(O.LINES)):_t.setMode(O.TRIANGLES);else if($.isLine){let Pt=H.linewidth;Pt===void 0&&(Pt=1),xe.setLineWidth(Pt*Kt()),$.isLineSegments?_t.setMode(O.LINES):$.isLineLoop?_t.setMode(O.LINE_LOOP):_t.setMode(O.LINE_STRIP)}else $.isPoints?_t.setMode(O.POINTS):$.isSprite&&_t.setMode(O.TRIANGLES);if($.isBatchedMesh)if(Tt.get("WEBGL_multi_draw"))_t.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Pt=$._multiDrawStarts,Ne=$._multiDrawCounts,St=$._multiDrawCount,it=Le?x.get(Le).bytesPerElement:1,cn=We.get(H).currentProgram.getUniforms();for(let Dt=0;Dt<St;Dt++)cn.setValue(O,"_gl_DrawID",Dt),_t.render(Pt[Dt]/it,Ne[Dt])}else if($.isInstancedMesh)_t.renderInstances(De,xt,$.count);else if(Y.isInstancedBufferGeometry){const Pt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ne=Math.min(Y.instanceCount,Pt);_t.renderInstances(De,xt,Ne)}else _t.render(De,xt)};function Qi(y,N,Y,H){G!==null&&y.isNodeMaterial&&G.setObject(H,y),At===!0&&se.setState(y,Y,!1),y.transparent===!0&&y.side===Qn&&y.forceSinglePass===!1?(y.side=un,y.needsUpdate=!0,bn(y,N,H),y.side=Ti,y.needsUpdate=!0,bn(y,N,H),y.side=Qn):bn(y,N,H)}this.compile=function(y,N,Y=null){Y===null&&(Y=y),G!==null&&G.renderStart(y,N,Y),R=ie.get(Y),R.init(N),E.push(R),Y.traverseVisible(function($){$.isLight&&$.layers.test(N.layers)&&(R.pushLight($),$.castShadow&&R.pushShadow($))}),y!==Y&&y.traverseVisible(function($){$.isLight&&$.layers.test(N.layers)&&(R.pushLight($),$.castShadow&&R.pushShadow($))}),R.setupLights(),G!==null&&G.updateLights(R.state.lightsArray),Gt=this.localClippingEnabled,At=se.init(this.clippingPlanes,Gt),At===!0&&se.setGlobalState(this.clippingPlanes,N),G!==null&&Ee.render(R.state.shadowsArray,Y,N);const H=new Set;return y.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const _e=$.material;if(_e)if(Array.isArray(_e))for(let Ce=0;Ce<_e.length;Ce++){const Se=_e[Ce];Qi(Se,Y,N,$),H.add(Se)}else Qi(_e,Y,N,$),H.add(_e)}),R=E.pop(),G!==null&&G.renderEnd(),H},this.compileAsync=function(y,N,Y=null){const H=this.compile(y,N,Y);return new Promise($=>{function _e(){if(H.forEach(function(Ce){const Le=We.get(Ce).currentProgram;(Le===void 0||Le.isReady())&&H.delete(Ce)}),H.size===0){$(y);return}setTimeout(_e,10)}Tt.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let qt=null;function _s(y){qt&&qt(y)}function ln(){Vn.stop()}function yr(){Vn.start()}const Vn=new ql;Vn.setAnimationLoop(_s),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(y){qt=y,ge.setAnimationLoop(y),y===null?Vn.stop():Vn.start()},ge.addEventListener("sessionstart",ln),ge.addEventListener("sessionend",yr),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;G!==null&&G.renderStart(y,N);const Y=ge.enabled===!0&&ge.isPresenting===!0,H=F!==null&&(ue===null||Y)&&F.begin(I,ue);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ge.enabled===!0&&ge.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(ge.cameraAutoUpdate===!0&&ge.updateCamera(N),N=ge.getCamera()),y.isScene===!0&&y.onBeforeRender(I,y,N,ue),R=ie.get(y,E.length),R.init(N),R.state.textureUnits=Ye.getTextureUnits(),E.push(R),bt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),N.isArrayCamera?Ht.setFromArrayCamera(N):rt.setFromProjectionMatrix(bt,In,N.reversedDepth),Gt=this.localClippingEnabled,At=se.init(this.clippingPlanes,Gt),C=Te.get(y,g.length),C.init(),g.push(C),this.info.render.frame++,ge.enabled===!0&&ge.isPresenting===!0){const Ce=I.xr.getDepthSensingMesh();Ce!==null&&Wn(Ce,N,-1/0,I.sortObjects)}Wn(y,N,0,I.sortObjects),C.finish(),G!==null&&G.updateLights(R.state.lightsArray),I.sortObjects===!0&&C.sort(Ze,Mt),Ft=ge.enabled===!1||ge.isPresenting===!1||ge.hasDepthSensing()===!1,Ft&&P.addToRenderList(C,y),this.info.autoReset===!0&&this.info.reset(),At===!0&&se.beginShadows();const $=R.state.shadowsArray;if(Ee.render($,y,N),At===!0&&se.endShadows(),(H&&F.hasRenderPass())===!1){const Ce=C.opaque,Se=C.transmissive;if(R.setupLights(),N.isArrayCamera){const Le=N.cameras;if(Se.length>0)for(let Oe=0,je=Le.length;Oe<je;Oe++){const st=Le[Oe];xi(Ce,Se,y,st)}Ft&&P.render(y);for(let Oe=0,je=Le.length;Oe<je;Oe++){const st=Le[Oe];er(C,y,st,st.viewport)}}else Se.length>0&&xi(Ce,Se,y,N),Ft&&P.render(y),er(C,y,N)}ue!==null&&B===0&&(Ye.updateMultisampleRenderTarget(ue),Ye.updateRenderTargetMipmap(ue)),H&&F.end(I),y.isScene===!0&&y.onAfterRender(I,y,N),Me.resetDefaultState(),Q=-1,le=null,E.pop(),E.length>0?(R=E[E.length-1],Ye.setTextureUnits(R.state.textureUnits),At===!0&&se.setGlobalState(I.clippingPlanes,R.state.camera)):R=null,g.pop(),g.length>0?C=g[g.length-1]:C=null,G!==null&&G.renderEnd()};function Wn(y,N,Y,H){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)Y=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)R.pushLight(y),y.castShadow&&R.pushShadow(y);else if(y.isSprite){const Ce=N.isArrayCamera?Ht:rt;if(!y.frustumCulled||y.intersectsFrustum(Ce)){H&&wt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(bt);const Se=pe.update(y),Le=y.material;Le.visible&&C.push(y,Se,Le,Y,wt.z,null,N)}}else if(y.isMesh||y.isLine||y.isPoints){const Ce=N.isArrayCamera?Ht:rt;if(!y.frustumCulled||y.intersectsFrustum(Ce)){const Se=pe.update(y),Le=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),wt.copy(y.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),wt.copy(Se.boundingSphere.center)),wt.applyMatrix4(y.matrixWorld).applyMatrix4(bt)),Array.isArray(Le)){const Oe=Se.groups;for(let je=0,st=Oe.length;je<st;je++){const De=Oe[je],et=Le[De.materialIndex];et&&et.visible&&C.push(y,Se,et,Y,wt.z,De,N)}}else Le.visible&&C.push(y,Se,Le,Y,wt.z,null,N)}}}const _e=y.children;for(let Ce=0,Se=_e.length;Ce<Se;Ce++)Wn(_e[Ce],N,Y,H)}function er(y,N,Y,H){const{opaque:$,transmissive:_e,transparent:Ce}=y;R.setupLightsView(Y),At===!0&&se.setGlobalState(I.clippingPlanes,Y),H&&xe.viewport(he.copy(H)),$.length>0&&Xn($,N,Y),_e.length>0&&Xn(_e,N,Y),Ce.length>0&&Xn(Ce,N,Y),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function xi(y,N,Y,H){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[H.id]===void 0){const De=Tt.has("EXT_color_buffer_half_float")||Tt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[H.id]=new Bn(1,1,{generateMipmaps:!0,type:De?Hn:_n,minFilter:fi,samples:Math.max(4,lt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ht.workingColorSpace})}const _e=R.state.transmissionRenderTarget[H.id],Ce=H.viewport||he;_e.setSize(Ce.z*I.transmissionResolutionScale,Ce.w*I.transmissionResolutionScale);const Se=I.getRenderTarget(),Le=I.getActiveCubeFace(),Oe=I.getActiveMipmapLevel();I.setRenderTarget(_e),I.getClearColor(te),Ae=I.getClearAlpha(),Ae<1&&I.setClearColor(16777215,.5),I.clear(),Ft&&P.render(Y);const je=I.toneMapping;I.toneMapping=ti;const st=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),R.setupLightsView(H),At===!0&&se.setGlobalState(I.clippingPlanes,H),Xn(y,Y,H),Ye.updateMultisampleRenderTarget(_e),Ye.updateRenderTargetMipmap(_e),Tt.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let et=0,xt=N.length;et<xt;et++){const yt=N[et],{object:_t,geometry:Pt,material:Ne,group:St}=yt;if(Ne.side===Qn&&_t.layers.test(H.layers)){const it=Ne.side;Ne.side=un,Ne.needsUpdate=!0,Sr(_t,Y,H,Pt,Ne,St),Ne.side=it,Ne.needsUpdate=!0,De=!0}}De===!0&&(Ye.updateMultisampleRenderTarget(_e),Ye.updateRenderTargetMipmap(_e))}I.setRenderTarget(Se,Le,Oe),I.setClearColor(te,Ae),st!==void 0&&(H.viewport=st),I.toneMapping=je}function Xn(y,N,Y){const H=N.isScene===!0?N.overrideMaterial:null;for(let $=0,_e=y.length;$<_e;$++){const Ce=y[$],{object:Se,geometry:Le,group:Oe}=Ce;let je=Ce.material;je.allowOverride===!0&&H!==null&&(je=H),Se.layers.test(Y.layers)&&Sr(Se,N,Y,Le,je,Oe)}}function Sr(y,N,Y,H,$,_e){G!==null&&$.isNodeMaterial&&G.setObject(y,$),y.onBeforeRender(I,N,Y,H,$,_e),y.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),$.onBeforeRender(I,N,Y,H,y,_e),$.transparent===!0&&$.side===Qn&&$.forceSinglePass===!1?($.side=un,$.needsUpdate=!0,I.renderBufferDirect(Y,N,H,$,y,_e),$.side=Ti,$.needsUpdate=!0,I.renderBufferDirect(Y,N,H,$,y,_e),$.side=Qn):I.renderBufferDirect(Y,N,H,$,y,_e),y.onAfterRender(I,N,Y,H,$,_e)}function Mr(y){let N=0;for(const Y of y)Y.texture!==null&&N++;return N}function bn(y,N,Y){N.isScene!==!0&&(N=on);const H=We.get(y),$=R.state.lights,_e=R.state.shadowsArray,Ce=$.state.version,Se=ae.getParameters(y,$.state,_e,N,Y,R.state.lightProbeGridArray),Le=ae.getProgramCacheKey(Se);let Oe=H.programs;H.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?N.environment:null,H.fog=N.fog;const je=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;H.envMap=A.get(y.envMap||H.environment,je),H.envMapRotation=H.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Oe===void 0&&(y.addEventListener("dispose",pt),Oe=new Map,H.programs=Oe,H.programVariants=new Map);let st=Oe.get(Le);if(st!==void 0){if(H.currentProgram===st&&H.lightsStateVersion===Ce)return br(y,Se),st}else Se.uniforms=ae.getUniforms(y),G!==null&&y.isNodeMaterial&&G.build(y,Y,Se),y.onBeforeCompile(Se,I),st=ae.acquireProgram(Se,Le),Oe.set(Le,st),H.uniforms=Se.uniforms;const De=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(De.clippingPlanes=se.uniform),br(y,Se),H.needsLights=Ss(y),H.lightsStateVersion=Ce,H.needsLights&&(De.ambientLightColor.value=$.state.ambient,De.lightProbe.value=$.state.probe,De.sunLights.value=$.state.sun,De.sunLightShadows.value=$.state.sunShadow,De.directionalLights.value=$.state.directional,De.directionalLightShadows.value=$.state.directionalShadow,De.spotLights.value=$.state.spot,De.spotLightShadows.value=$.state.spotShadow,De.rectAreaLights.value=$.state.rectArea,De.ltc_1.value=$.state.rectAreaLTC1,De.ltc_2.value=$.state.rectAreaLTC2,De.pointLights.value=$.state.point,De.pointLightShadows.value=$.state.pointShadow,De.hemisphereLights.value=$.state.hemi,De.sunShadowMatrix.value=$.state.sunShadowMatrix,De.sunShadowCascade.value=$.state.sunShadowCascade,De.directionalShadowMatrix.value=$.state.directionalShadowMatrix,De.spotLightMatrix.value=$.state.spotLightMatrix,De.spotLightMap.value=$.state.spotLightMap,De.pointShadowMatrix.value=$.state.pointShadowMatrix),H.numLightProbeGrids=Mr(R.state.lightProbeGridArray),H.currentProgram=st,H.uniformsList=null,st}function vs(y,N,Y,H,$){const _e=We.get(y),Ce=_e.currentProgram.id+","+H+","+$;let Se=_e.programVariants.get(Ce);return Se===void 0?(Se=bn(y,N,Y),_e.programVariants.set(Ce,Se)):(_e.currentProgram=Se,_e.uniformsList=null,_e.outputColorSpace=H,_e.toneMapping=$),Se}function Er(y){if(y.uniformsList===null){const N=y.currentProgram.getUniforms();y.uniformsList=rs.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function br(y,N){const Y=We.get(y);Y.outputColorSpace=N.outputColorSpace,Y.batching=N.batching,Y.batchingColor=N.batchingColor,Y.instancing=N.instancing,Y.instancingColor=N.instancingColor,Y.instancingMorph=N.instancingMorph,Y.skinning=N.skinning,Y.morphTargets=N.morphTargets,Y.morphNormals=N.morphNormals,Y.morphColors=N.morphColors,Y.morphTargetsCount=N.morphTargetsCount,Y.numClippingPlanes=N.numClippingPlanes,Y.numIntersection=N.numClipIntersection,Y.vertexAlphas=N.vertexAlphas,Y.vertexTangents=N.vertexTangents,Y.toneMapping=N.toneMapping}function xs(y,N,Y,H,$){N.isScene!==!0&&(N=on),Ye.resetTextureUnits();const _e=N.fog,Ce=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?N.environment:null,Se=ue===null?I.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:ht.workingColorSpace,Le=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Oe=A.get(H.envMap||Ce,Le),je=H.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,st=!!Y.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),De=!!Y.morphAttributes.position,et=!!Y.morphAttributes.normal,xt=!!Y.morphAttributes.color;let yt=ti;H.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(yt=I.toneMapping);const _t=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Pt=_t!==void 0?_t.length:0,Ne=We.get(H),St=R.state.lights;if(At===!0&&(Gt===!0||y!==le)){const ft=y===le&&H.id===Q;se.setState(H,y,ft)}let it=!1,cn=!1;H.version===Ne.__version?Ne.needsLights&&Ne.lightsStateVersion!==St.state.version||$.isBatchedMesh&&Ne.batching===!1||!$.isBatchedMesh&&Ne.batching===!0||$.isBatchedMesh&&Ne.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Ne.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Ne.instancing===!1||!$.isInstancedMesh&&Ne.instancing===!0||$.isSkinnedMesh&&Ne.skinning===!1||!$.isSkinnedMesh&&Ne.skinning===!0||$.isInstancedMesh&&Ne.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ne.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ne.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ne.instancingMorph===!1&&$.morphTexture!==null||Ne.envMap!==Oe||H.fog===!0&&Ne.fog!==_e||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==se.numPlanes||Ne.numIntersection!==se.numIntersection)||Ne.vertexAlphas!==je||Ne.vertexTangents!==st||Ne.morphTargets!==De||Ne.morphNormals!==et||Ne.morphColors!==xt||Ne.morphTargetsCount!==Pt||Ne.numLightProbeGrids!==Mr(R.state.lightProbeGridArray)?it=!0:(Ne.outputColorSpace!==Se||Ne.toneMapping!==yt)&&(cn=!0):(it=!0,Ne.__version=H.version);let Dt=Ne.currentProgram;(it===!0||cn===!0)&&(Dt=cn===!0?vs(H,N,$,Se,yt):bn(H,N,$),G&&H.isNodeMaterial&&G.onUpdateProgram(H,Dt,Ne));let $n=!1,hn=!1,Tn=!1;const ut=Dt.getUniforms(),kt=Ne.uniforms;if(xe.useProgram(Dt.program)&&($n=!0,hn=!0,Tn=!0),H.id!==Q&&(Q=H.id,hn=!0),$n||le!==y){xe.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ut.setValue(O,"projectionMatrix",y.projectionMatrix),ut.setValue(O,"viewMatrix",y.matrixWorldInverse);const Nt=ut.map.cameraPosition;Nt!==void 0&&Nt.setValue(O,en.setFromMatrixPosition(y.matrixWorld)),lt.logarithmicDepthBuffer&&ut.setValue(O,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ut.setValue(O,"isOrthographic",y.isOrthographicCamera===!0),le!==y&&(le=y,hn=!0,Tn=!0)}if(Ne.needsLights&&(St.state.sunShadowMap.length>0&&ut.setValue(O,"sunShadowMap",St.state.sunShadowMap,Ye),St.state.directionalShadowMap.length>0&&ut.setValue(O,"directionalShadowMap",St.state.directionalShadowMap,Ye),St.state.spotShadowMap.length>0&&ut.setValue(O,"spotShadowMap",St.state.spotShadowMap,Ye),St.state.pointShadowMap.length>0&&ut.setValue(O,"pointShadowMap",St.state.pointShadowMap,Ye)),$.isSkinnedMesh){ut.setOptional(O,$,"bindMatrix"),ut.setOptional(O,$,"bindMatrixInverse");const ft=$.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ut.setValue(O,"boneTexture",ft.boneTexture,Ye))}$.isBatchedMesh&&(ut.setOptional(O,$,"batchingTexture"),ut.setValue(O,"batchingTexture",$._matricesTexture,Ye),ut.setOptional(O,$,"batchingIdTexture"),ut.setValue(O,"batchingIdTexture",$._indirectTexture,Ye),ut.setOptional(O,$,"batchingColorTexture"),$._colorsTexture!==null&&ut.setValue(O,"batchingColorTexture",$._colorsTexture,Ye));const fn=Y.morphAttributes;if((fn.position!==void 0||fn.normal!==void 0||fn.color!==void 0)&&re.update($,Y,Dt),(hn||Ne.receiveShadow!==$.receiveShadow)&&(Ne.receiveShadow=$.receiveShadow,ut.setValue(O,"receiveShadow",$.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&N.environment!==null&&(kt.envMapIntensity.value=N.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=Vm()),hn){if(ut.setValue(O,"toneMappingExposure",I.toneMappingExposure),Ne.needsLights&&ys(kt,Tn),_e&&H.fog===!0&&de.refreshFogUniforms(kt,_e),de.refreshMaterialUniforms(kt,H,Re,Fe,R.state.transmissionRenderTarget[y.id]),Ne.needsLights&&Ne.numLightProbeGrids>0){const ft=T;let Nt=0;for(const vn of R.state.lightProbeGridArray)vn.texture!==null&&(ft.textures[Nt]=vn.texture,ft.min[Nt]=vn.boundingBox.min,ft.max[Nt]=vn.boundingBox.max,ft.resolution[Nt]=vn.resolution,Nt++);for(const vn in ft)ft[vn].length=Nt;kt.probesSH.value=ft.textures,kt.probesMin.value=ft.min,kt.probesMax.value=ft.max,kt.probesResolution.value=ft.resolution}rs.upload(O,Er(Ne),kt,Ye)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(rs.upload(O,Er(Ne),kt,Ye),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ut.setValue(O,"center",$.center),ut.setValue(O,"modelViewMatrix",$.modelViewMatrix),ut.setValue(O,"normalMatrix",$.normalMatrix),ut.setValue(O,"modelMatrix",$.matrixWorld),H.uniformsGroups!==void 0){const ft=H.uniformsGroups;for(let Nt=0,vn=ft.length;Nt<vn;Nt++){const tr=ft[Nt];Be.update(tr,Dt),Be.bind(tr,Dt)}}return Dt}function ys(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.sunLights.needsUpdate=N,y.sunLightShadows.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function Ss(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return ne},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return ue},this.setRenderTargetTextures=function(y,N,Y){const H=We.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),We.get(y.texture).__webglTexture=N,We.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:Y,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,N){const Y=We.get(y);Y.__webglFramebuffer=N,Y.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(y,N=0,Y=0){ue=y,ne=N,B=Y;let H=null,$=!1,_e=!1;if(y){const Se=We.get(y);if(Se.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(O.FRAMEBUFFER,Se.__webglFramebuffer),he.copy(y.viewport),ke.copy(y.scissor),$e=y.scissorTest,xe.viewport(he),xe.scissor(ke),xe.setScissorTest($e),Q=-1;return}else if(Se.__webglFramebuffer===void 0)Ye.setupRenderTarget(y);else if(Se.__hasExternalTextures)Ye.rebindTextures(y,We.get(y.texture).__webglTexture,We.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const je=y.depthTexture;if(Se.__boundDepthTexture!==je){if(je!==null&&We.has(je)&&(y.width!==je.image.width||y.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ye.setupDepthRenderbuffer(y)}}const Le=y.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(_e=!0);const Oe=We.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Oe[N])?H=Oe[N][Y]:H=Oe[N],$=!0):y.samples>0&&Ye.useMultisampledRTT(y)===!1?H=We.get(y).__webglMultisampledFramebuffer:Array.isArray(Oe)?H=Oe[Y]:H=Oe,he.copy(y.viewport),ke.copy(y.scissor),$e=y.scissorTest}else he.copy(qe).multiplyScalar(Re).floor(),ke.copy(gt).multiplyScalar(Re).floor(),$e=mt;if(Y!==0&&(H=j),xe.bindFramebuffer(O.FRAMEBUFFER,H)&&xe.drawBuffers(y,H),xe.viewport(he),xe.scissor(ke),xe.setScissorTest($e),$){const Se=We.get(y.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+N,Se.__webglTexture,Y)}else if(_e){const Se=N;for(let Le=0;Le<y.textures.length;Le++){const Oe=We.get(y.textures[Le]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Le,Oe.__webglTexture,Y,Se)}}else if(y!==null&&Y!==0){const Se=We.get(y.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Se.__webglTexture,Y)}Q=-1};function ii(y){const N=We.get(y);return(N.__readFormat!==y.format||N.__readType!==y.type)&&(N.__readFormat=y.format,N.__readType=y.type,N.__formatReadable=lt.textureFormatReadable(y.format),N.__typeReadable=lt.textureTypeReadable(y.type)),N}this.readRenderTargetPixels=function(y,N,Y,H,$,_e,Ce,Se=0){if(!(y&&y.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=We.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce],Array.isArray(Le)&&(Le=Le[0])),Le){xe.bindFramebuffer(O.FRAMEBUFFER,Le);try{const Oe=y.textures[Se],je=Oe.format,st=Oe.type;y.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Se);const De=ii(Oe);if(De.__formatReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-H&&Y>=0&&Y<=y.height-$&&O.readPixels(N,Y,H,$,ye.convert(je),ye.convert(st),_e)}finally{const Oe=ue!==null?We.get(ue).__webglFramebuffer:null;xe.bindFramebuffer(O.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(y,N,Y,H,$,_e,Ce,Se=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=We.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce],Array.isArray(Le)&&(Le=Le[0])),Le)if(N>=0&&N<=y.width-H&&Y>=0&&Y<=y.height-$){xe.bindFramebuffer(O.FRAMEBUFFER,Le);const Oe=y.textures[Se],je=Oe.format,st=Oe.type;y.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Se);const De=ii(Oe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,et),O.bufferData(O.PIXEL_PACK_BUFFER,_e.byteLength,O.STREAM_READ),O.readPixels(N,Y,H,$,ye.convert(je),ye.convert(st),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const xt=ue!==null?We.get(ue).__webglFramebuffer:null;xe.bindFramebuffer(O.FRAMEBUFFER,xt);const yt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await rd(O,yt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,et),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,_e),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(et),O.deleteSync(yt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,N=null,Y=0){const H=Math.pow(2,-Y),$=Math.floor(y.image.width*H),_e=Math.floor(y.image.height*H),Ce=N!==null?N.x:0,Se=N!==null?N.y:0;Ye.setTexture2D(y,0),O.copyTexSubImage2D(O.TEXTURE_2D,Y,0,0,Ce,Se,$,_e),xe.unbindTexture()},this.copyTextureToTexture=function(y,N,Y=null,H=null,$=0,_e=0){let Ce,Se,Le,Oe,je,st,De,et,xt;const yt=y.isCompressedTexture?y.mipmaps[_e]:y.image;if(Y!==null)Ce=Y.max.x-Y.min.x,Se=Y.max.y-Y.min.y,Le=Y.isBox3?Y.max.z-Y.min.z:1,Oe=Y.min.x,je=Y.min.y,st=Y.isBox3?Y.min.z:0;else{const ut=Math.pow(2,-$);Ce=Math.floor(yt.width*ut),Se=Math.floor(yt.height*ut),y.isDataArrayTexture?Le=yt.depth:y.isData3DTexture?Le=Math.floor(yt.depth*ut):Le=1,Oe=0,je=0,st=0}H!==null?(De=H.x,et=H.y,xt=H.z):(De=0,et=0,xt=0);const _t=ye.convert(N.format),Pt=ye.convert(N.type);let Ne;N.isData3DTexture?(Ye.setTexture3D(N,0),Ne=O.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Ye.setTexture2DArray(N,0),Ne=O.TEXTURE_2D_ARRAY):(Ye.setTexture2D(N,0),Ne=O.TEXTURE_2D),xe.activeTexture(O.TEXTURE0),xe.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,N.flipY),xe.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),xe.pixelStorei(O.UNPACK_ALIGNMENT,N.unpackAlignment);const St=xe.getParameter(O.UNPACK_ROW_LENGTH),it=xe.getParameter(O.UNPACK_IMAGE_HEIGHT),cn=xe.getParameter(O.UNPACK_SKIP_PIXELS),Dt=xe.getParameter(O.UNPACK_SKIP_ROWS),$n=xe.getParameter(O.UNPACK_SKIP_IMAGES);xe.pixelStorei(O.UNPACK_ROW_LENGTH,yt.width),xe.pixelStorei(O.UNPACK_IMAGE_HEIGHT,yt.height),xe.pixelStorei(O.UNPACK_SKIP_PIXELS,Oe),xe.pixelStorei(O.UNPACK_SKIP_ROWS,je),xe.pixelStorei(O.UNPACK_SKIP_IMAGES,st);const hn=y.isDataArrayTexture||y.isData3DTexture,Tn=N.isDataArrayTexture||N.isData3DTexture;if(y.isDepthTexture){const ut=We.get(y),kt=We.get(N),fn=We.get(ut.__renderTarget),ft=We.get(kt.__renderTarget);xe.bindFramebuffer(O.READ_FRAMEBUFFER,fn.__webglFramebuffer),xe.bindFramebuffer(O.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let Nt=0;Nt<Le;Nt++)hn&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,We.get(y).__webglTexture,$,st+Nt),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,We.get(N).__webglTexture,_e,xt+Nt)),O.blitFramebuffer(Oe,je,Oe+Ce,je+Se,De,et,De+Ce,et+Se,O.DEPTH_BUFFER_BIT,O.NEAREST);xe.bindFramebuffer(O.READ_FRAMEBUFFER,null),xe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if($!==0||y.isRenderTargetTexture||We.has(y)){const ut=We.get(y),kt=We.get(N);xe.bindFramebuffer(O.READ_FRAMEBUFFER,D),xe.bindFramebuffer(O.DRAW_FRAMEBUFFER,K);for(let fn=0;fn<Le;fn++)hn?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ut.__webglTexture,$,st+fn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ut.__webglTexture,$),Tn?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,kt.__webglTexture,_e,xt+fn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,kt.__webglTexture,_e),$!==0?O.blitFramebuffer(Oe,je,Oe+Ce,je+Se,De,et,De+Ce,et+Se,O.COLOR_BUFFER_BIT,O.NEAREST):Tn?O.copyTexSubImage3D(Ne,_e,De,et,xt+fn,Oe,je,Ce,Se):O.copyTexSubImage2D(Ne,_e,De,et,Oe,je,Ce,Se);xe.bindFramebuffer(O.READ_FRAMEBUFFER,null),xe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Tn?y.isDataTexture||y.isData3DTexture?O.texSubImage3D(Ne,_e,De,et,xt,Ce,Se,Le,_t,Pt,yt.data):N.isCompressedArrayTexture?O.compressedTexSubImage3D(Ne,_e,De,et,xt,Ce,Se,Le,_t,yt.data):O.texSubImage3D(Ne,_e,De,et,xt,Ce,Se,Le,_t,Pt,yt):y.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,_e,De,et,Ce,Se,_t,Pt,yt.data):y.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,_e,De,et,yt.width,yt.height,_t,yt.data):O.texSubImage2D(O.TEXTURE_2D,_e,De,et,Ce,Se,_t,Pt,yt);xe.pixelStorei(O.UNPACK_ROW_LENGTH,St),xe.pixelStorei(O.UNPACK_IMAGE_HEIGHT,it),xe.pixelStorei(O.UNPACK_SKIP_PIXELS,cn),xe.pixelStorei(O.UNPACK_SKIP_ROWS,Dt),xe.pixelStorei(O.UNPACK_SKIP_IMAGES,$n),_e===0&&N.generateMipmaps===!0&&N.mipmapsAutoUpdate===!0&&O.generateMipmap(Ne),xe.unbindTexture()},this.initRenderTarget=function(y){We.get(y).__webglFramebuffer===void 0&&Ye.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Ye.setTextureCube(y,0):y.isData3DTexture?Ye.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Ye.setTexture2DArray(y,0):Ye.setTexture2D(y,0),xe.unbindTexture()},this.resetState=function(){ne=0,B=0,ue=null,xe.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}}class Xm{constructor(e){He(this,"container");He(this,"scene",null);He(this,"camera",null);He(this,"renderer",null);He(this,"animFrameId",null);He(this,"particles",null);He(this,"hologramMesh",null);He(this,"isVisible",!1);He(this,"playbackSpeed",1);He(this,"isPaused",!1);this.container=e}init(){const e=this.container.clientWidth||400,t=this.container.clientHeight||300;this.scene=new Ed,this.camera=new Mn(45,e/t,.1,100),this.camera.position.set(0,0,5),this.renderer=new Wm({alpha:!0,antialias:!0}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.innerHTML="",this.container.appendChild(this.renderer.domElement);const n=new qd(16772829,.6);this.scene.add(n);const r=new $d(13938487,2.5,10);r.position.set(2,3,4),this.scene.add(r),this.createDreamParticles(),this.createHologramGeometry(),this.startLoop()}createDreamParticles(){if(!this.scene)return;const e=350,t=new Gn,n=new Float32Array(e*3);for(let s=0;s<e*3;s+=3)n[s]=(Math.random()-.5)*8,n[s+1]=(Math.random()-.5)*6,n[s+2]=(Math.random()-.5)*6;t.setAttribute("position",new mi(n,3));const r=new Hl({color:13938487,size:.055,transparent:!0,opacity:.75,blending:ta});this.particles=new Nd(t,r),this.scene.add(this.particles)}createHologramGeometry(){if(!this.scene)return;const e=new ro(1.2,2),t=new Hd({color:3718648,emissive:993866,roughness:.1,metalness:.15,transmission:.85,ior:1.52,wireframe:!0});this.hologramMesh=new vi(e,t),this.scene.add(this.hologramMesh)}setVisible(e){this.isVisible=e,this.container.style.display=e?"block":"none"}triggerPromptVisual(e){if(this.isVisible&&(console.log("[KrystDreamStage] Új álomkép lehívása prompt alapján:",e),this.hologramMesh)){const t=this.hologramMesh.material;e.toLowerCase().includes("vihar")||e.toLowerCase().includes("tiltott")?t.color.setHex(15680580):e.toLowerCase().includes("arany")||e.toLowerCase().includes("kincs")?t.color.setHex(16096779):t.color.setHex(3718648)}}startLoop(){const e=()=>{if(this.animFrameId=requestAnimationFrame(e),!(!this.isVisible||!this.renderer||!this.scene||!this.camera)){if(!this.isPaused){const t=this.playbackSpeed;this.particles&&(this.particles.rotation.y+=.0015*t),this.hologramMesh&&(this.hologramMesh.rotation.x+=.005*t,this.hologramMesh.rotation.y+=.008*t)}this.renderer.render(this.scene,this.camera)}};e()}setPlaybackSpeed(e){this.playbackSpeed=Math.max(.4,Math.min(e,2.5))}setPaused(e){this.isPaused=e}isAnimationPaused(){return this.isPaused}resize(){if(!this.renderer||!this.camera||!this.container)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}destroy(){this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.renderer&&this.renderer.dispose()}}const Rt=[{id:"kryst_paideia_01",title:"A Tiltott Sziget és Paideia Kincse",author:"Krystohans Kapitány",type:"crystal_book",hasMultiVoiceMaster:!0,chapters:[{id:"chap_1",index:1,title:"I. Fejezet · A Ködös Kikötő Titka",paragraphs:["Az éjszaka leple alatt a hajó csendben siklott a fekete víztükrön. A kikötő fényei már rég a horizont mögé vesztek, amikor a fedélzetmester halkan odalépett a kormánykerékhez.","— Kapitány, az északi zátonyok felől különös fények villannak — suttogta, miközben a távcsövet a sűrűsödő köd felé irányította.","A kormányos nem válaszolt azonnal. Csak a fa recsegése és a hullámok lágy csobogása törte meg a némaságot. Tudta jól: a sziget, amely felé tartanak, nem szerepel a hivatalos térképeken."],tokens:[{text:"Az éjszaka leple alatt a hajó csendben siklott a fekete víztükrön.",startSec:0,endSec:4.5,speakerId:"narrator",visualPrompt:"Éjszakai csendes tenger, sötét hullámok"},{text:"A kikötő fényei már rég a horizont mögé vesztek, amikor a fedélzetmester halkan odalépett a kormánykerékhez.",startSec:4.5,endSec:10.2,speakerId:"narrator"},{text:"— Kapitány, az északi zátonyok felől különös fények villannak — suttogta, miközben a távcsövet a sűrűsödő köd felé irányította.",startSec:10.2,endSec:17.5,speakerId:"rozmar",threeDAnchor:"assets/models/kalozhajo01.glb"},{text:"A kormányos nem válaszolt azonnal. Csak a fa recsegése és a hullámok lágy csobogása törte meg a némaságot.",startSec:17.5,endSec:23,speakerId:"narrator"},{text:"Tudta jól: a sziget, amely felé tartanak, nem szerepel a hivatalos térképeken.",startSec:23,endSec:29,speakerId:"kapitany",visualPrompt:"Misztikus aranyszínű fény a ködben"}]},{id:"chap_2",index:2,title:"II. Fejezet · A Paideia Szobor Rejtélye",paragraphs:["A partot érve a legénység fáklyákkal vágott utat a trópusi liánok között. Az ősi kőromok között emelkedett ki a Paideia szent szobra, melynek tenyerében egy kék LETkristály pulzált.","— Ne érintsd meg puszta kézzel! — kiáltott fel a boszorkány, de már késő volt: a kristály rezonanciája végigfutott a sziget szikláin."],tokens:[{text:"A partot érve a legénység fáklyákkal vágott utat a trópusi liánok között.",startSec:0,endSec:5.2,speakerId:"narrator"},{text:"Az ősi kőromok között emelkedett ki a Paideia szent szobra, melynek tenyerében egy kék LETkristály pulzált.",startSec:5.2,endSec:12,speakerId:"narrator",visualPrompt:"Paideia arany szobra kék kristállyal"},{text:"— Ne érintsd meg puszta kézzel! — kiáltott fel a boszorkány, de már késő volt.",startSec:12,endSec:17.5,speakerId:"raven"},{text:"A kristály rezonanciája végigfutott a sziget szikláin.",startSec:17.5,endSec:22,speakerId:"narrator"}]}]},{id:"kryst_scroll_wind_02",title:"Viharos Passzátszelek és Áramlatok",author:"Ismeretlen Navigátor",type:"scroll",hasMultiVoiceMaster:!1,chapters:[{id:"scroll_1",index:1,title:"Tekercs 1. · Az Északi Örvény",paragraphs:["A 14. szélességi foknál a tenger sosem nyugszik. A szél hirtelen fordul és a mélybe rántja a felkészületlen bárkákat. Ezen a szakaszon a vitorlákat be kell vonni, a kormányrudat kötéllel rögzíteni szükséges."],tokens:[]}]},{id:"kryst_book_atlantis_03",title:"Az Elveszett Kincsesbárka Krónikája",author:"Rodrigo De Silva",type:"crystal_book",hasMultiVoiceMaster:!0,chapters:[{id:"chap_atlantis_1",index:1,title:"I. Fejezet · A Smaragd Lagúna Titka",paragraphs:["A spanyol flotta eltévedt hajója három héttel a vihar után futott zátonyra a lakatlan atoll sekély vízében. A raktérben háromszáz láda vert arany és tizenkét faragott jade szobor rejtőzött.","A túlélők naplójukban lejegyezték: a sziget belsejéből éjszakánként különös harangszó hallatszik, noha templomnak nyoma sincs."],tokens:[{text:"A spanyol flotta eltévedt hajója három héttel a vihar után futott zátonyra a lakatlan atoll sekély vízében.",startSec:0,endSec:6,speakerId:"narrator",visualPrompt:"Smaragd lagúna homokpadján pihenő aranyozott spanyol gálya",threeDAnchor:"assets/models/kalozhajo01.glb"},{text:"A raktérben háromszáz láda vert arany és tizenkét faragott jade szobor rejtőzött.",startSec:6,endSec:12,speakerId:"kapitany",visualPrompt:"Aranyérmék és jáde szobrok csillogása a hajó gyomrában"},{text:"A túlélők naplójukban lejegyezték: a sziget belsejéből éjszakánként különös harangszó hallatszik, noha templomnak nyoma sincs.",startSec:12,endSec:19.5,speakerId:"narrator",visualPrompt:"Ködbe burkolózó trópusi hegycsúcs misztikus haranggal"}]}]},{id:"kryst_scroll_sirens_04",title:"A Karibi Szirének Éneke Tekercs",author:"Morgana Tengerésznő",type:"scroll",hasMultiVoiceMaster:!1,chapters:[{id:"scroll_sirens_1",index:1,title:"Tekercs 1. · Az Elbűvölő Hullámok",paragraphs:["Óvakodj a holdtöltekor felcsendülő dallamtól a déli korallszirtek között! A víz kristályos csillogása elvakítja az elmédet, s a mélység királynője a hajóroncsok palotájába csalogat."],tokens:[{text:"Óvakodj a holdtöltekor felcsendülő dallamtól a déli korallszirtek között!",startSec:0,endSec:5.5,speakerId:"narrator"},{text:"A víz kristályos csillogása elvakítja az elmédet, s a mélység királynője a hajóroncsok palotájába csalogat.",startSec:5.5,endSec:12.5,speakerId:"narrator"}]}]}],Ct=[{id:"map_kalozsziget_01",title:"A Tiltott Szigetcsoport és Korallzátonyok",imageUrl:"https://images.unsplash.com/photo-1524654458049-e36be0721fa2?auto=format&fit=crop&w=1200&q=80",description:"Titkos hajózási térkép mélységvonalakkal és expedíciós jelölőkkel.",anchors:[{id:"anchor_koponya_szikla",xPercent:32.5,yPercent:28,name:"Koponya-szikla Zátony",coordinates:`ÉSz 14°18'20", NYh 75°12'45"`,dangerLevel:"Végzetes Zátony",windDirection:"Északkeleti orkán (8 csomó)",treasureNote:"Három spanyol aranygálya roncsa pihen 20 öl mélyen a zátony lábánál. Az 1684-es flotta zászlóshajója, a San Jeronimo fedélzetén 400 láda ezüsttallér és a királyi pecsétgyűrű merült a habokba. Csak a dagály csúcsán, teljes szélcsendben közelíthető meg kisméretű csónakkal, mert a rejtett éles sziklatüskék másodpercek alatt felhasítják a nehéz tölgyfa törzset."},{id:"anchor_paideia_obol",xPercent:68.2,yPercent:54,name:"Paideia Titkos Öböl",coordinates:`ÉSz 14°25'11", NYh 75°22'05"`,dangerLevel:"Biztonságos Kikötő",windDirection:"Csendes partmenti szellő (2 csomó)",treasureNote:"Természetes védett öböl mély kristálytiszta vízzel. A parttól pontosan száz lépésre, a trópusi fák árnyékában emelkedik az ősi Paideia márványszentély. Az oltárba vésett rúnák szerint a szentély alatt kiterjedt katakombarendszer húzódik, mely a sziget belső vulkáni kamráiba és a kristálybányákhoz vezet."},{id:"anchor_orveny",xPercent:50,yPercent:78.5,name:"Kék Rezonancia Örvény",coordinates:`ÉSz 14°09'55", NYh 75°18'30"`,dangerLevel:"Rejtélyes Örvény",windDirection:"Kiszámíthatatlan forgószél",treasureNote:"Mágneses és téridő-anomália övezte mélytengeri kráter. Az iránytűk vad pörgésbe kezdenek a tengerfenéken rejtőző gigantikus LETkristály-ágy rezonanciája miatt. A feljegyzések szerint az örvény középpontjában egy elsüllyedt ősi torony csúcsa látható a mélyben, ahol a fényhajlító prizmák még ma is működnek."}]},{id:"map_vulkansziget_02",title:"A Tűzfok és a Fekete Zátonyok Archipelagója",imageUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",description:"Vulkáni hamufelhők alatt rejtőző sziklaszirtek és kalóz rejtekhelyek térképe.",anchors:[{id:"anchor_tuzfok",xPercent:44,yPercent:35,name:"Obszidián Krátertó",coordinates:`ÉSz 15°02'18", NYh 74°48'10"`,dangerLevel:"Magas Hőmérséklet",windDirection:"Kénes északi szél",treasureNote:"Az alvó vulkán kráterében forró ásványi források fakadnak. A kráterfalak mentén ősi obszidián pengék és rituális ékszerek maradtak fenn a pre-arkán korból."},{id:"anchor_fekete_fok",xPercent:72,yPercent:62,name:"Fekete Zátonyok Barlangja",coordinates:`ÉSz 14°55'40", NYh 74°35'22"`,dangerLevel:"Kalózlesállás",windDirection:"Erős délnyugati hullámverés",treasureNote:"Csak apálykor szárazon maradó tengeri barlangrendszer. A csempészek évtizedek óta itt rejtik el a rumos hordókat és a fegyverkészleteket."}]}],$a={"😤":{emoji:"😤",label:"Dühös / Csettintő",styleGuide:"Dühösen, pattogósan, elfojtott indulattal, a mondat végén éles csettintéssel.",contextNote:"Feszült parancsnoki vagy számonkérő kiszólás, szúrós tekintettel."},"🤫":{emoji:"🤫",label:"Suttogó / Titokzatos",styleGuide:"Halkan, bizalmas suttogással, közel a mikrofonhoz, lassított tempóban.",contextNote:"Titkos összeesküvés, éjszakai őrség vagy tiltott kincses hír átadása."},"😂":{emoji:"😂",label:"Hahotázó / Gúnyos",styleGuide:"Rekedtes kalóz-nevetéssel átszőve, kajánul és fölényesen.",contextNote:"Kocsmai ugratás, győzelmi mámor vagy az ellenség kinevetése."},"⚡":{emoji:"⚡",label:"Sürgető / Vészhelyzeti",styleGuide:"Gyors tempóban, emelt hangerővel, feszült lélegzetvétellel, riadót fújva.",contextNote:"Vihar közeledte, zátonyra futás veszélye vagy csata kezdete a fedélzeten."},"🌊":{emoji:"🌊",label:"Mesélő / Hullámzó",styleGuide:"Lágyan ívelő, dallamos, epikus mesélő hanglejtéssel, tengeri hullámzást idézve.",contextNote:"Távoli szigetek, ősi legendák és tengeri horizontok leírásakor."},"🤔":{emoji:"🤔",label:"Töprengő / Gyanakvó",styleGuide:"Meg-megállva, a szavakat ízlelgetve, kérdő-kutató hangsúllyal.",contextNote:"Rejtvényfejtés, gyanús nyomok vizsgálata vagy térkép-elemzés közben."},"😨":{emoji:"😨",label:"Rémült / Remegő",styleGuide:"Elcsukló, remegő hangon, kapkodó levegővétellel, babonás félelemmel.",contextNote:"Kísértethajó, mélytengeri szörny vagy halálos csapda felbukkanásakor."},"👑":{emoji:"👑",label:"Ünnepélyes / Kánoni",styleGuide:"Mély, zengő, méltóságteljes hanglejtéssel, kimért szünetekkel.",contextNote:"Királyi dekrétum, ősi eskü, vagy Abrigó kánoni törvényeinek kihirdetése."},"😢":{emoji:"😢",label:"Elérzékenyült /Bánatos",styleGuide:"Lassú, fátyolos, érzelmes hangon, sóhajjal a mondat végén.",contextNote:"Elveszett bajtársak, elsüllyedt hajó vagy búcsúzás pillanata."},"🔥":{emoji:"🔥",label:"Lelkesítő / Harci",styleGuide:"Tüzesen, harsányan, a legénységet tüzelő szónoki lendülettel!",contextNote:"Csatába hívó beszéd, roham indítása vagy eskü a zsákmányra."},"🎶":{emoji:"🎶",label:"Dúdoló /Bordal",styleGuide:"Ritmikus, éneklő-kántáló tengerész (shanty) hanglejtéssel.",contextNote:"Kötélhúzás, vasmacska felvonása vagy kocsmai mulatozás közben."},"⚓":{emoji:"⚓",label:"Parancsnoki /Határozott",styleGuide:"Kemény, ellentmondást nem tűrő, tiszta kapitányi vezényszóként.",contextNote:"Kormányosnak vagy vitorlamesternek adott közvetlen utasítás."}},ui={galley:{emoji:"⛵",label:"Kalózgálya / Vitorlás"},steamer:{emoji:"🚢",label:"Páncélos Gőzhajó"},walking:{emoji:"🥾",label:"Gyalogszer / Karaván"},horse_wagon:{emoji:"🐎",label:"Lovas Szekér / Hintó"},bicycle:{emoji:"🚲",label:"Mechanikus Velocipéd"},steam_train:{emoji:"🚂",label:"Gőzmozdony"},airship:{emoji:"🎈",label:"Kristály-Léghajó"},antigrav_speeder:{emoji:"🛸",label:"Antigrav Sikló"}};function $m(i){for(const e of Object.keys($a))if(i.includes(e))return $a[e];return null}function jr(i){if(!i)return"";let e=i;for(const[t,n]of Object.entries($a))if(e.includes(t)){const r=n.label.replace(/"/g,"&quot;"),s=n.styleGuide.replace(/"/g,"&quot;"),a=n.contextNote.replace(/"/g,"&quot;"),o=`<span class="kryst-reader-intonation-badge" tabindex="0">${t}<span class="kryst-reader-intonation-bubble"><strong>${t} ${r}</strong><span class="bubble-row"><em>🎬 Rendezői instrukció:</em> ${s}</span><span class="bubble-row"><em>💡 Tipp:</em> ${a}</span></span></span>`;e=e.split(t).join(o)}return e}function sc(i,e){const t=new Uint8Array(i);if(t.length<8||t[0]!==137||t[1]!==80||t[2]!==78||t[3]!==71)return null;const n=new DataView(i),r=new TextDecoder("utf-8"),s=new TextDecoder("iso-8859-1");let a=8;for(;a+8<=t.length;){const o=n.getUint32(a,!1),c=String.fromCharCode(t[a+4],t[a+5],t[a+6],t[a+7]),l=a+8,f=l+o;if(f>t.length)break;if(c==="iTXt"){const u=t.subarray(l,f),d=u.indexOf(0);if(d>0&&s.decode(u.subarray(0,d))==="KrystMapDataset"){let _=d+3;for(;_<u.length&&u[_]!==0;)_++;for(_++;_<u.length&&u[_]!==0;)_++;_++;const M=r.decode(u.subarray(_));try{const h=JSON.parse(M);return e&&(h.imageUrl=e),h}catch{}}}else if(c==="tEXt"){const u=t.subarray(l,f),d=u.indexOf(0);if(d>0&&s.decode(u.subarray(0,d))==="KrystMapDatasetBase64"){const _=s.decode(u.subarray(d+1));try{const M=atob(_),h=new Uint8Array(M.length);for(let S=0;S<M.length;S++)h[S]=M.charCodeAt(S);const p=JSON.parse(r.decode(h));return e&&(p.imageUrl=e),p}catch{}}}if(c==="IEND")break;a=f+4}return null}function us(i){var o,c,l,f;const e=[],t=i,n=[`🌊 ${i.title} — ${i.description||"Kartográfiai és narratív térképkönyv."}`];i.anchors.forEach((u,d)=>{var _;const m=((_=u.narrativeHook)==null?void 0:_.entryNarrativeText)||u.treasureNote||"";n.push(`⚓ ${d+1}. Állomás: ${u.name} (${u.coordinates||`${Math.round(u.xPercent)}%, ${Math.round(u.yPercent)}%`}) — Veszély: ${u.dangerLevel}. ${m}`)}),e.push({id:`${i.id}_chap_anchors`,index:0,title:"1. Gráf Horgonyok & Helyszínek",paragraphs:n,tokens:n.map((u,d)=>({text:u,startSec:d*5,endSec:(d+1)*5,speakerId:"narrator"}))});const r=[],s=((c=(o=t.narrativeLayer)==null?void 0:o.travelogue)==null?void 0:c.stages)||[];Array.isArray(s)&&s.length>0&&s.forEach((u,d)=>{const m=i.anchors.find(p=>p.id===u.fromAnchorId),_=i.anchors.find(p=>p.id===u.toAnchorId),M=ui[u.vehicle||"galley"]||ui.galley,h=Array.isArray(u.directorSignposts)?u.directorSignposts.map(p=>p.summaryPrompt||p.title).join(" "):"";r.push(`${M.emoji} ${d+1}. Útszakasz: ${(m==null?void 0:m.name)||u.fromAnchorId} → ${(_==null?void 0:_.name)||u.toAnchorId} (${M.label}). ${h}`)});const a=((f=(l=i.narrativeLayer)==null?void 0:l.decisionGraph)==null?void 0:f.edges)||[];return a.length>0&&a.forEach(u=>{const d=i.anchors.find(_=>_.id===u.fromAnchorId),m=i.anchors.find(_=>_.id===u.toAnchorId);r.push(`⚡ Elágazás (${(d==null?void 0:d.name)||u.fromAnchorId} → ${(m==null?void 0:m.name)||u.toAnchorId}): «${u.choiceLabel}» — ${u.narrativeIntro||""}`)}),r.length>0&&e.push({id:`${i.id}_chap_routes`,index:1,title:"2. Expedíciós Útvonalak & Döntési Gráf",paragraphs:r,tokens:r.map((u,d)=>({text:u,startSec:d*5,endSec:(d+1)*5,speakerId:"zozo"}))}),{id:`mapbook_${i.id}`,title:`🗺️ ${i.title} (Mapbook)`,author:t.ownerPirateName||"Kryst Kartográfia",type:"crystal_book",chapters:e,hasMultiVoiceMaster:!0,defaultNarratorVoice:"ferenc"}}function ao(i){var n,r,s,a,o,c;const e=(i==null?void 0:i.bookScript)||(i==null?void 0:i.script)||((n=i==null?void 0:i.packageData)==null?void 0:n.bookScript)||((r=i==null?void 0:i.packageData)==null?void 0:r.script)||i;if(!e||!Array.isArray(e.chapters))return null;const t=e.chapters.map((l,f)=>{const u=Array.isArray(l.cues)&&l.cues.length>0?l.cues:Array.isArray(l.items)?l.items:[];let d=[],m=[];if(u.length>0){let _=0;u.forEach(M=>{var T,C,R;const h=String(M.text||"").trim();if(!h)return;const p=String(M.intonationEmoji||"").trim(),S=p&&!h.includes(p)?`${p} ${h}`:h,w=typeof M.audioDurationMs=="number"&&M.audioDurationMs>0?M.audioDurationMs/1e3:Math.max(2.5,Math.min(18,S.split(/\s+/).length*.45));d.push(S),m.push({text:S,startSec:Number(_.toFixed(2)),endSec:Number((_+w).toFixed(2)),speakerId:M.speakerId||M.character||"narrator",visualPrompt:M.contextNote||M.styleGuide||((T=M.scenePrompt3D)==null?void 0:T.environmentPreset)||void 0,threeDAnchor:((C=M.scene3d)==null?void 0:C.modelRef)||((R=M.scenePrompt3D)==null?void 0:R.actorModel)||void 0}),_+=w})}else if(Array.isArray(l.paragraphs)&&l.paragraphs.length>0)d=l.paragraphs.map(_=>String(_||"").trim()).filter(_=>_.length>0),m=d.map((_,M)=>({text:_,startSec:M*4,endSec:(M+1)*4,speakerId:"narrator"}));else if(typeof l.xhtmlContent=="string"&&l.xhtmlContent.trim()){const M=new DOMParser().parseFromString(l.xhtmlContent,"text/html");M.querySelectorAll(".kryst-watermark").forEach(h=>h.remove()),d=Array.from(M.body.querySelectorAll("h1,h2,h3,p,blockquote,li")).map(h=>(h.textContent||"").replace(/\s+/g," ").trim()).filter(h=>h.length>0),m=d.map((h,p)=>({text:h,startSec:p*4,endSec:(p+1)*4,speakerId:"narrator"}))}return d.length===0&&(d=[l.title||`${f+1}. Fejezet`]),{id:l.id||l.chapterId||`chap_${f+1}`,index:f,title:l.title||`${f+1}. Fejezet`,paragraphs:d,tokens:m}});return{id:((s=e.metadata)==null?void 0:s.bookId)||`studio_book_${Date.now()}`,title:((a=e.metadata)==null?void 0:a.title)||"Stúdió Kristálykönyv",author:((o=e.metadata)==null?void 0:o.author)||"LET.kryst Stúdió",type:"crystal_book",coverUrl:((c=e.metadata)==null?void 0:c.coverImageUrl)||(i==null?void 0:i.coverImageUrl)||void 0,chapters:t,hasMultiVoiceMaster:!0,defaultNarratorVoice:"ferenc"}}async function Km(i){const e=new Uint8Array(i.byteLength);e.set(i);const t=globalThis.DecompressionStream;if(typeof t>"u")throw new Error("A böngésző nem támogatja a beépített DEFLATE tömörítés-kicsomagolást (DecompressionStream).");const n=new t("deflate-raw"),r=n.writable.getWriter(),s=new Response(n.readable).arrayBuffer();await r.write(e),await r.close();const a=await s;return new Uint8Array(a)}async function qm(i){const e=new Uint8Array(i),t=new DataView(i),n=new TextDecoder("utf-8");let r=-1;const s=Math.max(0,e.length-65557);for(let f=e.length-22;f>=s;f--)if(t.getUint32(f,!0)===101010256){r=f;break}if(r===-1)throw new Error("Érvénytelen .kryst / ZIP archívum (hiányzó End-of-Central-Directory).");const a=t.getUint16(r+10,!0),o=t.getUint32(r+16,!0),c=new Map;let l=o;for(let f=0;f<a&&l+46<=e.length&&t.getUint32(l,!0)===33639248;f++){const u=t.getUint16(l+10,!0),d=t.getUint32(l+20,!0),m=t.getUint16(l+28,!0),_=t.getUint16(l+30,!0),M=t.getUint16(l+32,!0),h=t.getUint32(l+42,!0),p=n.decode(e.subarray(l+46,l+46+m)).replace(/\\/g,"/").replace(/^\/+/,"");if(l+=46+m+_+M,!p||p.endsWith("/")||h+30>e.length||t.getUint32(h,!0)!==67324752)continue;const S=t.getUint16(h+26,!0),w=t.getUint16(h+28,!0),T=h+30+S+w,C=Math.min(e.length,T+d),R=e.subarray(T,C);u===0?c.set(p,R.slice()):u===8&&c.set(p,await Km(R))}return c}function cl(i,e){let t="";for(let r=0;r<i.length;r+=8192)t+=String.fromCharCode.apply(null,Array.from(i.subarray(r,r+8192)));return`data:${e};base64,${btoa(t)}`}function dl(i,e){const t=decodeURIComponent(String(e||"").split("#")[0].split("?")[0]).replace(/^\/+/,"");if(!i)return t;const n=i.split("/").filter(Boolean);for(const r of t.split("/"))!r||r==="."||(r===".."?n.pop():n.push(r));return n.join("/")}async function Ym(i){var m,_,M,h,p,S,w,T,C,R;const e=await i.arrayBuffer(),t=await qm(e),n=new TextDecoder("utf-8"),r=g=>{const E=t.get(g);return E?n.decode(E):null};let s="";for(const[g,E]of t.entries()){const F=g.toLowerCase();if(/^(oebps\/images\/cover\.|oebps\/cover\.|cover\.)(png|jpe?g|webp|gif)$/i.test(F)){const I=F.endsWith(".png")?"image/png":F.endsWith(".webp")?"image/webp":F.endsWith(".gif")?"image/gif":"image/jpeg";s=cl(E,I);break}}const a=r("META-INF/kryst_manifest.json");if(a)try{const g=JSON.parse(a),E=g.bookScript?ao(g.bookScript):null;if(E)return s&&!E.coverUrl&&(E.coverUrl=s),Array.isArray((m=g.bookScript)==null?void 0:m.chapters)&&E.chapters.forEach((F,I)=>{var G;if(F.audioUrl)return;const k=((G=g.bookScript.chapters[I])==null?void 0:G.cues)||[];for(const j of k){const D=t.get(`OEBPS/audio/${j.id}.wav`),K=D?null:t.get(`OEBPS/audio/${j.id}.mp3`),ne=D||K;if(ne){const B=new Uint8Array(ne.byteLength);B.set(ne),F.audioUrl=URL.createObjectURL(new Blob([B],{type:D?"audio/wav":"audio/mpeg"}));break}}}),{book:E,map:g.mapDataset||void 0,sourceLabel:`.kryst Konténer (${E.title})`}}catch(g){console.warn("[unpackKrystZipContainer] Manifest parse warn:",g)}const o=new DOMParser;let c=i.name.replace(/\.(kryst|epub)$/i,""),l="Ismeretlen Szerző";const f=[],u=r("META-INF/container.xml");if(u)try{const E=(_=o.parseFromString(u,"application/xml").querySelector("rootfile"))==null?void 0:_.getAttribute("full-path");if(E){const F=r(E);if(F){const I=o.parseFromString(F,"application/xml"),k=E.includes("/")?E.slice(0,E.lastIndexOf("/")):"",G=((h=(M=I.getElementsByTagNameNS("*","title")[0])==null?void 0:M.textContent)==null?void 0:h.trim())||((S=(p=I.querySelector("title"))==null?void 0:p.textContent)==null?void 0:S.trim()),j=((T=(w=I.getElementsByTagNameNS("*","creator")[0])==null?void 0:w.textContent)==null?void 0:T.trim())||((R=(C=I.querySelector("creator"))==null?void 0:C.textContent)==null?void 0:R.trim());G&&(c=G),j&&(l=j);const D=new Map;if(I.querySelectorAll("manifest > item").forEach(K=>{const ne=K.getAttribute("id")||"",B=K.getAttribute("href")||"",ue=K.getAttribute("media-type")||"",Q=K.getAttribute("properties")||"";ne&&B&&D.set(ne,{href:B,mediaType:ue,props:Q})}),!s){for(const K of D.values())if(K.props.includes("cover-image")||/cover/i.test(K.href)){const ne=dl(k,K.href),B=t.get(ne);if(B&&K.mediaType.startsWith("image/")){s=cl(B,K.mediaType);break}}}I.querySelectorAll("spine > itemref").forEach(K=>{const ne=K.getAttribute("idref")||"",B=D.get(ne);if(!B||B.props.split(/\s+/).includes("nav"))return;const ue=dl(k,B.href);t.has(ue)&&f.push(ue)})}}}catch{}f.length===0&&Array.from(t.keys()).filter(g=>/\.(xhtml|html|htm)$/i.test(g)&&!/(nav|toc)\.(xhtml|html)$/i.test(g)).sort().forEach(g=>f.push(g));const d=[];if(f.forEach(g=>{var K,ne;const E=r(g);if(!E)return;const F=o.parseFromString(E,"text/html");F.querySelectorAll(".kryst-watermark, script, style").forEach(B=>B.remove());const I=(ne=(K=F.querySelector("h1, h2"))==null?void 0:K.textContent)==null?void 0:ne.replace(/\s+/g," ").trim(),k=Array.from(F.body.querySelectorAll("h1,h2,h3,p,blockquote,li")).map(B=>(B.textContent||"").replace(/\s+/g," ").trim()).filter(B=>B.length>0);if(k.length===0)return;const G=d.length;let j=0;const D=k.map(B=>{const ue=Math.max(2.5,Math.min(18,B.split(/\s+/).length*.45)),Q={text:B,startSec:Number(j.toFixed(2)),endSec:Number((j+ue).toFixed(2)),speakerId:"narrator"};return j+=ue,Q});d.push({id:`chap_${String(G+1).padStart(2,"0")}`,index:G,title:I||`${G+1}. Fejezet`,paragraphs:k,tokens:D})}),d.length===0)throw new Error("A .kryst / .epub archívumban nem található olvasható fejezet.");return{book:{id:`kryst_pkg_${Date.now()}`,title:c,author:l,type:"crystal_book",coverUrl:s||void 0,chapters:d,hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc"},sourceLabel:`ePub / .kryst Könyv (${c})`}}async function Zm(i){if(i.name.toLowerCase().endsWith(".png")){const o=await i.arrayBuffer(),c=await new Promise(f=>{const u=new FileReader;u.onload=()=>f(String(u.result||"")),u.readAsDataURL(i)}),l=sc(o,c);if(l)return{map:l,book:us(l),sourceLabel:`Hibrid PNG Térkép (${i.name})`};throw new Error("A PNG fájl nem tartalmaz beágyazott KrystMapDataset JSON metaadatot.")}const t=new Uint8Array(await i.slice(0,4).arrayBuffer());if(t.length>=4&&t[0]===80&&t[1]===75&&t[2]===3&&t[3]===4)return await Ym(i);const n=await i.text(),r=JSON.parse(n),s=r.packageData||r;if(s.dataset||Array.isArray(s.anchors)){const o=s.dataset||s;return s.cleanPngDataUrl&&!o.imageUrl&&(o.imageUrl=s.cleanPngDataUrl),{map:o,book:us(o),sourceLabel:`Kryst Térkép (${o.title||i.name})`}}const a=ao(s);if(a)return{book:a,map:s.mapDataset||void 0,sourceLabel:`Kristálykönyv (${a.title})`};if(Array.isArray(s.chapters))return{book:s,sourceLabel:`Könyv (${s.title||i.name})`};throw new Error("Nem felismerhető Kryst ökoszisztéma fájlformátum.")}async function Jm(){var s;const i=[],e=[],t=new Set,n=new Set;let r;try{const a=localStorage.getItem("kryst_abrigo_master_override_v1");if(a){const o=JSON.parse(a),c=(o==null?void 0:o.dataset)||o;c&&Array.isArray(c.anchors)&&(o.thumbnailDataUrl&&!c.imageUrl&&(c.imageUrl=o.thumbnailDataUrl),r=c)}}catch{}try{const a=localStorage.getItem("kryst_monk_virtual_disk_maps_v1");if(a){const o=JSON.parse(a);if(Array.isArray(o))for(const c of o){const l=c.dataset||c;l&&Array.isArray(l.anchors)&&(c.cleanPngDataUrl&&(l.imageUrl=c.cleanPngDataUrl),t.has(l.id)||(t.add(l.id),i.push(l)))}}}catch{}try{if("storage"in navigator&&typeof navigator.storage.getDirectory=="function"){const c=await(await(await navigator.storage.getDirectory()).getDirectoryHandle("kryst_monk_disk",{create:!1})).getDirectoryHandle("maps",{create:!1});for await(const[,l]of c.entries())if(l.kind==="file"){const f=await l.getFile(),u=JSON.parse(await f.text()),d=u.dataset||u;d&&Array.isArray(d.anchors)&&!t.has(d.id)&&(u.cleanPngDataUrl&&(d.imageUrl=u.cleanPngDataUrl),t.add(d.id),i.push(d))}}}catch{}try{const a=await fetch("http://localhost:3000/api/monk-disk/list");if(a.ok){const o=await a.json();if(Array.isArray(o.items))for(const c of o.items)try{const l=await fetch(`http://localhost:3000/api/monk-disk/read/${c.category}/${encodeURIComponent(c.filename)}`);if(l.ok){const f=await l.json(),u=((s=f.data)==null?void 0:s.packageData)||f.data;if(c.category==="maps"||u!=null&&u.dataset||Array.isArray(u==null?void 0:u.anchors)){const d=u.dataset||u;u.cleanPngDataUrl&&(d.imageUrl=u.cleanPngDataUrl),d&&Array.isArray(d.anchors)&&!t.has(d.id)&&(t.add(d.id),i.push(d))}else{const d=ao(u);d&&!n.has(d.id)&&(n.add(d.id),e.push(d))}}}catch{}}}catch{}return{maps:i,books:e,abrigoOverride:r}}function ul(i){var s,a,o,c,l,f,u,d;const e=[],t=i,n=new Map;i.anchors.forEach(m=>n.set(m.id,m));const r=(a=(s=t.narrativeLayer)==null?void 0:s.travelogue)==null?void 0:a.stages;if(Array.isArray(r)&&r.length>0&&r.forEach((m,_)=>{var C,R;const M=n.get(m.fromAnchorId)||i.anchors[_],h=n.get(m.toAnchorId)||i.anchors[_+1];if(!M||!h)return;const p=m.vehicle||((C=i.expeditionState)==null?void 0:C.vehicle)||"galley",S=ui[p]||ui.galley,w=Array.isArray(m.directorSignposts)?m.directorSignposts[0]:null,T=m.routeAnimation||{};e.push({stageId:m.stageId||`stage_${_+1}`,stageNumber:_+1,fromAnchor:M,toAnchor:h,vehicle:p,vehicleEmoji:S.emoji,vehicleLabel:S.label,durationSec:Number(T.durationSec||5),bgMusicCue:T.bgMusicCue||(w==null?void 0:w.bgMusicCue)||"ocean_calm_voyage",sfxCue:T.sfxCue||(w==null?void 0:w.sfxCue)||"compass_click",cutEffect:T.cutEffect||"compass_wipe",narrationText:T.narrationText||(w==null?void 0:w.summaryPrompt)||((R=h.narrativeHook)==null?void 0:R.entryNarrativeText)||h.treasureNote||`Utazás ${M.name} kikötőjéből ${h.name} felé.`,speaker:(w==null?void 0:w.ttsVoicePersona)||"Narrátor"})}),e.length===0&&Array.isArray((c=(o=i.narrativeLayer)==null?void 0:o.travelogue)==null?void 0:c.waypointSequence)){const m=i.narrativeLayer.travelogue.waypointSequence;for(let _=0;_<m.length-1;_++){const M=n.get(m[_]),h=n.get(m[_+1]);if(!M||!h)continue;const p=((l=i.expeditionState)==null?void 0:l.vehicle)||"galley",S=ui[p]||ui.galley;e.push({stageId:`wp_stage_${_+1}`,stageNumber:_+1,fromAnchor:M,toAnchor:h,vehicle:p,vehicleEmoji:S.emoji,vehicleLabel:S.label,durationSec:5,bgMusicCue:"ocean_calm_voyage",sfxCue:"compass_click",cutEffect:"compass_wipe",narrationText:((f=h.narrativeHook)==null?void 0:f.entryNarrativeText)||h.treasureNote||`Hajózás ${M.name} állomásról ${h.name} irányába.`,speaker:"Narrátor"})}}if(e.length===0&&i.anchors.length>=2)for(let m=0;m<i.anchors.length-1;m++){const _=i.anchors[m],M=i.anchors[m+1],h=((u=i.expeditionState)==null?void 0:u.vehicle)||"galley",p=ui[h]||ui.galley;e.push({stageId:`auto_stage_${m+1}`,stageNumber:m+1,fromAnchor:_,toAnchor:M,vehicle:h,vehicleEmoji:p.emoji,vehicleLabel:p.label,durationSec:5,bgMusicCue:"ocean_calm_voyage",sfxCue:"compass_click",cutEffect:"compass_wipe",narrationText:((d=M.narrativeHook)==null?void 0:d.entryNarrativeText)||M.treasureNote||`Utazás ${_.name} pontból ${M.name} felé.`,speaker:"Narrátor"})}return e}function hl(i){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.createOscillator(),r=t.createGain(),s=t.currentTime;i.includes("bell")||i.includes("gong")?(n.type="sine",n.frequency.setValueAtTime(528,s),n.frequency.exponentialRampToValueAtTime(264,s+.65)):i.includes("cannon")||i.includes("thunder")?(n.type="sawtooth",n.frequency.setValueAtTime(110,s),n.frequency.exponentialRampToValueAtTime(38,s+.55)):(n.type="triangle",n.frequency.setValueAtTime(660,s),n.frequency.exponentialRampToValueAtTime(880,s+.25)),r.gain.setValueAtTime(.08,s),r.gain.exponentialRampToValueAtTime(.001,s+.65),n.connect(r),r.connect(t.destination),n.start(s),n.stop(s+.66)}catch{}}document.addEventListener("DOMContentLoaded",()=>{const i=new Mc,e=document.getElementById("reader-chassis"),t=document.getElementById("view-browser"),n=document.getElementById("view-text"),r=document.getElementById("view-dream-stage"),s=document.getElementById("view-map"),a=document.getElementById("text-tokens-container"),o=document.getElementById("reader-lens-container"),c=document.getElementById("reader-coords-display"),l=document.createElement("div");l.id="dragged-word-ghost",l.className="dragged-word-ghost",document.body.appendChild(l);let f=!1,u=null,d=null,m=0,_=0,M=null,h=!1;const p=document.getElementById("btn-open-bookmarks"),S=document.getElementById("bookmark-modal-overlay"),w=document.getElementById("bookmark-search-input"),T=document.getElementById("bookmark-cards-scroll"),C=document.getElementById("btn-create-bookmark"),R=document.getElementById("btn-open-chapters"),g=document.getElementById("chapter-modal-overlay"),E=document.getElementById("chapter-cards-scroll"),F=document.getElementById("map-modal-overlay"),I=document.getElementById("map-cards-scroll"),k=document.getElementById("browser-search-input"),G=document.getElementById("btn-clear-browser-search"),j=document.querySelectorAll(".browser-filter-chip"),D=document.getElementById("browser-stats-text"),K=document.getElementById("browser-books-section"),ne=document.getElementById("browser-maps-section"),B=document.getElementById("browser-empty-state"),ue=document.getElementById("btn-reset-browser-filters");let Q="",le="all";const he=document.getElementById("btn-font-decrease"),ke=document.getElementById("btn-font-increase"),$e=document.getElementById("btn-basis-back"),te=document.getElementById("btn-media-pause-play"),Ae=document.getElementById("icon-pause-play"),Pe=document.getElementById("btn-thumb-prev"),Fe=document.getElementById("btn-thumb-next"),Re=document.getElementById("slider-bgm"),Ze=document.getElementById("slider-voice"),Mt=document.getElementById("slider-speed"),qe=document.getElementById("label-bgm-val"),gt=document.getElementById("label-voice-val"),mt=document.getElementById("label-speed-val"),rt=document.getElementById("map-image-wrapper"),Ht=document.getElementById("map-target-image"),At=document.getElementById("map-footer-dock"),Gt=document.getElementById("map-footer-title"),bt=document.getElementById("map-footer-danger"),en=document.getElementById("map-footer-text"),wt=document.getElementById("map-footer-action-row"),on=document.getElementById("btn-poi-more"),Ft=document.getElementById("map-parchment-overlay"),Kt=document.getElementById("parchment-scroll-area"),O=document.getElementById("parchment-title"),tn=document.getElementById("parchment-meta"),Tt=document.getElementById("parchment-text-content");let lt=null,xe=null,nt=!1,We=1,Ye=0,A=1,x=1,X=!1;const pe=document.getElementById("chapter-media-pill"),ae=document.getElementById("chapter-media-count"),de=document.getElementById("chapter-media-lightbox"),Te=document.getElementById("chapter-media-lightbox-title"),ie=document.getElementById("btn-close-media-lightbox"),se=document.getElementById("chapter-media-active-img"),Ee=document.getElementById("chapter-media-thumbs");let P=[];const re=document.getElementById("library-hydration-overlay"),ee=document.getElementById("library-hydration-spinner"),be=document.getElementById("library-hydration-title"),ye=document.getElementById("library-hydration-desc"),Me=document.getElementById("btn-hydration-fallback-legacy"),Be=document.getElementById("btn-hydration-cancel");let Je=null,ge=null,ze=null,Ve=null,we=!1;Rt.forEach(v=>{!v.isUserOwned&&!v.sourceKind&&(v.sourceKind="demo")}),Ct.forEach(v=>{!v.isUserOwned&&!v.status&&(v.status="demo")});const pt=new Xm(r);pt.init(),i.setDreamStage(pt);function Ot(v,b){return!b||v.title.toLowerCase().includes(b)||v.author.toLowerCase().includes(b)?!0:v.chapters.some(V=>V.title.toLowerCase().includes(b)||V.paragraphs.some(U=>U.toLowerCase().includes(b))||V.tokens.some(U=>U.text.toLowerCase().includes(b)))}function Dn(v,b){return!b||v.title.toLowerCase().includes(b)||v.description.toLowerCase().includes(b)?!0:v.anchors.some(V=>V.name.toLowerCase().includes(b)||V.treasureNote.toLowerCase().includes(b)||V.coordinates.toLowerCase().includes(b)||V.dangerLevel.toLowerCase().includes(b))}function Qi(){k&&(k.value=""),Q="",le="all",G&&(G.style.display="none"),qt("","all"),k&&k.focus()}function qt(v=Q,b=le){Q=v,le=b;const V=v.trim().toLowerCase();G&&(G.style.display=V.length>0?"block":"none"),j&&j.length>0&&j.forEach(Z=>{Z.classList.toggle("active",Z.getAttribute("data-category")===b)});const U=document.getElementById("browser-books-list");U.innerHTML="";const oe=b==="all"||b==="crystal_book"||b==="copy"||b==="scroll"||b==="log"?Rt.filter(Z=>b==="crystal_book"&&Z.type!=="crystal_book"||b==="copy"&&Z.type!=="copy"&&Z.sourceKind!=="copy"||b==="scroll"&&(Z.type!=="scroll"||Z.sourceKind==="log")||b==="log"&&Z.sourceKind!=="log"?!1:Ot(Z,V)):[];oe.forEach(Z=>{var Ke,nn;const L=document.createElement("div");L.className="bookmark-card",L.style.cursor=Z.inPlay?"not-allowed":"pointer";const ce=Z.type==="crystal_book",ve=ce&&!!Z.hasMultiVoiceMaster;let me=ce?'<span class="browser-type-badge" style="color: var(--color-gold-glow);">💎 Kristálykönyv</span>':'<span class="browser-type-badge" style="color: #94a3b8;">📜 Tekercs</span>';Z.sourceKind==="book"?me='<span class="browser-type-badge" style="color: var(--color-gold-glow);">💎 Saját Priori Könyv</span>':Z.sourceKind==="copy"?me='<span class="browser-type-badge" style="color: #60a5fa;">📘 Saját Másolat</span>':Z.sourceKind==="scroll"?me='<span class="browser-type-badge" style="color: #cbd5e1;">📜 Saját Tekercs</span>':Z.sourceKind==="log"?me='<span class="browser-type-badge" style="color: #fbbf24;">📓 Hajónapló</span>':Z.sourceKind==="monastery"&&(me=`<span class="browser-type-badge" style="color: #c084fc;">🔒 OPFS Kézirat${Z.statusLabel?" · "+Z.statusLabel:""}</span>`);let Xe="";Z.inPlay?Xe='<span class="browser-cache-pill in-play">🎮 Játékban</span>':Z.isUserOwned?Xe=Z.cachedInOpfs||!Z.needsHydration?'<span class="browser-cache-pill opfs-ready">⚡ OPFS Kész</span>':'<span class="browser-cache-pill cloud-fetch">☁️ Felhő → OPFS</span>':Z.sourceKind==="demo"&&(Xe='<span class="browser-cache-pill demo-badge">Minta</span>');const Ge=Z.needsHydration?`Szerző: ${Z.author}${Z.chapterLabel?" · "+Z.chapterLabel:""} · Kattints a betöltéshez`:`Szerző: ${Z.author} · ${Z.chapters.length} fejezet`,Yt=Z.sourceKind==="demo"||Ct.some(Bt=>{var Ut;return((Ut=Bt.canonicalWorldGate)==null?void 0:Ut.associatedKrystBookId)===Z.id||`mapbook_${Bt.id}`===Z.id}),pn=Z.inPlay?'<div class="bookmark-card-actions"><span style="font-size: 0.75rem; color: #fbbf24;">⚠️ Játékban lévő másolat jelenleg nem olvasható.</span></div>':`
          <div class="bookmark-card-actions">
            <button class="card-action-btn" data-action="read" title="1. Szint: eBook (Tiszta kinetikus olvasás)">📖 eBook</button>
            <button class="card-action-btn" data-action="listen" title="2. Szint: Audiobook (Olvasás + Felolvasó Szinkron)">🎧 Audiobook ▾</button>
            ${ve?'<button class="card-action-btn" data-action="dream" title="3. Szint: Multimedia-Book (Karaoke + 3D Álom-Színpad + Többszereplős Stúdió Szinkron)">🎬✨ Multimedia-Book ▾</button>':""}
            ${Yt?'<button class="card-action-btn" data-action="mapbook" title="4. Szint: Mapbook (Kapcsolt Interaktív Térkép & 2D Útvonal)">🗺️⛵ Mapbook</button>':""}
          </div>
        `;if(L.innerHTML=`
        <div class="bookmark-card-title">
          <span>${Z.title}</span>
          <span>${me}${Xe}</span>
        </div>
        <div class="browser-item-meta">${Ge}</div>
        ${pn}
      `,!Z.inPlay){(Ke=L.querySelector('[data-action="read"]'))==null||Ke.addEventListener("click",An=>{An.stopPropagation(),Kn(Z,"read")}),(nn=L.querySelector('[data-action="mapbook"]'))==null||nn.addEventListener("click",An=>{An.stopPropagation();const xn=Ct.find(Zt=>{var Xt;return((Xt=Zt.canonicalWorldGate)==null?void 0:Xt.associatedKrystBookId)===Z.id||`mapbook_${Zt.id}`===Z.id})||Ct[0];xn&&ri(xn,"map")});const Bt=L.querySelector('[data-action="listen"]');Bt==null||Bt.addEventListener("click",An=>{An.stopPropagation();const xn=L.querySelector(".scroll-voice-dropdown");if(xn){xn.remove(),Bt.classList.remove("active-dropdown");return}document.querySelectorAll(".scroll-voice-dropdown, .dream-stage-dropdown").forEach(Xt=>Xt.remove()),document.querySelectorAll('[data-action="listen"].active-dropdown, [data-action="dream"].active-dropdown').forEach(Xt=>Xt.classList.remove("active-dropdown")),Bt.classList.add("active-dropdown");const Zt=document.createElement("div");Zt.className="scroll-voice-dropdown",Zt.innerHTML=`
            <div class="scroll-voice-dropdown-header">
              <span>🎙️ Válassz magyar felolvasó karaktert:</span>
              <span class="scroll-voice-dropdown-badge">Piper TTS</span>
            </div>
            <div class="scroll-voice-list">
              ${ho.map(Xt=>`
                <button class="scroll-voice-item" data-voice="${Xt.id}">
                  <span class="voice-item-icon">${Xt.icon}</span>
                  <div class="voice-item-details">
                    <div class="voice-item-name">
                      ${Xt.name}
                      <span class="voice-item-role">${Xt.role}</span>
                    </div>
                    <div class="voice-item-desc">${Xt.description}</div>
                  </div>
                </button>
              `).join("")}
            </div>
          `,Zt.querySelectorAll(".scroll-voice-item").forEach(Xt=>{Xt.addEventListener("click",async Ar=>{Ar.stopPropagation();const wn=Xt.getAttribute("data-voice")||"ferenc",Es=ho.find(uc=>uc.id===wn),dc=Es?`${Es.icon} ${Es.name}`:wn;Zt.innerHTML=`
                <div class="scroll-voice-loading-bar">
                  <span>⏳ Előkészítés & Beszéd: <strong>${dc}</strong>...</span>
                </div>
              `,await Kn(Z,"listen",wn),Zt.remove(),Bt.classList.remove("active-dropdown")})}),L.appendChild(Zt)});const Ut=L.querySelector('[data-action="dream"]');Ut==null||Ut.addEventListener("click",An=>{var Xt,Ar;An.stopPropagation();const xn=L.querySelector(".dream-stage-dropdown");if(xn){xn.remove(),Ut.classList.remove("active-dropdown");return}document.querySelectorAll(".scroll-voice-dropdown, .dream-stage-dropdown").forEach(wn=>wn.remove()),document.querySelectorAll('[data-action="listen"].active-dropdown, [data-action="dream"].active-dropdown').forEach(wn=>wn.classList.remove("active-dropdown")),Ut.classList.add("active-dropdown");const Zt=document.createElement("div");Zt.className="dream-stage-dropdown",Zt.innerHTML=`
            <div class="dream-stage-dropdown-header">
              <span>✨ 3D Álom-Színpad Műsorközpont:</span>
              <span class="dream-stage-dropdown-badge">Stúdió Maszter</span>
            </div>
            <div class="dream-stage-list">
              <button class="dream-stage-item" data-dream-choice="studio_read">
                <span class="dream-item-icon">🎧</span>
                <div class="dream-item-details">
                  <div class="dream-item-name">
                    Olvasás + Többszereplős Stúdió Szinkron
                    <span class="dream-item-badge">Szöveglencse</span>
                  </div>
                  <div class="dream-item-desc">
                    Olvasás a lencsén a Stúdióban előre megszerkesztett, fejezethez igazított többhangos szinkronnal.
                  </div>
                </div>
              </button>
              <button class="dream-stage-item" data-dream-choice="stage_3d">
                <span class="dream-item-icon">🎭</span>
                <div class="dream-item-details">
                  <div class="dream-item-name">
                    3D Színpadi Előadás & Vetítés
                    <span class="dream-item-badge">3D Vászon</span>
                  </div>
                  <div class="dream-item-desc">
                    Prompt alapú 3D előadás, virtuális díszletek és vászonra vetített képsorozat stúdió szinkronnal.
                  </div>
                </div>
              </button>
            </div>
          `,(Xt=Zt.querySelector('[data-dream-choice="studio_read"]'))==null||Xt.addEventListener("click",wn=>{wn.stopPropagation(),Zt.remove(),Ut.classList.remove("active-dropdown"),Kn(Z,"dream",void 0,"studio_read")}),(Ar=Zt.querySelector('[data-dream-choice="stage_3d"]'))==null||Ar.addEventListener("click",wn=>{wn.stopPropagation(),Zt.remove(),Ut.classList.remove("active-dropdown"),Kn(Z,"dream",void 0,"stage_3d")}),L.appendChild(Zt)}),L.addEventListener("click",An=>{const xn=An.target;xn.closest(".card-action-btn")||xn.closest(".scroll-voice-dropdown")||xn.closest(".dream-stage-dropdown")||Kn(Z,"read")})}U.appendChild(L)}),K&&(K.style.display=oe.length>0?"block":"none");const z=document.getElementById("browser-maps-list");z.innerHTML="";const J=b==="all"||b==="map"?Ct.filter(Z=>Dn(Z,V)):[];J.forEach(Z=>{var Ke,nn,Bt;const L=document.createElement("div");L.className="bookmark-card",L.style.cursor="pointer";const ce=ul(Z),ve=Z.anchors.length>0||ce.length>0,me=!!(Z.isUserOwned&&!ve);let Xe="";Z.isUserOwned?Xe=Z.cachedInOpfs||!Z.needsHydration?'<span class="browser-cache-pill opfs-ready">⚡ OPFS Kész</span>':'<span class="browser-cache-pill cloud-fetch">☁️ Felhő → OPFS</span>':Z.status==="demo"&&(Xe='<span class="browser-cache-pill demo-badge">Minta</span>');const Ge=Z.isPendingPapat?'<span class="browser-type-badge" style="color: #f87171;">⚜️ Elbírálásra váró térkép</span>':'<span class="browser-type-badge" style="color: var(--color-crystal-blue);">🧭 Hajszáloptika & Mapbook</span>',Yt=Z.needsHydration&&!ve?`${Z.description||"Saját hajózási térkép"} · Kattints a betöltéshez`:`${Z.description} (${Z.anchors.length} horgony · ${ce.length} útszakasz)`,pn=me?`
          <div class="bookmark-card-actions" style="margin-top: 6px;">
            <button class="card-action-btn" data-map-action="mapbook">🧭 Megnyitás (Hajszáloptika)</button>
          </div>
        `:`
          <div class="bookmark-card-actions" style="margin-top: 6px;">
            <button class="card-action-btn" data-map-action="mapbook">🗺️⛵ Mapbook (2D Útvonal)</button>
            <button class="card-action-btn" data-map-action="ebook">📖 eBook (Gráf)</button>
            <button class="card-action-btn" data-map-action="audiobook">🎧 Audiobook</button>
          </div>
        `;L.innerHTML=`
        <div class="bookmark-card-title">
          <span>${Z.title}</span>
          <span>${Ge}${Xe}</span>
        </div>
        <div class="browser-item-meta">${Yt}</div>
        ${pn}
      `,(Ke=L.querySelector('[data-map-action="mapbook"]'))==null||Ke.addEventListener("click",Ut=>{Ut.stopPropagation(),ri(Z,"map")}),(nn=L.querySelector('[data-map-action="ebook"]'))==null||nn.addEventListener("click",Ut=>{Ut.stopPropagation(),ri(Z,"ebook")}),(Bt=L.querySelector('[data-map-action="audiobook"]'))==null||Bt.addEventListener("click",Ut=>{Ut.stopPropagation(),ri(Z,"audiobook")}),L.addEventListener("click",Ut=>{Ut.target.closest(".card-action-btn")||ri(Z,"map")}),z.appendChild(L)}),ne&&(ne.style.display=J.length>0?"block":"none");const Ue=oe.length+J.length;if(Ue===0)B&&(B.style.display="flex"),D&&(D.textContent="0 találat az Adattárban");else if(B&&(B.style.display="none"),D){const Z=[];oe.length>0&&Z.push(`${oe.length} írás (könyv / másolat / tekercs / napló)`),J.length>0&&Z.push(`${J.length} térkép`);const L=we?"💎 Saját LETkristály Adattár: ":"Találatok: ";D.textContent=`${L}${Ue} tétel (${Z.join(" · ")})`}}function _s(){k&&(k.addEventListener("input",()=>{qt(k.value,le)}),k.addEventListener("keydown",v=>{v.key==="Escape"&&(v.preventDefault(),Qi())})),G&&G.addEventListener("click",v=>{v.stopPropagation(),k&&(k.value="",k.focus()),qt("",le)}),j&&j.length>0&&j.forEach(v=>{v.addEventListener("click",b=>{b.stopPropagation();const V=v.getAttribute("data-category")||"all";qt(k?k.value:"",V)})}),ue&&ue.addEventListener("click",v=>{v.stopPropagation(),Qi()})}function ln(){const v=i.reflowEngine.getCandidateTokens(260),b=i.guideEngine.getActiveWordIndex(),V=i.reflowEngine.getLeadingSpacerLines(),U=i.reflowEngine.getTrailingSpacerLines(),W=i.reflowEngine.getInlineSpacerWidth(),oe=i.reflowEngine.getAnchoredWordIndex();a.innerHTML="";for(let J=0;J<V;J++){const Ue=document.createElement("div");Ue.className="reflow-spacer-line",a.appendChild(Ue)}const fe=e.classList.contains("layout-landscape")?[{lClass:"top-l-0",rClass:"top-r-0"},{lClass:"top-l-1",rClass:"top-r-1"},{lClass:"top-l-2",rClass:"top-r-2"}]:[{lClass:"top-l-0",rClass:"top-r-0"},{lClass:"top-l-1",rClass:"top-r-1"},{lClass:"top-l-2",rClass:"top-r-2"}];for(let J=V;J<fe.length;J++){const Ue=fe[J],Z=document.createElement("div");Z.className=`lens-indent-guide ${Ue.lClass}`,a.appendChild(Z);const L=document.createElement("div");L.className=`lens-indent-guide ${Ue.rClass}`,a.appendChild(L)}v.forEach(J=>{if(J.index===oe&&W>0){const ce=document.createElement("span");ce.className="reflow-inline-spacer",ce.style.width=W+"px",a.appendChild(ce)}const Ue=document.createElement("span");Ue.className="word-token"+(J.index===b?" focused":""),f&&J.index===u&&Ue.classList.add("drag-source"),Ue.dataset.index=J.index.toString(),Array.from(J.word).forEach(ce=>{const ve=document.createElement("span");ve.className="char-token",ve.textContent=ce,Ue.appendChild(ve)});const L=$m(J.word);if(L){Ue.classList.add("kryst-reader-intonation-badge");const ce=document.createElement("span");ce.className="kryst-reader-intonation-bubble",ce.innerHTML=`
          <strong>${L.emoji} ${L.label}</strong>
          <span class="bubble-row"><em>🎬 Rendezői instrukció:</em> ${L.styleGuide}</span>
          <span class="bubble-row"><em>💡 Tipp:</em> ${L.contextNote}</span>
        `,Ue.appendChild(ce)}Ue.addEventListener("mousedown",ce=>{er(ce,J.index,Ue)}),Ue.addEventListener("touchstart",ce=>{er(ce,J.index,Ue)},{passive:!0}),Ue.addEventListener("click",ce=>{ce.stopPropagation(),!(f||h)&&(i.seekAudioToWordIndex(J.index),ln())}),a.appendChild(Ue)});for(let J=0;J<U;J++){const Ue=document.createElement("div");Ue.className="reflow-spacer-line",a.appendChild(Ue)}yr(),Vn()}function yr(){const v=Array.from(a.querySelectorAll(".word-token:not(.invisible-line-filler)"));if(v.length===0)return;const b=n.getBoundingClientRect();if(!b||b.height===0)return;const V=b.bottom-24,U=[];let W=[],oe=-999;if(v.forEach(J=>{const Ue=J.offsetTop;Math.abs(Ue-oe)>6?(W.length>0&&U.push(W),W=[J],oe=Ue):W.push(J)}),W.length>0&&U.push(W),U.length<=1){i.reflowEngine.setVisibleWordCount(v.length);return}let z=-1;for(let J=1;J<U.length;J++){const Ue=U[J];let Z=0;for(const L of Ue){const ce=L.getBoundingClientRect().bottom;ce>Z&&(Z=ce)}if(Z>V){z=J;break}}if(z!==-1)for(let J=z;J<U.length;J++)U[J].forEach(Ue=>Ue.remove());const fe=a.querySelectorAll(".word-token:not(.invisible-line-filler)");i.reflowEngine.setVisibleWordCount(fe.length)}function Vn(){const v=a;v.querySelectorAll(".invisible-line-filler").forEach(Ke=>Ke.remove());const b=v.querySelectorAll(".word-token:not(.invisible-line-filler)");if(b.length===0)return;b.forEach(Ke=>{Ke.dataset.lensDy="0",Ke.dataset.lensRot="0",Ke.style.marginLeft="",Ke.style.marginRight="",Ke.querySelectorAll(".char-token").forEach(An=>{An.style.transform=""});const Bt=Ke.classList.contains("focused");Ke.classList.contains("drag-source")?Ke.style.transform="scale(0.92)":Bt?Ke.style.transform="scale(1.15)":Ke.style.transform=""});const V=n.getBoundingClientRect(),U=[];let W=[],oe=-999;if(b.forEach(Ke=>{const nn=Ke.offsetTop;Math.abs(nn-oe)>6?(W.length>0&&U.push(W),W=[Ke],oe=nn):W.push(Ke)}),W.length>0&&U.push(W),U.length===0)return;const z=V.bottom-22,fe=U[U.length-1];let J=0;for(const Ke of fe){const nn=Ke.getBoundingClientRect().bottom;nn>J&&(J=nn)}const Ue=z-J,Z=U.length>1?Math.max(20,U[1][0].offsetTop-U[0][0].offsetTop):Math.max(22,(U[0][0].offsetHeight||20)*1.75),L=Ue<Z*1.15,ce=Ue<Z*2.15,ve=U.length;let me=!1;const Xe=e.classList.contains("layout-landscape"),Ge=Xe?32:48,Yt=Xe?18:28,pn=Xe?8:14;if(L?(ve>=1&&(Wn(U[ve-1],Ge),me=!0),ve>=2&&(Wn(U[ve-2],Yt),me=!0),ve>=3&&(Wn(U[ve-3],pn),me=!0)):ce&&(ve>=1&&(Wn(U[ve-1],Yt),me=!0),ve>=2&&(Wn(U[ve-2],pn),me=!0)),me){let Ke=!1;const nn=Array.from(v.querySelectorAll(".word-token:not(.invisible-line-filler)"));for(let Bt=nn.length-1;Bt>=0;Bt--){const Ut=nn[Bt];if(Ut.getBoundingClientRect().bottom>z)Ut.remove(),Ke=!0;else break}if(Ke){const Bt=v.querySelectorAll(".word-token:not(.invisible-line-filler)");i.reflowEngine.setVisibleWordCount(Bt.length)}}}function Wn(v,b){if(!v||v.length===0||b<=0)return;const V=v[0],U=v[v.length-1];V.style.marginLeft=b+"px",U.style.marginRight=b+"px"}function er(v,b,V){const U=i.getState();if(U.mode!=="read"&&U.mode!=="read_listen"||v instanceof MouseEvent&&v.button!==0)return;const W=v instanceof MouseEvent?v.clientX:v.touches[0].clientX,oe=v instanceof MouseEvent?v.clientY:v.touches[0].clientY;f=!1,h=!1,u=b,d=V,m=W,_=oe,M=null,window.addEventListener("mousemove",xi,{passive:!1}),window.addEventListener("mouseup",Xn),window.addEventListener("touchmove",xi,{passive:!1}),window.addEventListener("touchend",Xn)}function xi(v){if(u===null||!d)return;const b=v instanceof MouseEvent?v.clientX:v.touches[0].clientX,V=v instanceof MouseEvent?v.clientY:v.touches[0].clientY,U=b-m,W=V-_,oe=Math.hypot(U,W);if(!h)if(oe>5)h=!0,f=!0,d.classList.add("drag-source"),l.textContent=d.textContent||"",l.style.display="block";else return;v.cancelable&&v.preventDefault(),l.style.left=b+"px",l.style.top=V+"px"}function Xn(v){if(window.removeEventListener("mousemove",xi),window.removeEventListener("mouseup",Xn),window.removeEventListener("touchmove",xi),window.removeEventListener("touchend",Xn),l&&(l.style.display="none"),d&&d.classList.remove("drag-source"),M&&(M.classList.remove("drop-target"),M=null),h&&f&&u!==null){const b=v instanceof MouseEvent?v.clientX:v.changedTouches&&v.changedTouches.length>0?v.changedTouches[0].clientX:m,V=v instanceof MouseEvent?v.clientY:v.changedTouches&&v.changedTouches.length>0?v.changedTouches[0].clientY:_,U=n.getBoundingClientRect(),W=b-U.left,oe=V-U.top,z=a.querySelector(".word-token"),fe=z?Math.max(22,z.offsetHeight):31.5;i.reflowEngine.anchorWord2D(u,W,oe,U.width,U.height,fe),i.guideEngine.setActiveWordIndex(u),ln()}setTimeout(()=>{f=!1,h=!1,u=null,d=null,M=null},60)}function Sr(){const v=Array.from(a.querySelectorAll(".word-token:not(.invisible-line-filler)"));if(v.length===0)return i.reflowEngine.getLastVisibleWordIndex();const b=n.getBoundingClientRect();let V=null;for(const oe of v){const z=oe.getBoundingClientRect();if(z.top<b.bottom-8&&z.bottom>b.top)V=oe;else if(z.top>=b.bottom-8)break}if(V){const oe=parseInt(V.dataset.index||"-1",10);if(!isNaN(oe)&&oe>=0)return oe}const U=v[v.length-1],W=parseInt(U.dataset.index||"-1",10);return!isNaN(W)&&W>=0?W:i.reflowEngine.getLastVisibleWordIndex()}function Mr(){const v=Array.from(a.querySelectorAll(".word-token:not(.invisible-line-filler)"));if(v.length===0)return i.reflowEngine.getCurrentIndex();const b=n.getBoundingClientRect();for(const V of v)if(V.getBoundingClientRect().bottom>b.top+6){const W=parseInt(V.dataset.index||"-1",10);if(!isNaN(W)&&W>=0)return W}return i.reflowEngine.getCurrentIndex()}function bn(v=""){const b=i.getActiveBook(),V=i.bookmarkEngine.searchBookmarks(v,b?b.id:void 0);if(T.innerHTML="",V.length===0){T.innerHTML='<div style="text-align: center; color: var(--color-text-muted); font-size: 0.85rem; padding: 20px;">Nincs találat a könyvjelzők között.</div>';return}V.forEach(U=>{var z,fe,J,Ue;const W=document.createElement("div");W.className="bookmark-card";const oe=U.isAuto?'<span style="color: #38bdf8; font-size: 0.7rem;">[Auto-Mentés]</span>':"";W.innerHTML=`
        <div class="bookmark-card-title">
          <span>${U.title} ${oe}</span>
          <span style="font-size: 0.7rem; color: #94a3b8;">${new Date(U.updatedAt).toLocaleDateString("hu-HU")}</span>
        </div>
        <div class="bookmark-card-snippet">«${U.quoteSnippet}»</div>
        ${U.note?`<div class="bookmark-card-note">📝 ${U.note}</div>`:""}
        <div class="bookmark-card-actions">
          <button class="card-action-btn" data-action="jump">🚀 Ugrás Ide</button>
          <button class="card-action-btn" data-action="edit">✏️ Módosítás</button>
          <button class="card-action-btn" data-action="copy">📋 Kimásolás</button>
          <button class="card-action-btn" data-action="delete" style="color: #f87171;">🗑️ Törlés</button>
        </div>
      `,(z=W.querySelector('[data-action="jump"]'))==null||z.addEventListener("click",()=>{const Z=Rt.find(L=>L.id===U.bookId)||Rt[0];if(S.style.display="none",Z&&Z.needsHydration){Kn(Z,"read",void 0,void 0,U.chapterIndex,U.wordIndex);return}i.loadBook(Z,U.chapterIndex,U.wordIndex),U.audioTimestamp!==void 0&&i.audioMixer.seek(U.audioTimestamp),i.setMode("read_listen")}),(fe=W.querySelector('[data-action="edit"]'))==null||fe.addEventListener("click",()=>{const Z=prompt("Könyvjelző új neve:",U.title);if(Z===null)return;const L=prompt("Személyes jegyzet szövege:",U.note);L!==null&&(i.bookmarkEngine.updateBookmark(U.id,{title:Z,note:L}),bn(w.value))}),(J=W.querySelector('[data-action="copy"]'))==null||J.addEventListener("click",async()=>{try{const Z=await i.bookmarkEngine.copyBookmarkToClipboard(U.id);alert(`Idézet és jegyzet a vágólapra másolva:

`+Z)}catch{alert("Nem sikerült a vágólapra másolni.")}}),(Ue=W.querySelector('[data-action="delete"]'))==null||Ue.addEventListener("click",()=>{confirm(`Biztosan törölni szeretnéd a(z) "${U.title}" könyvjelzőt?`)&&(i.bookmarkEngine.deleteBookmark(U.id),bn(w.value))}),W.addEventListener("click",Z=>{if(Z.target.closest(".card-action-btn"))return;const L=Rt.find(ce=>ce.id===U.bookId)||Rt[0];if(S.style.display="none",L&&L.needsHydration){Kn(L,"read",void 0,void 0,U.chapterIndex,U.wordIndex);return}i.loadBook(L,U.chapterIndex,U.wordIndex),U.audioTimestamp!==void 0&&i.audioMixer.seek(U.audioTimestamp),i.setMode("read_listen")}),T.appendChild(W)})}function vs(){const v=i.getActiveBook();if(E.innerHTML="",!v){E.innerHTML='<div style="text-align: center; color: var(--color-text-muted); font-size: 0.85rem; padding: 20px;">Nincs betöltött könyv.</div>';return}v.chapters.forEach((b,V)=>{const U=document.createElement("div");U.className="bookmark-card",U.style.cursor="pointer",U.innerHTML=`
        <div class="bookmark-card-title">${b.title}</div>
        <div style="font-size: 0.78rem; color: var(--color-text-muted);">${b.paragraphs.length} bekezdés</div>
      `,U.addEventListener("click",async()=>{const W=i.getState(),oe=W.isPlaying||W.mode==="read_listen"||W.mode==="audio_dream";g.style.display="none",Ce(),oe?await i.playChapterVoice(V,W.selectedSingleVoice,0,z=>{const fe=c.querySelector(".display-main-line"),J=c.querySelector(".display-sub-line");fe&&J&&i.getActiveBook()&&(fe.textContent=i.getActiveBook().title.toUpperCase(),J.textContent=z)}):i.loadChapter(V,!1),ln()}),E.appendChild(U)})}function Er(){I.innerHTML="",Ct.forEach(v=>{var W;const b=document.createElement("div");b.className="bookmark-card",b.style.cursor="pointer";const U=((W=i.getActiveMap())==null?void 0:W.id)===v.id?'<span style="color: var(--color-gold-glow); font-size: 0.7rem;">[Jelenleg betöltve]</span>':"";b.innerHTML=`
        <div class="bookmark-card-title">
          <span>${v.title} ${U}</span>
          <span style="font-size: 0.7rem; color: var(--color-crystal-blue);">${v.anchors.length} horgony</span>
        </div>
        <div style="font-size: 0.78rem; color: var(--color-text-muted);">${v.description}</div>
      `,b.addEventListener("click",()=>{F.style.display="none",ri(v,"map")}),I.appendChild(b)})}function br(v,b,V){let U=v.trim();if(U.length>28&&(U=U.replace(/\s+és\s+/gi," & "),U.length>28)){const oe=U.split(" ");let z="";for(const fe of oe){if((z+" "+fe).trim().length>25)break;z=(z+" "+fe).trim()}U=(z||U.slice(0,25))+"…"}let W=b.trim();if(W=W.replace(/\bFejezet\b/gi,"Fej."),/Fej\.|Tekercs|\b\d+\b/i.test(W)||(W=V+1+". Fej. · "+W),W.length>32){const oe=W.split(" ");let z="";for(const fe of oe){if((z+" "+fe).trim().length>30)break;z=(z+" "+fe).trim()}W=(z||W.slice(0,30))+"…"}return{main:U,sub:W}}function xs(){let v=null;function b(V){c.classList.add("coords-copied");const U=c.getAttribute("data-original-title")||c.title||"Kattints az automatikus másoláshoz, vagy jelöld ki a kívánt részt!";c.setAttribute("data-original-title",U),c.title="✓ Másolva a vágólapra: "+V,v&&clearTimeout(v),v=setTimeout(()=>{c.classList.remove("coords-copied"),c.title=c.getAttribute("data-original-title")||"Kattints az automatikus másoláshoz, vagy jelöld ki a kívánt részt!"},1500)}c.addEventListener("click",async V=>{var z,fe,J,Ue,Z;const U=window.getSelection();let oe=U?U.toString().trim():"";if(!oe){const L=V.target;if(L&&L.classList.contains("display-sub-line")){if(oe=((z=L.textContent)==null?void 0:z.trim())||"",U)try{const ce=document.createRange();ce.selectNodeContents(L),U.removeAllRanges(),U.addRange(ce)}catch{}}else if(L&&L.classList.contains("display-main-line")){if(oe=((fe=L.textContent)==null?void 0:fe.trim())||"",U)try{const ce=document.createRange();ce.selectNodeContents(L),U.removeAllRanges(),U.addRange(ce)}catch{}}else{const ce=c.querySelector(".display-main-line"),ve=c.querySelector(".display-sub-line"),me=((J=ce==null?void 0:ce.textContent)==null?void 0:J.trim())||"",Xe=((Ue=ve==null?void 0:ve.textContent)==null?void 0:Ue.trim())||"";if(oe=me&&Xe?`${me} • ${Xe}`:me||Xe||((Z=c.textContent)==null?void 0:Z.trim())||"",U)try{const Ge=document.createRange();Ge.selectNodeContents(c),U.removeAllRanges(),U.addRange(Ge)}catch{}}}if(oe)try{navigator.clipboard&&navigator.clipboard.writeText?await navigator.clipboard.writeText(oe):document.execCommand("copy"),b(oe)}catch(L){console.warn("Vágólap másolási hiba:",L)}}),c.addEventListener("copy",()=>{const V=window.getSelection(),U=V?V.toString().trim():"";b(U||"Kijelölt szöveg")})}function ys(){const v=[.78,.85,.92,1,1.1,1.22,1.36,1.52];let b=3;function V(){const W=v[b];o.style.setProperty("--reader-font-scale",W.toString()),document.documentElement.style.setProperty("--reader-font-scale",W.toString()),localStorage.setItem("kryst_reader_font_scale_idx",b.toString()),he.classList.toggle("disabled",b===0),ke.classList.toggle("disabled",b===v.length-1);const oe=Math.round(W*100);he.title=`Betűméret csökkentése (Aᴀ) · Skála: ${oe}%`,ke.title=`Betűméret növelése (ᴀA) · Skála: ${oe}%`}const U=localStorage.getItem("kryst_reader_font_scale_idx");if(U!==null){const W=parseInt(U,10);!isNaN(W)&&W>=0&&W<v.length&&(b=W)}V(),he.addEventListener("click",W=>{W.stopPropagation(),b>0&&(b--,V(),(i.getState().mode==="read"||i.getState().mode==="read_listen")&&ln())}),ke.addEventListener("click",W=>{W.stopPropagation(),b<v.length-1&&(b++,V(),(i.getState().mode==="read"||i.getState().mode==="read_listen")&&ln())}),$e.addEventListener("click",W=>{W.stopPropagation(),S.style.display="none",g.style.display="none",F.style.display="none",de&&(de.style.display="none"),re&&re.style.display!=="none"&&Ci(!0),nt&&(nt=!1,Ft.style.display="none");const oe=i.getState();oe.mode==="map"?(i.mapEngine.resetZoom(),i.setMode("browse")):oe.mode==="read"||oe.mode==="read_listen"?i.handleContentTap():i.setMode("browse"),Ce()})}function Ss(){const v=document.getElementById("btn-toggle-orientation"),b=document.getElementById("orientation-icon"),V=document.getElementById("orientation-text");if(!v)return;const U=localStorage.getItem("kryst_reader_orientation");let W=!1;U==="landscape"?W=!0:U==="portrait"?W=!1:W=window.innerWidth>=880&&window.innerWidth>window.innerHeight;const oe=z=>{W=z,e.classList.toggle("layout-landscape",W),e.classList.toggle("layout-portrait",!W),b&&(b.textContent=W?"📱":"🖥️"),V&&(V.textContent=W?"Álló":"Fekvő"),v.setAttribute("title",W?"Váltás Álló (Mobil/Hüvelykujjas) nézetre":"Váltás Fekvő (Asztali/Egér/Panoráma) nézetre"),localStorage.setItem("kryst_reader_orientation",W?"landscape":"portrait");const fe=i.getState().mode;(fe==="read"||fe==="read_listen")&&ln(),pt.resize(),fe==="map"&&Se()};oe(W),v.addEventListener("click",z=>{z.stopPropagation(),oe(!W)})}function ii(v){let b=!1,V=0,U=0,W=!1,oe=0,z=0,fe=0,J=null;const Ue=ce=>{if(ce.pointerType!=="mouse"||ce.button!==0)return;const ve=ce.target;ve&&(ve.tagName==="INPUT"||ve.tagName==="TEXTAREA"||ve.isContentEditable)||(J!==null&&(cancelAnimationFrame(J),J=null),b=!0,W=!1,V=ce.clientY,U=v.scrollTop,oe=ce.clientY,z=performance.now(),fe=0,window.addEventListener("pointermove",Z),window.addEventListener("pointerup",L),window.addEventListener("pointercancel",L))},Z=ce=>{var me;if(!b)return;const ve=ce.clientY-V;if(!W&&Math.abs(ve)>5&&(W=!0,(me=window.getSelection())==null||me.removeAllRanges(),v.classList.add("is-dragging-scroll")),W){ce.preventDefault(),v.scrollTop=U-ve;const Xe=performance.now(),Ge=Xe-z;Ge>8&&(fe=(ce.clientY-oe)/Ge,oe=ce.clientY,z=Xe)}},L=ce=>{if(b)if(b=!1,window.removeEventListener("pointermove",Z),window.removeEventListener("pointerup",L),window.removeEventListener("pointercancel",L),W){const ve=me=>{me.stopPropagation(),me.preventDefault()};if(window.addEventListener("click",ve,{capture:!0,once:!0}),setTimeout(()=>{window.removeEventListener("click",ve,{capture:!0}),v.classList.remove("is-dragging-scroll")},50),Math.abs(fe)>.15){let me=fe;const Xe=()=>{Math.abs(me)>.03&&!b?(v.scrollTop-=me*14,me*=.92,J=requestAnimationFrame(Xe)):J=null};J=requestAnimationFrame(Xe)}W=!1}else v.classList.remove("is-dragging-scroll")};v.addEventListener("pointerdown",Ue)}function y(){ii(t),ii(T),ii(E),ii(I),ii(Kt);const v=(b,V)=>{b.addEventListener("wheel",U=>{V.contains(U.target)||(V.scrollTop+=U.deltaY,U.preventDefault())},{passive:!1})};v(S,T),v(g,E),v(F,I),v(Ft,Kt)}function N(v){if(v==="map"){p.innerHTML='<span class="btn-text">Vissza</span>',p.setAttribute("title",nt?"Visszatérés a hajszáloptikás térképre":"Térkép Alaphelyzet (Centrálás és 100% Zoom)"),R.innerHTML='<span class="btn-text">Térképtár</span>',R.setAttribute("title","Kartográfiai Térképtár Gyorslista"),Pe.innerHTML="−",Fe.innerHTML="+",Pe.setAttribute("title","Kicsinyítés (Zoom -) · Tartsd nyomva a folyamatos kicsinyítéshez"),Fe.setAttribute("title","Nagyítás (Zoom +) · Tartsd nyomva a folyamatos nagyításhoz");const b=i.getActiveMap(),V=i.mapEngine.getCurrentCoordinates();c.innerHTML='<span class="display-main-line">'+(b?b.title:"HAJSZÁLOPTIKÁS TÉRKÉP")+'</span><span class="display-sub-line">🧭 '+V+"</span>"}else{p.innerHTML='<span class="btn-text">Könyvjelzők</span>',p.setAttribute("title","Könyvjelzők és Jegyzetek Megnyitása"),R.innerHTML='<span class="btn-text">Fejezetek</span>',R.setAttribute("title","Fejezetválasztó Gyorslista"),Pe.innerHTML="◀",Fe.innerHTML="▶",Pe.setAttribute("title","Hátra Léptetés (Előző szó)"),Fe.setAttribute("title","Előre Léptetés (Következő szó)");const b=i.getActiveBook(),V=i.getState();if(b&&(v==="read"||v==="read_listen"||v==="audio_dream")){const U=b.chapters[V.activeChapterIndex],W=br(b.title,U?U.title:"Fejezet",V.activeChapterIndex);c.innerHTML='<span class="display-main-line">'+W.main+'</span><span class="display-sub-line">'+W.sub+"</span>"}else c.innerHTML='<span class="display-main-line">THE LET-LIBRARY MACHINE</span><span class="display-sub-line">v3.2 Master Console</span>';At.style.display="none",Ft.style.display="none",nt=!1}if(Ce(),te){const b=v==="read"||v==="read_listen"||v==="audio_dream";te.classList.toggle("disabled",!b)}}o.addEventListener("dblclick",v=>{i.getState().mode!=="map"&&(v.target.closest(".card-action-btn")||v.target.closest(".bookmark-modal-overlay")||i.handleContentTap())});let Y=null,H=null;function $(v){nt||i.getState().mode!=="map"||(_e(),v==="in"?i.mapEngine.zoomIn(.12):i.mapEngine.zoomOut(.12),Se(),Y=setTimeout(()=>{H=setInterval(()=>{v==="in"?i.mapEngine.zoomIn(.045):i.mapEngine.zoomOut(.045),Se()},35)},260))}function _e(){Y&&(clearTimeout(Y),Y=null),H&&(clearInterval(H),H=null),setTimeout(()=>{},40)}Pe.addEventListener("mousedown",v=>{i.getState().mode==="map"&&!nt&&(v.preventDefault(),$("out"))}),Pe.addEventListener("touchstart",v=>{i.getState().mode==="map"&&!nt&&(v.preventDefault(),$("out"))},{passive:!1}),Pe.addEventListener("click",v=>{if(v.stopPropagation(),nt){Kt.scrollBy({top:-120,behavior:"smooth"});return}if(i.getState().mode==="map")return;const b=Mr();i.stepBackward(b)&&ln()}),Fe.addEventListener("mousedown",v=>{i.getState().mode==="map"&&!nt&&(v.preventDefault(),$("in"))}),Fe.addEventListener("touchstart",v=>{i.getState().mode==="map"&&!nt&&(v.preventDefault(),$("in"))},{passive:!1}),Fe.addEventListener("click",v=>{if(v.stopPropagation(),nt){Kt.scrollBy({top:120,behavior:"smooth"});return}if(i.getState().mode==="map")return;const b=Sr();i.stepForward(b)&&ln()}),Pe.addEventListener("mouseup",_e),Pe.addEventListener("mouseleave",_e),Pe.addEventListener("touchend",_e),Pe.addEventListener("touchcancel",_e),Fe.addEventListener("mouseup",_e),Fe.addEventListener("mouseleave",_e),Fe.addEventListener("touchend",_e),Fe.addEventListener("touchcancel",_e),window.addEventListener("mouseup",_e),window.addEventListener("touchend",_e),Re.addEventListener("input",()=>{const v=parseInt(Re.value,10)/100;qe.textContent=`${Re.value}%`,i.setBgmVolume(v)}),Ze.addEventListener("input",()=>{const v=parseInt(Ze.value,10)/100;gt.textContent=`${Ze.value}%`,i.setVoiceVolume(v)}),Mt==null||Mt.addEventListener("input",()=>{const v=parseInt(Mt.value,10),b=Math.round((1+v*.01)*10)/10;mt&&(mt.textContent=v===0?"1.0×":`${b.toFixed(1)}×`),i.setPlaybackRate(b),e.style.setProperty("--reader-speed-scale",`${b}`)}),Mt==null||Mt.addEventListener("dblclick",()=>{Mt.value="0",mt&&(mt.textContent="1.0×"),i.setPlaybackRate(1),e.style.setProperty("--reader-speed-scale","1.0")}),te==null||te.addEventListener("click",v=>{v.stopPropagation(),!te.classList.contains("disabled")&&i.togglePlayPause()});function Ce(){if(!$e)return;S.style.display==="flex"||g.style.display==="flex"||F.style.display==="flex"?($e.classList.remove("disabled"),$e.setAttribute("title","Visszatérés a Bázisra (B - Basis)")):i.getState().mode==="browse"?($e.classList.add("disabled"),$e.setAttribute("title","Már a Letkristály Adattárban vagy (Basis)")):($e.classList.remove("disabled"),$e.setAttribute("title","Visszatérés a Letkristály Adattárba (B - Basis)"))}p.addEventListener("click",v=>{if(v.stopPropagation(),i.getState().mode==="map"){nt?Le():Oe();return}if(S.style.display==="flex"){S.style.display="none",Ce();return}g.style.display="none",F.style.display="none",bn(w.value),S.style.display="flex",Ce()}),R.addEventListener("click",v=>{if(v.stopPropagation(),i.getState().mode==="map"){if(F.style.display==="flex"){F.style.display="none",Ce();return}S.style.display="none",g.style.display="none",Er(),F.style.display="flex",Ce();return}if(g.style.display==="flex"){g.style.display="none",Ce();return}S.style.display="none",F.style.display="none",vs(),g.style.display="flex",Ce()}),[S,g,F].forEach(v=>{v.addEventListener("click",b=>b.stopPropagation()),v.addEventListener("dblclick",b=>b.stopPropagation()),v.addEventListener("mousedown",b=>b.stopPropagation()),v.addEventListener("touchstart",b=>b.stopPropagation(),{passive:!0})}),document.addEventListener("click",v=>{const b=v.target;!(b!=null&&b.closest(".scroll-voice-dropdown"))&&!(b!=null&&b.closest(".dream-stage-dropdown"))&&!(b!=null&&b.closest('[data-action="listen"]'))&&!(b!=null&&b.closest('[data-action="dream"]'))&&(document.querySelectorAll(".scroll-voice-dropdown, .dream-stage-dropdown").forEach(V=>V.remove()),document.querySelectorAll('[data-action="listen"].active-dropdown, [data-action="dream"].active-dropdown').forEach(V=>V.classList.remove("active-dropdown")))}),w.addEventListener("input",()=>{bn(w.value)}),C.addEventListener("click",()=>{const v=i.getActiveBook();if(!v){alert("Nincs aktív könyv betöltve.");return}const b=prompt("Könyvjelző elnevezése:");if(!b)return;const V=prompt("Személyes jegyzet a könyvjelzőhöz:")||"",U=i.guideEngine.getActiveWordIndex(),W=i.reflowEngine.getSnippetAt(U,16),oe=v.chapters[i.getState().activeChapterIndex];i.bookmarkEngine.addBookmark({bookId:v.id,chapterIndex:i.getState().activeChapterIndex,chapterTitle:oe?oe.title:"Fejezet",wordIndex:U,charOffset:U*6,quoteSnippet:W,title:b,note:V,audioTimestamp:i.audioMixer.getCurrentTime(),isAuto:!1}),bn(w.value)});function Se(){const v=i.mapEngine.getZoom(),b=i.mapEngine.getPan();rt.style.transform=`translate(${b.x}px, ${b.y}px) scale(${v})`}function Le(){nt&&(nt=!1,Ft.style.display="none",Pe.innerHTML="−",Fe.innerHTML="+",p.setAttribute("title","Térkép Alaphelyzet (Centrálás és 100% Zoom)"))}function Oe(){i.mapEngine.resetZoom(),rt.style.transition="transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)",Se(),setTimeout(()=>{rt.style.transition=""},360)}s.addEventListener("mousedown",v=>{nt||i.mapEngine.startDrag(v.clientX,v.clientY)}),window.addEventListener("mousemove",v=>{nt||(i.mapEngine.dragMove(v.clientX,v.clientY),Se())}),window.addEventListener("mouseup",()=>{i.mapEngine.endDrag()}),i.mapEngine.onTargetChanged((v,b,V,U)=>{const W=i.getActiveMap(),oe=v&&v.coordinates?v.coordinates:b;let z=W?W.title:"HAJSZÁLOPTIKÁS TÉRKÉP";v?z=v.name:V&&(z=`📍 ${V.name}`);const fe=U?` | 🏔️ ${U.name} (${U.range})`:"";if(c.innerHTML='<span class="display-main-line">'+z+'</span><span class="display-sub-line">🧭 '+oe+fe+"</span>",v)lt=v,xe=null,Gt.textContent=v.name,bt.textContent=v.dangerLevel||"Ismeretlen",en.innerHTML=jr(v.treasureNote||"Expedíciós navigációs pont."),v.treasureNote&&v.treasureNote.length>85?wt.style.display="flex":wt.style.display="none",At.style.display="flex";else if(V){lt=null,xe=V,Gt.textContent=V.name;const J=V.dangerRating===1?"Békés Terület":V.dangerRating===2?"Fokozott Óvatosság":V.dangerRating===3?"Halálos Veszély":"Misztikus Anomália";bt.textContent=`${J} (${V.dangerRating}/4)`,en.textContent=V.description||"Feltérképezett földrajzi vektorterület.",V.description&&V.description.length>85?wt.style.display="flex":wt.style.display="none",At.style.display="flex"}else U?(lt=null,xe=null,Gt.textContent=`🏔️ ${U.name}`,bt.textContent=`Tengerszint: ${U.range}`,en.textContent=U.tooltip,wt.style.display="none",At.style.display="flex"):(lt=null,xe=null,nt||(At.style.display="none"))}),on.addEventListener("click",v=>{var b;if(v.stopPropagation(),lt){nt=!0,O.textContent=lt.name,tn.textContent=`${lt.dangerLevel} · Szél: ${lt.windDirection||"Változó"} · ${lt.coordinates||""}`;const V=jr(lt.treasureNote||"Nincs rögzített expedíciós bejegyzés."),U=(b=lt.narrativeHook)!=null&&b.entryNarrativeText?`<p><strong>Belépési Narratíva:</strong> ${jr(lt.narrativeHook.entryNarrativeText)}</p>`:"";Tt.innerHTML=`
        <p><strong>Navigátori Napló:</strong> ${V}</p>
        ${U}
        <p>A hajszáloptikás célkereszt jelenleg pontosan a horgony rögzített koordinátájára fókuszál. A körzetben található mélységvonalak és áramlatok fokozott figyelmet követelnek a vitorlázattól.</p>
      `,Ft.style.display="flex",p.setAttribute("title","Visszatérés a hajszáloptikás térképre")}else if(xe){nt=!0;const V=xe.dangerRating===1?"Békés Terület":xe.dangerRating===2?"Fokozott Óvatosság":xe.dangerRating===3?"Halálos Veszély":"Misztikus Anomália";O.textContent=`📍 ${xe.name}`,tn.textContent=`Veszélyességi szint: ${V} (${xe.dangerRating}/4) · Elhatároló szín: ${xe.colorKey.toUpperCase()}`,Tt.innerHTML=`
        <p><strong>Földrajzi és Környezeti Leírás:</strong></p>
        <p>${xe.description||"Nincs rögzített részletes leírás ehhez a vektorterülethez."}</p>
        <p><em>Ez a terület a 4. (Láthatatlan Vektorozó) rétegen került elhatárolásra a térképészeti kánon szerint.</em></p>
      `,Ft.style.display="flex",p.setAttribute("title","Visszatérés a hajszáloptikás térképre")}}),Ft.addEventListener("dblclick",v=>{v.stopPropagation(),Le()});function je(v){return Math.hypot(v[0].clientX-v[1].clientX,v[0].clientY-v[1].clientY)}window.addEventListener("touchstart",v=>{v.touches.length===2?(Ye=je(v.touches),A=i.mapEngine.getZoom(),x=We,X=!!v.target.closest("#reader-lens-container")):v.touches.length===1&&i.getState().mode==="map"&&!nt&&v.target.closest("#view-map")&&i.mapEngine.startDrag(v.touches[0].clientX,v.touches[0].clientY)},{passive:!1}),window.addEventListener("touchmove",v=>{if(v.touches.length===2&&Ye>0){const V=je(v.touches)/Ye;X&&i.getState().mode==="map"&&!nt?(i.mapEngine.setZoom(A*V),Se()):X||(We=Math.max(.65,Math.min(1.4,x*V)),e.style.transform=`scale(${We})`),v.preventDefault()}else v.touches.length===1&&i.getState().mode==="map"&&!nt&&(i.mapEngine.dragMove(v.touches[0].clientX,v.touches[0].clientY),Se())},{passive:!1}),window.addEventListener("touchend",v=>{v.touches.length<2&&(Ye=0),v.touches.length===0&&i.getState().mode==="map"&&i.mapEngine.endDrag()}),i.onStateChange(v=>{S.style.display="none",g.style.display="none",F.style.display="none",t.style.display=v.mode==="browse"?"flex":"none",n.style.display=v.mode==="read"||v.mode==="read_listen"?"flex":"none",r.style.display=v.mode==="audio_dream"?"block":"none",s.style.display=v.mode==="map"?"block":"none",N(v.mode),te&&Ae&&(v.isPlaying?(Ae.textContent="⏸",te.classList.remove("is-paused"),te.setAttribute("title","Szüneteltetés (Kísérő szinkron és animációk megállítása)")):(Ae.textContent="▶",te.classList.add("is-paused"),te.setAttribute("title","Folytatás (Kísérő szinkron és animációk indítása)"))),(v.mode==="read"||v.mode==="read_listen")&&ln(),v.mode==="map"&&i.getActiveMap()?(Ht.src=i.getActiveMap().imageUrl,Se(),i.mapEngine.evaluateTarget(),ut(i.getActiveMap())):$n(),ac(),Nt(v.mode)}),i.guideEngine.onWordFocus(v=>{a.querySelectorAll(".word-token:not(.invisible-line-filler)").forEach(V=>{const U=V;parseInt(U.dataset.index||"-1",10)===v?(U.classList.add("focused"),U.style.transform="scale(1.15)"):(U.classList.remove("focused"),U.style.transform="")})}),i.guideEngine.onPageTurn(()=>{ln()}),window.addEventListener("keydown",v=>{const b=v.target;if(!(b&&(b.tagName==="INPUT"||b.tagName==="TEXTAREA"||b.isContentEditable))&&(v.key==="Backspace"||v.key==="Escape")){if(re&&re.style.display==="flex"){v.preventDefault(),Ci(!0);return}if(de&&de.style.display==="flex"){v.preventDefault(),de.style.display="none";return}if(S.style.display==="flex"){v.preventDefault(),S.style.display="none",Ce();return}if(g.style.display==="flex"){v.preventDefault(),g.style.display="none",Ce();return}if(F.style.display==="flex"){v.preventDefault(),F.style.display="none",Ce();return}i.getState().mode==="map"&&(v.preventDefault(),nt?Le():Oe())}}),window.addEventListener("resize",()=>{(i.getState().mode==="read"||i.getState().mode==="read_listen")&&ln()});const st=document.getElementById("map-route-svg-overlay"),De=document.getElementById("mapbook-route-hud"),et=document.getElementById("mapbook-stage-select"),xt=document.getElementById("btn-mapbook-play-route"),yt=document.getElementById("btn-mapbook-prev-stage"),_t=document.getElementById("btn-mapbook-next-stage"),Pt=document.getElementById("mapbook-route-status"),Ne=document.getElementById("mapbook-cut-effect-overlay");let St=[],it=0,cn=null,Dt=!1;function $n(){cn!==null&&(cancelAnimationFrame(cn),cn=null),Dt=!1,xt&&(xt.textContent="▶ 2D Utazás")}function hn(v){if(!st)return;const b=i.getActiveMap();if(!b){st.innerHTML="";return}let V="";if(St.forEach((U,W)=>{const oe=W===it,z=U.fromAnchor.xPercent,fe=U.fromAnchor.yPercent,J=U.toAnchor.xPercent,Ue=U.toAnchor.yPercent,Z=(z+J)/2,L=(fe+Ue)/2-3.5;V+=`<path d="M ${z} ${fe} Q ${Z} ${L} ${J} ${Ue}" fill="none" stroke="${oe?"#fbbf24":"rgba(56, 189, 248, 0.55)"}" stroke-width="${oe?"0.65":"0.38"}" stroke-dasharray="${oe?"1.2 0.6":"0.8 0.8"}" />`}),b.anchors.forEach(U=>{V+=`<circle cx="${U.xPercent}" cy="${U.yPercent}" r="0.85" fill="#0f172a" stroke="#f59e0b" stroke-width="0.28" />`}),v){const U=1.2+v.progress%.25*5;V+=`<circle cx="${v.x}" cy="${v.y}" r="${U.toFixed(2)}" fill="none" stroke="rgba(251, 191, 36, 0.65)" stroke-width="0.22" />`,V+=`<text x="${v.x}" y="${v.y}" text-anchor="middle" dominant-baseline="central" font-size="3.6">${v.emoji}</text>`}else if(St[it]){const U=St[it];V+=`<text x="${U.fromAnchor.xPercent}" y="${U.fromAnchor.yPercent}" text-anchor="middle" dominant-baseline="central" font-size="3.1">${U.vehicleEmoji}</text>`}st.innerHTML=V}function Tn(v){if($n(),v<0||v>=St.length)return;it=v,et&&(et.value=String(v));const b=St[v];Dt=!0,xt&&(xt.textContent="⏹ Állj"),Pt&&(Pt.textContent=`${b.vehicleEmoji} ${b.fromAnchor.name} → ${b.toAnchor.name} (${b.bgMusicCue})`),hl(b.sfxCue),Ne&&(Ne.textContent=`✦ ${b.vehicleEmoji} ${b.fromAnchor.name} ➔ ${b.toAnchor.name} ✦`,Ne.classList.add("active"),setTimeout(()=>{Ne.classList.remove("active")},480)),Gt.textContent=`${b.vehicleEmoji} ${b.stageNumber}. Útszakasz: ${b.fromAnchor.name} → ${b.toAnchor.name}`,bt.textContent=`${b.vehicleLabel} · 🎵 ${b.bgMusicCue}`,en.innerHTML=jr(b.narrationText),At.style.display="flex";const V=b.narrationText.replace(/[😤🤫😂⚡🌊🤔😨👑😢🔥🎶⚓]/gu,"").trim();V&&ea(V,"ferenc",()=>{},()=>{});const U=Math.max(2e3,b.durationSec*1e3),W=performance.now(),oe=b.fromAnchor.xPercent,z=b.fromAnchor.yPercent,fe=b.toAnchor.xPercent,J=b.toAnchor.yPercent,Ue=(oe+fe)/2,Z=(z+J)/2-3.5,L=ce=>{if(!Dt)return;const ve=Math.min(1,(ce-W)/U),me=1-ve,Xe=me*me*oe+2*me*ve*Ue+ve*ve*fe,Ge=me*me*z+2*me*ve*Z+ve*ve*J;hn({x:Xe,y:Ge,emoji:b.vehicleEmoji,progress:ve}),ve<1?cn=requestAnimationFrame(L):(Dt=!1,cn=null,hl("ship_bell_toll"),xt&&(xt.textContent="▶ 2D Utazás"),Pt&&(Pt.textContent=`⚓ Megérkezés: ${b.toAnchor.name}`))};cn=requestAnimationFrame(L)}function ut(v){if($n(),St=ul(v),it=0,!(!De||!et)){if(St.length===0){De.style.display="none",hn();return}De.style.display="flex",et.innerHTML=St.map((b,V)=>`<option value="${V}">${b.stageNumber}. ${b.vehicleEmoji} ${b.fromAnchor.name} → ${b.toAnchor.name}</option>`).join(""),Pt&&(Pt.textContent=`${St.length} gráfpont-útszakasz`),hn()}}et==null||et.addEventListener("change",v=>{v.stopPropagation(),it=parseInt(et.value||"0",10)||0,hn()}),xt==null||xt.addEventListener("click",v=>{v.stopPropagation(),Dt?$n():Tn(it)}),yt==null||yt.addEventListener("click",v=>{if(v.stopPropagation(),St.length===0)return;const b=(it-1+St.length)%St.length;Tn(b)}),_t==null||_t.addEventListener("click",v=>{if(v.stopPropagation(),St.length===0)return;const b=(it+1)%St.length;Tn(b)}),[De].forEach(v=>{v==null||v.addEventListener("mousedown",b=>b.stopPropagation()),v==null||v.addEventListener("touchstart",b=>b.stopPropagation(),{passive:!0}),v==null||v.addEventListener("click",b=>b.stopPropagation())});async function kt(v=!1){try{const{maps:b,books:V,abrigoOverride:U}=await Jm();if(U){const W=Ct.findIndex(oe=>oe.id==="canon_map_abrigo_master"||oe.id===U.id);W>=0?Ct[W]=U:Ct.unshift(U)}b.forEach(W=>{const oe=Ct.findIndex(z=>z.id===W.id);oe>=0?Ct[oe]=W:Ct.unshift(W)}),V.forEach(W=>{const oe=Rt.findIndex(z=>z.id===W.id);oe>=0?Rt[oe]=W:Rt.unshift(W)}),qt(),v&&D&&(D.textContent=`💿 OPFS Monk Virtuális Lemez szinkronizálva (${Rt.length} könyv · ${Ct.length} térkép)`)}catch(b){console.warn("OPFS Monk Lemez szinkron figyelmeztetés:",b)}}function fn(){const v=document.getElementById("ecosystem-file-input"),b=document.getElementById("btn-import-ecosystem-file"),V=document.getElementById("btn-sync-monk-disk");if(b==null||b.addEventListener("click",U=>{U.stopPropagation(),v==null||v.click()}),v==null||v.addEventListener("change",async U=>{var oe;const W=(oe=U.target.files)==null?void 0:oe[0];if(W){try{const z=await Zm(W);if(z.map){const fe=Ct.findIndex(J=>J.id===z.map.id);fe>=0?Ct[fe]=z.map:Ct.unshift(z.map)}if(z.book){const fe=Rt.findIndex(J=>J.id===z.book.id);fe>=0?Rt[fe]=z.book:Rt.unshift(z.book)}qt(),z.map?i.loadMap(z.map):z.book&&(i.loadBook(z.book,0,0),i.setMode("read"))}catch(z){alert((z==null?void 0:z.message)||"Hiba a fájl beolvasásakor.")}v.value=""}}),V==null||V.addEventListener("click",U=>{U.stopPropagation(),kt(!0)}),typeof BroadcastChannel<"u")try{const U=new BroadcastChannel("kryst_ecosystem_bridge");U.onmessage=()=>{kt(!0)}}catch{}kt(!1)}function ft(v){if(window.parent&&window.parent!==window)try{window.parent.postMessage(v,"*")}catch{}if(window.opener&&!window.opener.closed)try{window.opener.postMessage(v,"*")}catch{}}function Nt(v){if(v==="map"){const b=i.getActiveMap();ft({type:"KRYST_ACTIVE_LIBRARY_ITEM_CHANGED",mode:v,descriptor:b?{itemType:"map",libraryKey:b.libraryKey||b.id,id:b.id,title:b.title,fileId:b.fileId,isUserOwned:!!b.isUserOwned,isPendingPapat:!!b.isPendingPapat}:null});return}if(v==="read"||v==="read_listen"||v==="audio_dream"){const b=i.getActiveBook();ft({type:"KRYST_ACTIVE_LIBRARY_ITEM_CHANGED",mode:v,descriptor:b?{itemType:b.sourceKind||b.type||"book",libraryKey:b.libraryKey||b.id,id:b.id,title:b.title,author:b.author,copyCode:b.copyCode,scrollToken:b.scrollToken,logId:b.logId,downloadLink:b.downloadLink,workId:b.workId,isUserOwned:!!b.isUserOwned}:null});return}ft({type:"KRYST_ACTIVE_LIBRARY_ITEM_CHANGED",mode:v,descriptor:null})}function vn(v,b,V){let U=String(v||"");const W=[],oe=new Set,z=Z=>{if(!V||!Z)return null;if(V[Z])return V[Z];const L=Z.split("/").pop()||Z;if(V[L])return V[L];const ce=L.replace(/\.[^/.]+$/,"")+".png";return V[ce]?V[ce]:null};if(V&&Object.keys(V).length>0&&U)for(const[Z,L]of Object.entries(V))L&&(U=U.split(`Images/${Z}`).join(L),U=U.split(`"${Z}"`).join(`"${L}"`));let fe=[];if(U.trim()){const L=new DOMParser().parseFromString(U,"text/html");L.body&&(L.body.querySelectorAll("img").forEach(ve=>{let me=String(ve.getAttribute("src")||"").trim();const Xe=z(me);Xe&&(me=Xe),me&&(me.indexOf("data:image/")!==0&&me.indexOf("http://")!==0&&me.indexOf("https://")!==0||oe.has(me)||(oe.add(me),W.push({src:me,alt:String(ve.getAttribute("alt")||"Illusztráció").trim()||"Illusztráció"})))}),fe=Array.from(L.body.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, blockquote")).map(ve=>(ve.textContent||"").replace(/\s+/g," ").trim()).filter(ve=>ve.length>0),fe.length===0&&(fe=(L.body.textContent||b||"").trim().split(/\n+/).map(me=>me.replace(/\s+/g," ").trim()).filter(me=>me.length>0)))}else b&&(fe=String(b).split(/\n+/).map(Z=>Z.replace(/\s+/g," ").trim()).filter(Z=>Z.length>0));fe.length===0&&(fe=W.length>0?["(Illusztrált fejezet — nyisd meg a jobb alsó 🖼️ gombot a képekhez.)"]:["(Üres fejezet)"]);const J=[];let Ue=0;for(const Z of fe){const L=Z.match(/[^.!?…]+[.!?…]*|[^.!?…]+/g)||[Z];for(const ce of L){const ve=ce.trim();ve&&(J.push({text:ve,startSec:Ue*4,endSec:(Ue+1)*4,speakerId:"narrator"}),Ue++)}}return J.length===0&&J.push({text:fe[0],startSec:0,endSec:4,speakerId:"narrator"}),{paragraphs:fe,tokens:J,images:W}}function tr(v){var U;if(!se||!Ee||P.length===0)return;const b=Math.max(0,Math.min(v,P.length-1)),V=P[b];if(se.src=V.src,se.alt=V.alt||"Illusztráció",Te){const W=((U=i.getActiveBook())==null?void 0:U.title)||"Kötet";Te.textContent=`🖼️ ${W} (${b+1}/${P.length})${V.alt?" · "+V.alt:""}`}Ee.innerHTML="",P.forEach((W,oe)=>{const z=document.createElement("button");z.type="button",z.className="chapter-media-thumb-btn"+(oe===b?" active":""),z.title=W.alt||`Kép #${oe+1}`,z.innerHTML=`<img src="${W.src}" alt="${(W.alt||"").replace(/"/g,"&quot;")}">`,z.addEventListener("click",fe=>{fe.stopPropagation(),tr(oe)}),Ee.appendChild(z)})}function ac(){const v=i.getState(),b=i.getActiveBook(),V=[],U=new Set;if(b&&(v.mode==="read"||v.mode==="read_listen")){b.coverUrl&&(U.add(b.coverUrl),V.push({src:b.coverUrl,alt:"Borító"}));const W=b.chapters[v.activeChapterIndex];W&&Array.isArray(W.images)&&W.images.forEach(oe=>{oe&&oe.src&&!U.has(oe.src)&&(U.add(oe.src),V.push(oe))})}P=V,pe&&ae&&(V.length>0&&(v.mode==="read"||v.mode==="read_listen")?(ae.textContent=String(V.length),pe.style.display="inline-flex"):(pe.style.display="none",de&&(de.style.display="none")))}function oc(){pe==null||pe.addEventListener("click",v=>{v.stopPropagation(),!(P.length===0||!de)&&(tr(0),de.style.display="flex")}),ie==null||ie.addEventListener("click",v=>{v.stopPropagation(),de&&(de.style.display="none")}),de==null||de.addEventListener("contextmenu",v=>(v.preventDefault(),!1)),de==null||de.addEventListener("click",v=>v.stopPropagation()),de==null||de.addEventListener("dblclick",v=>v.stopPropagation())}function yi(v,b,V,U){re&&(be&&(be.textContent=v),ye&&(ye.textContent=b),ee&&(ee.textContent=U?"⚠️":"💎",ee.style.animation=U?"none":"krystPulseGlow 1.3s ease-in-out infinite"),Me&&(Me.style.display="inline-flex"),re.style.display="flex")}function Ci(v=!1){Ve&&(clearTimeout(Ve),Ve=null),re&&(re.style.display="none"),v&&(Je=null,ge=null,ze=null)}function lc(v){try{const b=String(v||"").replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/,"").trim();if(!b||b.length<32)return null;const V=atob(b),U=new Uint8Array(V.length);for(let W=0;W<V.length;W++)U[W]=V.charCodeAt(W);return U.buffer}catch{return null}}async function Kn(v,b,V,U,W=0,oe=0){if(v.inPlay)return;if(!v.needsHydration&&v.chapters&&v.chapters.length>0){b==="listen"?await i.playBookWithVoice(v,V||"ferenc",oe,J=>{const Ue=c.querySelector(".display-main-line"),Z=c.querySelector(".display-sub-line");Ue&&Z&&(Ue.textContent=v.title.toUpperCase(),Z.textContent=J)}):b==="dream"?(i.loadBook(v,W,oe),i.setMode(U==="stage_3d"?"audio_dream":"read_listen"),i.togglePlayPause()):(i.loadBook(v,W,oe),i.setMode("read")),Nt(i.getState().mode);return}const z=String(v.libraryKey||v.id),fe={itemType:v.sourceKind||v.type||"book",libraryKey:z,id:v.id,title:v.title,author:v.author,copyCode:v.copyCode,scrollToken:v.scrollToken,logId:v.logId,downloadLink:v.downloadLink,workId:v.workId};Ve&&(clearTimeout(Ve),Ve=null),Je=z,ge=fe,ze={openMode:b,voiceId:V,dreamChoice:U,chapterIndex:W,wordIndex:oe},yi("LETkristály kiolvasása...",`«${v.title}» betöltése az OPFS gyorsítótárból / P2P & Drive tárhelyről...`,!0,!1),Ve=setTimeout(()=>{Je===z&&yi("⏳ Lassú kapcsolat / P2P letöltés",`«${v.title}» tartalma még nem érkezett meg. Megnyithatod közvetlenül a B-verzióban (klasszikus olvasóban), vagy várhatsz tovább.`,!0,!0)},18e3),ft({type:"KRYST_REQUEST_LIBRARY_ITEM_CONTENT",requestKey:z,descriptor:fe})}async function ri(v,b="map"){if(!v.needsHydration&&v.imageUrl){if(b==="ebook"){const W=us(v);i.loadBook(W,0,0),i.setMode("read")}else if(b==="audiobook"){const W=us(v);await i.playBookWithVoice(W,"ferenc",0)}else i.loadMap(v);Nt(i.getState().mode);return}const V=String(v.libraryKey||v.id),U={itemType:"map",libraryKey:V,id:v.id,title:v.title,fileId:v.fileId,rowIndex:v.rowIndex,isPendingPapat:!!v.isPendingPapat};Ve&&(clearTimeout(Ve),Ve=null),Je=V,ge=U,ze={openMode:b==="ebook"?"read":b==="audiobook"?"listen":"map",voiceId:b==="audiobook"?"ferenc":void 0},yi("Térkép betöltése a Fényasztalra...",`«${v.title}» betöltése az OPFS gyorsítótárból / Drive-ról...`,!0,!1),Ve=setTimeout(()=>{Je===V&&yi("⏳ Lassú térkép-betöltés",`«${v.title}» még nem érkezett meg. Megnyithatod a B-verzióban (klasszikus képnézőben), vagy várhatsz tovább.`,!0,!0)},18e3),ft({type:"KRYST_REQUEST_LIBRARY_ITEM_CONTENT",requestKey:V,descriptor:U})}function Tr(v,b,V){const W=(Array.isArray(b==null?void 0:b.chapters)&&b.chapters.length>0?b.chapters:b!=null&&b.bodyHtml?[{id:"ch_001",order:1,title:(b==null?void 0:b.title)||"1. Fejezet",html:b.bodyHtml}]:[]).map((oe,z)=>{const fe=String(oe.title||`${z+1}. Fejezet`),J=vn(String(oe.html||oe.content||""),oe.plainText?String(oe.plainText):void 0,b==null?void 0:b.embeddedImages);return{id:String(oe.id||`ch_${z+1}`),index:z,title:fe,paragraphs:J.paragraphs,tokens:J.tokens,images:J.images.length>0?J.images:void 0}});if(W.length===0){const oe="A kézirat tartalma az OPFS Monk Lemezről töltődik...";W.push({id:"ch_001",index:0,title:String((b==null?void 0:b.title)||"Kézirat"),paragraphs:[oe],tokens:[{text:oe,startSec:0,endSec:4,speakerId:"narrator"}]})}return{id:String((b==null?void 0:b.basicCode)||v),libraryKey:`monastery:${v}`,sourceKind:"monastery",workId:String(v),title:`${V?"🗑️ ":""}${String((b==null?void 0:b.title)||v)}`,author:String((b==null?void 0:b.authorName)||(b==null?void 0:b.author)||"Kalóz Szerző"),type:V?"scroll":(b==null?void 0:b.status)==="PUBLISHED_PRIORI"||b!=null&&b.basicCode?"crystal_book":"scroll",coverUrl:b!=null&&b.coverDataUrl?String(b.coverDataUrl):void 0,chapters:W,hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc"}}function Ms(v){if(!v||typeof v!="object")return;const b=new Map;Rt.forEach(L=>{L.id&&b.set(L.id,L),L.libraryKey&&b.set(L.libraryKey,L)});const V=new Map;Ct.forEach(L=>{L.id&&V.set(L.id,L),L.libraryKey&&V.set(L.libraryKey,L),L.fileId&&V.set(`map:${L.fileId}`,L)});const U=[],W=new Set,oe=L=>{const ce=L.libraryKey&&b.get(L.libraryKey)||b.get(L.id);return ce&&!ce.needsHydration&&ce.chapters&&ce.chapters.length>0&&L.needsHydration?{...L,coverUrl:ce.coverUrl||L.coverUrl,chapters:ce.chapters,cachedInOpfs:!0,needsHydration:!1}:L};Array.isArray(v.pendingMonasteryWorks)&&v.pendingMonasteryWorks.forEach(L=>{var Yt,pn;if(!L||!L.workId)return;const ce=String(L.workId),ve=`monastery:${ce}`;if(W.has(ve))return;W.add(ve);const me=Array.isArray((Yt=L.krystVault)==null?void 0:Yt.previewChapters)?L.krystVault.previewChapters:[],Ge=me.length>0?Tr(ce,{title:L.title,authorName:L.author||L.authorEmail,status:L.status,coverDataUrl:(pn=L.krystVault)==null?void 0:pn.coverDataUrl,chapters:me},!!L.isAntipat):{id:ce,libraryKey:ve,sourceKind:"monastery",workId:ce,title:`${L.isAntipat?"🗑️ ":""}${String(L.title||ce)}`,author:String(L.author||L.authorEmail||"Kalóz Szerző"),type:L.isAntipat?"scroll":"crystal_book",chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",needsHydration:!0};Ge.libraryKey=ve,Ge.sourceKind="monastery",Ge.isUserOwned=!0,Ge.statusLabel=String(L.status||""),Ge.cachedInOpfs=!Ge.needsHydration||!!L.cachedInOpfs,U.push(oe(Ge))}),Array.isArray(v.books)&&v.books.forEach(L=>{var Ge,Yt;if(!L)return;const ce=String(L.downloadLink||L.krystWorkId||L.title||""),ve=String(L.krystWorkId||L.downloadLink||""),me=`book:${ce}`;if(W.has(me))return;W.add(me);const Xe={id:ve||ce,libraryKey:me,sourceKind:"book",isUserOwned:!0,downloadLink:String(L.downloadLink||""),workId:ve,title:String(L.title||"Névtelen Könyv"),author:String(L.author||"Ismeretlen"),type:"crystal_book",coverUrl:(Ge=L.krystVault)!=null&&Ge.coverDataUrl?String(L.krystVault.coverDataUrl):void 0,chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!!L.cachedInOpfs,needsHydration:!0};if(Array.isArray((Yt=L.krystVault)==null?void 0:Yt.previewChapters)&&L.krystVault.previewChapters.length>0){const pn=Tr(Xe.id,{workId:Xe.id,basicCode:L.downloadLink,title:L.title,authorName:L.author,status:"PUBLISHED_PRIORI",coverDataUrl:L.krystVault.coverDataUrl,chapters:L.krystVault.previewChapters},!1);Xe.chapters=pn.chapters,Xe.needsHydration=!1,Xe.cachedInOpfs=!0}U.push(oe(Xe))}),Array.isArray(v.copies)&&v.copies.forEach(L=>{var Xe,Ge;if(!L)return;const ce=String(L.code||""),ve=`copy:${ce||L.title}`;if(W.has(ve))return;W.add(ve);const me={id:`copy_${ce||L.title}`,libraryKey:ve,sourceKind:"copy",isUserOwned:!0,inPlay:!!L.inPlay,copyCode:ce,workId:String(L.krystWorkId||(ce.length>=6?ce.substring(0,6):"")),title:String(L.title||"Névtelen Másolat"),author:String(L.author||"Ismeretlen"),type:"copy",coverUrl:(Xe=L.krystVault)!=null&&Xe.coverDataUrl?String(L.krystVault.coverDataUrl):void 0,chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!!L.cachedInOpfs,needsHydration:!0};if(Array.isArray((Ge=L.krystVault)==null?void 0:Ge.previewChapters)&&L.krystVault.previewChapters.length>0){const Yt=Tr(me.id,{workId:me.id,title:L.title,authorName:L.author,status:"PUBLISHED_PRIORI",coverDataUrl:L.krystVault.coverDataUrl,chapters:L.krystVault.previewChapters},!1);me.chapters=Yt.chapters,me.type="copy",me.needsHydration=!1,me.cachedInOpfs=!0}U.push(oe(me))}),Array.isArray(v.scrolls)&&v.scrolls.forEach(L=>{if(!L)return;const ce=String(L.token||`${L.title}_${L.fejezet}`),ve=`scroll:${ce}`;if(W.has(ve))return;W.add(ve);const me={id:`scroll_${ce}`,libraryKey:ve,sourceKind:"scroll",isUserOwned:!0,scrollToken:String(L.token||""),copyCode:String(L.copyCode||""),workId:String(L.krystWorkId||""),chapterLabel:String(L.fejezet||""),title:`${String(L.title||"Tekercs")} — ${String(L.fejezet||"")}`,author:String(L.author||"Tekercsmester"),type:"scroll",chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!!L.cachedInOpfs,needsHydration:!0};U.push(oe(me))}),Array.isArray(v.logs)&&v.logs.forEach(L=>{if(!L||!L.id)return;const ce=String(L.id),ve=`log:${ce}`;if(W.has(ve))return;W.add(ve);const me={id:`log_${ce}`,libraryKey:ve,sourceKind:"log",isUserOwned:!0,logId:ce,chapterLabel:`Napló ID: ${ce}`,title:String(L.name||`Hajónapló (${ce})`),author:"Hajónapló Archívum",type:"scroll",chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!!L.cachedInOpfs,needsHydration:!0};U.push(oe(me))});const z=[],fe=new Set;[...Array.isArray(v.maps)?v.maps.map(L=>({...L,_pendingPapat:!1})):[],...Array.isArray(v.pendingMaps)?v.pendingMaps.map(L=>({...L,_pendingPapat:!0})):[]].forEach(L=>{if(!L||!L.fileId&&!L.identifier)return;const ce=String(L.fileId||L.identifier),ve=`map:${ce}`;if(fe.has(ve))return;fe.add(ve);const me=V.get(ve)||V.get(`map_${ce}`);if(me&&!me.needsHydration&&me.imageUrl){z.push({...me,libraryKey:ve,isUserOwned:!0,cachedInOpfs:!0,needsHydration:!1,isPendingPapat:!!L._pendingPapat});return}const Xe=String(L.identifier||ce),Ge=L.date?new Date(L.date).toLocaleDateString("hu-HU"):"";z.push({id:`map_${ce}`,libraryKey:ve,fileId:String(L.fileId||""),isUserOwned:!0,cachedInOpfs:!!L.cachedInOpfs,needsHydration:!L.cachedImageUrl,uploadedAt:Ge,status:String(L.status||(L._pendingPapat?"elbírálás alatt":"feltöltve")),rowIndex:typeof L.rowIndex=="number"?L.rowIndex:void 0,isPendingPapat:!!L._pendingPapat,title:L._pendingPapat?`⚜️ ${Xe}`:Xe,imageUrl:L.cachedImageUrl?String(L.cachedImageUrl):"",description:L._pendingPapat?`Feltöltő: ${L.email||"Kalóz"} (Papát elbírálásra vár)`:Ge?`Saját hajózási térkép · Feltöltve: ${Ge}`:"Saját hajózási térkép",anchors:Array.isArray(L.anchors)?L.anchors:[]})});const Ue=Rt.filter(L=>!L.isUserOwned&&!(L.libraryKey&&W.has(L.libraryKey)));Rt.splice(0,Rt.length,...U,...Ue);const Z=Ct.filter(L=>!L.isUserOwned&&!(L.libraryKey&&fe.has(L.libraryKey)));Ct.splice(0,Ct.length,...z,...Z),we=!0,qt()}function cc(){let v="";const b=new URLSearchParams(window.location.search),V=b.get("workId")||"",U=b.get("trash")==="1";oc(),Be==null||Be.addEventListener("click",z=>{z.stopPropagation(),Ci(!0)}),Me==null||Me.addEventListener("click",z=>{z.stopPropagation(),ge&&ft({type:"KRYST_FALLBACK_TO_LEGACY_READER",descriptor:ge,reason:"user_fallback"}),Ci(!0)});const W=z=>{var me;const fe=String((z==null?void 0:z.workId)||((me=z==null?void 0:z.bookPackage)==null?void 0:me.workId)||V||"").trim();if(!fe)return;const J=(z==null?void 0:z.bookPackage)||null;if(!J)return;const Ue=Array.isArray(J.chapters)?J.chapters:[],Z=Ue.reduce((Xe,Ge)=>Xe+String(Ge.html||Ge.content||Ge.plainText||"").length,0),L=`${fe}::${J.updatedAt||""}::${Ue.length}::${String(J.bodyHtml||"").length}::${Z}`;if(L===v)return;v=L;const ce=Tr(fe,J,U);ce.isUserOwned=!0,ce.cachedInOpfs=!0,ce.needsHydration=!1;const ve=Rt.findIndex(Xe=>Xe.id===ce.id||ce.libraryKey&&Xe.libraryKey===ce.libraryKey);ve>=0?Rt[ve]=ce:Rt.unshift(ce),qt(),i.loadBook(ce,0,0),i.setMode("read"),D&&(D.textContent=`📖 OPFS Kézirat megnyitva: ${ce.title} (${ce.chapters.length} fejezet)`)},oe=async z=>{const fe=String((z==null?void 0:z.requestKey)||(z==null?void 0:z.libraryKey)||"");if(Ve&&(clearTimeout(Ve),Ve=null),!(z!=null&&z.success)||z!=null&&z.error){const me=String((z==null?void 0:z.error)||"A LETkristály tartalma jelenleg nem érhető el (pl. P2P letöltés vagy hálózati hiba).");z!=null&&z.descriptor&&(ge=z.descriptor),yi("Hiba a LETkristály betöltésekor",`${me} Megpróbálhatod megnyitni a B-verzióban (klasszikus olvasóban).`,!0,!0);return}const J=Je===fe&&ze?ze:{openMode:z.itemKind==="map"?"map":"read"};if(z.itemKind==="map"){const me=String(z.imageUrl||z.dataUrl||"").trim();if(!me){yi("Üres térkép adat","A térképadat nem tartalmazott megjeleníthető képet.",!0,!0);return}const Xe=me.indexOf("data:image")===0||me.indexOf("http")===0?me:`data:image/png;base64,${me}`;let Ge=Ct.find(Ke=>fe&&Ke.libraryKey===fe||z.id&&Ke.id===z.id||z.fileId&&Ke.fileId===z.fileId);Ge?Ge.imageUrl=Xe:(Ge={id:String(z.id||`map_${z.fileId||Date.now()}`),libraryKey:fe||`map:${z.fileId||Date.now()}`,fileId:z.fileId?String(z.fileId):void 0,isUserOwned:!0,title:String(z.title||"Hajózási Térkép"),imageUrl:Xe,description:String(z.description||"Felhasználói térkép a LETkristály Adattárból"),anchors:[]},Ct.unshift(Ge));const Yt=lc(Xe);if(Yt){const Ke=sc(Yt,Xe);Ke&&(Array.isArray(Ke.anchors)&&Ke.anchors.length>0&&(Ge.anchors=Ke.anchors),Ke.baseMapGeometry&&(Ge.baseMapGeometry=Ke.baseMapGeometry),Ke.elevationLayer&&(Ge.elevationLayer=Ke.elevationLayer),Ke.vectorZoneLayer&&(Ge.vectorZoneLayer=Ke.vectorZoneLayer),Ke.narrativeLayer&&(Ge.narrativeLayer=Ke.narrativeLayer),Ke.expeditionState&&(Ge.expeditionState=Ke.expeditionState),Ke.hierarchy&&(Ge.hierarchy=Ke.hierarchy),Ke.canonicalWorldGate&&(Ge.canonicalWorldGate=Ke.canonicalWorldGate),Ke.description&&(Ge.description=Ke.description))}Ge.cachedInOpfs=!0,Ge.needsHydration=!1,qt(),Ci(!0);const pn=J.openMode==="read"?"ebook":J.openMode==="listen"?"audiobook":"map";await ri(Ge,pn);return}const Ue=z.embeddedImages&&typeof z.embeddedImages=="object"?z.embeddedImages:void 0;let Z;if(z.coverDataUrl){const me=String(z.coverDataUrl).trim();Z=me.indexOf("data:")===0||me.indexOf("http")===0?me:`data:image/png;base64,${me}`}const ce=(Array.isArray(z.chapters)&&z.chapters.length>0?z.chapters:z.htmlContent?[{id:"ch_001",title:z.chapterLabel||z.title||"1. Fejezet",html:String(z.htmlContent)}]:[]).map((me,Xe)=>{const Ge=vn(String(me.html||me.content||""),me.plainText?String(me.plainText):void 0,Ue);return{id:String(me.id||`ch_${Xe+1}`),index:Xe,title:String(me.title||`${Xe+1}. Fejezet`),paragraphs:Ge.paragraphs,tokens:Ge.tokens,images:Ge.images.length>0?Ge.images:void 0}});if(ce.length===0){yi("Üres tartalom","A kért LETkristály nem tartalmazott olvasható fejezetet.",!0,!0);return}let ve=Rt.find(me=>fe&&me.libraryKey===fe||z.id&&me.id===z.id);ve?(ve.chapters=ce,Z&&(ve.coverUrl=Z),ve.cachedInOpfs=!0,ve.needsHydration=!1):(ve={id:String(z.id||fe||`item_${Date.now()}`),libraryKey:fe||String(z.id||`item_${Date.now()}`),sourceKind:z.itemKind||"book",isUserOwned:!0,title:String(z.title||"Olvasmány"),author:String(z.author||"Kalóz Szerző"),type:z.itemKind==="scroll"||z.itemKind==="log"?"scroll":z.itemKind==="copy"?"copy":"crystal_book",coverUrl:Z,chapters:ce,hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!0,needsHydration:!1},Rt.unshift(ve)),qt(),Ci(!0),await Kn(ve,J.openMode==="listen"||J.openMode==="dream"?J.openMode:"read",J.voiceId,J.dreamChoice,J.chapterIndex||0,J.wordIndex||0)};window.addEventListener("message",z=>{const fe=z.data;if(!(!fe||typeof fe!="object")){if(fe.type==="KRYST_LOAD_MONASTERY_WORK")W(fe);else if(fe.type==="KRYST_PING_READER")ft({type:"KRYST_READER_READY",version:"3.3-library-sync",workId:V});else if(fe.type==="KRYST_SYNC_USER_LIBRARY"&&fe.catalog)Ms(fe.catalog);else if(fe.type==="KRYST_LOAD_LIBRARY_ITEM_CONTENT")oe(fe);else if(fe.type==="KRYST_OPEN_LIBRARY_ITEM"){fe.catalog&&Ms(fe.catalog);const J=fe.descriptor||fe,Ue=String(J.libraryKey||"");if(J.itemType==="map"){let Z=Ct.find(L=>Ue&&L.libraryKey===Ue||J.fileId&&L.fileId===J.fileId||J.id&&L.id===J.id);if(!Z){const L=String(J.fileId||J.id||Date.now());Z={id:String(J.id||`map_${L}`),libraryKey:Ue||`map:${L}`,fileId:J.fileId?String(J.fileId):void 0,isUserOwned:!0,isPendingPapat:!!J.isPendingPapat,title:String(J.title||"Hajózási Térkép"),imageUrl:"",description:"Saját hajózási térkép",anchors:[],needsHydration:!0},Ct.unshift(Z),qt()}fe.contentPayload?oe({...fe.contentPayload,success:!0,itemKind:"map",requestKey:Z.libraryKey||Z.id}):ri(Z,"map")}else{let Z=Rt.find(L=>Ue&&L.libraryKey===Ue||J.id&&L.id===J.id||J.copyCode&&L.copyCode===J.copyCode||J.scrollToken&&L.scrollToken===J.scrollToken||J.logId&&L.logId===J.logId||J.downloadLink&&L.downloadLink===J.downloadLink);if(!Z){const L=Ue||`${J.itemType||"book"}:${J.copyCode||J.scrollToken||J.logId||J.downloadLink||J.id||Date.now()}`;Z={id:String(J.id||L),libraryKey:L,sourceKind:J.itemType||"book",isUserOwned:!0,copyCode:J.copyCode,scrollToken:J.scrollToken,logId:J.logId,downloadLink:J.downloadLink,workId:J.workId,title:String(J.title||"Olvasmány"),author:String(J.author||"Kalóz Szerző"),type:J.itemType==="scroll"||J.itemType==="log"?"scroll":J.itemType==="copy"?"copy":"crystal_book",chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",needsHydration:!0},Rt.unshift(Z),qt()}fe.contentPayload?oe({...fe.contentPayload,success:!0,requestKey:Z.libraryKey||Z.id}):Kn(Z,"read")}}}});try{const z=localStorage.getItem("kryst_user_library_catalog_v1");if(z){const fe=JSON.parse(z);Ms(fe)}}catch{}V&&ft({type:"KRYST_REQUEST_MONASTERY_WORK",workId:V,target:"reader",mode:"readonly"}),ft({type:"KRYST_READER_READY",version:"3.3-library-sync",workId:V}),ft({type:"KRYST_REQUEST_USER_LIBRARY"})}xs(),ys(),Ss(),y(),_s(),fn(),cc(),qt(),N("browse"),console.log("💎 [LET-Library Machine v3.2 Master Final] Sikeresen inicializálva a professzionális térképolvasóval!")});
