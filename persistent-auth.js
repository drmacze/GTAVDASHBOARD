(()=>{
'use strict';
const KEY='gtav-dashboard-token-v1';
try{
  const ss=window.sessionStorage;
  const ls=window.localStorage;
  const proto=Storage.prototype;
  const nativeGet=proto.getItem;
  const nativeSet=proto.setItem;
  const nativeRemove=proto.removeItem;
  const current=nativeGet.call(ss,KEY);
  const remembered=nativeGet.call(ls,KEY);
  if(current&&!remembered)nativeSet.call(ls,KEY,current);
  proto.getItem=function(key){
    if(this===ss&&key===KEY)return nativeGet.call(ss,key)||nativeGet.call(ls,key);
    return nativeGet.call(this,key);
  };
  proto.setItem=function(key,value){
    const result=nativeSet.call(this,key,value);
    if(this===ss&&key===KEY)nativeSet.call(ls,key,value);
    return result;
  };
  proto.removeItem=function(key){
    const result=nativeRemove.call(this,key);
    if(this===ss&&key===KEY)nativeRemove.call(ls,key);
    return result;
  };
}catch{}
})();
