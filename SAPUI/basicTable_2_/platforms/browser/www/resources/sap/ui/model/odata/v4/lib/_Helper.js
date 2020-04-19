/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/thirdparty/URI"],function(q,U){"use strict";var a={"max":"boolean","min":"boolean","name":"string","subtotals":"boolean","with":"string"},A={aggregate:"object",group:"object",groupLevels:"array"},r=/&/g,b=/\=/g,c=/%29/g,d=/%28/g,f=/%27/g,g=/#/g,h=/\([^/]*|\/-?\d+/g,j=/^-?\d+$/,k=/\+/g,l=/'/g,H;function m(D,e,N){var K;function i(M){if(N){M+=" at property: "+N;}throw new Error(M);}function t(v){return Array.isArray(v)?"array":typeof v;}for(K in D){if(!(e&&K in e)){i("Unsupported '"+K+"'");}else if(t(D[K])!==e[K]){i("Not a "+e[K]+" value for '"+K+"'");}}}function n(M,e){var N;for(N in M){m(M[N],e,N);}}H={buildApply:function(o,e){var i,s="",G,M=[];function p(v){var D=o.aggregate[v],w=D.name||v;if(D.with){w+=" with "+D.with+" as "+v;}else if(D.name){w+=" as "+v;}if(D.min){u(v,"min");}if(D.max){u(v,"max");}return w;}function t(v){return o.groupLevels.indexOf(v)<0;}function u(N,v){var w="UI5"+v+"__"+N;M.push(N+" with "+v+" as "+w);if(e){e[w]={measure:N,method:v};}}m(o,A);o.groupLevels=o.groupLevels||[];if(o.groupLevels.length>1){throw new Error("More than one group level: "+o.groupLevels);}o.group=o.group||{};n(o.group);G=o.groupLevels.concat(Object.keys(o.group).sort().filter(t));o.aggregate=o.aggregate||{};n(o.aggregate,a);i=Object.keys(o.aggregate).sort().map(p);if(i.length){s="aggregate("+i.join(",")+")";}if(G.length){s="groupby(("+G.join(",")+(s?"),"+s+")":"))");}return s+(M.length?"/concat(aggregate("+M.join(",")+"),identity)":"");},buildPath:function(){var i,p=[],s;for(i=0;i<arguments.length;i++){s=arguments[i];if(s||s===0){p.push(s==="/"?"":s);}}return p.join("/");},buildQuery:function(p){var K,Q;if(!p){return"";}K=Object.keys(p);if(K.length===0){return"";}Q=[];K.forEach(function(s){var v=p[s];if(Array.isArray(v)){v.forEach(function(i){Q.push(H.encodePair(s,i));});}else{Q.push(H.encodePair(s,v));}});return"?"+Q.join("&");},clone:function clone(v){return v===undefined||v===Infinity||v===-Infinity||v!==v?v:JSON.parse(JSON.stringify(v));},createError:function(i){var B=i.responseText,C=i.getResponseHeader("Content-Type"),R=new Error(i.status+" "+i.statusText);R.status=i.status;R.statusText=i.statusText;if(i.status===0){R.message="Network error";return R;}if(C){C=C.split(";")[0];}if(i.status===412){R.isConcurrentModification=true;}if(C==="application/json"){try{R.error=JSON.parse(B).error;R.message=R.error.message;if(typeof R.message==="object"){R.message=R.error.message.value;}}catch(e){q.sap.log.warning(e.toString(),B,"sap.ui.model.odata.v4.lib._Helper");}}else if(C==="text/plain"){R.message=B;}return R;},createGetMethod:function(F,t){return function(){var s=this[F].apply(this,arguments);if(s.isFulfilled()){return s.getResult();}else if(t){if(s.isRejected()){s.caught();throw s.getResult();}else{throw new Error("Result pending");}}};},createRequestMethod:function(F){return function(){return Promise.resolve(this[F].apply(this,arguments));};},deletePrivateAnnotation:function(o,s){var p=o["@$ui5._"];if(p){delete p[s];}},drillDown:function(D,p){return p.reduce(function(D,s){return(D&&s in D)?D[s]:undefined;},D);},encode:function(p,e){var E=encodeURI(p).replace(r,"%26").replace(g,"%23").replace(k,"%2B");if(e){E=E.replace(b,"%3D");}return E;},encodePair:function(K,v){return H.encode(K,true)+"="+H.encode(v,false);},fireChange:function(C,p,v){var L=C[p],i;if(L){for(i=0;i<L.length;i++){L[i].onChange(v);}}},fireChanges:function(C,p,v,R){Object.keys(v).forEach(function(P){var s=H.buildPath(p,P),V=v[P];if(V&&typeof V==="object"){H.fireChanges(C,s,V,R);}else{H.fireChange(C,s,R?undefined:V);}});},formatLiteral:function(v,t){if(v===undefined){throw new Error("Illegal value: undefined");}if(v===null){return"null";}switch(t){case"Edm.Binary":return"binary'"+v+"'";case"Edm.Boolean":case"Edm.Byte":case"Edm.Double":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":case"Edm.Single":return String(v);case"Edm.Date":case"Edm.DateTimeOffset":case"Edm.Decimal":case"Edm.Guid":case"Edm.Int64":case"Edm.TimeOfDay":return v;case"Edm.Duration":return"duration'"+v+"'";case"Edm.String":return"'"+v.replace(l,"''")+"'";default:throw new Error("Unsupported type: "+t);}},getKeyPredicate:function(i,M,t){var K=[],e=H.getKeyProperties(i,M,t,true);if(!e){return undefined;}K=Object.keys(e).map(function(s,I,o){var v=encodeURIComponent(e[s]);return o.length===1?v:encodeURIComponent(s)+"="+v;});return"("+K.join(",")+")";},getKeyProperties:function(i,M,t,R){var F,K={};F=t[M].$Key.some(function(v){var s,e,p,P,T,V;if(typeof v==="string"){s=e=v;}else{s=Object.keys(v)[0];e=v[s];if(!R){s=e;}}p=e.split("/");V=H.drillDown(i,p);if(V===undefined){return true;}P=p.pop();T=t[H.buildPath(M,p.join("/"))];V=H.formatLiteral(V,T[P].$Type);K[s]=V;});return F?undefined:K;},getMetaPath:function(p){return p.replace(h,"");},getPrivateAnnotation:function(o,s){var p=o["@$ui5._"];return p&&p[s];},getSelectForPath:function(Q,p){if(p){p.split("/").some(function(s){if(!j.test(s)){Q=Q&&Q.$expand&&Q.$expand[s];}});}return Q&&Q.$select;},hasMinOrMax:function(e){return!!e&&Object.keys(e).some(function(s){var D=e[s];return D.min||D.max;});},hasPrivateAnnotation:function(o,s){var p=o["@$ui5._"];return p?s in p:false;},isSafeInteger:function(N){if(typeof N!=="number"||!isFinite(N)){return false;}N=Math.abs(N);return N<=9007199254740991&&Math.floor(N)===N;},makeAbsolute:function(u,B){return new U(u).absoluteTo(B).toString().replace(f,"'").replace(d,"(").replace(c,")");},namespace:function(N){var i=N.indexOf("/");if(i>=0){N=N.slice(0,i);}i=N.lastIndexOf(".");return i<0?"":N.slice(0,i);},parseLiteral:function(L,t,p){function e(i){if(!isFinite(i)){throw new Error(p+": Not a valid "+t+" literal: "+L);}return i;}if(L==="null"){return null;}switch(t){case"Edm.Boolean":return L==="true";case"Edm.Byte":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":return e(parseInt(L,10));case"Edm.Date":case"Edm.DateTimeOffset":case"Edm.Decimal":case"Edm.Guid":case"Edm.Int64":case"Edm.TimeOfDay":return L;case"Edm.Double":case"Edm.Single":return L==="INF"||L==="-INF"||L==="NaN"?L:e(parseFloat(L));default:throw new Error(p+": Unsupported type: "+t);}},publicClone:function(v){var C=H.clone(v);if(C){delete C["@$ui5._"];}return C;},setPrivateAnnotation:function(o,s,v){var p=o["@$ui5._"];if(!p){p=o["@$ui5._"]={};}p[s]=v;},toArray:function(e){if(e===undefined||e===null){return[];}if(Array.isArray(e)){return e;}return[e];},updateCache:function(C,p,o,P){if(!P){return;}Object.keys(o).forEach(function(s){var e=H.buildPath(p,s),O=o[s],N;if(s in P){N=P[s];if(N&&typeof N==="object"){if(O){H.updateCache(C,e,O,N);}else{o[s]=N;H.fireChanges(C,e,N,false);}}else if(O&&typeof O==="object"){o[s]=N;H.fireChanges(C,e,O,true);}else{o[s]=N;if(O!==N){H.fireChange(C,e,N);}}}});},updateCacheAfterPost:function(C,p,o,P,s){function e(p,t,o,P){var S=t.split("/");S.every(function(u,I){if(P[u]===null){o[u]=null;if(I<S.length-1){return false;}H.fireChange(C,H.buildPath(p,t),o[u]);}else if(typeof P[u]==="object"){o[u]=o[u]||{};}else{if(o[u]!==P[u]){o[u]=P[u];H.fireChange(C,H.buildPath(p,t),o[u]);}return false;}o=o[u];P=P[u];return true;});}function i(O,t){Object.keys(O).forEach(function(u){var v=t?t+"/"+u:u,w=O[u];if(w!==null&&typeof w==="object"){i(w,v);}else{s.push(v);}});}if(!s||s.indexOf("*")>=0){s=[];i(P);}else{s=s.concat("@odata.etag");}s.forEach(function(t){e(p,t,o,P);});}};return H;},false);
