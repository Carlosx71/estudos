/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/layout/library','./FormRenderer'],function(C,l,F){"use strict";var a=C.extend("sap.ui.layout.form.Form",{metadata:{library:"sap.ui.layout",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},editable:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"formContainers",aggregations:{formContainers:{type:"sap.ui.layout.form.FormContainer",multiple:true,singularName:"formContainer"},title:{type:"sap.ui.core.Title",altTypes:["string"],multiple:false},toolbar:{type:"sap.ui.core.Toolbar",multiple:false},layout:{type:"sap.ui.layout.form.FormLayout",multiple:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/ui/layout/designtime/form/Form.designtime"}});a.prototype.toggleContainerExpanded=function(c){var L=this.getLayout();if(L){L.toggleContainerExpanded(c);}};a.prototype.contentOnAfterRendering=function(f,c){var L=this.getLayout();if(L&&L.contentOnAfterRendering){L.contentOnAfterRendering(f,c);}};a.prototype.onLayoutDataChange=function(e){var L=this.getLayout();if(L&&L.onLayoutDataChange){L.onLayoutDataChange(e);}};a.prototype.onBeforeFastNavigationFocus=function(e){var L=this.getLayout();if(L&&L.onBeforeFastNavigationFocus){L.onBeforeFastNavigationFocus(e);}};a.prototype.setEditable=function(e){var o=this.getEditable();this.setProperty("editable",e,true);if(e!=o&&this.getDomRef()){if(e){this.$().addClass("sapUiFormEdit").addClass("sapUiFormEdit-CTX");this.$().removeAttr("aria-readonly");}else{this.$().removeClass("sapUiFormEdit").removeClass("sapUiFormEdit-CTX");this.$().attr("aria-readonly","true");}var f=this.getFormContainers();for(var i=0;i<f.length;i++){var b=f[i];b.invalidateLabels();}}return this;};a.prototype.setToolbar=function(t){t=l.form.FormHelper.setToolbar.call(this,t);this.setAggregation("toolbar",t);return this;};a.prototype.invalidate=function(o){if(!this._bNoInvalidate){C.prototype.invalidate.apply(this,arguments);}};a.prototype.getContainerRenderedDomRef=function(c){var L=this.getLayout();if(L&&L.getContainerRenderedDomRef){return L.getContainerRenderedDomRef(c);}else{return null;}};a.prototype.getElementRenderedDomRef=function(e){var L=this.getLayout();if(L&&L.getElementRenderedDomRef){return L.getElementRenderedDomRef(e);}else{return null;}};a.prototype.getVisibleFormContainers=function(){var c=this.getFormContainers();var v=[];for(var i=0;i<c.length;i++){var o=c[i];if(o.isVisible()){v.push(o);}}return v;};return a;});
