import PublicHolidaysDataTable from "./modules/class.js";

function init() {
    const config = {
        baseUrl: "https://date.nager.at/api/v3/PublicHolidays/", // Base URL for the API
        country: "IE", // Default country code
        year: "2024", // Default year
        title: "Public Holidays Table", // Title for the component
        contentId: "content", // The ID of the DOM element to render the table into
        dropdownCountries: [], // Optional dropdownCountries (can be populated later)
        dropdownYears: [] // Optional dropdownYears (can be populated later)
    };

    new PublicHolidaysDataTable(config); // Pass the config object to the constructor
}

window.addEventListener("load", init);
