const searchButton = document.querySelector('button[type="submit"]'); // Connect the button from HTML to the javascript
const input = document.querySelector('input[name="search"]');//Select the input field from the HTML
const ul = document.getElementById('pokeDescrip');//Selects Ul from html
const pokeList = document.createDocumentFragment();

function fetchInformation () { //add an event, values() method is used to return an array whose elements are the enumerable property values found on the object. 
    const inputValue = input.value.trim();//trim() is a string method that is used to remove whitespace characters from the start and end of a string.
    return fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}/`)//Adding $inputValue in the url helps so the data fetched is exactly the data for each pokemon and nothing more
        .then(response => response.json())
        .then(pokeData => {
            let pokeDescript = pokeData;// Stores the information retrieved from fetching into a variable called pokeDescrip
            console.log(pokeData)//Console.logs the information it fetched earlier

            
            const descList = () => {//Creates function that adds and displays list items based on the information fetched

                let ulNew = document.createElement('ul');//Creates a list element 
                let name = document.createElement('h2');// Creates an h2 element
                let weight = document.createElement('li');// Creates a paragraph element
                let height = document.createElement('li');
                let abilities = document.createElement('li');
                let elementTypes = document.createElement('li');
                let pokeMoves = document.createElement('li');

                name.innerHTML = `${pokeData.name}`;// I add the element of name i created into the Html by using the pokeData retrieved earlier
                ulNew.appendChild(name);//It appends the h2 element of name to an li element.

                weight.innerHTML = `Weight: ${pokeData.weight}`;//I use template literals, that are the backticks `` to be able to insert strings and expressions like the ones shown.
                ulNew.appendChild(weight);////It appends the paragraph element of name to an li element.

                height.innerHTML = `Height: ${pokeData.height}`;
                ulNew.appendChild(height);

                const eachAbilityNames = [];
                abilities.innerHTML = `Abilities: ${pokeData.abilities.map(powers => { // used the map function to iterate through the abilities of the Pokémon (pokeData.abilities)
                    const eachAbilityName = powers.ability.name; // Created a variable that would check for the name property of the ability.
                    eachAbilityNames.push(eachAbilityName); // used the push method to push those names from the variable into the array outside of the map.
                    return eachAbilityName;//I returned the names of the abilities.
                }).join(' and ')}`;//Lastly I added the join method because it takes an array and it turns it intro a string.
                ulNew.appendChild(abilities);

                const types = [];
                elementTypes.innerHTML = `Types: ${pokeData.types.map(elemental => {
                    const uniqueType = elemental.type.name;//Create a variable to be able to select the name of every single one of the moves because each item in the array is an object with multiple other properties
                    types.push(uniqueType);
                    return uniqueType;
                }).join(' and ')}`;
                ulNew.appendChild(elementTypes);

                const moves = [];//Created an empty array to store the moves that I will get from the pokeData
                pokeMoves.innerHTML = `Moves: ${pokeData.moves.map(personalMove => {//Looped trought the moves array inside of the pokeData API
                    const uniqueMove = personalMove.move.name;//Create a variable to be able to select the name of every single one of the moves because each item in the array is an object with multiple other properties
                    moves.push(uniqueMove);//Pushed each move of the pokemon into the moves array.
                    return uniqueMove;//Returned each move after looping trought them.
                }).join(' , ')}`;//Added the join() method to transform the array into a string
                ulNew.appendChild(pokeMoves);//finally took and li and inside of it I apennded a paragraph with the moves information.


                pokeList.appendChild(ulNew);//It attached the li created into the document fragment defined earlier

                input.value = '';//After all the information that is fetched get displayed, I grab the input variable I created and I erase the value of it after I click on the button

            };
            descList();// the function is called and it runs after the event listener runs.

            ul.appendChild(pokeList)//It appends the document fragment directly into the Unordered list that I have on my html.
        })
        .catch(err => console.log(err));// Catches and error if there is any from the API.
}


// Made an update by separating the fetchInformation function from the event listeners,
// to make my code more modular and easier to manage.

// Event listener for the click event on the search button
const fetchInfoClick = searchButton.addEventListener("click", () => {
    // Call the fetchInformation function when the button is clicked
    fetchInformation();

    // While there is a first child in the 'ul' element
    while (ul.firstChild) {
        // Remove the first child of the 'ul' element
        ul.removeChild(ul.firstChild);
    }  
}); // Execute a function when the user clicks


const fetchInfoEnter = input.addEventListener('keypress', (event) => {
    // Check if the pressed key is "Enter"
    if (event.key === "Enter") {
        // Call the fetchInformation function when the Enter key is pressed
        fetchInformation();

        // While there is a first child in the 'ul' element
        while (ul.firstChild) {
            // Remove the first child of the 'ul' element
            ul.removeChild(ul.firstChild);
        } 
    }
}); // Execute a function when the user presses a key on the keyboard

