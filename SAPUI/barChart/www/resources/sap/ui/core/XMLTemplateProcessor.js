/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/DataType','sap/ui/base/ManagedObject','sap/ui/core/CustomData','./mvc/View','./mvc/EventHandlerResolver','./ExtensionPoint','./StashedControlSupport','sap/ui/base/SyncPromise'],function(q,D,M,C,V,E,a,S,b){"use strict";function p(t,v,n,o){var B=M.bindingParser(v,o,true);if(B&&typeof B==="object"){return B;}var d=v=B||v;var T=D.getType(t);if(T){if(T instanceof D){d=T.parseValue(v,{context:o});}}else{throw new Error("Property "+n+" has unknown type "+t);}return typeof d==="string"?M.bindingParser.escape(d):d;}function l(x){return x.localName||x.baseName||x.nodeName;}function u(d){if(d.isRejected()){throw d.getResult();}return d.getResult();}function g(A,f){function s(n,o,m){var e,v,h=[];for(e=n.firstChild;e;e=e.nextSibling){v=f(n,o,m,e);if(v){h.push(u(v));}}return b.resolve(h);}function d(n,o,m){var e,h=Promise.resolve(),i=[];for(e=n.firstChild;e;e=e.nextSibling){h=h.then(f.bind(null,n,o,m,e));i.push(h);}return Promise.all(i);}return A?d:s;}var X={};X.loadTemplate=function(t,e){var r=q.sap.getResourceName(t,"."+(e||"view")+".xml");return q.sap.loadResource(r).documentElement;};X.loadTemplatePromise=function(t,e){var r=q.sap.getResourceName(t,"."+(e||"view")+".xml");return q.sap.loadResource(r,{async:true}).then(function(R){return R.documentElement;});};X.parseViewAttributes=function(x,v,s){var A=v.getMetadata().getAllProperties();for(var i=0;i<x.attributes.length;i++){var d=x.attributes[i];if(d.name==='controllerName'){v._controllerName=d.value;}else if(d.name==='resourceBundleName'){v._resourceBundleName=d.value;}else if(d.name==='resourceBundleUrl'){v._resourceBundleUrl=d.value;}else if(d.name==='resourceBundleLocale'){v._resourceBundleLocale=d.value;}else if(d.name==='resourceBundleAlias'){v._resourceBundleAlias=d.value;}else if(d.name==='class'){v.addStyleClass(d.value);}else if(!s[d.name]&&A[d.name]){s[d.name]=p(A[d.name].type,d.value,d.name,v._oContainingView.oController);}}};X.enrichTemplateIds=function(x,v){X.enrichTemplateIdsPromise(x,v,false);return x;};X.enrichTemplateIdsPromise=function(x,v,A){return c(x,v,true,A).then(function(){return x;});};X.parseTemplate=function(x,v){return u(X.parseTemplatePromise(x,v,false));};X.parseTemplatePromise=function(x,v,A,P){return c(x,v,false,A,P);};function c(x,v,d,A,P){var r=[],f=b.resolve(),s=v._sProcessingMode||sap.ui.getCore().getConfiguration().getXMLProcessingMode();A=A&&s==="sequential";q.sap.log.debug("XML processing mode is "+(A?"sequential":"default"),"","XMLTemplateProcessor");var h=sap.ui.getCore().getConfiguration().getDesignMode();if(h){v._sapui_declarativeSourceInfo={xmlNode:x,xmlRootNode:v._oContainingView===v?x:v._oContainingView._sapui_declarativeSourceInfo.xmlRootNode};}var k=v.sViewName||v._sFragmentName;if(!k){var t=v;var L=0;while(++L<1000&&t&&t!==t._oContainingView){t=t._oContainingView;}k=t.sViewName;}if(v.isSubView()){y(x,true);}else{if(x.localName==="View"&&x.namespaceURI!=="sap.ui.core.mvc"){q.sap.log.warning("XMLView root node must have the 'sap.ui.core.mvc' namespace, not '"+x.namespaceURI+"'"+(k?" (View name: "+k+")":""));}z(x);}var i=0;function m(){for(;i<r.length;i++){var e=r[i];if(e&&typeof e.then==='function'){return e.then(n).then(m);}}return r;}function n(e){var j=[i,1].concat(e);Array.prototype.splice.apply(r,j);}return f.then(m);function o(e){return e;}function w(e){return v._oContainingView.createId(e);}function y(x,R,e){if(x.nodeType===1){var j=l(x);if(x.namespaceURI==="http://www.w3.org/1999/xhtml"||x.namespaceURI==="http://www.w3.org/2000/svg"){r.push("<"+j+" ");var K=false;for(var i=0;i<x.attributes.length;i++){var N=x.attributes[i];var O=N.value;if(N.name==="id"){K=true;O=I(v,x);}r.push(N.name+"=\""+q.sap.encodeHTML(O)+"\" ");}if(R===true){r.push("data-sap-ui-preserve"+"=\""+v.getId()+"\" ");if(!K){r.push("id"+"=\""+v.getId()+"\" ");}}r.push(">");var Q=x;if(window.HTMLTemplateElement&&x instanceof HTMLTemplateElement&&x.content instanceof DocumentFragment){Q=x.content;}z(Q);r.push("</"+j+">");}else if(j==="FragmentDefinition"&&x.namespaceURI==="sap.ui.core"){z(x,false,true);}else{f=f.then(function(){return G(x).then(function(W){for(var i=0;i<W.length;i++){var Y=W[i];if(v.getMetadata().hasAggregation("content")){v.addAggregation("content",Y);}else if(v.getMetadata().hasAssociation(("content"))){v.addAssociation("content",Y);}}return W;});});r.push(f);}}else if(x.nodeType===3&&!e){var T=x.textContent||x.text,U=l(x.parentNode);if(T){if(U!="style"){T=q.sap.encodeHTML(T);}r.push(T);}}}function z(x,R,e){var j=x.childNodes;for(var i=0;i<j.length;i++){y(j[i],R,e);}}function B(N,e){var j;var K=sap.ui.getCore().getLoadedLibraries();q.each(K,function(T,U){if(N===U.namespace||N===U.name){j=U.name+"."+((U.tagNames&&U.tagNames[e])||e);}});j=j||N+"."+e;function O(Q){if(!Q){q.sap.log.error("Control '"+j+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");Q=q.sap.getObject(j);}if(!Q){q.sap.log.error("Can't find object class '"+j+"' for XML-view","","XMLTemplateProcessor");}return Q;}var R=q.sap.getResourceName(j,"");var Q=sap.ui.require(R);if(!Q){if(A){return new Promise(function(T){sap.ui.require([R],function(Q){Q=O(Q);T(Q);});});}else{Q=sap.ui.requireSync(R);Q=O(Q);}}return Q;}function F(e){if(e.namespaceURI==="http://www.w3.org/1999/xhtml"||e.namespaceURI==="http://www.w3.org/2000/svg"){var j=e.attributes['id']?e.attributes['id'].textContent||e.attributes['id'].text:null;if(d){return X.enrichTemplateIdsPromise(e,v,A).then(function(){return[];});}else{var K=function(O){var Q={id:j?I(v,e,j):undefined,xmlNode:e,containingView:v._oContainingView};if(v.fnScopedRunWithOwner){return v.fnScopedRunWithOwner(function(){return new O(Q);});}return new O(Q);};if(A){return new Promise(function(O,Q){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(N){O([K(N)]);});});}else{var N=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return b.resolve([K(N)]);}}}else{return G(e);}}function G(e){if(l(e)==="ExtensionPoint"&&e.namespaceURI==="sap.ui.core"){if(d){return b.resolve([]);}else{var j=v instanceof V?v._oContainingView:v;return b.resolve(a._factory(j,e.getAttribute("name"),function(){var N=b.resolve();var O=[];var Q=e.childNodes;for(var i=0;i<Q.length;i++){var R=Q[i];if(R.nodeType===1){N=N.then(F.bind(null,R));O.push(N);}}return b.all(O).then(function(T){var U=[];T.forEach(function(W){U=U.concat(W);});return U;});}));}}else{var K=B(e.namespaceURI,l(e));if(K&&typeof K.then==='function'){return K.then(function(N){return H(e,N);});}else{return H(e,K);}}}function H(K,N){var O=K.namespaceURI,Q={},R="",T=[],U=null,W=null;if(!N){return b.resolve([]);}var Y=N.getMetadata();var Z=Y.getAllSettings();if(!d){for(var i=0;i<K.attributes.length;i++){var $=K.attributes[i],_=$.name,a1=Z[_],b1=$.value;if(_==="id"){Q[_]=I(v,K,b1);}else if(_==="class"){R+=b1;}else if(_==="viewName"){Q[_]=b1;}else if(_==="fragmentName"){Q[_]=b1;Q['containingView']=v._oContainingView;}else if((_==="binding"&&!a1)||_==='objectBindings'){var c1=M.bindingParser(b1,v._oContainingView.oController);if(c1){Q.objectBindings=Q.objectBindings||{};Q.objectBindings[c1.model||undefined]=c1;}}else if(_==='metadataContexts'){var d1=null;try{d1=X._calculatedModelMapping(b1,v._oContainingView.oController,true);}catch(e){q.sap.log.error(v+":"+e.message);}if(d1){Q.metadataContexts=d1;if(X._preprocessMetadataContexts){X._preprocessMetadataContexts(N.getMetadata().getName(),Q,v._oContainingView.oController);}}}else if(_.indexOf(":")>-1){if($.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"){var e1=l($);T.push(new C({key:e1,value:p("any",b1,e1,v._oContainingView.oController)}));}else if($.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1"){W=b1;}else if(_.indexOf("xmlns:")!==0){if(!U){U={};}if(!U.hasOwnProperty($.namespaceURI)){U[$.namespaceURI]={};}U[$.namespaceURI][l($)]=$.nodeValue;q.sap.log.debug(v+": XMLView parser encountered unknown attribute '"+_+"' (value: '"+b1+"') with unknown namespace, stored as sap-ui-custom-settings of customData");}}else if(a1&&a1._iKind===0){Q[_]=p(a1.type,b1,_,v._oContainingView.oController);}else if(a1&&a1._iKind===1&&a1.altTypes){Q[_]=p(a1.altTypes[0],b1,_,v._oContainingView.oController);}else if(a1&&a1._iKind===2){var c1=M.bindingParser(b1,v._oContainingView.oController);if(c1){Q[_]=c1;}else{q.sap.log.error(v+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+_+"='"+b1+"')");}}else if(a1&&a1._iKind===3){Q[_]=w(b1);}else if(a1&&a1._iKind===4){Q[_]=b1.split(/[\s,]+/g).filter(o).map(w);}else if(a1&&a1._iKind===5){var f1=E.resolveEventHandler(b1,v._oContainingView.oController);if(f1){Q[_]=f1;}else{q.sap.log.warning(v+": event handler function \""+b1+"\" is not a function or does not exist in the controller.");}}else if(a1&&a1._iKind===-1){if(V.prototype.isPrototypeOf(N.prototype)&&_=="async"){Q[_]=p(a1.type,b1,_,v._oContainingView.oController);}else{q.sap.log.warning(v+": setting '"+_+"' for class "+Y.getName()+" (value:'"+b1+"') is not supported");}}else{if(X._supportInfo){X._supportInfo({context:K,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+_+"' for class "+Y.getName()}});}}}if(U){T.push(new C({key:"sap-ui-custom-settings",value:U}));}if(T.length>0){Q.customData=T;}}var g1=g(A,h1);function h1(K,i1,j1,k1,l1){var m1;if(k1.nodeType===1){if(k1.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1"){Q[l(k1)]=k1.querySelector("*");return;}m1=k1.namespaceURI===O&&j1&&j1[l(k1)];if(m1){return g1(k1,m1);}else if(i1){if(!l1&&k1.getAttribute("stashed")==="true"&&!d){S.createStashedControl(I(v,k1),{sParentId:Q["id"],sParentAggregationName:i1.name,fnCreate:function(){var j=A;A=false;try{return u(h1(K,i1,j1,k1,true));}finally{A=j;}}});return;}return F(k1).then(function(n1){for(var j=0;j<n1.length;j++){var o1=n1[j];var p1=i1.name;if(i1.multiple){if(!Q[p1]){Q[p1]=[];}if(typeof Q[p1].path==="string"){Q[p1].template=o1;}else{Q[p1].push(o1);}}else{Q[p1]=o1;}}return n1;});}else if(l(K)!=="FragmentDefinition"||K.namespaceURI!=="sap.ui.core"){throw new Error("Cannot add direct child without default aggregation defined for control "+Y.getElementName());}}else if(k1.nodeType===3){if(q.trim(k1.textContent||k1.text)){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+q.trim(k1.textContent||k1.text));}}}var i1=Y.getDefaultAggregation();var j1=Y.getAllAggregations();return g1(K,i1,j1).then(function(){var j;if(d&&K.hasAttribute("id")){J(v,K);}else if(!d){if(V.prototype.isPrototypeOf(N.prototype)&&typeof N._sType==="string"){var k1=function(){return sap.ui.view(Q,undefined,N._sType);};if(v.fnScopedRunWithOwner){j=v.fnScopedRunWithOwner(k1);}else{j=k1();}}else{var l1=function(){if(v.fnScopedRunWithOwner){return v.fnScopedRunWithOwner(function(){return new N(Q);});}else{return new N(Q);}};if(P&&P.fnRunWithPreprocessor){j=P.fnRunWithPreprocessor(l1);}else{j=l1();}}if(R&&j.addStyleClass){j.addStyleClass(R);}}if(!j){j=[];}else if(!Array.isArray(j)){j=[j];}if(X._supportInfo&&j){for(var i=0,m1=j.length;i<m1;i++){var n1=j[i];if(n1&&n1.getId()){var o1=X._supportInfo({context:K,env:{caller:"createRegularControls",nodeid:K.getAttribute("id"),controlid:n1.getId()}}),p1=W?W+",":"";p1+=o1;X._supportInfo.addSupportInfo(n1.getId(),p1);}}}if(h){j.forEach(function(n1){if(Y.getCompositeAggregationName){var q1=K.getElementsByTagName(n1.getMetadata().getCompositeAggregationName());for(var i=0;i<q1.length;i++){K.removeChild(q1[0]);}}n1._sapui_declarativeSourceInfo={xmlNode:K,xmlRootNode:v._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:Y.getName()==='sap.ui.core.Fragment'?Q['fragmentName']:null};});}return j;});}function I(v,x,e){if(x.getAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id")){return x.getAttribute("id");}else{return w(e?e:x.getAttribute("id"));}}function J(v,x){x.setAttribute("id",w(x.getAttribute("id")));x.setAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id",true);}}X._preprocessMetadataContexts=null;X._calculatedModelMapping=function(B,o,A){var d,m={},e=M.bindingParser(B,o);function f(F){if(F.length%2===0){throw new Error("The last entry is no binding");}for(var i=1;i<=F.length;i=i+2){if(typeof F[i-1]=='string'){throw new Error("Binding expected not a string");}if(F[i]){if((typeof F[i]!='string')||(F[i]!=",")){throw new Error("Missing delimiter ','");}}}}if(e){if(!e.formatter){d=e;e={parts:[d]};}else{f(e.formatter.textFragments);}for(var i=0;i<e.parts.length;i++){d=e.parts[i];m[d.model]=m[d.model]||(A?[]:null);if(Array.isArray(m[d.model])){m[d.model].push(d);}else{m[d.model]=d;}}}return m;};return X;},true);