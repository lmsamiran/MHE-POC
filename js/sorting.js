$('#videoModal').on('show.bs.modal', function () {
	if($('video').length)
    $('video')[0].play();
})
$('#videoModal').on('hidden.bs.modal', function () {
	if($('video').length)
    $('video')[0].pause();
})
$(document).on('click', '.open-modal', function(){
	if($(this).attr('modalType')=="video"){
		$("#videoModal .modal-content").html('<div class="modal-header"><button type="button" class="cross-button" data-dismiss="modal"></button></div><div class="modal-body"><video width="100%" controls><source src="./help_video/sorting_defined.mp4" type="video/mp4"><source src="mov_bbb.ogg" type="video/ogg"></video></div>');
	}else{
		$("#videoModal .modal-content").html('<div class="modal-body"><div class="body-content"><button type="button" class="cross-button" data-dismiss="modal"></button><img src="./images/img/reward_4.png" width="100%"><button class="play-again"></button></div></div>');
	}
	$('#videoModal').modal("show");
	//alert($("#videoModal .modal-body").html());
})