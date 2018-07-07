 $(document).ready(()=>{
		let movieId,name,year;
		$("#submit").on("click",(event)=>{
			console.log('event',event);
			event.preventDefault();
			
			movieId = $("#movie-id").val();
			name = $("#name").val();
			year = $("#year").val();
			
			$.ajax({
			   url:'http://www.omdbapi.com/?s='+name+'&y='+year+'&i='+movieId+'&type=movie&r=json&apikey=e4373006',
			   success:(response)=>{
					console.log(('Search' in response));
					if (!('Search' in response)){
						if(movieId!=null){
						   response.Response= "True";
						   response.Search = [response];
						   console.log("response",response);	
						}
					}
					console.log(response);
					
					let html = "";
				    if (response.Response == "False") {
				       html += "<li class='no-movies'>";
				       html += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + $("#search").val() + "</li>";
				    } else {
				       $.each(response.Search,(index, movie)=>{
				         let poster;
				         if (movie.Poster == "N/A"){
				           poster = "<i class='material-icons poster-placeholder'>crop_original</i>";
				         } else {
				           poster = "<img class='movie-poster' src=" + movie.Poster + ">";
				         }

				         html += "<li>";
				         html += "<div class='poster-wrap'><a href='http://www.imdb.com/title/" + movie.imdbID + "' target='_blank'>";
				         html += poster;
				         html += "</a></div>";
				         html += "<span class='movie-title'>" + movie.Title + "</span>";
				         html += "<span class='movie-year'>" + movie.Year + "</span>";
				         html += "</li>";
				       }); // ends each
				    }
				    // Then append search results to ul
				    $("#movies").append(html);
			   },
			   error:()=>{

			   }
			});
		});
	});