/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/commons/CalloutBaseRenderer','sap/ui/core/Renderer','sap/ui/core/IconPool'],function(q,C,R,I){"use strict";var Q=R.extend(C);Q.renderContent=function(r,c){var a=r;var A=sap.ui.getCore().getConfiguration().getAccessibility();var t=c.getType(),n=c.getFirstTitle(),h=c.getFirstTitleHref(),i=c.getIcon(),d=c.getSecondTitle(),w=c.getWidth(),s=c.getId(),b=c.getTooltip_AsString(),o;a.write("<div");if(b){a.writeAttributeEscaped("title",b);}if(A){a.writeAttribute("role","dialog");a.writeAttribute("aria-labelledby",s+"-title");}a.addClass("sapUiUx3QV");a.writeClasses();if(w){a.addStyle("width",w);a.writeStyles();}a.write(">");a.write("<div");a.writeAttribute("id",s+"-title");a.writeAttribute("tabindex","-1");a.addClass("sapUiUx3QVHeader");a.writeClasses();a.write(">");a.writeEscaped(t);a.write("</div>");if(i||n||d){a.write("<div");if(A){a.writeAttribute("role","heading");}a.addClass("sapUiUx3QVHeading");a.writeClasses();a.write(">");if(i){if(I.isIconURI(i)){o={title:n,tabindex:"-1"};}a.writeIcon(i,"sapUiUx3QVIcon",o);}a.write("<span");a.writeAttribute("id",s+"-name");if(A&&d){a.writeAttribute("aria-describedby",s+"-descr");}a.addClass("sapUiUx3QVTitle1");a.writeClasses();a.write(">");if(h){a.write("<a");a.writeAttribute("id",s+"-link");a.writeAttributeEscaped("href",h);a.writeAttribute("tabindex","-1");a.write(">");}a.writeEscaped(n||"");if(h){a.write("</a>");}a.write("</span>");if(d){a.write("<br><span");a.writeAttribute("id",s+"-descr");a.writeAttribute("tabindex","-1");a.addClass("sapUiUx3QVTitle2");a.writeClasses();a.write(">");a.writeEscaped(d);a.write("</span>");}a.write("</div>");}a.write("<div id=\""+s+"-content\">");this.renderBody(a,c);a.write("</div>");a.write("</div>");if(c.getShowActionBar()&&c.getActionBar()){a.renderControl(c.getActionBar());}};Q.renderBody=function(r,c){var a=c.getContent();for(var i=0;i<a.length;i++){r.write("<div class=\"sapUiUx3QVBody\">");if(a[i]instanceof sap.ui.core.Control){r.renderControl(a[i]);}else if(a[i].getContent&&typeof a[i].getContent=="function"){var b=a[i].getContent();for(var j=0;j<b.length;j++){if(b[j]instanceof sap.ui.core.Control){r.renderControl(b[j]);}}}r.write("</div>");}};return Q;},true);
