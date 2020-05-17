/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var M={};M.render=function(R,m){var a=R;var r=M;var b=sap.ui.getCore().getConfiguration().getRTL();var i=0;var j=0;var c=0;var l=0;var o;var C;var d;var e;var f;var s;var v;var B;a.write("<TABLE role=\"presentation\"");a.writeControlData(m);a.write(" cellpadding=\"0\" cellspacing=\"0\"");a.addStyle("border-collapse","collapse");var g=m.getWidth();if(g){a.addStyle("width",g);}var h=m.getHeight();if(h&&h!='auto'){a.addStyle("height",h);e=r.getValueUnit(h);}if(m.getLayoutFixed()){a.addStyle("table-layout","fixed");if(!g){a.addStyle("width","100%");}}a.addClass("sapUiMlt");a.writeStyles();a.writeClasses();if(m.getTooltip_AsString()){a.writeAttributeEscaped('title',m.getTooltip_AsString());}a.write('>');var k=m.getRows();var n=m.getColumns();if(n<1){for(i=0;i<k.length;i++){o=k[i];C=o.getCells();if(n<C.length){n=C.length;}}}if(n>0){var w=m.getWidths();a.write("<colgroup>");for(j=0;j<n;j++){a.write("<col");if(w&&w[j]&&w[j]!="auto"){a.addStyle('width',w[j]);a.writeStyles();}a.write("></col>");}a.write("</colgroup>");}var D=true;var p=false;a.write('<TBODY style="width: 100%; height: 100%">');for(i=0;i<k.length;i++){o=k[i];var t=o.getHeight();if(t=="auto"){t="";}if(t&&e){f=r.getValueUnit(t);if(f.Unit=='%'&&e.Unit!='%'){t=(e.Value*f.Value/100)+e.Unit;}}a.write("<tr");a.writeElementData(o);a.writeClasses(o);if(o.getTooltip_AsString()){a.writeAttributeEscaped('title',o.getTooltip_AsString());}B=sap.ui.Device.browser.edge||sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version>=9;if(B&&t){a.addStyle("height",t);a.writeStyles();}a.write(">");C=o.getCells();var u=n;if(n<1){u=C.length;}p=false;var y=0;if(!o.RowSpanCells){o.RowSpanCells=0;}else{p=true;}for(j=0;j<u;j++){if(j>=(u-y-o.RowSpanCells)){break;}var z=C[j];a.write("<td");if(t&&(!z||z.getRowSpan()==1)){a.addStyle("height",t);}if(z){a.writeElementData(z);if(z.getTooltip_AsString()){a.writeAttributeEscaped('title',z.getTooltip_AsString());}if(m.getLayoutFixed()&&z.getContent().length>0){a.addStyle("overflow","hidden");}var H=r.getHAlignClass(z.getHAlign(),b);if(H){a.addClass(H);}v=r.getVAlign(z.getVAlign());if(v){a.addStyle("vertical-align",v);}if(z.getColSpan()>1){a.writeAttribute("colspan",z.getColSpan());y=y+z.getColSpan()-1;p=true;}if(z.getRowSpan()>1){a.writeAttribute("rowspan",z.getRowSpan());var V=0;var U="";for(var x=0;x<z.getRowSpan();x++){var A=k[i+x];if(!A){U=false;break;}if(!A.RowSpanCells){A.RowSpanCells=0;}if(x>0){A.RowSpanCells=A.RowSpanCells+z.getColSpan();}var E=A.getHeight();if(!E||E=="auto"){U=false;}else{var F=r.getValueUnit(E);if(F.Unit=='%'&&e.Unit!='%'){F.Value=(e.Value*f.Value/100);F.Unit=e.Unit;}if(U==""){U=F.Unit;}else if(U!=F.Unit){U=false;}V=V+F.Value;}}if(U!=false){s=V+U;a.addStyle("height",s);}}a.addClass(r.getBackgroundClass(z.getBackgroundDesign()));a.addClass(r.getSeparationClass(z.getSeparation()));if(!m.getLayoutFixed()||!t){a.addClass(r.getPaddingClass(z.getPadding()));a.addClass("sapUiMltCell");}else{a.addStyle("white-space","nowrap");}a.writeClasses(z);}a.writeStyles();a.write(">");if(z){if(m.getLayoutFixed()&&t){a.write('<div');if(z.getRowSpan()!=1&&s&&s.search('%')==-1){a.addStyle("height",s);}else if(t.search('%')!=-1||(z.getRowSpan()!=1&&!s)){a.addStyle("height",'100%');}else{a.addStyle("height",t);}a.addStyle("display","inline-block");if(v){a.addStyle("vertical-align",v);}a.writeStyles();a.writeClasses(false);a.write("></div>");a.write('<div');a.addStyle("display","inline-block");if(v){a.addStyle("vertical-align",v);}if(z.getRowSpan()!=1&&s&&s.search('%')==-1){a.addStyle("max-height",s);}else if(t.search('%')!=-1||(z.getRowSpan()!=1&&!s)){a.addStyle("max-height",'100%');}else{a.addStyle("max-height",t);}var G="0";var I="";var J="0";d=z.getContent();for(c=0,l=d.length;c<l;c++){if(d[c].getHeight&&d[c].getHeight()!=""){var K=r.getValueUnit(d[c].getHeight());if(K){if(I==""){I=K.Unit;}if(I!=K.Unit){I="%";G="100";break;}if(K.Unit=="%"){if(parseFloat(G)<parseFloat(K.Value)){G=K.Value;if(G!="100"){J=10000/parseFloat(G);}}}}}}if(G!="0"){a.addStyle("height",G+I);}a.addStyle("white-space","normal");a.addStyle("width","100%");a.writeStyles();a.writeClasses(false);a.write("><div");a.addStyle("overflow","hidden");a.addStyle("text-overflow","inherit");if(G!="0"){if(J!="0"){a.addStyle("height",J+"%");}else{a.addStyle("height","100%");}}a.addClass("sapUiMltCell");a.addClass(r.getPaddingClass(z.getPadding()));a.writeStyles();a.writeClasses(false);a.write(">");}d=z.getContent();for(c=0,l=d.length;c<l;c++){R.renderControl(d[c]);}if(m.getLayoutFixed()&&t){a.write("</div></div>");}}a.write("</td>");}a.write("</tr>");o.RowSpanCells=undefined;if(!p){D=false;}}if(D&&sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version>=9){a.write("<tr style='height:0;'>");for(i=0;i<n;i++){a.write("<td></td>");}a.write("</tr>");}a.write("</TBODY></TABLE>");};M.getHAlignClass=function(h,r){var c="sapUiMltCellHAlign";switch(h){case sap.ui.commons.layout.HAlign.Begin:return null;case sap.ui.commons.layout.HAlign.Center:return c+"Center";case sap.ui.commons.layout.HAlign.End:return c+(r?"Left":"Right");case sap.ui.commons.layout.HAlign.Left:return r?c+"Left":null;case sap.ui.commons.layout.HAlign.Right:return r?null:c+"Right";default:return null;}};M.getVAlign=function(v){switch(v){case sap.ui.commons.layout.VAlign.Bottom:return"bottom";case sap.ui.commons.layout.VAlign.Middle:return"middle";case sap.ui.commons.layout.VAlign.Top:return"top";default:return null;}};M.getBackgroundClass=function(b){switch(b){case sap.ui.commons.layout.BackgroundDesign.Border:return"sapUiMltBgBorder";case sap.ui.commons.layout.BackgroundDesign.Fill1:return"sapUiMltBgFill1";case sap.ui.commons.layout.BackgroundDesign.Fill2:return"sapUiMltBgFill2";case sap.ui.commons.layout.BackgroundDesign.Fill3:return"sapUiMltBgFill3";case sap.ui.commons.layout.BackgroundDesign.Header:return"sapUiMltBgHeader";case sap.ui.commons.layout.BackgroundDesign.Plain:return"sapUiMltBgPlain";case sap.ui.commons.layout.BackgroundDesign.Transparent:return null;default:return null;}};M.getPaddingClass=function(p){switch(p){case sap.ui.commons.layout.Padding.None:return"sapUiMltPadNone";case sap.ui.commons.layout.Padding.Begin:return"sapUiMltPadLeft";case sap.ui.commons.layout.Padding.End:return"sapUiMltPadRight";case sap.ui.commons.layout.Padding.Both:return"sapUiMltPadBoth";case sap.ui.commons.layout.Padding.Neither:return"sapUiMltPadNeither";default:return null;}};M.getSeparationClass=function(s){switch(s){case sap.ui.commons.layout.Separation.None:return null;case sap.ui.commons.layout.Separation.Small:return"sapUiMltSepS";case sap.ui.commons.layout.Separation.SmallWithLine:return"sapUiMltSepSWL";case sap.ui.commons.layout.Separation.Medium:return"sapUiMltSepM";case sap.ui.commons.layout.Separation.MediumWithLine:return"sapUiMltSepMWL";case sap.ui.commons.layout.Separation.Large:return"sapUiMltSepL";case sap.ui.commons.layout.Separation.LargeWithLine:return"sapUiMltSepLWL";default:return null;}};M.getValueUnit=function(s){var v=0;var u="";var p=s.search('px');if(p>-1){u="px";v=parseInt(s.slice(0,p),10);return({Value:v,Unit:u});}p=s.search('pt');if(p>-1){u="pt";v=parseFloat(s.slice(0,p));return({Value:v,Unit:u});}p=s.search('in');if(p>-1){u="in";v=parseFloat(s.slice(0,p));return({Value:v,Unit:u});}p=s.search('mm');if(p>-1){u="mm";v=parseFloat(s.slice(0,p));return({Value:v,Unit:u});}p=s.search('cm');if(p>-1){u="cm";v=parseFloat(s.slice(0,p));return({Value:v,Unit:u});}p=s.search('em');if(p>-1){u="em";v=parseFloat(s.slice(0,p));return({Value:v,Unit:u});}p=s.search('ex');if(p>-1){u="ex";v=parseFloat(s.slice(0,p));return({Value:v,Unit:u});}p=s.search('%');if(p>-1){u="%";v=parseFloat(s.slice(0,p));return({Value:v,Unit:u});}};return M;},true);
