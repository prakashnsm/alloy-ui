AUI.add("aui-overlay-context",function(n){var g=n.Lang,l=g.isString,m=g.isNumber,j=g.isObject,i=g.isBoolean,p=function(A){return(A instanceof n.NodeList);},f="align",v="bl",w="boundingBox",a="cancellableHide",o="overlaycontext",x="currentNode",k="focused",u="hide",c="hideDelay",q="hideOn",s="hideOnDocumentClick",h="mousedown",d="show",z="showDelay",t="showOn",y="tl",b="trigger",r="visible";var e=n.Component.create({NAME:o,ATTRS:{align:{value:{node:null,points:[y,v]}},cancellableHide:{value:true,validator:i},currentNode:{valueFn:function(){return this.get(b).item(0);}},delay:{value:null,validator:j},hideOn:{lazyAdd:false,value:"mouseout",setter:function(A){return this._setHideOn(A);}},hideOnDocumentClick:{lazyAdd:false,setter:function(A){return this._setHideOnDocumentClick(A);},value:true,validator:i},hideDelay:{value:0},showOn:{lazyAdd:false,value:"mouseover",setter:function(A){return this._setShowOn(A);}},showDelay:{value:0,validator:m},trigger:{lazyAdd:false,setter:function(A){if(p(A)){return A;}else{if(l(A)){return n.all(A);}}return new n.NodeList([A]);}},visible:{value:false}},EXTENDS:n.OverlayBase,constructor:function(B){var A=this;A._hideTask=n.debounce(A.hide,null,A);A._showTask=n.debounce(A.show,null,A);A._showCallback=null;A._hideCallback=null;e.superclass.constructor.apply(this,arguments);},prototype:{bindUI:function(){var A=this;var B=A.get(w);B.on(h,A._stopTriggerEventPropagation);A.before("triggerChange",A._beforeTriggerChange);A.before("showOnChange",A._beforeShowOnChange);A.before("hideOnChange",A._beforeHideOnChange);A.after("triggerChange",A._afterTriggerChange);A.after("showOnChange",A._afterShowOnChange);A.after("hideOnChange",A._afterHideOnChange);B.on("click",n.bind(A._cancelAutoHide,A));B.on("mouseenter",n.bind(A._cancelAutoHide,A));B.on("mouseleave",n.bind(A._invokeHideTaskOnInteraction,A));A.after("focusedChange",n.bind(A._invokeHideTaskOnInteraction,A));A.on("visibleChange",A._onVisibleChangeOverlayContext);},hide:function(){var A=this;A.clearIntervals();A.fire("hide");e.superclass.hide.apply(A,arguments);},show:function(B){var A=this;A.clearIntervals();A.updateCurrentNode(B);A.fire("show");e.superclass.show.apply(A,arguments);A.refreshAlign();},toggle:function(B){var A=this;if(A.get(r)){A._hideTask.delay(A.get(c),B);}else{A._showTask.delay(A.get(z),B);}},clearIntervals:function(){this._hideTask.cancel();this._showTask.cancel();},refreshAlign:function(){var A=this;var C=A.get(f);var B=A.get(x);if(B){A._uiSetAlign(B,C.points);}},updateCurrentNode:function(D){var A=this;var F=A.get(f);var B=A.get(b);var E=null;if(D){E=D.currentTarget;}var C=F.node||E||B.item(0);if(C){A.set(x,C);}},_toggle:function(B){var A=this;var C=B.currentTarget;if(A._lastTarget!=C){A.hide();}A.toggle(B);B.stopPropagation();A._lastTarget=C;},_afterShowOnChange:function(C){var A=this;var D=C.prevVal==A.get(q);if(D){var B=A.get(b);B.detach(C.prevVal,A._hideCallback);A._setHideOn(A.get(q));}},_afterHideOnChange:function(C){var A=this;var D=C.prevVal==A.get(t);if(D){var B=A.get(b);B.detach(C.prevVal,A._showCallback);A._setShowOn(A.get(t));}},_afterTriggerChange:function(B){var A=this;A._setShowOn(A.get(t));A._setHideOn(A.get(q));},_beforeShowOnChange:function(C){var A=this;var B=A.get(b);B.detach(C.prevVal,A._showCallback);},_beforeHideOnChange:function(C){var A=this;var B=A.get(b);B.detach(C.prevVal,A._hideCallback);},_beforeTriggerChange:function(E){var A=this;var D=A.get(b);var B=A.get(t);var C=A.get(q);D.detach(B,A._showCallback);D.detach(C,A._hideCallback);D.detach(h,A._stopTriggerEventPropagation);},_cancelAutoHide:function(B){var A=this;if(A.get(a)){A.clearIntervals();}B.stopPropagation();},_invokeHideTaskOnInteraction:function(C){var B=this;var A=B.get(a);var D=B.get(k);if(!D&&!A){B._hideTask.delay(B.get(c));}},_onVisibleChangeOverlayContext:function(B){var A=this;if(B.newVal&&A.get("disabled")){B.preventDefault();}},_stopTriggerEventPropagation:function(A){A.stopPropagation();},_setHideOn:function(E){var B=this;var D=B.get(b);var A=E==B.get(t);if(A){B._hideCallback=n.bind(B._toggle,B);D.detach(E,B._showCallback);}else{var C=B.get(c);B._hideCallback=function(F){B._hideTask.delay(C,F);F.stopPropagation();};}D.on(E,B._hideCallback);return E;},_setHideOnDocumentClick:function(B){var A=this;if(B){n.OverlayContextManager.register(A);}else{n.OverlayContextManager.remove(A);}return B;},_setShowOn:function(E){var B=this;var D=B.get(b);var A=E==B.get(q);if(A){B._showCallback=n.bind(B._toggle,B);D.detach(E,B._hideCallback);}else{var C=B.get(z);B._showCallback=function(F){B._showTask.delay(C,F);F.stopPropagation();};}if(E!=h){D.on(h,B._stopTriggerEventPropagation);}else{D.detach(h,B._stopTriggerEventPropagation);}D.on(E,B._showCallback);return E;}}});n.OverlayContext=e;n.OverlayContextManager=new n.OverlayManager({});n.on(h,function(){n.OverlayContextManager.hideAll();},n.getDoc());},"@VERSION@",{requires:["aui-overlay-manager","aui-delayed-task"]});