/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/library','sap/ui/Device','sap/m/Text','./ObjectHeaderRenderer'],function(q,l,C,I,c,D,T,O){"use strict";var B=l.BackgroundDesign;var a=c.TextAlign;var b=l.ImageHelper;var d=l.ObjectMarkerType;var e=c.TitleLevel;var f=c.TextDirection;var V=c.ValueState;var g=C.extend("sap.m.ObjectHeader",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ObjectHeader.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},intro:{type:"string",group:"Misc",defaultValue:null},introActive:{type:"boolean",group:"Misc",defaultValue:null},titleActive:{type:"boolean",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconActive:{type:"boolean",group:"Misc",defaultValue:null},iconAlt:{type:"string",group:"Accessibility",defaultValue:null},iconTooltip:{type:"string",group:"Accessibility",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},markFavorite:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},markFlagged:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},showMarkers:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},showTitleSelector:{type:"boolean",group:"Misc",defaultValue:false},numberState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:V.None},condensed:{type:"boolean",group:"Appearance",defaultValue:false},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance"},responsive:{type:"boolean",group:"Behavior",defaultValue:false},fullScreenOptimized:{type:"boolean",group:"Appearance",defaultValue:false},titleHref:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},titleTarget:{type:"string",group:"Behavior",defaultValue:null},introHref:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},introTarget:{type:"string",group:"Behavior",defaultValue:null},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:f.Inherit},introTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:f.Inherit},numberTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:f.Inherit},titleSelectorTooltip:{type:"string",group:"Misc",defaultValue:"Options"},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:e.H1}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},firstStatus:{type:"sap.m.ObjectStatus",multiple:false,deprecated:true},secondStatus:{type:"sap.m.ObjectStatus",multiple:false,deprecated:true},statuses:{type:"sap.ui.core.Control",multiple:true,singularName:"status"},_objectNumber:{type:"sap.m.ObjectNumber",multiple:false,visibility:"hidden"},additionalNumbers:{type:"sap.m.ObjectNumber",multiple:true,singularName:"additionalNumber"},headerContainer:{type:"sap.m.ObjectHeaderContainer",multiple:false},markers:{type:"sap.m.ObjectMarker",multiple:true,singularName:"marker"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{titlePress:{parameters:{domRef:{type:"object"}}},introPress:{parameters:{domRef:{type:"object"}}},iconPress:{parameters:{domRef:{type:"object"}}},titleSelectorPress:{parameters:{domRef:{type:"object"}}}}}});g.prototype.init=function(){var L=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTitleArrowIcon=I.createControlByURI({id:this.getId()+"-titleArrow",src:I.getIconURI("arrow-down"),decorative:false,visible:false,tooltip:L.getText("OH_SELECT_ARROW_TOOLTIP"),size:"1.375rem",press:function(E){}});this._fNumberWidth=undefined;this._titleText=new T(this.getId()+"-titleText");this._titleText.setMaxLines(3);};g.prototype.insertAttribute=function(A,i){var r=this.insertAggregation("attributes",A,i);this._registerControlListener(A);return r;};g.prototype.addAttribute=function(A){var r=this.addAggregation("attributes",A);this._registerControlListener(A);return r;};g.prototype.removeAttribute=function(A){var r=this.removeAggregation("attributes",A);this._deregisterControlListener(r);return r;};g.prototype.removeAllAttributes=function(){var A=this.removeAllAggregation("attributes");A.forEach(this._deregisterControlListener,this);return A;};g.prototype.destroyAttributes=function(){var A=this.getAggregation("attributes");if(A!==null){A.forEach(this._deregisterControlListener,this);}return this.destroyAggregation("attributes");};g.prototype.insertStatus=function(s,i){var r=this.insertAggregation("statuses",s,i);this._registerControlListener(s);return r;};g.prototype.addStatus=function(s){var r=this.addAggregation("statuses",s);this._registerControlListener(s);return r;};g.prototype.removeStatus=function(s){var r=this.removeAggregation("statuses",s);this._deregisterControlListener(r);return r;};g.prototype.removeAllStatuses=function(){var s=this.removeAllAggregation("statuses");s.forEach(this._deregisterControlListener,this);return s;};g.prototype.destroyStatuses=function(){var s=this.getAggregation("statuses");if(s!==null){s.forEach(this._deregisterControlListener,this);}return this.destroyAggregation("statuses");};g.prototype._registerControlListener=function(o){if(o){o.attachEvent("_change",this.invalidate,this);}};g.prototype._deregisterControlListener=function(o){if(o){o.detachEvent("_change",this.invalidate,this);}};g.prototype.setCondensed=function(h){this.setProperty("condensed",h);if(this.getCondensed()){this._oTitleArrowIcon.setSize("1rem");}else{this._oTitleArrowIcon.setSize("1.375rem");}return this;};g.prototype.setNumber=function(n){this.setProperty("number",n);this._getObjectNumber().setNumber(n);return this;};g.prototype.setNumberUnit=function(u){this.setProperty("numberUnit",u);this._getObjectNumber().setUnit(u);return this;};g.prototype.setNumberState=function(s){this.setProperty("numberState",s,true);this._getObjectNumber().setState(s);return this;};g.prototype.setTitleSelectorTooltip=function(t){this.setProperty("titleSelectorTooltip",t,false);this._oTitleArrowIcon.setTooltip(t);return this;};g.prototype.setMarkFavorite=function(m){return this._setOldMarkers(d.Favorite,m);};g.prototype.setMarkFlagged=function(m){return this._setOldMarkers(d.Flagged,m);};g.prototype.setShowMarkers=function(m){var M,A=this.getMarkers(),i;this.setProperty("showMarkers",m,false);for(i=0;i<A.length;i++){M=A[i].getType();if((M===d.Flagged&&this.getMarkFlagged())||(M===d.Favorite&&this.getMarkFavorite())){A[i].setVisible(m);}}return this;};g.prototype._setOldMarkers=function(m,M){var A=this.getMarkers(),h=false,i,o={Flagged:"-flag",Favorite:"-favorite"};this.setProperty("mark"+m,M,false);if(!this.getShowMarkers()){M=false;}for(i=0;i<A.length;i++){if(A[i].getType()===m){h=true;A[i].setVisible(M);break;}}if(!h){this.insertAggregation("markers",new sap.m.ObjectMarker({id:this.getId()+o[m],type:m,visible:M}));}return this;};g.prototype._getVisibleMarkers=function(){var A=this.getMarkers(),v=[],i;for(i=0;i<A.length;i++){if(A[i].getVisible()){v.push(A[i]);}}return v;};g.prototype._getObjectNumber=function(){var o=this.getAggregation("_objectNumber");if(!o){o=new sap.m.ObjectNumber(this.getId()+"-number",{emphasized:false});this.setAggregation("_objectNumber",o,true);}return o;};g.prototype.getFocusDomRef=function(){if(this.getResponsive()){return this.$("txt");}else{return this.$("title");}};g.prototype.ontap=function(E){var s=E.target.id;if(this.getIntroActive()&&s===this.getId()+"-intro"){if(!this.getIntroHref()){this.fireIntroPress({domRef:q.sap.domById(s)});}}else if(!this.getResponsive()&&this.getTitleActive()&&(s===this.getId()+"-title"||q(E.target).parent().attr('id')===this.getId()+"-title"||s===this.getId()+"-titleText-inner")){if(!this.getTitleHref()){E.preventDefault();s=this.getId()+"-title";this.fireTitlePress({domRef:q.sap.domById(s)});}}else if(this.getResponsive()&&this.getTitleActive()&&(s===this.getId()+"-txt"||q(E.target).parent().attr('id')===this.getId()+"-txt")){if(!this.getTitleHref()){E.preventDefault();s=this.getId()+"-txt";this.fireTitlePress({domRef:q.sap.domById(s)});}}else if(this.getIconActive()&&(s===this.getId()+"-img"||s===this.getId()+"-icon")){this.fireIconPress({domRef:q.sap.domById(s)});}else if(s===this.getId()+"-titleArrow"){this.fireTitleSelectorPress({domRef:q.sap.domById(s)});}else{E.setMarked();E.preventDefault();}};g.prototype._handleSpaceOrEnter=function(E){var s=E.target.id;E.setMarked();if(!this.getResponsive()&&this.getTitleActive()&&(s===this.getId()+"-title"||q(E.target).parent().attr('id')===this.getId()+"-title"||s===this.getId()+"-titleText-inner")){if(E.type==="sapspace"){E.preventDefault();}s=this.getId()+"-title";if(!this.getTitleHref()){E.preventDefault();this.fireTitlePress({domRef:q.sap.domById(s)});}else{if(E.type==="sapspace"){this._linkClick(E,s);}}}else if(this.getResponsive()&&this.getTitleActive()&&(s===this.getId()+"-txt"||q(E.target).parent().attr('id')===this.getId()+"-txt")){if(E.type==="sapspace"){E.preventDefault();}s=this.getId()+"-txt";if(!this.getTitleHref()){E.preventDefault();this.fireTitlePress({domRef:q.sap.domById(s)});}else{if(E.type==="sapspace"){this._linkClick(E,s);}}}else if(this.getIntroActive()&&s===this.getId()+"-intro"){if(E.type==="sapspace"){E.preventDefault();}if(!this.getIntroHref()){this.fireIntroPress({domRef:q.sap.domById(s)});}}else if(this.getIconActive()&&q(E.target).is('.sapMOHIcon,.sapMOHRIcon')){if(E.type==="sapspace"){E.preventDefault();}var i=q.sap.domById(this.getId()+"-icon");if(!i){i=q.sap.domById(this.getId()+"-img");}this.fireIconPress({domRef:i});}else if(s===this.getId()+"-titleArrow"){if(E.type==="sapspace"){E.preventDefault();}this.fireTitleSelectorPress({domRef:q.sap.domById(s)});}};g.prototype.onsapspace=g.prototype._handleSpaceOrEnter;g.prototype.onsapenter=g.prototype._handleSpaceOrEnter;g.prototype._linkClick=function(E,s){E.setMarked();var o=document.createEvent('MouseEvents');o.initEvent('click',false,true);q.sap.domById(s).dispatchEvent(o);};g.prototype._onOrientationChange=function(){var i=this.getId();if(D.system.tablet&&this.getFullScreenOptimized()&&(this._hasAttributes()||this._hasStatus())){this._rerenderStates();}if(D.system.phone){if(D.orientation.portrait){if(this.getTitle().length>50){this._rerenderTitle(50);}if(this.getIcon()){q.sap.byId(i+"-titlediv").removeClass("sapMOHRTitleIcon");q.sap.byId(i+"-titleIcon").addClass("sapMOHRHideIcon");}}else{if(D.orientation.landscape){if(this.getTitle().length>80){this._rerenderTitle(80);}if(this.getIcon()){q.sap.byId(i+"-titlediv").addClass("sapMOHRTitleIcon");q.sap.byId(i+"-titleIcon").removeClass("sapMOHRHideIcon");}}}this._adjustNumberDiv();}this._adjustIntroDiv();};g.prototype._rerenderTitle=function(n){var r=sap.ui.getCore().createRenderManager();this.getRenderer()._rerenderTitle(r,this,n);r.destroy();};g.prototype._rerenderStates=function(){var r=sap.ui.getCore().createRenderManager();this.getRenderer()._rerenderResponsiveStates(r,this);r.destroy();};g.prototype.exit=function(){if(!D.system.phone){this._detachMediaContainerWidthChange(this._rerenderOHR,this,D.media.RANGESETS.SAP_STANDARD);}if(D.system.tablet||D.system.phone){D.orientation.detachHandler(this._onOrientationChange,this);}if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=undefined;}if(this._oTitleArrowIcon){this._oTitleArrowIcon.destroy();this._oTitleArrowIcon=undefined;}if(this._titleText){this._titleText.destroy();this._titleText=undefined;}if(this._introText){this._introText.destroy();this._introText=undefined;}};g.prototype._getImageControl=function(){var i=this.getId()+"-img";var s="2.5rem";var p=q.extend({src:this.getIcon(),tooltip:this.getIconTooltip(),alt:this.getIconAlt(),useIconTooltip:false,densityAware:this.getIconDensityAware()},I.isIconURI(this.getIcon())?{size:s}:{});this._oImageControl=b.getImageControl(i,this._oImageControl,this,p);return this._oImageControl;};g.prototype.onBeforeRendering=function(){if(D.system.tablet||D.system.phone){D.orientation.detachHandler(this._onOrientationChange,this);}if(!D.system.phone){this._detachMediaContainerWidthChange(this._rerenderOHR,this,D.media.RANGESETS.SAP_STANDARD);}if(this._introText){this._introText.destroy();this._introText=undefined;}};g.prototype.onAfterRendering=function(){var o=this.getAggregation("_objectNumber");var p=sap.ui.getCore().getConfiguration().getRTL();var $=this.$("titleArrow");$.attr("role","button");if(this.getResponsive()){this._adjustIntroDiv();if(o&&o.getNumber()){if(D.system.desktop&&q('html').hasClass("sapUiMedia-Std-Desktop")&&this.getFullScreenOptimized()&&this._iCountVisAttrStat>=1&&this._iCountVisAttrStat<=3){o.setTextAlign(p?a.Right:a.Left);}else{o.setTextAlign(p?a.Left:a.Right);}}this._adjustNumberDiv();if(D.system.tablet||D.system.phone){D.orientation.attachHandler(this._onOrientationChange,this);}if(!D.system.phone){this._attachMediaContainerWidthChange(this._rerenderOHR,this,D.media.RANGESETS.SAP_STANDARD);}}else{var t=p?a.Left:a.Right;if(o&&o.getNumber()){o.setTextAlign(t);}if(this.getAdditionalNumbers()){this._setTextAlignANum(t);}}};g.prototype._rerenderOHR=function(){this.invalidate();};g.prototype._adjustNumberDiv=function(){var i=this.getId();var o=this.getAggregation("_objectNumber");var p=sap.ui.getCore().getConfiguration().getRTL();if(o&&o.getNumber()){var $=q.sap.byId(i+"-number");var h=q.sap.byId(i+"-titlediv");if(this._isMediaSize("Phone")){if($.hasClass("sapMObjectNumberBelowTitle")){o.setTextAlign(p?a.Left:a.Right);$.removeClass("sapMObjectNumberBelowTitle");h.removeClass("sapMOHRTitleDivFull");}var n=$.parent().width()*0.4;if($.outerWidth()>n){o.setTextAlign(p?a.Right:a.Left);$.addClass("sapMObjectNumberBelowTitle");h.addClass("sapMOHRTitleDivFull");}}}};g.prototype._adjustIntroDiv=function(){var i=this.getId();var $=q.sap.byId(i+"-txt");var h=q.sap.byId(i+"-titleArrow");var j=q.sap.byId(i+"-intro");if(j.parent().hasClass("sapMOHRIntroMargin")){j.parent().removeClass("sapMOHRIntroMargin");}if(h.height()!==null&&($.height()<h.height())){j.parent().addClass("sapMOHRIntroMargin");}};g._escapeId=function(i){return i?"#"+i.replace(/(:|\.)/g,'\\$1'):"";};g.prototype._hasBottomContent=function(){return(this._hasAttributes()||this._hasStatus()||this._hasMarkers());};g.prototype._hasIcon=function(){return!!this.getIcon().trim();};g.prototype._hasAttributes=function(){var h=this.getAttributes();if(h&&h.length>0){for(var i=0;i<h.length;i++){if(!h[i]._isEmpty()){return true;}}}return false;};g.prototype._hasStatus=function(){var h=((this.getFirstStatus()&&!this.getFirstStatus()._isEmpty())||(this.getSecondStatus()&&!this.getSecondStatus()._isEmpty()));if(!h&&this.getStatuses()&&this.getStatuses().length>0){var s=this.getStatuses();for(var i=0;i<s.length;i++){if(s[i]instanceof sap.m.ObjectStatus&&!s[i]._isEmpty()){h=true;break;}else if(s[i]instanceof sap.m.ProgressIndicator){h=true;break;}}}return h;};g.prototype._hasMarkers=function(){var m=this.getMarkers(),h=this.getShowMarkers()&&(this.getMarkFavorite()||this.getMarkFlagged()),H=m&&m.length;return(h||H);};g.prototype._getDefaultBackgroundDesign=function(){if(this.getCondensed()){return B.Solid;}else{if(this.getResponsive()){return B.Translucent;}else{return B.Transparent;}}};g.prototype._getBackground=function(){if(this.getBackgroundDesign()===undefined){return this._getDefaultBackgroundDesign();}else{return this.getBackgroundDesign();}};g.prototype._setTextAlignANum=function(t){var n=this.getAdditionalNumbers();for(var i=0;i<n.length;i++){n[i].setTextAlign(t);}};g.prototype._isMediaSize=function(r){return this._getCurrentMediaContainerRange(D.media.RANGESETS.SAP_STANDARD).name===r;};return g;});
