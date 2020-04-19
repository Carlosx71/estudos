/*!
 * jQuery UI Droppable 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function($,u){function a(x,r,s){return(x>r)&&(x<(r+s));}$.widget("ui.droppable",{version:"1.10.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var p,o=this.options,b=o.accept;this.isover=false;this.isout=true;this.accept=$.isFunction(b)?b:function(d){return d.is(b);};this.proportions=function(){if(arguments.length){p=arguments[0];}else{return p?p:p={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};}};$.ui.ddmanager.droppables[o.scope]=$.ui.ddmanager.droppables[o.scope]||[];$.ui.ddmanager.droppables[o.scope].push(this);(o.addClasses&&this.element.addClass("ui-droppable"));},_destroy:function(){var i=0,d=$.ui.ddmanager.droppables[this.options.scope];for(;i<d.length;i++){if(d[i]===this){d.splice(i,1);}}this.element.removeClass("ui-droppable ui-droppable-disabled");},_setOption:function(k,v){if(k==="accept"){this.accept=$.isFunction(v)?v:function(d){return d.is(v);};}$.Widget.prototype._setOption.apply(this,arguments);},_activate:function(e){var d=$.ui.ddmanager.current;if(this.options.activeClass){this.element.addClass(this.options.activeClass);}if(d){this._trigger("activate",e,this.ui(d));}},_deactivate:function(e){var d=$.ui.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass);}if(d){this._trigger("deactivate",e,this.ui(d));}},_over:function(e){var d=$.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]===this.element[0]){return;}if(this.accept.call(this.element[0],(d.currentItem||d.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass);}this._trigger("over",e,this.ui(d));}},_out:function(e){var d=$.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]===this.element[0]){return;}if(this.accept.call(this.element[0],(d.currentItem||d.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass);}this._trigger("out",e,this.ui(d));}},_drop:function(e,c){var d=c||$.ui.ddmanager.current,b=false;if(!d||(d.currentItem||d.element)[0]===this.element[0]){return false;}this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=$.data(this,"ui-droppable");if(i.options.greedy&&!i.options.disabled&&i.options.scope===d.options.scope&&i.accept.call(i.element[0],(d.currentItem||d.element))&&$.ui.intersect(d,$.extend(i,{offset:i.element.offset()}),i.options.tolerance)){b=true;return false;}});if(b){return false;}if(this.accept.call(this.element[0],(d.currentItem||d.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass);}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass);}this._trigger("drop",e,this.ui(d));return this.element;}return false;},ui:function(c){return{draggable:(c.currentItem||c.element),helper:c.helper,position:c.position,offset:c.positionAbs};}});$.ui.intersect=function(d,c,e){if(!c.offset){return false;}var f,g,x=(d.positionAbs||d.position.absolute).left,y=(d.positionAbs||d.position.absolute).top,h=x+d.helperProportions.width,i=y+d.helperProportions.height,l=c.offset.left,t=c.offset.top,r=l+c.proportions().width,b=t+c.proportions().height;switch(e){case"fit":return(l<=x&&h<=r&&t<=y&&i<=b);case"intersect":return(l<x+(d.helperProportions.width/2)&&h-(d.helperProportions.width/2)<r&&t<y+(d.helperProportions.height/2)&&i-(d.helperProportions.height/2)<b);case"pointer":f=((d.positionAbs||d.position.absolute).left+(d.clickOffset||d.offset.click).left);g=((d.positionAbs||d.position.absolute).top+(d.clickOffset||d.offset.click).top);return a(g,t,c.proportions().height)&&a(f,l,c.proportions().width);case"touch":return((y>=t&&y<=b)||(i>=t&&i<=b)||(y<t&&i>b))&&((x>=l&&x<=r)||(h>=l&&h<=r)||(x<l&&h>r));default:return false;}};$.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,e){var i,j,m=$.ui.ddmanager.droppables[t.options.scope]||[],b=e?e.type:null,l=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();droppablesLoop:for(i=0;i<m.length;i++){if(m[i].options.disabled||(t&&!m[i].accept.call(m[i].element[0],(t.currentItem||t.element)))){continue;}for(j=0;j<l.length;j++){if(l[j]===m[i].element[0]){m[i].proportions().height=0;continue droppablesLoop;}}m[i].visible=m[i].element.css("display")!=="none";if(!m[i].visible){continue;}if(b==="mousedown"){m[i]._activate.call(m[i],e);}m[i].offset=m[i].element.offset();m[i].proportions({width:m[i].element[0].offsetWidth,height:m[i].element[0].offsetHeight});}},drop:function(d,e){var b=false;$.each(($.ui.ddmanager.droppables[d.options.scope]||[]).slice(),function(){if(!this.options){return;}if(!this.options.disabled&&this.visible&&$.ui.intersect(d,this,this.options.tolerance)){b=this._drop.call(this,e)||b;}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],(d.currentItem||d.element))){this.isout=true;this.isover=false;this._deactivate.call(this,e);}});return b;},dragStart:function(d,e){d.element.parentsUntil("body").bind("scroll.droppable",function(){if(!d.options.refreshPositions){$.ui.ddmanager.prepareOffsets(d,e);}});},drag:function(d,e){if(d.options.refreshPositions){$.ui.ddmanager.prepareOffsets(d,e);}$.each($.ui.ddmanager.droppables[d.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return;}var p,s,b,i=$.ui.intersect(d,this,this.options.tolerance),c=!i&&this.isover?"isout":(i&&!this.isover?"isover":null);if(!c){return;}if(this.options.greedy){s=this.options.scope;b=this.element.parents(":data(ui-droppable)").filter(function(){return $.data(this,"ui-droppable").options.scope===s;});if(b.length){p=$.data(b[0],"ui-droppable");p.greedyChild=(c==="isover");}}if(p&&c==="isover"){p.isover=false;p.isout=true;p._out.call(p,e);}this[c]=true;this[c==="isout"?"isover":"isout"]=false;this[c==="isover"?"_over":"_out"].call(this,e);if(p&&c==="isout"){p.isout=false;p.isover=true;p._over.call(p,e);}});},dragStop:function(d,e){d.element.parentsUntil("body").unbind("scroll.droppable");if(!d.options.refreshPositions){$.ui.ddmanager.prepareOffsets(d,e);}}};})(jQuery);
