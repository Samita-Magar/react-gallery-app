import React from "react";

// Import components
import Photo from "./Photo";
import NoPhoto from "./NoPhoto";


const Gallery = ({ pictures, query }) => {

	let pics;
	// If array is not empty, iterate over it
	if(pictures.length > 0) {
		pics = pictures.map( pic => (
			<Photo
				farm={pic.farm}
				server={pic.server}
				id={pic.id}
				secret={pic.secret}
				key={pic.id}
				title={pic.title}
			/>
		));
	} else {
		// If array is empty, display NoPics component
		pics = <NoPhoto />
	};

	let searchWord;
	// If query string is not empty, display it
	if(query.length > 0) {
		searchWord = `Image results for: "${query}"`
	} else {
		// If query string is empty, do not show it
		searchWord = '';
	};

  return (
    <div className="photo-container">

			{/* Render photo results header */}
      <h2>{searchWord}</h2>

			{/* Render photos */}
      <ul>{pics}</ul>
			
    </div>
  );
};

export default Gallery;