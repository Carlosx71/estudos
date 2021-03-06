/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Element','sap/ui/core/StashedControlSupport'],function(q,l,E,S){"use strict";var L=E.extend("sap.uxap.ObjectPageLazyLoader",{metadata:{library:"sap.uxap",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},defaultAggregation:"content"}});S.mixInto(L);L.prototype.setParent=function(p){if(!(p===null||p instanceof sap.uxap.ObjectPageSubSection)){}return E.prototype.setParent.apply(this,arguments);};return L;});
