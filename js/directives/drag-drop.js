var names = ["draggable", "droppable", "droppableBin", "droppable-initial"];
var topPos;
var stackTop;
var dropPos = {};
var numberOfChildrenPresent;
var position = "top";
var stackTop;
var selectedOptions = {};
var dragElement, accessFlag = false,
    fitToContainer = false;
angular.module(sortApp).directive('draggable', function (sortAppCommonService) {
    return {
        restrict: 'C',
        scope: false,
        link: function (scope, element, attrs) {
            element.draggable({
                revert: "invalid"
            });
            element.off('keydown').on('keydown', sortAppCommonService.draggableAccs);
        }
    };
});


angular.module(sortApp).directive('droppable', function ($compile, sortAppCommonService) {

    return {
        restrict: 'C',
        scope: false,
        link: function (scope, element, attrs) {

            scope.resetFunction = function (resetBtn) {

                angular.element(".draggable").each(function (item) {
                    scope.resetThisElement($(this)[0].id);
                });
                topPos;
                stackTop;
                dropPos = {};
                numberOfChildrenPresent;
                selectedOptions = {};
            };

            scope.$on("reset", scope.resetFunction);

            element.droppable({
                // accept: acceptItem,
                drop: sortAppCommonService.onDrop
            });
            element.off('keydown').on('keydown', function (e) {
                if ((e.keycode === 13 || e.which === 13) && (element.hasClass('answer-box') || element.children().length === 0) && accessFlag) {
                    var ui = {
                        draggable: $(dragElement)
                    };
                    sortAppCommonService.onDrop(e, ui);
                    accessFlag = false;
                    angular.element('.draggable').attr('tabindex', '0');
                    angular.element('.droppable').attr('tabindex', '-1');
                    angular.element('.answer-box').attr('tabindex', '0');
                }
            });
        }
    };
});

// var draggableAccs = function (e) {
//     if (e.keycode === 32 || e.which === 32) {
//         accessFlag = true;
//         dragElement = document.activeElement;
//         var dragElemId = $(document.activeElement).attr('rel');
//         angular.element('.draggable').attr('tabindex', '-1');
//         angular.element('.answer-box').eq(0).focus();
//         if ($(dragElement).parents().hasClass('answer-box')) {
//             for (var i = 0; i < angular.element('.droppable').length; i++) {
//                 if (angular.element('.droppable').eq(i).attr('rel') === dragElemId) {
//                     angular.element('.droppable').eq(i).attr('tabindex', 0);
//                     break;
//                 }
//             }
//         }
//     }
// }


