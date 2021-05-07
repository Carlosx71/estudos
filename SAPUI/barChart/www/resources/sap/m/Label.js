/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/LabelEnablement','sap/ui/core/library','./LabelRenderer'],function(q,l,C,L,c,a){"use strict";var T=c.TextDirection;var b=c.TextAlign;var d=l.LabelDesign;var V=c.VerticalAlign;var e=C.extend("sap.m.Label",{metadata:{interfaces:["sap.ui.core.Label","sap.ui.core.IShrinkable","sap.m.IOverflowToolbarContent"],library:"sap.m",properties:{design:{type:"sap.m.LabelDesign",group:"Appearance",defaultValue:d.Standard},text:{type:"string",group:"Misc",defaultValue:null},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:b.Begin},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},required:{type:"boolean",group:"Misc",defaultValue:false},displayOnly:{type:"boolean",group:"Appearance",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:V.Inherit}},associations:{labelFor:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/m/designtime/Label.designtime"}});e.prototype.setText=function(t){var v=this.getText();if(v!==t){this.setProperty("text",t,true);this.$("bdi").html(q.sap.encodeHTML(this.getProperty("text")));if(t){this.$().removeClass("sapMLabelNoText");}else{this.$().addClass("sapMLabelNoText");}}return this;};e.prototype.setTooltip=function(t){var v=this.getTooltip();if(v!==t){this.setAggregation("tooltip",t,true);this.$().attr("title",this.getTooltip());}return this;};e.prototype.setDisplayOnly=function(f){if(typeof f!=="boolean"){q.sap.log.error("DisplayOnly property should be boolean. The new value will not be set");return this;}this.$().toggleClass("sapMLabelDisplayOnly",f);return C.prototype.setProperty.call(this,"displayOnly",f);};e.prototype.getAccessibilityInfo=function(){return{description:this.getText()};};e.prototype.getOverflowToolbarConfig=function(){var o={canOverflow:true,propsUnrelatedToSize:["design","required","displayOnly"]};function g(f){var h=f&&f.getLayoutData();if(i(h,"sap/m/OverflowToolbarLayoutData")){return h.getGroup();}}o.onBeforeEnterOverflow=function(f){var I=false,t,s,h,j,k;t=f.getParent();if(!i(t,"sap/m/OverflowToolbar")){return;}s=f.getLabelFor();h=s&&sap.ui.getCore().byId(s);if(!h||(t.indexOfContent(h)<0)){return;}j=g(f);k=g(h);I=j&&(j===k);f.toggleStyleClass("sapMLabelMediumMarginTop",I,true);};o.onAfterExitOverflow=function(f){f.toggleStyleClass("sapMLabelMediumMarginTop",false,true);};return o;};L.enrich(e.prototype);function i(o,m){if(o&&m){var f=sap.ui.require(m);return(typeof f==='function')&&(o instanceof f);}}return e;});