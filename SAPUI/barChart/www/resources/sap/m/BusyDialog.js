/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/m/Dialog','sap/m/BusyIndicator','sap/m/Label','sap/m/Button'],function(q,l,C,D,B,L,a,P,b){"use strict";var c=C.extend("sap.m.BusyDialog",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Appearance",defaultValue:''},title:{type:"string",group:"Appearance",defaultValue:''},customIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},customIconRotationSpeed:{type:"int",group:"Appearance",defaultValue:1000},customIconDensityAware:{type:"boolean",defaultValue:true},customIconWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"44px"},customIconHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"44px"},cancelButtonText:{type:"string",group:"Misc",defaultValue:''},showCancelButton:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{close:{parameters:{cancelPressed:{type:"boolean"}}}},designtime:"sap/m/designtime/BusyDialog.designtime"},renderer:function(r,o){}});c.prototype.init=function(){this._busyIndicator=new B(this.getId()+'-busyInd',{visible:true});function o(){if(sap.ui.getCore().getConfiguration().getAccessibility()){this._$content.attr('role','application');}}this._oDialog=new D(this.getId()+'-Dialog',{content:this._busyIndicator,showHeader:false,afterOpen:o,afterClose:this._fnCloseHandler.bind(this),initialFocus:this._busyIndicator.getId()+'-busyIndicator'}).addStyleClass('sapMBusyDialog');this._oDialog.close=function(){};this._oDialog.addEventDelegate({onBeforeRendering:function(){var t=this.getText(),d=this.getTitle(),s=this.getShowCancelButton()||this.getCancelButtonText();if(!t&&!d&&!s){this._oDialog.addStyleClass('sapMBusyDialog-Light');}else{this._oDialog.removeStyleClass('sapMBusyDialog-Light');}}},this);this._oDialog.oPopup.onsapescape=function(e){this.close(true);}.bind(this);};c.prototype.exit=function(){this._busyIndicator.destroy();this._busyIndicator=null;if(this._cancelButton){this._cancelButton.destroy();this._cancelButton=null;}if(this._oLabel){this._oLabel.destroy();this._oLabel=null;}if(this._oDialog){this._oDialog.destroy();this._oDialog=null;}};c.prototype.open=function(){q.sap.log.debug("sap.m.BusyDialog.open called at "+new Date().getTime());if(this.getAriaLabelledBy()&&!this._oDialog._$dialog){var t=this;this.getAriaLabelledBy().forEach(function(i){t._oDialog.addAriaLabelledBy(i);});}if(!document.body||!sap.ui.getCore().isInitialized()){setTimeout(function(){this.open();}.bind(this),50);}else{this._oDialog.open();}return this;};c.prototype.close=function(i){this._isClosedFromUserInteraction=i;D.prototype.close.call(this._oDialog);return this;};c.prototype._fnCloseHandler=function(){this.fireClose({cancelPressed:this._isClosedFromUserInteraction||false});};c.prototype.setTitle=function(t){this.setProperty('title',t,true);this._oDialog.setTitle(t).setShowHeader(!!t);return this;};c.prototype.setTooltip=function(t){this._oDialog.setTooltip(t);return this;};c.prototype.getTooltip=function(){this._oDialog.getTooltip();return this;};c.prototype.setText=function(t){this.setProperty('text',t,true);if(!this._oLabel){if(t){this._oLabel=new L(this.getId()+'-TextLabel',{text:t}).addStyleClass('sapMBusyDialogLabel');this._oDialog.insertAggregation('content',this._oLabel,0);this._oDialog.addAriaLabelledBy(this._oLabel.getId());}}else{if(t){this._oLabel.setText(t).setVisible(true);}else{this._oLabel.setVisible(false);}}return this;};c.prototype.setCustomIcon=function(i){this.setProperty("customIcon",i,true);this._busyIndicator.setCustomIcon(i);return this;};c.prototype.setCustomIconRotationSpeed=function(s){this.setProperty("customIconRotationSpeed",s,true);this._busyIndicator.setCustomIconRotationSpeed(s);return this;};c.prototype.setCustomIconDensityAware=function(i){this.setProperty("customIconDensityAware",i,true);this._busyIndicator.setCustomIconDensityAware(i);return this;};c.prototype.setCustomIconWidth=function(w){this.setProperty("customIconWidth",w,true);this._busyIndicator.setCustomIconWidth(w);return this;};c.prototype.setCustomIconHeight=function(h){this.setProperty("customIconHeight",h,true);this._busyIndicator.setCustomIconHeight(h);return this;};c.prototype.setShowCancelButton=function(i){this.setProperty("showCancelButton",i,false);if(i){this._oDialog.setEndButton(this._getCancelButton());}else{this._destroyTheCancelButton();}return this;};c.prototype.setCancelButtonText=function(t){this.setProperty("cancelButtonText",t,false);if(t){this._getCancelButton().setText(t);this._oDialog.setEndButton(this._getCancelButton());}else{this._destroyTheCancelButton();}return this;};c.prototype.getDomRef=function(){return this._oDialog&&this._oDialog.getDomRef();};["addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass"].forEach(function(A){c.prototype[A]=function(){if(this._oDialog&&this._oDialog[A]){this._oDialog[A].apply(this._oDialog,arguments);return this;}};});c.prototype._destroyTheCancelButton=function(){this._oDialog.destroyEndButton();this._cancelButton=null;};c.prototype._getCancelButton=function(){var d=this.getCancelButtonText();d=d?d:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("BUSYDIALOG_CANCELBUTTON_TEXT");return this._cancelButton?this._cancelButton:this._cancelButton=new a(this.getId()+'busyCancelBtn',{text:d,press:function(){this.close(true);}.bind(this)});};return c;});
