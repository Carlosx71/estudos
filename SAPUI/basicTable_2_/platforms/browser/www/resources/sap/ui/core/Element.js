/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../base/Object','../base/ManagedObject','./ElementMetadata','../Device','jquery.sap.strings','jquery.sap.trace'],function(q,B,M,E,D){"use strict";var a=M.extend("sap.ui.core.Element",{metadata:{stereotype:"element","abstract":true,publicMethods:["getId","getMetadata","getTooltip_AsString","getTooltip_Text","getModel","setModel","hasModel","bindElement","unbindElement","getElementBinding","prop","getLayoutData","setLayoutData"],library:"sap.ui.core",aggregations:{tooltip:{name:"tooltip",type:"sap.ui.core.TooltipBase",altTypes:["string"],multiple:false},customData:{name:"customData",type:"sap.ui.core.CustomData",multiple:true,singularName:"customData"},layoutData:{name:"layoutData",type:"sap.ui.core.LayoutData",multiple:false,singularName:"layoutData"},dependents:{name:"dependents",type:"sap.ui.core.Element",multiple:true},dragDropConfig:{name:"dragDropConfig",type:"sap.ui.core.dnd.DragDropBase",multiple:true,singularName:"dragDropConfig"}}},constructor:function(i,s){M.apply(this,arguments);},renderer:null},E);a.defineClass=function(c,s,m){return B.defineClass(c,s,m||E);};a.prototype.getInterface=function(){return this;};a.prototype._handleEvent=function(e){var t=this,h="on"+e.type;function b(d){var i,l,o;if(d&&(l=d.length)>0){d=l===1?d:d.slice();for(i=0;i<l;i++){if(e.isImmediateHandlerPropagationStopped()){return;}o=d[i].oDelegate;if(o[h]){o[h].call(d[i].vThis===true?t:d[i].vThis||o,e);}}}}b(this.aBeforeDelegates);if(e.isImmediateHandlerPropagationStopped()){return;}if(this[h]){this[h](e);}b(this.aDelegates);};a.prototype.init=function(){};a.prototype.exit=function(){};a.create=M.create;a.prototype.toString=function(){return"Element "+this.getMetadata().getName()+"#"+this.sId;};a.prototype.getDomRef=function(s){return q.sap.domById(s?this.getId()+"-"+s:this.getId());};a.prototype.$=function(s){return q(this.getDomRef(s));};a.prototype.isActive=function(){return this.oParent&&this.oParent.isActive();};a.prototype.prop=function(p,v){var P=this.getMetadata().getAllSettings()[p];if(P){if(arguments.length==1){return this[P._sGetter]();}else{this[P._sMutator](v);return this;}}};a.prototype.insertDependent=function(e,i){return this.insertAggregation("dependents",e,i,true);};a.prototype.addDependent=function(e){return this.addAggregation("dependents",e,true);};a.prototype.removeDependent=function(e){return this.removeAggregation("dependents",e,true);};a.prototype.removeAllDependents=function(){return this.removeAllAggregation("dependents",true);};a.prototype.destroyDependents=function(){return this.destroyAggregation("dependents",true);};a.prototype.rerender=function(){if(this.oParent){this.oParent.rerender();}};a.prototype.getUIArea=function(){return this.oParent?this.oParent.getUIArea():null;};a.prototype.destroy=function(s){if(this.bIsDestroyed){return;}a._updateFocusInfo(this);M.prototype.destroy.call(this,s);if(s!=="KeepDom"||this.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){this.$().remove();}else{q.sap.log.debug("DOM is not removed on destroy of "+this);}};a.prototype.fireEvent=function(e,p,A,b){if(this.hasListeners(e)){q.sap.interaction.notifyStepStart(this);}if(typeof p==='boolean'){b=A;A=p;p=null;}p=p||{};p.id=p.id||this.getId();return M.prototype.fireEvent.call(this,e,p,A,b);};a.prototype.addDelegate=function(d,c,t,C){if(!d){return this;}this.removeDelegate(d);if(typeof c==="object"){C=t;t=c;c=false;}if(typeof t==="boolean"){C=t;t=undefined;}(c?this.aBeforeDelegates:this.aDelegates).push({oDelegate:d,bClone:!!C,vThis:((t===this)?true:t)});return this;};a.prototype.removeDelegate=function(d){var i;for(i=0;i<this.aDelegates.length;i++){if(this.aDelegates[i].oDelegate==d){this.aDelegates.splice(i,1);i--;}}for(i=0;i<this.aBeforeDelegates.length;i++){if(this.aBeforeDelegates[i].oDelegate==d){this.aBeforeDelegates.splice(i,1);i--;}}return this;};a.prototype.addEventDelegate=function(d,t){return this.addDelegate(d,false,t,true);};a.prototype.removeEventDelegate=function(d){return this.removeDelegate(d);};a.prototype.getFocusDomRef=function(){return this.getDomRef()||null;};a.prototype.focus=function(){q.sap.focus(this.getFocusDomRef());};a.prototype.getFocusInfo=function(){return{id:this.getId()};};a.prototype.applyFocusInfo=function(F){this.focus();return this;};a.prototype._refreshTooltipBaseDelegate=function(t){var T=sap.ui.require('sap/ui/core/TooltipBase');if(T){var o=this.getTooltip();if(o instanceof T){this.removeDelegate(o);}if(t instanceof T){t._currentControl=this;this.addDelegate(t);}}};a.prototype.setTooltip=function(t){this._refreshTooltipBaseDelegate(t);this.setAggregation("tooltip",t);return this;};a.prototype.getTooltip=function(){return this.getAggregation("tooltip");};a.runWithPreprocessors=M.runWithPreprocessors;a.prototype.getTooltip_AsString=function(){var t=this.getTooltip();if(typeof t==="string"||t instanceof String){return t;}return undefined;};a.prototype.getTooltip_Text=function(){var t=this.getTooltip();if(t&&typeof t.getText==="function"){return t.getText();}return t;};(function(){var g=function(e,k){var d=e.getAggregation("customData");if(d){for(var i=0;i<d.length;i++){if(d[i].getKey()==k){return d[i];}}}return null;};var s=function(e,k,v,w){if(v===null){var d=g(e,k);if(!d){return;}var b=e.getAggregation("customData").length;if(b==1){e.destroyAggregation("customData",true);}else{e.removeAggregation("customData",d,true);d.destroy();}}else{var C=sap.ui.requireSync('sap/ui/core/CustomData');var d=g(e,k);if(d){d.setValue(v);d.setWriteToDom(w);}else{var d=new C({key:k,value:v,writeToDom:w});e.addAggregation("customData",d,true);}}};a.prototype.data=function(){var b=arguments.length;if(b==0){var d=this.getAggregation("customData"),r={};if(d){for(var i=0;i<d.length;i++){r[d[i].getKey()]=d[i].getValue();}}return r;}else if(b==1){var c=arguments[0];if(c===null){this.destroyAggregation("customData",true);return this;}else if(typeof c=="string"){var e=g(this,c);return e?e.getValue():null;}else if(typeof c=="object"){for(var k in c){s(this,k,c[k]);}return this;}else{throw new Error("When data() is called with one argument, this argument must be a string, an object or null, but is "+(typeof c)+":"+c+" (on UI Element with ID '"+this.getId()+"')");}}else if(b==2){s(this,arguments[0],arguments[1]);return this;}else if(b==3){s(this,arguments[0],arguments[1],arguments[2]);return this;}else{throw new Error("data() may only be called with 0-3 arguments (on UI Element with ID '"+this.getId()+"')");}};})();a.prototype.clone=function(I,l){var c=M.prototype.clone.apply(this,arguments);for(var i=0;i<this.aDelegates.length;i++){if(this.aDelegates[i].bClone){c.aDelegates.push(this.aDelegates[i]);}}for(var i=0;i<this.aBeforeDelegates.length;i++){if(this.aBeforeDelegates[i].bClone){c.aBeforeDelegates.push(this.aBeforeDelegates[i]);}}if(this._sapui_declarativeSourceInfo){c._sapui_declarativeSourceInfo=q.extend({},this._sapui_declarativeSourceInfo);}return c;};a.prototype.findElements=M.prototype.findAggregatedObjects;function f(e){var l=e.getParent();if(l){var o=q.Event("LayoutDataChange");o.srcControl=e;l._handleEvent(o);}}a.prototype.setLayoutData=function(l){this.setAggregation("layoutData",l,true);f(this);return this;};a.prototype.destroyLayoutData=function(){this.destroyAggregation("layoutData",true);f(this);return this;};a.prototype.bindElement=M.prototype.bindObject;a.prototype.unbindElement=M.prototype.unbindObject;a.prototype.getElementBinding=M.prototype.getObjectBinding;a.prototype._getFieldGroupIds=function(){var F;if(this.getMetadata().hasProperty("fieldGroupIds")){F=this.getFieldGroupIds();}if(!F||F.length==0){var p=this.getParent();if(p&&p._getFieldGroupIds){return p._getFieldGroupIds();}}return F||[];};a.prototype.getDomRefForSetting=function(s){var S=this.getMetadata().getAllSettings()[s];if(S&&S.selector){var d=this.getDomRef();if(d){d=d.parentNode;if(d&&d.querySelector){var b=S.selector.replace(/\{id\}/g,this.getId().replace(/(:|\.)/g,'\\$1'));return d.querySelector(b);}}}return null;};a.prototype._getMediaContainerWidth=function(){if(typeof this._oContextualSettings==="undefined"){return undefined;}return this._oContextualSettings.contextualWidth;};a.prototype._getCurrentMediaContainerRange=function(n){var w=this._getMediaContainerWidth();n=n||D.media.RANGESETS.SAP_STANDARD;return D.media.getCurrentRange(n,w);};a.prototype._onContextualSettingsChanged=function(){var w=this._getMediaContainerWidth(),s=w!==undefined,p=s^!!this._bUsingContextualWidth,l=this._aContextualWidthListeners||[];if(p){if(s){l.forEach(function(L){D.media.detachHandler(L.callback,L.listener,L.name);});}else{l.forEach(function(L){D.media.attachHandler(L.callback,L.listener,L.name);});}this._bUsingContextualWidth=s;}l.forEach(function(L){var m=this._getCurrentMediaContainerRange(L.name);if(m.from!==L.media.from){L.media=m;L.callback.call(L.listener||window,m);}},this);};a.prototype._attachMediaContainerWidthChange=function(F,l,n){n=n||D.media.RANGESETS.SAP_STANDARD;this._aContextualWidthListeners=this._aContextualWidthListeners||[];this._aContextualWidthListeners.push({callback:F,listener:l,name:n,media:this._getCurrentMediaContainerRange(n)});if(!this._bUsingContextualWidth){D.media.attachHandler(F,l,n);}};a.prototype._detachMediaContainerWidthChange=function(F,l,n){var L;n=n||D.media.RANGESETS.SAP_STANDARD;if(!this._aContextualWidthListeners){return;}for(var i=0,b=this._aContextualWidthListeners.length;i<b;i++){L=this._aContextualWidthListeners[i];if(L.callback===F&&L.listener===l&&L.name===n){if(!this._bUsingContextualWidth){D.media.detachHandler(F,l,n);}this._aContextualWidthListeners.splice(i,1);break;}}};return a;});
