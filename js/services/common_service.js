(function (module) {

    function sortAppCommonService($http, sortAppDataFactory, $rootScope) {
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
        }

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
            // console.log(angular.element(event.target).attr("class"),ui);
            if (angular.element(event.target).attr("class").indexOf("input-texts") > -1) {
                console.log("call revert");
                console.log(ui.draggable.position());
                fitToContainer = true;
                //scope.resetThisElement(ui.draggable.attr("id"));
                //return;
            }
            var $this = accessFlag === true ? $(document.activeElement) : $(this);
            // $this.append(ui.draggable);
            if ($this[0].id.indexOf(names[2]) > -1) {
                numberOfChildrenPresent = $this.children().length + 1;
            }

            // numberOfChildrenPresent = dropCount[ $this[ 0 ].id ];
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
                    if ($this[0].classList.contains(names[3])) {
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
                                    "left": 0,
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
                            for (var i in selectedOptions) {
                                for (var j = 0; j < selectedOptions[i].length; j++) {
                                    if (selectedOptions[i][j] === ui.draggable[0]) {
                                        selectedOptions[i].splice(j, 1);
                                        break;
                                    }
                                }
                            }
                            selectedOptions[$this[0].id].push(ui.draggable[0]);
                            console.log(selectedOptions);
                            numberOfChildrenPresent = 0;
                        }
                    });
                }
            });
            self.reAlignFunction();
        };
        this.initService();
    }
    sortAppCommonService.$inject = ["$http", "sortAppDataFactory", "$rootScope"];

    angular.module(sortApp).service("sortAppCommonService", sortAppCommonService);

}(sortApp));