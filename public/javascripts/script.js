module.exports = {

$(function(){
    $('.search').on('click', function(event){
        get_trails();
    });
    function get_trails (){
     location_value = $('#location-input').val();
     place_array = [];
    $('#trail_api_result').html("<h4>Loading results...</h4>");
    $('#search_title').html('<h2>Outdoor Activities Near ' + location_value + '</h2><ul>');
			$.getJSON('https://outdoor-data-api.herokuapp.com/api.json?api_key=4016165acc967a9800153c77a3528d83&q[city_cont]='+location_value+'&radius=15&callback=?', function(data) {
                $('#trail_api_result').empty();
				$.each(data.places, function() {
                    place = this;
                    activity_links = [];
                    $.each(place.activities, function(){
                        activity = this;
						activity_links.push("<a href='"+activity.url+"'>"+activity.activity_type_name+"</a>");
					});

					if (activity_links.length > 0){$('#trail_api_result').append("<li>"+ place.name + " ["+activity_links.join(", ")+"]</li>");}
				});
			});
		}
});

}
