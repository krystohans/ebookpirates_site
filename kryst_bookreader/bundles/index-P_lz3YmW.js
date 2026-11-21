var dc=Object.defineProperty;var uc=(i,e,t)=>e in i?dc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var He=(i,e,t)=>uc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class hc{constructor(e=100){He(this,"words",[]);He(this,"currentStartIndex",0);He(this,"visibleWordCount",100);He(this,"isAnimating",!1);He(this,"leadingSpacerLines",0);He(this,"trailingSpacerLines",0);He(this,"inlineSpacerWidth",0);He(this,"anchoredWordIndex",null);this.visibleWordCount=e}setText(e,t=0){if(this.leadingSpacerLines=0,this.trailingSpacerLines=0,this.inlineSpacerWidth=0,this.anchoredWordIndex=null,!e){this.words=[],this.currentStartIndex=0;return}this.words=e.split(/\s+/).filter(n=>n.length>0),this.currentStartIndex=Math.max(0,Math.min(t,Math.max(0,this.words.length-1)))}getEffectiveCapacity(){return this.visibleWordCount}setVisibleWordCount(e){this.visibleWordCount=Math.max(10,e)}getCandidateTokens(e=260){const t=Math.min(this.currentStartIndex+e,this.words.length),n=[];for(let s=this.currentStartIndex;s<t;s++)n.push({index:s,word:this.words[s],isLastVisible:s===t-1});return n}getVisibleTokens(){const e=Math.min(this.currentStartIndex+this.visibleWordCount,this.words.length),t=[];for(let n=this.currentStartIndex;n<e;n++)t.push({index:n,word:this.words[n],isLastVisible:n===e-1});return t}getLastVisibleWordIndex(){const e=Math.min(this.currentStartIndex+this.visibleWordCount,this.words.length);return Math.max(this.currentStartIndex,e-1)}getCurrentIndex(){return this.currentStartIndex}getTotalWordCount(){return this.words.length}getSnippetAt(e,t=18){const n=Math.max(0,e),s=Math.min(n+t,this.words.length);return this.words.slice(n,s).join(" ")+(s<this.words.length?"...":"")}isBusyAnimating(){return this.isAnimating}isAtChapterEnd(e){return(e!==void 0&&e>=this.currentStartIndex?e:this.getLastVisibleWordIndex())>=this.words.length-1}isAtChapterBeginning(e){return(e!==void 0&&e>=0?e:this.currentStartIndex)<=0&&this.currentStartIndex<=0}stepForward(e,t){if(this.isAnimating)return!1;let n,s=t;typeof e=="function"?(s=e,n=void 0):n=e;const r=n!==void 0&&n>=this.currentStartIndex?n:this.getLastVisibleWordIndex();return r>=this.words.length-1?!1:(this.isAnimating=!0,this.currentStartIndex=r,this.leadingSpacerLines=0,this.trailingSpacerLines=0,this.inlineSpacerWidth=0,this.anchoredWordIndex=null,setTimeout(()=>{this.isAnimating=!1,s&&s()},180),!0)}stepBackward(e,t){if(this.isAnimating||this.currentStartIndex<=0)return!1;let n,s=t;typeof e=="function"?(s=e,n=void 0):n=e,this.isAnimating=!0;const r=n!==void 0&&n>=0?n:this.currentStartIndex,a=Math.max(1,this.visibleWordCount-1);return this.currentStartIndex=Math.max(0,r-a),this.leadingSpacerLines=0,this.trailingSpacerLines=0,this.inlineSpacerWidth=0,this.anchoredWordIndex=null,setTimeout(()=>{this.isAnimating=!1,s&&s()},180),!0}dragOffset(e){const t=this.currentStartIndex+e;this.currentStartIndex=Math.max(0,Math.min(t,Math.max(0,this.words.length-this.visibleWordCount)))}jumpToWord(e){this.currentStartIndex=Math.max(0,Math.min(e,Math.max(0,this.words.length-1))),this.leadingSpacerLines=0,this.trailingSpacerLines=0,this.inlineSpacerWidth=0,this.anchoredWordIndex=null}getLeadingSpacerLines(){return this.leadingSpacerLines}getTrailingSpacerLines(){return this.trailingSpacerLines}setSpacers(e,t){this.leadingSpacerLines=Math.max(0,e),this.trailingSpacerLines=Math.max(0,t)}getInlineSpacerWidth(){return this.inlineSpacerWidth}getAnchoredWordIndex(){return this.anchoredWordIndex}setInlineSpacer(e,t){this.inlineSpacerWidth=Math.max(0,e),this.anchoredWordIndex=t}anchorWord2D(e,t,n,s=600,r=280,a=31.5){if(this.words.length===0)return;e=Math.max(0,Math.min(e,this.words.length-1)),this.anchoredWordIndex=e;const o=Math.max(3,Math.floor(r/a)),l=Math.max(0,Math.min(Math.floor(n/a),o-1)),c=60,h=Math.max(300,s||600),u=Math.max(4,Math.floor(h/c)),d=Math.max(0,h-80),m=Math.min(Math.max(0,t),d);let _=Math.floor(m/c);_=Math.max(0,Math.min(_,u-1));const M=m-_*c;this.inlineSpacerWidth=M>8?Math.round(M):0;const f=l*u+_;if(e>=f)this.currentStartIndex=e-f,this.leadingSpacerLines=0;else{this.currentStartIndex=0;const p=Math.max(0,e-_),y=Math.ceil(p/u);this.leadingSpacerLines=Math.max(0,l-y)}this.trailingSpacerLines=0}anchorWordToLine(e,t,n=8,s=9){this.anchorWord2D(e,0,t*31.5,s*65,n*31.5,31.5)}}class fc{constructor(e){He(this,"reflowEngine");He(this,"currentActiveWordIndex",0);He(this,"isAutoAdvancing",!1);He(this,"isManualNavigating",!1);He(this,"onWordFocusCallback");He(this,"onPageTurnCallback");this.reflowEngine=e}onWordFocus(e){this.onWordFocusCallback=e}onPageTurn(e){this.onPageTurnCallback=e}setManualNavigating(e){this.isManualNavigating=e}syncAudioProgress(e){if(this.isManualNavigating)return;this.currentActiveWordIndex=e;const t=this.reflowEngine.getVisibleTokens(),n=t[t.length-1];this.onWordFocusCallback&&this.onWordFocusCallback(this.currentActiveWordIndex),n&&e>=n.index&&!this.isAutoAdvancing&&(this.isAutoAdvancing=!0,this.reflowEngine.stepForward(n.index,()=>{this.isAutoAdvancing=!1,this.onPageTurnCallback&&this.onPageTurnCallback()}))}getActiveWordIndex(){return this.currentActiveWordIndex}setActiveWordIndex(e){this.currentActiveWordIndex=e,this.onWordFocusCallback&&this.onWordFocusCallback(e)}}class pc{constructor(){He(this,"audioCtx",null);He(this,"bgmAudio",null);He(this,"bgmGainNode",null);He(this,"bgmVolume",.6);He(this,"voiceAudio",null);He(this,"voiceGainNode",null);He(this,"voiceFilterNode",null);He(this,"voiceVolume",.9);He(this,"playbackRate",1);He(this,"isDucking",!1);He(this,"narratorType","studio_master")}ensureAudioContext(){if(!this.audioCtx){const e=window.AudioContext||window.webkitAudioContext;this.audioCtx=new e}this.audioCtx.state==="suspended"&&this.audioCtx.resume()}setBgmVolume(e){this.bgmVolume=Math.max(0,Math.min(e,1)),this.applyBgmGain()}getBgmVolume(){return this.bgmVolume}setVoiceVolume(e){this.voiceVolume=Math.max(0,Math.min(e,1)),this.voiceGainNode&&this.audioCtx&&this.voiceGainNode.gain.setTargetAtTime(this.voiceVolume,this.audioCtx.currentTime,.05)}getVoiceVolume(){return this.voiceVolume}setPlaybackRate(e){this.playbackRate=Math.max(.7,Math.min(e,2)),this.voiceAudio&&(this.voiceAudio.playbackRate=this.playbackRate)}getPlaybackRate(){return this.playbackRate}setDucking(e){this.isDucking=e,this.applyBgmGain()}applyBgmGain(){if(!this.bgmGainNode||!this.audioCtx)return;const e=this.isDucking?this.bgmVolume*.32:this.bgmVolume;this.bgmGainNode.gain.setTargetAtTime(e,this.audioCtx.currentTime,.15)}loadBgm(e,t=!0){if(this.ensureAudioContext(),this.bgmAudio&&this.bgmAudio.pause(),this.bgmAudio=new Audio(e),this.bgmAudio.loop=t,this.bgmAudio.crossOrigin="anonymous",this.audioCtx){const n=this.audioCtx.createMediaElementSource(this.bgmAudio);this.bgmGainNode=this.audioCtx.createGain(),this.applyBgmGain(),n.connect(this.bgmGainNode),this.bgmGainNode.connect(this.audioCtx.destination)}}loadVoice(e,t,n,s=0){if(this.ensureAudioContext(),this.voiceAudio&&this.voiceAudio.pause(),this.voiceAudio=new Audio(e),this.voiceAudio.crossOrigin="anonymous",this.voiceAudio.playbackRate=this.playbackRate,this.audioCtx){const r=this.audioCtx.createMediaElementSource(this.voiceAudio);this.voiceGainNode=this.audioCtx.createGain(),this.voiceGainNode.gain.value=this.voiceVolume,this.voiceFilterNode=this.audioCtx.createBiquadFilter(),this.voiceFilterNode.type="peaking",this.voiceFilterNode.frequency.value=2400,this.voiceFilterNode.gain.value=1.5,r.connect(this.voiceFilterNode),this.voiceFilterNode.connect(this.voiceGainNode),this.voiceGainNode.connect(this.audioCtx.destination)}if(s>0){const r=()=>{this.voiceAudio&&this.voiceAudio.duration&&(this.voiceAudio.currentTime=Math.min(Math.max(0,this.voiceAudio.duration-.2),s))};this.voiceAudio.readyState>=1?r():this.voiceAudio.addEventListener("loadedmetadata",r,{once:!0})}t&&(this.voiceAudio.onended=()=>{this.setDucking(!1),t()}),n&&(this.voiceAudio.ontimeupdate=()=>{this.voiceAudio&&n(this.voiceAudio.currentTime)})}play(){this.ensureAudioContext(),this.bgmAudio&&this.bgmAudio.paused&&this.bgmAudio.play().catch(e=>console.warn("BGM play hiba:",e)),this.voiceAudio&&this.voiceAudio.paused&&(this.setDucking(!0),this.voiceAudio.play().catch(e=>console.warn("Voice play hiba:",e)))}pause(){this.voiceAudio&&!this.voiceAudio.paused&&this.voiceAudio.pause(),this.bgmAudio&&!this.bgmAudio.paused&&this.bgmAudio.pause(),this.setDucking(!1)}seek(e){this.voiceAudio&&(this.voiceAudio.currentTime=Math.max(0,e))}getCurrentTime(){return this.voiceAudio?this.voiceAudio.currentTime:0}getDuration(){return this.voiceAudio&&this.voiceAudio.duration||0}isVoicePlaying(){return!!(this.voiceAudio&&!this.voiceAudio.paused)}hasVoice(){return!!(this.voiceAudio&&this.voiceAudio.src)}stopVoice(){this.voiceAudio&&(this.voiceAudio.pause(),this.voiceAudio.currentTime=0),this.setDucking(!1)}clearVoice(){this.voiceAudio&&(this.voiceAudio.pause(),this.voiceAudio.ontimeupdate=null,this.voiceAudio.onended=null,this.voiceAudio.src="",this.voiceAudio=null),this.setDucking(!1)}}const mc=[{id:"water_deep",name:"Mélytenger / Árok",color:"#0b1d3a",category:"water",range:"< -2000m",tooltip:"Abisszális tengeri árkok (< -2000m)"},{id:"water_mid",name:"Nyílt Óceán",color:"#1a3c6e",category:"water",range:"-2000m .. -200m",tooltip:"Közepes tengermélység (-2000m .. -200m)"},{id:"water_shallow",name:"Sekély Tenger / Part",color:"#4fa3d1",category:"water",range:"-200m .. 0m",tooltip:"Part menti sekély vizek (-200m .. 0m)"},{id:"depression",name:"Mélyföld",color:"#1b4332",category:"lowland",range:"< 0m (Szárazföld)",tooltip:"Tengerszint alatti szárazföldi depressziók"},{id:"plain_low",name:"Alacsony Alföld",color:"#52b788",category:"lowland",range:"0m .. 100m",tooltip:"Tengerparti síkságok (0m .. 100m)"},{id:"plain_high",name:"Magas Alföld / Síkság",color:"#95d5b2",category:"lowland",range:"100m .. 200m",tooltip:"Emelkedő síkvidékek (100m .. 200m)"},{id:"hill_low",name:"Alacsony Dombság",color:"#e9d8a6",category:"hill",range:"200m .. 350m",tooltip:"Lankás dombvidékek (200m .. 350m)"},{id:"hill_high",name:"Magas Dombság",color:"#ee9b00",category:"hill",range:"350m .. 500m",tooltip:"Hullámos dombságok (350m .. 500m)"},{id:"mountain_low",name:"Alacsony Középhegység",color:"#ca6702",category:"mountain",range:"500m .. 800m",tooltip:"Erdős középhegységek (500m .. 800m)"},{id:"mountain_mid",name:"Középhegység",color:"#bb3e03",category:"mountain",range:"800m .. 1100m",tooltip:"Meredek hegygerincek (800m .. 1100m)"},{id:"mountain_high",name:"Magas Középhegység",color:"#9b2226",category:"mountain",range:"1100m .. 1500m",tooltip:"Fenyves bércek (1100m .. 1500m)"},{id:"alpine_rock",name:"Alpesi Sziklavilág",color:"#4a4e69",category:"mountain",range:"1500m .. 2200m",tooltip:"Fahatár feletti sziklák (1500m .. 2200m)"},{id:"alpine_peak",name:"Magashegység / Csúcs",color:"#6c757d",category:"mountain",range:"2200m .. 3000m",tooltip:"Ormok és csúcsok (2200m .. 3000m)"},{id:"snow_glacier",name:"Örök Hó & Gleccser",color:"#ffffff",category:"mountain",range:"> 3000m",tooltip:"Állandó hómezők (> 3000m)"},{id:"volcano_lava",name:"Vulkáni / Parázsmező",color:"#7f1d1d",category:"special",range:"Vulkáni Zóna",tooltip:"Vulkáni bazalt és láva"},{id:"wetland_swamp",name:"Mocsár / Lagúna",color:"#2d6a4f",category:"special",range:"Vadvíz / Láp",tooltip:"Tőzeglápok és mangrove"}];class gc{constructor(){He(this,"mapData",null);He(this,"zoom",1);He(this,"panX",0);He(this,"panY",0);He(this,"isDragging",!1);He(this,"lastDragX",0);He(this,"lastDragY",0);He(this,"onTargetChangedCallback");He(this,"idCanvas",null);He(this,"idCtx",null)}loadMap(e){var t;if(this.mapData=e,this.zoom=1,this.panX=0,this.panY=0,this.idCanvas=null,this.idCtx=null,(t=e.vectorZoneLayer)!=null&&t.idMaskDataUrl){const n=new Image;n.onload=()=>{this.idCanvas=document.createElement("canvas"),this.idCanvas.width=n.naturalWidth||n.width||1408,this.idCanvas.height=n.naturalHeight||n.height||768,this.idCtx=this.idCanvas.getContext("2d",{willReadFrequently:!0}),this.idCtx&&(this.idCtx.drawImage(n,0,0),this.evaluateTarget())},n.src=e.vectorZoneLayer.idMaskDataUrl}this.evaluateTarget()}onTargetChanged(e){this.onTargetChangedCallback=e}setZoom(e){this.zoom=Math.max(.45,Math.min(e,5)),this.evaluateTarget()}getZoom(){return this.zoom}zoomIn(e=.25){this.setZoom(this.zoom+e)}zoomOut(e=.25){this.setZoom(this.zoom-e)}zoomByRatio(e){this.setZoom(this.zoom*e)}resetZoom(){this.zoom=1,this.panX=0,this.panY=0,this.evaluateTarget()}startDrag(e,t){this.isDragging=!0,this.lastDragX=e,this.lastDragY=t}dragMove(e,t){if(!this.isDragging)return;const n=e-this.lastDragX,s=t-this.lastDragY;this.panX+=n,this.panY+=s,this.lastDragX=e,this.lastDragY=t,this.evaluateTarget()}endDrag(){this.isDragging=!1}getPan(){return{x:this.panX,y:this.panY}}getCurrentCoordinates(){const e=Math.max(0,Math.min(100,50-this.panX/(300*this.zoom)*100)),t=Math.max(0,Math.min(100,50-this.panY/(300*this.zoom)*100)),n=Math.floor(10+t/100*8),s=Math.floor(t%10*6),r=Math.floor(65+e/100*15),a=Math.floor(e%10*6);return`ÉSz ${n}°${s.toString().padStart(2,"0")}', NYh ${r}°${a.toString().padStart(2,"0")}'`}evaluateTarget(){var l,c;if(!this.mapData||!this.onTargetChangedCallback)return;const e=Math.max(0,Math.min(100,50-this.panX/(300*this.zoom)*100)),t=Math.max(0,Math.min(100,50-this.panY/(300*this.zoom)*100)),n=this.getCurrentCoordinates();let s=null,r=7.5;for(const h of this.mapData.anchors){const u=Math.hypot(h.xPercent-e,h.yPercent-t);u<r&&(r=u,s=h)}let a=null;if((l=this.mapData.vectorZoneLayer)!=null&&l.zones){const d=e/100*1408,m=t/100*768;for(const _ of this.mapData.vectorZoneLayer.zones)if(_.geometry&&_.geometry.length>0&&this.pointInMultiPolygon([d,m],_.geometry)){a=_;break}if(!a&&this.idCanvas&&this.idCtx){const _=Math.floor(e/100*this.idCanvas.width),M=Math.floor(t/100*this.idCanvas.height);if(_>=0&&_<this.idCanvas.width&&M>=0&&M<this.idCanvas.height){const f=this.idCtx.getImageData(_,M,1,1).data;if(f[3]>=30){const p=f[0]<<8|f[1];a=this.mapData.vectorZoneLayer.zones.find(y=>y.numericId===p)||null}}}}let o=null;if((c=this.mapData.elevationLayer)!=null&&c.levels){const d=e/100*1408,m=t/100*768;for(const _ of mc){const M=this.mapData.elevationLayer.levels[_.id];if(M&&M.length>0&&this.pointInMultiPolygon([d,m],M)){o=_;break}}}this.onTargetChangedCallback(s,n,a,o)}pointInRing(e,t){let n=!1;const s=e[0],r=e[1];for(let a=0,o=t.length-1;a<t.length;o=a++){const l=t[a][0],c=t[a][1],h=t[o][0],u=t[o][1];c>r!=u>r&&s<(h-l)*(r-c)/(u-c)+l&&(n=!n)}return n}pointInPolygon(e,t){if(!t||t.length===0||!this.pointInRing(e,t[0]))return!1;for(let n=1;n<t.length;n++)if(this.pointInRing(e,t[n]))return!1;return!0}pointInMultiPolygon(e,t){if(!t)return!1;for(const n of t)if(this.pointInPolygon(e,n))return!0;return!1}}class _c{constructor(){He(this,"isScrollMode",!1)}activate(e){this.isScrollMode=e}getStatusBadge(){return this.isScrollMode?{text:"📜 Soványított LETkristály Másolat (Zene és 3D Álomkép nélkül)",color:"#94a3b8",isDegraded:!0}:{text:"💎 Felszentelt Kristálykönyv (Full Multimédiás Éber Álom)",color:"#d4af37",isDegraded:!1}}allowsMultimedia(){return!this.isScrollMode}}const ds=class ds{constructor(){He(this,"bookmarks",[]);this.loadFromStorage()}loadFromStorage(){try{const e=localStorage.getItem(ds.STORAGE_KEY);e?this.bookmarks=JSON.parse(e):this.bookmarks=[]}catch(e){console.warn("[KrystBookmarkEngine] Nem sikerült beolvasni a könyvjelzőket:",e),this.bookmarks=[]}}saveToStorage(){try{localStorage.setItem(ds.STORAGE_KEY,JSON.stringify(this.bookmarks))}catch(e){console.error("[KrystBookmarkEngine] Hiba a könyvjelzők mentésekor:",e)}}addBookmark(e){var a,o;const t=new Date().toISOString(),n=`bm_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,s=(a=e.title)!=null&&a.trim()?e.title.trim():`${e.chapterTitle} (${new Date().toLocaleTimeString("hu-HU",{hour:"2-digit",minute:"2-digit"})})`,r={id:n,bookId:e.bookId,title:s,charOffset:e.charOffset,wordIndex:e.wordIndex,chapterIndex:e.chapterIndex,chapterTitle:e.chapterTitle,quoteSnippet:e.quoteSnippet.trim(),note:((o=e.note)==null?void 0:o.trim())||"",audioTimestamp:e.audioTimestamp,isAuto:!!e.isAuto,createdAt:t,updatedAt:t};return r.isAuto&&(this.bookmarks=this.bookmarks.filter(l=>!(l.bookId===e.bookId&&l.isAuto))),this.bookmarks.unshift(r),this.saveToStorage(),r}updateBookmark(e,t){const n=this.bookmarks.find(s=>s.id===e);return n?(t.title!==void 0&&(n.title=t.title.trim()),t.note!==void 0&&(n.note=t.note.trim()),n.updatedAt=new Date().toISOString(),this.saveToStorage(),!0):!1}deleteBookmark(e){const t=this.bookmarks.length;return this.bookmarks=this.bookmarks.filter(n=>n.id!==e),this.bookmarks.length!==t?(this.saveToStorage(),!0):!1}async copyBookmarkToClipboard(e){const t=this.bookmarks.find(r=>r.id===e);if(!t)throw new Error("A könyvjelző nem található.");const n=t.audioTimestamp!==void 0?` (Időkód: ${Math.floor(t.audioTimestamp/60)}:${Math.floor(t.audioTimestamp%60).toString().padStart(2,"0")})`:"";let s=`«${t.quoteSnippet}»
— ${t.chapterTitle}${n}`;return t.note&&(s+=`
📝 Jegyzet: ${t.note}`),navigator.clipboard&&navigator.clipboard.writeText&&await navigator.clipboard.writeText(s),s}searchBookmarks(e,t){let n=this.bookmarks;t&&(n=n.filter(r=>r.bookId===t));const s=e.trim().toLowerCase();return s?n.filter(r=>r.title.toLowerCase().includes(s)||r.note.toLowerCase().includes(s)||r.quoteSnippet.toLowerCase().includes(s)||r.chapterTitle.toLowerCase().includes(s)):n}getAutoBookmark(e){return this.bookmarks.find(t=>t.bookId===e&&t.isAuto)}getBookmarksByBook(e){return this.bookmarks.filter(t=>t.bookId===e)}};He(ds,"STORAGE_KEY","kryst_reader_bookmarks_v32");let Qr=ds;const uo=[{id:"ferenc",name:"Ferenc",role:"Kalandor",icon:"⚓",gender:"male",description:"Mély, magabiztos tengerész férfihang"},{id:"peter",name:"Péter",role:"Fiatal kalóz",icon:"⚡",gender:"male",description:"Pörgős, vagány, érces kalózhang"},{id:"zenia",name:"Zénia",role:"Tengerésznő",icon:"🌊",gender:"female",description:"Tiszta, dallamos tengerész női hang"},{id:"csaba",name:"Csaba",role:"Veterán kapitány",icon:"📜",gender:"male",description:"Rekedtes, megfontolt mély bariton"}];function vc(i,e="audio/wav"){const t=window.atob(i),n=t.length,s=new Uint8Array(n);for(let a=0;a<n;a++)s[a]=t.charCodeAt(a);const r=new Blob([s],{type:e});return URL.createObjectURL(r)}async function xc(i,e="ferenc",t=1){try{const n=new AbortController,s=setTimeout(()=>n.abort(),15e3),r=await fetch("http://127.0.0.1:5005/synthesize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:i,voice:e.toLowerCase(),lang:"hu",speed:t}),signal:n.signal});if(clearTimeout(s),!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const a=await r.json();if(a.success&&a.audioBase64)return{success:!0,audioUrl:vc(a.audioBase64,"audio/wav"),engine:a.engine||"local_piper"};throw new Error(a.message||"Beszédszintézis nem adott vissza hanganyagot.")}catch(n){const s=n instanceof Error?n.message:String(n);return console.warn(`[PiperTtsBridge] Helyi Piper nem érhető el (${s}), tartalék motorra váltás.`),{success:!1,engine:"fallback_webspeech",error:s}}}function ea(i,e,t,n){if(!("speechSynthesis"in window)){console.error("Web Speech API nem támogatott a jelenlegi böngészőben."),n&&n();return}window.speechSynthesis.cancel();const s=new SpeechSynthesisUtterance(i);s.lang="hu-HU";const a=window.speechSynthesis.getVoices().find(c=>c.lang.toLowerCase().startsWith("hu"));a&&(s.voice=a);const o=e.toLowerCase();o==="ferenc"?(s.pitch=.92,s.rate=1):o==="peter"?(s.pitch=1.15,s.rate=1.18):o==="zenia"?(s.pitch=1.25,s.rate=1.02):o==="csaba"&&(s.pitch=.82,s.rate=.88);let l=0;s.onboundary=c=>{c.name==="word"&&(t&&t(l),l++)},s.onend=()=>{n&&n()},s.onerror=c=>{console.warn("[WebSpeech Fallback] Lejátszási hiba:",c),n&&n()},window.speechSynthesis.speak(s)}class Sc{constructor(){He(this,"state");He(this,"reflowEngine");He(this,"guideEngine");He(this,"audioMixer");He(this,"dreamStage");He(this,"mapEngine");He(this,"scrollReader");He(this,"bookmarkEngine");He(this,"activeBook",null);He(this,"activeMap",null);He(this,"onStateChangeCallback");this.reflowEngine=new hc(75),this.guideEngine=new fc(this.reflowEngine),this.audioMixer=new pc,this.mapEngine=new gc,this.scrollReader=new _c,this.bookmarkEngine=new Qr,this.state={mode:"browse",activeBookId:null,activeChapterIndex:0,activeWordIndex:0,isPlaying:!1,volumeBgm:.6,volumeVoice:.9,playbackRate:1,narratorType:"studio_master",selectedSingleVoice:"Ferenc",isDucking:!1,activeMapId:null,mapZoom:1,mapPanX:0,mapPanY:0}}setDreamStage(e){this.dreamStage=e}onStateChange(e){this.onStateChangeCallback=e}notify(){this.onStateChangeCallback&&this.onStateChangeCallback({...this.state})}setMode(e){this.state.mode=e,this.dreamStage&&this.dreamStage.setVisible(e==="audio_dream"),this.notify()}loadChapter(e,t=!1){if(!this.activeBook||e<0||e>=this.activeBook.chapters.length)return!1;this.state.activeChapterIndex=e;const n=this.activeBook.type==="scroll"||this.activeBook.type==="copy",s=this.activeBook.chapters[e];if(s){const r=s.paragraphs.join(`

`);let a=0;if(t){const o=r.split(/\s+/).filter(c=>c.length>0),l=Math.max(1,70);a=Math.max(0,o.length-l)}this.reflowEngine.setText(r,a),this.guideEngine.setActiveWordIndex(a),this.state.activeWordIndex=a,this.audioMixer.clearVoice(),"speechSynthesis"in window&&window.speechSynthesis.cancel(),this.state.isPlaying=!1,s.audioUrl&&!n&&this.audioMixer.loadVoice(s.audioUrl,()=>{this.state.isPlaying=!1,this.notify()},o=>{if(s.tokens&&s.tokens.length>0){const l=s.tokens.findIndex(c=>o>=c.startSec&&o<=c.endSec);l!==-1&&this.guideEngine.syncAudioProgress(l*8)}})}return this.notify(),!0}loadBook(e,t=0,n=0){this.activeBook=e,this.state.activeBookId=e.id;const s=e.type==="scroll"||e.type==="copy";this.scrollReader.activate(s),this.loadChapter(t,!1),n>0&&(this.reflowEngine.jumpToWord(n),this.guideEngine.setActiveWordIndex(n),this.state.activeWordIndex=n,this.notify())}loadMap(e){this.activeMap=e,this.state.activeMapId=e.id,this.mapEngine.loadMap(e),this.setMode("map")}handleContentTap(){if(!(this.state.mode==="browse"||this.state.mode==="bookmarks")){if(this.state.isPlaying&&(this.audioMixer.pause(),"speechSynthesis"in window&&window.speechSynthesis.speaking&&window.speechSynthesis.cancel(),this.dreamStage&&this.dreamStage.setPaused(!0),this.state.isPlaying=!1),this.activeBook){const e=this.activeBook.chapters[this.state.activeChapterIndex],t=this.guideEngine.getActiveWordIndex(),n=this.reflowEngine.getSnippetAt(t,16);this.bookmarkEngine.addBookmark({bookId:this.activeBook.id,chapterIndex:this.state.activeChapterIndex,chapterTitle:e?e.title:"Fejezet",wordIndex:t,charOffset:t*6,quoteSnippet:n,title:`Auto-Mentés: ${e?e.title:""}`,audioTimestamp:this.audioMixer.getCurrentTime(),isAuto:!0})}this.setMode("browse")}}resumeFromAutoBookmark(e){const t=this.bookmarkEngine.getAutoBookmark(e);if(!t||!this.activeBook)return!1;this.state.activeChapterIndex=t.chapterIndex;const n=this.activeBook.chapters[t.chapterIndex];return n&&(this.reflowEngine.setText(n.paragraphs.join(`

`),t.wordIndex),this.guideEngine.setActiveWordIndex(t.wordIndex),t.audioTimestamp!==void 0&&this.audioMixer.seek(t.audioTimestamp)),this.setMode("read_listen"),!0}togglePlayPause(){if(!(this.state.mode==="browse"||this.state.mode==="map"||this.state.mode==="bookmarks"))if(this.state.isPlaying)this.audioMixer.pause(),"speechSynthesis"in window&&window.speechSynthesis.speaking&&window.speechSynthesis.pause(),this.dreamStage&&this.dreamStage.setPaused(!0),this.state.isPlaying=!1,this.notify();else if(this.audioMixer.hasVoice())this.audioMixer.play(),"speechSynthesis"in window&&window.speechSynthesis.paused&&window.speechSynthesis.resume(),this.dreamStage&&this.dreamStage.setPaused(!1),this.state.isPlaying=!0,this.notify();else{const e=this.reflowEngine.getCurrentIndex();this.playChapterVoice(this.state.activeChapterIndex,this.state.selectedSingleVoice,e)}}seekAudioToWordIndex(e){var n;const t=this.reflowEngine.getTotalWordCount();if(!(t<=0)){if(this.guideEngine.setActiveWordIndex(e),this.state.activeWordIndex=e,this.audioMixer.hasVoice()){const s=this.audioMixer.getDuration();if(s>0){const a=Math.max(0,Math.min(.999,e/t))*s;this.audioMixer.seek(a)}}else if(this.state.isPlaying&&"speechSynthesis"in window&&window.speechSynthesis.speaking){window.speechSynthesis.cancel();const s=(n=this.activeBook)==null?void 0:n.chapters[this.state.activeChapterIndex];if(s){const a=s.paragraphs.join(`

`).split(/\s+/).filter(o=>o.length>0);ea(a.slice(e).join(" "),this.state.selectedSingleVoice||"ferenc",o=>{this.guideEngine.syncAudioProgress(e+o)},()=>{this.state.isPlaying=!1,this.notify()})}}}}async playChapterVoice(e,t,n=0,s){if(!this.activeBook||e<0||e>=this.activeBook.chapters.length)return;this.state.activeChapterIndex=e;const r=this.activeBook.type==="scroll"||this.activeBook.type==="copy",a=this.activeBook.chapters[e];if(!a)return;const o=t||this.state.selectedSingleVoice||"ferenc";this.state.selectedSingleVoice=o,this.audioMixer.clearVoice(),"speechSynthesis"in window&&window.speechSynthesis.cancel();const l=a.paragraphs.join(`

`);if(!l.trim())return;this.reflowEngine.setText(l,n),this.guideEngine.setActiveWordIndex(n),this.state.activeWordIndex=n;const c=l.split(/\s+/).filter(d=>d.length>0),h=c.length;if(a.audioUrl&&!r){s&&s(`🎧 Stúdió szinkron (${a.title})...`);let d=0;n>0&&h>0&&(d=Math.min(.999,n/h)*(this.audioMixer.getDuration()||30)),this.audioMixer.loadVoice(a.audioUrl,()=>{this.state.isPlaying=!1,this.notify();const m=this.state.activeChapterIndex+1;this.activeBook&&m<this.activeBook.chapters.length&&this.playChapterVoice(m,o,0,s)},m=>{if(a.tokens&&a.tokens.length>0){const _=a.tokens.findIndex(M=>m>=M.startSec&&m<=M.endSec);_!==-1&&this.guideEngine.syncAudioProgress(_*8)}},d),this.audioMixer.play(),this.state.isPlaying=!0,this.notify();return}s&&s(`🎙️ Piper szintézis: ${o.toUpperCase()} (Fejezet ${e+1})...`);const u=await xc(l,o,this.state.playbackRate);if(u.success&&u.audioUrl){s&&s(`🔊 Felolvasás: ${o.toUpperCase()} (Piper)`);let d=0;n>0&&h>0&&(d=Math.min(.999,n/h)*30),this.audioMixer.loadVoice(u.audioUrl,()=>{this.state.isPlaying=!1,this.notify();const m=this.state.activeChapterIndex+1;this.activeBook&&m<this.activeBook.chapters.length&&this.playChapterVoice(m,o,0,s)},m=>{const _=this.audioMixer.getDuration();if(_>0&&h>0){const M=Math.min(.999,m/_),f=Math.floor(M*h);this.guideEngine.syncAudioProgress(f)}},d),this.audioMixer.play(),this.state.isPlaying=!0,this.notify()}else s&&s(`🔊 Felolvasás: ${o.toUpperCase()} (Böngésző)`),this.state.isPlaying=!0,this.notify(),ea(c.slice(n).join(" "),o,d=>{this.guideEngine.syncAudioProgress(n+d)},()=>{this.state.isPlaying=!1,this.notify();const d=this.state.activeChapterIndex+1;this.activeBook&&d<this.activeBook.chapters.length&&this.playChapterVoice(d,o,0,s)})}async playBookWithVoice(e,t="ferenc",n=0,s){this.activeBook=e,this.state.activeBookId=e.id,this.state.selectedSingleVoice=t;const r=e.type==="scroll"||e.type==="copy";this.scrollReader.activate(r),this.setMode("read_listen"),await this.playChapterVoice(this.state.activeChapterIndex||0,t,n,s)}async playScrollWithVoice(e,t="ferenc",n=0,s){return this.playBookWithVoice(e,t,n,s)}setBgmVolume(e){this.state.volumeBgm=e,this.audioMixer.setBgmVolume(e),this.notify()}setVoiceVolume(e){this.state.volumeVoice=e,this.audioMixer.setVoiceVolume(e),this.notify()}setPlaybackRate(e){const t=Math.max(.6,Math.min(e,2));this.state.playbackRate=t,this.audioMixer.setPlaybackRate(t),this.dreamStage&&this.dreamStage.setPlaybackSpeed(t),this.notify()}stepForward(e){if(this.reflowEngine.isBusyAnimating())return!1;const t=this.state.isPlaying||this.state.mode==="read_listen"||this.state.mode==="audio_dream";if(this.reflowEngine.isAtChapterEnd(e)){if(this.activeBook){const s=this.state.activeChapterIndex+1;if(s<this.activeBook.chapters.length)return t?this.playChapterVoice(s,this.state.selectedSingleVoice,0):this.loadChapter(s,!1),!0}return!1}if(this.guideEngine.setManualNavigating(!0),this.reflowEngine.stepForward(e,()=>{this.guideEngine.setManualNavigating(!1)})){const s=this.reflowEngine.getCurrentIndex();return this.seekAudioToWordIndex(s),this.notify(),!0}if(this.activeBook){const s=this.state.activeChapterIndex+1;if(s<this.activeBook.chapters.length)return t?this.playChapterVoice(s,this.state.selectedSingleVoice,0):this.loadChapter(s,!1),!0}return!1}stepBackward(e){if(this.reflowEngine.isBusyAnimating())return!1;const t=this.state.isPlaying||this.state.mode==="read_listen"||this.state.mode==="audio_dream";if(this.reflowEngine.isAtChapterBeginning(e)){if(this.activeBook){const s=this.state.activeChapterIndex-1;if(s>=0){if(t){const a=this.activeBook.chapters[s].paragraphs.join(`

`).split(/\s+/).filter(l=>l.length>0),o=Math.max(0,a.length-70);this.playChapterVoice(s,this.state.selectedSingleVoice,o)}else this.loadChapter(s,!0);return!0}}return!1}if(this.guideEngine.setManualNavigating(!0),this.reflowEngine.stepBackward(e,()=>{this.guideEngine.setManualNavigating(!1)})){const s=this.reflowEngine.getCurrentIndex();return this.seekAudioToWordIndex(s),this.notify(),!0}if(this.activeBook){const s=this.state.activeChapterIndex-1;if(s>=0){if(t){const a=this.activeBook.chapters[s].paragraphs.join(`

`).split(/\s+/).filter(l=>l.length>0),o=Math.max(0,a.length-70);this.playChapterVoice(s,this.state.selectedSingleVoice,o)}else this.loadChapter(s,!0);return!0}}return!1}getState(){return{...this.state}}getActiveBook(){return this.activeBook}getActiveMap(){return this.activeMap}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ka="187",yc=0,ho=1,Mc=2,Qs=1,Ec=2,os=3,Ti=0,un=1,Qn=2,Vi=0,cs=1,ta=2,fo=3,po=4,bc=5,Gi=100,Tc=101,Ac=102,wc=103,Rc=104,Cc=200,Lc=201,Pc=202,Ic=203,dl=204,ul=205,Dc=206,Nc=207,Uc=208,kc=209,Fc=210,Oc=211,Bc=212,zc=213,Hc=214,na=0,ia=1,sa=2,us=3,ra=4,aa=5,oa=6,la=7,hl=0,Gc=1,Vc=2,ti=0,fl=1,pl=2,ml=3,gl=4,_l=5,vl=6,xl=7,Sl=300,$i=301,hs=302,br=303,Tr=304,ca=1e3,ei=1001,da=1002,Jt=1003,Wc=1004,ws=1005,dn=1006,Ar=1007,fi=1008,_n=1009,yl=1010,Ml=1011,fs=1012,qa=1013,zn=1014,Fn=1015,Hn=1016,Ya=1017,Za=1018,Ki=1020,El=35902,bl=35899,Tl=1021,Al=1022,On=1023,gi=1026,pi=1027,wl=1028,Ja=1029,Ai=1030,ja=1031,Qa=1033,er=33776,tr=33777,nr=33778,ir=33779,ua=35840,ha=35841,fa=35842,pa=35843,ma=36196,ga=37492,_a=37496,va=37488,xa=37489,rr=37490,Sa=37491,ya=37808,Ma=37809,Ea=37810,ba=37811,Ta=37812,Aa=37813,wa=37814,Ra=37815,Ca=37816,La=37817,Pa=37818,Ia=37819,Da=37820,Na=37821,Ua=36492,ka=36494,Fa=36495,Oa=36283,Ba=36284,ar=36285,za=36286,Xc=3200,Ha=0,$c=1,hi="",yn="srgb",or="srgb-linear",lr="linear",Et="srgb",wr=7680,Kc=519,qc=512,Yc=513,Zc=514,Rl=515,Jc=516,jc=517,Cl=518,Ll=519,Qc=35044,mo="300 es",In=2e3,ps=2001;function ed(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function td(){const i=cr("canvas");return i.style.display="block",i}const go={};function _o(...i){const e="THREE."+i.shift();console.log(e,...i)}function Pl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Qe(...i){i=Pl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function vt(...i){i=Pl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Wi(...i){const e=i.join(" ");e in go||(go[e]=!0,Qe(...i))}function nd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const id={[na]:na,[sa]:oa,[ra]:ra,[us]:aa,[ia]:ia,[oa]:sa,[la]:la,[aa]:us};class Ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rr=Math.PI/180,Ga=180/Math.PI;function gs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function dt(i,e,t){return Math.max(e,Math.min(t,i))}function sd(i,e){return(i%e+e)%e}function Cr(i,e,t){return(1-t)*i+t*e}function rd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function eo(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ad(i,e){if(e.constructor===Float32Array)return i;const t=eo(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function od(i,e){if(e.constructor===Float32Array)return i;const t=eo(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const ao=class ao{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ao.prototype.isVector2=!0;let ot=ao;class Zi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],m=r[a+1],_=r[a+2],M=r[a+3];if(u!==M||l!==d||c!==m||h!==_){let f=l*d+c*m+h*_+u*M;f<0&&(d=-d,m=-m,_=-_,M=-M,f=-f);let p=1-o;if(f<.9995){const y=Math.acos(f),w=Math.sin(y);p=Math.sin(p*y)/w,o=Math.sin(o*y)/w,l=l*p+d*o,c=c*p+m*o,h=h*p+_*o,u=u*p+M*o}else{l=l*p+d*o,c=c*p+m*o,h=h*p+_*o,u=u*p+M*o;const y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],m=r[a+2],_=r[a+3];return e[t]=o*_+h*u+l*m-c*d,e[t+1]=l*_+h*d+c*u-o*m,e[t+2]=c*_+h*m+o*d-l*u,e[t+3]=h*_-o*u-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),m=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*m*_,this._y=c*m*u-d*h*_,this._z=c*h*_+d*m*u,this._w=c*h*u-d*m*_;break;case"YXZ":this._x=d*h*u+c*m*_,this._y=c*m*u-d*h*_,this._z=c*h*_-d*m*u,this._w=c*h*u+d*m*_;break;case"ZXY":this._x=d*h*u-c*m*_,this._y=c*m*u+d*h*_,this._z=c*h*_+d*m*u,this._w=c*h*u-d*m*_;break;case"ZYX":this._x=d*h*u-c*m*_,this._y=c*m*u+d*h*_,this._z=c*h*_-d*m*u,this._w=c*h*u+d*m*_;break;case"YZX":this._x=d*h*u+c*m*_,this._y=c*m*u+d*h*_,this._z=c*h*_-d*m*u,this._w=c*h*u-d*m*_;break;case"XZY":this._x=d*h*u-c*m*_,this._y=c*m*u-d*h*_,this._z=c*h*_+d*m*u,this._w=c*h*u+d*m*_;break;default:Qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const oo=class oo{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lr.copy(this).projectOnVector(e),this.sub(Lr)}reflect(e){return this.sub(Lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};oo.prototype.isVector3=!0;let K=oo;const Lr=new K,vo=new Zi,lo=class lo{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],m=n[5],_=n[8],M=s[0],f=s[3],p=s[6],y=s[1],w=s[4],T=s[7],L=s[2],R=s[5],g=s[8];return r[0]=a*M+o*y+l*L,r[3]=a*f+o*w+l*R,r[6]=a*p+o*T+l*g,r[1]=c*M+h*y+u*L,r[4]=c*f+h*w+u*R,r[7]=c*p+h*T+u*g,r[2]=d*M+m*y+_*L,r[5]=d*f+m*w+_*R,r[8]=d*p+m*T+_*g,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,m=c*r-a*l,_=t*u+n*d+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return e[0]=u*M,e[1]=(s*c-h*n)*M,e[2]=(o*n-s*a)*M,e[3]=d*M,e[4]=(h*t-s*l)*M,e[5]=(s*r-o*t)*M,e[6]=m*M,e[7]=(n*l-c*t)*M,e[8]=(a*t-n*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Wi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pr.makeScale(e,t)),this}rotate(e){return Wi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pr.makeRotation(-e)),this}translate(e,t){return Wi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};lo.prototype.isMatrix3=!0;let tt=lo;const Pr=new tt,xo=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),So=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ld(){const i={enabled:!0,workingColorSpace:or,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Et&&(s.r=ni(s.r),s.g=ni(s.g),s.b=ni(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Et&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===hi?lr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[or]:{primaries:e,whitePoint:n,transfer:lr,toXYZ:xo,fromXYZ:So,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yn},outputColorSpaceConfig:{drawingBufferColorSpace:yn}},[yn]:{primaries:e,whitePoint:n,transfer:Et,toXYZ:xo,fromXYZ:So,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yn}}}),i}const ht=ld();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Li;class cd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Li===void 0&&(Li=cr("canvas")),Li.width=e.width,Li.height=e.height;const s=Li.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ni(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let dd=0;class to{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=gs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ir(s[a].image)):r.push(Ir(s[a]))}else r=Ir(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ir(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?cd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Qe("Texture: Unable to serialize Texture."),{})}let ud=0;const Dr=new K;class rn extends Ri{constructor(e=rn.DEFAULT_IMAGE,t=rn.DEFAULT_MAPPING,n=ei,s=ei,r=dn,a=fi,o=On,l=_n,c=rn.DEFAULT_ANISOTROPY,h=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=gs(),this.name="",this.source=new to(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Dr).x}get height(){return this.source.getSize(Dr).y}get depth(){return this.source.getSize(Dr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ca:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ca:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Sl;rn.DEFAULT_ANISOTROPY=1;const co=class co{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],m=l[5],_=l[9],M=l[2],f=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-M)<.01&&Math.abs(_-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+M)<.1&&Math.abs(_+f)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,T=(m+1)/2,L=(p+1)/2,R=(h+d)/4,g=(u+M)/4,b=(_+f)/4;return w>T&&w>L?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=R/n,r=g/n):T>L?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=R/s,r=b/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=g/r,s=b/r),this.set(n,s,r,t),this}let y=Math.sqrt((f-_)*(f-_)+(u-M)*(u-M)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(f-_)/y,this.y=(u-M)/y,this.z=(d-h)/y,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};co.prototype.isVector4=!0;let It=co;class hd extends Ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new rn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new to(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bn extends hd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Il extends rn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class fd extends rn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const hr=class hr{constructor(e,t,n,s,r,a,o,l,c,h,u,d,m,_,M,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,d,m,_,M,f)}set(e,t,n,s,r,a,o,l,c,h,u,d,m,_,M,f){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=m,p[7]=_,p[11]=M,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new hr().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Pi.setFromMatrixColumn(e,0).length(),r=1/Pi.setFromMatrixColumn(e,1).length(),a=1/Pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,m=a*u,_=o*h,M=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=m+_*c,t[5]=d-M*c,t[9]=-o*l,t[2]=M-d*c,t[6]=_+m*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,m=l*u,_=c*h,M=c*u;t[0]=d+M*o,t[4]=_*o-m,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-_,t[6]=M+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,m=l*u,_=c*h,M=c*u;t[0]=d-M*o,t[4]=-a*u,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*h,t[9]=M-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,m=a*u,_=o*h,M=o*u;t[0]=l*h,t[4]=_*c-m,t[8]=d*c+M,t[1]=l*u,t[5]=M*c+d,t[9]=m*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,m=a*c,_=o*l,M=o*c;t[0]=l*h,t[4]=M-d*u,t[8]=_*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=m*u+_,t[10]=d-M*u}else if(e.order==="XZY"){const d=a*l,m=a*c,_=o*l,M=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+M,t[5]=a*h,t[9]=m*u-_,t[2]=_*u-m,t[6]=o*h,t[10]=M*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pd,e,md)}lookAt(e,t,n){const s=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),ri.crossVectors(n,mn),ri.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),ri.crossVectors(n,mn)),ri.normalize(),Rs.crossVectors(mn,ri),s[0]=ri.x,s[4]=Rs.x,s[8]=mn.x,s[1]=ri.y,s[5]=Rs.y,s[9]=mn.y,s[2]=ri.z,s[6]=Rs.z,s[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],m=n[13],_=n[2],M=n[6],f=n[10],p=n[14],y=n[3],w=n[7],T=n[11],L=n[15],R=s[0],g=s[4],b=s[8],O=s[12],D=s[1],k=s[5],X=s[9],te=s[13],U=s[2],J=s[6],ae=s[10],$=s[14],ge=s[3],Q=s[7],le=s[11],ue=s[15];return r[0]=a*R+o*D+l*U+c*ge,r[4]=a*g+o*k+l*J+c*Q,r[8]=a*b+o*X+l*ae+c*le,r[12]=a*O+o*te+l*$+c*ue,r[1]=h*R+u*D+d*U+m*ge,r[5]=h*g+u*k+d*J+m*Q,r[9]=h*b+u*X+d*ae+m*le,r[13]=h*O+u*te+d*$+m*ue,r[2]=_*R+M*D+f*U+p*ge,r[6]=_*g+M*k+f*J+p*Q,r[10]=_*b+M*X+f*ae+p*le,r[14]=_*O+M*te+f*$+p*ue,r[3]=y*R+w*D+T*U+L*ge,r[7]=y*g+w*k+T*J+L*Q,r[11]=y*b+w*X+T*ae+L*le,r[15]=y*O+w*te+T*$+L*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],m=e[14],_=e[3],M=e[7],f=e[11],p=e[15],y=l*m-c*d,w=o*m-c*u,T=o*d-l*u,L=a*m-c*h,R=a*d-l*h,g=a*u-o*h;return t*(M*y-f*w+p*T)-n*(_*y-f*L+p*R)+s*(_*w-M*L+p*g)-r*(_*T-M*R+f*g)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],m=e[11],_=e[12],M=e[13],f=e[14],p=e[15],y=t*o-n*a,w=t*l-s*a,T=t*c-r*a,L=n*l-s*o,R=n*c-r*o,g=s*c-r*l,b=h*M-u*_,O=h*f-d*_,D=h*p-m*_,k=u*f-d*M,X=u*p-m*M,te=d*p-m*f,U=y*te-w*X+T*k+L*D-R*O+g*b;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const J=1/U;return e[0]=(o*te-l*X+c*k)*J,e[1]=(s*X-n*te-r*k)*J,e[2]=(M*g-f*R+p*L)*J,e[3]=(d*R-u*g-m*L)*J,e[4]=(l*D-a*te-c*O)*J,e[5]=(t*te-s*D+r*O)*J,e[6]=(f*T-_*g-p*w)*J,e[7]=(h*g-d*T+m*w)*J,e[8]=(a*X-o*D+c*b)*J,e[9]=(n*D-t*X-r*b)*J,e[10]=(_*R-M*T+p*y)*J,e[11]=(u*T-h*R-m*y)*J,e[12]=(o*O-a*k-l*b)*J,e[13]=(t*k-n*O+s*b)*J,e[14]=(M*w-_*L-f*y)*J,e[15]=(h*L-u*w+d*y)*J,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,m=r*h,_=r*u,M=a*h,f=a*u,p=o*u,y=l*c,w=l*h,T=l*u,L=n.x,R=n.y,g=n.z;return s[0]=(1-(M+p))*L,s[1]=(m+T)*L,s[2]=(_-w)*L,s[3]=0,s[4]=(m-T)*R,s[5]=(1-(d+p))*R,s[6]=(f+y)*R,s[7]=0,s[8]=(_+w)*g,s[9]=(f-y)*g,s[10]=(1-(d+M))*g,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Pi.set(s[0],s[1],s[2]).length();const o=Pi.set(s[4],s[5],s[6]).length(),l=Pi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Rn.copy(this);const c=1/a,h=1/o,u=1/l;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=u,Rn.elements[9]*=u,Rn.elements[10]*=u,t.setFromRotationMatrix(Rn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=In,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),m=(n+s)/(n-s);let _,M;if(l)_=r/(a-r),M=a*r/(a-r);else if(o===In)_=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===ps)_=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=In,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),m=-(n+s)/(n-s);let _,M;if(l)_=1/(a-r),M=a/(a-r);else if(o===In)_=-2/(a-r),M=-(a+r)/(a-r);else if(o===ps)_=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};hr.prototype.isMatrix4=!0;let Lt=hr;const Pi=new K,Rn=new Lt,pd=new K(0,0,0),md=new K(1,1,1),ri=new K,Rs=new K,mn=new K,yo=new Lt,Mo=new Zi;class _i{constructor(e=0,t=0,n=0,s=_i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return yo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mo.setFromEuler(this),this.setFromQuaternion(Mo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_i.DEFAULT_ORDER="XYZ";class Dl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gd=0;const Eo=new K,Ii=new Zi,qn=new Lt,Cs=new K,ns=new K,_d=new K,vd=new Zi,bo=new K(1,0,0),To=new K(0,1,0),Ao=new K(0,0,1),wo={type:"added"},xd={type:"removed"},Di={type:"childadded",child:null},Nr={type:"childremoved",child:null};class an extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=gs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=an.DEFAULT_UP.clone();const e=new K,t=new _i,n=new Zi,s=new K(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Lt},normalMatrix:{value:new tt}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=an.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.premultiply(Ii),this}rotateX(e){return this.rotateOnAxis(bo,e)}rotateY(e){return this.rotateOnAxis(To,e)}rotateZ(e){return this.rotateOnAxis(Ao,e)}translateOnAxis(e,t){return Eo.copy(e).applyQuaternion(this.quaternion),this.position.add(Eo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bo,e)}translateY(e){return this.translateOnAxis(To,e)}translateZ(e){return this.translateOnAxis(Ao,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cs.copy(e):Cs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(ns,Cs,this.up):qn.lookAt(Cs,ns,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),Ii.setFromRotationMatrix(qn),this.quaternion.premultiply(Ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wo),Di.child=e,this.dispatchEvent(Di),Di.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xd),Nr.child=e,this.dispatchEvent(Nr),Nr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wo),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,e,_d),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,vd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}an.DEFAULT_UP=new K(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ls extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sd={type:"move"};class Ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ls,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ls,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ls,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const f=t.getJointPose(M,n),p=this._getHandJoint(c,M);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,_=.005;c.inputState.pinching&&d>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Sd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ls;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},Ps={h:0,s:0,l:0};function kr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ct{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ht.workingColorSpace){if(e=sd(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=kr(a,r,e+1/3),this.g=kr(a,r,e),this.b=kr(a,r,e-1/3)}return ht.colorSpaceToWorking(this,s),this}setStyle(e,t=yn){function n(r){r!==void 0&&parseFloat(r)<1&&Qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yn){const n=Nl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yn){return ht.workingToColorSpace(Qt.copy(this),e),Math.round(dt(Qt.r*255,0,255))*65536+Math.round(dt(Qt.g*255,0,255))*256+Math.round(dt(Qt.b*255,0,255))}getHexString(e=yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,s=Qt.g,r=Qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=yn){ht.workingToColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,s=Qt.b;return e!==yn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ai),this.setHSL(ai.h+e,ai.s+t,ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ai),e.getHSL(Ps);const n=Cr(ai.h,Ps.h,t),s=Cr(ai.s,Ps.s,t),r=Cr(ai.l,Ps.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new ct;ct.NAMES=Nl;class yd extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Cn=new K,Yn=new K,Fr=new K,Zn=new K,Ni=new K,Ui=new K,Ro=new K,Or=new K,Br=new K,zr=new K,Hr=new It,Gr=new It,Vr=new It;class Pn{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Cn.subVectors(e,t),s.cross(Cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Cn.subVectors(s,t),Yn.subVectors(n,t),Fr.subVectors(e,t);const a=Cn.dot(Cn),o=Cn.dot(Yn),l=Cn.dot(Fr),c=Yn.dot(Yn),h=Yn.dot(Fr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,m=(c*l-o*h)*d,_=(a*h-o*l)*d;return r.set(1-m-_,_,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Zn.x),l.addScaledVector(a,Zn.y),l.addScaledVector(o,Zn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Hr.setScalar(0),Gr.setScalar(0),Vr.setScalar(0),Hr.fromBufferAttribute(e,t),Gr.fromBufferAttribute(e,n),Vr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Hr,r.x),a.addScaledVector(Gr,r.y),a.addScaledVector(Vr,r.z),a}static isFrontFacing(e,t,n,s){return Cn.subVectors(n,t),Yn.subVectors(e,t),Cn.cross(Yn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),Cn.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Pn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Ni.subVectors(s,n),Ui.subVectors(r,n),Or.subVectors(e,n);const l=Ni.dot(Or),c=Ui.dot(Or);if(l<=0&&c<=0)return t.copy(n);Br.subVectors(e,s);const h=Ni.dot(Br),u=Ui.dot(Br);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),t.copy(n).addScaledVector(Ni,a);zr.subVectors(e,r);const m=Ni.dot(zr),_=Ui.dot(zr);if(_>=0&&m<=_)return t.copy(r);const M=m*c-l*_;if(M<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(Ui,o);const f=h*_-m*u;if(f<=0&&u-h>=0&&m-_>=0)return Ro.subVectors(r,s),o=(u-h)/(u-h+(m-_)),t.copy(s).addScaledVector(Ro,o);const p=1/(f+M+d);return a=M*p,o=d*p,t.copy(n).addScaledVector(Ni,a).addScaledVector(Ui,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _s{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ln):Ln.fromBufferAttribute(r,a),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Is.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Is.copy(n.boundingBox)),Is.applyMatrix4(e.matrixWorld),this.union(Is)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),Ds.subVectors(this.max,is),ki.subVectors(e.a,is),Fi.subVectors(e.b,is),Oi.subVectors(e.c,is),oi.subVectors(Fi,ki),li.subVectors(Oi,Fi),yi.subVectors(ki,Oi);let t=[0,-oi.z,oi.y,0,-li.z,li.y,0,-yi.z,yi.y,oi.z,0,-oi.x,li.z,0,-li.x,yi.z,0,-yi.x,-oi.y,oi.x,0,-li.y,li.x,0,-yi.y,yi.x,0];return!Wr(t,ki,Fi,Oi,Ds)||(t=[1,0,0,0,1,0,0,0,1],!Wr(t,ki,Fi,Oi,Ds))?!1:(Ns.crossVectors(oi,li),t=[Ns.x,Ns.y,Ns.z],Wr(t,ki,Fi,Oi,Ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Jn=[new K,new K,new K,new K,new K,new K,new K,new K],Ln=new K,Is=new _s,ki=new K,Fi=new K,Oi=new K,oi=new K,li=new K,yi=new K,is=new K,Ds=new K,Ns=new K,Mi=new K;function Wr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Mi.fromArray(i,r);const o=s.x*Math.abs(Mi.x)+s.y*Math.abs(Mi.y)+s.z*Math.abs(Mi.z),l=e.dot(Mi),c=t.dot(Mi),h=n.dot(Mi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const zt=new K,Us=new ot;let Md=0;class mi extends Ri{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Md++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Qc,this.updateRanges=[],this.gpuType=Fn,this.version=0,this._normalizationScale=e!==void 0?eo(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Us.fromBufferAttribute(this,t),Us.applyMatrix3(e),this.setXY(t,Us.x,Us.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):ad(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):od(e,this.array)}}class Ul extends mi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class kl extends mi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class En extends mi{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Ed=new _s,ss=new K,Xr=new K;class fr{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ed.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ss.subVectors(e,this.center);const t=ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ss,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ss.copy(e.center).add(Xr)),this.expandByPoint(ss.copy(e.center).sub(Xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let bd=0;const Sn=new Lt,$r=new an,Bi=new K,gn=new _s,rs=new _s,$t=new K;class Gn extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=gs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ed(e)?kl:Ul)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new tt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,n){return Sn.makeTranslation(e,t,n),this.applyMatrix4(Sn),this}scale(e,t,n){return Sn.makeScale(e,t,n),this.applyMatrix4(Sn),this}lookAt(e){return $r.lookAt(e),$r.updateMatrix(),this.applyMatrix4($r.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new En(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _s);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];gn.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];rs.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(gn.min,rs.min),gn.expandByPoint($t),$t.addVectors(gn.max,rs.max),gn.expandByPoint($t)):(gn.expandByPoint(rs.min),gn.expandByPoint(rs.max))}gn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)$t.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared($t));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$t.fromBufferAttribute(o,c),l&&(Bi.fromBufferAttribute(e,c),$t.add(Bi)),s=Math.max(s,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new mi(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(n.count);for(let O=0;O<n.count;O++)o[O]=new K,l[O]=new K;const h=new K,u=new K,d=new K,m=new ot,_=new ot,M=new ot,f=new K,p=new K;function y(O,D,k){c[O]=c[D]=c[k]=1,h.fromBufferAttribute(n,O),u.fromBufferAttribute(n,D),d.fromBufferAttribute(n,k),m.fromBufferAttribute(r,O),_.fromBufferAttribute(r,D),M.fromBufferAttribute(r,k),u.sub(h),d.sub(h),_.sub(m),M.sub(m);const X=1/(_.x*M.y-M.x*_.y);isFinite(X)&&(f.copy(u).multiplyScalar(M.y).addScaledVector(d,-_.y).multiplyScalar(X),p.copy(d).multiplyScalar(_.x).addScaledVector(u,-M.x).multiplyScalar(X),o[O].add(f),o[D].add(f),o[k].add(f),l[O].add(p),l[D].add(p),l[k].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let O=0,D=w.length;O<D;++O){const k=w[O],X=k.start,te=k.count;for(let U=X,J=X+te;U<J;U+=3)y(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const T=new K,L=new K,R=new K,g=new K;function b(O){R.fromBufferAttribute(s,O),g.copy(R);const D=o[O];T.copy(D),T.sub(R.multiplyScalar(R.dot(D))).normalize(),L.crossVectors(g,D);const X=L.dot(l[O])<0?-1:1;a.setXYZW(O,T.x,T.y,T.z,X)}for(let O=0,D=n.count;O<D;++O)c[O]&&b(O);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new mi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const s=new K,r=new K,a=new K,o=new K,l=new K,c=new K,h=new K,u=new K;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),M=e.getX(d+1),f=e.getX(d+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,f),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let m=0,_=0;for(let M=0,f=l.length;M<f;M++){o.isInterleavedBufferAttribute?m=l[M]*o.data.stride+o.offset:m=l[M]*h;for(let p=0;p<h;p++)d[_++]=c[m++]}return new mi(d,h,u)}if(this.index===null)return Qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],m=e(d,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const m=c[u];h.push(m.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kr=new K,Td=new K,Ad=new tt;class di{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Kr.subVectors(n,t).cross(Td.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Kr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ad.getNormalMatrix(e),s=this.coplanarPoint(Kr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let wd=0;class Ji extends Ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=gs(),this.name="",this.type="Material",this.blending=cs,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dl,this.blendDst=ul,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wr,this.stencilZFail=wr,this.stencilZPass=wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Qe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new di().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ot().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const jn=new K,qr=new K,ks=new K,Fs=new K;class Fl{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){qr.copy(e).add(t).multiplyScalar(.5),ks.copy(t).sub(e).normalize(),Fs.copy(this.origin).sub(qr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ks),o=Fs.dot(this.direction),l=-Fs.dot(ks),c=Fs.lengthSq(),h=Math.abs(1-a*a);let u,d,m,_;if(h>0)if(u=a*l-o,d=a*o-l,_=r*h,u>=0)if(d>=-_)if(d<=_){const M=1/h;u*=M,d*=M,m=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-r,-l),r),m=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(qr).addScaledVector(ks,d),m}intersectSphere(e,t){if(e.radius<0)return null;jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),s=jn.dot(jn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=e.x-a.x,d=e.y-a.y,m=e.z-a.z,_=t.x-a.x,M=t.y-a.y,f=t.z-a.z,p=n.x-a.x,y=n.y-a.y,w=n.z-a.z,T=Math.abs(l),L=Math.abs(c),R=Math.abs(h);let g,b,O,D,k,X,te,U,J,ae,$,ge;if(T>=L&&T>=R?(O=l,X=u,J=_,ge=p,l>=0?(g=c,b=h,D=d,k=m,te=M,U=f,ae=y,$=w):(g=h,b=c,D=m,k=d,te=f,U=M,ae=w,$=y)):L>=R?(O=c,X=d,J=M,ge=y,c>=0?(g=h,b=l,D=m,k=u,te=f,U=_,ae=w,$=p):(g=l,b=h,D=u,k=m,te=_,U=f,ae=p,$=w)):(O=h,X=m,J=f,ge=w,h>=0?(g=l,b=c,D=u,k=d,te=_,U=M,ae=p,$=y):(g=c,b=l,D=d,k=u,te=M,U=_,ae=y,$=p)),O===0)return null;const Q=g/O,le=b/O,ue=1/O,ke=D-Q*X,$e=k-le*X,ee=te-Q*J,Ae=U-le*J,Pe=ae-Q*ge,Fe=$-le*ge,Re=Pe*Ae-Fe*ee,Ze=ke*Fe-$e*Pe,Mt=ee*$e-Ae*ke;if(s){if(Re<0||Ze<0||Mt<0)return null}else if((Re<0||Ze<0||Mt<0)&&(Re>0||Ze>0||Mt>0))return null;const qe=Re+Ze+Mt;if(qe===0)return null;const gt=ue*(Re*X+Ze*J+Mt*ge);return(qe>0?gt<0:gt>0)?null:this.at(gt/qe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rd extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Co=new Lt,Ei=new Fl,Os=new fr,Lo=new K,Bs=new K,zs=new K,Hs=new K,Yr=new K,Gs=new K,Po=new K,Vs=new K;class vi extends an{constructor(e=new Gn,t=new Rd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Gs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Yr.fromBufferAttribute(u,e),a?Gs.addScaledVector(Yr,h):Gs.addScaledVector(Yr.sub(t),h))}t.add(Gs)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(r),Ei.copy(e.ray).recast(e.near),!(Os.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Os,Lo)===null||Ei.origin.distanceToSquared(Lo)>(e.far-e.near)**2))&&(Co.copy(r).invert(),Ei.copy(e.ray).applyMatrix4(Co),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=d.length;_<M;_++){const f=d[_],p=a[f.materialIndex],y=Math.max(f.start,m.start),w=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let T=y,L=w;T<L;T+=3){const R=o.getX(T),g=o.getX(T+1),b=o.getX(T+2);s=Ws(this,p,e,n,c,h,u,R,g,b),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let f=_,p=M;f<p;f+=3){const y=o.getX(f),w=o.getX(f+1),T=o.getX(f+2);s=Ws(this,a,e,n,c,h,u,y,w,T),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,M=d.length;_<M;_++){const f=d[_],p=a[f.materialIndex],y=Math.max(f.start,m.start),w=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let T=y,L=w;T<L;T+=3){const R=T,g=T+1,b=T+2;s=Ws(this,p,e,n,c,h,u,R,g,b),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,m.start),M=Math.min(l.count,m.start+m.count);for(let f=_,p=M;f<p;f+=3){const y=f,w=f+1,T=f+2;s=Ws(this,a,e,n,c,h,u,y,w,T),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function Cd(i,e,t,n,s,r,a,o){let l;if(e.side===un?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Ti,o),l===null)return null;Vs.copy(o),Vs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Vs);return c<t.near||c>t.far?null:{distance:c,point:Vs.clone(),object:i}}function Ws(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Bs),i.getVertexPosition(l,zs),i.getVertexPosition(c,Hs);const h=Cd(i,e,t,n,Bs,zs,Hs,Po);if(h){const u=new K;Pn.getBarycoord(Po,Bs,zs,Hs,u),s&&(h.uv=Pn.getInterpolatedAttribute(s,o,l,c,u,new ot)),r&&(h.uv1=Pn.getInterpolatedAttribute(r,o,l,c,u,new ot)),a&&(h.normal=Pn.getInterpolatedAttribute(a,o,l,c,u,new K),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new K,materialIndex:0};Pn.getNormal(Bs,zs,Hs,d.normal),h.face=d,h.barycoord=u}return h}class Ld extends rn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Jt,h=Jt,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bi=new fr,Pd=new ot(.5,.5),Xs=new K;class ms{constructor(e=new di,t=new di,n=new di,s=new di,r=new di,a=new di){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],m=r[7],_=r[8],M=r[9],f=r[10],p=r[11],y=r[12],w=r[13],T=r[14],L=r[15];if(s[0].setComponents(c-a,m-h,p-_,L-y).normalize(),s[1].setComponents(c+a,m+h,p+_,L+y).normalize(),s[2].setComponents(c+o,m+u,p+M,L+w).normalize(),s[3].setComponents(c-o,m-u,p-M,L-w).normalize(),n)s[4].setComponents(l,d,f,T).normalize(),s[5].setComponents(c-l,m-d,p-f,L-T).normalize();else if(s[4].setComponents(c-l,m-d,p-f,L-T).normalize(),t===In)s[5].setComponents(c+l,m+d,p+f,L+T).normalize();else if(t===ps)s[5].setComponents(l,d,f,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(e){bi.center.set(0,0,0);const t=Pd.distanceTo(e.center);return bi.radius=.7071067811865476+t,bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Xs.x=s.normal.x>0?e.max.x:e.min.x,Xs.y=s.normal.y>0?e.max.y:e.min.y,Xs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Io=new Lt;class no{constructor(){this.coordinateSystem=In,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];Io.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new ms),n[s].setFromProjectionMatrix(Io,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new ms),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new no().copy(this)}}class Ol extends Ji{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Do=new Lt,Va=new Fl,$s=new fr,Ks=new K;class Id extends an{constructor(e=new Gn,t=new Ol){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(s),$s.radius+=r,e.ray.intersectsSphere($s)===!1)return;Do.copy(s).invert(),Va.copy(e.ray).applyMatrix4(Do);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let _=d,M=m;_<M;_++){const f=c.getX(_);Ks.fromBufferAttribute(u,f),No(Ks,f,l,s,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=d,M=m;_<M;_++)Ks.fromBufferAttribute(u,_),No(Ks,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function No(i,e,t,n,s,r,a){const o=Va.distanceSqToPoint(i);if(o<t){const l=new K;Va.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Bl extends rn{constructor(e=[],t=$i,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qi extends rn{constructor(e,t,n=zn,s,r,a,o=Jt,l=Jt,c,h=gi,u=1){if(h!==gi&&h!==pi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new to(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class zl extends qi{constructor(e,t=zn,n=$i,s,r,a=Jt,o=Jt,l,c=gi){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Hl extends rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vs extends Gn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,m=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new En(c,3)),this.setAttribute("normal",new En(h,3)),this.setAttribute("uv",new En(u,2));function _(M,f,p,y,w,T,L,R,g,b,O){const D=T/g,k=L/b,X=T/2,te=L/2,U=R/2,J=g+1,ae=b+1;let $=0,ge=0;const Q=new K;for(let le=0;le<ae;le++){const ue=le*k-te;for(let ke=0;ke<J;ke++){const $e=ke*D-X;Q[M]=$e*y,Q[f]=ue*w,Q[p]=U,c.push(Q.x,Q.y,Q.z),Q[M]=0,Q[f]=0,Q[p]=R>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(ke/g),u.push(1-le/b),$+=1}}for(let le=0;le<b;le++)for(let ue=0;ue<g;ue++){const ke=d+ue+J*le,$e=d+ue+J*(le+1),ee=d+(ue+1)+J*(le+1),Ae=d+(ue+1)+J*le;l.push(ke,$e,Ae),l.push($e,ee,Ae),ge+=6}o.addGroup(m,ge,O),m+=ge,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class io extends Gn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new En(r,3)),this.setAttribute("normal",new En(r.slice(),3)),this.setAttribute("uv",new En(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const w=new K,T=new K,L=new K;for(let R=0;R<t.length;R+=3)m(t[R+0],w),m(t[R+1],T),m(t[R+2],L),l(w,T,L,y)}function l(y,w,T,L){const R=L+1,g=[];for(let b=0;b<=R;b++){g[b]=[];const O=y.clone().lerp(T,b/R),D=w.clone().lerp(T,b/R),k=R-b;for(let X=0;X<=k;X++)X===0&&b===R?g[b][X]=O:g[b][X]=O.clone().lerp(D,X/k)}for(let b=0;b<R;b++)for(let O=0;O<2*(R-b)-1;O++){const D=Math.floor(O/2);O%2===0?(d(g[b][D+1]),d(g[b+1][D]),d(g[b][D])):(d(g[b][D+1]),d(g[b+1][D+1]),d(g[b+1][D]))}}function c(y){const w=new K;for(let T=0;T<r.length;T+=3)w.x=r[T+0],w.y=r[T+1],w.z=r[T+2],w.normalize().multiplyScalar(y),r[T+0]=w.x,r[T+1]=w.y,r[T+2]=w.z}function h(){const y=new K;for(let w=0;w<r.length;w+=3){y.x=r[w+0],y.y=r[w+1],y.z=r[w+2];const T=f(y)/2/Math.PI+.5,L=p(y)/Math.PI+.5;a.push(T,1-L)}_(),u()}function u(){for(let y=0;y<a.length;y+=6){const w=a[y+0],T=a[y+2],L=a[y+4],R=Math.max(w,T,L),g=Math.min(w,T,L);R>.9&&g<.1&&(w<.2&&(a[y+0]+=1),T<.2&&(a[y+2]+=1),L<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function m(y,w){const T=y*3;w.x=e[T+0],w.y=e[T+1],w.z=e[T+2]}function _(){const y=new K,w=new K,T=new K,L=new K,R=new ot,g=new ot,b=new ot;for(let O=0,D=0;O<r.length;O+=9,D+=6){y.set(r[O+0],r[O+1],r[O+2]),w.set(r[O+3],r[O+4],r[O+5]),T.set(r[O+6],r[O+7],r[O+8]),R.set(a[D+0],a[D+1]),g.set(a[D+2],a[D+3]),b.set(a[D+4],a[D+5]),L.copy(y).add(w).add(T).divideScalar(3);const k=f(L);M(R,D+0,y,k),M(g,D+2,w,k),M(b,D+4,T,k)}}function M(y,w,T,L){L<0&&y.x===1&&(a[w]=y.x-1),T.x===0&&T.z===0&&(a[w]=L/2/Math.PI+.5)}function f(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new io(e.vertices,e.indices,e.radius,e.detail)}}class so extends io{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new so(e.radius,e.detail)}}class pr extends Gn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,m=[],_=[],M=[],f=[];for(let p=0;p<h;p++){const y=p*d-a;for(let w=0;w<c;w++){const T=w*u-r;_.push(T,-y,0),M.push(0,0,1),f.push(w/o),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const w=y+c*p,T=y+c*(p+1),L=y+1+c*(p+1),R=y+1+c*p;m.push(w,T,R),m.push(T,L,R)}this.setIndex(m),this.setAttribute("position",new En(_,3)),this.setAttribute("normal",new En(M,3)),this.setAttribute("uv",new En(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.width,e.height,e.widthSegments,e.heightSegments)}}function Yi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Uo(s))s.isRenderTargetTexture?(Qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Uo(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function sn(i){const e={};for(let t=0;t<i.length;t++){const n=Yi(i[t]);for(const s in n)e[s]=n[s]}return e}function Uo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Dd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Gl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const Nd={clone:Yi,merge:sn};var Ud=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wi extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ud,this.fragmentShader=kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=Dd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ct().setHex(s.value);break;case"v2":this.uniforms[n].value=new ot().fromArray(s.value);break;case"v3":this.uniforms[n].value=new K().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new tt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Lt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Fd extends wi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Od extends Ji{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ha,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Bd extends Od{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new ct(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ct(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ct(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Wi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Wi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class zd extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hd extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Vl extends an{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Zr=new Lt,ko=new K,Fo=new K;class Gd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new Lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ms,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;ko.setFromMatrixPosition(e.matrixWorld),t.position.copy(ko),Fo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Zr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Zr,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===ps||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Zr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const qs=new K,Ys=new Zi,Nn=new K;class Wl extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qs,Ys,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qs,Ys,Nn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(qs,Ys,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qs,Ys,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ci=new K,Oo=new ot,Bo=new ot;class Mn extends Wl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ga*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ga*2*Math.atan(Math.tan(Rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ci.x,ci.y).multiplyScalar(-e/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-e/ci.z)}getViewSize(e,t){return this.getViewBounds(e,Oo,Bo),t.subVectors(Bo,Oo)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Rr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Vd extends Gd{constructor(){super(new Mn(90,1,.5,500)),this.isPointLightShadow=!0}}class Wd extends Vl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Vd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Xd extends Wl{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $d extends Vl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const zi=-90,Hi=1;class Wa extends an{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(zi,Hi,e,t);s.layers=this.layers,this.add(s);const r=new Mn(zi,Hi,e,t);r.layers=this.layers,this.add(r);const a=new Mn(zi,Hi,e,t);a.layers=this.layers,this.add(a);const o=new Mn(zi,Hi,e,t);o.layers=this.layers,this.add(o);const l=new Mn(zi,Hi,e,t);l.layers=this.layers,this.add(l);const c=new Mn(zi,Hi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ps)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=M,e.setRenderTarget(n,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Kd extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}function zo(i,e,t,n){const s=qd(n);switch(t){case Tl:return i*e;case wl:return i*e/s.components*s.byteLength;case Ja:return i*e/s.components*s.byteLength;case Ai:return i*e*2/s.components*s.byteLength;case ja:return i*e*2/s.components*s.byteLength;case Al:return i*e*3/s.components*s.byteLength;case On:return i*e*4/s.components*s.byteLength;case Qa:return i*e*4/s.components*s.byteLength;case er:case tr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case nr:case ir:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ha:case pa:return Math.max(i,16)*Math.max(e,8)/4;case ua:case fa:return Math.max(i,8)*Math.max(e,8)/2;case ma:case ga:case va:case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _a:case rr:case Sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ma:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case wa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case La:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Da:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ua:case ka:case Fa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Oa:case Ba:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ar:case za:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function qd(i){switch(i){case _n:case yl:return{byteLength:1,components:1};case fs:case Ml:case Hn:return{byteLength:2,components:1};case Ya:case Za:return{byteLength:2,components:4};case zn:case qa:case Fn:return{byteLength:4,components:1};case El:case bl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ka}}));typeof window<"u"&&(window.__THREE__?Qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ka);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xl(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Yd(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((m,_)=>m.start-_.start);let d=0;for(let m=1;m<u.length;m++){const _=u[d],M=u[m];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++d,u[d]=M)}u.length=d+1;for(let m=0,_=u.length;m<_;m++){const M=u[m];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Zd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jd=`#ifdef USE_ALPHAHASH
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
#endif`,jd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nu=`#ifdef USE_AOMAP
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
#endif`,iu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,su=`#ifdef USE_BATCHING
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
#endif`,ru=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,au=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ou=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cu=`#ifdef USE_IRIDESCENCE
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
#endif`,du=`#ifdef USE_BUMPMAP
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
#endif`,uu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,gu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_u=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,xu=`#define PI 3.141592653589793
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
} // validated`,Su=`vec3 transformedNormal = objectNormal;
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
#endif`,yu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Eu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Au=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wu=`#ifdef USE_ENVMAP
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
#endif`,Ru=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Cu=`#ifdef USE_ENVMAP
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
#endif`,Lu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pu=`#ifdef USE_ENVMAP
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
#endif`,Iu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Du=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ku=`#ifdef USE_GRADIENTMAP
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
}`,Fu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ou=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zu=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Hu=`#ifdef USE_ENVMAP
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
#endif`,Gu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$u=`PhysicalMaterial material;
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
#endif`,Ku=`uniform sampler2D dfgLUT;
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
}`,qu=`
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
#endif`,Yu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ju=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,ju=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,th=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ih=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rh=`#if defined( USE_POINTS_UV )
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
#endif`,ah=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,oh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ch=`#if defined( USE_MORPHCOLORS )
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
#endif`,dh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uh=`#ifdef USE_MORPHTARGETS
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
#endif`,hh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ph=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,mh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_h=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vh=`#ifdef USE_NORMALMAP
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
#endif`,xh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Eh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Th=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ah=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ch=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ph=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ih=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Nh=`float getShadowMask() {
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
}`,Uh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kh=`#ifdef USE_SKINNING
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
#endif`,Fh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Oh=`#ifdef USE_SKINNING
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
#endif`,Bh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gh=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vh=`#ifdef USE_TRANSMISSION
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
#endif`,Wh=`#ifdef USE_TRANSMISSION
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
#endif`,Xh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$h=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zh=`uniform sampler2D t2D;
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
}`,Jh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jh=`uniform float backgroundBlurriness;
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
}`,Qh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ef=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tf=`#include <common>
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
}`,nf=`#if DEPTH_PACKING == 3200
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
}`,sf=`#define DISTANCE
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
}`,rf=`#define DISTANCE
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
}`,af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,of=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lf=`uniform float scale;
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
}`,cf=`uniform vec3 diffuse;
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
}`,df=`#include <common>
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
}`,uf=`uniform vec3 diffuse;
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
}`,hf=`#define LAMBERT
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
}`,ff=`#define LAMBERT
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
}`,pf=`#define MATCAP
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
}`,mf=`#define MATCAP
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
}`,gf=`#define NORMAL
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
}`,_f=`#define NORMAL
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
}`,vf=`#define PHONG
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
}`,xf=`#define PHONG
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
}`,Sf=`#define STANDARD
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
}`,yf=`#define STANDARD
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
}`,Mf=`#define TOON
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
}`,Ef=`#define TOON
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
}`,bf=`uniform float size;
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
}`,Tf=`uniform vec3 diffuse;
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
}`,Af=`#include <common>
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
}`,wf=`uniform vec3 color;
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
}`,Rf=`uniform float rotation;
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
}`,Cf=`uniform vec3 diffuse;
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
}`,at={alphahash_fragment:Zd,alphahash_pars_fragment:Jd,alphamap_fragment:jd,alphamap_pars_fragment:Qd,alphatest_fragment:eu,alphatest_pars_fragment:tu,aomap_fragment:nu,aomap_pars_fragment:iu,batching_pars_vertex:su,batching_vertex:ru,begin_vertex:au,beginnormal_vertex:ou,bsdfs:lu,iridescence_fragment:cu,bumpmap_pars_fragment:du,clipping_planes_fragment:uu,clipping_planes_pars_fragment:hu,clipping_planes_pars_vertex:fu,clipping_planes_vertex:pu,color_fragment:mu,color_pars_fragment:gu,color_pars_vertex:_u,color_vertex:vu,common:xu,defaultnormal_vertex:Su,displacementmap_pars_vertex:yu,displacementmap_vertex:Mu,emissivemap_fragment:Eu,emissivemap_pars_fragment:bu,colorspace_fragment:Tu,colorspace_pars_fragment:Au,envmap_fragment:wu,envmap_common_pars_fragment:Ru,envmap_pars_fragment:Cu,envmap_pars_vertex:Lu,envmap_physical_pars_fragment:Hu,envmap_vertex:Pu,fog_vertex:Iu,fog_pars_vertex:Du,fog_fragment:Nu,fog_pars_fragment:Uu,gradientmap_pars_fragment:ku,lightmap_pars_fragment:Fu,lights_lambert_fragment:Ou,lights_lambert_pars_fragment:Bu,lights_pars_begin:zu,lights_toon_fragment:Gu,lights_toon_pars_fragment:Vu,lights_phong_fragment:Wu,lights_phong_pars_fragment:Xu,lights_physical_fragment:$u,lights_physical_pars_fragment:Ku,lights_fragment_begin:qu,lights_fragment_maps:Yu,lights_fragment_end:Zu,lightprobes_pars_fragment:Ju,logdepthbuf_fragment:ju,logdepthbuf_pars_fragment:Qu,logdepthbuf_pars_vertex:eh,logdepthbuf_vertex:th,map_fragment:nh,map_pars_fragment:ih,map_particle_fragment:sh,map_particle_pars_fragment:rh,metalnessmap_fragment:ah,metalnessmap_pars_fragment:oh,morphinstance_vertex:lh,morphcolor_vertex:ch,morphnormal_vertex:dh,morphtarget_pars_vertex:uh,morphtarget_vertex:hh,normal_fragment_begin:fh,normal_fragment_maps:ph,normal_pars_fragment:mh,normal_pars_vertex:gh,normal_vertex:_h,normalmap_pars_fragment:vh,clearcoat_normal_fragment_begin:xh,clearcoat_normal_fragment_maps:Sh,clearcoat_pars_fragment:yh,iridescence_pars_fragment:Mh,opaque_fragment:Eh,packing:bh,premultiplied_alpha_fragment:Th,project_vertex:Ah,dithering_fragment:wh,dithering_pars_fragment:Rh,roughnessmap_fragment:Ch,roughnessmap_pars_fragment:Lh,shadowmap_pars_fragment:Ph,shadowmap_pars_vertex:Ih,shadowmap_vertex:Dh,shadowmask_pars_fragment:Nh,skinbase_vertex:Uh,skinning_pars_vertex:kh,skinning_vertex:Fh,skinnormal_vertex:Oh,specularmap_fragment:Bh,specularmap_pars_fragment:zh,tonemapping_fragment:Hh,tonemapping_pars_fragment:Gh,transmission_fragment:Vh,transmission_pars_fragment:Wh,uv_pars_fragment:Xh,uv_pars_vertex:$h,uv_vertex:Kh,worldpos_vertex:qh,background_vert:Yh,background_frag:Zh,backgroundCube_vert:Jh,backgroundCube_frag:jh,cube_vert:Qh,cube_frag:ef,depth_vert:tf,depth_frag:nf,distance_vert:sf,distance_frag:rf,equirect_vert:af,equirect_frag:of,linedashed_vert:lf,linedashed_frag:cf,meshbasic_vert:df,meshbasic_frag:uf,meshlambert_vert:hf,meshlambert_frag:ff,meshmatcap_vert:pf,meshmatcap_frag:mf,meshnormal_vert:gf,meshnormal_frag:_f,meshphong_vert:vf,meshphong_frag:xf,meshphysical_vert:Sf,meshphysical_frag:yf,meshtoon_vert:Mf,meshtoon_frag:Ef,points_vert:bf,points_frag:Tf,shadow_vert:Af,shadow_frag:wf,sprite_vert:Rf,sprite_frag:Cf},Ie={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},kn={basic:{uniforms:sn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:sn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:sn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:sn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:sn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new ct(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:sn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:sn([Ie.points,Ie.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:sn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:sn([Ie.common,Ie.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:sn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:sn([Ie.sprite,Ie.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:sn([Ie.common,Ie.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:sn([Ie.lights,Ie.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};kn.physical={uniforms:sn([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new tt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const Zs={r:0,b:0,g:0},Lf=new Lt,$l=new tt;$l.set(-1,0,0,0,1,0,0,0,1);function Pf(i,e,t,n,s,r){const a=new ct(0);let o=s===!0?0:1,l,c,h=null,u=0,d=null;function m(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){const T=y.backgroundBlurriness>0;w=e.get(w,T)}return w}function _(y){let w=!1;const T=m(y);T===null?f(a,o):T&&T.isColor&&(f(T,1),w=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?t.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(y,w){const T=m(w);T&&T.isCubeTexture?(c===void 0&&(c=new vi(new vs(1,1,1),new wi({name:"BackgroundCubeMaterial",uniforms:Yi(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(L,R,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=T,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Lf.makeRotationFromEuler(w.backgroundRotation)).transpose(),T.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply($l),c.material.toneMapped=ht.getTransfer(T.colorSpace)!==Et,(h!==T||u!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=T,u=T.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new vi(new pr(2,2),new wi({name:"BackgroundMaterial",uniforms:Yi(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ht.getTransfer(T.colorSpace)!==Et,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||u!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=T,u=T.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function f(y,w){y.getRGB(Zs,Gl(i)),t.buffers.color.setClear(Zs.r,Zs.g,Zs.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,f(a,o)},render:_,addToRenderList:M,dispose:p}}function If(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(k,X,te,U,J){let ae=!1;const $=u(k,U,te,X);r!==$&&(r=$,c(r.object)),ae=m(k,U,te,J),ae&&_(k,U,te,J),J!==null&&e.update(J,i.ELEMENT_ARRAY_BUFFER),(ae||a)&&(a=!1,T(k,X,te,U),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function l(){return i.createVertexArray()}function c(k){return i.bindVertexArray(k)}function h(k){return i.deleteVertexArray(k)}function u(k,X,te,U){const J=U.wireframe===!0;let ae=n[X.id];ae===void 0&&(ae={},n[X.id]=ae);const $=k.isInstancedMesh===!0?k.id:0;let ge=ae[$];ge===void 0&&(ge={},ae[$]=ge);let Q=ge[te.id];Q===void 0&&(Q={},ge[te.id]=Q);let le=Q[J];return le===void 0&&(le=d(l()),Q[J]=le),le}function d(k){const X=[],te=[],U=[];for(let J=0;J<t;J++)X[J]=0,te[J]=0,U[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:te,attributeDivisors:U,object:k,attributes:{},index:null}}function m(k,X,te,U){const J=r.attributes,ae=X.attributes;let $=0;const ge=te.getAttributes();for(const Q in ge)if(ge[Q].location>=0){const ue=J[Q];let ke=ae[Q];if(ke===void 0&&(Q==="instanceMatrix"&&k.instanceMatrix&&(ke=k.instanceMatrix),Q==="instanceColor"&&k.instanceColor&&(ke=k.instanceColor)),ue===void 0||ue.attribute!==ke||ke&&ue.data!==ke.data)return!0;$++}return r.attributesNum!==$||r.index!==U}function _(k,X,te,U){const J={},ae=X.attributes;let $=0;const ge=te.getAttributes();for(const Q in ge)if(ge[Q].location>=0){let ue=ae[Q];ue===void 0&&(Q==="instanceMatrix"&&k.instanceMatrix&&(ue=k.instanceMatrix),Q==="instanceColor"&&k.instanceColor&&(ue=k.instanceColor));const ke={};ke.attribute=ue,ue&&ue.data&&(ke.data=ue.data),J[Q]=ke,$++}r.attributes=J,r.attributesNum=$,r.index=U}function M(){const k=r.newAttributes;for(let X=0,te=k.length;X<te;X++)k[X]=0}function f(k){p(k,0)}function p(k,X){const te=r.newAttributes,U=r.enabledAttributes,J=r.attributeDivisors;te[k]=1,U[k]===0&&(i.enableVertexAttribArray(k),U[k]=1),J[k]!==X&&(i.vertexAttribDivisor(k,X),J[k]=X)}function y(){const k=r.newAttributes,X=r.enabledAttributes;for(let te=0,U=X.length;te<U;te++)X[te]!==k[te]&&(i.disableVertexAttribArray(te),X[te]=0)}function w(k,X,te,U,J,ae,$){$===!0?i.vertexAttribIPointer(k,X,te,J,ae):i.vertexAttribPointer(k,X,te,U,J,ae)}function T(k,X,te,U){M();const J=U.attributes,ae=te.getAttributes(),$=X.defaultAttributeValues;for(const ge in ae){const Q=ae[ge];if(Q.location>=0){let le=J[ge];if(le===void 0&&(ge==="instanceMatrix"&&k.instanceMatrix&&(le=k.instanceMatrix),ge==="instanceColor"&&k.instanceColor&&(le=k.instanceColor)),le!==void 0){const ue=le.normalized,ke=le.itemSize,$e=e.get(le);if($e===void 0)continue;const ee=$e.buffer,Ae=$e.type,Pe=$e.bytesPerElement,Fe=Ae===i.INT||Ae===i.UNSIGNED_INT||le.gpuType===qa;if(le.isInterleavedBufferAttribute){const Re=le.data,Ze=Re.isInterleavedBuffer===!0?Re.stride:Re.itemSize,Mt=le.offset;if(Re.isInstancedInterleavedBuffer||Re.isInstancedBufferAttribute){for(let qe=0;qe<Q.locationSize;qe++)p(Q.location+qe,Re.meshPerAttribute);k.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let qe=0;qe<Q.locationSize;qe++)f(Q.location+qe);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let qe=0;qe<Q.locationSize;qe++)w(Q.location+qe,ke/Q.locationSize,Ae,ue,Ze*Pe,(Mt+ke/Q.locationSize*qe)*Pe,Fe)}else{if(le.isInstancedBufferAttribute){for(let Re=0;Re<Q.locationSize;Re++)p(Q.location+Re,le.meshPerAttribute);k.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Re=0;Re<Q.locationSize;Re++)f(Q.location+Re);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let Re=0;Re<Q.locationSize;Re++)w(Q.location+Re,ke/Q.locationSize,Ae,ue,ke*Pe,ke/Q.locationSize*Re*Pe,Fe)}}else if($!==void 0){const ue=$[ge];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(Q.location,ue);break;case 3:i.vertexAttrib3fv(Q.location,ue);break;case 4:i.vertexAttrib4fv(Q.location,ue);break;default:i.vertexAttrib1fv(Q.location,ue)}}}}y()}function L(){O();for(const k in n){const X=n[k];for(const te in X){const U=X[te];for(const J in U){const ae=U[J];for(const $ in ae)h(ae[$].object),delete ae[$];delete U[J]}}delete n[k]}}function R(k){if(n[k.id]===void 0)return;const X=n[k.id];for(const te in X){const U=X[te];for(const J in U){const ae=U[J];for(const $ in ae)h(ae[$].object),delete ae[$];delete U[J]}}delete n[k.id]}function g(k){for(const X in n){const te=n[X];for(const U in te){const J=te[U];if(J[k.id]===void 0)continue;const ae=J[k.id];for(const $ in ae)h(ae[$].object),delete ae[$];delete J[k.id]}}}function b(k){for(const X in n){const te=n[X],U=k.isInstancedMesh===!0?k.id:0,J=te[U];if(J!==void 0){for(const ae in J){const $=J[ae];for(const ge in $)h($[ge].object),delete $[ge];delete J[ae]}delete te[U],Object.keys(te).length===0&&delete n[X]}}}function O(){D(),a=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:D,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfObject:b,releaseStatesOfProgram:g,initAttributes:M,enableAttribute:f,disableUnusedAttributes:y}}function Df(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let m=0;m<h;m++)d+=c[m];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Nf(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const g=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==On&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){const b=g===Hn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(g!==_n&&g!==Fn&&!b&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Qe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Qe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:T,maxSamples:L,samples:R}}function Uf(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new di,o=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||s;return s=d,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,m){const _=u.clippingPlanes,M=u.clipIntersection,f=u.clipShadows,p=i.get(u);if(!s||_===null||_.length===0||r&&!f)r?h(null):c();else{const y=r?0:n,w=y*4;let T=p.clippingState||null;l.value=T,T=h(_,d,w,m);for(let L=0;L!==w;++L)T[L]=t[L];p.clippingState=T,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,m,_){const M=u!==null?u.length:0;let f=null;if(M!==0){if(f=l.value,_!==!0||f===null){const p=m+M*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(f===null||f.length<p)&&(f=new Float32Array(p));for(let w=0,T=m;w!==M;++w,T+=4)a.copy(u[w]).applyMatrix4(y,o),a.normal.toArray(f,T),f[T+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,f}}class ro extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Bl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new vs(5,5,5),r=new wi({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:un,blending:Vi});r.uniforms.tEquirect.value=t;const a=new vi(s,r),o=t.minFilter;return t.minFilter===fi&&(t.minFilter=dn),new Wa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Ho=256,kf=3,Ff=20,Kl=256,ql=16,Of=3,Bf=new K,zf=new ct;class dr{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Wa(1,10,null),this._boxMesh=new vi(new vs(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Bf}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);const u=l.autoClear,d=l.autoClearColor,m=l.autoClearDepth,_=l.autoClearStencil,M=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,M===null&&(e.background=l.getClearColor(zf));const f=new Wa(n,s,h);return f.position.copy(o),f.update(l,e),l.autoClear=u,l.autoClearColor=d,l.autoClearDepth=m,l.autoClearStencil=_,e.background=M,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Ho,rd(e))}_fromTexture(e,t){e.mapping===$i||e.mapping===hs?this._setSize(e.image.length===0?Ho:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=Go(e,!1,!1),n=Math.log2(e)-kf;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Go(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===$i||e.mapping===hs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wo()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Vo()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Hf(),this._integrationMaterial=Gf());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/ql);for(let a=0;a<=n;a++){const o=dr.lodToRoughness(a,n);if(a>n-Of)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(Kl*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Vf());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}}function Go(i,e,t){return new ro(i,{minFilter:fi,generateMipmaps:e,type:Hn,colorSpace:or,depthBuffer:t})}function xs(i,e,t){return new wi({name:i,uniforms:e,vertexShader:at.cube_vert,fragmentShader:t,side:un,blending:Vi,depthTest:!1,depthWrite:!1})}function Hf(){return xs("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Kl}u

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
	`)}function Gf(){return xs("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:ql}},`

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
	`)}function Vf(){return xs("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Ff}
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
	`)}function Vo(){return xs("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Wo(){return xs("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Wf(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,m=!1){return d==null?null:m?a(d):r(d)}function r(d){if(d&&d.isTexture){const m=d.mapping;if(m===br||m===Tr)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const M=new ro(_.height);return M.fromEquirectangularTexture(i,d),e.set(d,M),d.addEventListener("dispose",c),o(M.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const m=d.mapping,_=m===br||m===Tr,M=m===$i||m===hs;if(_||M){let f=t.get(d);const p=f!==void 0?f.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new dr(i)),f=_?n.fromEquirectangular(d,f):n.fromCubemap(d,f),f.texture.pmremVersion=d.pmremVersion,t.set(d,f),f.texture;if(f!==void 0)return f.texture;{const y=d.image;return _&&y&&y.height>0||M&&y&&l(y)?(n===null&&(n=new dr(i)),f=_?n.fromEquirectangular(d):n.fromCubemap(d),f.texture.pmremVersion=d.pmremVersion,t.set(d,f),d.addEventListener("dispose",h),f.texture):null}}}return d}function o(d,m){return m===br?d.mapping=$i:m===Tr&&(d.mapping=hs),d}function l(d){let m=0;const _=6;for(let M=0;M<_;M++)d[M]!==void 0&&m++;return m===_}function c(d){const m=d.target;m.removeEventListener("dispose",c);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function h(d){const m=d.target;m.removeEventListener("dispose",h);const _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Xf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Wi("WebGLRenderer: "+n+" extension not supported."),s}}}function $f(i,e,t,n){const s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){l(_.target)}function l(_){_.index!==null&&e.remove(_.index);for(const f in _.attributes)e.remove(_.attributes[f]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);const M=r.get(_);M&&(e.remove(M),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(_,M){return s[M.id]!==void 0||(M.addEventListener("dispose",o),s[M.id]=new WeakRef(M),a.register(M,M.id,M),t.memory.geometries++),M}function h(_){const M=_.attributes;for(const f in M)e.update(M[f],i.ARRAY_BUFFER)}function u(_){const M=_.index,f=_.attributes.position;let p=0;if(f===void 0)return;const y=M!==null?M.array.length:f.array.length/3-1,w=f.count>=65535?kl:Ul,T=new w(Math.ceil(y/3)*6,1),L=T.array;if(M!==null){const g=M.array;p=M.version;for(let b=0,O=0;b<y;b+=3){const D=g[b+0],k=g[b+1],X=g[b+2];L[O++]=D,L[O++]=k,L[O++]=k,L[O++]=X,L[O++]=X,L[O++]=D}}else{p=f.version;for(let g=0,b=0;g<y;g+=3){const O=g+0,D=g+1,k=g+2;L[b++]=O,L[b++]=D,L[b++]=D,L[b++]=k,L[b++]=k,L[b++]=O}}T.version=p;const R=r.get(_);R&&e.remove(R),r.set(_,T)}function d(_){const M=r.get(_);if(M){const f=_.index;f!==null&&M.version<f.version&&u(_)}else u(_);return r.get(_)}function m(){for(const _ in s){const M=s[_].deref();M!==void 0&&l(M)}}return{get:c,update:h,getWireframeAttribute:d,dispose:m}}function Kf(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){i.drawElements(n,d,r,u*a),t.update(d,n,1)}function c(u,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,u*a,m),t.update(d,n,m))}function h(u,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,m);let M=0;for(let f=0;f<m;f++)M+=d[f];t.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function qf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:vt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Yf(i,e,t){const n=new WeakMap,s=new It;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let D=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",D)};var m=D;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let T=0;_===!0&&(T=1),M===!0&&(T=2),f===!0&&(T=3);let L=o.attributes.position.count*T,R=1;L>e.maxTextureSize&&(R=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const g=new Float32Array(L*R*4*u),b=new Il(g,L,R,u);b.type=Fn,b.needsUpdate=!0;const O=T*4;for(let k=0;k<u;k++){const X=p[k],te=y[k],U=w[k],J=L*R*4*k;for(let ae=0;ae<X.count;ae++){const $=ae*O;_===!0&&(s.fromBufferAttribute(X,ae),g[J+$+0]=s.x,g[J+$+1]=s.y,g[J+$+2]=s.z,g[J+$+3]=0),M===!0&&(s.fromBufferAttribute(te,ae),g[J+$+4]=s.x,g[J+$+5]=s.y,g[J+$+6]=s.z,g[J+$+7]=0),f===!0&&(s.fromBufferAttribute(U,ae),g[J+$+8]=s.x,g[J+$+9]=s.y,g[J+$+10]=s.z,g[J+$+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:b,size:new ot(L,R)},n.set(o,d),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let _=0;for(let f=0;f<c.length;f++)_+=c[f];const M=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(i,"morphTargetBaseInfluence",M),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Zf(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==h&&(m.update(),r.set(m,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const Jf={[fl]:"LINEAR_TONE_MAPPING",[pl]:"REINHARD_TONE_MAPPING",[ml]:"CINEON_TONE_MAPPING",[gl]:"ACES_FILMIC_TONE_MAPPING",[vl]:"AGX_TONE_MAPPING",[xl]:"NEUTRAL_TONE_MAPPING",[_l]:"CUSTOM_TONE_MAPPING"};function jf(i,e,t,n,s,r){const a=new Bn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const h=new Gn;h.setAttribute("position",new En([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new En([0,2,0,0,2,0],2));const u=new Fd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new vi(h,u),m=new Xd(-1,1,1,-1,0,1);let _=null,M=null,f=!1,p,y=null,w=[],T=!1;this.setSize=function(L,R){a.setSize(L,R),o!==null&&o.setSize(L,R),l!==null&&l.setSize(L,R);for(let g=0;g<w.length;g++){const b=w[g];b.setSize&&b.setSize(L,R)}},this.setEffects=function(L){w=L,T=w.length>0&&w[0].isRenderPass===!0;const R=a.width,g=a.height;w.length>0&&o===null&&(o=new Bn(R,g,{type:Hn,depthBuffer:!1,stencilBuffer:!1}),l=new Bn(R,g,{type:Hn,depthBuffer:!1,stencilBuffer:!1}));const b=s===!0&&w.some(O=>O.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&c===null&&(c=new qi(R,g),r===!0&&(c.format=pi,c.type=Ki)),a.dispose(),a.depthTexture=b?c:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let O=0;O<w.length;O++){const D=w[O];D.setSize&&D.setSize(R,g),b&&D.needsDepthTexture===!0&&D.setDepthTexture&&D.setDepthTexture(c)}},this.begin=function(L,R){if(f||L.toneMapping===ti&&w.length===0)return!1;if(y=R,R!==null){const g=R.width,b=R.height;(a.width!==g||a.height!==b)&&this.setSize(g,b)}return T===!1&&L.setRenderTarget(a),p=L.toneMapping,L.toneMapping=ti,!0},this.hasRenderPass=function(){return T},this.end=function(L,R){L.toneMapping=p,f=!0;let g=a,b=o;for(let O=0;O<w.length;O++){const D=w[O];D.enabled!==!1&&(D.render(L,b,g,R),D.needsSwap!==!1&&(g=b,b=b===o?l:o))}if(_!==L.outputColorSpace||M!==L.toneMapping){_=L.outputColorSpace,M=L.toneMapping,u.defines={},ht.getTransfer(_)===Et&&(u.defines.SRGB_TRANSFER="");const O=Jf[M];O&&(u.defines[O]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=g.texture,L.setRenderTarget(y),L.render(d,m),y=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}const Yl=new rn,Zl=new qi(1,1),Jl=new zl(1),jl=new Il,Ql=new fd,ec=new Bl,Xo=[],$o=[],Ko=new Float32Array(16),qo=new Float32Array(9),Yo=new Float32Array(4);function ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Xo[s];if(r===void 0&&(r=new Float32Array(s),Xo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Wt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function mr(i,e){let t=$o[e];t===void 0&&(t=new Int32Array(e),$o[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Qf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Wt(t,e)}}function tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Wt(t,e)}}function np(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Wt(t,e)}}function ip(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;Yo.set(n),i.uniformMatrix2fv(this.addr,!1,Yo),Wt(t,n)}}function sp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;qo.set(n),i.uniformMatrix3fv(this.addr,!1,qo),Wt(t,n)}}function rp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;Ko.set(n),i.uniformMatrix4fv(this.addr,!1,Ko),Wt(t,n)}}function ap(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function op(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Wt(t,e)}}function lp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Wt(t,e)}}function cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Wt(t,e)}}function dp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Wt(t,e)}}function hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Wt(t,e)}}function fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Wt(t,e)}}function gr(i){return i.version===0&&(i.compareFunction=Ll,i.needsUpdate=!0),i}function pp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=gr(Zl):r=Yl,t.setTexture2D(e||r,s)}function mp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ql,s)}function gp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=gr(Jl):r=ec,t.setTextureCube(e||r,s)}function _p(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||jl,s)}function vp(i){switch(i){case 5126:return Qf;case 35664:return ep;case 35665:return tp;case 35666:return np;case 35674:return ip;case 35675:return sp;case 35676:return rp;case 5124:case 35670:return ap;case 35667:case 35671:return op;case 35668:case 35672:return lp;case 35669:case 35673:return cp;case 5125:return dp;case 36294:return up;case 36295:return hp;case 36296:return fp;case 35678:case 36198:case 36298:case 36306:case 35682:return pp;case 35679:case 36299:case 36307:return mp;case 35680:case 36300:case 36308:case 36293:return gp;case 36289:case 36303:case 36311:case 36292:return _p}}function xp(i,e){i.uniform1fv(this.addr,e)}function Sp(i,e){const t=ji(e,this.size,2);i.uniform2fv(this.addr,t)}function yp(i,e){const t=ji(e,this.size,3);i.uniform3fv(this.addr,t)}function Mp(i,e){const t=ji(e,this.size,4);i.uniform4fv(this.addr,t)}function Ep(i,e){const t=ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function bp(i,e){const t=ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tp(i,e){const t=ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ap(i,e){i.uniform1iv(this.addr,e)}function wp(i,e){i.uniform2iv(this.addr,e)}function Rp(i,e){i.uniform3iv(this.addr,e)}function Cp(i,e){i.uniform4iv(this.addr,e)}function Lp(i,e){i.uniform1uiv(this.addr,e)}function Pp(i,e){i.uniform2uiv(this.addr,e)}function Ip(i,e){i.uniform3uiv(this.addr,e)}function Dp(i,e){i.uniform4uiv(this.addr,e)}function Np(i,e,t){const n=this.cache,s=e.length,r=mr(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=gr(Zl):a=Yl;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Up(i,e,t){const n=this.cache,s=e.length,r=mr(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ql,r[a])}function kp(i,e,t){const n=this.cache,s=e.length,r=mr(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=gr(Jl):a=ec;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function Fp(i,e,t){const n=this.cache,s=e.length,r=mr(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||jl,r[a])}function Op(i){switch(i){case 5126:return xp;case 35664:return Sp;case 35665:return yp;case 35666:return Mp;case 35674:return Ep;case 35675:return bp;case 35676:return Tp;case 5124:case 35670:return Ap;case 35667:case 35671:return wp;case 35668:case 35672:return Rp;case 35669:case 35673:return Cp;case 5125:return Lp;case 36294:return Pp;case 36295:return Ip;case 36296:return Dp;case 35678:case 36198:case 36298:case 36306:case 35682:return Np;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return kp;case 36289:case 36303:case 36311:case 36292:return Fp}}class Bp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=vp(t.type)}}class zp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Op(t.type)}}class Hp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Jr=/(\w+)(\])?(\[|\.)?/g;function Zo(i,e){i.seq.push(e),i.map[e.id]=e}function Gp(i,e,t){const n=i.name,s=n.length;for(Jr.lastIndex=0;;){const r=Jr.exec(n),a=Jr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zo(t,c===void 0?new Bp(o,i,e):new zp(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Hp(o),Zo(t,u)),t=u}}}class sr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Gp(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Jo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Vp=37297;let Wp=0;function Xp(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const jo=new tt;function $p(i){ht._getMatrix(jo,ht.workingColorSpace,i);const e=`mat3( ${jo.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(i)){case lr:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return Qe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Qo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Xp(i.getShaderSource(e),o)}else return r}function Kp(i,e){const t=$p(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const qp={[fl]:"Linear",[pl]:"Reinhard",[ml]:"Cineon",[gl]:"ACESFilmic",[vl]:"AgX",[xl]:"Neutral",[_l]:"Custom"};function Yp(i,e){const t=qp[e];return t===void 0?(Qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Js=new K;function Zp(){ht.getLuminanceCoefficients(Js);const i=Js.x.toFixed(4),e=Js.y.toFixed(4),t=Js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ls).join(`
`)}function jp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Qp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ls(i){return i!==""}function el(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function tl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const em=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xa(i){return i.replace(em,tm)}function tm(i,e){const t=at[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Xa(t)}const nm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nl(i){return i.replace(nm,im)}function im(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function il(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const sm={[Qs]:"SHADOWMAP_TYPE_PCF",[os]:"SHADOWMAP_TYPE_VSM"};function rm(i){return sm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const am={[hs]:"ENVMAP_MODE_REFRACTION"};function om(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":am[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const lm={[hl]:"ENVMAP_BLENDING_MULTIPLY",[Gc]:"ENVMAP_BLENDING_MIX",[Vc]:"ENVMAP_BLENDING_ADD"};function cm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":lm[i.combine]||"ENVMAP_BLENDING_NONE"}function dm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=rm(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=om(t),u=cm(t),d=Jp(t),m=jp(r),_=s.createProgram();let M,f,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(M=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ls).join(`
`),M.length>0&&(M+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ls).join(`
`),f.length>0&&(f+=`
`)):(M=[il(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ls).join(`
`),f=[il(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?at.tonemapping_pars_fragment:"",t.toneMapping!==ti?Yp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,Kp("linearToOutputTexel",t.outputColorSpace),Zp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ls).join(`
`)),a=Xa(a),a=el(a,t),a=tl(a,t),o=Xa(o),o=el(o,t),o=tl(o,t),a=nl(a),o=nl(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,M=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,f=["#define varying in",t.glslVersion===mo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=p+M+a,w=p+f+o,T=Jo(s,s.VERTEX_SHADER,y),L=Jo(s,s.FRAGMENT_SHADER,w);s.attachShader(_,T),s.attachShader(_,L),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(D){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(_)||"",X=s.getShaderInfoLog(T)||"",te=s.getShaderInfoLog(L)||"",U=k.trim(),J=X.trim(),ae=te.trim();let $=!0,ge=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,L);else{const Q=Qo(s,T,"vertex"),le=Qo(s,L,"fragment");vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+Q+`
`+le)}else U!==""?Qe("WebGLProgram: Program Info Log:",U):(J===""||ae==="")&&(ge=!1);ge&&(D.diagnostics={runnable:$,programLog:U,vertexShader:{log:J,prefix:M},fragmentShader:{log:ae,prefix:f}})}s.deleteShader(T),s.deleteShader(L),g=new sr(s,_),b=Qp(s,_)}let g;this.getUniforms=function(){return g===void 0&&R(this),g};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(_,Vp)),O},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wp++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=L,this}let um=0;class hm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new fm(e),t.set(e,n)),n}}class fm{constructor(e){this.id=um++,this.code=e,this.usedTimes=0}}function pm(i){return i===Ai||i===rr||i===ar}function mm(i,e,t,n,s,r){const a=new Dl,o=new hm,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(g){return l.add(g),g===0?"uv":`uv${g}`}function _(g,b,O,D,k,X){const te=D.fog,U=k.geometry,J=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?D.environment:null,ae=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,$=e.get(g.envMap||J,ae),ge=d[g.type];let Q=n.precision;g.precision!==null&&(Q=n.getMaxPrecision(g.precision),Q!==g.precision&&Qe("WebGLProgram.getParameters:",g.precision,"not supported, using",Q,"instead."));const le=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ue=le!==void 0?le.length:0;let ke=0;U.morphAttributes.position!==void 0&&(ke=1),U.morphAttributes.normal!==void 0&&(ke=2),U.morphAttributes.color!==void 0&&(ke=3);let $e,ee,Ae,Pe;if(ge){const we=kn[ge];$e=we.vertexShader,ee=we.fragmentShader}else{$e=g.vertexShader,ee=g.fragmentShader;const we=o.getVertexShaderStage(g),pt=o.getFragmentShaderStage(g);o.update(g,we,pt),Ae=we.id,Pe=pt.id}const Fe=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),Ze=k.isInstancedMesh===!0,Mt=k.isBatchedMesh===!0,qe=!!g.map,gt=!!g.matcap,mt=!!$,st=mt&&$.isPMREMTexture===!0,Ht=!!g.aoMap,At=!!g.lightMap,Gt=!!g.bumpMap&&g.wireframe===!1,bt=!!g.normalMap,en=!!g.displacementMap,wt=!!g.emissiveMap,on=!!g.metalnessMap,Ft=!!g.roughnessMap,Kt=g.anisotropy>0,F=g.clearcoat>0,tn=g.diffuseRoughness>0,Tt=g.dispersion>0,lt=g.retroreflectivity>0,xe=g.iridescence>0,nt=g.sheen>0,We=g.transmission>0,Ye=Kt&&!!g.anisotropyMap,A=F&&!!g.clearcoatMap,x=F&&!!g.clearcoatNormalMap,V=F&&!!g.clearcoatRoughnessMap,fe=tn&&!!g.diffuseRoughnessMap,re=xe&&!!g.iridescenceMap,de=xe&&!!g.iridescenceThicknessMap,Te=nt&&!!g.sheenColorMap,ne=nt&&!!g.sheenRoughnessMap,se=!!g.specularMap,Ee=!!g.specularColorMap,P=!!g.specularIntensityMap,ie=We&&!!g.transmissionMap,j=We&&!!g.thicknessMap,be=!!g.gradientMap,Se=!!g.alphaMap,Me=g.alphaTest>0,Be=!!g.alphaHash,Je=!!g.extensions;let me=ti;g.toneMapped&&(Fe===null||Fe.isXRRenderTarget===!0)&&(me=i.toneMapping);const ze=st?$.isCompressedCubeTexture?$.image[0].mipmaps:$.mipmaps:null,Ve={shaderID:ge,shaderType:g.type,shaderName:g.name,vertexShader:$e,fragmentShader:ee,defines:g.defines,customVertexShaderID:Ae,customFragmentShaderID:Pe,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:Q,batching:Mt,batchingColor:Mt&&k._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&k.instanceColor!==null,instancingMorph:Ze&&k.morphTexture!==null,outputColorSpace:Fe===null?i.outputColorSpace:Fe.isXRRenderTarget===!0?Fe.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:qe,matcap:gt,envMap:mt,envMapMode:mt&&$.mapping,envMapPMREM:st,envMapMaxLod:st?ze.length-1:null,envMapSize:st?ze[0].width:null,aoMap:Ht,lightMap:At,bumpMap:Gt,normalMap:bt,displacementMap:en,emissiveMap:wt,normalMapObjectSpace:bt&&g.normalMapType===$c,normalMapTangentSpace:bt&&g.normalMapType===Ha,packedNormalMap:bt&&g.normalMapType===Ha&&pm(g.normalMap.format),metalnessMap:on,roughnessMap:Ft,anisotropy:Kt,anisotropyMap:Ye,clearcoat:F,clearcoatMap:A,clearcoatNormalMap:x,clearcoatRoughnessMap:V,diffuseRoughness:tn,diffuseRoughnessMap:fe,dispersion:Tt,retroreflection:lt,iridescence:xe,iridescenceMap:re,iridescenceThicknessMap:de,sheen:nt,sheenColorMap:Te,sheenRoughnessMap:ne,specularMap:se,specularColorMap:Ee,specularIntensityMap:P,transmission:We,transmissionMap:ie,thicknessMap:j,gradientMap:be,opaque:g.transparent===!1&&g.blending===cs&&g.alphaToCoverage===!1,alphaMap:Se,alphaTest:Me,alphaHash:Be,combine:g.combine,mapUv:qe&&m(g.map.channel),aoMapUv:Ht&&m(g.aoMap.channel),lightMapUv:At&&m(g.lightMap.channel),bumpMapUv:Gt&&m(g.bumpMap.channel),normalMapUv:bt&&m(g.normalMap.channel),displacementMapUv:en&&m(g.displacementMap.channel),emissiveMapUv:wt&&m(g.emissiveMap.channel),metalnessMapUv:on&&m(g.metalnessMap.channel),roughnessMapUv:Ft&&m(g.roughnessMap.channel),anisotropyMapUv:Ye&&m(g.anisotropyMap.channel),clearcoatMapUv:A&&m(g.clearcoatMap.channel),clearcoatNormalMapUv:x&&m(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&m(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:fe&&m(g.diffuseRoughnessMap.channel),iridescenceMapUv:re&&m(g.iridescenceMap.channel),iridescenceThicknessMapUv:de&&m(g.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(g.sheenColorMap.channel),sheenRoughnessMapUv:ne&&m(g.sheenRoughnessMap.channel),specularMapUv:se&&m(g.specularMap.channel),specularColorMapUv:Ee&&m(g.specularColorMap.channel),specularIntensityMapUv:P&&m(g.specularIntensityMap.channel),transmissionMapUv:ie&&m(g.transmissionMap.channel),thicknessMapUv:j&&m(g.thicknessMap.channel),alphaMapUv:Se&&m(g.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(bt||Kt),vertexNormals:!!U.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!U.attributes.uv&&(qe||Se),fog:!!te,useFog:g.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||U.attributes.normal===void 0&&bt===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Re,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:ke,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:X.filter(we=>we.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,decodeVideoTexture:qe&&g.map.isVideoTexture===!0&&ht.getTransfer(g.map.colorSpace)===Et,decodeVideoTextureEmissive:wt&&g.emissiveMap.isVideoTexture===!0&&ht.getTransfer(g.emissiveMap.colorSpace)===Et,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Qn,flipSided:g.side===un,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Je&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&g.extensions.multiDraw===!0||Mt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Ve.vertexUv1s=l.has(1),Ve.vertexUv2s=l.has(2),Ve.vertexUv3s=l.has(3),l.clear(),Ve}function M(g){const b=[];if(g.shaderID?b.push(g.shaderID):(b.push(g.customVertexShaderID),b.push(g.customFragmentShaderID)),g.defines!==void 0)for(const O in g.defines)b.push(O),b.push(g.defines[O]);return g.isRawShaderMaterial===!1&&(f(b,g),p(b,g),b.push(i.outputColorSpace)),b.push(g.customProgramCacheKey),b.join()}function f(g,b){g.push(b.precision),g.push(b.outputColorSpace),g.push(b.envMapMode),g.push(b.envMapPMREM),g.push(b.envMapMaxLod),g.push(b.envMapSize),g.push(b.mapUv),g.push(b.alphaMapUv),g.push(b.lightMapUv),g.push(b.aoMapUv),g.push(b.bumpMapUv),g.push(b.normalMapUv),g.push(b.displacementMapUv),g.push(b.emissiveMapUv),g.push(b.metalnessMapUv),g.push(b.roughnessMapUv),g.push(b.anisotropyMapUv),g.push(b.clearcoatMapUv),g.push(b.clearcoatNormalMapUv),g.push(b.clearcoatRoughnessMapUv),g.push(b.diffuseRoughnessMapUv),g.push(b.iridescenceMapUv),g.push(b.iridescenceThicknessMapUv),g.push(b.sheenColorMapUv),g.push(b.sheenRoughnessMapUv),g.push(b.specularMapUv),g.push(b.specularColorMapUv),g.push(b.specularIntensityMapUv),g.push(b.transmissionMapUv),g.push(b.thicknessMapUv),g.push(b.combine),g.push(b.fogExp2),g.push(b.sizeAttenuation),g.push(b.morphTargetsCount),g.push(b.numSunLights),g.push(b.numDirLights),g.push(b.numPointLights),g.push(b.numSpotLights),g.push(b.numSpotLightMaps),g.push(b.numHemiLights),g.push(b.numRectAreaLights),g.push(b.numSunLightShadows),g.push(b.numDirLightShadows),g.push(b.numPointLightShadows),g.push(b.numSpotLightShadows),g.push(b.numSpotLightShadowsWithMaps),g.push(b.numLightProbes),g.push(b.numLightProbeGrids),g.push(b.shadowMapType),g.push(b.toneMapping),g.push(b.numClippingPlanes),g.push(b.numClipIntersection),g.push(b.depthPacking)}function p(g,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function y(g){const b=d[g.type];let O;if(b){const D=kn[b];O=Nd.clone(D.uniforms)}else O=g.uniforms;return O}function w(g,b){let O=h.get(b);return O!==void 0?++O.usedTimes:(O=new dm(i,b,g,s),c.push(O),h.set(b,O)),O}function T(g){if(--g.usedTimes===0){const b=c.indexOf(g);c[b]=c[c.length-1],c.pop(),h.delete(g.cacheKey),g.destroy()}}function L(g){o.remove(g)}function R(){o.dispose()}return{getParameters:_,getProgramCacheKey:M,getUniforms:y,acquireProgram:w,releaseProgram:T,releaseShaderCache:L,programs:c,dispose:R}}function gm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function _m(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function sl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function rl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,_,M,f,p){let y=i[e];return y===void 0?(y={id:d.id,object:d,geometry:m,material:_,materialVariant:a(d),groupOrder:M,renderOrder:d.renderOrder,z:f,group:p},i[e]=y):(y.id=d.id,y.object=d,y.geometry=m,y.material=_,y.materialVariant=a(d),y.groupOrder=M,y.renderOrder=d.renderOrder,y.z=f,y.group=p),e++,y}function l(d,m,_,M,f,p,y){y.reversedDepth===!0&&(f=-f);const w=o(d,m,_,M,f,p);_.transmission>0?n.push(w):_.transparent===!0?s.push(w):t.push(w)}function c(d,m,_,M,f,p){const y=o(d,m,_,M,f,p);_.transmission>0?n.unshift(y):_.transparent===!0?s.unshift(y):t.unshift(y)}function h(d,m){t.length>1&&t.sort(d||_m),n.length>1&&n.sort(m||sl),s.length>1&&s.sort(m||sl)}function u(){for(let d=e,m=i.length;d<m;d++){const _=i[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function vm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new rl,i.set(n,[a])):s>=r.length?(a=new rl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function xm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new K,color:new ct};break;case"SpotLight":t={position:new K,direction:new K,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":t={color:new ct,position:new K,halfWidth:new K,halfHeight:new K};break}return i[e.id]=t,t}}}function Sm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let ym=0;function Mm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Em(i){const e=new xm,t=Sm(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new K);const s=new K,r=new Lt,a=new Lt;function o(c){let h=0,u=0,d=0;for(let X=0;X<9;X++)n.probe[X].set(0,0,0);let m=0,_=0,M=0,f=0,p=0,y=0,w=0,T=0,L=0,R=0,g=0,b=0,O=0,D=0;c.sort(Mm);for(let X=0,te=c.length;X<te;X++){const U=c[X],J=U.color,ae=U.intensity,$=U.distance;let ge=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Ai?ge=U.shadow.map.texture:ge=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=J.r*ae,u+=J.g*ae,d+=J.b*ae;else if(U.isLightProbe){for(let Q=0;Q<9;Q++)n.probe[Q].addScaledVector(U.sh.coefficients[Q],ae);D++}else if(U.isSunLight){const Q=e.get(U);if(Q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const le=U.shadow,ue=t.get(U);ue.shadowIntensity=le.intensity,ue.shadowBias=le.bias,ue.shadowNormalBias=le.normalBias,ue.shadowRadius=le.radius,ue.shadowMapSize.copy(le.mapSize).multiply(le.getFrameExtents()),n.sunShadow[_]=ue,n.sunShadowMap[_]=ge;const ke=le.getViewportCount();for(let $e=0;$e<ke;$e++)n.sunShadowMatrix[M+$e]=le.getMatrix($e),n.sunShadowCascade[M+$e]=le._cascadeData[$e];M+=ke,_++}n.sun[m]=Q,m++}else if(U.isDirectionalLight){const Q=e.get(U);if(Q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const le=U.shadow,ue=t.get(U);ue.shadowIntensity=le.intensity,ue.shadowBias=le.bias,ue.shadowNormalBias=le.normalBias,ue.shadowRadius=le.radius,ue.shadowMapSize=le.mapSize,n.directionalShadow[f]=ue,n.directionalShadowMap[f]=ge,n.directionalShadowMatrix[f]=U.shadow.matrix,L++}n.directional[f]=Q,f++}else if(U.isSpotLight){const Q=e.get(U);Q.position.setFromMatrixPosition(U.matrixWorld),Q.color.copy(J).multiplyScalar(ae),Q.distance=$,Q.coneCos=Math.cos(U.angle),Q.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Q.decay=U.decay,n.spot[y]=Q;const le=U.shadow;if(U.map&&(n.spotLightMap[b]=U.map,b++,le.updateMatrices(U),U.castShadow&&O++),n.spotLightMatrix[y]=le.matrix,U.castShadow){const ue=t.get(U);ue.shadowIntensity=le.intensity,ue.shadowBias=le.bias,ue.shadowNormalBias=le.normalBias,ue.shadowRadius=le.radius,ue.shadowMapSize=le.mapSize,n.spotShadow[y]=ue,n.spotShadowMap[y]=ge,g++}y++}else if(U.isRectAreaLight){const Q=e.get(U);Q.color.copy(J).multiplyScalar(ae),Q.halfWidth.set(U.width*.5,0,0),Q.halfHeight.set(0,U.height*.5,0),n.rectArea[w]=Q,w++}else if(U.isPointLight){const Q=e.get(U);if(Q.color.copy(U.color).multiplyScalar(U.intensity),Q.distance=U.distance,Q.decay=U.decay,U.castShadow){const le=U.shadow,ue=t.get(U);ue.shadowIntensity=le.intensity,ue.shadowBias=le.bias,ue.shadowNormalBias=le.normalBias,ue.shadowRadius=le.radius,ue.shadowMapSize=le.mapSize,ue.shadowCameraNear=le.camera.near,ue.shadowCameraFar=le.camera.far,n.pointShadow[p]=ue,n.pointShadowMap[p]=ge,n.pointShadowMatrix[p]=U.shadow.matrix,R++}n.point[p]=Q,p++}else if(U.isHemisphereLight){const Q=e.get(U);Q.skyColor.copy(U.color).multiplyScalar(ae),Q.groundColor.copy(U.groundColor).multiplyScalar(ae),n.hemi[T]=Q,T++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const k=n.hash;(k.sunLength!==m||k.directionalLength!==f||k.pointLength!==p||k.spotLength!==y||k.rectAreaLength!==w||k.hemiLength!==T||k.numSunShadows!==_||k.numDirectionalShadows!==L||k.numPointShadows!==R||k.numSpotShadows!==g||k.numSpotMaps!==b||k.numLightProbes!==D)&&(n.sun.length=m,n.directional.length=f,n.spot.length=y,n.rectArea.length=w,n.point.length=p,n.hemi.length=T,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=L,n.directionalShadowMap.length=L,n.directionalShadowMatrix.length=L,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+b-O,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=O,n.numLightProbes=D,k.sunLength=m,k.directionalLength=f,k.pointLength=p,k.spotLength=y,k.rectAreaLength=w,k.hemiLength=T,k.numSunShadows=_,k.numDirectionalShadows=L,k.numPointShadows=R,k.numSpotShadows=g,k.numSpotMaps=b,k.numLightProbes=D,n.version=ym++)}function l(c,h){let u=0,d=0,m=0,_=0,M=0,f=0;const p=h.matrixWorldInverse;for(let y=0,w=c.length;y<w;y++){const T=c[y];if(T.isSunLight){const L=n.sun[u];L.direction.setFromMatrixPosition(T.matrixWorld),L.direction.transformDirection(p),u++}else if(T.isDirectionalLight){const L=n.directional[d];L.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(s),L.direction.transformDirection(p),d++}else if(T.isSpotLight){const L=n.spot[_];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(s),L.direction.transformDirection(p),_++}else if(T.isRectAreaLight){const L=n.rectArea[M];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),a.identity(),r.copy(T.matrixWorld),r.premultiply(p),a.extractRotation(r),L.halfWidth.set(T.width*.5,0,0),L.halfHeight.set(0,T.height*.5,0),L.halfWidth.applyMatrix4(a),L.halfHeight.applyMatrix4(a),M++}else if(T.isPointLight){const L=n.point[m];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),m++}else if(T.isHemisphereLight){const L=n.hemi[f];L.direction.setFromMatrixPosition(T.matrixWorld),L.direction.transformDirection(p),f++}}}return{setup:o,setupView:l,state:n}}function al(i){const e=new Em(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function a(u){u.isLightProbeGrid?s.push(u):t.push(u)}function o(u){n.push(u)}function l(){e.setup(t),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function c(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function bm(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new al(i),e.set(s,[o])):r>=a.length?(o=new al(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Tm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Am=`uniform sampler2D shadow_pass;
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
}`,wm=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],Rm=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],ol=new Lt,as=new K,jr=new K;function Cm(i,e,t){let n=new ms;const s=new ot,r=new ot,a=new It,o=new zd,l=new Hd,c={},h=t.maxTextureSize,u={[Ti]:un,[un]:Ti,[Qn]:Qn},d=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:Tm,fragmentShader:Am}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new Gn;_.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new vi(_,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qs;let p=this.type;this.render=function(R,g,b){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||R.length===0)return;this.type===Ec&&(Qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Qs);const O=i.getRenderTarget(),D=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),X=i.state;X.setBlending(Vi),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const te=p!==this.type;te&&g.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(J=>J.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,J=R.length;U<J;U++){const ae=R[U],$=ae.shadow;if($===void 0){Qe("WebGLShadowMap:",ae,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ge=$.getFrameExtents();s.multiply(ge),r.copy($.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ge.x),s.x=r.x*ge.x,$.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ge.y),s.y=r.y*ge.y,$.mapSize.y=r.y));const Q=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=Q,$.map===null||te===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===os){if(ae.isPointLight){Qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Bn(s.x,s.y,{format:Ai,type:Hn,minFilter:dn,magFilter:dn,generateMipmaps:!1}),$.map.texture.name=ae.name+".shadowMap",$.map.depthTexture=new qi(s.x,s.y,Fn),$.map.depthTexture.name=ae.name+".shadowMapDepth",$.map.depthTexture.format=gi,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Jt,$.map.depthTexture.magFilter=Jt}else ae.isPointLight?($.map=new ro(s.x),$.map.depthTexture=new zl(s.x,zn)):($.map=new Bn(s.x,s.y),$.map.depthTexture=new qi(s.x,s.y,zn)),$.map.depthTexture.name=ae.name+".shadowMap",$.map.depthTexture.format=gi,this.type===Qs?($.map.depthTexture.compareFunction=Q?Cl:Rl,$.map.depthTexture.minFilter=dn,$.map.depthTexture.magFilter=dn):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Jt,$.map.depthTexture.magFilter=Jt);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==s.x||$.map.height!==s.y)&&$.map.setSize(s.x,s.y);const le=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();ae.isPointLight!==!0&&$.updateMatrices(ae,b);const ue=($.camera.layers.mask&4294967294)!==0?$.camera.layers:b.layers;for(let ke=0;ke<le;ke++){const $e=$.getCamera(ke);if(ae.isPointLight){const ee=$.camera,Ae=$.matrix,Pe=ae.distance||ee.far;Pe!==ee.far&&(ee.far=Pe,ee.updateProjectionMatrix()),as.setFromMatrixPosition(ae.matrixWorld),ee.position.copy(as),jr.copy(ee.position),jr.add(wm[ke]),ee.up.copy(Rm[ke]),ee.lookAt(jr),ee.updateMatrixWorld(),Ae.makeTranslation(-as.x,-as.y,-as.z),ol.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),$._frustum.setFromProjectionMatrix(ol,ee.coordinateSystem,ee.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,ke),i.clear();else{ke===0&&(i.setRenderTarget($.map),i.clear());const ee=$.getViewport(ke);a.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),X.viewport(a)}n=$.getFrustum(ke),T(g,b,$e,ae,ue,this.type)}$.isPointLightShadow!==!0&&this.type===os&&y($,b),$.needsUpdate=!1}p=this.type,f.needsUpdate=!1,i.setRenderTarget(O,D,k)};function y(R,g){const b=e.update(M);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null?R.mapPass=new Bn(s.x,s.y,{format:Ai,type:Hn}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value.set(R.map.width,R.map.height),d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(g,null,b,d,M,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value.set(R.map.width,R.map.height),m.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(g,null,b,m,M,null)}function w(R,g,b,O){let D=null;const k=b.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(k!==void 0)D=k;else if(D=b.isPointLight===!0?l:o,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const X=D.uuid,te=g.uuid;let U=c[X];U===void 0&&(U={},c[X]=U);let J=U[te];J===void 0&&(J=D.clone(),U[te]=J,g.addEventListener("dispose",L)),D=J}if(D.visible=g.visible,D.wireframe=g.wireframe,O===os?D.side=g.shadowSide!==null?g.shadowSide:g.side:D.side=g.shadowSide!==null?g.shadowSide:u[g.side],D.alphaMap=g.alphaMap,D.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,D.map=g.map,D.clipShadows=g.clipShadows,D.clippingPlanes=g.clippingPlanes,D.clipIntersection=g.clipIntersection,D.displacementMap=g.displacementMap,D.displacementScale=g.displacementScale,D.displacementBias=g.displacementBias,D.wireframeLinewidth=g.wireframeLinewidth,D.linewidth=g.linewidth,b.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const X=i.properties.get(D);X.light=b}return D}function T(R,g,b,O,D,k){if(R.visible===!1)return;if(R.layers.test(D)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&k===os)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,R.matrixWorld);const U=e.update(R),J=R.material;if(Array.isArray(J)){const ae=U.groups;for(let $=0,ge=ae.length;$<ge;$++){const Q=ae[$],le=J[Q.materialIndex];if(le&&le.visible){const ue=w(R,le,O,k);R.onBeforeShadow(i,R,g,b,U,ue,Q),i.renderBufferDirect(b,null,U,ue,R,Q),R.onAfterShadow(i,R,g,b,U,ue,Q)}}}else if(J.visible){const ae=w(R,J,O,k);R.onBeforeShadow(i,R,g,b,U,ae,null),i.renderBufferDirect(b,null,U,ae,R,null),R.onAfterShadow(i,R,g,b,U,ae,null)}}const te=R.children;for(let U=0,J=te.length;U<J;U++)T(te[U],g,b,O,D,k)}function L(R){R.target.removeEventListener("dispose",L);for(const b in c){const O=c[b],D=R.target.uuid;D in O&&(O[D].dispose(),delete O[D])}}}function Lm(i,e){function t(){let P=!1;const ie=new It;let j=null;const be=new It(0,0,0,0);return{setMask:function(Se){j!==Se&&!P&&(i.colorMask(Se,Se,Se,Se),j=Se)},setLocked:function(Se){P=Se},setClear:function(Se,Me,Be,Je,me){me===!0&&(Se*=Je,Me*=Je,Be*=Je),ie.set(Se,Me,Be,Je),be.equals(ie)===!1&&(i.clearColor(Se,Me,Be,Je),be.copy(ie))},reset:function(){P=!1,j=null,be.set(-1,0,0,0)}}}function n(){let P=!1,ie=!1,j=null,be=null,Se=null;return{setReversed:function(Me){if(ie!==Me){const Be=e.get("EXT_clip_control");Me?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),ie=Me;const Je=Se;Se=null,this.setClear(Je)}},getReversed:function(){return ie},setTest:function(Me){Me?Re(i.DEPTH_TEST):Ze(i.DEPTH_TEST)},setMask:function(Me){j!==Me&&!P&&(i.depthMask(Me),j=Me)},setFunc:function(Me){if(ie&&(Me=id[Me]),be!==Me){switch(Me){case na:i.depthFunc(i.NEVER);break;case ia:i.depthFunc(i.ALWAYS);break;case sa:i.depthFunc(i.LESS);break;case us:i.depthFunc(i.LEQUAL);break;case ra:i.depthFunc(i.EQUAL);break;case aa:i.depthFunc(i.GEQUAL);break;case oa:i.depthFunc(i.GREATER);break;case la:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=Me}},setLocked:function(Me){P=Me},setClear:function(Me){Se!==Me&&(Se=Me,ie&&(Me=1-Me),i.clearDepth(Me))},reset:function(){P=!1,j=null,be=null,Se=null,ie=!1}}}function s(){let P=!1,ie=null,j=null,be=null,Se=null,Me=null,Be=null,Je=null,me=null;return{setTest:function(ze){P||(ze?Re(i.STENCIL_TEST):Ze(i.STENCIL_TEST))},setMask:function(ze){ie!==ze&&!P&&(i.stencilMask(ze),ie=ze)},setFunc:function(ze,Ve,we){(j!==ze||be!==Ve||Se!==we)&&(i.stencilFunc(ze,Ve,we),j=ze,be=Ve,Se=we)},setOp:function(ze,Ve,we){(Me!==ze||Be!==Ve||Je!==we)&&(i.stencilOp(ze,Ve,we),Me=ze,Be=Ve,Je=we)},setLocked:function(ze){P=ze},setClear:function(ze){me!==ze&&(i.clearStencil(ze),me=ze)},reset:function(){P=!1,ie=null,j=null,be=null,Se=null,Me=null,Be=null,Je=null,me=null}}}const r=new t,a=new n,o=new s;let l={};const c=new WeakMap;let h={},u={},d={},m=new WeakMap,_=[],M=null,f=!1,p=null,y=null,w=null,T=null,L=null,R=null,g=null,b=new ct(0,0,0),O=0,D=!1,k=null,X=null,te=null,U=null,J=null;const ae=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ge=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(ge=parseFloat(/^WebGL (\d)/.exec(Q)[1]),$=ge>=1):Q.indexOf("OpenGL ES")!==-1&&(ge=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),$=ge>=2);let le=null,ue={};const ke=i.getParameter(i.SCISSOR_BOX),$e=i.getParameter(i.VIEWPORT),ee=new It().fromArray(ke),Ae=new It().fromArray($e);function Pe(P,ie,j,be){const Se=new Uint8Array(4),Me=i.createTexture();i.bindTexture(P,Me),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<j;Be++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(ie+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return Me}const Fe={};Fe[i.TEXTURE_2D]=Pe(i.TEXTURE_2D,i.TEXTURE_2D,1),Fe[i.TEXTURE_CUBE_MAP]=Pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Fe[i.TEXTURE_2D_ARRAY]=Pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Fe[i.TEXTURE_3D]=Pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Re(i.DEPTH_TEST),a.setFunc(us),Gt(!1),bt(ho),Re(i.CULL_FACE),Ht(Vi);function Re(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function Ze(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Mt(P,ie){return d[P]!==ie?(i.bindFramebuffer(P,ie),d[P]=ie,P===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ie),P===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function qe(P,ie){let j=_,be=!1;if(P){j=m.get(ie),j===void 0&&(j=[],m.set(ie,j));const Se=P.textures;if(j.length!==Se.length||j[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,Be=Se.length;Me<Be;Me++)j[Me]=i.COLOR_ATTACHMENT0+Me;j.length=Se.length,be=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,be=!0);be&&i.drawBuffers(j)}function gt(P){return M!==P?(i.useProgram(P),M=P,!0):!1}const mt={[Gi]:i.FUNC_ADD,[Tc]:i.FUNC_SUBTRACT,[Ac]:i.FUNC_REVERSE_SUBTRACT};mt[wc]=i.MIN,mt[Rc]=i.MAX;const st={[Cc]:i.ZERO,[Lc]:i.ONE,[Pc]:i.SRC_COLOR,[dl]:i.SRC_ALPHA,[Fc]:i.SRC_ALPHA_SATURATE,[Uc]:i.DST_COLOR,[Dc]:i.DST_ALPHA,[Ic]:i.ONE_MINUS_SRC_COLOR,[ul]:i.ONE_MINUS_SRC_ALPHA,[kc]:i.ONE_MINUS_DST_COLOR,[Nc]:i.ONE_MINUS_DST_ALPHA,[Oc]:i.CONSTANT_COLOR,[Bc]:i.ONE_MINUS_CONSTANT_COLOR,[zc]:i.CONSTANT_ALPHA,[Hc]:i.ONE_MINUS_CONSTANT_ALPHA};function Ht(P,ie,j,be,Se,Me,Be,Je,me,ze){if(P===Vi){f===!0&&(Ze(i.BLEND),f=!1);return}if(f===!1&&(Re(i.BLEND),f=!0),P!==bc){if(P!==p||ze!==D){if((y!==Gi||L!==Gi)&&(i.blendEquation(i.FUNC_ADD),y=Gi,L=Gi),ze)switch(P){case cs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ta:i.blendFunc(i.ONE,i.ONE);break;case fo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case po:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:vt("WebGLState: Invalid blending: ",P);break}else switch(P){case cs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ta:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case fo:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case po:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",P);break}w=null,T=null,R=null,g=null,b.set(0,0,0),O=0,p=P,D=ze}return}Se=Se||ie,Me=Me||j,Be=Be||be,(ie!==y||Se!==L)&&(i.blendEquationSeparate(mt[ie],mt[Se]),y=ie,L=Se),(j!==w||be!==T||Me!==R||Be!==g)&&(i.blendFuncSeparate(st[j],st[be],st[Me],st[Be]),w=j,T=be,R=Me,g=Be),(Je.equals(b)===!1||me!==O)&&(i.blendColor(Je.r,Je.g,Je.b,me),b.copy(Je),O=me),p=P,D=!1}function At(P,ie){P.side===Qn?Ze(i.CULL_FACE):Re(i.CULL_FACE);let j=P.side===un;ie&&(j=!j),Gt(j),P.blending===cs&&P.transparent===!1?Ht(Vi):Ht(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const be=P.stencilWrite;o.setTest(be),be&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),wt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Re(i.SAMPLE_ALPHA_TO_COVERAGE):Ze(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(P){k!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),k=P)}function bt(P){P!==yc?(Re(i.CULL_FACE),P!==X&&(P===ho?i.cullFace(i.BACK):P===Mc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ze(i.CULL_FACE),X=P}function en(P){P!==te&&($&&i.lineWidth(P),te=P)}function wt(P,ie,j){P?(Re(i.POLYGON_OFFSET_FILL),(U!==ie||J!==j)&&(U=ie,J=j,a.getReversed()&&(ie=-ie,j=-j),i.polygonOffset(ie,j))):Ze(i.POLYGON_OFFSET_FILL)}function on(P){P?Re(i.SCISSOR_TEST):Ze(i.SCISSOR_TEST)}function Ft(P){P===void 0&&(P=i.TEXTURE0+ae-1),le!==P&&(i.activeTexture(P),le=P)}function Kt(P,ie,j){j===void 0&&(le===null?j=i.TEXTURE0+ae-1:j=le);let be=ue[j];be===void 0&&(be={type:void 0,texture:void 0},ue[j]=be),(be.type!==P||be.texture!==ie)&&(le!==j&&(i.activeTexture(j),le=j),i.bindTexture(P,ie||Fe[P]),be.type=P,be.texture=ie)}function F(){const P=ue[le];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function tn(){try{i.compressedTexImage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function Tt(){try{i.compressedTexImage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function lt(){try{i.texSubImage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function xe(){try{i.texSubImage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function nt(){try{i.compressedTexSubImage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function We(){try{i.compressedTexSubImage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function Ye(){try{i.texStorage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function A(){try{i.texStorage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function x(){try{i.texImage2D(...arguments)}catch(P){vt("WebGLState:",P)}}function V(){try{i.texImage3D(...arguments)}catch(P){vt("WebGLState:",P)}}function fe(P){return u[P]!==void 0?u[P]:i.getParameter(P)}function re(P,ie){u[P]!==ie&&(i.pixelStorei(P,ie),u[P]=ie)}function de(P){ee.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),ee.copy(P))}function Te(P){Ae.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Ae.copy(P))}function ne(P,ie){let j=c.get(ie);j===void 0&&(j=new WeakMap,c.set(ie,j));let be=j.get(P);be===void 0&&(be=i.getUniformBlockIndex(ie,P.name),i.uniformBlockBinding(ie,be,be),j.set(P,be))}function se(P,ie,j){const Se=c.get(ie).get(P);l[Se]!==j&&(i.bindBufferBase(i.UNIFORM_BUFFER,Se,j),l[Se]=j)}function Ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},le=null,ue={},d={},l={},m=new WeakMap,_=[],M=null,f=!1,p=null,y=null,w=null,T=null,L=null,R=null,g=null,b=new ct(0,0,0),O=0,D=!1,k=null,X=null,te=null,U=null,J=null,ee.set(0,0,i.canvas.width,i.canvas.height),Ae.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Re,disable:Ze,bindFramebuffer:Mt,drawBuffers:qe,useProgram:gt,setBlending:Ht,setMaterial:At,setFlipSided:Gt,setCullFace:bt,setLineWidth:en,setPolygonOffset:wt,setScissorTest:on,activeTexture:Ft,bindTexture:Kt,unbindTexture:F,compressedTexImage2D:tn,compressedTexImage3D:Tt,texImage2D:x,texImage3D:V,pixelStorei:re,getParameter:fe,updateUBOMapping:ne,uniformBlockBinding:se,texStorage2D:Ye,texStorage3D:A,texSubImage2D:lt,texSubImage3D:xe,compressedTexSubImage2D:nt,compressedTexSubImage3D:We,scissor:de,viewport:Te,reset:Ee}}function Pm(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap,u=new Set;let d;const m=new WeakMap,_=new Set,M=new FinalizationRegistry(A=>_.delete(A));let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,x){return f?new OffscreenCanvas(A,x):cr("canvas")}function y(A,x,V){let fe=1;const re=Ye(A);if((re.width>V||re.height>V)&&(fe=V/Math.max(re.width,re.height)),fe<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const de=Math.floor(fe*re.width),Te=Math.floor(fe*re.height);d===void 0&&(d=p(de,Te));const ne=x?p(de,Te):d;return ne.width=de,ne.height=Te,ne.getContext("2d").drawImage(A,0,0,de,Te),Qe("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+de+"x"+Te+")."),ne}else return"data"in A&&Qe("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),A;return A}function w(A){return A.generateMipmaps}function T(A){i.generateMipmap(A)}function L(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function R(A,x,V,fe,re,de=!1){if(A!==null){if(i[A]!==void 0)return i[A];Qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Te;fe&&(Te=e.get("EXT_texture_norm16"),Te||Qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ne=x;if(x===i.RED&&(V===i.FLOAT&&(ne=i.R32F),V===i.HALF_FLOAT&&(ne=i.R16F),V===i.UNSIGNED_BYTE&&(ne=i.R8),V===i.UNSIGNED_SHORT&&Te&&(ne=Te.R16_EXT),V===i.SHORT&&Te&&(ne=Te.R16_SNORM_EXT)),x===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(ne=i.R8UI),V===i.UNSIGNED_SHORT&&(ne=i.R16UI),V===i.UNSIGNED_INT&&(ne=i.R32UI),V===i.BYTE&&(ne=i.R8I),V===i.SHORT&&(ne=i.R16I),V===i.INT&&(ne=i.R32I)),x===i.RG&&(V===i.FLOAT&&(ne=i.RG32F),V===i.HALF_FLOAT&&(ne=i.RG16F),V===i.UNSIGNED_BYTE&&(ne=i.RG8),V===i.UNSIGNED_SHORT&&Te&&(ne=Te.RG16_EXT),V===i.SHORT&&Te&&(ne=Te.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(ne=i.RG8UI),V===i.UNSIGNED_SHORT&&(ne=i.RG16UI),V===i.UNSIGNED_INT&&(ne=i.RG32UI),V===i.BYTE&&(ne=i.RG8I),V===i.SHORT&&(ne=i.RG16I),V===i.INT&&(ne=i.RG32I)),x===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),V===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),V===i.UNSIGNED_INT&&(ne=i.RGB32UI),V===i.BYTE&&(ne=i.RGB8I),V===i.SHORT&&(ne=i.RGB16I),V===i.INT&&(ne=i.RGB32I)),x===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),V===i.UNSIGNED_INT&&(ne=i.RGBA32UI),V===i.BYTE&&(ne=i.RGBA8I),V===i.SHORT&&(ne=i.RGBA16I),V===i.INT&&(ne=i.RGBA32I)),x===i.RGB&&(V===i.UNSIGNED_SHORT&&Te&&(ne=Te.RGB16_EXT),V===i.SHORT&&Te&&(ne=Te.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(ne=i.R11F_G11F_B10F)),x===i.RGBA){const se=de?lr:ht.getTransfer(re);V===i.FLOAT&&(ne=i.RGBA32F),V===i.HALF_FLOAT&&(ne=i.RGBA16F),V===i.UNSIGNED_BYTE&&(ne=se===Et?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&Te&&(ne=Te.RGBA16_EXT),V===i.SHORT&&Te&&(ne=Te.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function g(A,x){let V;return A?x===null||x===zn||x===Ki?V=i.DEPTH24_STENCIL8:x===Fn?V=i.DEPTH32F_STENCIL8:x===fs&&(V=i.DEPTH24_STENCIL8,Qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===zn||x===Ki?V=i.DEPTH_COMPONENT24:x===Fn?V=i.DEPTH_COMPONENT32F:x===fs&&(V=i.DEPTH_COMPONENT16),V}function b(A,x){return w(A)===!0||A.isFramebufferTexture&&A.minFilter!==Jt&&A.minFilter!==dn?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function O(A){const x=new WeakRef(A);n.get(A).__ref=x,_.add(x),M.register(A,x,x)}function D(A){const x=n.get(A).__ref;x!==void 0&&(_.delete(x),M.unregister(x))}function k(A){te(A.target)}function X(A){U(A.target)}function te(A){A.removeEventListener("dispose",k),D(A),ae(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&u.delete(A)}function U(A){A.removeEventListener("dispose",X),D(A),ge(A)}function J(){for(const A of _){const x=A.deref();x!==void 0&&(x.isRenderTarget===!0?U(x):te(x))}_.clear(),u.clear()}function ae(A){const x=n.get(A);if(x.__webglInit===void 0)return;const V=A.source,fe=m.get(V);if(fe){const re=fe[x.__cacheKey];re.usedTimes--,re.usedTimes===0&&$(A),Object.keys(fe).length===0&&m.delete(V)}n.remove(A)}function $(A){const x=n.get(A);i.deleteTexture(x.__webglTexture);const V=A.source,fe=m.get(V);delete fe[x.__cacheKey],a.memory.textures--}function ge(A){const x=n.get(A);x.__depthDisposeCallback&&x.__depthDisposeCallback();const V=A.depthTexture;if(V&&V.renderTarget===A&&te(V),A.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(x.__webglFramebuffer[re]))for(let de=0;de<x.__webglFramebuffer[re].length;de++)i.deleteFramebuffer(x.__webglFramebuffer[re][de]);else i.deleteFramebuffer(x.__webglFramebuffer[re]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[re])}else{if(Array.isArray(x.__webglFramebuffer))for(let re=0;re<x.__webglFramebuffer.length;re++)i.deleteFramebuffer(x.__webglFramebuffer[re]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let re=0;re<x.__webglColorRenderbuffer.length;re++)x.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[re]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const fe=A.textures;for(let re=0,de=fe.length;re<de;re++){const Te=n.get(fe[re]);Te.__webglTexture&&(i.deleteTexture(Te.__webglTexture),a.memory.textures--),n.remove(fe[re])}n.remove(A)}let Q=0;function le(){Q=0}function ue(){return Q}function ke(A){Q=A}function $e(){const A=Q;return A>=s.maxTextures&&Qe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),Q+=1,A}function ee(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.mipmapsAutoUpdate),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function Ae(A,x){const V=n.get(A);if(A.isVideoTexture&&nt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&V.__version!==A.version){const fe=A.image;if(fe===null)Qe("WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)Qe("WebGLRenderer: Texture marked for update but image is incomplete");else{At(V,A,x);return}}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+x)}function Pe(A,x){const V=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){At(V,A,x);return}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+x)}function Fe(A,x){const V=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){At(V,A,x);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+x)}function Re(A,x){const V=n.get(A);if(A.version>0&&V.__version!==A.version){Gt(V,A,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+x)}const Ze={[ca]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[da]:i.MIRRORED_REPEAT},Mt={[Jt]:i.NEAREST,[Wc]:i.NEAREST_MIPMAP_NEAREST,[ws]:i.NEAREST_MIPMAP_LINEAR,[dn]:i.LINEAR,[Ar]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},qe={[qc]:i.NEVER,[Ll]:i.ALWAYS,[Yc]:i.LESS,[Rl]:i.LEQUAL,[Zc]:i.EQUAL,[Cl]:i.GEQUAL,[Jc]:i.GREATER,[jc]:i.NOTEQUAL};function gt(A,x){if(x.type===Fn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===dn||x.magFilter===Ar||x.magFilter===ws||x.magFilter===fi||x.minFilter===dn||x.minFilter===Ar||x.minFilter===ws||x.minFilter===fi)&&Qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Ze[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Ze[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Ze[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Mt[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Mt[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,qe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Jt||x.minFilter!==ws&&x.minFilter!==fi||x.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function mt(A,x){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",k),O(x));const fe=x.source;let re=m.get(fe);re===void 0&&(re={},m.set(fe,re));const de=ee(x);if(de!==A.__cacheKey){re[de]===void 0&&(re[de]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),re[de].usedTimes++;const Te=re[A.__cacheKey];Te!==void 0&&(re[A.__cacheKey].usedTimes--,Te.usedTimes===0&&$(x)),A.__cacheKey=de,A.__webglTexture=re[de].texture}return V}function st(A,x,V){return Math.floor(Math.floor(A/V)/x)}function Ht(A,x,V,fe){const de=A.updateRanges;if(de.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,V,fe,x.data);else{de.sort((P,ie)=>P.start-ie.start);let Te=0;for(let P=1;P<de.length;P++){const ie=de[Te],j=de[P],be=ie.start+ie.count,Se=st(j.start,x.width,4),Me=st(ie.start,x.width,4);j.start<=be+1&&Se===Me&&st(j.start+j.count-1,x.width,4)===Se?ie.count=Math.max(ie.count,j.start+j.count-ie.start):(++Te,de[Te]=j)}de.length=Te+1;const ne=t.getParameter(i.UNPACK_ROW_LENGTH),se=t.getParameter(i.UNPACK_SKIP_PIXELS),Ee=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let P=0,ie=de.length;P<ie;P++){const j=de[P],be=Math.floor(j.start/4),Se=Math.ceil(j.count/4),Me=be%x.width,Be=Math.floor(be/x.width),Je=Se,me=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Me),t.pixelStorei(i.UNPACK_SKIP_ROWS,Be),t.texSubImage2D(i.TEXTURE_2D,0,Me,Be,Je,me,V,fe,x.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ne),t.pixelStorei(i.UNPACK_SKIP_PIXELS,se),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function At(A,x,V){let fe=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(fe=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(fe=i.TEXTURE_3D);const re=mt(A,x),de=x.source;t.bindTexture(fe,A.__webglTexture,i.TEXTURE0+V);const Te=n.get(de);if(de.version!==Te.__version||re===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const me=ht.getPrimaries(ht.workingColorSpace),ze=x.colorSpace===hi?null:ht.getPrimaries(x.colorSpace),Ve=x.colorSpace===hi||me===ze?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let se=y(x.image,!1,s.maxTextureSize);se=We(x,se);const Ee=r.convert(x.format,x.colorSpace),P=r.convert(x.type);let ie=R(x.internalFormat,Ee,P,x.normalized,x.colorSpace,x.isVideoTexture);gt(fe,x);let j;const be=x.mipmaps,Se=x.isVideoTexture!==!0,Me=Te.__version===void 0||re===!0,Be=de.dataReady,Je=b(x,se);if(x.isDepthTexture)ie=g(x.format===pi,x.type),Me&&(Se?t.texStorage2D(i.TEXTURE_2D,1,ie,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,ie,se.width,se.height,0,Ee,P,null));else if(x.isDataTexture)if(be.length>0){Se&&Me&&t.texStorage2D(i.TEXTURE_2D,Je,ie,be[0].width,be[0].height);for(let me=0,ze=be.length;me<ze;me++)j=be[me],Se?Be&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,j.width,j.height,Ee,P,j.data):t.texImage2D(i.TEXTURE_2D,me,ie,j.width,j.height,0,Ee,P,j.data);x.generateMipmaps=!1}else Se?(Me&&t.texStorage2D(i.TEXTURE_2D,Je,ie,se.width,se.height),Be&&Ht(x,se,Ee,P)):t.texImage2D(i.TEXTURE_2D,0,ie,se.width,se.height,0,Ee,P,se.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Se&&Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,ie,be[0].width,be[0].height,se.depth);for(let me=0,ze=be.length;me<ze;me++)if(j=be[me],x.format!==On)if(Ee!==null)if(Se){if(Be)if(x.layerUpdates.size>0){const Ve=zo(j.width,j.height,x.format,x.type);for(const we of x.layerUpdates){const pt=j.data.subarray(we*Ve/j.data.BYTES_PER_ELEMENT,(we+1)*Ve/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,we,j.width,j.height,1,Ee,pt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,0,j.width,j.height,se.depth,Ee,j.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,me,ie,j.width,j.height,se.depth,0,j.data,0,0);else Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?Be&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,0,j.width,j.height,se.depth,Ee,P,j.data):t.texImage3D(i.TEXTURE_2D_ARRAY,me,ie,j.width,j.height,se.depth,0,Ee,P,j.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Se&&Me&&t.texStorage2D(i.TEXTURE_2D,Je,ie,be[0].width,be[0].height);for(let me=0,ze=be.length;me<ze;me++)j=be[me],x.format!==On?Ee!==null?Se?Be&&t.compressedTexSubImage2D(i.TEXTURE_2D,me,0,0,j.width,j.height,Ee,j.data):t.compressedTexImage2D(i.TEXTURE_2D,me,ie,j.width,j.height,0,j.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?Be&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,j.width,j.height,Ee,P,j.data):t.texImage2D(i.TEXTURE_2D,me,ie,j.width,j.height,0,Ee,P,j.data)}else if(x.isDataArrayTexture)if(Se){if(Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,ie,se.width,se.height,se.depth),Be)if(x.layerUpdates.size>0){const me=zo(se.width,se.height,x.format,x.type);for(const ze of x.layerUpdates){const Ve=se.data.subarray(ze*me/se.data.BYTES_PER_ELEMENT,(ze+1)*me/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ze,se.width,se.height,1,Ee,P,Ve)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Ee,P,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ie,se.width,se.height,se.depth,0,Ee,P,se.data);else if(x.isData3DTexture)Se?(Me&&t.texStorage3D(i.TEXTURE_3D,Je,ie,se.width,se.height,se.depth),Be&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Ee,P,se.data)):t.texImage3D(i.TEXTURE_3D,0,ie,se.width,se.height,se.depth,0,Ee,P,se.data);else if(x.isFramebufferTexture){if(Me)if(Se)t.texStorage2D(i.TEXTURE_2D,Je,ie,se.width,se.height);else{let me=se.width,ze=se.height;for(let Ve=0;Ve<Je;Ve++)t.texImage2D(i.TEXTURE_2D,Ve,ie,me,ze,0,Ee,P,null),me>>=1,ze>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const me=i.canvas;if(me.hasAttribute("layoutsubtree")||me.setAttribute("layoutsubtree","true"),se.parentNode!==me){me.appendChild(se),u.add(x),me.onpaint=ze=>{const Ve=ze.changedElements;for(const we of u)Ve.includes(we.image)&&(we.needsUpdate=!0)},me.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,se);else{const Ve=i.RGBA,we=i.RGBA,pt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ve,we,pt,se)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(be.length>0){if(Se&&Me){const me=Ye(be[0]);t.texStorage2D(i.TEXTURE_2D,Je,ie,me.width,me.height)}for(let me=0,ze=be.length;me<ze;me++)j=be[me],Se?Be&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,Ee,P,j):t.texImage2D(i.TEXTURE_2D,me,ie,Ee,P,j);x.generateMipmaps=!1}else if(Se){if(Me){const me=Ye(se);t.texStorage2D(i.TEXTURE_2D,Je,ie,me.width,me.height)}Be&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,P,se)}else t.texImage2D(i.TEXTURE_2D,0,ie,Ee,P,se);w(x)&&x.mipmapsAutoUpdate===!0&&T(fe),Te.__version=de.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Gt(A,x,V){if(x.image.length!==6)return;const fe=mt(A,x),re=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+V);const de=n.get(re);if(re.version!==de.__version||fe===!0){t.activeTexture(i.TEXTURE0+V);const Te=ht.getPrimaries(ht.workingColorSpace),ne=x.colorSpace===hi?null:ht.getPrimaries(x.colorSpace),se=x.colorSpace===hi||Te===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);const Ee=x.isCompressedTexture||x.image[0].isCompressedTexture,P=x.image[0]&&x.image[0].isDataTexture,ie=[];for(let we=0;we<6;we++)!Ee&&!P?ie[we]=y(x.image[we],!0,s.maxCubemapSize):ie[we]=P?x.image[we].image:x.image[we],ie[we]=We(x,ie[we]);const j=ie[0],be=r.convert(x.format,x.colorSpace),Se=r.convert(x.type);let Me=R(x.internalFormat,be,Se,x.normalized,x.colorSpace);const Be=x.isVideoTexture!==!0,Je=de.__version===void 0||fe===!0,me=re.dataReady;let ze=b(x,j);gt(i.TEXTURE_CUBE_MAP,x);let Ve;if(x.isDepthTexture){if(Me=g(x.format===pi,x.type),Je)if(Be)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,Me,j.width,j.height);else for(let we=0;we<6;we++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Me,j.width,j.height,0,be,Se,null)}else if(Ee){Be&&Je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ze,Me,j.width,j.height);for(let we=0;we<6;we++){Ve=ie[we].mipmaps;for(let pt=0;pt<Ve.length;pt++){const Ot=Ve[pt];x.format!==On?be!==null?Be?me&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt,0,0,Ot.width,Ot.height,be,Ot.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt,Me,Ot.width,Ot.height,0,Ot.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt,0,0,Ot.width,Ot.height,be,Se,Ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt,Me,Ot.width,Ot.height,0,be,Se,Ot.data)}}}else{if(Ve=x.mipmaps,Be&&Je){Ve.length>0&&ze++;const we=Ye(ie[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ze,Me,we.width,we.height)}for(let we=0;we<6;we++)if(P){Be?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,ie[we].width,ie[we].height,be,Se,ie[we].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Me,ie[we].width,ie[we].height,0,be,Se,ie[we].data);for(let pt=0;pt<Ve.length;pt++){const Dn=Ve[pt].image[we].image;Be?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt+1,0,0,Dn.width,Dn.height,be,Se,Dn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt+1,Me,Dn.width,Dn.height,0,be,Se,Dn.data)}}else{Be?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,be,Se,ie[we]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Me,be,Se,ie[we]);for(let pt=0;pt<Ve.length;pt++){const Ot=Ve[pt];Be?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt+1,0,0,be,Se,Ot.image[we]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,pt+1,Me,be,Se,Ot.image[we])}}}w(x)&&x.mipmapsAutoUpdate===!0&&T(i.TEXTURE_CUBE_MAP),de.__version=re.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function bt(A,x,V,fe,re,de){const Te=r.convert(V.format,V.colorSpace),ne=r.convert(V.type),se=R(V.internalFormat,Te,ne,V.normalized,V.colorSpace),Ee=n.get(x),P=n.get(V);if(P.__renderTarget=x,!Ee.__hasExternalTextures){const ie=Math.max(1,x.width>>de),j=Math.max(1,x.height>>de);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,de,se,ie,j,x.depth,0,Te,ne,null):t.texImage2D(re,de,se,ie,j,0,Te,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),xe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,re,P.__webglTexture,0,lt(x)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,fe,re,P.__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function en(A,x,V){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){const fe=x.depthTexture,re=fe&&fe.isDepthTexture?fe.type:null,de=g(x.stencilBuffer,re),Te=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xe(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(x),de,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(x),de,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,de,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,A)}else{const fe=x.textures;for(let re=0;re<fe.length;re++){const de=fe[re],Te=r.convert(de.format,de.colorSpace),ne=r.convert(de.type),se=R(de.internalFormat,Te,ne,de.normalized,de.colorSpace);xe(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(x),se,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(x),se,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,se,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(A,x,V){const fe=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=n.get(x.depthTexture);re.__renderTarget=x;const de=fe?x.depthTexture.image[0]:x.depthTexture.image;(!re.__webglTexture||de.width!==x.width||de.height!==x.height)&&(de.width=x.width,de.height=x.height,x.depthTexture.needsUpdate=!0),fe?Re(x.depthTexture,0):Ae(x.depthTexture,0);const Te=re.__webglTexture,ne=lt(x),se=fe?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,Ee=x.depthTexture.format===pi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===gi)xe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,se,Te,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,se,Te,0);else if(x.depthTexture.format===pi)xe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,se,Te,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,se,Te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function on(A){const x=n.get(A),V=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const fe=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),fe){const re=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,fe.removeEventListener("dispose",re)};fe.addEventListener("dispose",re),x.__depthDisposeCallback=re}x.__boundDepthTexture=fe}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(V)for(let fe=0;fe<6;fe++)wt(x.__webglFramebuffer[fe],A,fe);else A.texture.mipmaps.length>0?wt(x.__webglFramebuffer[0],A,0):wt(x.__webglFramebuffer,A,0);else if(V){x.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[fe]),x.__webglDepthbuffer[fe]===void 0)x.__webglDepthbuffer[fe]=i.createRenderbuffer(),en(x.__webglDepthbuffer[fe],A,!1);else{const re=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=x.__webglDepthbuffer[fe];i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,de)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),en(x.__webglDepthbuffer,A,!1);else{const re=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,de)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(A,x,V){const fe=n.get(A);x!==void 0&&bt(fe.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&on(A)}function Kt(A){const x=A.texture,V=n.get(A),fe=n.get(x);A.addEventListener("dispose",X),O(A);const re=A.textures,de=A.isWebGLCubeRenderTarget===!0,Te=re.length>1;if(Te||(fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture()),fe.__version=x.version,a.memory.textures++),de){V.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(x.mipmaps.length>0){V.__webglFramebuffer[ne]=[];for(let se=0;se<x.mipmaps.length;se++)V.__webglFramebuffer[ne][se]=i.createFramebuffer()}else V.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(x.mipmaps.length>0){V.__webglFramebuffer=[];for(let ne=0;ne<x.mipmaps.length;ne++)V.__webglFramebuffer[ne]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Te)for(let ne=0,se=re.length;ne<se;ne++){const Ee=n.get(re[ne]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&xe(A)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ne=0;ne<re.length;ne++){const se=re[ne];V.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ne]);const Ee=r.convert(se.format,se.colorSpace),P=r.convert(se.type),ie=R(se.internalFormat,Ee,P,se.normalized,se.colorSpace,A.isXRRenderTarget===!0),j=lt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,j,ie,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,V.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),en(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,fe.__webglTexture),gt(i.TEXTURE_CUBE_MAP,x);for(let ne=0;ne<6;ne++)if(x.mipmaps.length>0)for(let se=0;se<x.mipmaps.length;se++)bt(V.__webglFramebuffer[ne][se],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,se);else bt(V.__webglFramebuffer[ne],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);w(x)?T(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}else if(Te){for(let ne=0,se=re.length;ne<se;ne++){const Ee=re[ne],P=n.get(Ee);let ie=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ie=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,P.__webglTexture),gt(ie,Ee),bt(V.__webglFramebuffer,A,Ee,i.COLOR_ATTACHMENT0+ne,ie,0),w(Ee)&&T(ie)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ne=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,fe.__webglTexture),gt(ne,x),x.mipmaps.length>0)for(let se=0;se<x.mipmaps.length;se++)bt(V.__webglFramebuffer[se],A,x,i.COLOR_ATTACHMENT0,ne,se);else bt(V.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,ne,0);w(x)?T(ne):x.mipmaps.length>0&&i.texParameteri(ne,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&on(A)}function F(A){const x=A.textures;for(let V=0,fe=x.length;V<fe;V++){const re=x[V];if(w(re)&&re.mipmapsAutoUpdate===!0){const de=L(A),Te=n.get(re).__webglTexture;t.bindTexture(de,Te),T(de),t.unbindTexture()}}}const tn=[];function Tt(A){if(A.samples>0){if(xe(A)===!1){const x=A.textures,V=A.width,fe=A.height;let re=i.COLOR_BUFFER_BIT;const de=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(A),ne=x.length>1;if(ne)for(let Ee=0;Ee<x.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Ee=0;Ee<x.length;Ee++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);const P=n.get(x[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,P,0)}i.blitFramebuffer(0,0,V,fe,0,0,V,fe,re,i.NEAREST),l===!0&&(tn.length=0,tn.push(i.COLOR_ATTACHMENT0+Ee),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&tn.push(de),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tn))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let Ee=0;Ee<x.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);const P=n.get(x[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,P,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function lt(A){return Math.min(s.maxSamples,A.samples)}function xe(A){const x=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function nt(A){const x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function We(A,x){const V=A.colorSpace,fe=A.format,re=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==or&&V!==hi&&(ht.getTransfer(V)===Et?(fe!==On||re!==_n)&&Qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",V)),x}function Ye(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=$e,this.resetTextureUnits=le,this.getTextureUnits=ue,this.setTextureUnits=ke,this.setTexture2D=Ae,this.setTexture2DArray=Pe,this.setTexture3D=Fe,this.setTextureCube=Re,this.rebindTextures=Ft,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=on,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=xe,this.dispose=J}function Im(i,e){function t(n,s=hi){let r;const a=ht.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===Ya)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Za)return i.UNSIGNED_SHORT_5_5_5_1;if(n===El)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===yl)return i.BYTE;if(n===Ml)return i.SHORT;if(n===fs)return i.UNSIGNED_SHORT;if(n===qa)return i.INT;if(n===zn)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===Hn)return i.HALF_FLOAT;if(n===Tl)return i.ALPHA;if(n===Al)return i.RGB;if(n===On)return i.RGBA;if(n===gi)return i.DEPTH_COMPONENT;if(n===pi)return i.DEPTH_STENCIL;if(n===wl)return i.RED;if(n===Ja)return i.RED_INTEGER;if(n===Ai)return i.RG;if(n===ja)return i.RG_INTEGER;if(n===Qa)return i.RGBA_INTEGER;if(n===er||n===tr||n===nr||n===ir)if(a===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ir)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ua||n===ha||n===fa||n===pa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ua)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ha)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ma||n===ga||n===_a||n===va||n===xa||n===rr||n===Sa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ma||n===ga)return a===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_a)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===va)return r.COMPRESSED_R11_EAC;if(n===xa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===rr)return r.COMPRESSED_RG11_EAC;if(n===Sa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ya||n===Ma||n===Ea||n===ba||n===Ta||n===Aa||n===wa||n===Ra||n===Ca||n===La||n===Pa||n===Ia||n===Da||n===Na)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ya)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ma)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ea)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ba)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ta)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wa)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ra)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ca)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===La)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pa)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ia)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Da)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Na)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ua||n===ka||n===Fa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ua)return a===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Oa||n===Ba||n===ar||n===za)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Oa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ba)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ar)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ki?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Dm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nm=`
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

}`;class Um{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Hl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wi({vertexShader:Dm,fragmentShader:Nm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vi(new pr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class km extends Ri{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,m=null,_=null;const M=typeof XRWebGLBinding<"u",f=new Um,p={},y=t.getContextAttributes();let w=null,T=null;const L=[],R=[],g=new ot;let b=null,O=null;const D=new Mn;D.viewport=new It;const k=new Mn;k.viewport=new It;const X=[D,k],te=new Kd;let U=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Ae=L[ee];return Ae===void 0&&(Ae=new Ur,L[ee]=Ae),Ae.getTargetRaySpace()},this.getControllerGrip=function(ee){let Ae=L[ee];return Ae===void 0&&(Ae=new Ur,L[ee]=Ae),Ae.getGripSpace()},this.getHand=function(ee){let Ae=L[ee];return Ae===void 0&&(Ae=new Ur,L[ee]=Ae),Ae.getHandSpace()};function ae(ee){const Ae=R.indexOf(ee.inputSource);if(Ae===-1)return;const Pe=L[Ae];Pe!==void 0&&(Pe.update(ee.inputSource,ee.frame,c||a),Pe.dispatchEvent({type:ee.type,data:ee.inputSource}))}function $(){s.removeEventListener("select",ae),s.removeEventListener("selectstart",ae),s.removeEventListener("selectend",ae),s.removeEventListener("squeeze",ae),s.removeEventListener("squeezestart",ae),s.removeEventListener("squeezeend",ae),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",ge);for(let ee=0;ee<L.length;ee++){const Ae=R[ee];Ae!==null&&(R[ee]=null,L[ee].disconnect(Ae))}U=null,J=null,f.reset();for(const ee in p)delete p[ee];if(e.setRenderTarget(w),m=null,d=null,u=null,s=null,T=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(g.width,g.height,!1),O!==null){const ee=O.camera;ee.fov=O.fov,ee.zoom=O.zoom,ee.updateProjectionMatrix(),O=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&Qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&Qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",ae),s.addEventListener("selectstart",ae),s.addEventListener("selectend",ae),s.addEventListener("squeeze",ae),s.addEventListener("squeezestart",ae),s.addEventListener("squeezeend",ae),s.addEventListener("end",$),s.addEventListener("inputsourceschange",ge),y.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(g),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,Fe=null,Re=null;y.depth&&(Re=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=y.stencil?pi:gi,Fe=y.stencil?Ki:zn);const Ze={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ze),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Bn(d.textureWidth,d.textureHeight,{format:On,type:_n,depthTexture:new qi(d.textureWidth,d.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const Pe={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Pe),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new Bn(m.framebufferWidth,m.framebufferHeight,{format:On,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),$e.setContext(s),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function ge(ee){for(let Ae=0;Ae<ee.removed.length;Ae++){const Pe=ee.removed[Ae],Fe=R.indexOf(Pe);Fe>=0&&(R[Fe]=null,L[Fe].disconnect(Pe))}for(let Ae=0;Ae<ee.added.length;Ae++){const Pe=ee.added[Ae];let Fe=R.indexOf(Pe);if(Fe===-1){for(let Ze=0;Ze<L.length;Ze++)if(Ze>=R.length){R.push(Pe),Fe=Ze;break}else if(R[Ze]===null){R[Ze]=Pe,Fe=Ze;break}if(Fe===-1)break}const Re=L[Fe];Re&&Re.connect(Pe)}}function Q(ee,Ae){Ae===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Ae.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let Ae=ee.near,Pe=ee.far;f.texture!==null&&(f.depthNear>0&&(Ae=f.depthNear),f.depthFar>0&&(Pe=f.depthFar)),te.near=k.near=D.near=Ae,te.far=k.far=D.far=Pe,(U!==te.near||J!==te.far)&&(s.updateRenderState({depthNear:te.near,depthFar:te.far}),U=te.near,J=te.far),te.layers.mask=ee.layers.mask|6,D.layers.mask=te.layers.mask&-5,k.layers.mask=te.layers.mask&-3;const Fe=ee.parent,Re=te.cameras;Q(te,Fe);for(let Ze=0;Ze<Re.length;Ze++)Q(Re[Ze],Fe);te.projectionMatrix.copy(D.projectionMatrix),te.projectionMatrixInverse.copy(D.projectionMatrixInverse),O===null&&ee.isPerspectiveCamera&&(O={camera:ee,fov:ee.fov,zoom:ee.zoom}),le(ee,te,Fe)};function le(ee,Ae,Pe){Pe===null?ee.matrix.copy(Ae.matrixWorld):(ee.matrix.copy(Pe.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Ae.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Ae.projectionMatrix),ee.projectionMatrixInverse.copy(Ae.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Ga*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return te},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(ee){l=ee,d!==null&&(d.fixedFoveation=ee),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ee)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(te)},this.getCameraTexture=function(ee){return p[ee]};let ue=null;function ke(ee,Ae){if(h=Ae.getViewerPose(c||a),_=Ae,h!==null){const Pe=h.views;m!==null&&(e.setRenderTargetFramebuffer(T,m.framebuffer),e.setRenderTarget(T));let Fe=!1;Pe.length!==te.cameras.length&&(te.cameras.length=0,Fe=!0);for(let qe=0;qe<Pe.length;qe++){const gt=Pe[qe];let mt=null;if(m!==null)mt=m.getViewport(gt);else{const Ht=u.getViewSubImage(d,gt);mt=Ht.viewport,qe===0&&(e.setRenderTargetTextures(T,Ht.colorTexture,Ht.depthStencilTexture),e.setRenderTarget(T))}let st=X[qe];st===void 0&&(st=new Mn,st.layers.enable(qe),st.viewport=new It,X[qe]=st),st.matrix.fromArray(gt.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(gt.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(mt.x,mt.y,mt.width,mt.height),qe===0&&(te.matrix.copy(st.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale)),Fe===!0&&te.cameras.push(st)}const Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const qe=u.getDepthInformation(Pe[0]);qe&&qe.isValid&&qe.texture&&f.init(qe,s.renderState)}if(Re&&Re.includes("camera-access")&&M){e.state.unbindTexture(),u=n.getBinding();for(let qe=0;qe<Pe.length;qe++){const gt=Pe[qe].camera;if(gt){let mt=p[gt];mt||(mt=new Hl,p[gt]=mt);const st=u.getCameraImage(gt);mt.sourceTexture=st}}}}for(let Pe=0;Pe<L.length;Pe++){const Fe=R[Pe],Re=L[Pe];Fe!==null&&Re!==void 0&&Re.update(Fe,Ae,c||a)}ue&&ue(ee,Ae),Ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ae}),_=null}const $e=new Xl;$e.setAnimationLoop(ke),this.setAnimationLoop=function(ee){ue=ee},this.dispose=function(){}}}const Fm=new Lt,tc=new tt;tc.set(-1,0,0,0,1,0,0,0,1);function Om(i,e){function t(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function n(f,p){p.color.getRGB(f.fogColor.value,Gl(i)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function s(f,p,y,w,T){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(f,p):p.isMeshLambertMaterial?(r(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(f,p),u(f,p)):p.isMeshPhongMaterial?(r(f,p),h(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(f,p),d(f,p),p.isMeshPhysicalMaterial&&m(f,p,T)):p.isMeshMatcapMaterial?(r(f,p),_(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),M(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&o(f,p)):p.isPointsMaterial?l(f,p,y,w):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,t(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===un&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,t(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===un&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,t(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,t(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const y=e.get(p),w=y.envMap,T=y.envMapRotation;w&&(f.envMap.value=w,f.envMapRotation.value.setFromMatrix4(Fm.makeRotationFromEuler(T)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(tc),f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform))}function o(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,y,w){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*y,f.scale.value=w*.5,p.map&&(f.map.value=p.map,t(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function h(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function u(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function d(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,y){f.ior.value=p.ior,p.diffuseRoughness>0&&(f.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===un&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.retroreflectivity>0&&(f.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,p){p.matcap&&(f.matcap.value=p.matcap)}function M(f,p){const y=e.get(p).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Bm(i,e,t,n){let s={},r={};function a(y,w){const T=w.program;n.uniformBlockBinding(y,T,s[y.id])}function o(y,w){let T=s[y.id];T===void 0&&(_(y),T=l(y),s[y.id]=T,y.addEventListener("dispose",f));const L=w.program;n.updateUBOMapping(y,L);const R=e.render.frame;r[y.id]!==R&&(c(y),r[y.id]=R)}function l(y){const w=i.createBuffer(),T=y.__size,L=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,T,L),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(y){const w=s[y.id],T=y.uniforms,L=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let R=0,g=T.length;R<g;R++){const b=T[R];if(Array.isArray(b))for(let O=0,D=b.length;O<D;O++)h(b[O],R,O,L);else h(b,R,0,L)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(y,w,T,L){if(d(y,w,T,L)===!0){const R=y.__offset,g=y.value;if(Array.isArray(g)){let b=0;for(let O=0;O<g.length;O++){const D=g[O],k=M(D,!0);u(D,y.__data,b),b+=k.storage/Float32Array.BYTES_PER_ELEMENT}}else u(g,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,R,y.__data)}}function u(y,w,T){typeof y=="number"||typeof y=="boolean"?w[T]=y:y.isMatrix3?(w[T]=y.elements[0],w[T+1]=y.elements[1],w[T+2]=y.elements[2],w[T+3]=0,w[T+4]=y.elements[3],w[T+5]=y.elements[4],w[T+6]=y.elements[5],w[T+7]=0,w[T+8]=y.elements[6],w[T+9]=y.elements[7],w[T+10]=y.elements[8],w[T+11]=0):ArrayBuffer.isView(y)?w.set(y.subarray(0,w.length-T),T):y.toArray(w,T)}function d(y,w,T,L){const R=y.value,g=w+"_"+T;if(Array.isArray(R)){L[g]===void 0&&(L[g]=[]);const b=L[g];let O=!1;for(let D=0;D<R.length;D++)m(R[D],b,D)===!0&&(O=!0);return O}return m(R,L,g)}function m(y,w,T){if(w[T]===void 0)return typeof y=="number"||typeof y=="boolean"?w[T]=y:ArrayBuffer.isView(y)?w[T]=y.slice():w[T]=y.clone(),!0;{const L=w[T];if(typeof y=="number"||typeof y=="boolean"){if(L!==y)return w[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(L.equals(y)===!1)return L.copy(y),!0}}return!1}function _(y){const w=y.uniforms;let T=0;const L=16;for(let g=0,b=w.length;g<b;g++){const O=Array.isArray(w[g])?w[g]:[w[g]];for(let D=0,k=O.length;D<k;D++){const X=O[D],te=Array.isArray(X.value)?X.value:[X.value],U=Array.isArray(w[g])||Array.isArray(X.value);let J=T;for(let $=0,ge=te.length;$<ge;$++){const Q=te[$],le=M(Q,U),ue=T%L,ke=ue%le.boundary,$e=ue+ke;T+=ke,$e!==0&&L-$e<le.storage&&(T+=L-$e),$===0&&(J=T),T+=le.storage}const ae=X.type==="int"?Int32Array:X.type==="uint"?Uint32Array:Float32Array;X.__data=new ae((T-J)/Float32Array.BYTES_PER_ELEMENT),X.__offset=J}}const R=T%L;return R>0&&(T+=L-R),y.__size=T,y.__cache={},this}function M(y,w){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=16,T.storage=48):y.isMatrix4?(T.boundary=16,T.storage=64):y.isTexture?Qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Qe("WebGLRenderer: Unsupported uniform value type.",y),w===!0&&(T.boundary=16,T.storage=Math.ceil(T.storage/16)*16),T}function f(y){const w=y.target;w.removeEventListener("dispose",f),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:a,update:o,dispose:p}}const zm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Un=null;function Hm(){return Un===null&&(Un=new Ld(zm,16,16,Ai,Hn),Un.name="DFG_LUT",Un.minFilter=dn,Un.magFilter=dn,Un.wrapS=ei,Un.wrapT=ei,Un.generateMipmaps=!1,Un.needsUpdate=!0),Un}class Gm{constructor(e={}){const{canvas:t=td(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:m=_n}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const M=m,f=new Set([Qa,ja,Ja]),p=new Set([_n,zn,fs,Ki,Ya,Za]),y=new Uint32Array(4),w=new Int32Array(4),T={textures:[],min:[],max:[],resolution:[]};let L=null,R=null;const g=[],b=[];let O=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let k=!1,X=null,te=null,U=null,J=null;this._outputColorSpace=yn;let ae=0,$=0,ge=null,Q=-1,le=null;const ue=new It,ke=new It;let $e=null;const ee=new ct(0);let Ae=0,Pe=t.width,Fe=t.height,Re=1,Ze=null,Mt=null;const qe=new It(0,0,Pe,Fe),gt=new It(0,0,Pe,Fe);let mt=!1;const st=new ms,Ht=new no;let At=!1,Gt=!1;const bt=new Lt,en=new K,wt=new It,on={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ft=!1;function Kt(){return ge===null?Re:1}let F=n;function tn(S,I){return t.getContext(S,I)}let Tt,lt,xe,nt,We,Ye,A,x,V,fe,re,de,Te,ne,se,Ee,P,ie,j,be,Se,Me,Be;try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ka}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",Ve,!1),t.addEventListener("webglcontextcreationerror",we,!1),F===null){const I="webgl2";if(F=tn(I,S),F===null)throw tn(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(S){throw t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",Ve,!1),t.removeEventListener("webglcontextcreationerror",we,!1),vt("WebGLRenderer: "+S.message),S}function Je(){Tt=new Xf(F),Tt.init(),Se=new Im(F,Tt),lt=new Nf(F,Tt,e,Se),xe=new Lm(F,Tt),lt.reversedDepthBuffer&&d&&xe.buffers.depth.setReversed(!0),te=F.createFramebuffer(),U=F.createFramebuffer(),J=F.createFramebuffer(),nt=new qf(F),We=new gm,Ye=new Pm(F,Tt,xe,We,lt,Se,nt),A=new Wf(D),x=new Yd(F),Me=new If(F,x),V=new $f(F,x,nt,Me),fe=new Zf(F,V,x,Me,nt),ie=new Yf(F,lt,Ye),se=new Uf(We),re=new mm(D,A,Tt,lt,Me,se),de=new Om(D,We),Te=new vm,ne=new bm(Tt),P=new Pf(D,A,xe,fe,_,l),Ee=new Cm(D,fe,lt),Be=new Bm(F,nt,lt,xe),j=new Df(F,Tt,nt),be=new Kf(F,Tt,nt),nt.programs=re.programs,D.capabilities=lt,D.extensions=Tt,D.properties=We,D.renderLists=Te,D.shadowMap=Ee,D.state=xe,D.info=nt}M!==_n&&(O=new jf(M,t.width,t.height,o,s,r));const me=new km(D,F);this.xr=me,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const S=Tt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Tt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Re},this.setPixelRatio=function(S){S!==void 0&&(Re=S,this.setSize(Pe,Fe,!1))},this.getSize=function(S){return S.set(Pe,Fe)},this.setSize=function(S,I,q=!0){if(me.isPresenting){Qe("WebGLRenderer: Can't change size while VR device is presenting.");return}Pe=S,Fe=I,t.width=Math.floor(S*Re),t.height=Math.floor(I*Re),q===!0&&(t.style.width=S+"px",t.style.height=I+"px"),O!==null&&O.setSize(t.width,t.height),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(Pe*Re,Fe*Re).floor()},this.setDrawingBufferSize=function(S,I,q){Pe=S,Fe=I,Re=q,t.width=Math.floor(S*q),t.height=Math.floor(I*q),this.setViewport(0,0,S,I)},this.setEffects=function(S){if(M===_n){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let I=0;I<S.length;I++)if(S[I].isOutputPass===!0){Qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ue)},this.getViewport=function(S){return S.copy(qe)},this.setViewport=function(S,I,q,z){S.isVector4?qe.set(S.x,S.y,S.z,S.w):qe.set(S,I,q,z),xe.viewport(ue.copy(qe).multiplyScalar(Kt()).round())},this.getScissor=function(S){return S.copy(gt)},this.setScissor=function(S,I,q,z){S.isVector4?gt.set(S.x,S.y,S.z,S.w):gt.set(S,I,q,z),xe.scissor(ke.copy(gt).multiplyScalar(Kt()).round())},this.getScissorTest=function(){return mt},this.setScissorTest=function(S){xe.setScissorTest(mt=S)},this.setOpaqueSort=function(S){Ze=S},this.setTransparentSort=function(S){Mt=S},this.getClearColor=function(S){return S.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(S=!0,I=!0,q=!0){let z=0;if(S){let W=!1;if(ge!==null){const _e=ge.texture.format;W=f.has(_e)}if(W){const _e=ge.texture.type,Ce=p.has(_e),ye=P.getClearColor(),Le=P.getClearAlpha(),Oe=ye.r,je=ye.g,rt=ye.b;Ce?(y[0]=Oe,y[1]=je,y[2]=rt,y[3]=Le,F.clearBufferuiv(F.COLOR,0,y)):(w[0]=Oe,w[1]=je,w[2]=rt,w[3]=Le,F.clearBufferiv(F.COLOR,0,w))}else z|=F.COLOR_BUFFER_BIT}I&&(z|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(z|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&F.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),X=S},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",Ve,!1),t.removeEventListener("webglcontextcreationerror",we,!1),P.dispose(),Te.dispose(),ne.dispose(),Ye.dispose(),We.dispose(),A.dispose(),fe.dispose(),V.dispose(),Me.dispose(),Be.dispose(),re.dispose(),me.dispose(),me.removeEventListener("sessionstart",ln),me.removeEventListener("sessionend",Ss),Vn.stop()};function ze(S){S.preventDefault(),_o("WebGLRenderer: Context Lost."),k=!0}function Ve(){_o("WebGLRenderer: Context Restored."),k=!1;const S=nt.autoReset,I=Ee.enabled,q=Ee.autoUpdate,z=Ee.needsUpdate,W=Ee.type;Je(),nt.autoReset=S,Ee.enabled=I,Ee.autoUpdate=q,Ee.needsUpdate=z,Ee.type=W}function we(S){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function pt(S){const I=S.target;I.removeEventListener("dispose",pt),Ot(I)}function Ot(S){Dn(S),We.remove(S)}function Dn(S){const I=We.get(S).programs;I!==void 0&&(I.forEach(function(q){re.releaseProgram(q)}),S.isShaderMaterial&&re.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,q,z,W,_e){I===null&&(I=on);const Ce=W.isMesh&&W.matrixWorld.determinantAffine()<0,ye=xr(S,I,q,z,W);xe.setMaterial(z,Ce);let Le=q.index,Oe=1;if(z.wireframe===!0){if(Le=V.getWireframeAttribute(q),Le===void 0)return;Oe=2}const je=q.drawRange,rt=q.attributes.position;let De=je.start*Oe,et=(je.start+je.count)*Oe;_e!==null&&(De=Math.max(De,_e.start*Oe),et=Math.min(et,(_e.start+_e.count)*Oe)),Le!==null?(De=Math.max(De,0),et=Math.min(et,Le.count)):rt!=null&&(De=Math.max(De,0),et=Math.min(et,rt.count));const xt=et-De;if(xt<0||xt===1/0)return;Me.setup(W,z,ye,q,Le);let St,_t=j;if(Le!==null&&(St=x.get(Le),_t=be,_t.setIndex(St)),W.isMesh)z.wireframe===!0?(xe.setLineWidth(z.wireframeLinewidth*Kt()),_t.setMode(F.LINES)):_t.setMode(F.TRIANGLES);else if(W.isLine){let Pt=z.linewidth;Pt===void 0&&(Pt=1),xe.setLineWidth(Pt*Kt()),W.isLineSegments?_t.setMode(F.LINES):W.isLineLoop?_t.setMode(F.LINE_LOOP):_t.setMode(F.LINE_STRIP)}else W.isPoints?_t.setMode(F.POINTS):W.isSprite&&_t.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(Tt.get("WEBGL_multi_draw"))_t.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Pt=W._multiDrawStarts,Ne=W._multiDrawCounts,yt=W._multiDrawCount,it=Le?x.get(Le).bytesPerElement:1,cn=We.get(z).currentProgram.getUniforms();for(let Dt=0;Dt<yt;Dt++)cn.setValue(F,"_gl_DrawID",Dt),_t.render(Pt[Dt]/it,Ne[Dt])}else if(W.isInstancedMesh)_t.renderInstances(De,xt,W.count);else if(q.isInstancedBufferGeometry){const Pt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ne=Math.min(q.instanceCount,Pt);_t.renderInstances(De,xt,Ne)}else _t.render(De,xt)};function Qi(S,I,q,z){X!==null&&S.isNodeMaterial&&X.setObject(z,S),At===!0&&se.setState(S,q,!1),S.transparent===!0&&S.side===Qn&&S.forceSinglePass===!1?(S.side=un,S.needsUpdate=!0,bn(S,I,z),S.side=Ti,S.needsUpdate=!0,bn(S,I,z),S.side=Qn):bn(S,I,z)}this.compile=function(S,I,q=null){q===null&&(q=S),X!==null&&X.renderStart(S,I,q),R=ne.get(q),R.init(I),b.push(R),q.traverseVisible(function(W){W.isLight&&W.layers.test(I.layers)&&(R.pushLight(W),W.castShadow&&R.pushShadow(W))}),S!==q&&S.traverseVisible(function(W){W.isLight&&W.layers.test(I.layers)&&(R.pushLight(W),W.castShadow&&R.pushShadow(W))}),R.setupLights(),X!==null&&X.updateLights(R.state.lightsArray),Gt=this.localClippingEnabled,At=se.init(this.clippingPlanes,Gt),At===!0&&se.setGlobalState(this.clippingPlanes,I),X!==null&&Ee.render(R.state.shadowsArray,q,I);const z=new Set;return S.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const _e=W.material;if(_e)if(Array.isArray(_e))for(let Ce=0;Ce<_e.length;Ce++){const ye=_e[Ce];Qi(ye,q,I,W),z.add(ye)}else Qi(_e,q,I,W),z.add(_e)}),R=b.pop(),X!==null&&X.renderEnd(),z},this.compileAsync=function(S,I,q=null){const z=this.compile(S,I,q);return new Promise(W=>{function _e(){if(z.forEach(function(Ce){const Le=We.get(Ce).currentProgram;(Le===void 0||Le.isReady())&&z.delete(Ce)}),z.size===0){W(S);return}setTimeout(_e,10)}Tt.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let qt=null;function _r(S){qt&&qt(S)}function ln(){Vn.stop()}function Ss(){Vn.start()}const Vn=new Xl;Vn.setAnimationLoop(_r),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(S){qt=S,me.setAnimationLoop(S),S===null?Vn.stop():Vn.start()},me.addEventListener("sessionstart",ln),me.addEventListener("sessionend",Ss),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;X!==null&&X.renderStart(S,I);const q=me.enabled===!0&&me.isPresenting===!0,z=O!==null&&(ge===null||q)&&O.begin(D,ge);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(me.cameraAutoUpdate===!0&&me.updateCamera(I),I=me.getCamera()),S.isScene===!0&&S.onBeforeRender(D,S,I,ge),R=ne.get(S,b.length),R.init(I),R.state.textureUnits=Ye.getTextureUnits(),b.push(R),bt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),I.isArrayCamera?Ht.setFromArrayCamera(I):st.setFromProjectionMatrix(bt,In,I.reversedDepth),Gt=this.localClippingEnabled,At=se.init(this.clippingPlanes,Gt),L=Te.get(S,g.length),L.init(),g.push(L),this.info.render.frame++,me.enabled===!0&&me.isPresenting===!0){const Ce=D.xr.getDepthSensingMesh();Ce!==null&&Wn(Ce,I,-1/0,D.sortObjects)}Wn(S,I,0,D.sortObjects),L.finish(),X!==null&&X.updateLights(R.state.lightsArray),D.sortObjects===!0&&L.sort(Ze,Mt),Ft=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,Ft&&P.addToRenderList(L,S),this.info.autoReset===!0&&this.info.reset(),At===!0&&se.beginShadows();const W=R.state.shadowsArray;if(Ee.render(W,S,I),At===!0&&se.endShadows(),(z&&O.hasRenderPass())===!1){const Ce=L.opaque,ye=L.transmissive;if(R.setupLights(),I.isArrayCamera){const Le=I.cameras;if(ye.length>0)for(let Oe=0,je=Le.length;Oe<je;Oe++){const rt=Le[Oe];xi(Ce,ye,S,rt)}Ft&&P.render(S);for(let Oe=0,je=Le.length;Oe<je;Oe++){const rt=Le[Oe];es(L,S,rt,rt.viewport)}}else ye.length>0&&xi(Ce,ye,S,I),Ft&&P.render(S),es(L,S,I)}ge!==null&&$===0&&(Ye.updateMultisampleRenderTarget(ge),Ye.updateRenderTargetMipmap(ge)),z&&O.end(D),S.isScene===!0&&S.onAfterRender(D,S,I),Me.resetDefaultState(),Q=-1,le=null,b.pop(),b.length>0?(R=b[b.length-1],Ye.setTextureUnits(R.state.textureUnits),At===!0&&se.setGlobalState(D.clippingPlanes,R.state.camera)):R=null,g.pop(),g.length>0?L=g[g.length-1]:L=null,X!==null&&X.renderEnd()};function Wn(S,I,q,z){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)q=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)R.pushLight(S),S.castShadow&&R.pushShadow(S);else if(S.isSprite){const Ce=I.isArrayCamera?Ht:st;if(!S.frustumCulled||S.intersectsFrustum(Ce)){z&&wt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(bt);const ye=fe.update(S),Le=S.material;Le.visible&&L.push(S,ye,Le,q,wt.z,null,I)}}else if(S.isMesh||S.isLine||S.isPoints){const Ce=I.isArrayCamera?Ht:st;if(!S.frustumCulled||S.intersectsFrustum(Ce)){const ye=fe.update(S),Le=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),wt.copy(S.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),wt.copy(ye.boundingSphere.center)),wt.applyMatrix4(S.matrixWorld).applyMatrix4(bt)),Array.isArray(Le)){const Oe=ye.groups;for(let je=0,rt=Oe.length;je<rt;je++){const De=Oe[je],et=Le[De.materialIndex];et&&et.visible&&L.push(S,ye,et,q,wt.z,De,I)}}else Le.visible&&L.push(S,ye,Le,q,wt.z,null,I)}}}const _e=S.children;for(let Ce=0,ye=_e.length;Ce<ye;Ce++)Wn(_e[Ce],I,q,z)}function es(S,I,q,z){const{opaque:W,transmissive:_e,transparent:Ce}=S;R.setupLightsView(q),At===!0&&se.setGlobalState(D.clippingPlanes,q),z&&xe.viewport(ue.copy(z)),W.length>0&&Xn(W,I,q),_e.length>0&&Xn(_e,I,q),Ce.length>0&&Xn(Ce,I,q),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function xi(S,I,q,z){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[z.id]===void 0){const De=Tt.has("EXT_color_buffer_half_float")||Tt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[z.id]=new Bn(1,1,{generateMipmaps:!0,type:De?Hn:_n,minFilter:fi,samples:Math.max(4,lt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ht.workingColorSpace})}const _e=R.state.transmissionRenderTarget[z.id],Ce=z.viewport||ue;_e.setSize(Ce.z*D.transmissionResolutionScale,Ce.w*D.transmissionResolutionScale);const ye=D.getRenderTarget(),Le=D.getActiveCubeFace(),Oe=D.getActiveMipmapLevel();D.setRenderTarget(_e),D.getClearColor(ee),Ae=D.getClearAlpha(),Ae<1&&D.setClearColor(16777215,.5),D.clear(),Ft&&P.render(q);const je=D.toneMapping;D.toneMapping=ti;const rt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),R.setupLightsView(z),At===!0&&se.setGlobalState(D.clippingPlanes,z),Xn(S,q,z),Ye.updateMultisampleRenderTarget(_e),Ye.updateRenderTargetMipmap(_e),Tt.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let et=0,xt=I.length;et<xt;et++){const St=I[et],{object:_t,geometry:Pt,material:Ne,group:yt}=St;if(Ne.side===Qn&&_t.layers.test(z.layers)){const it=Ne.side;Ne.side=un,Ne.needsUpdate=!0,ys(_t,q,z,Pt,Ne,yt),Ne.side=it,Ne.needsUpdate=!0,De=!0}}De===!0&&(Ye.updateMultisampleRenderTarget(_e),Ye.updateRenderTargetMipmap(_e))}D.setRenderTarget(ye,Le,Oe),D.setClearColor(ee,Ae),rt!==void 0&&(z.viewport=rt),D.toneMapping=je}function Xn(S,I,q){const z=I.isScene===!0?I.overrideMaterial:null;for(let W=0,_e=S.length;W<_e;W++){const Ce=S[W],{object:ye,geometry:Le,group:Oe}=Ce;let je=Ce.material;je.allowOverride===!0&&z!==null&&(je=z),ye.layers.test(q.layers)&&ys(ye,I,q,Le,je,Oe)}}function ys(S,I,q,z,W,_e){X!==null&&W.isNodeMaterial&&X.setObject(S,W),S.onBeforeRender(D,I,q,z,W,_e),S.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),W.onBeforeRender(D,I,q,z,S,_e),W.transparent===!0&&W.side===Qn&&W.forceSinglePass===!1?(W.side=un,W.needsUpdate=!0,D.renderBufferDirect(q,I,z,W,S,_e),W.side=Ti,W.needsUpdate=!0,D.renderBufferDirect(q,I,z,W,S,_e),W.side=Qn):D.renderBufferDirect(q,I,z,W,S,_e),S.onAfterRender(D,I,q,z,W,_e)}function Ms(S){let I=0;for(const q of S)q.texture!==null&&I++;return I}function bn(S,I,q){I.isScene!==!0&&(I=on);const z=We.get(S),W=R.state.lights,_e=R.state.shadowsArray,Ce=W.state.version,ye=re.getParameters(S,W.state,_e,I,q,R.state.lightProbeGridArray),Le=re.getProgramCacheKey(ye);let Oe=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?I.environment:null,z.fog=I.fog;const je=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=A.get(S.envMap||z.environment,je),z.envMapRotation=z.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,Oe===void 0&&(S.addEventListener("dispose",pt),Oe=new Map,z.programs=Oe,z.programVariants=new Map);let rt=Oe.get(Le);if(rt!==void 0){if(z.currentProgram===rt&&z.lightsStateVersion===Ce)return bs(S,ye),rt}else ye.uniforms=re.getUniforms(S),X!==null&&S.isNodeMaterial&&X.build(S,q,ye),S.onBeforeCompile(ye,D),rt=re.acquireProgram(ye,Le),Oe.set(Le,rt),z.uniforms=ye.uniforms;const De=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(De.clippingPlanes=se.uniform),bs(S,ye),z.needsLights=yr(S),z.lightsStateVersion=Ce,z.needsLights&&(De.ambientLightColor.value=W.state.ambient,De.lightProbe.value=W.state.probe,De.sunLights.value=W.state.sun,De.sunLightShadows.value=W.state.sunShadow,De.directionalLights.value=W.state.directional,De.directionalLightShadows.value=W.state.directionalShadow,De.spotLights.value=W.state.spot,De.spotLightShadows.value=W.state.spotShadow,De.rectAreaLights.value=W.state.rectArea,De.ltc_1.value=W.state.rectAreaLTC1,De.ltc_2.value=W.state.rectAreaLTC2,De.pointLights.value=W.state.point,De.pointLightShadows.value=W.state.pointShadow,De.hemisphereLights.value=W.state.hemi,De.sunShadowMatrix.value=W.state.sunShadowMatrix,De.sunShadowCascade.value=W.state.sunShadowCascade,De.directionalShadowMatrix.value=W.state.directionalShadowMatrix,De.spotLightMatrix.value=W.state.spotLightMatrix,De.spotLightMap.value=W.state.spotLightMap,De.pointShadowMatrix.value=W.state.pointShadowMatrix),z.numLightProbeGrids=Ms(R.state.lightProbeGridArray),z.currentProgram=rt,z.uniformsList=null,rt}function vr(S,I,q,z,W){const _e=We.get(S),Ce=_e.currentProgram.id+","+z+","+W;let ye=_e.programVariants.get(Ce);return ye===void 0?(ye=bn(S,I,q),_e.programVariants.set(Ce,ye)):(_e.currentProgram=ye,_e.uniformsList=null,_e.outputColorSpace=z,_e.toneMapping=W),ye}function Es(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=sr.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function bs(S,I){const q=We.get(S);q.outputColorSpace=I.outputColorSpace,q.batching=I.batching,q.batchingColor=I.batchingColor,q.instancing=I.instancing,q.instancingColor=I.instancingColor,q.instancingMorph=I.instancingMorph,q.skinning=I.skinning,q.morphTargets=I.morphTargets,q.morphNormals=I.morphNormals,q.morphColors=I.morphColors,q.morphTargetsCount=I.morphTargetsCount,q.numClippingPlanes=I.numClippingPlanes,q.numIntersection=I.numClipIntersection,q.vertexAlphas=I.vertexAlphas,q.vertexTangents=I.vertexTangents,q.toneMapping=I.toneMapping}function xr(S,I,q,z,W){I.isScene!==!0&&(I=on),Ye.resetTextureUnits();const _e=I.fog,Ce=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?I.environment:null,ye=ge===null?D.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:ht.workingColorSpace,Le=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Oe=A.get(z.envMap||Ce,Le),je=z.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,rt=!!q.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),De=!!q.morphAttributes.position,et=!!q.morphAttributes.normal,xt=!!q.morphAttributes.color;let St=ti;z.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(St=D.toneMapping);const _t=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Pt=_t!==void 0?_t.length:0,Ne=We.get(z),yt=R.state.lights;if(At===!0&&(Gt===!0||S!==le)){const ft=S===le&&z.id===Q;se.setState(z,S,ft)}let it=!1,cn=!1;z.version===Ne.__version?Ne.needsLights&&Ne.lightsStateVersion!==yt.state.version||W.isBatchedMesh&&Ne.batching===!1||!W.isBatchedMesh&&Ne.batching===!0||W.isBatchedMesh&&Ne.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Ne.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Ne.instancing===!1||!W.isInstancedMesh&&Ne.instancing===!0||W.isSkinnedMesh&&Ne.skinning===!1||!W.isSkinnedMesh&&Ne.skinning===!0||W.isInstancedMesh&&Ne.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ne.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ne.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ne.instancingMorph===!1&&W.morphTexture!==null||Ne.envMap!==Oe||z.fog===!0&&Ne.fog!==_e||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==se.numPlanes||Ne.numIntersection!==se.numIntersection)||Ne.vertexAlphas!==je||Ne.vertexTangents!==rt||Ne.morphTargets!==De||Ne.morphNormals!==et||Ne.morphColors!==xt||Ne.morphTargetsCount!==Pt||Ne.numLightProbeGrids!==Ms(R.state.lightProbeGridArray)?it=!0:(Ne.outputColorSpace!==ye||Ne.toneMapping!==St)&&(cn=!0):(it=!0,Ne.__version=z.version);let Dt=Ne.currentProgram;(it===!0||cn===!0)&&(Dt=cn===!0?vr(z,I,W,ye,St):bn(z,I,W),X&&z.isNodeMaterial&&X.onUpdateProgram(z,Dt,Ne));let $n=!1,hn=!1,Tn=!1;const ut=Dt.getUniforms(),kt=Ne.uniforms;if(xe.useProgram(Dt.program)&&($n=!0,hn=!0,Tn=!0),z.id!==Q&&(Q=z.id,hn=!0),$n||le!==S){xe.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ut.setValue(F,"projectionMatrix",S.projectionMatrix),ut.setValue(F,"viewMatrix",S.matrixWorldInverse);const Nt=ut.map.cameraPosition;Nt!==void 0&&Nt.setValue(F,en.setFromMatrixPosition(S.matrixWorld)),lt.logarithmicDepthBuffer&&ut.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),le!==S&&(le=S,hn=!0,Tn=!0)}if(Ne.needsLights&&(yt.state.sunShadowMap.length>0&&ut.setValue(F,"sunShadowMap",yt.state.sunShadowMap,Ye),yt.state.directionalShadowMap.length>0&&ut.setValue(F,"directionalShadowMap",yt.state.directionalShadowMap,Ye),yt.state.spotShadowMap.length>0&&ut.setValue(F,"spotShadowMap",yt.state.spotShadowMap,Ye),yt.state.pointShadowMap.length>0&&ut.setValue(F,"pointShadowMap",yt.state.pointShadowMap,Ye)),W.isSkinnedMesh){ut.setOptional(F,W,"bindMatrix"),ut.setOptional(F,W,"bindMatrixInverse");const ft=W.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ut.setValue(F,"boneTexture",ft.boneTexture,Ye))}W.isBatchedMesh&&(ut.setOptional(F,W,"batchingTexture"),ut.setValue(F,"batchingTexture",W._matricesTexture,Ye),ut.setOptional(F,W,"batchingIdTexture"),ut.setValue(F,"batchingIdTexture",W._indirectTexture,Ye),ut.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&ut.setValue(F,"batchingColorTexture",W._colorsTexture,Ye));const fn=q.morphAttributes;if((fn.position!==void 0||fn.normal!==void 0||fn.color!==void 0)&&ie.update(W,q,Dt),(hn||Ne.receiveShadow!==W.receiveShadow)&&(Ne.receiveShadow=W.receiveShadow,ut.setValue(F,"receiveShadow",W.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&I.environment!==null&&(kt.envMapIntensity.value=I.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=Hm()),hn){if(ut.setValue(F,"toneMappingExposure",D.toneMappingExposure),Ne.needsLights&&Sr(kt,Tn),_e&&z.fog===!0&&de.refreshFogUniforms(kt,_e),de.refreshMaterialUniforms(kt,z,Re,Fe,R.state.transmissionRenderTarget[S.id]),Ne.needsLights&&Ne.numLightProbeGrids>0){const ft=T;let Nt=0;for(const vn of R.state.lightProbeGridArray)vn.texture!==null&&(ft.textures[Nt]=vn.texture,ft.min[Nt]=vn.boundingBox.min,ft.max[Nt]=vn.boundingBox.max,ft.resolution[Nt]=vn.resolution,Nt++);for(const vn in ft)ft[vn].length=Nt;kt.probesSH.value=ft.textures,kt.probesMin.value=ft.min,kt.probesMax.value=ft.max,kt.probesResolution.value=ft.resolution}sr.upload(F,Es(Ne),kt,Ye)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(sr.upload(F,Es(Ne),kt,Ye),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(F,"center",W.center),ut.setValue(F,"modelViewMatrix",W.modelViewMatrix),ut.setValue(F,"normalMatrix",W.normalMatrix),ut.setValue(F,"modelMatrix",W.matrixWorld),z.uniformsGroups!==void 0){const ft=z.uniformsGroups;for(let Nt=0,vn=ft.length;Nt<vn;Nt++){const ts=ft[Nt];Be.update(ts,Dt),Be.bind(ts,Dt)}}return Dt}function Sr(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.sunLights.needsUpdate=I,S.sunLightShadows.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function yr(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ge},this.setRenderTargetTextures=function(S,I,q){const z=We.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),We.get(S.texture).__webglTexture=I,We.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:q,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,I){const q=We.get(S);q.__webglFramebuffer=I,q.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,q=0){ge=S,ae=I,$=q;let z=null,W=!1,_e=!1;if(S){const ye=We.get(S);if(ye.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(F.FRAMEBUFFER,ye.__webglFramebuffer),ue.copy(S.viewport),ke.copy(S.scissor),$e=S.scissorTest,xe.viewport(ue),xe.scissor(ke),xe.setScissorTest($e),Q=-1;return}else if(ye.__webglFramebuffer===void 0)Ye.setupRenderTarget(S);else if(ye.__hasExternalTextures)Ye.rebindTextures(S,We.get(S.texture).__webglTexture,We.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const je=S.depthTexture;if(ye.__boundDepthTexture!==je){if(je!==null&&We.has(je)&&(S.width!==je.image.width||S.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ye.setupDepthRenderbuffer(S)}}const Le=S.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(_e=!0);const Oe=We.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Oe[I])?z=Oe[I][q]:z=Oe[I],W=!0):S.samples>0&&Ye.useMultisampledRTT(S)===!1?z=We.get(S).__webglMultisampledFramebuffer:Array.isArray(Oe)?z=Oe[q]:z=Oe,ue.copy(S.viewport),ke.copy(S.scissor),$e=S.scissorTest}else ue.copy(qe).multiplyScalar(Re).floor(),ke.copy(gt).multiplyScalar(Re).floor(),$e=mt;if(q!==0&&(z=te),xe.bindFramebuffer(F.FRAMEBUFFER,z)&&xe.drawBuffers(S,z),xe.viewport(ue),xe.scissor(ke),xe.setScissorTest($e),W){const ye=We.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+I,ye.__webglTexture,q)}else if(_e){const ye=I;for(let Le=0;Le<S.textures.length;Le++){const Oe=We.get(S.textures[Le]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Le,Oe.__webglTexture,q,ye)}}else if(S!==null&&q!==0){const ye=We.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ye.__webglTexture,q)}Q=-1};function ii(S){const I=We.get(S);return(I.__readFormat!==S.format||I.__readType!==S.type)&&(I.__readFormat=S.format,I.__readType=S.type,I.__formatReadable=lt.textureFormatReadable(S.format),I.__typeReadable=lt.textureTypeReadable(S.type)),I}this.readRenderTargetPixels=function(S,I,q,z,W,_e,Ce,ye=0){if(!(S&&S.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=We.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce],Array.isArray(Le)&&(Le=Le[0])),Le){xe.bindFramebuffer(F.FRAMEBUFFER,Le);try{const Oe=S.textures[ye],je=Oe.format,rt=Oe.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ye);const De=ii(Oe);if(De.__formatReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-z&&q>=0&&q<=S.height-W&&F.readPixels(I,q,z,W,Se.convert(je),Se.convert(rt),_e)}finally{const Oe=ge!==null?We.get(ge).__webglFramebuffer:null;xe.bindFramebuffer(F.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(S,I,q,z,W,_e,Ce,ye=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=We.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce],Array.isArray(Le)&&(Le=Le[0])),Le)if(I>=0&&I<=S.width-z&&q>=0&&q<=S.height-W){xe.bindFramebuffer(F.FRAMEBUFFER,Le);const Oe=S.textures[ye],je=Oe.format,rt=Oe.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ye);const De=ii(Oe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,et),F.bufferData(F.PIXEL_PACK_BUFFER,_e.byteLength,F.STREAM_READ),F.readPixels(I,q,z,W,Se.convert(je),Se.convert(rt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const xt=ge!==null?We.get(ge).__webglFramebuffer:null;xe.bindFramebuffer(F.FRAMEBUFFER,xt);const St=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await nd(F,St,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,et),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,_e),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(et),F.deleteSync(St),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,I=null,q=0){const z=Math.pow(2,-q),W=Math.floor(S.image.width*z),_e=Math.floor(S.image.height*z),Ce=I!==null?I.x:0,ye=I!==null?I.y:0;Ye.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,Ce,ye,W,_e),xe.unbindTexture()},this.copyTextureToTexture=function(S,I,q=null,z=null,W=0,_e=0){let Ce,ye,Le,Oe,je,rt,De,et,xt;const St=S.isCompressedTexture?S.mipmaps[_e]:S.image;if(q!==null)Ce=q.max.x-q.min.x,ye=q.max.y-q.min.y,Le=q.isBox3?q.max.z-q.min.z:1,Oe=q.min.x,je=q.min.y,rt=q.isBox3?q.min.z:0;else{const ut=Math.pow(2,-W);Ce=Math.floor(St.width*ut),ye=Math.floor(St.height*ut),S.isDataArrayTexture?Le=St.depth:S.isData3DTexture?Le=Math.floor(St.depth*ut):Le=1,Oe=0,je=0,rt=0}z!==null?(De=z.x,et=z.y,xt=z.z):(De=0,et=0,xt=0);const _t=Se.convert(I.format),Pt=Se.convert(I.type);let Ne;I.isData3DTexture?(Ye.setTexture3D(I,0),Ne=F.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Ye.setTexture2DArray(I,0),Ne=F.TEXTURE_2D_ARRAY):(Ye.setTexture2D(I,0),Ne=F.TEXTURE_2D),xe.activeTexture(F.TEXTURE0),xe.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,I.flipY),xe.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),xe.pixelStorei(F.UNPACK_ALIGNMENT,I.unpackAlignment);const yt=xe.getParameter(F.UNPACK_ROW_LENGTH),it=xe.getParameter(F.UNPACK_IMAGE_HEIGHT),cn=xe.getParameter(F.UNPACK_SKIP_PIXELS),Dt=xe.getParameter(F.UNPACK_SKIP_ROWS),$n=xe.getParameter(F.UNPACK_SKIP_IMAGES);xe.pixelStorei(F.UNPACK_ROW_LENGTH,St.width),xe.pixelStorei(F.UNPACK_IMAGE_HEIGHT,St.height),xe.pixelStorei(F.UNPACK_SKIP_PIXELS,Oe),xe.pixelStorei(F.UNPACK_SKIP_ROWS,je),xe.pixelStorei(F.UNPACK_SKIP_IMAGES,rt);const hn=S.isDataArrayTexture||S.isData3DTexture,Tn=I.isDataArrayTexture||I.isData3DTexture;if(S.isDepthTexture){const ut=We.get(S),kt=We.get(I),fn=We.get(ut.__renderTarget),ft=We.get(kt.__renderTarget);xe.bindFramebuffer(F.READ_FRAMEBUFFER,fn.__webglFramebuffer),xe.bindFramebuffer(F.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let Nt=0;Nt<Le;Nt++)hn&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,We.get(S).__webglTexture,W,rt+Nt),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,We.get(I).__webglTexture,_e,xt+Nt)),F.blitFramebuffer(Oe,je,Oe+Ce,je+ye,De,et,De+Ce,et+ye,F.DEPTH_BUFFER_BIT,F.NEAREST);xe.bindFramebuffer(F.READ_FRAMEBUFFER,null),xe.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(W!==0||S.isRenderTargetTexture||We.has(S)){const ut=We.get(S),kt=We.get(I);xe.bindFramebuffer(F.READ_FRAMEBUFFER,U),xe.bindFramebuffer(F.DRAW_FRAMEBUFFER,J);for(let fn=0;fn<Le;fn++)hn?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ut.__webglTexture,W,rt+fn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ut.__webglTexture,W),Tn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,kt.__webglTexture,_e,xt+fn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,kt.__webglTexture,_e),W!==0?F.blitFramebuffer(Oe,je,Oe+Ce,je+ye,De,et,De+Ce,et+ye,F.COLOR_BUFFER_BIT,F.NEAREST):Tn?F.copyTexSubImage3D(Ne,_e,De,et,xt+fn,Oe,je,Ce,ye):F.copyTexSubImage2D(Ne,_e,De,et,Oe,je,Ce,ye);xe.bindFramebuffer(F.READ_FRAMEBUFFER,null),xe.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Tn?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(Ne,_e,De,et,xt,Ce,ye,Le,_t,Pt,St.data):I.isCompressedArrayTexture?F.compressedTexSubImage3D(Ne,_e,De,et,xt,Ce,ye,Le,_t,St.data):F.texSubImage3D(Ne,_e,De,et,xt,Ce,ye,Le,_t,Pt,St):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,_e,De,et,Ce,ye,_t,Pt,St.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,_e,De,et,St.width,St.height,_t,St.data):F.texSubImage2D(F.TEXTURE_2D,_e,De,et,Ce,ye,_t,Pt,St);xe.pixelStorei(F.UNPACK_ROW_LENGTH,yt),xe.pixelStorei(F.UNPACK_IMAGE_HEIGHT,it),xe.pixelStorei(F.UNPACK_SKIP_PIXELS,cn),xe.pixelStorei(F.UNPACK_SKIP_ROWS,Dt),xe.pixelStorei(F.UNPACK_SKIP_IMAGES,$n),_e===0&&I.generateMipmaps===!0&&I.mipmapsAutoUpdate===!0&&F.generateMipmap(Ne),xe.unbindTexture()},this.initRenderTarget=function(S){We.get(S).__webglFramebuffer===void 0&&Ye.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ye.setTextureCube(S,0):S.isData3DTexture?Ye.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ye.setTexture2DArray(S,0):Ye.setTexture2D(S,0),xe.unbindTexture()},this.resetState=function(){ae=0,$=0,ge=null,xe.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}}class Vm{constructor(e){He(this,"container");He(this,"scene",null);He(this,"camera",null);He(this,"renderer",null);He(this,"animFrameId",null);He(this,"particles",null);He(this,"hologramMesh",null);He(this,"isVisible",!1);He(this,"playbackSpeed",1);He(this,"isPaused",!1);this.container=e}init(){const e=this.container.clientWidth||400,t=this.container.clientHeight||300;this.scene=new yd,this.camera=new Mn(45,e/t,.1,100),this.camera.position.set(0,0,5),this.renderer=new Gm({alpha:!0,antialias:!0}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.innerHTML="",this.container.appendChild(this.renderer.domElement);const n=new $d(16772829,.6);this.scene.add(n);const s=new Wd(13938487,2.5,10);s.position.set(2,3,4),this.scene.add(s),this.createDreamParticles(),this.createHologramGeometry(),this.startLoop()}createDreamParticles(){if(!this.scene)return;const e=350,t=new Gn,n=new Float32Array(e*3);for(let r=0;r<e*3;r+=3)n[r]=(Math.random()-.5)*8,n[r+1]=(Math.random()-.5)*6,n[r+2]=(Math.random()-.5)*6;t.setAttribute("position",new mi(n,3));const s=new Ol({color:13938487,size:.055,transparent:!0,opacity:.75,blending:ta});this.particles=new Id(t,s),this.scene.add(this.particles)}createHologramGeometry(){if(!this.scene)return;const e=new so(1.2,2),t=new Bd({color:3718648,emissive:993866,roughness:.1,metalness:.15,transmission:.85,ior:1.52,wireframe:!0});this.hologramMesh=new vi(e,t),this.scene.add(this.hologramMesh)}setVisible(e){this.isVisible=e,this.container.style.display=e?"block":"none"}triggerPromptVisual(e){if(this.isVisible&&(console.log("[KrystDreamStage] Új álomkép lehívása prompt alapján:",e),this.hologramMesh)){const t=this.hologramMesh.material;e.toLowerCase().includes("vihar")||e.toLowerCase().includes("tiltott")?t.color.setHex(15680580):e.toLowerCase().includes("arany")||e.toLowerCase().includes("kincs")?t.color.setHex(16096779):t.color.setHex(3718648)}}startLoop(){const e=()=>{if(this.animFrameId=requestAnimationFrame(e),!(!this.isVisible||!this.renderer||!this.scene||!this.camera)){if(!this.isPaused){const t=this.playbackSpeed;this.particles&&(this.particles.rotation.y+=.0015*t),this.hologramMesh&&(this.hologramMesh.rotation.x+=.005*t,this.hologramMesh.rotation.y+=.008*t)}this.renderer.render(this.scene,this.camera)}};e()}setPlaybackSpeed(e){this.playbackSpeed=Math.max(.4,Math.min(e,2.5))}setPaused(e){this.isPaused=e}isAnimationPaused(){return this.isPaused}resize(){if(!this.renderer||!this.camera||!this.container)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}destroy(){this.animFrameId&&cancelAnimationFrame(this.animFrameId),this.renderer&&this.renderer.dispose()}}const Rt=[{id:"kryst_paideia_01",title:"A Tiltott Sziget és Paideia Kincse",author:"Krystohans Kapitány",type:"crystal_book",hasMultiVoiceMaster:!0,chapters:[{id:"chap_1",index:1,title:"I. Fejezet · A Ködös Kikötő Titka",paragraphs:["Az éjszaka leple alatt a hajó csendben siklott a fekete víztükrön. A kikötő fényei már rég a horizont mögé vesztek, amikor a fedélzetmester halkan odalépett a kormánykerékhez.","— Kapitány, az északi zátonyok felől különös fények villannak — suttogta, miközben a távcsövet a sűrűsödő köd felé irányította.","A kormányos nem válaszolt azonnal. Csak a fa recsegése és a hullámok lágy csobogása törte meg a némaságot. Tudta jól: a sziget, amely felé tartanak, nem szerepel a hivatalos térképeken."],tokens:[{text:"Az éjszaka leple alatt a hajó csendben siklott a fekete víztükrön.",startSec:0,endSec:4.5,speakerId:"narrator",visualPrompt:"Éjszakai csendes tenger, sötét hullámok"},{text:"A kikötő fényei már rég a horizont mögé vesztek, amikor a fedélzetmester halkan odalépett a kormánykerékhez.",startSec:4.5,endSec:10.2,speakerId:"narrator"},{text:"— Kapitány, az északi zátonyok felől különös fények villannak — suttogta, miközben a távcsövet a sűrűsödő köd felé irányította.",startSec:10.2,endSec:17.5,speakerId:"rozmar",threeDAnchor:"assets/models/kalozhajo01.glb"},{text:"A kormányos nem válaszolt azonnal. Csak a fa recsegése és a hullámok lágy csobogása törte meg a némaságot.",startSec:17.5,endSec:23,speakerId:"narrator"},{text:"Tudta jól: a sziget, amely felé tartanak, nem szerepel a hivatalos térképeken.",startSec:23,endSec:29,speakerId:"kapitany",visualPrompt:"Misztikus aranyszínű fény a ködben"}]},{id:"chap_2",index:2,title:"II. Fejezet · A Paideia Szobor Rejtélye",paragraphs:["A partot érve a legénység fáklyákkal vágott utat a trópusi liánok között. Az ősi kőromok között emelkedett ki a Paideia szent szobra, melynek tenyerében egy kék LETkristály pulzált.","— Ne érintsd meg puszta kézzel! — kiáltott fel a boszorkány, de már késő volt: a kristály rezonanciája végigfutott a sziget szikláin."],tokens:[{text:"A partot érve a legénység fáklyákkal vágott utat a trópusi liánok között.",startSec:0,endSec:5.2,speakerId:"narrator"},{text:"Az ősi kőromok között emelkedett ki a Paideia szent szobra, melynek tenyerében egy kék LETkristály pulzált.",startSec:5.2,endSec:12,speakerId:"narrator",visualPrompt:"Paideia arany szobra kék kristállyal"},{text:"— Ne érintsd meg puszta kézzel! — kiáltott fel a boszorkány, de már késő volt.",startSec:12,endSec:17.5,speakerId:"raven"},{text:"A kristály rezonanciája végigfutott a sziget szikláin.",startSec:17.5,endSec:22,speakerId:"narrator"}]}]},{id:"kryst_scroll_wind_02",title:"Viharos Passzátszelek és Áramlatok",author:"Ismeretlen Navigátor",type:"scroll",hasMultiVoiceMaster:!1,chapters:[{id:"scroll_1",index:1,title:"Tekercs 1. · Az Északi Örvény",paragraphs:["A 14. szélességi foknál a tenger sosem nyugszik. A szél hirtelen fordul és a mélybe rántja a felkészületlen bárkákat. Ezen a szakaszon a vitorlákat be kell vonni, a kormányrudat kötéllel rögzíteni szükséges."],tokens:[]}]},{id:"kryst_book_atlantis_03",title:"Az Elveszett Kincsesbárka Krónikája",author:"Rodrigo De Silva",type:"crystal_book",hasMultiVoiceMaster:!0,chapters:[{id:"chap_atlantis_1",index:1,title:"I. Fejezet · A Smaragd Lagúna Titka",paragraphs:["A spanyol flotta eltévedt hajója három héttel a vihar után futott zátonyra a lakatlan atoll sekély vízében. A raktérben háromszáz láda vert arany és tizenkét faragott jade szobor rejtőzött.","A túlélők naplójukban lejegyezték: a sziget belsejéből éjszakánként különös harangszó hallatszik, noha templomnak nyoma sincs."],tokens:[{text:"A spanyol flotta eltévedt hajója három héttel a vihar után futott zátonyra a lakatlan atoll sekély vízében.",startSec:0,endSec:6,speakerId:"narrator",visualPrompt:"Smaragd lagúna homokpadján pihenő aranyozott spanyol gálya",threeDAnchor:"assets/models/kalozhajo01.glb"},{text:"A raktérben háromszáz láda vert arany és tizenkét faragott jade szobor rejtőzött.",startSec:6,endSec:12,speakerId:"kapitany",visualPrompt:"Aranyérmék és jáde szobrok csillogása a hajó gyomrában"},{text:"A túlélők naplójukban lejegyezték: a sziget belsejéből éjszakánként különös harangszó hallatszik, noha templomnak nyoma sincs.",startSec:12,endSec:19.5,speakerId:"narrator",visualPrompt:"Ködbe burkolózó trópusi hegycsúcs misztikus haranggal"}]}]},{id:"kryst_scroll_sirens_04",title:"A Karibi Szirének Éneke Tekercs",author:"Morgana Tengerésznő",type:"scroll",hasMultiVoiceMaster:!1,chapters:[{id:"scroll_sirens_1",index:1,title:"Tekercs 1. · Az Elbűvölő Hullámok",paragraphs:["Óvakodj a holdtöltekor felcsendülő dallamtól a déli korallszirtek között! A víz kristályos csillogása elvakítja az elmédet, s a mélység királynője a hajóroncsok palotájába csalogat."],tokens:[{text:"Óvakodj a holdtöltekor felcsendülő dallamtól a déli korallszirtek között!",startSec:0,endSec:5.5,speakerId:"narrator"},{text:"A víz kristályos csillogása elvakítja az elmédet, s a mélység királynője a hajóroncsok palotájába csalogat.",startSec:5.5,endSec:12.5,speakerId:"narrator"}]}]}],Ct=[{id:"map_kalozsziget_01",title:"A Tiltott Szigetcsoport és Korallzátonyok",imageUrl:"https://images.unsplash.com/photo-1524654458049-e36be0721fa2?auto=format&fit=crop&w=1200&q=80",description:"Titkos hajózási térkép mélységvonalakkal és expedíciós jelölőkkel.",anchors:[{id:"anchor_koponya_szikla",xPercent:32.5,yPercent:28,name:"Koponya-szikla Zátony",coordinates:`ÉSz 14°18'20", NYh 75°12'45"`,dangerLevel:"Végzetes Zátony",windDirection:"Északkeleti orkán (8 csomó)",treasureNote:"Három spanyol aranygálya roncsa pihen 20 öl mélyen a zátony lábánál. Az 1684-es flotta zászlóshajója, a San Jeronimo fedélzetén 400 láda ezüsttallér és a királyi pecsétgyűrű merült a habokba. Csak a dagály csúcsán, teljes szélcsendben közelíthető meg kisméretű csónakkal, mert a rejtett éles sziklatüskék másodpercek alatt felhasítják a nehéz tölgyfa törzset."},{id:"anchor_paideia_obol",xPercent:68.2,yPercent:54,name:"Paideia Titkos Öböl",coordinates:`ÉSz 14°25'11", NYh 75°22'05"`,dangerLevel:"Biztonságos Kikötő",windDirection:"Csendes partmenti szellő (2 csomó)",treasureNote:"Természetes védett öböl mély kristálytiszta vízzel. A parttól pontosan száz lépésre, a trópusi fák árnyékában emelkedik az ősi Paideia márványszentély. Az oltárba vésett rúnák szerint a szentély alatt kiterjedt katakombarendszer húzódik, mely a sziget belső vulkáni kamráiba és a kristálybányákhoz vezet."},{id:"anchor_orveny",xPercent:50,yPercent:78.5,name:"Kék Rezonancia Örvény",coordinates:`ÉSz 14°09'55", NYh 75°18'30"`,dangerLevel:"Rejtélyes Örvény",windDirection:"Kiszámíthatatlan forgószél",treasureNote:"Mágneses és téridő-anomália övezte mélytengeri kráter. Az iránytűk vad pörgésbe kezdenek a tengerfenéken rejtőző gigantikus LETkristály-ágy rezonanciája miatt. A feljegyzések szerint az örvény középpontjában egy elsüllyedt ősi torony csúcsa látható a mélyben, ahol a fényhajlító prizmák még ma is működnek."}]},{id:"map_vulkansziget_02",title:"A Tűzfok és a Fekete Zátonyok Archipelagója",imageUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",description:"Vulkáni hamufelhők alatt rejtőző sziklaszirtek és kalóz rejtekhelyek térképe.",anchors:[{id:"anchor_tuzfok",xPercent:44,yPercent:35,name:"Obszidián Krátertó",coordinates:`ÉSz 15°02'18", NYh 74°48'10"`,dangerLevel:"Magas Hőmérséklet",windDirection:"Kénes északi szél",treasureNote:"Az alvó vulkán kráterében forró ásványi források fakadnak. A kráterfalak mentén ősi obszidián pengék és rituális ékszerek maradtak fenn a pre-arkán korból."},{id:"anchor_fekete_fok",xPercent:72,yPercent:62,name:"Fekete Zátonyok Barlangja",coordinates:`ÉSz 14°55'40", NYh 74°35'22"`,dangerLevel:"Kalózlesállás",windDirection:"Erős délnyugati hullámverés",treasureNote:"Csak apálykor szárazon maradó tengeri barlangrendszer. A csempészek évtizedek óta itt rejtik el a rumos hordókat és a fegyverkészleteket."}]}],$a={"😤":{emoji:"😤",label:"Dühös / Csettintő",styleGuide:"Dühösen, pattogósan, elfojtott indulattal, a mondat végén éles csettintéssel.",contextNote:"Feszült parancsnoki vagy számonkérő kiszólás, szúrós tekintettel."},"🤫":{emoji:"🤫",label:"Suttogó / Titokzatos",styleGuide:"Halkan, bizalmas suttogással, közel a mikrofonhoz, lassított tempóban.",contextNote:"Titkos összeesküvés, éjszakai őrség vagy tiltott kincses hír átadása."},"😂":{emoji:"😂",label:"Hahotázó / Gúnyos",styleGuide:"Rekedtes kalóz-nevetéssel átszőve, kajánul és fölényesen.",contextNote:"Kocsmai ugratás, győzelmi mámor vagy az ellenség kinevetése."},"⚡":{emoji:"⚡",label:"Sürgető / Vészhelyzeti",styleGuide:"Gyors tempóban, emelt hangerővel, feszült lélegzetvétellel, riadót fújva.",contextNote:"Vihar közeledte, zátonyra futás veszélye vagy csata kezdete a fedélzeten."},"🌊":{emoji:"🌊",label:"Mesélő / Hullámzó",styleGuide:"Lágyan ívelő, dallamos, epikus mesélő hanglejtéssel, tengeri hullámzást idézve.",contextNote:"Távoli szigetek, ősi legendák és tengeri horizontok leírásakor."},"🤔":{emoji:"🤔",label:"Töprengő / Gyanakvó",styleGuide:"Meg-megállva, a szavakat ízlelgetve, kérdő-kutató hangsúllyal.",contextNote:"Rejtvényfejtés, gyanús nyomok vizsgálata vagy térkép-elemzés közben."},"😨":{emoji:"😨",label:"Rémült / Remegő",styleGuide:"Elcsukló, remegő hangon, kapkodó levegővétellel, babonás félelemmel.",contextNote:"Kísértethajó, mélytengeri szörny vagy halálos csapda felbukkanásakor."},"👑":{emoji:"👑",label:"Ünnepélyes / Kánoni",styleGuide:"Mély, zengő, méltóságteljes hanglejtéssel, kimért szünetekkel.",contextNote:"Királyi dekrétum, ősi eskü, vagy Abrigó kánoni törvényeinek kihirdetése."},"😢":{emoji:"😢",label:"Elérzékenyült /Bánatos",styleGuide:"Lassú, fátyolos, érzelmes hangon, sóhajjal a mondat végén.",contextNote:"Elveszett bajtársak, elsüllyedt hajó vagy búcsúzás pillanata."},"🔥":{emoji:"🔥",label:"Lelkesítő / Harci",styleGuide:"Tüzesen, harsányan, a legénységet tüzelő szónoki lendülettel!",contextNote:"Csatába hívó beszéd, roham indítása vagy eskü a zsákmányra."},"🎶":{emoji:"🎶",label:"Dúdoló /Bordal",styleGuide:"Ritmikus, éneklő-kántáló tengerész (shanty) hanglejtéssel.",contextNote:"Kötélhúzás, vasmacska felvonása vagy kocsmai mulatozás közben."},"⚓":{emoji:"⚓",label:"Parancsnoki /Határozott",styleGuide:"Kemény, ellentmondást nem tűrő, tiszta kapitányi vezényszóként.",contextNote:"Kormányosnak vagy vitorlamesternek adott közvetlen utasítás."}},ui={galley:{emoji:"⛵",label:"Kalózgálya / Vitorlás"},steamer:{emoji:"🚢",label:"Páncélos Gőzhajó"},walking:{emoji:"🥾",label:"Gyalogszer / Karaván"},horse_wagon:{emoji:"🐎",label:"Lovas Szekér / Hintó"},bicycle:{emoji:"🚲",label:"Mechanikus Velocipéd"},steam_train:{emoji:"🚂",label:"Gőzmozdony"},airship:{emoji:"🎈",label:"Kristály-Léghajó"},antigrav_speeder:{emoji:"🛸",label:"Antigrav Sikló"}};function Wm(i){for(const e of Object.keys($a))if(i.includes(e))return $a[e];return null}function js(i){if(!i)return"";let e=i;for(const[t,n]of Object.entries($a))if(e.includes(t)){const s=n.label.replace(/"/g,"&quot;"),r=n.styleGuide.replace(/"/g,"&quot;"),a=n.contextNote.replace(/"/g,"&quot;"),o=`<span class="kryst-reader-intonation-badge" tabindex="0">${t}<span class="kryst-reader-intonation-bubble"><strong>${t} ${s}</strong><span class="bubble-row"><em>🎬 Rendezői instrukció:</em> ${r}</span><span class="bubble-row"><em>💡 Tipp:</em> ${a}</span></span></span>`;e=e.split(t).join(o)}return e}function nc(i,e){const t=new Uint8Array(i);if(t.length<8||t[0]!==137||t[1]!==80||t[2]!==78||t[3]!==71)return null;const n=new DataView(i),s=new TextDecoder("utf-8"),r=new TextDecoder("iso-8859-1");let a=8;for(;a+8<=t.length;){const o=n.getUint32(a,!1),l=String.fromCharCode(t[a+4],t[a+5],t[a+6],t[a+7]),c=a+8,h=c+o;if(h>t.length)break;if(l==="iTXt"){const u=t.subarray(c,h),d=u.indexOf(0);if(d>0&&r.decode(u.subarray(0,d))==="KrystMapDataset"){let _=d+3;for(;_<u.length&&u[_]!==0;)_++;for(_++;_<u.length&&u[_]!==0;)_++;_++;const M=s.decode(u.subarray(_));try{const f=JSON.parse(M);return e&&(f.imageUrl=e),f}catch{}}}else if(l==="tEXt"){const u=t.subarray(c,h),d=u.indexOf(0);if(d>0&&r.decode(u.subarray(0,d))==="KrystMapDatasetBase64"){const _=r.decode(u.subarray(d+1));try{const M=atob(_),f=new Uint8Array(M.length);for(let y=0;y<M.length;y++)f[y]=M.charCodeAt(y);const p=JSON.parse(s.decode(f));return e&&(p.imageUrl=e),p}catch{}}}if(l==="IEND")break;a=h+4}return null}function ur(i){var o,l,c,h;const e=[],t=i,n=[`🌊 ${i.title} — ${i.description||"Kartográfiai és narratív térképkönyv."}`];i.anchors.forEach((u,d)=>{var _;const m=((_=u.narrativeHook)==null?void 0:_.entryNarrativeText)||u.treasureNote||"";n.push(`⚓ ${d+1}. Állomás: ${u.name} (${u.coordinates||`${Math.round(u.xPercent)}%, ${Math.round(u.yPercent)}%`}) — Veszély: ${u.dangerLevel}. ${m}`)}),e.push({id:`${i.id}_chap_anchors`,index:0,title:"1. Gráf Horgonyok & Helyszínek",paragraphs:n,tokens:n.map((u,d)=>({text:u,startSec:d*5,endSec:(d+1)*5,speakerId:"narrator"}))});const s=[],r=((l=(o=t.narrativeLayer)==null?void 0:o.travelogue)==null?void 0:l.stages)||[];Array.isArray(r)&&r.length>0&&r.forEach((u,d)=>{const m=i.anchors.find(p=>p.id===u.fromAnchorId),_=i.anchors.find(p=>p.id===u.toAnchorId),M=ui[u.vehicle||"galley"]||ui.galley,f=Array.isArray(u.directorSignposts)?u.directorSignposts.map(p=>p.summaryPrompt||p.title).join(" "):"";s.push(`${M.emoji} ${d+1}. Útszakasz: ${(m==null?void 0:m.name)||u.fromAnchorId} → ${(_==null?void 0:_.name)||u.toAnchorId} (${M.label}). ${f}`)});const a=((h=(c=i.narrativeLayer)==null?void 0:c.decisionGraph)==null?void 0:h.edges)||[];return a.length>0&&a.forEach(u=>{const d=i.anchors.find(_=>_.id===u.fromAnchorId),m=i.anchors.find(_=>_.id===u.toAnchorId);s.push(`⚡ Elágazás (${(d==null?void 0:d.name)||u.fromAnchorId} → ${(m==null?void 0:m.name)||u.toAnchorId}): «${u.choiceLabel}» — ${u.narrativeIntro||""}`)}),s.length>0&&e.push({id:`${i.id}_chap_routes`,index:1,title:"2. Expedíciós Útvonalak & Döntési Gráf",paragraphs:s,tokens:s.map((u,d)=>({text:u,startSec:d*5,endSec:(d+1)*5,speakerId:"zozo"}))}),{id:`mapbook_${i.id}`,title:`🗺️ ${i.title} (Mapbook)`,author:t.ownerPirateName||"Kryst Kartográfia",type:"crystal_book",chapters:e,hasMultiVoiceMaster:!0,defaultNarratorVoice:"ferenc"}}function ic(i){var n,s,r,a;const e=(i==null?void 0:i.script)||((n=i==null?void 0:i.packageData)==null?void 0:n.script)||i;if(!e||!Array.isArray(e.chapters))return null;const t=e.chapters.map((o,l)=>{const c=Array.isArray(o.items)?o.items:[],h=c.length>0?c.map(d=>d.text||"").filter(d=>d.trim().length>0):[o.title||`${l+1}. Fejezet`],u=c.map((d,m)=>({text:d.text||"",startSec:m*4,endSec:(m+1)*4,speakerId:d.character||"narrator",visualPrompt:d.contextNote||d.styleGuide||void 0}));return{id:o.chapterId||`chap_${l+1}`,index:l,title:o.title||`${l+1}. Fejezet`,paragraphs:h,tokens:u}});return{id:((s=e.metadata)==null?void 0:s.bookId)||`studio_book_${Date.now()}`,title:((r=e.metadata)==null?void 0:r.title)||"Stúdió Kristálykönyv",author:((a=e.metadata)==null?void 0:a.author)||"LET.kryst Stúdió",type:"crystal_book",chapters:t,hasMultiVoiceMaster:!0,defaultNarratorVoice:"ferenc"}}async function Xm(i){if(i.name.toLowerCase().endsWith(".png")){const a=await i.arrayBuffer(),o=await new Promise(c=>{const h=new FileReader;h.onload=()=>c(String(h.result||"")),h.readAsDataURL(i)}),l=nc(a,o);if(l)return{map:l,book:ur(l),sourceLabel:`Hibrid PNG Térkép (${i.name})`};throw new Error("A PNG fájl nem tartalmaz beágyazott KrystMapDataset JSON metaadatot.")}const t=await i.text(),n=JSON.parse(t),s=n.packageData||n;if(s.dataset||Array.isArray(s.anchors)){const a=s.dataset||s;return s.cleanPngDataUrl&&!a.imageUrl&&(a.imageUrl=s.cleanPngDataUrl),{map:a,book:ur(a),sourceLabel:`Kryst Térkép (${a.title||i.name})`}}const r=ic(s);if(r)return{book:r,sourceLabel:`Kristálykönyv (${r.title})`};if(Array.isArray(s.chapters))return{book:s,sourceLabel:`Könyv (${s.title||i.name})`};throw new Error("Nem felismerhető Kryst ökoszisztéma fájlformátum.")}async function $m(){var r;const i=[],e=[],t=new Set,n=new Set;let s;try{const a=localStorage.getItem("kryst_abrigo_master_override_v1");if(a){const o=JSON.parse(a),l=(o==null?void 0:o.dataset)||o;l&&Array.isArray(l.anchors)&&(o.thumbnailDataUrl&&!l.imageUrl&&(l.imageUrl=o.thumbnailDataUrl),s=l)}}catch{}try{const a=localStorage.getItem("kryst_monk_virtual_disk_maps_v1");if(a){const o=JSON.parse(a);if(Array.isArray(o))for(const l of o){const c=l.dataset||l;c&&Array.isArray(c.anchors)&&(l.cleanPngDataUrl&&(c.imageUrl=l.cleanPngDataUrl),t.has(c.id)||(t.add(c.id),i.push(c)))}}}catch{}try{if("storage"in navigator&&typeof navigator.storage.getDirectory=="function"){const l=await(await(await navigator.storage.getDirectory()).getDirectoryHandle("kryst_monk_disk",{create:!1})).getDirectoryHandle("maps",{create:!1});for await(const[,c]of l.entries())if(c.kind==="file"){const h=await c.getFile(),u=JSON.parse(await h.text()),d=u.dataset||u;d&&Array.isArray(d.anchors)&&!t.has(d.id)&&(u.cleanPngDataUrl&&(d.imageUrl=u.cleanPngDataUrl),t.add(d.id),i.push(d))}}}catch{}try{const a=await fetch("http://localhost:3000/api/monk-disk/list");if(a.ok){const o=await a.json();if(Array.isArray(o.items))for(const l of o.items)try{const c=await fetch(`http://localhost:3000/api/monk-disk/read/${l.category}/${encodeURIComponent(l.filename)}`);if(c.ok){const h=await c.json(),u=((r=h.data)==null?void 0:r.packageData)||h.data;if(l.category==="maps"||u!=null&&u.dataset||Array.isArray(u==null?void 0:u.anchors)){const d=u.dataset||u;u.cleanPngDataUrl&&(d.imageUrl=u.cleanPngDataUrl),d&&Array.isArray(d.anchors)&&!t.has(d.id)&&(t.add(d.id),i.push(d))}else{const d=ic(u);d&&!n.has(d.id)&&(n.add(d.id),e.push(d))}}}catch{}}}catch{}return{maps:i,books:e,abrigoOverride:s}}function ll(i){var r,a,o,l,c,h,u,d;const e=[],t=i,n=new Map;i.anchors.forEach(m=>n.set(m.id,m));const s=(a=(r=t.narrativeLayer)==null?void 0:r.travelogue)==null?void 0:a.stages;if(Array.isArray(s)&&s.length>0&&s.forEach((m,_)=>{var L,R;const M=n.get(m.fromAnchorId)||i.anchors[_],f=n.get(m.toAnchorId)||i.anchors[_+1];if(!M||!f)return;const p=m.vehicle||((L=i.expeditionState)==null?void 0:L.vehicle)||"galley",y=ui[p]||ui.galley,w=Array.isArray(m.directorSignposts)?m.directorSignposts[0]:null,T=m.routeAnimation||{};e.push({stageId:m.stageId||`stage_${_+1}`,stageNumber:_+1,fromAnchor:M,toAnchor:f,vehicle:p,vehicleEmoji:y.emoji,vehicleLabel:y.label,durationSec:Number(T.durationSec||5),bgMusicCue:T.bgMusicCue||(w==null?void 0:w.bgMusicCue)||"ocean_calm_voyage",sfxCue:T.sfxCue||(w==null?void 0:w.sfxCue)||"compass_click",cutEffect:T.cutEffect||"compass_wipe",narrationText:T.narrationText||(w==null?void 0:w.summaryPrompt)||((R=f.narrativeHook)==null?void 0:R.entryNarrativeText)||f.treasureNote||`Utazás ${M.name} kikötőjéből ${f.name} felé.`,speaker:(w==null?void 0:w.ttsVoicePersona)||"Narrátor"})}),e.length===0&&Array.isArray((l=(o=i.narrativeLayer)==null?void 0:o.travelogue)==null?void 0:l.waypointSequence)){const m=i.narrativeLayer.travelogue.waypointSequence;for(let _=0;_<m.length-1;_++){const M=n.get(m[_]),f=n.get(m[_+1]);if(!M||!f)continue;const p=((c=i.expeditionState)==null?void 0:c.vehicle)||"galley",y=ui[p]||ui.galley;e.push({stageId:`wp_stage_${_+1}`,stageNumber:_+1,fromAnchor:M,toAnchor:f,vehicle:p,vehicleEmoji:y.emoji,vehicleLabel:y.label,durationSec:5,bgMusicCue:"ocean_calm_voyage",sfxCue:"compass_click",cutEffect:"compass_wipe",narrationText:((h=f.narrativeHook)==null?void 0:h.entryNarrativeText)||f.treasureNote||`Hajózás ${M.name} állomásról ${f.name} irányába.`,speaker:"Narrátor"})}}if(e.length===0&&i.anchors.length>=2)for(let m=0;m<i.anchors.length-1;m++){const _=i.anchors[m],M=i.anchors[m+1],f=((u=i.expeditionState)==null?void 0:u.vehicle)||"galley",p=ui[f]||ui.galley;e.push({stageId:`auto_stage_${m+1}`,stageNumber:m+1,fromAnchor:_,toAnchor:M,vehicle:f,vehicleEmoji:p.emoji,vehicleLabel:p.label,durationSec:5,bgMusicCue:"ocean_calm_voyage",sfxCue:"compass_click",cutEffect:"compass_wipe",narrationText:((d=M.narrativeHook)==null?void 0:d.entryNarrativeText)||M.treasureNote||`Utazás ${_.name} pontból ${M.name} felé.`,speaker:"Narrátor"})}return e}function cl(i){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.createOscillator(),s=t.createGain(),r=t.currentTime;i.includes("bell")||i.includes("gong")?(n.type="sine",n.frequency.setValueAtTime(528,r),n.frequency.exponentialRampToValueAtTime(264,r+.65)):i.includes("cannon")||i.includes("thunder")?(n.type="sawtooth",n.frequency.setValueAtTime(110,r),n.frequency.exponentialRampToValueAtTime(38,r+.55)):(n.type="triangle",n.frequency.setValueAtTime(660,r),n.frequency.exponentialRampToValueAtTime(880,r+.25)),s.gain.setValueAtTime(.08,r),s.gain.exponentialRampToValueAtTime(.001,r+.65),n.connect(s),s.connect(t.destination),n.start(r),n.stop(r+.66)}catch{}}document.addEventListener("DOMContentLoaded",()=>{const i=new Sc,e=document.getElementById("reader-chassis"),t=document.getElementById("view-browser"),n=document.getElementById("view-text"),s=document.getElementById("view-dream-stage"),r=document.getElementById("view-map"),a=document.getElementById("text-tokens-container"),o=document.getElementById("reader-lens-container"),l=document.getElementById("reader-coords-display"),c=document.createElement("div");c.id="dragged-word-ghost",c.className="dragged-word-ghost",document.body.appendChild(c);let h=!1,u=null,d=null,m=0,_=0,M=null,f=!1;const p=document.getElementById("btn-open-bookmarks"),y=document.getElementById("bookmark-modal-overlay"),w=document.getElementById("bookmark-search-input"),T=document.getElementById("bookmark-cards-scroll"),L=document.getElementById("btn-create-bookmark"),R=document.getElementById("btn-open-chapters"),g=document.getElementById("chapter-modal-overlay"),b=document.getElementById("chapter-cards-scroll"),O=document.getElementById("map-modal-overlay"),D=document.getElementById("map-cards-scroll"),k=document.getElementById("browser-search-input"),X=document.getElementById("btn-clear-browser-search"),te=document.querySelectorAll(".browser-filter-chip"),U=document.getElementById("browser-stats-text"),J=document.getElementById("browser-books-section"),ae=document.getElementById("browser-maps-section"),$=document.getElementById("browser-empty-state"),ge=document.getElementById("btn-reset-browser-filters");let Q="",le="all";const ue=document.getElementById("btn-font-decrease"),ke=document.getElementById("btn-font-increase"),$e=document.getElementById("btn-basis-back"),ee=document.getElementById("btn-media-pause-play"),Ae=document.getElementById("icon-pause-play"),Pe=document.getElementById("btn-thumb-prev"),Fe=document.getElementById("btn-thumb-next"),Re=document.getElementById("slider-bgm"),Ze=document.getElementById("slider-voice"),Mt=document.getElementById("slider-speed"),qe=document.getElementById("label-bgm-val"),gt=document.getElementById("label-voice-val"),mt=document.getElementById("label-speed-val"),st=document.getElementById("map-image-wrapper"),Ht=document.getElementById("map-target-image"),At=document.getElementById("map-footer-dock"),Gt=document.getElementById("map-footer-title"),bt=document.getElementById("map-footer-danger"),en=document.getElementById("map-footer-text"),wt=document.getElementById("map-footer-action-row"),on=document.getElementById("btn-poi-more"),Ft=document.getElementById("map-parchment-overlay"),Kt=document.getElementById("parchment-scroll-area"),F=document.getElementById("parchment-title"),tn=document.getElementById("parchment-meta"),Tt=document.getElementById("parchment-text-content");let lt=null,xe=null,nt=!1,We=1,Ye=0,A=1,x=1,V=!1;const fe=document.getElementById("chapter-media-pill"),re=document.getElementById("chapter-media-count"),de=document.getElementById("chapter-media-lightbox"),Te=document.getElementById("chapter-media-lightbox-title"),ne=document.getElementById("btn-close-media-lightbox"),se=document.getElementById("chapter-media-active-img"),Ee=document.getElementById("chapter-media-thumbs");let P=[];const ie=document.getElementById("library-hydration-overlay"),j=document.getElementById("library-hydration-spinner"),be=document.getElementById("library-hydration-title"),Se=document.getElementById("library-hydration-desc"),Me=document.getElementById("btn-hydration-fallback-legacy"),Be=document.getElementById("btn-hydration-cancel");let Je=null,me=null,ze=null,Ve=null,we=!1;Rt.forEach(v=>{!v.isUserOwned&&!v.sourceKind&&(v.sourceKind="demo")}),Ct.forEach(v=>{!v.isUserOwned&&!v.status&&(v.status="demo")});const pt=new Vm(s);pt.init(),i.setDreamStage(pt);function Ot(v,E){return!E||v.title.toLowerCase().includes(E)||v.author.toLowerCase().includes(E)?!0:v.chapters.some(H=>H.title.toLowerCase().includes(E)||H.paragraphs.some(N=>N.toLowerCase().includes(E))||H.tokens.some(N=>N.text.toLowerCase().includes(E)))}function Dn(v,E){return!E||v.title.toLowerCase().includes(E)||v.description.toLowerCase().includes(E)?!0:v.anchors.some(H=>H.name.toLowerCase().includes(E)||H.treasureNote.toLowerCase().includes(E)||H.coordinates.toLowerCase().includes(E)||H.dangerLevel.toLowerCase().includes(E))}function Qi(){k&&(k.value=""),Q="",le="all",X&&(X.style.display="none"),qt("","all"),k&&k.focus()}function qt(v=Q,E=le){Q=v,le=E;const H=v.trim().toLowerCase();X&&(X.style.display=H.length>0?"block":"none"),te&&te.length>0&&te.forEach(Y=>{Y.classList.toggle("active",Y.getAttribute("data-category")===E)});const N=document.getElementById("browser-books-list");N.innerHTML="";const oe=E==="all"||E==="crystal_book"||E==="copy"||E==="scroll"||E==="log"?Rt.filter(Y=>E==="crystal_book"&&Y.type!=="crystal_book"||E==="copy"&&Y.type!=="copy"&&Y.sourceKind!=="copy"||E==="scroll"&&(Y.type!=="scroll"||Y.sourceKind==="log")||E==="log"&&Y.sourceKind!=="log"?!1:Ot(Y,H)):[];oe.forEach(Y=>{var Ke,nn;const C=document.createElement("div");C.className="bookmark-card",C.style.cursor=Y.inPlay?"not-allowed":"pointer";const ce=Y.type==="crystal_book",ve=ce&&!!Y.hasMultiVoiceMaster;let pe=ce?'<span class="browser-type-badge" style="color: var(--color-gold-glow);">💎 Kristálykönyv</span>':'<span class="browser-type-badge" style="color: #94a3b8;">📜 Tekercs</span>';Y.sourceKind==="book"?pe='<span class="browser-type-badge" style="color: var(--color-gold-glow);">💎 Saját Priori Könyv</span>':Y.sourceKind==="copy"?pe='<span class="browser-type-badge" style="color: #60a5fa;">📘 Saját Másolat</span>':Y.sourceKind==="scroll"?pe='<span class="browser-type-badge" style="color: #cbd5e1;">📜 Saját Tekercs</span>':Y.sourceKind==="log"?pe='<span class="browser-type-badge" style="color: #fbbf24;">📓 Hajónapló</span>':Y.sourceKind==="monastery"&&(pe=`<span class="browser-type-badge" style="color: #c084fc;">🔒 OPFS Kézirat${Y.statusLabel?" · "+Y.statusLabel:""}</span>`);let Xe="";Y.inPlay?Xe='<span class="browser-cache-pill in-play">🎮 Játékban</span>':Y.isUserOwned?Xe=Y.cachedInOpfs||!Y.needsHydration?'<span class="browser-cache-pill opfs-ready">⚡ OPFS Kész</span>':'<span class="browser-cache-pill cloud-fetch">☁️ Felhő → OPFS</span>':Y.sourceKind==="demo"&&(Xe='<span class="browser-cache-pill demo-badge">Minta</span>');const Ge=Y.needsHydration?`Szerző: ${Y.author}${Y.chapterLabel?" · "+Y.chapterLabel:""} · Kattints a betöltéshez`:`Szerző: ${Y.author} · ${Y.chapters.length} fejezet`,Yt=Y.sourceKind==="demo"||Ct.some(Bt=>{var Ut;return((Ut=Bt.canonicalWorldGate)==null?void 0:Ut.associatedKrystBookId)===Y.id||`mapbook_${Bt.id}`===Y.id}),pn=Y.inPlay?'<div class="bookmark-card-actions"><span style="font-size: 0.75rem; color: #fbbf24;">⚠️ Játékban lévő másolat jelenleg nem olvasható.</span></div>':`
          <div class="bookmark-card-actions">
            <button class="card-action-btn" data-action="read" title="1. Szint: eBook (Tiszta kinetikus olvasás)">📖 eBook</button>
            <button class="card-action-btn" data-action="listen" title="2. Szint: Audiobook (Olvasás + Felolvasó Szinkron)">🎧 Audiobook ▾</button>
            ${ve?'<button class="card-action-btn" data-action="dream" title="3. Szint: Multimedia-Book (Karaoke + 3D Álom-Színpad + Többszereplős Stúdió Szinkron)">🎬✨ Multimedia-Book ▾</button>':""}
            ${Yt?'<button class="card-action-btn" data-action="mapbook" title="4. Szint: Mapbook (Kapcsolt Interaktív Térkép & 2D Útvonal)">🗺️⛵ Mapbook</button>':""}
          </div>
        `;if(C.innerHTML=`
        <div class="bookmark-card-title">
          <span>${Y.title}</span>
          <span>${pe}${Xe}</span>
        </div>
        <div class="browser-item-meta">${Ge}</div>
        ${pn}
      `,!Y.inPlay){(Ke=C.querySelector('[data-action="read"]'))==null||Ke.addEventListener("click",An=>{An.stopPropagation(),Kn(Y,"read")}),(nn=C.querySelector('[data-action="mapbook"]'))==null||nn.addEventListener("click",An=>{An.stopPropagation();const xn=Ct.find(Zt=>{var Xt;return((Xt=Zt.canonicalWorldGate)==null?void 0:Xt.associatedKrystBookId)===Y.id||`mapbook_${Zt.id}`===Y.id})||Ct[0];xn&&si(xn,"map")});const Bt=C.querySelector('[data-action="listen"]');Bt==null||Bt.addEventListener("click",An=>{An.stopPropagation();const xn=C.querySelector(".scroll-voice-dropdown");if(xn){xn.remove(),Bt.classList.remove("active-dropdown");return}document.querySelectorAll(".scroll-voice-dropdown, .dream-stage-dropdown").forEach(Xt=>Xt.remove()),document.querySelectorAll('[data-action="listen"].active-dropdown, [data-action="dream"].active-dropdown').forEach(Xt=>Xt.classList.remove("active-dropdown")),Bt.classList.add("active-dropdown");const Zt=document.createElement("div");Zt.className="scroll-voice-dropdown",Zt.innerHTML=`
            <div class="scroll-voice-dropdown-header">
              <span>🎙️ Válassz magyar felolvasó karaktert:</span>
              <span class="scroll-voice-dropdown-badge">Piper TTS</span>
            </div>
            <div class="scroll-voice-list">
              ${uo.map(Xt=>`
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
          `,Zt.querySelectorAll(".scroll-voice-item").forEach(Xt=>{Xt.addEventListener("click",async As=>{As.stopPropagation();const wn=Xt.getAttribute("data-voice")||"ferenc",Er=uo.find(cc=>cc.id===wn),lc=Er?`${Er.icon} ${Er.name}`:wn;Zt.innerHTML=`
                <div class="scroll-voice-loading-bar">
                  <span>⏳ Előkészítés & Beszéd: <strong>${lc}</strong>...</span>
                </div>
              `,await Kn(Y,"listen",wn),Zt.remove(),Bt.classList.remove("active-dropdown")})}),C.appendChild(Zt)});const Ut=C.querySelector('[data-action="dream"]');Ut==null||Ut.addEventListener("click",An=>{var Xt,As;An.stopPropagation();const xn=C.querySelector(".dream-stage-dropdown");if(xn){xn.remove(),Ut.classList.remove("active-dropdown");return}document.querySelectorAll(".scroll-voice-dropdown, .dream-stage-dropdown").forEach(wn=>wn.remove()),document.querySelectorAll('[data-action="listen"].active-dropdown, [data-action="dream"].active-dropdown').forEach(wn=>wn.classList.remove("active-dropdown")),Ut.classList.add("active-dropdown");const Zt=document.createElement("div");Zt.className="dream-stage-dropdown",Zt.innerHTML=`
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
          `,(Xt=Zt.querySelector('[data-dream-choice="studio_read"]'))==null||Xt.addEventListener("click",wn=>{wn.stopPropagation(),Zt.remove(),Ut.classList.remove("active-dropdown"),Kn(Y,"dream",void 0,"studio_read")}),(As=Zt.querySelector('[data-dream-choice="stage_3d"]'))==null||As.addEventListener("click",wn=>{wn.stopPropagation(),Zt.remove(),Ut.classList.remove("active-dropdown"),Kn(Y,"dream",void 0,"stage_3d")}),C.appendChild(Zt)}),C.addEventListener("click",An=>{const xn=An.target;xn.closest(".card-action-btn")||xn.closest(".scroll-voice-dropdown")||xn.closest(".dream-stage-dropdown")||Kn(Y,"read")})}N.appendChild(C)}),J&&(J.style.display=oe.length>0?"block":"none");const B=document.getElementById("browser-maps-list");B.innerHTML="";const Z=E==="all"||E==="map"?Ct.filter(Y=>Dn(Y,H)):[];Z.forEach(Y=>{var Ke,nn,Bt;const C=document.createElement("div");C.className="bookmark-card",C.style.cursor="pointer";const ce=ll(Y),ve=Y.anchors.length>0||ce.length>0,pe=!!(Y.isUserOwned&&!ve);let Xe="";Y.isUserOwned?Xe=Y.cachedInOpfs||!Y.needsHydration?'<span class="browser-cache-pill opfs-ready">⚡ OPFS Kész</span>':'<span class="browser-cache-pill cloud-fetch">☁️ Felhő → OPFS</span>':Y.status==="demo"&&(Xe='<span class="browser-cache-pill demo-badge">Minta</span>');const Ge=Y.isPendingPapat?'<span class="browser-type-badge" style="color: #f87171;">⚜️ Elbírálásra váró térkép</span>':'<span class="browser-type-badge" style="color: var(--color-crystal-blue);">🧭 Hajszáloptika & Mapbook</span>',Yt=Y.needsHydration&&!ve?`${Y.description||"Saját hajózási térkép"} · Kattints a betöltéshez`:`${Y.description} (${Y.anchors.length} horgony · ${ce.length} útszakasz)`,pn=pe?`
          <div class="bookmark-card-actions" style="margin-top: 6px;">
            <button class="card-action-btn" data-map-action="mapbook">🧭 Megnyitás (Hajszáloptika)</button>
          </div>
        `:`
          <div class="bookmark-card-actions" style="margin-top: 6px;">
            <button class="card-action-btn" data-map-action="mapbook">🗺️⛵ Mapbook (2D Útvonal)</button>
            <button class="card-action-btn" data-map-action="ebook">📖 eBook (Gráf)</button>
            <button class="card-action-btn" data-map-action="audiobook">🎧 Audiobook</button>
          </div>
        `;C.innerHTML=`
        <div class="bookmark-card-title">
          <span>${Y.title}</span>
          <span>${Ge}${Xe}</span>
        </div>
        <div class="browser-item-meta">${Yt}</div>
        ${pn}
      `,(Ke=C.querySelector('[data-map-action="mapbook"]'))==null||Ke.addEventListener("click",Ut=>{Ut.stopPropagation(),si(Y,"map")}),(nn=C.querySelector('[data-map-action="ebook"]'))==null||nn.addEventListener("click",Ut=>{Ut.stopPropagation(),si(Y,"ebook")}),(Bt=C.querySelector('[data-map-action="audiobook"]'))==null||Bt.addEventListener("click",Ut=>{Ut.stopPropagation(),si(Y,"audiobook")}),C.addEventListener("click",Ut=>{Ut.target.closest(".card-action-btn")||si(Y,"map")}),B.appendChild(C)}),ae&&(ae.style.display=Z.length>0?"block":"none");const Ue=oe.length+Z.length;if(Ue===0)$&&($.style.display="flex"),U&&(U.textContent="0 találat az Adattárban");else if($&&($.style.display="none"),U){const Y=[];oe.length>0&&Y.push(`${oe.length} írás (könyv / másolat / tekercs / napló)`),Z.length>0&&Y.push(`${Z.length} térkép`);const C=we?"💎 Saját LETkristály Adattár: ":"Találatok: ";U.textContent=`${C}${Ue} tétel (${Y.join(" · ")})`}}function _r(){k&&(k.addEventListener("input",()=>{qt(k.value,le)}),k.addEventListener("keydown",v=>{v.key==="Escape"&&(v.preventDefault(),Qi())})),X&&X.addEventListener("click",v=>{v.stopPropagation(),k&&(k.value="",k.focus()),qt("",le)}),te&&te.length>0&&te.forEach(v=>{v.addEventListener("click",E=>{E.stopPropagation();const H=v.getAttribute("data-category")||"all";qt(k?k.value:"",H)})}),ge&&ge.addEventListener("click",v=>{v.stopPropagation(),Qi()})}function ln(){const v=i.reflowEngine.getCandidateTokens(260),E=i.guideEngine.getActiveWordIndex(),H=i.reflowEngine.getLeadingSpacerLines(),N=i.reflowEngine.getTrailingSpacerLines(),G=i.reflowEngine.getInlineSpacerWidth(),oe=i.reflowEngine.getAnchoredWordIndex();a.innerHTML="";for(let Z=0;Z<H;Z++){const Ue=document.createElement("div");Ue.className="reflow-spacer-line",a.appendChild(Ue)}const he=e.classList.contains("layout-landscape")?[{lClass:"top-l-0",rClass:"top-r-0"},{lClass:"top-l-1",rClass:"top-r-1"},{lClass:"top-l-2",rClass:"top-r-2"}]:[{lClass:"top-l-0",rClass:"top-r-0"},{lClass:"top-l-1",rClass:"top-r-1"},{lClass:"top-l-2",rClass:"top-r-2"}];for(let Z=H;Z<he.length;Z++){const Ue=he[Z],Y=document.createElement("div");Y.className=`lens-indent-guide ${Ue.lClass}`,a.appendChild(Y);const C=document.createElement("div");C.className=`lens-indent-guide ${Ue.rClass}`,a.appendChild(C)}v.forEach(Z=>{if(Z.index===oe&&G>0){const ce=document.createElement("span");ce.className="reflow-inline-spacer",ce.style.width=G+"px",a.appendChild(ce)}const Ue=document.createElement("span");Ue.className="word-token"+(Z.index===E?" focused":""),h&&Z.index===u&&Ue.classList.add("drag-source"),Ue.dataset.index=Z.index.toString(),Array.from(Z.word).forEach(ce=>{const ve=document.createElement("span");ve.className="char-token",ve.textContent=ce,Ue.appendChild(ve)});const C=Wm(Z.word);if(C){Ue.classList.add("kryst-reader-intonation-badge");const ce=document.createElement("span");ce.className="kryst-reader-intonation-bubble",ce.innerHTML=`
          <strong>${C.emoji} ${C.label}</strong>
          <span class="bubble-row"><em>🎬 Rendezői instrukció:</em> ${C.styleGuide}</span>
          <span class="bubble-row"><em>💡 Tipp:</em> ${C.contextNote}</span>
        `,Ue.appendChild(ce)}Ue.addEventListener("mousedown",ce=>{es(ce,Z.index,Ue)}),Ue.addEventListener("touchstart",ce=>{es(ce,Z.index,Ue)},{passive:!0}),Ue.addEventListener("click",ce=>{ce.stopPropagation(),!(h||f)&&(i.seekAudioToWordIndex(Z.index),ln())}),a.appendChild(Ue)});for(let Z=0;Z<N;Z++){const Ue=document.createElement("div");Ue.className="reflow-spacer-line",a.appendChild(Ue)}Ss(),Vn()}function Ss(){const v=Array.from(a.querySelectorAll(".word-token:not(.invisible-line-filler)"));if(v.length===0)return;const E=n.getBoundingClientRect();if(!E||E.height===0)return;const H=E.bottom-24,N=[];let G=[],oe=-999;if(v.forEach(Z=>{const Ue=Z.offsetTop;Math.abs(Ue-oe)>6?(G.length>0&&N.push(G),G=[Z],oe=Ue):G.push(Z)}),G.length>0&&N.push(G),N.length<=1){i.reflowEngine.setVisibleWordCount(v.length);return}let B=-1;for(let Z=1;Z<N.length;Z++){const Ue=N[Z];let Y=0;for(const C of Ue){const ce=C.getBoundingClientRect().bottom;ce>Y&&(Y=ce)}if(Y>H){B=Z;break}}if(B!==-1)for(let Z=B;Z<N.length;Z++)N[Z].forEach(Ue=>Ue.remove());const he=a.querySelectorAll(".word-token:not(.invisible-line-filler)");i.reflowEngine.setVisibleWordCount(he.length)}function Vn(){const v=a;v.querySelectorAll(".invisible-line-filler").forEach(Ke=>Ke.remove());const E=v.querySelectorAll(".word-token:not(.invisible-line-filler)");if(E.length===0)return;E.forEach(Ke=>{Ke.dataset.lensDy="0",Ke.dataset.lensRot="0",Ke.style.marginLeft="",Ke.style.marginRight="",Ke.querySelectorAll(".char-token").forEach(An=>{An.style.transform=""});const Bt=Ke.classList.contains("focused");Ke.classList.contains("drag-source")?Ke.style.transform="scale(0.92)":Bt?Ke.style.transform="scale(1.15)":Ke.style.transform=""});const H=n.getBoundingClientRect(),N=[];let G=[],oe=-999;if(E.forEach(Ke=>{const nn=Ke.offsetTop;Math.abs(nn-oe)>6?(G.length>0&&N.push(G),G=[Ke],oe=nn):G.push(Ke)}),G.length>0&&N.push(G),N.length===0)return;const B=H.bottom-22,he=N[N.length-1];let Z=0;for(const Ke of he){const nn=Ke.getBoundingClientRect().bottom;nn>Z&&(Z=nn)}const Ue=B-Z,Y=N.length>1?Math.max(20,N[1][0].offsetTop-N[0][0].offsetTop):Math.max(22,(N[0][0].offsetHeight||20)*1.75),C=Ue<Y*1.15,ce=Ue<Y*2.15,ve=N.length;let pe=!1;const Xe=e.classList.contains("layout-landscape"),Ge=Xe?32:48,Yt=Xe?18:28,pn=Xe?8:14;if(C?(ve>=1&&(Wn(N[ve-1],Ge),pe=!0),ve>=2&&(Wn(N[ve-2],Yt),pe=!0),ve>=3&&(Wn(N[ve-3],pn),pe=!0)):ce&&(ve>=1&&(Wn(N[ve-1],Yt),pe=!0),ve>=2&&(Wn(N[ve-2],pn),pe=!0)),pe){let Ke=!1;const nn=Array.from(v.querySelectorAll(".word-token:not(.invisible-line-filler)"));for(let Bt=nn.length-1;Bt>=0;Bt--){const Ut=nn[Bt];if(Ut.getBoundingClientRect().bottom>B)Ut.remove(),Ke=!0;else break}if(Ke){const Bt=v.querySelectorAll(".word-token:not(.invisible-line-filler)");i.reflowEngine.setVisibleWordCount(Bt.length)}}}function Wn(v,E){if(!v||v.length===0||E<=0)return;const H=v[0],N=v[v.length-1];H.style.marginLeft=E+"px",N.style.marginRight=E+"px"}function es(v,E,H){const N=i.getState();if(N.mode!=="read"&&N.mode!=="read_listen"||v instanceof MouseEvent&&v.button!==0)return;const G=v instanceof MouseEvent?v.clientX:v.touches[0].clientX,oe=v instanceof MouseEvent?v.clientY:v.touches[0].clientY;h=!1,f=!1,u=E,d=H,m=G,_=oe,M=null,window.addEventListener("mousemove",xi,{passive:!1}),window.addEventListener("mouseup",Xn),window.addEventListener("touchmove",xi,{passive:!1}),window.addEventListener("touchend",Xn)}function xi(v){if(u===null||!d)return;const E=v instanceof MouseEvent?v.clientX:v.touches[0].clientX,H=v instanceof MouseEvent?v.clientY:v.touches[0].clientY,N=E-m,G=H-_,oe=Math.hypot(N,G);if(!f)if(oe>5)f=!0,h=!0,d.classList.add("drag-source"),c.textContent=d.textContent||"",c.style.display="block";else return;v.cancelable&&v.preventDefault(),c.style.left=E+"px",c.style.top=H+"px"}function Xn(v){if(window.removeEventListener("mousemove",xi),window.removeEventListener("mouseup",Xn),window.removeEventListener("touchmove",xi),window.removeEventListener("touchend",Xn),c&&(c.style.display="none"),d&&d.classList.remove("drag-source"),M&&(M.classList.remove("drop-target"),M=null),f&&h&&u!==null){const E=v instanceof MouseEvent?v.clientX:v.changedTouches&&v.changedTouches.length>0?v.changedTouches[0].clientX:m,H=v instanceof MouseEvent?v.clientY:v.changedTouches&&v.changedTouches.length>0?v.changedTouches[0].clientY:_,N=n.getBoundingClientRect(),G=E-N.left,oe=H-N.top,B=a.querySelector(".word-token"),he=B?Math.max(22,B.offsetHeight):31.5;i.reflowEngine.anchorWord2D(u,G,oe,N.width,N.height,he),i.guideEngine.setActiveWordIndex(u),ln()}setTimeout(()=>{h=!1,f=!1,u=null,d=null,M=null},60)}function ys(){const v=Array.from(a.querySelectorAll(".word-token:not(.invisible-line-filler)"));if(v.length===0)return i.reflowEngine.getLastVisibleWordIndex();const E=n.getBoundingClientRect();let H=null;for(const oe of v){const B=oe.getBoundingClientRect();if(B.top<E.bottom-8&&B.bottom>E.top)H=oe;else if(B.top>=E.bottom-8)break}if(H){const oe=parseInt(H.dataset.index||"-1",10);if(!isNaN(oe)&&oe>=0)return oe}const N=v[v.length-1],G=parseInt(N.dataset.index||"-1",10);return!isNaN(G)&&G>=0?G:i.reflowEngine.getLastVisibleWordIndex()}function Ms(){const v=Array.from(a.querySelectorAll(".word-token:not(.invisible-line-filler)"));if(v.length===0)return i.reflowEngine.getCurrentIndex();const E=n.getBoundingClientRect();for(const H of v)if(H.getBoundingClientRect().bottom>E.top+6){const G=parseInt(H.dataset.index||"-1",10);if(!isNaN(G)&&G>=0)return G}return i.reflowEngine.getCurrentIndex()}function bn(v=""){const E=i.getActiveBook(),H=i.bookmarkEngine.searchBookmarks(v,E?E.id:void 0);if(T.innerHTML="",H.length===0){T.innerHTML='<div style="text-align: center; color: var(--color-text-muted); font-size: 0.85rem; padding: 20px;">Nincs találat a könyvjelzők között.</div>';return}H.forEach(N=>{var B,he,Z,Ue;const G=document.createElement("div");G.className="bookmark-card";const oe=N.isAuto?'<span style="color: #38bdf8; font-size: 0.7rem;">[Auto-Mentés]</span>':"";G.innerHTML=`
        <div class="bookmark-card-title">
          <span>${N.title} ${oe}</span>
          <span style="font-size: 0.7rem; color: #94a3b8;">${new Date(N.updatedAt).toLocaleDateString("hu-HU")}</span>
        </div>
        <div class="bookmark-card-snippet">«${N.quoteSnippet}»</div>
        ${N.note?`<div class="bookmark-card-note">📝 ${N.note}</div>`:""}
        <div class="bookmark-card-actions">
          <button class="card-action-btn" data-action="jump">🚀 Ugrás Ide</button>
          <button class="card-action-btn" data-action="edit">✏️ Módosítás</button>
          <button class="card-action-btn" data-action="copy">📋 Kimásolás</button>
          <button class="card-action-btn" data-action="delete" style="color: #f87171;">🗑️ Törlés</button>
        </div>
      `,(B=G.querySelector('[data-action="jump"]'))==null||B.addEventListener("click",()=>{const Y=Rt.find(C=>C.id===N.bookId)||Rt[0];if(y.style.display="none",Y&&Y.needsHydration){Kn(Y,"read",void 0,void 0,N.chapterIndex,N.wordIndex);return}i.loadBook(Y,N.chapterIndex,N.wordIndex),N.audioTimestamp!==void 0&&i.audioMixer.seek(N.audioTimestamp),i.setMode("read_listen")}),(he=G.querySelector('[data-action="edit"]'))==null||he.addEventListener("click",()=>{const Y=prompt("Könyvjelző új neve:",N.title);if(Y===null)return;const C=prompt("Személyes jegyzet szövege:",N.note);C!==null&&(i.bookmarkEngine.updateBookmark(N.id,{title:Y,note:C}),bn(w.value))}),(Z=G.querySelector('[data-action="copy"]'))==null||Z.addEventListener("click",async()=>{try{const Y=await i.bookmarkEngine.copyBookmarkToClipboard(N.id);alert(`Idézet és jegyzet a vágólapra másolva:

`+Y)}catch{alert("Nem sikerült a vágólapra másolni.")}}),(Ue=G.querySelector('[data-action="delete"]'))==null||Ue.addEventListener("click",()=>{confirm(`Biztosan törölni szeretnéd a(z) "${N.title}" könyvjelzőt?`)&&(i.bookmarkEngine.deleteBookmark(N.id),bn(w.value))}),G.addEventListener("click",Y=>{if(Y.target.closest(".card-action-btn"))return;const C=Rt.find(ce=>ce.id===N.bookId)||Rt[0];if(y.style.display="none",C&&C.needsHydration){Kn(C,"read",void 0,void 0,N.chapterIndex,N.wordIndex);return}i.loadBook(C,N.chapterIndex,N.wordIndex),N.audioTimestamp!==void 0&&i.audioMixer.seek(N.audioTimestamp),i.setMode("read_listen")}),T.appendChild(G)})}function vr(){const v=i.getActiveBook();if(b.innerHTML="",!v){b.innerHTML='<div style="text-align: center; color: var(--color-text-muted); font-size: 0.85rem; padding: 20px;">Nincs betöltött könyv.</div>';return}v.chapters.forEach((E,H)=>{const N=document.createElement("div");N.className="bookmark-card",N.style.cursor="pointer",N.innerHTML=`
        <div class="bookmark-card-title">${E.title}</div>
        <div style="font-size: 0.78rem; color: var(--color-text-muted);">${E.paragraphs.length} bekezdés</div>
      `,N.addEventListener("click",async()=>{const G=i.getState(),oe=G.isPlaying||G.mode==="read_listen"||G.mode==="audio_dream";g.style.display="none",Ce(),oe?await i.playChapterVoice(H,G.selectedSingleVoice,0,B=>{const he=l.querySelector(".display-main-line"),Z=l.querySelector(".display-sub-line");he&&Z&&i.getActiveBook()&&(he.textContent=i.getActiveBook().title.toUpperCase(),Z.textContent=B)}):i.loadChapter(H,!1),ln()}),b.appendChild(N)})}function Es(){D.innerHTML="",Ct.forEach(v=>{var G;const E=document.createElement("div");E.className="bookmark-card",E.style.cursor="pointer";const N=((G=i.getActiveMap())==null?void 0:G.id)===v.id?'<span style="color: var(--color-gold-glow); font-size: 0.7rem;">[Jelenleg betöltve]</span>':"";E.innerHTML=`
        <div class="bookmark-card-title">
          <span>${v.title} ${N}</span>
          <span style="font-size: 0.7rem; color: var(--color-crystal-blue);">${v.anchors.length} horgony</span>
        </div>
        <div style="font-size: 0.78rem; color: var(--color-text-muted);">${v.description}</div>
      `,E.addEventListener("click",()=>{O.style.display="none",si(v,"map")}),D.appendChild(E)})}function bs(v,E,H){let N=v.trim();if(N.length>28&&(N=N.replace(/\s+és\s+/gi," & "),N.length>28)){const oe=N.split(" ");let B="";for(const he of oe){if((B+" "+he).trim().length>25)break;B=(B+" "+he).trim()}N=(B||N.slice(0,25))+"…"}let G=E.trim();if(G=G.replace(/\bFejezet\b/gi,"Fej."),/Fej\.|Tekercs|\b\d+\b/i.test(G)||(G=H+1+". Fej. · "+G),G.length>32){const oe=G.split(" ");let B="";for(const he of oe){if((B+" "+he).trim().length>30)break;B=(B+" "+he).trim()}G=(B||G.slice(0,30))+"…"}return{main:N,sub:G}}function xr(){let v=null;function E(H){l.classList.add("coords-copied");const N=l.getAttribute("data-original-title")||l.title||"Kattints az automatikus másoláshoz, vagy jelöld ki a kívánt részt!";l.setAttribute("data-original-title",N),l.title="✓ Másolva a vágólapra: "+H,v&&clearTimeout(v),v=setTimeout(()=>{l.classList.remove("coords-copied"),l.title=l.getAttribute("data-original-title")||"Kattints az automatikus másoláshoz, vagy jelöld ki a kívánt részt!"},1500)}l.addEventListener("click",async H=>{var B,he,Z,Ue,Y;const N=window.getSelection();let oe=N?N.toString().trim():"";if(!oe){const C=H.target;if(C&&C.classList.contains("display-sub-line")){if(oe=((B=C.textContent)==null?void 0:B.trim())||"",N)try{const ce=document.createRange();ce.selectNodeContents(C),N.removeAllRanges(),N.addRange(ce)}catch{}}else if(C&&C.classList.contains("display-main-line")){if(oe=((he=C.textContent)==null?void 0:he.trim())||"",N)try{const ce=document.createRange();ce.selectNodeContents(C),N.removeAllRanges(),N.addRange(ce)}catch{}}else{const ce=l.querySelector(".display-main-line"),ve=l.querySelector(".display-sub-line"),pe=((Z=ce==null?void 0:ce.textContent)==null?void 0:Z.trim())||"",Xe=((Ue=ve==null?void 0:ve.textContent)==null?void 0:Ue.trim())||"";if(oe=pe&&Xe?`${pe} • ${Xe}`:pe||Xe||((Y=l.textContent)==null?void 0:Y.trim())||"",N)try{const Ge=document.createRange();Ge.selectNodeContents(l),N.removeAllRanges(),N.addRange(Ge)}catch{}}}if(oe)try{navigator.clipboard&&navigator.clipboard.writeText?await navigator.clipboard.writeText(oe):document.execCommand("copy"),E(oe)}catch(C){console.warn("Vágólap másolási hiba:",C)}}),l.addEventListener("copy",()=>{const H=window.getSelection(),N=H?H.toString().trim():"";E(N||"Kijelölt szöveg")})}function Sr(){const v=[.78,.85,.92,1,1.1,1.22,1.36,1.52];let E=3;function H(){const G=v[E];o.style.setProperty("--reader-font-scale",G.toString()),document.documentElement.style.setProperty("--reader-font-scale",G.toString()),localStorage.setItem("kryst_reader_font_scale_idx",E.toString()),ue.classList.toggle("disabled",E===0),ke.classList.toggle("disabled",E===v.length-1);const oe=Math.round(G*100);ue.title=`Betűméret csökkentése (Aᴀ) · Skála: ${oe}%`,ke.title=`Betűméret növelése (ᴀA) · Skála: ${oe}%`}const N=localStorage.getItem("kryst_reader_font_scale_idx");if(N!==null){const G=parseInt(N,10);!isNaN(G)&&G>=0&&G<v.length&&(E=G)}H(),ue.addEventListener("click",G=>{G.stopPropagation(),E>0&&(E--,H(),(i.getState().mode==="read"||i.getState().mode==="read_listen")&&ln())}),ke.addEventListener("click",G=>{G.stopPropagation(),E<v.length-1&&(E++,H(),(i.getState().mode==="read"||i.getState().mode==="read_listen")&&ln())}),$e.addEventListener("click",G=>{G.stopPropagation(),y.style.display="none",g.style.display="none",O.style.display="none",de&&(de.style.display="none"),ie&&ie.style.display!=="none"&&Ci(!0),nt&&(nt=!1,Ft.style.display="none");const oe=i.getState();oe.mode==="map"?(i.mapEngine.resetZoom(),i.setMode("browse")):oe.mode==="read"||oe.mode==="read_listen"?i.handleContentTap():i.setMode("browse"),Ce()})}function yr(){const v=document.getElementById("btn-toggle-orientation"),E=document.getElementById("orientation-icon"),H=document.getElementById("orientation-text");if(!v)return;const N=localStorage.getItem("kryst_reader_orientation");let G=!1;N==="landscape"?G=!0:N==="portrait"?G=!1:G=window.innerWidth>=880&&window.innerWidth>window.innerHeight;const oe=B=>{G=B,e.classList.toggle("layout-landscape",G),e.classList.toggle("layout-portrait",!G),E&&(E.textContent=G?"📱":"🖥️"),H&&(H.textContent=G?"Álló":"Fekvő"),v.setAttribute("title",G?"Váltás Álló (Mobil/Hüvelykujjas) nézetre":"Váltás Fekvő (Asztali/Egér/Panoráma) nézetre"),localStorage.setItem("kryst_reader_orientation",G?"landscape":"portrait");const he=i.getState().mode;(he==="read"||he==="read_listen")&&ln(),pt.resize(),he==="map"&&ye()};oe(G),v.addEventListener("click",B=>{B.stopPropagation(),oe(!G)})}function ii(v){let E=!1,H=0,N=0,G=!1,oe=0,B=0,he=0,Z=null;const Ue=ce=>{if(ce.pointerType!=="mouse"||ce.button!==0)return;const ve=ce.target;ve&&(ve.tagName==="INPUT"||ve.tagName==="TEXTAREA"||ve.isContentEditable)||(Z!==null&&(cancelAnimationFrame(Z),Z=null),E=!0,G=!1,H=ce.clientY,N=v.scrollTop,oe=ce.clientY,B=performance.now(),he=0,window.addEventListener("pointermove",Y),window.addEventListener("pointerup",C),window.addEventListener("pointercancel",C))},Y=ce=>{var pe;if(!E)return;const ve=ce.clientY-H;if(!G&&Math.abs(ve)>5&&(G=!0,(pe=window.getSelection())==null||pe.removeAllRanges(),v.classList.add("is-dragging-scroll")),G){ce.preventDefault(),v.scrollTop=N-ve;const Xe=performance.now(),Ge=Xe-B;Ge>8&&(he=(ce.clientY-oe)/Ge,oe=ce.clientY,B=Xe)}},C=ce=>{if(E)if(E=!1,window.removeEventListener("pointermove",Y),window.removeEventListener("pointerup",C),window.removeEventListener("pointercancel",C),G){const ve=pe=>{pe.stopPropagation(),pe.preventDefault()};if(window.addEventListener("click",ve,{capture:!0,once:!0}),setTimeout(()=>{window.removeEventListener("click",ve,{capture:!0}),v.classList.remove("is-dragging-scroll")},50),Math.abs(he)>.15){let pe=he;const Xe=()=>{Math.abs(pe)>.03&&!E?(v.scrollTop-=pe*14,pe*=.92,Z=requestAnimationFrame(Xe)):Z=null};Z=requestAnimationFrame(Xe)}G=!1}else v.classList.remove("is-dragging-scroll")};v.addEventListener("pointerdown",Ue)}function S(){ii(t),ii(T),ii(b),ii(D),ii(Kt);const v=(E,H)=>{E.addEventListener("wheel",N=>{H.contains(N.target)||(H.scrollTop+=N.deltaY,N.preventDefault())},{passive:!1})};v(y,T),v(g,b),v(O,D),v(Ft,Kt)}function I(v){if(v==="map"){p.innerHTML='<span class="btn-text">Vissza</span>',p.setAttribute("title",nt?"Visszatérés a hajszáloptikás térképre":"Térkép Alaphelyzet (Centrálás és 100% Zoom)"),R.innerHTML='<span class="btn-text">Térképtár</span>',R.setAttribute("title","Kartográfiai Térképtár Gyorslista"),Pe.innerHTML="−",Fe.innerHTML="+",Pe.setAttribute("title","Kicsinyítés (Zoom -) · Tartsd nyomva a folyamatos kicsinyítéshez"),Fe.setAttribute("title","Nagyítás (Zoom +) · Tartsd nyomva a folyamatos nagyításhoz");const E=i.getActiveMap(),H=i.mapEngine.getCurrentCoordinates();l.innerHTML='<span class="display-main-line">'+(E?E.title:"HAJSZÁLOPTIKÁS TÉRKÉP")+'</span><span class="display-sub-line">🧭 '+H+"</span>"}else{p.innerHTML='<span class="btn-text">Könyvjelzők</span>',p.setAttribute("title","Könyvjelzők és Jegyzetek Megnyitása"),R.innerHTML='<span class="btn-text">Fejezetek</span>',R.setAttribute("title","Fejezetválasztó Gyorslista"),Pe.innerHTML="◀",Fe.innerHTML="▶",Pe.setAttribute("title","Hátra Léptetés (Előző szó)"),Fe.setAttribute("title","Előre Léptetés (Következő szó)");const E=i.getActiveBook(),H=i.getState();if(E&&(v==="read"||v==="read_listen"||v==="audio_dream")){const N=E.chapters[H.activeChapterIndex],G=bs(E.title,N?N.title:"Fejezet",H.activeChapterIndex);l.innerHTML='<span class="display-main-line">'+G.main+'</span><span class="display-sub-line">'+G.sub+"</span>"}else l.innerHTML='<span class="display-main-line">THE LET-LIBRARY MACHINE</span><span class="display-sub-line">v3.2 Master Console</span>';At.style.display="none",Ft.style.display="none",nt=!1}if(Ce(),ee){const E=v==="read"||v==="read_listen"||v==="audio_dream";ee.classList.toggle("disabled",!E)}}o.addEventListener("dblclick",v=>{i.getState().mode!=="map"&&(v.target.closest(".card-action-btn")||v.target.closest(".bookmark-modal-overlay")||i.handleContentTap())});let q=null,z=null;function W(v){nt||i.getState().mode!=="map"||(_e(),v==="in"?i.mapEngine.zoomIn(.12):i.mapEngine.zoomOut(.12),ye(),q=setTimeout(()=>{z=setInterval(()=>{v==="in"?i.mapEngine.zoomIn(.045):i.mapEngine.zoomOut(.045),ye()},35)},260))}function _e(){q&&(clearTimeout(q),q=null),z&&(clearInterval(z),z=null),setTimeout(()=>{},40)}Pe.addEventListener("mousedown",v=>{i.getState().mode==="map"&&!nt&&(v.preventDefault(),W("out"))}),Pe.addEventListener("touchstart",v=>{i.getState().mode==="map"&&!nt&&(v.preventDefault(),W("out"))},{passive:!1}),Pe.addEventListener("click",v=>{if(v.stopPropagation(),nt){Kt.scrollBy({top:-120,behavior:"smooth"});return}if(i.getState().mode==="map")return;const E=Ms();i.stepBackward(E)&&ln()}),Fe.addEventListener("mousedown",v=>{i.getState().mode==="map"&&!nt&&(v.preventDefault(),W("in"))}),Fe.addEventListener("touchstart",v=>{i.getState().mode==="map"&&!nt&&(v.preventDefault(),W("in"))},{passive:!1}),Fe.addEventListener("click",v=>{if(v.stopPropagation(),nt){Kt.scrollBy({top:120,behavior:"smooth"});return}if(i.getState().mode==="map")return;const E=ys();i.stepForward(E)&&ln()}),Pe.addEventListener("mouseup",_e),Pe.addEventListener("mouseleave",_e),Pe.addEventListener("touchend",_e),Pe.addEventListener("touchcancel",_e),Fe.addEventListener("mouseup",_e),Fe.addEventListener("mouseleave",_e),Fe.addEventListener("touchend",_e),Fe.addEventListener("touchcancel",_e),window.addEventListener("mouseup",_e),window.addEventListener("touchend",_e),Re.addEventListener("input",()=>{const v=parseInt(Re.value,10)/100;qe.textContent=`${Re.value}%`,i.setBgmVolume(v)}),Ze.addEventListener("input",()=>{const v=parseInt(Ze.value,10)/100;gt.textContent=`${Ze.value}%`,i.setVoiceVolume(v)}),Mt==null||Mt.addEventListener("input",()=>{const v=parseInt(Mt.value,10),E=Math.round((1+v*.01)*10)/10;mt&&(mt.textContent=v===0?"1.0×":`${E.toFixed(1)}×`),i.setPlaybackRate(E),e.style.setProperty("--reader-speed-scale",`${E}`)}),Mt==null||Mt.addEventListener("dblclick",()=>{Mt.value="0",mt&&(mt.textContent="1.0×"),i.setPlaybackRate(1),e.style.setProperty("--reader-speed-scale","1.0")}),ee==null||ee.addEventListener("click",v=>{v.stopPropagation(),!ee.classList.contains("disabled")&&i.togglePlayPause()});function Ce(){if(!$e)return;y.style.display==="flex"||g.style.display==="flex"||O.style.display==="flex"?($e.classList.remove("disabled"),$e.setAttribute("title","Visszatérés a Bázisra (B - Basis)")):i.getState().mode==="browse"?($e.classList.add("disabled"),$e.setAttribute("title","Már a Letkristály Adattárban vagy (Basis)")):($e.classList.remove("disabled"),$e.setAttribute("title","Visszatérés a Letkristály Adattárba (B - Basis)"))}p.addEventListener("click",v=>{if(v.stopPropagation(),i.getState().mode==="map"){nt?Le():Oe();return}if(y.style.display==="flex"){y.style.display="none",Ce();return}g.style.display="none",O.style.display="none",bn(w.value),y.style.display="flex",Ce()}),R.addEventListener("click",v=>{if(v.stopPropagation(),i.getState().mode==="map"){if(O.style.display==="flex"){O.style.display="none",Ce();return}y.style.display="none",g.style.display="none",Es(),O.style.display="flex",Ce();return}if(g.style.display==="flex"){g.style.display="none",Ce();return}y.style.display="none",O.style.display="none",vr(),g.style.display="flex",Ce()}),[y,g,O].forEach(v=>{v.addEventListener("click",E=>E.stopPropagation()),v.addEventListener("dblclick",E=>E.stopPropagation()),v.addEventListener("mousedown",E=>E.stopPropagation()),v.addEventListener("touchstart",E=>E.stopPropagation(),{passive:!0})}),document.addEventListener("click",v=>{const E=v.target;!(E!=null&&E.closest(".scroll-voice-dropdown"))&&!(E!=null&&E.closest(".dream-stage-dropdown"))&&!(E!=null&&E.closest('[data-action="listen"]'))&&!(E!=null&&E.closest('[data-action="dream"]'))&&(document.querySelectorAll(".scroll-voice-dropdown, .dream-stage-dropdown").forEach(H=>H.remove()),document.querySelectorAll('[data-action="listen"].active-dropdown, [data-action="dream"].active-dropdown').forEach(H=>H.classList.remove("active-dropdown")))}),w.addEventListener("input",()=>{bn(w.value)}),L.addEventListener("click",()=>{const v=i.getActiveBook();if(!v){alert("Nincs aktív könyv betöltve.");return}const E=prompt("Könyvjelző elnevezése:");if(!E)return;const H=prompt("Személyes jegyzet a könyvjelzőhöz:")||"",N=i.guideEngine.getActiveWordIndex(),G=i.reflowEngine.getSnippetAt(N,16),oe=v.chapters[i.getState().activeChapterIndex];i.bookmarkEngine.addBookmark({bookId:v.id,chapterIndex:i.getState().activeChapterIndex,chapterTitle:oe?oe.title:"Fejezet",wordIndex:N,charOffset:N*6,quoteSnippet:G,title:E,note:H,audioTimestamp:i.audioMixer.getCurrentTime(),isAuto:!1}),bn(w.value)});function ye(){const v=i.mapEngine.getZoom(),E=i.mapEngine.getPan();st.style.transform=`translate(${E.x}px, ${E.y}px) scale(${v})`}function Le(){nt&&(nt=!1,Ft.style.display="none",Pe.innerHTML="−",Fe.innerHTML="+",p.setAttribute("title","Térkép Alaphelyzet (Centrálás és 100% Zoom)"))}function Oe(){i.mapEngine.resetZoom(),st.style.transition="transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)",ye(),setTimeout(()=>{st.style.transition=""},360)}r.addEventListener("mousedown",v=>{nt||i.mapEngine.startDrag(v.clientX,v.clientY)}),window.addEventListener("mousemove",v=>{nt||(i.mapEngine.dragMove(v.clientX,v.clientY),ye())}),window.addEventListener("mouseup",()=>{i.mapEngine.endDrag()}),i.mapEngine.onTargetChanged((v,E,H,N)=>{const G=i.getActiveMap(),oe=v&&v.coordinates?v.coordinates:E;let B=G?G.title:"HAJSZÁLOPTIKÁS TÉRKÉP";v?B=v.name:H&&(B=`📍 ${H.name}`);const he=N?` | 🏔️ ${N.name} (${N.range})`:"";if(l.innerHTML='<span class="display-main-line">'+B+'</span><span class="display-sub-line">🧭 '+oe+he+"</span>",v)lt=v,xe=null,Gt.textContent=v.name,bt.textContent=v.dangerLevel||"Ismeretlen",en.innerHTML=js(v.treasureNote||"Expedíciós navigációs pont."),v.treasureNote&&v.treasureNote.length>85?wt.style.display="flex":wt.style.display="none",At.style.display="flex";else if(H){lt=null,xe=H,Gt.textContent=H.name;const Z=H.dangerRating===1?"Békés Terület":H.dangerRating===2?"Fokozott Óvatosság":H.dangerRating===3?"Halálos Veszély":"Misztikus Anomália";bt.textContent=`${Z} (${H.dangerRating}/4)`,en.textContent=H.description||"Feltérképezett földrajzi vektorterület.",H.description&&H.description.length>85?wt.style.display="flex":wt.style.display="none",At.style.display="flex"}else N?(lt=null,xe=null,Gt.textContent=`🏔️ ${N.name}`,bt.textContent=`Tengerszint: ${N.range}`,en.textContent=N.tooltip,wt.style.display="none",At.style.display="flex"):(lt=null,xe=null,nt||(At.style.display="none"))}),on.addEventListener("click",v=>{var E;if(v.stopPropagation(),lt){nt=!0,F.textContent=lt.name,tn.textContent=`${lt.dangerLevel} · Szél: ${lt.windDirection||"Változó"} · ${lt.coordinates||""}`;const H=js(lt.treasureNote||"Nincs rögzített expedíciós bejegyzés."),N=(E=lt.narrativeHook)!=null&&E.entryNarrativeText?`<p><strong>Belépési Narratíva:</strong> ${js(lt.narrativeHook.entryNarrativeText)}</p>`:"";Tt.innerHTML=`
        <p><strong>Navigátori Napló:</strong> ${H}</p>
        ${N}
        <p>A hajszáloptikás célkereszt jelenleg pontosan a horgony rögzített koordinátájára fókuszál. A körzetben található mélységvonalak és áramlatok fokozott figyelmet követelnek a vitorlázattól.</p>
      `,Ft.style.display="flex",p.setAttribute("title","Visszatérés a hajszáloptikás térképre")}else if(xe){nt=!0;const H=xe.dangerRating===1?"Békés Terület":xe.dangerRating===2?"Fokozott Óvatosság":xe.dangerRating===3?"Halálos Veszély":"Misztikus Anomália";F.textContent=`📍 ${xe.name}`,tn.textContent=`Veszélyességi szint: ${H} (${xe.dangerRating}/4) · Elhatároló szín: ${xe.colorKey.toUpperCase()}`,Tt.innerHTML=`
        <p><strong>Földrajzi és Környezeti Leírás:</strong></p>
        <p>${xe.description||"Nincs rögzített részletes leírás ehhez a vektorterülethez."}</p>
        <p><em>Ez a terület a 4. (Láthatatlan Vektorozó) rétegen került elhatárolásra a térképészeti kánon szerint.</em></p>
      `,Ft.style.display="flex",p.setAttribute("title","Visszatérés a hajszáloptikás térképre")}}),Ft.addEventListener("dblclick",v=>{v.stopPropagation(),Le()});function je(v){return Math.hypot(v[0].clientX-v[1].clientX,v[0].clientY-v[1].clientY)}window.addEventListener("touchstart",v=>{v.touches.length===2?(Ye=je(v.touches),A=i.mapEngine.getZoom(),x=We,V=!!v.target.closest("#reader-lens-container")):v.touches.length===1&&i.getState().mode==="map"&&!nt&&v.target.closest("#view-map")&&i.mapEngine.startDrag(v.touches[0].clientX,v.touches[0].clientY)},{passive:!1}),window.addEventListener("touchmove",v=>{if(v.touches.length===2&&Ye>0){const H=je(v.touches)/Ye;V&&i.getState().mode==="map"&&!nt?(i.mapEngine.setZoom(A*H),ye()):V||(We=Math.max(.65,Math.min(1.4,x*H)),e.style.transform=`scale(${We})`),v.preventDefault()}else v.touches.length===1&&i.getState().mode==="map"&&!nt&&(i.mapEngine.dragMove(v.touches[0].clientX,v.touches[0].clientY),ye())},{passive:!1}),window.addEventListener("touchend",v=>{v.touches.length<2&&(Ye=0),v.touches.length===0&&i.getState().mode==="map"&&i.mapEngine.endDrag()}),i.onStateChange(v=>{y.style.display="none",g.style.display="none",O.style.display="none",t.style.display=v.mode==="browse"?"flex":"none",n.style.display=v.mode==="read"||v.mode==="read_listen"?"flex":"none",s.style.display=v.mode==="audio_dream"?"block":"none",r.style.display=v.mode==="map"?"block":"none",I(v.mode),ee&&Ae&&(v.isPlaying?(Ae.textContent="⏸",ee.classList.remove("is-paused"),ee.setAttribute("title","Szüneteltetés (Kísérő szinkron és animációk megállítása)")):(Ae.textContent="▶",ee.classList.add("is-paused"),ee.setAttribute("title","Folytatás (Kísérő szinkron és animációk indítása)"))),(v.mode==="read"||v.mode==="read_listen")&&ln(),v.mode==="map"&&i.getActiveMap()?(Ht.src=i.getActiveMap().imageUrl,ye(),i.mapEngine.evaluateTarget(),ut(i.getActiveMap())):$n(),sc(),Nt(v.mode)}),i.guideEngine.onWordFocus(v=>{a.querySelectorAll(".word-token:not(.invisible-line-filler)").forEach(H=>{const N=H;parseInt(N.dataset.index||"-1",10)===v?(N.classList.add("focused"),N.style.transform="scale(1.15)"):(N.classList.remove("focused"),N.style.transform="")})}),i.guideEngine.onPageTurn(()=>{ln()}),window.addEventListener("keydown",v=>{const E=v.target;if(!(E&&(E.tagName==="INPUT"||E.tagName==="TEXTAREA"||E.isContentEditable))&&(v.key==="Backspace"||v.key==="Escape")){if(ie&&ie.style.display==="flex"){v.preventDefault(),Ci(!0);return}if(de&&de.style.display==="flex"){v.preventDefault(),de.style.display="none";return}if(y.style.display==="flex"){v.preventDefault(),y.style.display="none",Ce();return}if(g.style.display==="flex"){v.preventDefault(),g.style.display="none",Ce();return}if(O.style.display==="flex"){v.preventDefault(),O.style.display="none",Ce();return}i.getState().mode==="map"&&(v.preventDefault(),nt?Le():Oe())}}),window.addEventListener("resize",()=>{(i.getState().mode==="read"||i.getState().mode==="read_listen")&&ln()});const rt=document.getElementById("map-route-svg-overlay"),De=document.getElementById("mapbook-route-hud"),et=document.getElementById("mapbook-stage-select"),xt=document.getElementById("btn-mapbook-play-route"),St=document.getElementById("btn-mapbook-prev-stage"),_t=document.getElementById("btn-mapbook-next-stage"),Pt=document.getElementById("mapbook-route-status"),Ne=document.getElementById("mapbook-cut-effect-overlay");let yt=[],it=0,cn=null,Dt=!1;function $n(){cn!==null&&(cancelAnimationFrame(cn),cn=null),Dt=!1,xt&&(xt.textContent="▶ 2D Utazás")}function hn(v){if(!rt)return;const E=i.getActiveMap();if(!E){rt.innerHTML="";return}let H="";if(yt.forEach((N,G)=>{const oe=G===it,B=N.fromAnchor.xPercent,he=N.fromAnchor.yPercent,Z=N.toAnchor.xPercent,Ue=N.toAnchor.yPercent,Y=(B+Z)/2,C=(he+Ue)/2-3.5;H+=`<path d="M ${B} ${he} Q ${Y} ${C} ${Z} ${Ue}" fill="none" stroke="${oe?"#fbbf24":"rgba(56, 189, 248, 0.55)"}" stroke-width="${oe?"0.65":"0.38"}" stroke-dasharray="${oe?"1.2 0.6":"0.8 0.8"}" />`}),E.anchors.forEach(N=>{H+=`<circle cx="${N.xPercent}" cy="${N.yPercent}" r="0.85" fill="#0f172a" stroke="#f59e0b" stroke-width="0.28" />`}),v){const N=1.2+v.progress%.25*5;H+=`<circle cx="${v.x}" cy="${v.y}" r="${N.toFixed(2)}" fill="none" stroke="rgba(251, 191, 36, 0.65)" stroke-width="0.22" />`,H+=`<text x="${v.x}" y="${v.y}" text-anchor="middle" dominant-baseline="central" font-size="3.6">${v.emoji}</text>`}else if(yt[it]){const N=yt[it];H+=`<text x="${N.fromAnchor.xPercent}" y="${N.fromAnchor.yPercent}" text-anchor="middle" dominant-baseline="central" font-size="3.1">${N.vehicleEmoji}</text>`}rt.innerHTML=H}function Tn(v){if($n(),v<0||v>=yt.length)return;it=v,et&&(et.value=String(v));const E=yt[v];Dt=!0,xt&&(xt.textContent="⏹ Állj"),Pt&&(Pt.textContent=`${E.vehicleEmoji} ${E.fromAnchor.name} → ${E.toAnchor.name} (${E.bgMusicCue})`),cl(E.sfxCue),Ne&&(Ne.textContent=`✦ ${E.vehicleEmoji} ${E.fromAnchor.name} ➔ ${E.toAnchor.name} ✦`,Ne.classList.add("active"),setTimeout(()=>{Ne.classList.remove("active")},480)),Gt.textContent=`${E.vehicleEmoji} ${E.stageNumber}. Útszakasz: ${E.fromAnchor.name} → ${E.toAnchor.name}`,bt.textContent=`${E.vehicleLabel} · 🎵 ${E.bgMusicCue}`,en.innerHTML=js(E.narrationText),At.style.display="flex";const H=E.narrationText.replace(/[😤🤫😂⚡🌊🤔😨👑😢🔥🎶⚓]/gu,"").trim();H&&ea(H,"ferenc",()=>{},()=>{});const N=Math.max(2e3,E.durationSec*1e3),G=performance.now(),oe=E.fromAnchor.xPercent,B=E.fromAnchor.yPercent,he=E.toAnchor.xPercent,Z=E.toAnchor.yPercent,Ue=(oe+he)/2,Y=(B+Z)/2-3.5,C=ce=>{if(!Dt)return;const ve=Math.min(1,(ce-G)/N),pe=1-ve,Xe=pe*pe*oe+2*pe*ve*Ue+ve*ve*he,Ge=pe*pe*B+2*pe*ve*Y+ve*ve*Z;hn({x:Xe,y:Ge,emoji:E.vehicleEmoji,progress:ve}),ve<1?cn=requestAnimationFrame(C):(Dt=!1,cn=null,cl("ship_bell_toll"),xt&&(xt.textContent="▶ 2D Utazás"),Pt&&(Pt.textContent=`⚓ Megérkezés: ${E.toAnchor.name}`))};cn=requestAnimationFrame(C)}function ut(v){if($n(),yt=ll(v),it=0,!(!De||!et)){if(yt.length===0){De.style.display="none",hn();return}De.style.display="flex",et.innerHTML=yt.map((E,H)=>`<option value="${H}">${E.stageNumber}. ${E.vehicleEmoji} ${E.fromAnchor.name} → ${E.toAnchor.name}</option>`).join(""),Pt&&(Pt.textContent=`${yt.length} gráfpont-útszakasz`),hn()}}et==null||et.addEventListener("change",v=>{v.stopPropagation(),it=parseInt(et.value||"0",10)||0,hn()}),xt==null||xt.addEventListener("click",v=>{v.stopPropagation(),Dt?$n():Tn(it)}),St==null||St.addEventListener("click",v=>{if(v.stopPropagation(),yt.length===0)return;const E=(it-1+yt.length)%yt.length;Tn(E)}),_t==null||_t.addEventListener("click",v=>{if(v.stopPropagation(),yt.length===0)return;const E=(it+1)%yt.length;Tn(E)}),[De].forEach(v=>{v==null||v.addEventListener("mousedown",E=>E.stopPropagation()),v==null||v.addEventListener("touchstart",E=>E.stopPropagation(),{passive:!0}),v==null||v.addEventListener("click",E=>E.stopPropagation())});async function kt(v=!1){try{const{maps:E,books:H,abrigoOverride:N}=await $m();if(N){const G=Ct.findIndex(oe=>oe.id==="canon_map_abrigo_master"||oe.id===N.id);G>=0?Ct[G]=N:Ct.unshift(N)}E.forEach(G=>{const oe=Ct.findIndex(B=>B.id===G.id);oe>=0?Ct[oe]=G:Ct.unshift(G)}),H.forEach(G=>{const oe=Rt.findIndex(B=>B.id===G.id);oe>=0?Rt[oe]=G:Rt.unshift(G)}),qt(),v&&U&&(U.textContent=`💿 OPFS Monk Virtuális Lemez szinkronizálva (${Rt.length} könyv · ${Ct.length} térkép)`)}catch(E){console.warn("OPFS Monk Lemez szinkron figyelmeztetés:",E)}}function fn(){const v=document.getElementById("ecosystem-file-input"),E=document.getElementById("btn-import-ecosystem-file"),H=document.getElementById("btn-sync-monk-disk");if(E==null||E.addEventListener("click",N=>{N.stopPropagation(),v==null||v.click()}),v==null||v.addEventListener("change",async N=>{var oe;const G=(oe=N.target.files)==null?void 0:oe[0];if(G){try{const B=await Xm(G);if(B.map){const he=Ct.findIndex(Z=>Z.id===B.map.id);he>=0?Ct[he]=B.map:Ct.unshift(B.map)}if(B.book){const he=Rt.findIndex(Z=>Z.id===B.book.id);he>=0?Rt[he]=B.book:Rt.unshift(B.book)}qt(),B.map?i.loadMap(B.map):B.book&&(i.loadBook(B.book,0,0),i.setMode("read"))}catch(B){alert((B==null?void 0:B.message)||"Hiba a fájl beolvasásakor.")}v.value=""}}),H==null||H.addEventListener("click",N=>{N.stopPropagation(),kt(!0)}),typeof BroadcastChannel<"u")try{const N=new BroadcastChannel("kryst_ecosystem_bridge");N.onmessage=()=>{kt(!0)}}catch{}kt(!1)}function ft(v){if(window.parent&&window.parent!==window)try{window.parent.postMessage(v,"*")}catch{}if(window.opener&&!window.opener.closed)try{window.opener.postMessage(v,"*")}catch{}}function Nt(v){if(v==="map"){const E=i.getActiveMap();ft({type:"KRYST_ACTIVE_LIBRARY_ITEM_CHANGED",mode:v,descriptor:E?{itemType:"map",libraryKey:E.libraryKey||E.id,id:E.id,title:E.title,fileId:E.fileId,isUserOwned:!!E.isUserOwned,isPendingPapat:!!E.isPendingPapat}:null});return}if(v==="read"||v==="read_listen"||v==="audio_dream"){const E=i.getActiveBook();ft({type:"KRYST_ACTIVE_LIBRARY_ITEM_CHANGED",mode:v,descriptor:E?{itemType:E.sourceKind||E.type||"book",libraryKey:E.libraryKey||E.id,id:E.id,title:E.title,author:E.author,copyCode:E.copyCode,scrollToken:E.scrollToken,logId:E.logId,downloadLink:E.downloadLink,workId:E.workId,isUserOwned:!!E.isUserOwned}:null});return}ft({type:"KRYST_ACTIVE_LIBRARY_ITEM_CHANGED",mode:v,descriptor:null})}function vn(v,E,H){let N=String(v||"");const G=[],oe=new Set,B=Y=>{if(!H||!Y)return null;if(H[Y])return H[Y];const C=Y.split("/").pop()||Y;if(H[C])return H[C];const ce=C.replace(/\.[^/.]+$/,"")+".png";return H[ce]?H[ce]:null};if(H&&Object.keys(H).length>0&&N)for(const[Y,C]of Object.entries(H))C&&(N=N.split(`Images/${Y}`).join(C),N=N.split(`"${Y}"`).join(`"${C}"`));let he=[];if(N.trim()){const C=new DOMParser().parseFromString(N,"text/html");C.body&&(C.body.querySelectorAll("img").forEach(ve=>{let pe=String(ve.getAttribute("src")||"").trim();const Xe=B(pe);Xe&&(pe=Xe),pe&&(pe.indexOf("data:image/")!==0&&pe.indexOf("http://")!==0&&pe.indexOf("https://")!==0||oe.has(pe)||(oe.add(pe),G.push({src:pe,alt:String(ve.getAttribute("alt")||"Illusztráció").trim()||"Illusztráció"})))}),he=Array.from(C.body.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, blockquote")).map(ve=>(ve.textContent||"").replace(/\s+/g," ").trim()).filter(ve=>ve.length>0),he.length===0&&(he=(C.body.textContent||E||"").trim().split(/\n+/).map(pe=>pe.replace(/\s+/g," ").trim()).filter(pe=>pe.length>0)))}else E&&(he=String(E).split(/\n+/).map(Y=>Y.replace(/\s+/g," ").trim()).filter(Y=>Y.length>0));he.length===0&&(he=G.length>0?["(Illusztrált fejezet — nyisd meg a jobb alsó 🖼️ gombot a képekhez.)"]:["(Üres fejezet)"]);const Z=[];let Ue=0;for(const Y of he){const C=Y.match(/[^.!?…]+[.!?…]*|[^.!?…]+/g)||[Y];for(const ce of C){const ve=ce.trim();ve&&(Z.push({text:ve,startSec:Ue*4,endSec:(Ue+1)*4,speakerId:"narrator"}),Ue++)}}return Z.length===0&&Z.push({text:he[0],startSec:0,endSec:4,speakerId:"narrator"}),{paragraphs:he,tokens:Z,images:G}}function ts(v){var N;if(!se||!Ee||P.length===0)return;const E=Math.max(0,Math.min(v,P.length-1)),H=P[E];if(se.src=H.src,se.alt=H.alt||"Illusztráció",Te){const G=((N=i.getActiveBook())==null?void 0:N.title)||"Kötet";Te.textContent=`🖼️ ${G} (${E+1}/${P.length})${H.alt?" · "+H.alt:""}`}Ee.innerHTML="",P.forEach((G,oe)=>{const B=document.createElement("button");B.type="button",B.className="chapter-media-thumb-btn"+(oe===E?" active":""),B.title=G.alt||`Kép #${oe+1}`,B.innerHTML=`<img src="${G.src}" alt="${(G.alt||"").replace(/"/g,"&quot;")}">`,B.addEventListener("click",he=>{he.stopPropagation(),ts(oe)}),Ee.appendChild(B)})}function sc(){const v=i.getState(),E=i.getActiveBook(),H=[],N=new Set;if(E&&(v.mode==="read"||v.mode==="read_listen")){E.coverUrl&&(N.add(E.coverUrl),H.push({src:E.coverUrl,alt:"Borító"}));const G=E.chapters[v.activeChapterIndex];G&&Array.isArray(G.images)&&G.images.forEach(oe=>{oe&&oe.src&&!N.has(oe.src)&&(N.add(oe.src),H.push(oe))})}P=H,fe&&re&&(H.length>0&&(v.mode==="read"||v.mode==="read_listen")?(re.textContent=String(H.length),fe.style.display="inline-flex"):(fe.style.display="none",de&&(de.style.display="none")))}function rc(){fe==null||fe.addEventListener("click",v=>{v.stopPropagation(),!(P.length===0||!de)&&(ts(0),de.style.display="flex")}),ne==null||ne.addEventListener("click",v=>{v.stopPropagation(),de&&(de.style.display="none")}),de==null||de.addEventListener("contextmenu",v=>(v.preventDefault(),!1)),de==null||de.addEventListener("click",v=>v.stopPropagation()),de==null||de.addEventListener("dblclick",v=>v.stopPropagation())}function Si(v,E,H,N){ie&&(be&&(be.textContent=v),Se&&(Se.textContent=E),j&&(j.textContent=N?"⚠️":"💎",j.style.animation=N?"none":"krystPulseGlow 1.3s ease-in-out infinite"),Me&&(Me.style.display="inline-flex"),ie.style.display="flex")}function Ci(v=!1){Ve&&(clearTimeout(Ve),Ve=null),ie&&(ie.style.display="none"),v&&(Je=null,me=null,ze=null)}function ac(v){try{const E=String(v||"").replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/,"").trim();if(!E||E.length<32)return null;const H=atob(E),N=new Uint8Array(H.length);for(let G=0;G<H.length;G++)N[G]=H.charCodeAt(G);return N.buffer}catch{return null}}async function Kn(v,E,H,N,G=0,oe=0){if(v.inPlay)return;if(!v.needsHydration&&v.chapters&&v.chapters.length>0){E==="listen"?await i.playBookWithVoice(v,H||"ferenc",oe,Z=>{const Ue=l.querySelector(".display-main-line"),Y=l.querySelector(".display-sub-line");Ue&&Y&&(Ue.textContent=v.title.toUpperCase(),Y.textContent=Z)}):E==="dream"?(i.loadBook(v,G,oe),i.setMode(N==="stage_3d"?"audio_dream":"read_listen"),i.togglePlayPause()):(i.loadBook(v,G,oe),i.setMode("read")),Nt(i.getState().mode);return}const B=String(v.libraryKey||v.id),he={itemType:v.sourceKind||v.type||"book",libraryKey:B,id:v.id,title:v.title,author:v.author,copyCode:v.copyCode,scrollToken:v.scrollToken,logId:v.logId,downloadLink:v.downloadLink,workId:v.workId};Ve&&(clearTimeout(Ve),Ve=null),Je=B,me=he,ze={openMode:E,voiceId:H,dreamChoice:N,chapterIndex:G,wordIndex:oe},Si("LETkristály kiolvasása...",`«${v.title}» betöltése az OPFS gyorsítótárból / P2P & Drive tárhelyről...`,!0,!1),Ve=setTimeout(()=>{Je===B&&Si("⏳ Lassú kapcsolat / P2P letöltés",`«${v.title}» tartalma még nem érkezett meg. Megnyithatod közvetlenül a B-verzióban (klasszikus olvasóban), vagy várhatsz tovább.`,!0,!0)},18e3),ft({type:"KRYST_REQUEST_LIBRARY_ITEM_CONTENT",requestKey:B,descriptor:he})}async function si(v,E="map"){if(!v.needsHydration&&v.imageUrl){if(E==="ebook"){const G=ur(v);i.loadBook(G,0,0),i.setMode("read")}else if(E==="audiobook"){const G=ur(v);await i.playBookWithVoice(G,"ferenc",0)}else i.loadMap(v);Nt(i.getState().mode);return}const H=String(v.libraryKey||v.id),N={itemType:"map",libraryKey:H,id:v.id,title:v.title,fileId:v.fileId,rowIndex:v.rowIndex,isPendingPapat:!!v.isPendingPapat};Ve&&(clearTimeout(Ve),Ve=null),Je=H,me=N,ze={openMode:E==="ebook"?"read":E==="audiobook"?"listen":"map",voiceId:E==="audiobook"?"ferenc":void 0},Si("Térkép betöltése a Fényasztalra...",`«${v.title}» betöltése az OPFS gyorsítótárból / Drive-ról...`,!0,!1),Ve=setTimeout(()=>{Je===H&&Si("⏳ Lassú térkép-betöltés",`«${v.title}» még nem érkezett meg. Megnyithatod a B-verzióban (klasszikus képnézőben), vagy várhatsz tovább.`,!0,!0)},18e3),ft({type:"KRYST_REQUEST_LIBRARY_ITEM_CONTENT",requestKey:H,descriptor:N})}function Ts(v,E,H){const G=(Array.isArray(E==null?void 0:E.chapters)&&E.chapters.length>0?E.chapters:E!=null&&E.bodyHtml?[{id:"ch_001",order:1,title:(E==null?void 0:E.title)||"1. Fejezet",html:E.bodyHtml}]:[]).map((oe,B)=>{const he=String(oe.title||`${B+1}. Fejezet`),Z=vn(String(oe.html||oe.content||""),oe.plainText?String(oe.plainText):void 0,E==null?void 0:E.embeddedImages);return{id:String(oe.id||`ch_${B+1}`),index:B,title:he,paragraphs:Z.paragraphs,tokens:Z.tokens,images:Z.images.length>0?Z.images:void 0}});if(G.length===0){const oe="A kézirat tartalma az OPFS Monk Lemezről töltődik...";G.push({id:"ch_001",index:0,title:String((E==null?void 0:E.title)||"Kézirat"),paragraphs:[oe],tokens:[{text:oe,startSec:0,endSec:4,speakerId:"narrator"}]})}return{id:String((E==null?void 0:E.basicCode)||v),libraryKey:`monastery:${v}`,sourceKind:"monastery",workId:String(v),title:`${H?"🗑️ ":""}${String((E==null?void 0:E.title)||v)}`,author:String((E==null?void 0:E.authorName)||(E==null?void 0:E.author)||"Kalóz Szerző"),type:H?"scroll":(E==null?void 0:E.status)==="PUBLISHED_PRIORI"||E!=null&&E.basicCode?"crystal_book":"scroll",coverUrl:E!=null&&E.coverDataUrl?String(E.coverDataUrl):void 0,chapters:G,hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc"}}function Mr(v){if(!v||typeof v!="object")return;const E=new Map;Rt.forEach(C=>{C.id&&E.set(C.id,C),C.libraryKey&&E.set(C.libraryKey,C)});const H=new Map;Ct.forEach(C=>{C.id&&H.set(C.id,C),C.libraryKey&&H.set(C.libraryKey,C),C.fileId&&H.set(`map:${C.fileId}`,C)});const N=[],G=new Set,oe=C=>{const ce=C.libraryKey&&E.get(C.libraryKey)||E.get(C.id);return ce&&!ce.needsHydration&&ce.chapters&&ce.chapters.length>0&&C.needsHydration?{...C,coverUrl:ce.coverUrl||C.coverUrl,chapters:ce.chapters,cachedInOpfs:!0,needsHydration:!1}:C};Array.isArray(v.pendingMonasteryWorks)&&v.pendingMonasteryWorks.forEach(C=>{var Yt,pn;if(!C||!C.workId)return;const ce=String(C.workId),ve=`monastery:${ce}`;if(G.has(ve))return;G.add(ve);const pe=Array.isArray((Yt=C.krystVault)==null?void 0:Yt.previewChapters)?C.krystVault.previewChapters:[],Ge=pe.length>0?Ts(ce,{title:C.title,authorName:C.author||C.authorEmail,status:C.status,coverDataUrl:(pn=C.krystVault)==null?void 0:pn.coverDataUrl,chapters:pe},!!C.isAntipat):{id:ce,libraryKey:ve,sourceKind:"monastery",workId:ce,title:`${C.isAntipat?"🗑️ ":""}${String(C.title||ce)}`,author:String(C.author||C.authorEmail||"Kalóz Szerző"),type:C.isAntipat?"scroll":"crystal_book",chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",needsHydration:!0};Ge.libraryKey=ve,Ge.sourceKind="monastery",Ge.isUserOwned=!0,Ge.statusLabel=String(C.status||""),Ge.cachedInOpfs=!Ge.needsHydration||!!C.cachedInOpfs,N.push(oe(Ge))}),Array.isArray(v.books)&&v.books.forEach(C=>{var Ge,Yt;if(!C)return;const ce=String(C.downloadLink||C.krystWorkId||C.title||""),ve=String(C.krystWorkId||C.downloadLink||""),pe=`book:${ce}`;if(G.has(pe))return;G.add(pe);const Xe={id:ve||ce,libraryKey:pe,sourceKind:"book",isUserOwned:!0,downloadLink:String(C.downloadLink||""),workId:ve,title:String(C.title||"Névtelen Könyv"),author:String(C.author||"Ismeretlen"),type:"crystal_book",coverUrl:(Ge=C.krystVault)!=null&&Ge.coverDataUrl?String(C.krystVault.coverDataUrl):void 0,chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!!C.cachedInOpfs,needsHydration:!0};if(Array.isArray((Yt=C.krystVault)==null?void 0:Yt.previewChapters)&&C.krystVault.previewChapters.length>0){const pn=Ts(Xe.id,{workId:Xe.id,basicCode:C.downloadLink,title:C.title,authorName:C.author,status:"PUBLISHED_PRIORI",coverDataUrl:C.krystVault.coverDataUrl,chapters:C.krystVault.previewChapters},!1);Xe.chapters=pn.chapters,Xe.needsHydration=!1,Xe.cachedInOpfs=!0}N.push(oe(Xe))}),Array.isArray(v.copies)&&v.copies.forEach(C=>{var Xe,Ge;if(!C)return;const ce=String(C.code||""),ve=`copy:${ce||C.title}`;if(G.has(ve))return;G.add(ve);const pe={id:`copy_${ce||C.title}`,libraryKey:ve,sourceKind:"copy",isUserOwned:!0,inPlay:!!C.inPlay,copyCode:ce,workId:String(C.krystWorkId||(ce.length>=6?ce.substring(0,6):"")),title:String(C.title||"Névtelen Másolat"),author:String(C.author||"Ismeretlen"),type:"copy",coverUrl:(Xe=C.krystVault)!=null&&Xe.coverDataUrl?String(C.krystVault.coverDataUrl):void 0,chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!!C.cachedInOpfs,needsHydration:!0};if(Array.isArray((Ge=C.krystVault)==null?void 0:Ge.previewChapters)&&C.krystVault.previewChapters.length>0){const Yt=Ts(pe.id,{workId:pe.id,title:C.title,authorName:C.author,status:"PUBLISHED_PRIORI",coverDataUrl:C.krystVault.coverDataUrl,chapters:C.krystVault.previewChapters},!1);pe.chapters=Yt.chapters,pe.type="copy",pe.needsHydration=!1,pe.cachedInOpfs=!0}N.push(oe(pe))}),Array.isArray(v.scrolls)&&v.scrolls.forEach(C=>{if(!C)return;const ce=String(C.token||`${C.title}_${C.fejezet}`),ve=`scroll:${ce}`;if(G.has(ve))return;G.add(ve);const pe={id:`scroll_${ce}`,libraryKey:ve,sourceKind:"scroll",isUserOwned:!0,scrollToken:String(C.token||""),copyCode:String(C.copyCode||""),workId:String(C.krystWorkId||""),chapterLabel:String(C.fejezet||""),title:`${String(C.title||"Tekercs")} — ${String(C.fejezet||"")}`,author:String(C.author||"Tekercsmester"),type:"scroll",chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!!C.cachedInOpfs,needsHydration:!0};N.push(oe(pe))}),Array.isArray(v.logs)&&v.logs.forEach(C=>{if(!C||!C.id)return;const ce=String(C.id),ve=`log:${ce}`;if(G.has(ve))return;G.add(ve);const pe={id:`log_${ce}`,libraryKey:ve,sourceKind:"log",isUserOwned:!0,logId:ce,chapterLabel:`Napló ID: ${ce}`,title:String(C.name||`Hajónapló (${ce})`),author:"Hajónapló Archívum",type:"scroll",chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!!C.cachedInOpfs,needsHydration:!0};N.push(oe(pe))});const B=[],he=new Set;[...Array.isArray(v.maps)?v.maps.map(C=>({...C,_pendingPapat:!1})):[],...Array.isArray(v.pendingMaps)?v.pendingMaps.map(C=>({...C,_pendingPapat:!0})):[]].forEach(C=>{if(!C||!C.fileId&&!C.identifier)return;const ce=String(C.fileId||C.identifier),ve=`map:${ce}`;if(he.has(ve))return;he.add(ve);const pe=H.get(ve)||H.get(`map_${ce}`);if(pe&&!pe.needsHydration&&pe.imageUrl){B.push({...pe,libraryKey:ve,isUserOwned:!0,cachedInOpfs:!0,needsHydration:!1,isPendingPapat:!!C._pendingPapat});return}const Xe=String(C.identifier||ce),Ge=C.date?new Date(C.date).toLocaleDateString("hu-HU"):"";B.push({id:`map_${ce}`,libraryKey:ve,fileId:String(C.fileId||""),isUserOwned:!0,cachedInOpfs:!!C.cachedInOpfs,needsHydration:!C.cachedImageUrl,uploadedAt:Ge,status:String(C.status||(C._pendingPapat?"elbírálás alatt":"feltöltve")),rowIndex:typeof C.rowIndex=="number"?C.rowIndex:void 0,isPendingPapat:!!C._pendingPapat,title:C._pendingPapat?`⚜️ ${Xe}`:Xe,imageUrl:C.cachedImageUrl?String(C.cachedImageUrl):"",description:C._pendingPapat?`Feltöltő: ${C.email||"Kalóz"} (Papát elbírálásra vár)`:Ge?`Saját hajózási térkép · Feltöltve: ${Ge}`:"Saját hajózási térkép",anchors:Array.isArray(C.anchors)?C.anchors:[]})});const Ue=Rt.filter(C=>!C.isUserOwned&&!(C.libraryKey&&G.has(C.libraryKey)));Rt.splice(0,Rt.length,...N,...Ue);const Y=Ct.filter(C=>!C.isUserOwned&&!(C.libraryKey&&he.has(C.libraryKey)));Ct.splice(0,Ct.length,...B,...Y),we=!0,qt()}function oc(){let v="";const E=new URLSearchParams(window.location.search),H=E.get("workId")||"",N=E.get("trash")==="1";rc(),Be==null||Be.addEventListener("click",B=>{B.stopPropagation(),Ci(!0)}),Me==null||Me.addEventListener("click",B=>{B.stopPropagation(),me&&ft({type:"KRYST_FALLBACK_TO_LEGACY_READER",descriptor:me,reason:"user_fallback"}),Ci(!0)});const G=B=>{var pe;const he=String((B==null?void 0:B.workId)||((pe=B==null?void 0:B.bookPackage)==null?void 0:pe.workId)||H||"").trim();if(!he)return;const Z=(B==null?void 0:B.bookPackage)||null;if(!Z)return;const Ue=Array.isArray(Z.chapters)?Z.chapters:[],Y=Ue.reduce((Xe,Ge)=>Xe+String(Ge.html||Ge.content||Ge.plainText||"").length,0),C=`${he}::${Z.updatedAt||""}::${Ue.length}::${String(Z.bodyHtml||"").length}::${Y}`;if(C===v)return;v=C;const ce=Ts(he,Z,N);ce.isUserOwned=!0,ce.cachedInOpfs=!0,ce.needsHydration=!1;const ve=Rt.findIndex(Xe=>Xe.id===ce.id||ce.libraryKey&&Xe.libraryKey===ce.libraryKey);ve>=0?Rt[ve]=ce:Rt.unshift(ce),qt(),i.loadBook(ce,0,0),i.setMode("read"),U&&(U.textContent=`📖 OPFS Kézirat megnyitva: ${ce.title} (${ce.chapters.length} fejezet)`)},oe=async B=>{const he=String((B==null?void 0:B.requestKey)||(B==null?void 0:B.libraryKey)||"");if(Ve&&(clearTimeout(Ve),Ve=null),!(B!=null&&B.success)||B!=null&&B.error){const pe=String((B==null?void 0:B.error)||"A LETkristály tartalma jelenleg nem érhető el (pl. P2P letöltés vagy hálózati hiba).");B!=null&&B.descriptor&&(me=B.descriptor),Si("Hiba a LETkristály betöltésekor",`${pe} Megpróbálhatod megnyitni a B-verzióban (klasszikus olvasóban).`,!0,!0);return}const Z=Je===he&&ze?ze:{openMode:B.itemKind==="map"?"map":"read"};if(B.itemKind==="map"){const pe=String(B.imageUrl||B.dataUrl||"").trim();if(!pe){Si("Üres térkép adat","A térképadat nem tartalmazott megjeleníthető képet.",!0,!0);return}const Xe=pe.indexOf("data:image")===0||pe.indexOf("http")===0?pe:`data:image/png;base64,${pe}`;let Ge=Ct.find(Ke=>he&&Ke.libraryKey===he||B.id&&Ke.id===B.id||B.fileId&&Ke.fileId===B.fileId);Ge?Ge.imageUrl=Xe:(Ge={id:String(B.id||`map_${B.fileId||Date.now()}`),libraryKey:he||`map:${B.fileId||Date.now()}`,fileId:B.fileId?String(B.fileId):void 0,isUserOwned:!0,title:String(B.title||"Hajózási Térkép"),imageUrl:Xe,description:String(B.description||"Felhasználói térkép a LETkristály Adattárból"),anchors:[]},Ct.unshift(Ge));const Yt=ac(Xe);if(Yt){const Ke=nc(Yt,Xe);Ke&&(Array.isArray(Ke.anchors)&&Ke.anchors.length>0&&(Ge.anchors=Ke.anchors),Ke.baseMapGeometry&&(Ge.baseMapGeometry=Ke.baseMapGeometry),Ke.elevationLayer&&(Ge.elevationLayer=Ke.elevationLayer),Ke.vectorZoneLayer&&(Ge.vectorZoneLayer=Ke.vectorZoneLayer),Ke.narrativeLayer&&(Ge.narrativeLayer=Ke.narrativeLayer),Ke.expeditionState&&(Ge.expeditionState=Ke.expeditionState),Ke.hierarchy&&(Ge.hierarchy=Ke.hierarchy),Ke.canonicalWorldGate&&(Ge.canonicalWorldGate=Ke.canonicalWorldGate),Ke.description&&(Ge.description=Ke.description))}Ge.cachedInOpfs=!0,Ge.needsHydration=!1,qt(),Ci(!0);const pn=Z.openMode==="read"?"ebook":Z.openMode==="listen"?"audiobook":"map";await si(Ge,pn);return}const Ue=B.embeddedImages&&typeof B.embeddedImages=="object"?B.embeddedImages:void 0;let Y;if(B.coverDataUrl){const pe=String(B.coverDataUrl).trim();Y=pe.indexOf("data:")===0||pe.indexOf("http")===0?pe:`data:image/png;base64,${pe}`}const ce=(Array.isArray(B.chapters)&&B.chapters.length>0?B.chapters:B.htmlContent?[{id:"ch_001",title:B.chapterLabel||B.title||"1. Fejezet",html:String(B.htmlContent)}]:[]).map((pe,Xe)=>{const Ge=vn(String(pe.html||pe.content||""),pe.plainText?String(pe.plainText):void 0,Ue);return{id:String(pe.id||`ch_${Xe+1}`),index:Xe,title:String(pe.title||`${Xe+1}. Fejezet`),paragraphs:Ge.paragraphs,tokens:Ge.tokens,images:Ge.images.length>0?Ge.images:void 0}});if(ce.length===0){Si("Üres tartalom","A kért LETkristály nem tartalmazott olvasható fejezetet.",!0,!0);return}let ve=Rt.find(pe=>he&&pe.libraryKey===he||B.id&&pe.id===B.id);ve?(ve.chapters=ce,Y&&(ve.coverUrl=Y),ve.cachedInOpfs=!0,ve.needsHydration=!1):(ve={id:String(B.id||he||`item_${Date.now()}`),libraryKey:he||String(B.id||`item_${Date.now()}`),sourceKind:B.itemKind||"book",isUserOwned:!0,title:String(B.title||"Olvasmány"),author:String(B.author||"Kalóz Szerző"),type:B.itemKind==="scroll"||B.itemKind==="log"?"scroll":B.itemKind==="copy"?"copy":"crystal_book",coverUrl:Y,chapters:ce,hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",cachedInOpfs:!0,needsHydration:!1},Rt.unshift(ve)),qt(),Ci(!0),await Kn(ve,Z.openMode==="listen"||Z.openMode==="dream"?Z.openMode:"read",Z.voiceId,Z.dreamChoice,Z.chapterIndex||0,Z.wordIndex||0)};window.addEventListener("message",B=>{const he=B.data;if(!(!he||typeof he!="object")){if(he.type==="KRYST_LOAD_MONASTERY_WORK")G(he);else if(he.type==="KRYST_PING_READER")ft({type:"KRYST_READER_READY",version:"3.3-library-sync",workId:H});else if(he.type==="KRYST_SYNC_USER_LIBRARY"&&he.catalog)Mr(he.catalog);else if(he.type==="KRYST_LOAD_LIBRARY_ITEM_CONTENT")oe(he);else if(he.type==="KRYST_OPEN_LIBRARY_ITEM"){he.catalog&&Mr(he.catalog);const Z=he.descriptor||he,Ue=String(Z.libraryKey||"");if(Z.itemType==="map"){let Y=Ct.find(C=>Ue&&C.libraryKey===Ue||Z.fileId&&C.fileId===Z.fileId||Z.id&&C.id===Z.id);if(!Y){const C=String(Z.fileId||Z.id||Date.now());Y={id:String(Z.id||`map_${C}`),libraryKey:Ue||`map:${C}`,fileId:Z.fileId?String(Z.fileId):void 0,isUserOwned:!0,isPendingPapat:!!Z.isPendingPapat,title:String(Z.title||"Hajózási Térkép"),imageUrl:"",description:"Saját hajózási térkép",anchors:[],needsHydration:!0},Ct.unshift(Y),qt()}he.contentPayload?oe({...he.contentPayload,success:!0,itemKind:"map",requestKey:Y.libraryKey||Y.id}):si(Y,"map")}else{let Y=Rt.find(C=>Ue&&C.libraryKey===Ue||Z.id&&C.id===Z.id||Z.copyCode&&C.copyCode===Z.copyCode||Z.scrollToken&&C.scrollToken===Z.scrollToken||Z.logId&&C.logId===Z.logId||Z.downloadLink&&C.downloadLink===Z.downloadLink);if(!Y){const C=Ue||`${Z.itemType||"book"}:${Z.copyCode||Z.scrollToken||Z.logId||Z.downloadLink||Z.id||Date.now()}`;Y={id:String(Z.id||C),libraryKey:C,sourceKind:Z.itemType||"book",isUserOwned:!0,copyCode:Z.copyCode,scrollToken:Z.scrollToken,logId:Z.logId,downloadLink:Z.downloadLink,workId:Z.workId,title:String(Z.title||"Olvasmány"),author:String(Z.author||"Kalóz Szerző"),type:Z.itemType==="scroll"||Z.itemType==="log"?"scroll":Z.itemType==="copy"?"copy":"crystal_book",chapters:[],hasMultiVoiceMaster:!1,defaultNarratorVoice:"ferenc",needsHydration:!0},Rt.unshift(Y),qt()}he.contentPayload?oe({...he.contentPayload,success:!0,requestKey:Y.libraryKey||Y.id}):Kn(Y,"read")}}}});try{const B=localStorage.getItem("kryst_user_library_catalog_v1");if(B){const he=JSON.parse(B);Mr(he)}}catch{}H&&ft({type:"KRYST_REQUEST_MONASTERY_WORK",workId:H,target:"reader",mode:"readonly"}),ft({type:"KRYST_READER_READY",version:"3.3-library-sync",workId:H}),ft({type:"KRYST_REQUEST_USER_LIBRARY"})}xr(),Sr(),yr(),S(),_r(),fn(),oc(),qt(),I("browse"),console.log("💎 [LET-Library Machine v3.2 Master Final] Sikeresen inicializálva a professzionális térképolvasóval!")});
