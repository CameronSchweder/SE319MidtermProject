fetch('./data.json')
    .then(response => response.json())
    .then(data => {
            insertImagesFromJSON(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));

    document.addEventListener('DOMContentLoaded', function() {
        var ellipsisLink = document.querySelector('.yearButtonContainer a[style="--clr:#ffae00"]');
        var extraYearsAdded = false; // Variable to keep track of whether extra years are added
        ellipsisLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of the link
            
            var yearButtons = document.querySelectorAll('.yearButtonContainer a[class^="year"]');
    
            if (!extraYearsAdded) {
                // Append 6 more year links to the yearButtonContainer
                for (var year = 2020; year >= 2014; year--) {
                    var aTag = document.createElement('a');
                    aTag.href = '#' + year;
                    aTag.classList.add('year' + year);
                    aTag.style = '--clr:#' + getRandomColor(); // Generate random color for each link
                    aTag.innerHTML = '<span>' + year + '</span>';
                    ellipsisLink.parentNode.insertBefore(aTag, ellipsisLink);
                }
                extraYearsAdded = true;
                ellipsisLink.innerHTML = '<span>&lt;--</span>'; // Change text to "<--"
            } else {
                // Remove the extra year links
                yearButtons.forEach(function(button) {
                    if (button.textContent.trim() !== '...') {
                        button.remove();
                    }
                });
                extraYearsAdded = false;
                ellipsisLink.innerHTML = '<span>...</span>'; // Change text back to "..."
            }
        });
    });

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function insertImagesFromJSON(data) {
    var gameImagesContainer = document.getElementById("gameImagesContainer");
    var loopCounter = 0;

            // Loop through each year in the JSON data
            data.years.forEach(function(year) {
                // Loop through each game in the year
                for (const [yearKey, games] of Object.entries(year)) {
                    games.forEach(function(game) {
                        // Create a div element to contain each image
                        var gameDiv = document.createElement("div");
                        gameDiv.id=yearKey;

                        // Create an image element
                        var imgElement = document.createElement("img");
                        imgElement.src = game.img;
                        imgElement.alt = game.name;
                        if (game.goty) {
                            imgElement.width = 500;
                            imgElement.height = 500;
                        }
                        else {
                            imgElement.width = 150;
                            imgElement.height = 150;
                            imgElement.id = "contenderPicture";
                            imgElement.addEventListener('mouseover', function() {
                                var pElement = document.createElement('p');
                                pElement.textContent = game.desc;
                                pElement.id="contenderPElement";
                                gameDiv.appendChild(pElement);
                            });
        
                            imgElement.addEventListener('mouseout', function() {
                                var pElement = gameDiv.querySelector('p');
                                if (pElement) {
                                    pElement.remove();
                                }
                            });
                        }

                        // Create a paragraph element for year and name
                        if (game.goty) {
                            var contenderTitle = document.createElement("h2");
                            contenderTitle.innerHTML = "Contenders";
                        }

                        // Append the image to the div container

                        if (game.goty) {
                            var yearAndName = document.createElement("h3");
                            var gameDescription = document.createElement("p");
                            var contenderTitle = document.createElement("h2");
                            yearAndName.textContent = yearKey + " - " + game.name;
                            gameDescription.textContent = game.desc;
                            var contenderTitle = document.createElement("h2");
                            contenderTitle.innerHTML = "Contenders";
                            gameDiv.appendChild(contenderTitle);
                            if (loopCounter == 0) 
                                contenderTitle.id = "firstContenderTitle";
                            else
                                contenderTitle.id = "contenderTitle";

                            gameDiv.appendChild(imgElement);
                            gameDiv.appendChild(yearAndName);
                            gameDiv.appendChild(gameDescription);
                        }
                        else {
                            gameDiv.appendChild(imgElement); 
                        }
                        

                        // Append the div container to the main container
                        gameImagesContainer.appendChild(gameDiv);

                        // Add click event listener to the image
                        imgElement.addEventListener('click', function() {
                        // Open Wikipedia link in a new tab
                        window.open(game.link, '_blank');
                        });
                    });
                    loopCounter++;
                }
            });
}

// Call the function to insert images when the page loads
window.onload = insertImagesFromJSON;




