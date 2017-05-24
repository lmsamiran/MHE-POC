angular.module(sortApp).directive('popUp', function() {
	return {
    restrict: 'E',
    scope: "true",
    templateUrl: 'video.html',
	link:function(scope,attr,elem){
		scope.showVideo=true;
		
		scope.openModal=function(){
			angular.element('#videoModal').modal("show");
			if(angular.element('video').length){
				angular.element('video')[0].play();
			}
		}
		scope.closeModal=function(){
			if(angular.element('video').length){
				angular.element('video')[0].pause();
			}
		}
		angular.element('#videoModal').on('hidden.bs.modal', function () {
			if(angular.element('video').length){
				angular.element('video')[0].pause();
			}
		});
	}
	
  };
});