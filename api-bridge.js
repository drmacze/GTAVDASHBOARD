(()=>{
'use strict';
const API_ORIGIN='https://playgta5-1k8.pages.dev';
const nativeFetch=window.fetch.bind(window);
let authVerified=false;

function isAdminUpdatesProbe(url,init){
  if(authVerified)return false;
  const method=String(init?.method||'GET').toUpperCase();
  if(method!=='GET')return false;
  try{
    const parsed=new URL(url,location.href);
    return parsed.pathname==='/api/updates'&&parsed.searchParams.get('admin')==='1';
  }catch{return false}
}

async function fetchApi(url,init){
  if(isAdminUpdatesProbe(url,init)){
    const response=await nativeFetch(API_ORIGIN+'/api/admin-auth',{cache:'no-store',...init});
    if(response.ok)authVerified=true;
    return response;
  }
  return nativeFetch(API_ORIGIN+url,init);
}

window.fetch=(input,init)=>{
  if(typeof input==='string'&&input.startsWith('/api/'))return fetchApi(input,init);
  if(input instanceof Request){
    const url=new URL(input.url,location.href);
    if(url.origin===location.origin&&url.pathname.startsWith('/api/')){
      const path=url.pathname+url.search;
      if(isAdminUpdatesProbe(path,init||{method:input.method})){
        return nativeFetch(new Request(API_ORIGIN+'/api/admin-auth',input),init).then(response=>{if(response.ok)authVerified=true;return response});
      }
      const target=API_ORIGIN+path;
      return nativeFetch(new Request(target,input),init);
    }
  }
  return nativeFetch(input,init);
};
})();
