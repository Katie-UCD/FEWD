(() => {
    // globals
    const contentContainer = document.getElementById("content");
    
    function renderImages(images) {
        let imagesHtml = '<div class="image-container">';

        for (let i in images.hits) {
            imagesHtml += `<div class="image">
                                <a class="my-image-links" 
                                   data-gall="gallery01" 
                                   title="Click to see a large version of this image"
                                   href="${images.hits[i].largeImageURL}">
                                     <img src="${images.hits[i].webformatURL}" alt="Image ${i + 1}">
                                </a>
                            <div class="image-info">
                                <div class="tags">`;

            let tagsArray = images.hits[i].tags.split(',');
            for (let j in tagsArray) {
                let linkQuery = encodeURIComponent(tagsArray[j].trim());
                let linkText = tagsArray[j].trim();
                imagesHtml += `<a href="#" onclick="loadImages('${linkQuery}')">${linkText}</a>`;
            }

            imagesHtml += `</div>
                            <div class="right">
                                <span class="favorites">${images.hits[i].favorites} favorites</span>
                                <span class="likes">${images.hits[i].likes} likes</span>
                                <span class="comments">${images.hits[i].comments} comments</span>
                            </div>
                        </div>
                    </div>`;
        }

        imagesHtml += '</div>';
        contentContainer.innerHTML = imagesHtml;

        // Initialize VenoBox for the dynamically generated links
        new VenoBox({
            selector: '.my-image-links',
            numeration: true,
            infinigall: true,
            share: true,
            spinner: 'rotating-plane'
        });
    }

    function init() {
        try {
            // option 1 - load data as a JS object
            console.log('dataOption1');
            console.log(dataOption1);
            renderImages(dataOption1); // render images
            // option 2 - load data as a string variable
            const dataOption2 = JSON.parse(dataStringOption2);
            console.log('dataOption2');
            console.log(dataOption2);
            // Uncomment this line if you'd like to test option 2
            // renderImages(dataOption2); 
            // option 3 - embed data in HTML
            const dataOption3 = JSON.parse(document.getElementById('dataStringOption3').text);
            console.log('dataOption3');
            console.log(dataOption3);
        } catch (err) {
            console.error(err);
            contentContainer.innerHTML = `<h2>Error</h2><p>No images to display.</p><p>${err}</p>`;
        }
    }

    window.addEventListener("load", () => {
        init();
    });
})();
