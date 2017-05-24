window.globalScope = null;

(function (module) {
    'use strict';

    function sortController($scope, sortAppCommonService, $rootScope) {
        window.globalScope = $scope;
        $scope.currentIndex = 0;
        $scope.init = function () {
            $scope.qstnData = null;
            $scope.qstnSets = [];
            $scope.title = "";
            $scope.directions = "";
            $scope.options = [];
            $scope.prevClickDisabled = true;
            $scope.nextClickDisabled = false;
            $scope.wrongAnswers = [];
            $scope.disableValidate = true;
        };

        $scope.loadData = function (index) {
            // $scope.currentIndex = typeof index === "number" ? index : $scope.currentIndex;
            $scope.qstnData = sortAppCommonService.getData().sorting_open_defined;
            console.log($scope.qstnData);
            $scope.title = $scope.qstnData.title;
            $scope.directions = $scope.qstnData.directions;
            $scope.allQuestions = $scope.qstnData.levels.level.rounds.round;
            $scope.prepareQuestionSet($scope.currentIndex);
            $scope.makeOptions();
        };
        $scope.resetThisElement = function (element) {
            var id = element.split(names[0])[1];
            var ansBox = "#droppable" + id;
            var dragItem = "draggable" + id;
            var dragItemId = "#" + dragItem;
            $(dragItemId).css({
                display: "inline"
            });
            var ans = $(dragItemId)[0];
            if (dropPos[dragItem]) {
                if (dropPos[dragItem].top < $("#droppableBin0").width()) {
                    ans.style.top = stackTop + "px";
                    if (dropPos[dragItem].left >= $(window).innerWidth() / 3.25) {
                        ans.style.left = dropPos[dragItem].left / 3.25 + "px";
                        // ans.style.left = $(dragItemId).getBoundingClientRect().left;
                    } else {
                        ans.style.left = dropPos[dragItem].left + "px";
                    }
                } else {
                    ans.style.top = dropPos[dragItem].top + "px";
                    ans.style.left = dropPos[dragItem].left + "px";
                }

            }

            $(dragItemId).remove();
            $(ansBox).append(ans);

            $(ans).animate({
                display: "inline",
                position: "relative",
                top: "0px",
                left: "0px"
            }, {
                easing: "linear",
                duration: 500,
                complete: function () {
                    // location.reload();
                    $(ans).draggable();
                }
            });
        };

        $scope.prepareQuestionSet = function (index) {
            var bins = $scope.allQuestions[index].screens.item.bins.bin;
            for (var i = 0; i < bins.length; i++) {
                $scope.qstnSets.push({
                    title: bins[i].title,
                    options: $scope.getOptions(bins[i].contents.item)
                });
            }
            console.log($scope.qstnSets);
        };

        $scope.validate = function () {
            for (var i in selectedOptions) {
                var idx = parseInt(i[i.length - 1], 10);
                $scope.optionsToRevert($scope.qstnSets[idx].options, selectedOptions[i]);
            }
        }
        $scope.optionsToRevert = function (options, answers) {
            for (var i = 0; i <= options.length; i++) {
                for (var j = 0; j <= answers.length; j++) {
                    if (options[i] === $(answers[j]).text()) {
                        answers[j] = null;
                    }
                }
            }
            answers.map(function (elm) {
                if (!!elm) {
                    console.log(angular.element(elm).attr("id"), angular.element(elm).text());
                    $scope.resetThisElement(angular.element(elm).attr("id"));
                    for (var i in selectedOptions) {
                        for (var j = 0; j < selectedOptions[i].length; j++) {
                            if (selectedOptions[i][j] === elm) {
                                selectedOptions[i].splice(j, 1);
                                break;
                            }
                        }
                    }
                }
            })
            
            console.log(selectedOptions);
            // console.log(answers);
        }


        $scope.getOptions = function (item) {
            var tempArr = [];
            if (item.length === undefined) {
                tempArr.push(item.text);
            } else {
                for (var i = 0; i < item.length; i++) {
                    tempArr.push(item[i].text);
                }
            }

            return tempArr;
        }

        $scope.makeOptions = function () {
            var option;
            for (var i = 0; i < $scope.qstnSets.length; i++) {
                option = $scope.qstnSets[i].options;
                option.map(function (elm) {
                    $scope.options.push(elm);
                });
            }
            console.log($scope.options);
        }

        $scope.nextClick = function () {
            if ($scope.allQuestions.length - 1 === $scope.currentIndex) {
                $scope.nextClickDisabled = true;
            } else {
                $scope.init();
                ++$scope.currentIndex;
                $scope.loadData();
                $scope.nextClickDisabled = false;
            }
        }
        $scope.prevClick = function () {
            if ($scope.currentIndex === 0) {
                $scope.prevClickDisabled = true;
            } else {
                $scope.init();
                $scope.currentIndex--;
                $scope.loadData();
                $scope.prevClickDisabled = false;
            }
        }
        $scope.reset = function () {
            $rootScope.$broadcast("reset");
        }

        $scope.init();
        $scope.$on("dataUpdated", $scope.loadData);
    };

    sortController.$inject = ["$scope", "sortAppCommonService", "$rootScope"];
    angular.module(module).controller("sortController", sortController);

})(sortApp);