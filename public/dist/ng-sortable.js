!function(e,n,t){"use strict";return"function"==typeof define&&define.amd?void define(["angular"],function(e){return t(e,n)}):t(e,n)}(angular||null,Sortable||null,function(e,n){var t=e.module("de.ng-sortable",[]);return t.directive("ngSortable",["$parse","$timeout",function(t,r){return{scope:{itemArray:"=ngSortable",listItemSelector:"@ngSortableItemSelector",orderChanged:"&ngSortableOnChange"},link:function(t,r,o){function a(e){l=u.contents()}function i(n){var r=e.element(n.item),o=r.scope(),a=o.$index,i=d.call(u.children()),c=i.indexOf(r[0]);u.append(l),t.$apply(function(){var e=t.itemArray.splice(a,1)[0];t.itemArray.splice(c,0,e)}),t.orderChanged()}var l,c,u=r,d=Array.prototype.slice;c=new n(r[0],{draggable:t.listItemSelector,onUpdate:i,handle:".btn-move"}),u.on("mousedown",a).on("touchstart",a).on("selectstart",a)}}}]),t});