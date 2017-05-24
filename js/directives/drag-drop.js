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
angular.module(sortApp).directive('draggable', function () {
    return {
        // A = attribute, E = Element, C = Class and M = HTML Comment
        restrict: 'C',
        scope: false,
        //The link function is responsible for registering DOM listeners as well as updating the DOM.
        link: function (scope, element, attrs) {
            element.draggable({
                // containment: ".container-fluid",
                revert: "invalid",
                //helper: "clone",
                // scroll: false,
                start: function (event, ui) {
                    // console.log(event, $(this));
                    // $(this).css("visibility", "hidden");
                },
                stop: function (event, ui) { }

            });
            element.off('keydown').on('keydown', draggableAccs);
        }
    };
});


// if (!acceptItem) {
//     position = "top";
// }

angular.module(sortApp).directive('droppable', function ($compile,sortAppCommonService) {

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
                    onDrop(e, ui);
                    accessFlag = false;
                    angular.element('.draggable').attr('tabindex', '0');
                    angular.element('.droppable').attr('tabindex', '-1');
                    angular.element('.answer-box').attr('tabindex', '0');
                }
            });
        }
    };
});
var draggableAccs=function (e) {
                if (e.keycode === 32 || e.which === 32) {
                    accessFlag = true;
                    dragElement = document.activeElement;
                    var dragElemId = $(document.activeElement).attr('rel');
                    angular.element('.draggable').attr('tabindex', '-1');
                    angular.element('.answer-box').eq(0).focus();
                    if ($(dragElement).parents().hasClass('answer-box')) {
                        for (var i = 0; i < angular.element('.droppable').length; i++) {
                            if (angular.element('.droppable').eq(i).attr('rel') === dragElemId) {
                                angular.element('.droppable').eq(i).attr('tabindex', 0);
                                break;
                            }
                        }
                    }
                }
            }
//var onDrop = function (event, ui) {
//    // console.log(angular.element(event.target).attr("class"),ui);
//    if (angular.element(event.target).attr("class").indexOf("input-texts") > -1) {
//        console.log("call revert");
//        console.log(ui.draggable.position());
//        fitToContainer = true;
//        //scope.resetThisElement(ui.draggable.attr("id"));
//        //return;
//    }
//    var $this = accessFlag === true ? $(document.activeElement) : $(this);
//    // $this.append(ui.draggable);
//    if ($this[0].id.indexOf(names[2]) > -1) {
//        numberOfChildrenPresent = $this.children().length + 1;
//    }
//
//    // numberOfChildrenPresent = dropCount[ $this[ 0 ].id ];
//    ui.draggable.position({
//        my: "center",
//        at: position,
//        of: $this,
//        using: function (pos) {
//            dropPos[ui.draggable[0].id] = pos;
//            console.log(pos);
//            if (numberOfChildrenPresent > 0) {
//                pos.top += numberOfChildrenPresent * 20;
//            }
//            if (!topPos) {
//                topPos = 1;
//                stackTop = pos.top;
//            }
//            if ($this[0].classList.contains(names[3])) {
//                pos.top += ui.draggable.height() * 1.5;
//                dropPos[ui.draggable[0].id] = 0;
//            }
//            $(this).animate(pos, {
//                easing: "linear",
//                duration: 500,
//                complete: function () {
//                    $this.append(ui.draggable);
//
//                    var left = $this[0].offsetWidth / 2;
//                    if ($this[0].id.indexOf("droppableBin") > -1) {
//                        ui.draggable.css({
//                            "display": "block",
//                            "position": "relative",
//                            "top": 0,
//                            "left": 0,
//                        });
//                    } else {
//                        ui.draggable.css({
//                            "display": "inline-block",
//                            "position": "absolute",
//                            "top": "0px",
//                            "left": "0px"
//                        });
//                    }
//                    console.log($this[0].id);
//                    console.log(ui.draggable[0]);
//                    if (!selectedOptions[$this[0].id]) {
//                        selectedOptions[$this[0].id] = [];
//                    }
//                    for (var i in selectedOptions) {
//                        for (var j = 0; j < selectedOptions[i].length; j++) {
//                            if (selectedOptions[i][j] === ui.draggable[0]) {
//                                selectedOptions[i].splice(j, 1);
//                                break;
//                            }
//                        }
//                    }
//                    selectedOptions[$this[0].id].push(ui.draggable[0]);
//                    console.log(selectedOptions);
//                    numberOfChildrenPresent = 0;
//                }
//            });
//        }
//    });
//    reAlignFunction();
//};
//var reAlignFunction = function () {
//    $(".droppable").each(function () {
//        $bin = this;
//        for (var i = 0; i < $bin.children.length; i++) {
//            if (i === 0) {
//                if (parseFloat($bin.children[i].style.top) > topPos) {
//                    $bin.children[i].style.top = topPos + "px";
//                }
//            } else {
//                if ((parseFloat($bin.children[i].style.top) - 20) > parseFloat($bin.children[i].style.top)) {
//                    $bin.children[i].style.top = (parseFloat($bin.children[i].style.top) + 20) + "px";
//                }
//            }
//        }
//    });
//};



