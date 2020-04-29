/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/Utils","sap/ui/fl/Change","sap/ui/fl/Variant","sap/ui/fl/Cache"],function(q,U,C,V,a){"use strict";var b=function(c,A,o){this._sComponentName=c||"";this._sAppVersion=A||U.DEFAULT_APP_VERSION;this._mVariantManagement={};this._setChangeFileContent(o,{});this.sVariantTechnicalParameterName="sap-ui-fl-control-variant-id";this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");};b.prototype.getComponentName=function(){return this._sComponentName;};b.prototype.getAppVersion=function(){return this._sAppVersion;};b.prototype._setChangeFileContent=function(c,t){var o=a.getEntry(this.getComponentName(),this.getAppVersion());if(Object.keys(this._mVariantManagement).length===0){this._mVariantManagement={};}if(c&&c.changes&&c.changes.variantSection){Object.keys(c.changes.variantSection).forEach(function(v){this._mVariantManagement[v]={};var d=c.changes.variantSection[v];var e=d.variants.concat();var s;var i=-1;e.forEach(function(f,g){if(f.content.fileName===v){i=g;}if(!f.content.content.favorite){f.content.content.favorite=true;}if(!f.content.content.visible){f.content.content.visible=true;}var T=f.content.content.title.match(/.i18n>(\w+)./);if(T){f.content.content.title=this._oResourceBundle.getText(T[1]);}this._applyChangesOnVariant(f);if(t&&Array.isArray(t[this.sVariantTechnicalParameterName])){t[this.sVariantTechnicalParameterName].some(function(u){if(f.content.fileName===u){s=f.content.fileName;return true;}});}}.bind(this));if(i>-1){var S=e.splice(i,1)[0];e.sort(this.compareVariants);e.splice(0,0,S);}this._mVariantManagement[v].variants=e;this._mVariantManagement[v].defaultVariant=v;if(s){this._mVariantManagement[v].currentVariant=s;}this._mVariantManagement[v].variantManagementChanges=c.changes.variantSection[v].variantManagementChanges;this._applyChangesOnVariantManagement(this._mVariantManagement[v]);}.bind(this));o.file.changes.variantSection=this._mVariantManagement;}};b.prototype._getChangeFileContent=function(){return this._mVariantManagement;};b.prototype.compareVariants=function(v,o){if(v.content.content.title.toLowerCase()<o.content.content.title.toLowerCase()){return-1;}else if(v.content.content.title.toLowerCase()>o.content.content.title.toLowerCase()){return 1;}else{return 0;}};b.prototype.getVariants=function(v){var c=this._mVariantManagement[v]&&this._mVariantManagement[v].variants;return c?c:[];};b.prototype.getVariant=function(v,s){var o;var c=this.getVariants(v);c.some(function(d,i){if(d.content.fileName===s){o=d;return true;}});return o;};b.prototype.getVariantChanges=function(v,s){var c=s||this._mVariantManagement[v].defaultVariant;var d=this.getVariants(v);var f=d.filter(function(o){return o.content.fileName===c;});return f.reduce(function(r,o){return o.controlChanges?r.concat(o.controlChanges):r;},[]);};b.prototype._getReferencedChanges=function(v,c){var r=[];if(c.content.variantReference){r=this.getVariantChanges(v,c.content.variantReference);return r.filter(function(R){return U.isLayerAboveCurrentLayer(R.layer)===-1;});}return r;};b.prototype.setVariantChanges=function(v,s,c){if(!v||!s||!q.isArray(c)){U.log.error("Cannot set variant changes without Variant reference");return;}return this._mVariantManagement[v].variants.some(function(o,i){if(o.content.fileName===s){o.controlChanges=c;return true;}});};b.prototype._setVariantData=function(c,v,p){var d=this._mVariantManagement[v].variants;var o=d[p];Object.keys(c).forEach(function(P){if(o.content.content[P]){o.content.content[P]=c[P];}});if(o.content.fileName!==v){d.splice(p,1);var s=this._getIndexToSortVariant(d.slice(1),o);d.splice(s+1,0,o);return s+1;}else{d.splice(p,1,o);return p;}};b.prototype._updateChangesForVariantManagementInMap=function(c,v,A){var o=this._mVariantManagement[v];var s=c.changeType;if(c.fileType==="ctrl_variant_change"){o.variants.some(function(d){if(d.content.fileName===c.selector.id){if(!d.variantChanges[s]){d.variantChanges[s]=[];}if(A){d.variantChanges[s].push(c);}else{d.variantChanges[s].some(function(e,i){if(e.fileName===c.fileName){d.variantChanges[s].splice(i,1);return true;}});}return true;}});}else if(c.fileType==="ctrl_variant_management_change"){if(!o.variantManagementChanges){o.variantManagementChanges={};}if(!o.variantManagementChanges[s]){o.variantManagementChanges[s]=[];}if(A){o.variantManagementChanges[s].push(c);}else{o.variantManagementChanges[s].some(function(e,i){if(e.fileName===c.fileName){o.variantManagementChanges[s].splice(i,1);return true;}});}}};b.prototype.loadInitialChanges=function(){var i=[];Object.keys(this._mVariantManagement).forEach(function(v){var I=[];var s;if(this._mVariantManagement[v].currentVariant){s=this._mVariantManagement[v].currentVariant;}else{s=this._mVariantManagement[v].defaultVariant;}var c=this.getVariant(v,s).content.content.visible;if(!c){if(this._mVariantManagement[v].currentVariant){this._mVariantManagement[v].currentVariant=v;}else{this._mVariantManagement[v].defaultVariant=v;}s=v;}I=this.getVariantChanges(v,s);i=i.concat(I);}.bind(this));return i;};b.prototype.getChangesForVariantSwitch=function(v,c,n,m){var d=this.getVariantChanges(v,c);var M=[],e=[];Object.keys(m).forEach(function(f){m[f].forEach(function(o){M=M.concat(o);e=e.concat(o.getId());});});d=d.reduce(function(f,o,i){var g=e.indexOf(o.fileName);if(g>-1){f=f.concat(M[g]);}return f;},[]);var N=this.getVariantChanges(v,n).map(function(o){return new C(o);});var r=[];if(N.length>0){r=d.slice();d.some(function(o){if(N[0]&&o.getId()===N[0].getId()){N.shift();r.shift();}else{return true;}});}else{r=d;}var s={aRevert:r.reverse(),aNew:N};return s;};b.prototype._applyChangesOnVariant=function(v){var m=v.variantChanges,A;Object.keys(m).forEach(function(c){switch(c){case"setTitle":A=this._getActiveChange(c,m);if(A){v.content.content.title=A.getText("title");}break;case"setFavorite":A=this._getActiveChange(c,m);if(A){v.content.content.favorite=A.getContent().favorite;}break;case"setVisible":A=this._getActiveChange(c,m);if(A){v.content.content.visible=A.getContent().visible;}break;default:U.log.error("No valid changes on variant "+v.content.content.title+" available");}}.bind(this));};b.prototype._applyChangesOnVariantManagement=function(v){var m=v.variantManagementChanges,A;if(Object.keys(m).length>0){A=this._getActiveChange("setDefault",m);if(A){v.defaultVariant=A.getContent().defaultVariant;}}};b.prototype._getActiveChange=function(c,m){var l=m[c].length-1;if(l>-1){return new C(m[c][l]);}return false;};b.prototype._fillVariantModel=function(){var v={};Object.keys(this._mVariantManagement).forEach(function(k){v[k]={defaultVariant:this._mVariantManagement[k].defaultVariant,variants:[]};if(this._mVariantManagement[k].currentVariant){v[k].currentVariant=this._mVariantManagement[k].currentVariant;}this.getVariants(k).forEach(function(o,i){v[k].variants[i]=JSON.parse(JSON.stringify({key:o.content.fileName,title:o.content.content.title,layer:o.content.layer,favorite:o.content.content.favorite,visible:o.content.content.visible}));});}.bind(this));return v;};b.prototype.updateCurrentVariantInMap=function(v,n){this._mVariantManagement[v].currentVariant=n;};b.prototype.addChangeToVariant=function(c,v,s){var n=this.getVariantChanges(v,s);var d=n.map(function(c){return c.fileName;});var i=d.indexOf(c.getDefinition().fileName);if(i===-1){n.push(c.getDefinition());return this.setVariantChanges(v,s,n);}return false;};b.prototype.removeChangeFromVariant=function(c,v,s){var n=this.getVariantChanges(v,s);n.forEach(function(o,i){var d=new C(o);if(d.getId&&(d.getId()===c.getId())){n.splice(i,1);}});return this.setVariantChanges(v,s,n);};b.prototype.addVariantToVariantManagement=function(v,s){var c=this._mVariantManagement[s].variants.slice().splice(1);var i=this._getIndexToSortVariant(c,v);if(v.content.variantReference){var r=this._getReferencedChanges(s,v);v.controlChanges=r.concat(v.controlChanges);}this._mVariantManagement[s].variants.splice(i+1,0,v);return i+1;};b.prototype._getIndexToSortVariant=function(v,o){var i=0;v.some(function(e,c){if(this.compareVariants(o,e)<0){i=c;return true;}i=c+1;}.bind(this));return i;};b.prototype.removeVariantFromVariantManagement=function(v,s){var i;var f=this._mVariantManagement[s].variants.some(function(c,d){var o=new V(c);if(o.getId()===v.getId()){i=d;return true;}});if(f){this._mVariantManagement[s].variants.splice(i,1);}return i;};b.prototype.resetMap=function(){this._mVariantManagement={};};return b;},true);