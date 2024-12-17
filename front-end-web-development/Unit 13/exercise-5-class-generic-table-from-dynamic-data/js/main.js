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
    #columnNames; // an array of column names to display 

    constructor(dataUrl, title, year = "2024", country ="IE") {
        this.#dataUrl = dataUrl;
        this.#title = title;
        this.#year = year;
        this.#country = country;
        this.#componentRoot = document.getElementById("content");
        this.loadData(); // load data using fetch and build the table
        document.getElementById("countryDropdown").addEventListener("change", this);
        document.getElementById("yearDropdown").addEventListener("change", this);
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

    handleEvent(event){
      const {id, value} = event.target;
      if (id === "countryDropdown"){
        this.#country = value;
      } else if (id === "yearDropdown"){
        this.#year = value;
      }
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
            console.log(this.#data[0].name);
            this.render(); // update the DOM
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

