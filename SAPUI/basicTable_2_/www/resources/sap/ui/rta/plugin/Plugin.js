/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/Plugin','sap/ui/fl/Utils','sap/ui/fl/registry/ChangeRegistry','sap/ui/dt/OverlayRegistry','sap/ui/dt/OverlayUtil','sap/ui/dt/ElementOverlay','sap/ui/fl/changeHandler/JsControlTreeModifier','sap/ui/base/ManagedObject'],function(P,F,C,O,a,E,J,M){"use strict";E.prototype._bElementHasStableId=undefined;E.prototype.getElementHasStableId=function(){return this._bElementHasStableId;};E.prototype.setElementHasStableId=function(h){this._bElementHasStableId=h;};E.prototype.hasElementStableId=function(){return this._bElementHasStableId?true:false;};var B=P.extend("sap.ui.rta.plugin.Plugin",{metadata:{"abstract":true,library:"sap.ui.rta",properties:{commandFactory:{type:"object",multiple:false}},events:{elementModified:{command:{type:"sap.ui.rta.command.BaseCommand"}}}}});B.prototype._isEditable=function(){};var _=function(e){var p=e.getParameters();var r;var o=sap.ui.getCore().byId(p.id);if((p.type==="propertyChanged"&&p.name==="visible")){r=this._getRelevantOverlays(o);this.evaluateEditable(r,{onRegistration:false});}else if(p.type==="overlayRendered"){this.evaluateEditable([o],{onRegistration:true});}else if(p.type==="insertAggregation"||p.type==="removeAggregation"){r=this._getRelevantOverlays(o,p.name);this.evaluateEditable(r,{onRegistration:false});}};B.prototype._detachReevaluationEditable=function(o){o.detachElementModified(_,this);};B.prototype._attachReevaluationEditable=function(o){var g=function(e){if(e.getSource().getGeometry()&&e.getSource().getGeometry().visible){this.evaluateEditable([o],{onRegistration:true});o.detachEvent('geometryChanged',g,this);}};o.attachElementModified(_,this);if(!o.getGeometry()||!o.getGeometry().visible){o.attachEvent('geometryChanged',g,this);}};B.prototype._getRelevantOverlays=function(o,A){var c=o.getRelevantOverlays();if(c.length===0){var r=a.findAllOverlaysInContainer(o);if(A){var d=o.getAggregationOverlay(A).getChildren();d=d.filter(function(e){return r.indexOf(e)===-1;});r=r.concat(d);}o.setRelevantOverlays(r);return r;}return c;};function b(e){return e.some(function(s){return s&&a.isInAggregationBinding(O.getOverlay(s),s.sParentAggregationName);});}B.prototype.evaluateEditable=function(o,p){var c=this.getDesignTime()?this.getDesignTime().getPlugins():[];var s=c.some(function(d){return d.isBusy&&d.isBusy();});if(s){return;}var e;o.forEach(function(d){var i=false;var S=d.getDesignTimeMetadata().getStableElements(d);if(S[0]instanceof M){i=b(S);}if(i){e=false;}else{e=d.getElement()&&d.getDesignTimeMetadata()&&this._isEditable(d,p);}if(e!==undefined&&e!==null){if(typeof e==="boolean"){this._modifyPluginList(d,e);}else{this._modifyPluginList(d,e.asChild,false);this._modifyPluginList(d,e.asSibling,true);}}}.bind(this));};B.prototype._modifyPluginList=function(o,i,c){if(i){this.addToPluginsList(o,c);}else{this.removeFromPluginsList(o,c);}};B.prototype._retrievePluginName=function(s){var n=this.getMetadata().getName();if(s!==undefined){n+=s?".asSibling":".asChild";}return n;};B.prototype._isEditableByPlugin=function(o,s){var p=this._retrievePluginName(s);var c=o.getEditableByPlugins();return c.indexOf(p)>-1;};B.prototype.registerElementOverlay=function(o){this.evaluateEditable([o],{onRegistration:true});this._attachReevaluationEditable(o);};B.prototype.deregisterElementOverlay=function(o){this.removeFromPluginsList(o);this.removeFromPluginsList(o,true);this.removeFromPluginsList(o,false);this._detachReevaluationEditable(o);};B.prototype.hasStableId=function(o){if(!o){return false;}if(!o.getDesignTimeMetadata()){return false;}if(o.getElementHasStableId()===undefined){var s=o.getDesignTimeMetadata().getStableElements(o);var u=s.length>0?s.some(function(S){var c=S.id||S;if(!F.checkControlId(c,S.appComponent)){return true;}}):true;o.setElementHasStableId(!u);}return o.hasElementStableId();};B.prototype.getVariantManagementReference=function(o,A,f,s){var e;if(!s){e=o.getElement();}else{e=s;}var r;if((A.changeOnRelevantContainer||f)&&!s){r=o.getRelevantContainer();}else{r=e;}var v;if(o.getVariantManagement&&this._hasVariantChangeHandler(A.changeType,r)){v=o.getVariantManagement();}return v;};B.prototype._hasVariantChangeHandler=function(c,e){var o=this._getChangeHandler(c,e);return(o&&o.revertChange);};B.prototype.checkAggregationsOnSelf=function(o,A){var d=o.getDesignTimeMetadata();var e=o.getElement();var i=false;var c=d.getActionDataFromAggregations(A,o.getElement())[0];var s=c?c.changeType:null;var f=c&&c.changeOnRelevantContainer;if(f){e=o.getRelevantContainer();var r=O.getOverlay(e);if(!this.hasStableId(r)){return false;}}if(s&&this.hasChangeHandler(s,e)){i=true;}return i;};B.prototype.removeFromPluginsList=function(o,s){var n=this._retrievePluginName(s);o.removeEditableByPlugin(n);if(!o.getEditableByPlugins().length){o.setEditable(false);}};B.prototype.addToPluginsList=function(o,s){var n=this._retrievePluginName(s);var p=o.getEditableByPlugins();if(p.indexOf(n)===-1){o.addEditableByPlugin(n);o.setEditable(true);}};B.prototype.hasChangeHandler=function(c,e){return!!this._getChangeHandler(c,e);};B.prototype._getChangeHandler=function(c,e,s){if(!s){s=e.getMetadata().getName();}var l=this.getCommandFactory().getFlexSettings().layer;return C.getInstance().getChangeHandler(c,s,e,J,l);};B.prototype._checkRelevantContainerStableID=function(A,e){if(A.changeOnRelevantContainer){var r=e.getRelevantContainer();var R=O.getOverlay(r);if(!this.hasStableId(R)){return false;}}return true;};return B;},true);
