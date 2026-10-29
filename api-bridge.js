(()=>{
'use strict';
const API_ORIGIN='https://playgta5-1k8.pages.dev';
const TOKEN_KEY='gtav-dashboard-token-v1';
const REMEMBER_KEY='gtav-dashboard-trusted-device-v1';
const nativeFetch=window.fetch.bind(window);
let authVerified=false;

try{
  const sessionToken=sessionStorage.getItem(TOKEN_KEY)||'';
  const remembered=localStorage.getItem(REMEMBER_KEY)||'';
  if(sessionToken&&!remembered)localStorage.setItem(REMEMBER_KEY,sessionToken);
  if(remembered&&!sessionToken)sessionStorage.setItem(TOKEN_KEY,remembered);
}catch{}

function rememberLogin(){
  try{
    const field=document.getElementById('admin-token');
    const value=String(field?.value||'').trim();
    if(value)localStorage.setItem(REMEMBER_KEY,value);
  }catch{}
}
function forgetLogin(){
  try{
    localStorage.removeItem(REMEMBER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  }catch{}
}
const loginForm=document.getElementById('login-form');
if(loginForm)loginForm.addEventListener('submit',rememberLogin,true);
const logout=document.getElementById('logout');
if(logout)logout.addEventListener('click',forgetLogin,true);

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
    else if(response.status===401)forgetLogin();
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
        return nativeFetch(new Request(API_ORIGIN+'/api/admin-auth',input),init).then(response=>{
          if(response.ok)authVerified=true;
          else if(response.status===401)forgetLogin();
          return response;
        });
      }
      const target=API_ORIGIN+path;
      return nativeFetch(new Request(target,input),init);
    }
  }
  return nativeFetch(input,init);
};
})();
