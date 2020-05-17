/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/plugin/ElementMover','sap/ui/dt/OverlayUtil','sap/ui/dt/ElementUtil','sap/ui/fl/Utils','sap/ui/rta/Utils','sap/ui/rta/command/CommandFactory','sap/ui/rta/plugin/Plugin','sap/ui/dt/OverlayRegistry','sap/ui/rta/util/BindingsExtractor','sap/ui/dt/MetadataPropagationUtil'],function(E,O,a,F,U,C,P,b,B,M){"use strict";var R=E.extend("sap.ui.rta.plugin.RTAElementMover",{metadata:{library:"sap.ui.rta",properties:{commandFactory:{type:"any",defaultValue:C},movableTypes:{type:"string[]",defaultValue:["sap.ui.core.Element"]}},associations:{},events:{}}});R.prototype.init=function(){this.oBasePlugin=new P({commandFactory:this.getCommandFactory()});};R.prototype.exit=function(){this.oBasePlugin.destroy();};R.prototype.setCommandFactory=function(c){this.setProperty("commandFactory",c);this.oBasePlugin.setCommandFactory(c);};R.prototype.isEditable=function(o,c){var e=o.getElement();var m=false;if(this.isMovableType(e)&&this.checkMovable(o,c)&&!O.isInAggregationBinding(o,e.sParentAggregationName)){m=true;}o.setMovable(m);return m;};function i(o,c){var v=false,d=o.getDesignTimeMetadata(),p=o.getParentElementOverlay();if(!d||!p){return false;}var r=o.getRelevantContainer();var e=b.getOverlay(r);if(!e){return false;}v=this._isMoveAvailableOnRelevantContainer(o);if(v){v=this.oBasePlugin.hasStableId(o)&&this.oBasePlugin.hasStableId(p)&&this.oBasePlugin.hasStableId(e);}if(v){var f=O.findAllUniqueAggregationOverlaysInContainer(o,e);var V=f.filter(function(A){return this.checkTargetZone(A,o,c);}.bind(this));if(V.length<1){v=false;}else if(V.length===1){var g=V[0].getChildren().filter(function(j){var k=j.getElement();return(k&&k.getVisible()&&k.getParent());});v=g.length>1;}}return v;}function h(A,e,r){var o=A.getDesignTimeMetadata();var m=o.getAction("move",e);if(!m){return false;}return this.oBasePlugin.hasChangeHandler(m.changeType,r);}E.prototype._getMoveAction=function(o){var p,c=o.getParentAggregationOverlay();if(c){p=c.getDesignTimeMetadata();}return p?p.getAction("move",o.getElement()):undefined;};E.prototype.isMovableType=function(e){return true;};R.prototype.checkMovable=function(o,c){return i.call(this,o,c);};R.prototype.checkTargetZone=function(A,o,c){var m=o?o:this.getMovedOverlay();var t=E.prototype.checkTargetZone.call(this,A,m,c);if(!t){return false;}var d=m.getElement();var T=A.getParent();var e=m.getRelevantContainer();var f=T.getElement();var g=A.getDesignTimeMetadata();var v=M.getRelevantContainerForPropagation(g.getData(),d);v=v?v:f;if(!e||!v||!this.oBasePlugin.hasStableId(T)||e!==v){return false;}if(m.getParent().getElement()!==f){var j=B.getBindings(d,d.getModel());if(Object.keys(j).length>0&&d.getBindingContext()&&f.getBindingContext()){var s=U.getEntityTypeByPath(d.getModel(),d.getBindingContext().getPath());var k=U.getEntityTypeByPath(f.getModel(),f.getBindingContext().getPath());if(!(s===k)){return false;}}}return h.call(this,A,d,v);};R.prototype._isMoveAvailableOnRelevantContainer=function(o){var c,m=this._getMoveAction(o);if(m&&m.changeType){c=o.getRelevantContainer();var r=b.getOverlay(c);if(!this.oBasePlugin.hasStableId(r)){return false;}return this.oBasePlugin.hasChangeHandler(m.changeType,c);}return false;};R.prototype.buildMoveCommand=function(){var m=this.getMovedOverlay();var p=m.getParentAggregationOverlay();var o=m.getElement();var s=this._getSource();var r=m.getRelevantContainer();var t=O.getParentInformation(m);var S=s.index;var T=t.index;var c=this._compareSourceAndTarget(s,t);if(c){return undefined;}delete s.index;delete t.index;var d=this._getMoveAction(m);var v=this.oBasePlugin.getVariantManagementReference(m,d,true);var e=this.getCommandFactory().getCommandFor(r,"Move",{movedElements:[{element:o,sourceIndex:S,targetIndex:T}],source:s,target:t},p.getDesignTimeMetadata(),v);return e;};return R;},true);
