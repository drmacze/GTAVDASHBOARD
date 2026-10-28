(()=>{
'use strict';
const API_ORIGIN='https://playgta5-1k8.pages.dev';
const nativeFetch=window.fetch.bind(window);
window.fetch=(input,init)=>{
  if(typeof input==='string'&&input.startsWith('/api/'))return nativeFetch(API_ORIGIN+input,init);
  if(input instanceof Request){
    const url=new URL(input.url,location.href);
    if(url.origin===location.origin&&url.pathname.startsWith('/api/')){
      const target=API_ORIGIN+url.pathname+url.search;
      return nativeFetch(new Request(target,input),init);
    }
  }
  return nativeFetch(input,init);
};
})();
