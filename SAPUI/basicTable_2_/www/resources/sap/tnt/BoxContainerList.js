/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/m/ListBase","sap/tnt/Box","sap/ui/Device","sap/ui/core/ResizeHandler"],function(l,L,B,D,R){"use strict";var a=l.ListGrowingDirection;var s={"Phone":"sapTntBoxContainerSizeS","Tablet":"sapTntBoxContainerSizeM","Desktop":"sapTntBoxContainerSizeL","LargeDesktop":"sapTntBoxContainerSizeXL"};var b=L.extend("sap.tnt.BoxContainerList",{metadata:{library:"sap.tnt",properties:{boxWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxesPerRowConfig:{type:"sap.tnt.BoxesPerRowConfig",group:"Behavior",defaultValue:"XL7 L6 M4 S2"}}}});b.prototype.onBeforeRendering=function(){this._deregisterResizeListener();L.prototype.onBeforeRendering.apply(this,arguments);};b.prototype.exit=function(){this._deregisterResizeListener();L.prototype.exit.apply(this,arguments);};b.prototype.onAfterRendering=function(){this._registerResizeListener();if(!this.getBoxWidth()){this._applySizeClass(this.$().width());}if(D.browser.msie){this._flattenHeight();}L.prototype.onAfterRendering.apply(this,arguments);};b.prototype._registerResizeListener=function(){this._sResizeListenerId=R.register(this,this._onResize.bind(this));};b.prototype._deregisterResizeListener=function(){if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}};b.prototype._onResize=function(e){if(e){if(!this.getBoxWidth()){this._applySizeClass(e.size.width);}this.setItemNavigationColumns();}if(D.browser.msie){this._flattenHeight();}};b.prototype._applySizeClass=function(w){var $=this.$(),r=D.media.getCurrentRange("StdExt",w),S=s[r.name],c;if(!$.hasClass(S)){c=Object.keys(s).map(function(d){return s[d];});$.removeClass(c.join(" "));$.addClass(S);}};b.prototype._flattenHeight=function(){var i=[],m=0,d;this.getItems().forEach(function(I){if(I instanceof B){d=I.getDomRef();i.push(d);d.style.height=null;m=Math.max(d.getBoundingClientRect().height,m);}});i.forEach(function(d){if(d.getBoundingClientRect().height<m){d.style.height=m+"px";}});};b.prototype._startItemNavigation=function(){L.prototype._startItemNavigation.apply(this,arguments);if(this._oItemNavigation){this._oItemNavigation.setTableMode(true,false);this.setItemNavigationColumns();}};b.prototype.setItemNavigationColumns=function(){var I,p,i,o;if(!this._oItemNavigation){return;}I=this.getItems();if(I.length){p=I[0].$().offset().top;for(i=1;i<I.length;i++){o=I[i];if(o.$().offset().top!==p){break;}}this._oItemNavigation.setColumns(i);}};b.prototype.setNavigationItems=function(i,n){var N=[];if(this.isGrouped()){N=jQuery(n).find(".sapTntBoxContainerGrid > .sapMLIB").get();}else{N=jQuery(n).children(".sapMLIB").get();}i.setItemDomRefs(N);if(i.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==a.Upwards){i.setFocusedIndex(N.length-1);}else{i.setFocusedIndex(0);}}};return b;});