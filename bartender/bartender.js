var data = {reviews:[{}]};

//a data structure for storing information about the team
var tutorial_data = {
	// developer: "Juaquin Sanchez",
	// objects representing sticky notes
	reviews: [
		{
			item: "Hurricane",
			type: "beverage",
			text: "Great drink and fast service, will come again!",
			stars: 5,
			response: '',
		},
		{
			item: "Negroni",
			type: "beverage",
			text: "This sucks and you sucks",
			stars: 2,
			response: '',
		},
	],
}

function displayPage () {
	//get data object from localStorage, else loads default
	data = JSON.parse(localStorage.getItem('data_spirit_webapp'));
	if(!data) {data = tutorial_data;}

	// add reviews in data object to HTML, 
	// eg generating HTML to inject in page
	var reviewsHTML = "";
	for (var i = 0; i < data.reviews.length; i++) {
		reviewsHTML += '<div class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">';
		reviewsHTML += data.reviews[i].item;
		reviewsHTML += '</h5><h2>' + data.reviews[i].stars + '/5</h2></div>';
		reviewsHTML += '<p class="mb-1">' + data.reviews[i].text + '</p>'
		// reviewsHTML += '<div class="d-flex w-100 justify-content-between"></div>';
		
		reviewsHTML += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-index=' + i + ' id="exampleModal">Respond</button></div>';

		var r = data.reviews[i].response;
		if(r) {
			reviewsHTML += '<div class="d-flex w-100 justify-content-between" id="review_response"><small>' + r + '</small></div>';
		};

	}
	// puts generated html in wrapper
	$("#insert_reviews").html(reviewsHTML);

	// $('string/element/array/function/jQuery object/string, context')("#").click(function() { 
 //        incrementPopularity($(this).attr("data-index"))
 //    });

}

function addReview(text, index) {
	data.reviews[index].response = text; 
	localStorage.setItem('data_spirit_webapp', JSON.stringify(data));
	displayPage();
}

$("body").on('click','#exampleModal',function(){
	$("#Modal").modal("show");
	global_index = $(this).attr("data-index");
});

$("body").on('click','#close_modal #close',function(){
	$("#Modal").hide();//modal("hide");
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
	displayPage();
	location.reload();

});

$("body").on('click','#save_changes',function(){
	text = $("#Modal #message-text")["0"].value
	$("#Modal").hide();
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
	addReview(text, global_index);
	location.reload();
});


// and awaaaaay we go
$(function() {
	displayPage();
});