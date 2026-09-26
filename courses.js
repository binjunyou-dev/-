window.OUJ_READY=(async()=>{
  try{
    const r=await fetch("./ouj_mobile_pwa.zip",{cache:"no-store"});
    if(!r.ok) throw new Error("ZIPの取得に失敗: "+r.status);
    const ab=await r.arrayBuffer(), dv=new DataView(ab);
    const td=new TextDecoder("utf-8");
    let p=0;
    while(p+30<=ab.byteLength){
      const sig=dv.getUint32(p,true);
      if(sig!==0x04034b50) break;
      const method=dv.getUint16(p+8,true);
      const csize=dv.getUint32(p+18,true);
      const nlen=dv.getUint16(p+26,true);
      const xlen=dv.getUint16(p+28,true);
      const name=td.decode(new Uint8Array(ab,p+30,nlen));
      const start=p+30+nlen+xlen;
      if(name==="courses.js"){
        const compressed=new Uint8Array(ab,start,csize);
        let bytes;
        if(method===0){
          bytes=compressed;
        }else if(method===8){
          if(!("DecompressionStream" in window)) throw new Error("このブラウザはZIP展開に未対応です");
          const ds=new DecompressionStream("deflate-raw");
          bytes=new Uint8Array(await new Response(new Blob([compressed]).stream().pipeThrough(ds)).arrayBuffer());
        }else{
          throw new Error("未対応のZIP圧縮方式: "+method);
        }
        const js=td.decode(bytes);
        (0,eval)(js);
        if(!Array.isArray(window.OUJ_COURSES)) throw new Error("科目データを読み込めませんでした");
        return window.OUJ_COURSES;
      }
      p=start+csize;
    }
    throw new Error("ZIP内にcourses.jsが見つかりません");
  }catch(err){
    console.error(err);
    window.OUJ_COURSES=[];
    document.addEventListener("DOMContentLoaded",()=>{
      const feed=document.getElementById("feed");
      if(feed) feed.innerHTML='<div class="empty">科目データの読み込みに失敗しました。通信状態を確認して再読み込みしてください。</div>';
    });
    return [];
  }
})();