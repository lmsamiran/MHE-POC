angular.module(sortApp).directive('popUp', function() {
	return {
    restrict: 'E',
    scope: "true",
    templateUrl: 'video.html',
	link:function(scope,attr,elem){
		scope.showVideo=false;
		angular.element('#videoModal').on('hidden.bs.modal', function () {
			if(angular.element('video').length){
				angular.element('video')[0].pause();
			}
		});
	}
	
  };
});