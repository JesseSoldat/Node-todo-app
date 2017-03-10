$(document).ready(function(){
	

	$('form').on('submit', function(){
		var item = $('form input');
		var todo = { item: item.val() };
		// console.log(todo);

		$.ajax({
			type: 'POST',
			url: '/todo',
			data: todo,
			success: function(data) {
				location.reload();
			}
		});

		return false; 

	});

	$('li').on('click', function(){
		var item = $(this).text().replace(/ /g, "-");
		//get text from current li (this)
		//replace blank space with - Walk Dog => Walk-Dog for using in URL
		$.ajax({
			type: 'DELETE',
			url: '/todo/'+ item,
			success: function(data) {

				location.reload();
			}
		});
	});


});