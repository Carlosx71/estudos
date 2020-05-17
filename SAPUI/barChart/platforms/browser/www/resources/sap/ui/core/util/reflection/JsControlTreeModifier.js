/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseTreeModifier","jquery.sap.global","sap/ui/core/Component"],function(B,q,C){"use strict";var J={targets:"jsControlTree",setVisible:function(c,v){if(c.setVisible){this.unbindProperty(c,"visible");c.setVisible(v);}else{throw new Error("Provided control instance has no setVisible method");}},getVisible:function(c){if(c.getVisible){return c.getVisible();}else{throw new Error("Provided control instance has no getVisible method");}},setStashed:function(c,s,a){if(c.setStashed){var u;if(c.getStashed()===true&&s===false){c.setStashed(s);if(a instanceof C){u=this.bySelector(this.getSelector(c,a),a);}}if((u||c)["setVisible"]){this.setVisible(u||c,!s);}return u;}else{throw new Error("Provided control instance has no setStashed method");}},getStashed:function(c){if(c.getStashed){return typeof c.getStashed()!=="boolean"?!this.getVisible(c):c.getStashed();}else{throw new Error("Provided control instance has no getStashed method");}},bindProperty:function(c,p,b){c.bindProperty(p,b);},unbindProperty:function(c,p){if(c){c.unbindProperty(p,true);}},setProperty:function(c,p,P){var m=c.getMetadata().getPropertyLikeSetting(p);this.unbindProperty(c,p);if(m){var s=m._sMutator;c[s](P);}},getProperty:function(c,p){var m=c.getMetadata().getPropertyLikeSetting(p);if(m){var P=m._sGetter;return c[P]();}},isPropertyInitial:function(c,p){return c.isPropertyInitial(p);},setPropertyBinding:function(c,p,P){this.unbindProperty(c,p);var s={};s[p]=P;c.applySettings(s);},getPropertyBinding:function(c,p){return c.getBindingInfo(p);},createControl:function(c,a,v,s,S){if(this.bySelector(s,a)){throw new Error("Can't create a control with duplicated id "+s);}q.sap.require(c);var b=q.sap.getObject(c);var i=this.getControlIdBySelector(s,a);return new b(i,S);},applySettings:function(c,s){c.applySettings(s);},byId:function(i){return this._byId(i);},_byId:function(i){return sap.ui.getCore().byId(i);},getId:function(c){return c.getId();},getParent:function(c){return c.getParent();},getControlType:function(c){return c&&c.getMetadata().getName();},getAllAggregations:function(p){return p.getMetadata().getAllAggregations();},getAggregation:function(p,n){var a=this.findAggregation(p,n);if(a){return p[a._sGetter]();}},insertAggregation:function(p,n,o,i){var a=this.findAggregation(p,n);if(a){if(a.multiple){var I=i||0;p[a._sInsertMutator](o,I);}else{p[a._sMutator](o);}}},removeAggregation:function(c,n,o){var a=this.findAggregation(c,n);if(a){c[a._sRemoveMutator](o);}},removeAllAggregation:function(c,n){var a=this.findAggregation(c,n);if(a){c[a._sRemoveAllMutator]();}},getBindingTemplate:function(c,a){var b=c.getBindingInfo(a);return b&&b.template;},updateAggregation:function(c,a){var A=this.findAggregation(c,a);if(A){c[A._sDestructor]();c.updateAggregation(a);}},findIndexInParentAggregation:function(c){var p=this.getParent(c),a;if(!p){return-1;}a=this.getAggregation(p,this.getParentAggregationName(c));if(Array.isArray(a)){return a.indexOf(c);}else{return 0;}},getParentAggregationName:function(c){return c.sParentAggregationName;},findAggregation:function(c,a){if(c){if(c.getMetadata){var m=c.getMetadata();var A=m.getAllAggregations();if(A){return A[a];}}}},validateType:function(c,a,p,f){var t=a.type;if(a.multiple===false&&this.getAggregation(p,a.name)&&this.getAggregation(p,a.name).length>0){return false;}return this._isInstanceOf(c,t)||this._hasInterface(c,t);},instantiateFragment:function(f,n,v){var F=q.sap.parseXML(f);F=this._checkAndPrefixIdsInFragment(F,n);var N;var i=v&&v.getId();var c=v.getController();N=sap.ui.xmlfragment({fragmentContent:F,sId:i},c);if(!Array.isArray(N)){N=[N];}return N;},getChangeHandlerModulePath:function(c){if(typeof c==="object"&&typeof c.data==="function"&&c.data("sap-ui-custom-settings")&&c.data("sap-ui-custom-settings")["sap.ui.fl"]){return c.data("sap-ui-custom-settings")["sap.ui.fl"].flexibility;}else{return undefined;}}};return q.sap.extend(true,{},B,J);},true);
