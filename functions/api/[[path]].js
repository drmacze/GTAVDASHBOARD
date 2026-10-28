const ORIGIN='https://playgta5-1k8.pages.dev';
export async function onRequest(context){
  const {request,params}=context;
  const raw=Array.isArray(params.path)?params.path.join('/'):String(params.path||'');
  const source=new URL(request.url);
  const target=new URL(`/api/${raw}`,ORIGIN);
  target.search=source.search;
  const headers=new Headers(request.headers);
  headers.delete('host');
  headers.delete('content-length');
  headers.set('Origin',ORIGIN);
  const init={method:request.method,headers,redirect:'manual'};
  if(!['GET','HEAD'].includes(request.method))init.body=await request.arrayBuffer();
  try{
    const upstream=await fetch(target.toString(),init);
    const outHeaders=new Headers(upstream.headers);
    outHeaders.set('Cache-Control','no-store');
    outHeaders.delete('content-encoding');
    return new Response(upstream.body,{status:upstream.status,statusText:upstream.statusText,headers:outHeaders});
  }catch(error){
    return new Response(JSON.stringify({error:'upstream_unavailable'}),{status:502,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
  }
}
