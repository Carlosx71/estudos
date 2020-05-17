/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/InvisibleText','sap/ui/core/library','sap/ui/core/ResizeHandler','sap/base/Log','./library','./SliderTooltipContainer','./SliderTooltip','./SliderUtilities','./SliderRenderer','./ResponsiveScale'],function(q,C,E,I,c,R,l,a,S,b,d,e,f){"use strict";var t=a.touch;var g=C.extend("sap.m.Slider",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},enabled:{type:"boolean",group:"Behavior",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},min:{type:"float",group:"Data",defaultValue:0},max:{type:"float",group:"Data",defaultValue:100},step:{type:"float",group:"Data",defaultValue:1},progress:{type:"boolean",group:"Misc",defaultValue:true},value:{type:"float",group:"Data",defaultValue:0},showHandleTooltip:{type:"boolean",group:"Appearance",defaultValue:true},showAdvancedTooltip:{type:"boolean",group:"Appearance",defaultValue:false},inputsAsTooltips:{type:"boolean",group:"Appearance",defaultValue:false},enableTickmarks:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"scale",aggregations:{_tooltipContainer:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},scale:{type:"sap.m.IScale",multiple:false,singularName:"scale"},_defaultScale:{type:"sap.m.ResponsiveScale",multiple:false,visibility:"hidden"},_defaultTooltips:{type:"sap.m.SliderTooltipBase",multiple:true,visibility:"hidden"},customTooltips:{type:"sap.m.SliderTooltipBase",multiple:true},_handlesLabels:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}},designtime:"sap/m/designtime/Slider.designtime"}});E.apply(g.prototype,[true]);g.prototype._getUsedScale=function(){if(!this.getEnableTickmarks()){return;}return this.getAggregation('scale')||this.getAggregation('_defaultScale');};g.prototype._syncScaleUsage=function(){var h=this.getEnableTickmarks(),u=this.getAggregation('scale'),D=this.getAggregation("_defaultScale");if((D&&!h)||(u&&D)){this.destroyAggregation("_defaultScale",true);}if(h&&!u&&!D){this.setAggregation("_defaultScale",new f(),true);}};g.prototype._showTooltipsIfNeeded=function(){if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);this.updateAdvancedTooltipDom(this.getValue());}};g.prototype._convertValueToRtlMode=function(v){return this.getMax()-v+this.getMin();};g.prototype._recalculateStyles=function(){var s=this.$();this._fSliderWidth=s.width();this._fSliderPaddingLeft=parseFloat(s.css("padding-left"));this._fSliderOffsetLeft=s.offset().left;this._fHandleWidth=this.$("handle").width();};g.prototype._validateProperties=function(){var m=this.getMin(),M=this.getMax(),s=this.getStep(),h=false,i=false;if(m>=M){h=true;i=true;l.warning("Warning: "+"Property wrong min: "+m+" >= max: "+M+" on ",this);}if(s<=0){l.warning("Warning: "+"The step could not be negative on ",this);}if(s>(M-m)&&!h){i=true;l.warning("Warning: "+"Property wrong step: "+s+" > max: "+M+" - "+"min: "+m+" on ",this);}return i;};g.prototype._getPercentOfValue=function(v){return d.getPercentOfValue(v,this.getMin(),this.getMax());};g.prototype._getValueOfPercent=function(p){var m=this.getMin(),v=(p*(this.getMax()-m)/100)+m,n=this.toFixed(v,this.getDecimalPrecisionOfNumber(this.getStep()));return Number(n);};g.prototype._validateStep=function(s){if(typeof s==="undefined"){return 1;}if(typeof s!=="number"){l.warning('Warning: "iStep" needs to be a number',this);return 0;}if((Math.floor(s)===s)&&isFinite(s)){return s;}l.warning('Warning: "iStep" needs to be a finite interger',this);return 0;};g.prototype._handleSliderResize=function(o){var s=this._getUsedScale();if(this.getEnableTickmarks()&&s&&s.handleResize){s.handleResize(o);}if(this.getShowAdvancedTooltip()){this._handleTooltipContainerResponsiveness();}};g.prototype._handleTooltipContainerResponsiveness=function(){this.getAggregation("_tooltipContainer").setWidth(this.$().width()+"px");};g.prototype.getDecimalPrecisionOfNumber=function(v){if(Math.floor(v)===v){return 0;}var V=v.toString(),i=V.indexOf("."),h=V.indexOf("e-"),j=h!==-1,k=i!==-1;if(j){var m=+V.slice(h+2);if(k){return m+V.slice(i+1,h).length;}return m;}if(k){return V.length-i-1;}return 0;};g.prototype.toFixed=function(n,D){if(D===undefined){D=this.getDecimalPrecisionOfNumber(n);}if(D>20){D=20;}else if(D<0){D=0;}return n.toFixed(D)+"";};g.prototype.setDomValue=function(n){var D=this.getDomRef(),s=this._formatValueByCustomElement(n),T=this.getAggregation("_tooltipContainer");if(!D){return;}var p=Math.max(this._getPercentOfValue(+n),0)+"%",h=this.getDomRef("handle");if(!!this.getName()){this.getDomRef("input").setAttribute("value",s);}if(this.getProgress()){this.getDomRef("progress").style.width=p;}h.style[sap.ui.getCore().getConfiguration().getRTL()?"right":"left"]=p;if(this.getShowAdvancedTooltip()&&T.getDomRef()){this.updateAdvancedTooltipDom(n);}if(this.getShowHandleTooltip()&&!this.getShowAdvancedTooltip()){h.title=s;}this._updateHandleAriaAttributeValues(h,n,s);};g.prototype._updateHandleAriaAttributeValues=function(h,v,s){if(this._isElementsFormatterNotNumerical(v)){h.setAttribute("aria-valuenow",v);h.setAttribute("aria-valuetext",s);}else{h.setAttribute("aria-valuenow",s);h.removeAttribute("aria-valuetext");}};g.prototype._formatValueByCustomElement=function(v,p){var s=this._getUsedScale(),T=this.getUsedTooltips()[0],F=""+v;if(p==='slider'){return F;}if(this.getEnableTickmarks()&&s&&s.getLabel){F=""+s.getLabel(v,this);}if(p==='scale'){return F;}if(this.getShowAdvancedTooltip()&&T&&T.getLabel){F=""+T.getLabel(v,this);}return F;};g.prototype._isElementsFormatterNotNumerical=function(v){var V=this._formatValueByCustomElement(v);return isNaN(V);};g.prototype.updateAdvancedTooltipDom=function(n){var T=this.getUsedTooltips();this.updateTooltipsPositionAndState(T[0],parseFloat(n));};g.prototype.getUsedTooltips=function(){var h=this.getCustomTooltips(),D=this.getAggregation("_defaultTooltips")||[];return h.length?h:D;};g.prototype.updateTooltipsPositionAndState=function(T,v){var o=this.getAggregation("_tooltipContainer");T.setValue(v);o.repositionTooltips(this.getMin(),this.getMax());};g.prototype.getClosestHandleDomRef=function(){return this.getDomRef("handle");};g.prototype._increaseValueBy=function(i){var v,n;if(this.getEnabled()){v=this.getValue();this.setValue(v+(i||1));n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}};g.prototype._decreaseValueBy=function(D){var v,n;if(this.getEnabled()){v=this.getValue();this.setValue(v-(D||1));n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}};g.prototype._getLongStep=function(){var m=this.getMin(),M=this.getMax(),s=this.getStep(),L=(M-m)/10,i=(M-m)/s;return i>10?L:s;};g.prototype._fireChangeAndLiveChange=function(p){this.fireChange(p);this.fireLiveChange(p);};g.prototype.handleTooltipChange=function(o){var n=parseFloat(o.getParameter("value"));this.setValue(n);this._fireChangeAndLiveChange({value:n});};g.prototype.init=function(){var s;this._iActiveTouchId=-1;this._bSetValueFirstCall=true;this._fValueBeforeFocus=0;this._parentResizeHandler=null;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTooltipContainer=null;s=new I({text:this._oResourceBundle.getText("SLIDER_HANDLE")});this.addAggregation("_handlesLabels",s);};g.prototype.exit=function(){if(this._oResourceBundle){this._oResourceBundle=null;}if(this._parentResizeHandler){R.deregister(this._parentResizeHandler);this._parentResizeHandler=null;}};g.prototype.onBeforeRendering=function(){var h=this._validateProperties();if(!h){this.setValue(this.getValue());this._sProgressValue=Math.max(this._getPercentOfValue(this.getValue()),0)+"%";}if(this.getShowAdvancedTooltip()){this.initAndSyncTooltips(["leftTooltip"]);}this._syncScaleUsage();};g.prototype.forwardProperties=function(p,o){p.forEach(function(P){o.setProperty(P,this.getProperty(P),true);},this);};g.prototype.forwardPropertiesToDefaultTooltips=function(T){var D=this.getAggregation("_defaultTooltips")||[];for(var i=0;i<T;i++){this.forwardProperties(["min","max","step"],D[i]);D[i].setProperty("width",this._getMaxTooltipWidth()+"px",true);D[i].setProperty("editable",this.getInputsAsTooltips(),true);}};g.prototype.associateCustomTooltips=function(T){this.destroyAggregation("_defaultTooltips",true);this._oTooltipContainer.removeAllAssociation("associatedTooltips",true);for(var i=0;i<T;i++){this._oTooltipContainer.addAssociation("associatedTooltips",this.getCustomTooltips()[i],true);}};g.prototype.assignDefaultTooltips=function(T){var D=this.getAggregation("_defaultTooltips")||[];if(D.length===0){this._oTooltipContainer.removeAllAssociation("associatedTooltips",true);T.forEach(function(i){this.initDefaultTooltip(i);},this);}this.forwardProperties(["enabled"],this._oTooltipContainer);this.forwardPropertiesToDefaultTooltips(T.length);};g.prototype.initAndSyncTooltips=function(T){var h=this.getCustomTooltips(),i=h.length,m=T.length;this.initTooltipContainer();if(i<m){this.assignDefaultTooltips(T);}else{if(i>m){l.warning("Warning: More than "+m+" Custom Tooltips are provided. Only the first will be used.");}this.associateCustomTooltips(m);}};g.prototype.initDefaultTooltip=function(i){var T=new b(this.getId()+"-"+i,{change:this.handleTooltipChange.bind(this)});this.getAggregation("_tooltipContainer").addAssociation("associatedTooltips",T,true);this.addAggregation("_defaultTooltips",T,true);};g.prototype.initTooltipContainer=function(){if(!this._oTooltipContainer){this._oTooltipContainer=new S();this.setAggregation("_tooltipContainer",this._oTooltipContainer,true);}};g.prototype._getMaxTooltipWidth=function(){var A=[Math.abs(this.getMin()),Math.abs(this.getMax())],r=A[0]>A[1]?0:1;return((A[r].toString()).length+this.getDecimalPrecisionOfNumber(this.getStep())+1)*d.CONSTANTS.CHARACTER_WIDTH_PX;};g.prototype.onAfterRendering=function(){if(this.getShowAdvancedTooltip()){this._recalculateStyles();this._handleTooltipContainerResponsiveness();}if(!this._parentResizeHandler){q.sap.delayedCall(0,this,function(){this._parentResizeHandler=R.register(this,this._handleSliderResize.bind(this));});}else{q.sap.delayedCall(0,this,function(){this._handleSliderResize({control:this});});}};g.prototype.ontouchstart=function(o){var m=this.getMin(),T=o.targetTouches[0],n,h=this.getRenderer().CSS_CLASS,s="."+h;o.setMarked();if(o.target.className.indexOf("sapMInput")===-1){o.preventDefault();}this.focus();if(t.countContained(o.touches,this.getId())>1||!this.getEnabled()||o.button||(o.srcControl!==this)){return;}this._iActiveTouchId=T.identifier;q(document).on("touchend"+s+" touchcancel"+s+" mouseup"+s,this._ontouchend.bind(this)).on(o.originalEvent.type==="touchstart"?"touchmove"+s:"touchmove"+s+" mousemove"+s,this._ontouchmove.bind(this));var N=this.getClosestHandleDomRef();if(T.target!==N){q.sap.delayedCall(0,N,"focus");}this._recalculateStyles();this._fDiffX=this._fSliderPaddingLeft;this._fInitialValue=this.getValue();this.$("inner").addClass(h+"Pressed");if(T.target===this.getDomRef("handle")){this._fDiffX=(T.pageX-q(N).offset().left)+this._fSliderPaddingLeft-(this._fHandleWidth/2);}else{n=(((T.pageX-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth)*(this.getMax()-m))+m;if(sap.ui.getCore().getConfiguration().getRTL()){n=this._convertValueToRtlMode(n);}this.setValue(n);n=this.getValue();if(this._fInitialValue!==n){this.fireLiveChange({value:n});}}};g.prototype._ontouchmove=function(o){o.setMarked();o.preventDefault();if(o.isMarked("delayedMouseEvent")||!this.getEnabled()||o.button){return;}var m=this.getMin(),v=this.getValue(),T=t.find(o.changedTouches,this._iActiveTouchId),p=T?T.pageX:o.pageX,n=(((p-this._fDiffX-this._fSliderOffsetLeft)/this._fSliderWidth)*(this.getMax()-m))+m;if(sap.ui.getCore().getConfiguration().getRTL()){n=this._convertValueToRtlMode(n);}this.setValue(n);n=this.getValue();if(v!==n){this.fireLiveChange({value:n});}};g.prototype._ontouchend=function(o){var h=this.getRenderer().CSS_CLASS,s="."+h;o.setMarked();if(o.isMarked("delayedMouseEvent")||!this.getEnabled()||o.button){return;}q(document).off(s);var v=this.getValue();this.$("inner").removeClass(h+"Pressed");if(this._fInitialValue!==v){this.fireChange({value:v});}};g.prototype.onfocusin=function(o){this._fValueBeforeFocus=this.getValue();if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);this.updateAdvancedTooltipDom(this.getValue());}};g.prototype.onfocusout=function(o){if(!this.getShowAdvancedTooltip()){return;}var s=q.contains(this.getDomRef(),o.relatedTarget),T=q.contains(this.getAggregation("_tooltipContainer").getDomRef(),o.relatedTarget);if(s||T){return;}this.getAggregation("_tooltipContainer").hide();};g.prototype.onmouseover=function(o){var T,h;if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);h=this.getAggregation("_tooltipContainer");T=q.contains(h.getDomRef(),document.activeElement);if(T){return;}this.updateAdvancedTooltipDom(this.getValue());}};g.prototype.onmouseout=function(o){if(!this.getShowAdvancedTooltip()){return;}var T=this.getAggregation("_tooltipContainer").getDomRef(),s=this.getDomRef(),h=q.contains(s,document.activeElement),i=q.contains(T,document.activeElement);if(!T||h||i){return;}if(q.contains(this.getDomRef(),o.toElement)||(s===o.toElement)){return;}if(q.contains(this.getAggregation("_tooltipContainer").getDomRef(),o.toElement)){return;}this.getAggregation("_tooltipContainer").hide();};g.prototype.onkeydown=function(o){var T=this.getUsedTooltips();if(o.keyCode===d.CONSTANTS.F2_KEYCODE&&T[0]&&this.getInputsAsTooltips()){T[0].focus();}};g.prototype.onsapincrease=function(o){var v,n;o.preventDefault();o.setMarked();if(this.getEnabled()){v=this.getValue();this.stepUp(1);n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}this._showTooltipsIfNeeded();};g.prototype.onsapincreasemodifiers=function(o){if(o.altKey){return;}o.preventDefault();o.stopPropagation();o.setMarked();this._increaseValueBy(this._getLongStep());this._showTooltipsIfNeeded();};g.prototype.onsapdecrease=function(o){var v,n;o.preventDefault();o.setMarked();if(this.getEnabled()){v=this.getValue();this.stepDown(1);n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}this._showTooltipsIfNeeded();};g.prototype.onsapdecreasemodifiers=function(o){if(o.altKey){return;}o.preventDefault();o.stopPropagation();o.setMarked();this._decreaseValueBy(this._getLongStep());this._showTooltipsIfNeeded();};g.prototype.onsapplus=function(o){var v,n;o.setMarked();if(this.getEnabled()){v=this.getValue();this.stepUp(1);n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}this._showTooltipsIfNeeded();};g.prototype.onsapminus=function(o){var v,n;o.setMarked();if(this.getEnabled()){v=this.getValue();this.stepDown(1);n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}this._showTooltipsIfNeeded();};g.prototype.onsapescape=function(){this.setValue(this._fValueBeforeFocus);};g.prototype.onsappageup=g.prototype.onsapincreasemodifiers;g.prototype.onsappagedown=g.prototype.onsapdecreasemodifiers;g.prototype.onsaphome=function(o){o.setMarked();var m=this.getMin();o.preventDefault();if(this.getEnabled()&&this.getValue()>m){this.setValue(m);this._fireChangeAndLiveChange({value:m});}this._showTooltipsIfNeeded();};g.prototype.onsapend=function(o){o.setMarked();var m=this.getMax();o.preventDefault();if(this.getEnabled()&&this.getValue()<m){this.setValue(m);this._fireChangeAndLiveChange({value:m});}this._showTooltipsIfNeeded();};g.prototype.getFocusDomRef=function(){return this.getDomRef("handle");};g.prototype.stepUp=function(s){return this.setValue(this.getValue()+(this._validateStep(s)*this.getStep()),{snapValue:false});};g.prototype.stepDown=function(s){return this.setValue(this.getValue()-(this._validateStep(s)*this.getStep()),{snapValue:false});};g.prototype.setValue=function(n,o){if(this._bSetValueFirstCall){this._bSetValueFirstCall=false;return this.setProperty("value",n,true);}var m=this.getMin(),M=this.getMax(),s=this.getStep(),v=this.getValue(),N,h=true,i;if(o){h=!!o.snapValue;}if(typeof n!=="number"||!isFinite(n)){return this;}i=Math.abs((n-m)%s);if(h&&(i!==0)){n=i*2>=s?n+s-i:n-i;}if(n<m){n=m;}else if(n>M){n=M;}N=this.toFixed(n,this.getDecimalPrecisionOfNumber(s));n=Number(N);this.setProperty("value",n,true);if(v!==this.getValue()){this.setDomValue(N);}return this;};return g;});
