/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ComboBoxTextField','./ComboBoxBase','./Popover','./SelectList','./library','sap/ui/Device','sap/ui/core/Item','./ComboBoxRenderer','jquery.sap.keycodes'],function(q,C,a,P,S,l,D,I,b){"use strict";var c=a.extend("sap.m.ComboBox",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ComboBox.designtime",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},filterSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{change:{parameters:{value:{type:"string"},itemPressed:{type:"boolean"}}},selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});function h(o,i){if(!i){return;}var d=o.getFocusDomRef(),e=d.selectionStart,g=d.selectionEnd,j=e!==g,t=d.value.substring(0,d.selectionStart),k=this.getSelectedItem();if(i!==k){o.updateDomValue(i.getText());this.setSelection(i);this.fireSelectionChange({selectedItem:i});i=this.getSelectedItem();if(!q.sap.startsWithIgnoreCase(i.getText(),t)||!j){e=0;}o.selectText(e,d.value.length);}this.scrollToItem(i);}function s(i,e){if(document.activeElement===this.getFocusDomRef()){this.selectText(i,e);}}function f(i){var o=this.getSelectedItem(),d=o&&o.getDomRef(),e=o&&d.offsetTop,g=o&&d.offsetHeight,p=this.getPicker(),j=p.getDomRef("cont"),k=j.clientHeight;if(o&&((e+g)>(k))){if(!i){this.getList().$().css("visibility","hidden");}else{j.scrollTop=e-g/2;this.getList().$().css("visibility","visible");}}}c.prototype._handleAriaActiveDescendant=function(i){var d=this.getFocusDomRef(),A="aria-activedescendant";if(d){if(i&&i.getDomRef()&&this.isOpen()){d.setAttribute(A,i.getId());}else{d.removeAttribute(A);}}};c.prototype._getSelectedItemText=function(i){i=i||this.getSelectedItem();if(!i){i=this.getDefaultSelectedItem();}if(i){return i.getText();}return"";};c.getMetadata().forwardAggregation("items",{getter:c.prototype.getList,aggregation:"items"});c.prototype._setItemVisibility=function(i,v){var o=i&&i.$(),d="sapMSelectListItemBaseInvisible";if(v){i.bVisible=true;o.length&&o.removeClass(d);}else{i.bVisible=false;o.length&&o.addClass(d);}};c.prototype._highlightList=function(v){var i=this.getVisibleItems(),d=v.length,v=v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,'\\$&'),r=new RegExp("^"+v,"i");i.forEach(function(o){var e=o.getDomRef(),g,j;if(e===null){return;}g=e.children[1];j=Array.prototype.filter.call(e.children,function(k){return k.tagName.toLowerCase()!=="b";})[0]||e;j.innerHTML=this._boldItemRef(o.getText(),r,d);if(g&&o.getAdditionalText){g.innerHTML=this._boldItemRef(o.getAdditionalText(),r,d);}},this);};c.prototype._boldItemRef=function(i,r,d){var R;var t="<b>"+q.sap.encodeHTML(i.slice(0,d))+"</b>";var p=i.split(r);if(p.length===1){R=q.sap.encodeHTML(i);}else{R=p.map(function(e){return q.sap.encodeHTML(e);}).join(t);}return R;};c.prototype.setSelectedIndex=function(i,_){var o;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);o=_[i];if(o){this.setSelection(o);}};c.prototype.createDropdown=function(){var t=this;var d=new P(this.getDropdownSettings());d.setInitialFocus(this);d.open=function(){return this.openBy(t);};return d;};c.prototype.createPickerTextField=function(){var t=new C({width:"100%",showValueStateMessage:false,showButton:false}).addEventDelegate({onsapenter:function(){this.updateDomValue(t.getValue());this.onChange();}},this);return t;};c.prototype.revertSelection=function(){var p,o=this.getPickerTextField();this.setSelectedItem(this._oSelectedItemBeforeOpen);this.setValue(this._sValueBeforeOpen);if(this.getSelectedItem()===null){p=this._sValueBeforeOpen;}else{p=this._oSelectedItemBeforeOpen.getText();}o&&o.setValue(p);};c.prototype.filterItems=function(o,d){var p=o.properties,v=o.value,e=v==="",m=false,t=false,M=[],F=[],g=null;this._oFirstItemTextMatched=null;p.forEach(function(k){M.push("get"+k.charAt(0).toUpperCase()+k.slice(1));});d=d||this.getItems();for(var i=0;i<d.length;i++){g=d[i];m=e;for(var j=0;j<M.length;j++){if(q.sap.startsWithIgnoreCase(g[M[j]](),v)){m=true;if(M[j]==="getText"){t=true;}}}if(m){F.push(g);}if(!this._oFirstItemTextMatched&&t){this._oFirstItemTextMatched=g;}this._setItemVisibility(g,m);}return F;};c.prototype._getFilters=function(){return this.getFilterSecondaryValues()?["text","additionalText"]:["text"];};c.prototype.init=function(){a.prototype.init.apply(this,arguments);this.bOpenValueStateMessage=true;this._sValueBeforeOpen="";this._sInputValueBeforeOpen="";this._oSelectedItemBeforeOpen=null;this._oFirstItemTextMatched=null;this.bIsFocused=false;};c.prototype.onBeforeRendering=function(){a.prototype.onBeforeRendering.apply(this,arguments);this.synchronizeSelection();};c.prototype.exit=function(){a.prototype.exit.apply(this,arguments);this._oSelectedItemBeforeOpen=null;this._oFirstItemTextMatched=null;};c.prototype.onBeforeRenderingPicker=function(){var o=this["onBeforeRendering"+this.getPickerType()];o&&o.call(this);};c.prototype.onBeforeRenderingDropdown=function(){var p=this.getPicker(),w=(this.$().outerWidth()/parseFloat(l.BaseFontSize))+"rem";if(p){p.setContentMinWidth(w);}};c.prototype.onBeforeRenderingList=function(){if(this.bProcessingLoadItemsEvent){var L=this.getList(),F=this.getFocusDomRef();if(L){L.setBusy(true);}if(F){F.setAttribute("aria-busy","true");}}};c.prototype.onAfterRenderingPicker=function(){var o=this["onAfterRendering"+this.getPickerType()];o&&o.call(this);f.call(this,false);};c.prototype.onAfterRenderingList=function(){if(this.bProcessingLoadItemsEvent&&(this.getItems().length===0)){return;}var L=this.getList(),F=this.getFocusDomRef();this._highlightList(this._sInputValueBeforeOpen);if(L){L.setBusy(false);}if(F){F.removeAttribute("aria-busy");}};c.prototype.oninput=function(e){a.prototype.oninput.apply(this,arguments);if(e.isMarked("invalid")){return;}var t=(this.getPickerType()==="Dropdown");this.loadItems(function(){var o=this.getSelectedItem(),v=e.target.value,E=v==="",d=e.srcControl,V;if(E&&!this.bOpenedByKeyboardOrButton){V=this.getItems();}else{V=this.filterItems({properties:this._getFilters(),value:v});}var i=!!V.length;var F=V[0];var T=(F&&q.sap.startsWithIgnoreCase(F.getText(),v));var g=this.getFilterSecondaryValues();var j=D.system.desktop;if(!E&&F&&F.getEnabled()){if(d._bDoTypeAhead){if(g&&this._oFirstItemTextMatched){d.updateDomValue(this._oFirstItemTextMatched.getText());this.setSelection(this._oFirstItemTextMatched);}else if(g){if(T){d.updateDomValue(F.getText());}else{d.updateDomValue(F.getAdditionalText());}this.setSelection(F);}else{d.updateDomValue(F.getText());this.setSelection(F);}}if(o!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});}if(d._bDoTypeAhead){if(j){s.call(d,v.length,d.getValue().length);}else{setTimeout(s.bind(d,v.length,d.getValue().length),0);}}}if(E||!i||(!d._bDoTypeAhead&&(this._getSelectedItemText()!==v))){this.setSelection(null);if(o!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});}}this._sInputValueBeforeOpen=v;if(this.isOpen()){this._highlightList(v);}if(i){if(E&&!this.bOpenedByKeyboardOrButton){this.close();}else if(t){this.open();this.scrollToItem(this.getSelectedItem());}}else if(this.isOpen()){if(t&&!this.bOpenedByKeyboardOrButton){this.close();}}else{this.clearFilter();}},{name:"input",busyIndicator:false});if(this.bProcessingLoadItemsEvent&&t){this.open();}};c.prototype.onSelectionChange=function(o){var i=o.getParameter("selectedItem"),p=this.getChangeEventParams(),d=(i!==this.getSelectedItem());this.setSelection(i);this.fireSelectionChange({selectedItem:this.getSelectedItem()});if(d){p.itemPressed=true;this.onChange(null,p);}};c.prototype.onItemPress=function(o){var i=o.getParameter("item"),t=i.getText(),p=this.getChangeEventParams(),d=(i!==this.getSelectedItem());this.updateDomValue(t);if(this.getPickerType()==="Dropdown"&&!d){p.itemPressed=true;this.onChange(null,p);}this.close();this.setProperty("value",i.getText(),true);if(this.getPickerType()==="Dropdown"){setTimeout(this.selectText.bind(this,this.getValue().length,this.getValue().length),0);}};c.prototype.onBeforeOpen=function(){var p=this["onBeforeOpen"+this.getPickerType()],d=this.getFocusDomRef();if(this.hasLoadItemsEventListeners()&&!this.bProcessingLoadItemsEvent){this.loadItems();}this.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");if(d){d.setAttribute("aria-owns",this.getList().getId());}this.addContent();p&&p.call(this);};c.prototype.onBeforeOpenDropdown=function(){};c.prototype.onBeforeOpenDialog=function(){var p=this.getPickerTextField();this._oSelectedItemBeforeOpen=this.getSelectedItem();this._sValueBeforeOpen=this.getValue();if(this.getSelectedItem()){this.filterItems({properties:this._getFilters(),value:""});}p.setValue(this._sValueBeforeOpen);};c.prototype.onAfterOpen=function(){var d=this.getFocusDomRef(),i=this.getSelectedItem();if(d){d.setAttribute("aria-expanded","true");i&&d.setAttribute("aria-activedescendant",i.getId());}f.call(this,true);};c.prototype.onBeforeClose=function(){a.prototype.onBeforeClose.apply(this,arguments);var d=this.getFocusDomRef();if(d){d.removeAttribute("aria-owns");d.removeAttribute("aria-activedescendant");}this.removeStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");};c.prototype.onAfterClose=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("aria-expanded","false");}this.clearFilter();this._sInputValueBeforeOpen="";if(this.shouldValueStateMessageBeOpened()&&(document.activeElement===d)){this.openValueStateMessage();}};c.prototype.onItemChange=function(o){var d=this.getAssociation("selectedItem"),n=o.getParameter("newValue"),p=o.getParameter("name");if(d===o.getParameter("id")){switch(p){case"text":if(!this.isBound("value")){this.setValue(n);}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(n);}break;}}};c.prototype.onkeydown=function(e){var o=e.srcControl;a.prototype.onkeydown.apply(o,arguments);if(!o.getEnabled()||!o.getEditable()){return;}var k=q.sap.KeyCodes;o._bDoTypeAhead=(e.which!==k.BACKSPACE)&&(e.which!==k.DELETE);};c.prototype.oncut=function(e){var o=e.srcControl;a.prototype.oncut.apply(o,arguments);o._bDoTypeAhead=false;};c.prototype.onsapenter=function(e){var o=e.srcControl,i=o.getSelectedItem();if(i&&this.getFilterSecondaryValues()){o.updateDomValue(i.getText());}a.prototype.onsapenter.apply(o,arguments);if(!o.getEnabled()||!o.getEditable()){return;}if(o.isOpen()){o.close();}};c.prototype.onsapdown=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function navigateToNextSelectableItem(){var d=this.getSelectableItems();var n=d[d.indexOf(this.getSelectedItem())+1];h.call(this,o,n);});};c.prototype.onsapup=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function navigateToPrevSelectableItem(){var d=this.getSelectableItems();var p=d[d.indexOf(this.getSelectedItem())-1];h.call(this,o,p);});};c.prototype.onsaphome=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function navigateToFirstSelectableItem(){var F=this.getSelectableItems()[0];h.call(this,o,F);});};c.prototype.onsapend=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function navigateToLastSelectableItem(){var L=this.findLastEnabledItem(this.getSelectableItems());h.call(this,o,L);});};c.prototype.onsappagedown=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function(){var d=this.getSelectableItems(),i=d.indexOf(this.getSelectedItem())+10,g;i=(i>d.length-1)?d.length-1:Math.max(0,i);g=d[i];h.call(this,o,g);});};c.prototype.onsappageup=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function(){var d=this.getSelectableItems(),i=d.indexOf(this.getSelectedItem())-10,g;i=(i>d.length-1)?d.length-1:Math.max(0,i);g=d[i];h.call(this,o,g);});};c.prototype.onsapshow=function(e){var d,i;a.prototype.onsapshow.apply(this,arguments);if(!this.getValue()){d=this.getSelectableItems();i=d[0];if(i){this.setSelection(i);this.updateDomValue(i.getText());this.fireSelectionChange({selectedItem:i});setTimeout(function(){this.selectText(0,i.getText().length);}.bind(this),0);}}};c.prototype.onsaphide=c.prototype.onsapshow;c.prototype.onfocusin=function(e){var d=this.getPickerType()==="Dropdown";if(e.target===this.getOpenArea()){this.bOpenValueStateMessage=false;if(d&&!this.isPlatformTablet()){this.focus();}}else{if(d){setTimeout(function(){if(document.activeElement===this.getFocusDomRef()&&!this.bIsFocused&&!this.bFocusoutDueRendering&&!this.getSelectedText()){this.selectText(0,this.getValue().length);}this.bIsFocused=true;}.bind(this),0);}if(!this.isOpen()&&this.bOpenValueStateMessage&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage();}this.bOpenValueStateMessage=true;}this.$().addClass("sapMFocus");};c.prototype.onsapfocusleave=function(e){this.bIsFocused=false;var t,p,r,F,o=e.srcControl,i=o.getSelectedItem();if(i&&this.getFilterSecondaryValues()){o.updateDomValue(i.getText());}a.prototype.onsapfocusleave.apply(this,arguments);if(this.isPickerDialog()){return;}p=this.getAggregation("picker");if(!e.relatedControlId||!p){return;}t=this.isPlatformTablet();r=sap.ui.getCore().byId(e.relatedControlId);F=r&&r.getFocusDomRef();if(q.sap.containsOrEquals(p.getFocusDomRef(),F)&&!t){this.focus();}};c.prototype.setSelection=function(i){var L=this.getList(),k;if(L){L.setSelection(i);}this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof I)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}k=i?i.getKey():"";this.setProperty("selectedKey",k,true);this._handleAriaActiveDescendant(i);this.toggleStyleClass(this.getRenderer().CSS_CLASS_COMBOBOX+"SelectionActive",!!k);};c.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};c.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return;}var k=this.getSelectedKey(),i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);if(this._sValue===this.getValue()){this.setValue(i.getText());this._sValue=this.getValue();}}};c.prototype.isFiltered=function(){var L=this.getList();return L&&(L.getVisibleItems().length!==L.getItems().length);};c.prototype.isItemVisible=function(i){return i&&(i.bVisible===undefined||i.bVisible);};c.prototype.createPicker=function(p){var o=this.getAggregation("picker");if(o){return o;}o=this["create"+p]();this.setAggregation("picker",o,true);var d=this.getRenderer().CSS_CLASS_COMBOBOXBASE;o.setHorizontalScrolling(false).addStyleClass(d+"Picker").addStyleClass(d+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return o;};c.prototype.createList=function(){var r=this.getRenderer();this._oList=new S({width:"100%",busyIndicatorDelay:0}).addStyleClass(r.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(r.CSS_CLASS_COMBOBOX+"List").addEventDelegate({ontap:function(e){this.close();},onBeforeRendering:this.onBeforeRenderingList,onAfterRendering:this.onAfterRenderingList},this).attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);return this._oList;};c.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};c.prototype.getDefaultSelectedItem=function(){return null;};c.prototype.getChangeEventParams=function(){return{itemPressed:false};};c.prototype.clearSelection=function(){this.setSelection(null);};c.prototype.selectText=function(i,d){a.prototype.selectText.apply(this,arguments);this.textSelectionStart=i;this.textSelectionEnd=d;return this;};c.prototype.addAggregation=function(A,o,d){if(A==="items"&&!d&&!this.isInvalidateSuppressed()){this.invalidate(o);}return a.prototype.addAggregation.apply(this,arguments);};c.prototype.setAssociation=function(A,i,d){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.setAssociation.apply(L,arguments);}return a.prototype.setAssociation.apply(this,arguments);};c.prototype.setProperty=function(p,v,d){var L=this.getList();if(/selectedKey|selectedItemId/.test(p)){L&&S.prototype.setProperty.apply(L,arguments);}return a.prototype.setProperty.apply(this,arguments);};c.prototype.removeAllAssociation=function(A,d){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.removeAllAssociation.apply(L,arguments);}return a.prototype.removeAllAssociation.apply(this,arguments);};c.prototype.clone=function(d){var o=a.prototype.clone.apply(this,arguments),L=this.getList();if(!this.isBound("items")&&L){for(var i=0,e=L.getItems();i<e.length;i++){o.addItem(e[i].clone());}o.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));}return o;};c.prototype.findAggregatedObjects=function(){var L=this.getList();if(L){return S.prototype.findAggregatedObjects.apply(L,arguments);}return[];};c.prototype.setShowSecondaryValues=function(A){this.setProperty("showSecondaryValues",A,true);var L=this.getList();if(L){L.setShowSecondaryValues(A);}return this;};c.prototype.getItems=function(){var L=this.getList();return L?L.getItems():[];};c.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=sap.ui.getCore().byId(i);}if(!(i instanceof I)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText(i));return this;};c.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);i=this.getSelectedItem();this.setValue(this._getSelectedItemText(i));return this;};c.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var d=(k===""),e=this.isBound("selectedKey")&&this.isBound("value")&&this.getBindingInfo("selectedKey").skipModelUpdate;if(d){this.setSelection(null);if(!e){this.setValue("");}return this;}var i=this.getItemByKey(k);if(i){this.setSelection(i);if(!e){this.setValue(this._getSelectedItemText(i));}return this;}this._sValue=this.getValue();return this.setProperty("selectedKey",k);};c.prototype.getSelectedItem=function(){var v=this.getAssociation("selectedItem");return(v===null)?null:sap.ui.getCore().byId(v)||null;};c.prototype.updateItems=function(){var r,o=this.getSelectedItem(),r=a.prototype.updateItems.apply(this,arguments);q.sap.clearDelayedCall(this._debounceItemsUpdate);this._debounceItemsUpdate=q.sap.delayedCall(0,this,"_syncItemsSelection",[o]);return r;};c.prototype._syncItemsSelection=function(o){var H,n,d=this.getSelectedKey();if(!o||o===this.getSelectedItem()){return;}n=this.getItems();H=n.some(function(i){return d===i.getKey();});this.setSelectedItem(H&&d?this.getItemByKey(d):null);};c.prototype.removeItem=function(i){i=a.prototype.removeItem.apply(this,arguments);var o;if(this.isBound("items")&&!this.bItemsUpdated){return i;}var v=this.getValue();if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){o=this.getDefaultSelectedItem();this.setSelection(o);this.setValue(v);}return i;};return c;});
