(function (module) {

    function sortAppCommonService($http, $rootScope, mhePocConstants) {
        var self = this;

        this.initService = function () {
            self.parsedData = null;
            self.setData();
        };

        this.getXMLDataFromFactory = function () {
            return $http.get("./data/sod_t4_v1_u1_w1___ph_act1__.xml", {
                transformResponse: function (cnv) {
                    var x2js = new X2JS();
                    var aftCnv = x2js.xml_str2json(cnv);
                    return aftCnv;
                }
            });
        };
        this.setData = function () {
            self.getXMLDataFromFactory().then(function (response) {
                self.parsedData = response.data;
                $rootScope.$broadcast("dataUpdated");
            });
        };
        this.getData = function () {
            return self.parsedData;
        };

        this.reAlignFunction = function () {
            $(".droppable").each(function () {
                $bin = this;
                for (var i = 0; i < $bin.children.length; i++) {
                    if (i === 0) {
                        if (parseFloat($bin.children[i].style.top) > topPos) {
                            $bin.children[i].style.top = topPos + "px";
                        }
                    } else {
                        if ((parseFloat($bin.children[i].style.top) - 20) > parseFloat($bin.children[i].style.top)) {
                            $bin.children[i].style.top = (parseFloat($bin.children[i].style.top) + 20) + "px";
                        }
                    }
                }
            });
        };

        this.onDrop = function (event, ui) {
            var $this = accessFlag === true ? $(document.activeElement) : $(this);

            if ($this[0].id.indexOf(mhePocConstants.droppableBin) > -1) {
                numberOfChildrenPresent = $this.children().length + 1;
            }

            ui.draggable.position({
                my: "center",
                at: position,
                of: $this,
                using: function (pos) {
                    dropPos[ui.draggable[0].id] = pos;
                    console.log(pos);
                    if (numberOfChildrenPresent > 0) {
                        pos.top += numberOfChildrenPresent * 20;
                    }
                    if (!topPos) {
                        topPos = 1;
                        stackTop = pos.top;
                    }
                    if ($this[0].classList.contains(mhePocConstants.droppableInitial)) {
                        pos.top += ui.draggable.height() * 1.5;
                        dropPos[ui.draggable[0].id] = 0;
                    }
                    $(this).animate(pos, {
                        easing: "linear",
                        duration: 500,
                        complete: function () {
                            $this.append(ui.draggable);

                            var left = $this[0].offsetWidth / 2;
                            if ($this[0].id.indexOf("droppableBin") > -1) {
                                ui.draggable.css({
                                    "display": "block",
                                    "position": "relative",
                                    "top": 0,
                                    "left": 0
                                });
                            } else {
                                ui.draggable.css({
                                    "display": "inline-block",
                                    "position": "absolute",
                                    "top": "0px",
                                    "left": "0px"
                                });
                            }
                            console.log($this[0].id);
                            console.log(ui.draggable[0]);
                            if (!selectedOptions[$this[0].id]) {
                                selectedOptions[$this[0].id] = [];
                            }
                            self.removeFromSelectedOptions(ui.draggable[0]);

                            // for (var i in selectedOptions) {
                            //     for (var j = 0; j < selectedOptions[i].length; j++) {
                            //         if (selectedOptions[i][j] === ui.draggable[0]) {
                            //             selectedOptions[i].splice(j, 1);
                            //             break;
                            //         }
                            //     }
                            // }

                            selectedOptions[$this[0].id].push(ui.draggable[0]);
                            console.log(selectedOptions);
                            numberOfChildrenPresent = 0;
                            var total = self.getLengthOfOptions();
                            $rootScope.$broadcast("checkToEnable", {
                                totalLength: total
                            });
                            //console.log(total);
                        }
                    });
                }
            });
            self.reAlignFunction();
            // $rootScope.$broadcast("");
            // var total =  self.getLengthOfOptions();
            //  console.log(total);
        };

        this.removeFromSelectedOptions = function (elm) {
            for (var i in selectedOptions) {
                for (var j = 0; j < selectedOptions[i].length; j++) {
                    if (selectedOptions[i][j] === elm) {
                        selectedOptions[i].splice(j, 1);
                        break;
                    }
                }
            }
        };

        this.getLengthOfOptions = function () {
            var totalLength = 0;
            for (var i in selectedOptions) {
                totalLength = totalLength + selectedOptions[i].length;
                //console.log(selectedOptions[i].length);
            }
            // console.log(totalLength);
            return totalLength;
        };

        this.draggableAccs = function (e) {
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
        };

        this.initService();
    }

    sortAppCommonService.$inject = ["$http", "$rootScope", "mhePocConstants"];

    angular.module(sortApp).service("sortAppCommonService", sortAppCommonService);

}(sortApp));