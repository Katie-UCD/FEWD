// see https://medium.com/@rameshsainom/javascripts-dom-mutation-and-promises-advance-javascript-95da5258297c for more details on updating the DOM and promises
//

class PublicHolidaysDataTable {
    // properties
    #dataUrl = "https://date.nager.at/api/v3/PublicHolidays/";  // base URL to REST API
    #country = "IE"; // default country
    #year = "2024"; // default year
    #title; // title text for component
    #data; // data object returned via fetch()
    #componentRoot; // DOM node for component
    #dropdownCountries; // an array of the available countries as returned by the api
    #dropdownYears; // an array of the years available 

    

    constructor(dataUrl, title, year = "2024", country ="IE", dropdownCountries, dropdownYears) {
        this.#dataUrl = dataUrl;
        this.#title = title;
        this.#year = year;
        this.#country = country;
        this.#componentRoot = document.getElementById("content");
        this.#dropdownCountries = dropdownCountries;
        this.#dropdownYears = dropdownYears;
        this.loadData(); // load data using fetch and build the table
        document.getElementById("countryDropdown").addEventListener("change", this);
        document.getElementById("yearDropdown").addEventListener("change", this);
    }

    async loadCountries() {
        try {
            // Fetch the available countries
            const response = await fetch("https://date.nager.at/api/v3/AvailableCountries");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Parse JSON data and store both code and name
            const countriesArray = await response.json(); // API response format: [{key: "IE", name: "Ireland"}, ...]
    
            // Store the full objects (code and name)
            this.#dropdownCountries = countriesArray.map(country => ({
                code: country.countryCode, // Country code
                name: country.name // Country name
            }));
    
            // If no country is selected, set the default (#country) to the first one
            if (!this.#country) {
                this.#country = this.#dropdownCountries[0]?.code; // Default to first country code if not already set
            }
    
            // Populate the dropdown menu
            const dropdownC = document.getElementById("countryDropdown");
            if (dropdownC) {
                // Clear existing options (in case of re-render)
                dropdownC.innerHTML = "";
    
                this.#dropdownCountries.forEach(({ code, name }) => {
                    const option = new Option(name, code); // Use code as value, name as display
                    dropdownC.add(option); // Append the option to the dropdown
                });
    
                // Set the dropdown's value to the currently selected country code
                dropdownC.value = this.#country;
            }
        } catch (error) {
            console.error("Failed to load countries:", error);
        }
    }
    
    
    

    loadYears(){
        const currentYear = new Date().getFullYear(); // Get the current year dynamically
        const yearsArray = [];
    
        for (let i = 0; i < 10; i++) { // Loop 10 times
            yearsArray.push(currentYear + i); // Add each year to the array
        }
        // Get dropdown element from DOM
        var dropdown = document.getElementById("yearDropdown");

        // Loop through the array
        for (var i = 0; i < yearsArray.length; ++i) {
        // Append the element to the end of Array list
        dropdown[dropdown.length] = new Option(yearsArray[i]);
}
        return yearsArray;
    }

    renderCountries(){
        const countries = this.loadCountries();
       
    }

    renderYears(){
        const years = this.loadYears(); // Call the loadYears method to get the years array

    // Generate a <ul> list of years
    const listItems = years
        .map(year => `<li>${year}</li>`)
        .join(""); // Combine all list items into a single string

    return `<ul>${listItems}</ul>`;
    }

    getcomponentRoot() {
        return this.#componentRoot;
    }

    render(){
        
        const capitaliseFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        this.#componentRoot.innerHTML = ""; 
        const propNames = Object.keys(this.#data[0]);
        console.log(propNames);
        let outputHtml = `<div class="table-container">
            <h2>${this.#title}</h2>
                <table class="blueTable">
                    <thead>
                        <tr>`;
        propNames.forEach((prop) => {
            outputHtml += `<th>${capitaliseFirstLetter(prop)}</th>`;
        });                
        outputHtml += `</tr></thead><tbody>`;

        this.#data.forEach((item) => {
            outputHtml += '<tr>';
            propNames.forEach((prop) => {
                outputHtml += `<td>${item[prop]}</td>`;
            });                
            outputHtml += '</tr>';
        });
        outputHtml += `     </tbody>
            </table>
        </div>`;

        this.#componentRoot.innerHTML += outputHtml;
    }

    handleEvent(event) {
        const { id, value } = event.target;
    
        if (id === "countryDropdown") {
            this.#country = value; // Set the country to the selected value (country code)
        } else if (id === "yearDropdown") {
            this.#year = value; // Set the year to the selected value
        }
    
        console.log(`Updated values - Country code: ${this.#country}, Year: ${this.#year}`);
    
        // Reload the data with the new selection
        this.loadData();
    }
    

    async loadData(){ 
        try{
            //after this line, our function will wait for the `fetch()` call to be settled
            //the `fetch()` call will either return a Response or throw an error 
            const apiUrl = `${this.#dataUrl}${this.#year}/${this.#country}`;
            const response = await fetch(apiUrl);
            if(!response.ok){
                throw new Error(`HTTPerror:${response.status}`);
            }
            //after this line, our function will wait for the`response.json()`call to be settled
            //the`response.json()`call will either return the parsed JSON object or throw an error 
            this.#data=await response.json();
            this.render(); // update the DOM
            this.renderCountries();
            this.renderYears();
        } catch(error){
            console.error(`Could not get product data:${error}`);
        }

    }

}

function init() {
   try{
    new PublicHolidaysDataTable(
       "https://date.nager.at/api/v3/PublicHolidays/",
       "Public Holidays Table"
    );
   } catch (err){
    console.log(err);
    document.getElementById("content").innerHTML = `<p>Error initializing table: ${err.message}</p>`;
   }
   
}



window.addEventListener("load", init);

