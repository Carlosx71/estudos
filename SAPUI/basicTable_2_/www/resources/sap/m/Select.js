/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Dialog','./Popover','./SelectList','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','./Button','./Bar','./Title','./delegate/ValueStateMessage','sap/ui/core/message/MessageMixin','sap/ui/core/library','sap/ui/core/Item','sap/ui/Device','sap/ui/core/InvisibleText','./SelectRenderer','jquery.sap.keycodes'],function(q,D,P,S,l,C,E,I,B,a,T,V,M,c,b,d,e,f){"use strict";var g=l.SelectListKeyboardNavigationMode;var h=l.PlacementType;var j=c.ValueState;var k=c.TextDirection;var m=c.TextAlign;var n=l.SelectType;var o=C.extend("sap.m.Select",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{name:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},type:{type:"sap.m.SelectType",group:"Appearance",defaultValue:n.Default},autoAdjustWidth:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:m.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:k.Inherit},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:j.None},valueStateText:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},forceSelection:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable",forwarding:{getter:"getList",aggregation:"items"}},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"},_pickerHeader:{type:"sap.m.Bar",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},designtime:"sap/m/designtime/Select.designtime"}});I.insertFontFaceStyle();E.apply(o.prototype,[true]);M.call(o.prototype);function H(i){if(i){this.setSelection(i);this.setValue(i.getText());this.scrollToItem(i);}}o.prototype._handleFocusout=function(i){this._bFocusoutDueRendering=this.bRenderingPhase;if(this._bFocusoutDueRendering){this._bProcessChange=false;return;}if(this._bProcessChange){if(!this.isOpen()||i.target===this.getAggregation("picker")){this._checkSelectionChange();}else{this._revertSelection();}this._bProcessChange=false;}else{this._bProcessChange=true;}};o.prototype._checkSelectionChange=function(){var i=this.getSelectedItem();if(this._oSelectionOnFocus!==i){this.fireChange({selectedItem:i});}};o.prototype._revertSelection=function(){var i=this.getSelectedItem();if(this._oSelectionOnFocus!==i){this.setSelection(this._oSelectionOnFocus);this.setValue(this._getSelectedItemText());}};o.prototype._getSelectedItemText=function(i){i=i||this.getSelectedItem();if(!i){i=this.getDefaultSelectedItem();}if(i){return i.getText();}return"";};o.prototype.getList=function(){if(this.bIsDestroyed){return null;}return this._oList;};o.prototype.findFirstEnabledItem=function(i){var L=this.getList();return L?L.findFirstEnabledItem(i):null;};o.prototype.findLastEnabledItem=function(i){var L=this.getList();return L?L.findLastEnabledItem(i):null;};o.prototype.setSelectedIndex=function(i,_){var p;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);p=_[i];if(p){this.setSelection(p);}};o.prototype.scrollToItem=function(i){var p=this.getPicker(),r=p.getDomRef("cont"),s=i&&i.getDomRef();if(!p||!r||!s){return;}var t=r.scrollTop,u=s.offsetTop,v=r.clientHeight,w=s.offsetHeight;if(t>u){r.scrollTop=u;}else if((u+w)>(t+v)){r.scrollTop=Math.ceil(u+w-v);}};o.prototype.setValue=function(v){this.$("label").text(v);};o.prototype._isShadowListRequired=function(){if(this.getAutoAdjustWidth()){return false;}else if(this.getWidth()==="auto"){return true;}return false;};o.prototype._handleAriaActiveDescendant=function(i){var p=this.getDomRef(),r=i&&i.getDomRef(),A="aria-activedescendant";if(!p){return;}if(r&&this.isOpen()){p.setAttribute(A,i.getId());}else{p.removeAttribute(A);}};o.prototype.updateItems=function(r){S.prototype.updateItems.apply(this,arguments);this._oSelectionOnFocus=this.getSelectedItem();};o.prototype.refreshItems=function(){S.prototype.refreshItems.apply(this,arguments);};o.prototype.onBeforeOpen=function(i){var p=this["_onBeforeOpen"+this.getPickerType()],r=this.getRenderer().CSS_CLASS;this.addStyleClass(r+"Pressed");this.addStyleClass(r+"Expanded");this.closeValueStateMessage();this.addContent();p&&p.call(this);};o.prototype.onAfterOpen=function(i){var p=this.getFocusDomRef(),r=null,$=this.$("label");if(!p){return;}r=this.getSelectedItem();p.setAttribute("aria-expanded","true");$.attr("aria-live",null);p.setAttribute("aria-owns",this.getList().getId());if(r){p.setAttribute("aria-activedescendant",r.getId());this.scrollToItem(r);}};o.prototype.onBeforeClose=function(i){var p=this.getFocusDomRef(),r=this.getRenderer().CSS_CLASS;if(p){p.removeAttribute("aria-owns");p.removeAttribute("aria-activedescendant");if(this.shouldValueStateMessageBeOpened()&&(document.activeElement===p)){this.openValueStateMessage();}}this.removeStyleClass(r+"Expanded");};o.prototype.onAfterClose=function(i){var p=this.getFocusDomRef(),r=this.getRenderer().CSS_CLASS,s=r+"Pressed",$=this.$("label");if(p){p.setAttribute("aria-expanded","false");p.removeAttribute("aria-activedescendant");$.attr("aria-live","polite");}this.removeStyleClass(s);};o.prototype.getPicker=function(){if(this.bIsDestroyed){return null;}return this.createPicker(this.getPickerType());};o.prototype.setPickerType=function(p){this._sPickerType=p;};o.prototype.getPickerType=function(){return this._sPickerType;};o.prototype._createPopover=function(){var t=this;var p=new P({showArrow:false,showHeader:false,placement:h.VerticalPreferredBottom,offsetX:0,offsetY:0,initialFocus:this,bounce:false,ariaLabelledBy:this._getPickerHiddenLabelId()});p.addEventDelegate({ontouchstart:function(i){var r=this.getDomRef("cont");if((i.target===r)||(i.srcControl instanceof b)){t._bProcessChange=false;}}},p);this._decoratePopover(p);return p;};o.prototype._decoratePopover=function(p){var t=this;p.open=function(){return this.openBy(t);};};o.prototype._onBeforeRenderingPopover=function(){var p=this.getPicker(),w=this.$().outerWidth()+"px";if(p){p.setContentMinWidth(w);}};o.prototype._createDialog=function(){var t=this;return new D({stretch:true,ariaLabelledBy:this._getPickerHiddenLabelId(),customHeader:this._getPickerHeader(),beforeOpen:function(){t.updatePickerHeaderTitle();}});};o.prototype._getPickerTitle=function(){var p=this.getPicker(),i=p&&p.getCustomHeader();if(i){return i.getContentMiddle()[0];}return null;};o.prototype._getPickerHeader=function(){var i=I.getIconURI("decline"),r;if(!this.getAggregation("_pickerHeader")){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setAggregation("_pickerHeader",new a({contentMiddle:new T({text:r.getText("SELECT_PICKER_TITLE_TEXT")}),contentRight:new B({icon:i,press:this.close.bind(this)})}));}return this.getAggregation("_pickerHeader");};o.prototype._getPickerHiddenLabelId=function(){return e.getStaticId("sap.m","INPUT_AVALIABLE_VALUES");};o.prototype.updatePickerHeaderTitle=function(){var p=this.getPicker();if(!p){return;}var L=this.getLabels();if(L.length){var i=L[0],r=this._getPickerTitle();if(i&&(typeof i.getText==="function")){r&&r.setText(i.getText());}}};o.prototype._onBeforeOpenDialog=function(){};o.prototype.init=function(){this.setPickerType(d.system.phone?"Dialog":"Popover");this.createPicker(this.getPickerType());this._oSelectionOnFocus=null;this.bRenderingPhase=false;this._bFocusoutDueRendering=false;this._bProcessChange=false;this.sTypedChars="";this.iTypingTimeoutID=-1;this._oValueStateMessage=new V(this);};o.prototype.onBeforeRendering=function(){this.bRenderingPhase=true;if(d.browser.firefox&&(this.getFocusDomRef()===document.activeElement)){this._handleFocusout();}this.synchronizeSelection();};o.prototype.onAfterRendering=function(){this.bRenderingPhase=false;};o.prototype.exit=function(){var v=this.getValueStateMessage();this._oSelectionOnFocus=null;if(v){this.closeValueStateMessage();v.destroy();}this._oValueStateMessage=null;};o.prototype.ontouchstart=function(i){i.setMarked();if(this.getEnabled()&&this.isOpenArea(i.target)){this.addStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};o.prototype.ontouchend=function(i){i.setMarked();if(this.getEnabled()&&!this.isOpen()&&this.isOpenArea(i.target)){this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};o.prototype.ontap=function(i){var p=this.getRenderer().CSS_CLASS;i.setMarked();if(!this.getEnabled()){return;}if(this.isOpenArea(i.target)){if(this.isOpen()){this.close();this.removeStyleClass(p+"Pressed");return;}if(d.system.phone){this.focus();}this.open();}if(this.isOpen()){this.addStyleClass(p+"Pressed");}};o.prototype.onSelectionChange=function(i){var p=i.getParameter("selectedItem");this.close();this.setSelection(p);this.fireChange({selectedItem:p});this.setValue(this._getSelectedItemText());};o.prototype.onkeypress=function(i){if(!this.getEnabled()){return;}i.setMarked();var t=String.fromCharCode(i.which),s=this.getSelectedItem(),p=t,r=null;this.sTypedChars+=t;if((s&&q.sap.startsWithIgnoreCase(s.getText(),this.sTypedChars))||((this.sTypedChars.length===1)||((this.sTypedChars.length>1)&&(this.sTypedChars.charAt(0)!==this.sTypedChars.charAt(1))))){p=this.sTypedChars;}r=this.searchNextItemByText(p);clearTimeout(this.iTypingTimeoutID);this.iTypingTimeoutID=setTimeout(function(){this.sTypedChars="";this.iTypingTimeoutID=-1;}.bind(this),1000);H.call(this,r);};o.prototype.onsapshow=function(i){if(!this.getEnabled()){return;}i.setMarked();if(i.which===q.sap.KeyCodes.F4){i.preventDefault();}this.toggleOpenState();};o.prototype.onsaphide=o.prototype.onsapshow;o.prototype.onsapescape=function(i){if(!this.getEnabled()){return;}if(this.isOpen()){i.setMarked();this.close();this._revertSelection();}};o.prototype.onsapenter=function(i){if(!this.getEnabled()){return;}i.setMarked();this.close();this._checkSelectionChange();};o.prototype.onsapspace=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();if(this.isOpen()){this._checkSelectionChange();}this.toggleOpenState();};o.prototype.onsapdown=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var N,s=this.getSelectableItems();N=s[s.indexOf(this.getSelectedItem())+1];H.call(this,N);};o.prototype.onsapup=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var p,s=this.getSelectableItems();p=s[s.indexOf(this.getSelectedItem())-1];H.call(this,p);};o.prototype.onsaphome=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var F=this.getSelectableItems()[0];H.call(this,F);};o.prototype.onsapend=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var L=this.findLastEnabledItem(this.getSelectableItems());H.call(this,L);};o.prototype.onsappagedown=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var s=this.getSelectableItems(),p=this.getSelectedItem();this.setSelectedIndex(s.indexOf(p)+10,s);p=this.getSelectedItem();if(p){this.setValue(p.getText());}this.scrollToItem(p);};o.prototype.onsappageup=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var s=this.getSelectableItems(),p=this.getSelectedItem();this.setSelectedIndex(s.indexOf(p)-10,s);p=this.getSelectedItem();if(p){this.setValue(p.getText());}this.scrollToItem(p);};o.prototype.onsaptabnext=function(i){if(!this.getEnabled()){return;}if(this.isOpen()){this.close();}};o.prototype.onsaptabprevious=o.prototype.onsaptabnext;o.prototype.onfocusin=function(i){if(!this._bFocusoutDueRendering&&!this._bProcessChange){this._oSelectionOnFocus=this.getSelectedItem();}this._bProcessChange=true;setTimeout(function(){if(!this.isOpen()&&this.shouldValueStateMessageBeOpened()&&(document.activeElement===this.getFocusDomRef())){this.openValueStateMessage();}}.bind(this),100);if(i.target!==this.getFocusDomRef()){this.focus();}};o.prototype.onfocusout=function(i){this._handleFocusout(i);if(this.bRenderingPhase){return;}this.closeValueStateMessage();};o.prototype.onsapfocusleave=function(i){var p=this.getAggregation("picker");if(!i.relatedControlId||!p){return;}var r=sap.ui.getCore().byId(i.relatedControlId),F=r&&r.getFocusDomRef();if(d.system.desktop&&q.sap.containsOrEquals(p.getFocusDomRef(),F)){this.focus();}};o.prototype.setSelection=function(i){var L=this.getList(),K;if(L){L.setSelection(i);}this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof b)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}K=i?i.getKey():"";this.setProperty("selectedKey",K,true);this._handleAriaActiveDescendant(i);};o.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};o.prototype.synchronizeSelection=function(){S.prototype.synchronizeSelection.apply(this,arguments);};o.prototype.addContent=function(p){};o.prototype.createPicker=function(p){var i=this.getAggregation("picker"),r=this.getRenderer().CSS_CLASS;if(i){return i;}i=this["_create"+p]();this.setAggregation("picker",i,true);i.setHorizontalScrolling(false).addStyleClass(r+"Picker").addStyleClass(r+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return i;};o.prototype.searchNextItemByText=function(t){var p=this.getItems(),s=this.getSelectedIndex(),r=p.splice(s+1,p.length-s),u=p.splice(0,p.length-1);p=r.concat(u);for(var i=0,v;i<p.length;i++){v=p[i];if(v.getEnabled()&&!(v instanceof sap.ui.core.SeparatorItem)&&q.sap.startsWithIgnoreCase(v.getText(),t)){return v;}}return null;};o.prototype.createList=function(){var L=g,K=d.system.phone?L.Delimited:L.None;this._oList=new S({width:"100%",keyboardNavigationMode:K}).addStyleClass(this.getRenderer().CSS_CLASS+"List-CTX").addEventDelegate({ontap:function(i){this._checkSelectionChange();this.close();}},this).attachSelectionChange(this.onSelectionChange,this);return this._oList;};o.prototype.hasContent=function(){return this.getItems().length>0;};o.prototype.onBeforeRenderingPicker=function(){var O=this["_onBeforeRendering"+this.getPickerType()];O&&O.call(this);};o.prototype.onAfterRenderingPicker=function(){var O=this["_onAfterRendering"+this.getPickerType()];O&&O.call(this);};o.prototype.open=function(){var p=this.getPicker();if(p){p.open();}return this;};o.prototype.toggleOpenState=function(){if(this.isOpen()){this.close();}else{this.open();}return this;};o.prototype.getVisibleItems=function(){var L=this.getList();return L?L.getVisibleItems():[];};o.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};o.prototype.getSelectedIndex=function(){var s=this.getSelectedItem();return s?this.indexOfItem(this.getSelectedItem()):-1;};o.prototype.getDefaultSelectedItem=function(i){return this.getForceSelection()?this.findFirstEnabledItem():null;};o.prototype.getSelectableItems=function(){var L=this.getList();return L?L.getSelectableItems():[];};o.prototype.getOpenArea=function(){return this.getDomRef();};o.prototype.isOpenArea=function(i){var O=this.getOpenArea();return O&&O.contains(i);};o.prototype.findItem=function(p,v){var L=this.getList();return L?L.findItem(p,v):null;};o.prototype.clearSelection=function(){this.setSelection(null);};o.prototype.onItemChange=function(i){var s=this.getAssociation("selectedItem"),N=i.getParameter("newValue"),p=i.getParameter("name");if(s===i.getParameter("id")){switch(p){case"text":this.setValue(N);break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(N);}break;}}};o.prototype.fireChange=function(p){this._oSelectionOnFocus=p.selectedItem;return this.fireEvent("change",p);};o.prototype.addAggregation=function(A,O,s){if(A==="items"&&!s&&!this.isInvalidateSuppressed()){this.invalidate(O);}return C.prototype.addAggregation.apply(this,arguments);};o.prototype.destroyAggregation=function(A,s){if(A==="items"&&!s&&!this.isInvalidateSuppressed()){this.invalidate();}return C.prototype.destroyAggregation.apply(this,arguments);};o.prototype.setAssociation=function(A,i,s){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.setAssociation.apply(L,arguments);}return C.prototype.setAssociation.apply(this,arguments);};o.prototype.setProperty=function(p,v,s){var L=this.getList();if((p==="selectedKey")||(p==="selectedItemId")){L&&S.prototype.setProperty.apply(L,arguments);}return C.prototype.setProperty.apply(this,arguments);};o.prototype.removeAllAssociation=function(A,s){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.removeAllAssociation.apply(L,arguments);}return C.prototype.removeAllAssociation.apply(this,arguments);};o.prototype.clone=function(){var s=C.prototype.clone.apply(this,arguments),L=this.getList(),p=this.getSelectedItem(),r=this.getSelectedKey();if(!this.isBound("items")&&L){for(var i=0,t=L.getItems();i<t.length;i++){s.addItem(t[i].clone());}}if(!this.isBound("selectedKey")&&!s.isSelectionSynchronized()){if(p&&(r==="")){s.setSelectedIndex(this.indexOfItem(p));}else{s.setSelectedKey(r);}}return s;};o.prototype.updateValueStateClasses=function(v,O){var t=this.$(),L=this.$("label"),A=this.$("arrow"),i=j,p=this.getRenderer().CSS_CLASS;if(O!==i.None){t.removeClass(p+"State");t.removeClass(p+O);L.removeClass(p+"LabelState");L.removeClass(p+"Label"+O);A.removeClass(p+"ArrowState");}if(v!==i.None){t.addClass(p+"State");t.addClass(p+v);L.addClass(p+"LabelState");L.addClass(p+"Label"+v);A.addClass(p+"ArrowState");}};o.prototype.updateAriaLabelledBy=function(v,O){var $=this.$(),A=$.attr("aria-labelledby"),i=A?A.split(" "):[],N;if(O!==j.None){i.pop();}if(v!==j.None){i.push(e.getStaticId("sap.ui.core","VALUE_STATE_"+v.toUpperCase()));}N=i.join(" ");$.attr("aria-labelledby",N);};o.prototype.getLabels=function(){var L=this.getAriaLabelledBy().map(function(s){return sap.ui.getCore().byId(s);});var i=sap.ui.require("sap/ui/core/LabelEnablement");if(i){L=L.concat(i.getReferencingLabels(this).map(function(s){return sap.ui.getCore().byId(s);}));}return L;};o.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef();};o.prototype.getValueStateMessageId=function(){return this.getId()+"-message";};o.prototype.getValueStateMessage=function(){return this._oValueStateMessage;};o.prototype.openValueStateMessage=function(){var v=this.getValueStateMessage();if(v){v.open();}};o.prototype.closeValueStateMessage=function(){var v=this.getValueStateMessage();if(v){v.close();}};o.prototype.shouldValueStateMessageBeOpened=function(){return(this.getValueState()!==j.None)&&this.getEnabled();};o.prototype.setShowSecondaryValues=function(A){var s=!this._isShadowListRequired();this.setProperty("showSecondaryValues",A,s);var L=this.getList();if(L){L.setShowSecondaryValues(A);}return this;};o.prototype.addItem=function(i){this.addAggregation("items",i);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};o.prototype.insertItem=function(i,p){this.insertAggregation("items",i,p);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};o.prototype.findAggregatedObjects=function(){var L=this.getList();if(L){return S.prototype.findAggregatedObjects.apply(L,arguments);}return[];};o.prototype.getItems=function(){var L=this.getList();return L?L.getItems():[];};o.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=sap.ui.getCore().byId(i);}if(!(i instanceof b)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText(i));this._oSelectionOnFocus=i;return this;};o.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText());this._oSelectionOnFocus=sap.ui.getCore().byId(i);return this;};o.prototype.setSelectedKey=function(K){K=this.validateProperty("selectedKey",K);var i=(K==="");if(!this.getForceSelection()&&i){this.setSelection(null);this.setValue("");return this;}var p=this.getItemByKey(K);if(p||i){if(!p&&i){p=this.getDefaultSelectedItem();}this.setSelection(p);this.setValue(this._getSelectedItemText(p));this._oSelectionOnFocus=p;return this;}return this.setProperty("selectedKey",K);};o.prototype.setValueState=function(v){var O=this.getValueState();this.setProperty("valueState",v,true);v=this.getValueState();if(v===O){return this;}var i=this.getDomRefForValueState();if(!i){return this;}var p=j;if(v===p.Error){i.setAttribute("aria-invalid",true);}else{i.removeAttribute("aria-invalid");}if(this.shouldValueStateMessageBeOpened()&&document.activeElement===i){this.openValueStateMessage();}else{this.closeValueStateMessage();}this.updateValueStateClasses(v,O);this.updateAriaLabelledBy(v,O);return this;};o.prototype.getItemAt=function(i){return this.getItems()[+i]||null;};o.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null;};o.prototype.getFirstItem=function(){return this.getItems()[0]||null;};o.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null;};o.prototype.getEnabledItems=function(i){var L=this.getList();return L?L.getEnabledItems(i):[];};o.prototype.getItemByKey=function(K){var L=this.getList();return L?L.getItemByKey(K):null;};o.prototype.removeItem=function(i){var L=this.getList(),p;i=L?L.removeItem(i):null;if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){p=this.findFirstEnabledItem();if(p){this.setSelection(p);}}this.setValue(this._getSelectedItemText());if(i){i.detachEvent("_change",this.onItemChange,this);}return i;};o.prototype.removeAllItems=function(){var L=this.getList(),p=L?L.removeAllItems():[];this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove();}for(var i=0;i<p.length;i++){p[i].detachEvent("_change",this.onItemChange,this);}return p;};o.prototype.destroyItems=function(){var L=this.getList();if(L){L.destroyItems();}this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove();}return this;};o.prototype.isOpen=function(){var p=this.getAggregation("picker");return!!(p&&p.isOpen());};o.prototype.close=function(){var p=this.getAggregation("picker");if(p){p.close();}return this;};o.prototype.getDomRefForValueState=function(){return this.getDomRef();};o.prototype.getAccessibilityInfo=function(){var i={role:this.getRenderer().getAriaRole(this),focusable:this.getEnabled(),enabled:this.getEnabled()};if(this.getType()==="IconOnly"){var s=this.getTooltip_AsString();if(!s){var p=I.getIconInfo(this.getIcon());s=p&&p.text?p.text:"";}i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_BUTTON");i.description=s;}else if(this.getType()==="Default"){i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_COMBO");i.description=this._getSelectedItemText();}return i;};o.prototype.getIdForLabel=function(){return this.getId()+"-hiddenInput";};return o;});
