// Function to toggle slide menu
function toggleSlideMenu() {
    const slideMenu = document.getElementById("slideMenu");
    slideMenu.classList.toggle("active");
}

// Function to get selected categories
function getSelectedCategories() {
    var selectedCategories = [];
    $('input[name="category"]:checked').each(function () {
        selectedCategories.push($(this).val());
    });
    return selectedCategories;
}

// Function to clear category selection
function clearCategorySelection() {
    $('input[name="category"]').prop('checked', false);
}

// Function to clear country selection
function clearCountrySelection() {
    $('input[name="country"]').prop('checked', false);
}

// Function to get selected client types
function getSelectedClientTypes() {
    var selectedClientTypes = [];
    $('input[name="client-type"]:checked').each(function () {
        selectedClientTypes.push($(this).val());
    });
    return selectedClientTypes;
}

// Function to clear client type selection
function clearClientSelection() {
    $('input[name="client-type"]').prop('checked', false);
}

// Function to get selected status types
function getSelectedStatusTypes() {
    var selectedStatusTypes = [];
    $('input[name="status-type"]:checked').each(function () {
        selectedStatusTypes.push($(this).val());
    });
    return selectedStatusTypes;
}

// Function to clear status type selection
function clearStatusSelection() {
    $('input[name="status-type"]').prop('checked', false);
}

/*Checkbox related  functions*/
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});

function toggleOptions(optionsId, iconClass) {
    var options = document.getElementById(optionsId);
    var icon = document.querySelector(iconClass);

    if (options.style.maxHeight === "0px") {
        options.style.maxHeight = options.scrollHeight + "px";
        icon.textContent = "chevron_right";
    } else {
        options.style.maxHeight = "0px";
        icon.textContent = "expand_more";
    }
}

function toggleCheckboxValue(checkboxValue, relatedCheckboxes) {
    var mainCheckbox = document.querySelector("input[value='" + checkboxValue + "']");
    var checked = true;

    relatedCheckboxes.forEach(function (value) {
        var checkbox = document.querySelector("input[value='" + value + "']");
        if (!checkbox.checked) {
            checked = false;
        }
    });

    mainCheckbox.checked = checked;
}

function toggleOptionsCheckboxes(mainCheckboxValue, relatedCheckboxes) {
    var mainCheckbox = document.querySelector("input[value='" + mainCheckboxValue + "']");
    var checked = mainCheckbox.checked;

    relatedCheckboxes.forEach(function (value) {
        var checkbox = document.querySelector("input[value='" + value + "']");
        checkbox.checked = checked;
    });
}

function toggleGISCheckbox() {
    toggleCheckboxValue('GIS', ['Cartography','GIS Capacity Building', 'Spatial Analysis', 'Spatial Data Extraction', 'Web GIS App Development']);
}

function toggleGISOptions() {
    toggleOptionsCheckboxes('GIS', ['Cartography','GIS Capacity Building', 'Spatial Analysis', 'Spatial Data Extraction', 'Web GIS App Development']);
}

function togglePlanningCheckbox() {
    toggleCheckboxValue('Planning', ['Regional and Provincial Planning', 'Urban Planning']);
}

function togglePlanningOptions() {
    toggleOptionsCheckboxes('Planning', ['Regional and Provincial Planning', 'Urban Planning']);
}

function toggleUtilitiesCheckbox() {
    toggleCheckboxValue('Utilities', ['Electric Transmission', 'Water Utilities', 'Wastewater Utilities']);
}

function toggleUtilitiesOptions() {
    toggleOptionsCheckboxes('Utilities', ['Electric Transmission', 'Water Utilities', 'Wastewater Utilities']);
}

function toggleWaterManagementCheckbox() {
    toggleCheckboxValue('Water Management', ['Coastal Resource Management', 'River and Lakes Management', 'Flood Prevention']);
}

function toggleWaterManagementOptions() {
    toggleOptionsCheckboxes('Water Management', ['Coastal Resource Management', 'River and Lakes Management', 'Flood Prevention']);
}


// Function to initialize the year slider
$("#year-slider").slider({
    range: true,
    min: 2014,
    max: 2025,
    values: [2014, 2025],
    slide: function (event, ui) {
        $("#year-range").text(ui.values[0] + " - " + ui.values[1]);
    },
    create: function () {
        // Add tick indicators
        for (let i = 2014; i <= 2025; i++) {
            $("<div>").addClass("tick").css("left", (i - 2014) * (100 / 11) + "%").appendTo($("#year-slider"));
        }
    }
});

// Update current year label
$("#current-year").text("Years selected: 2014 - 2025");

$("#year-slider").on("slide", function (event, ui) {
    if (ui.values[0] === ui.values[1]) {
        $("#current-year").text("Year selected: " + ui.values[0]);
    } else {
        $("#current-year").text("Years selected: " + ui.values[0] + " - " + ui.values[1]);
    }
    $(".year-label").each(function () {
        $(this).css("left", (ui.values[0] - 2014) * (100 / 7) + "%");
    });
});

/*
$(function () {
    $("#projectValue-slider").slider({
        range: true,
        min: 0,
        max: 500000,
        step: 50000,
        values: [0, 500000],
        slide: function (event, ui) {
            $("#current-projectValue").html("$" + ui.values[0].toLocaleString() + " - $" + ui.values[1].toLocaleString());
        }
    });

    // Initial display of values
    $("#current-projectValue").html("$0 - $500,000");
});

$(function () {
    $("#projectScale-slider").slider({
        range: true,
        min: 0,
        max: 100000,
        step: 100,
        values: [0, 100000],
        slide: function (event, ui) {
            $("#current-projectScale").html(ui.values[0].toLocaleString() + "ha - " + ui.values[1].toLocaleString() + "ha");
        }
    });

    // Initial display of values
    $("#current-projectScale").html("0ha - 100,000ha");
});*/

/*** RESET FILTERS BUTTON **/
// Function to reset the year slider
function resetYearSlider() {
    $("#year-slider").slider("values", [2014, 2025]);
    $("#current-year").text("Years selected: 2014 - 2025");
}

/*
// Function to reset the project value slider
function resetProjectValueSlider() {
    $("#projectValue-slider").slider("values", [0, 500000]);
    $("#current-projectValue").text("$0 - $500,000");
}

// Function to reset the project scale slider
function resetProjectScaleSlider() {
    $("#projectScale-slider").slider("values", [0, 100000]);
    $("#current-projectScale").html("0ha - 100,000ha");
}
*/
// Function to display initial points on the map on Reset Button click
function displayInitialPoints() {
    data.forEach(function (project) {
        const popupContent = `
            <h2>${project.projectName}<br></h2>
            <b>Country:</b> ${project.country}<br>
            <b>Location:</b> ${project.location}<br>
            <b>Start Date:</b> ${project.startDate}<br>
            <b>Completion Date:</b> ${project.completionDate}<br>
            <b>Partner(s):</b> ${project.partner}<br>
            <b>Client:</b> ${project.client}<br>
            <b>Description:</b><div style="text-align: justify;">${project.description}</div>
            <!-- <b>Project Value ($):</b> ${project.projectValue}<br> -->
            <!--<b>Project Scale:</b> ${project.projectScale}ha<br>-->
            <b>Status:</b> ${project.status}<br>
            <b>Sector:</b> ${project.sector1}, ${project.sector2}<br>
            <p></p>
            <p style="font-size: 10px;"><i>Note: Project pinned location is indicative only</i></p>
            <div class="image-container">
                <a href="${project.photo1}" target="_blank">
                    <img src="${project.photo1}" class="popup-image" id="popup-image">
                </a>
            </div>
            <div class="button-container">
                <div class="nav-buttons">
                    <button class="prev-button" onclick="prevImage('${project.photo1}', '${project.photo2}')" title="Show previous image">navigate_before</button>
                    <button class="next-button" onclick="nextImage('${project.photo1}', '${project.photo2}')" title="Show next image">navigate_next</button>
                </div>
                <div>
                <a href="${project.attachment}" target="_blank" style="text-decoration: none;">
                    <button class="download-button" style="display: flex; align-items: center;">
                        <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle;">description</span>
                        <span style="margin-left: 5px; vertical-align: middle; margin-top: -3px;">Download Project Sheet</span>
                    </button>
                </a>
            </div>
            
                <span class="material-icons-outlined close-button" onclick="closePopup()">
                    highlight_off
                </span>
            </div>
        `;
        const marker = L.marker([project.lat, project.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(popupContent, { maxWidth: 300 });
    });
}

/*** RESET FILTERS BUTTON **/
// Function to reset filters
function resetFilters() {
    clearCategorySelection();
    clearCountrySelection();
    clearClientSelection();
    clearStatusSelection();
    resetYearSlider();
    //resetProjectValueSlider();
    //resetProjectScaleSlider();

    // Remove existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Hide no results message and result count
    hideNoResultsMessage();
    hideResultCount();

    // Reset map view to initial extent
    map.setView([0.00, 0.00], 3);

    // Display initial points
    displayInitialPoints();

    // Reset total projects count
    updateTotalProjectsCount(data.length);

    // Reset the country and sector pie charts
    resetCountryChart();
    resetSectorChart();

}

// Function to reset the sector pie chart
function resetSectorChart() {
    updateSectorChart(data); // Reset the chart with original data
}

// Function to reset the country pie chart
function resetCountryChart() {
    updateCountryChart(data); // Reset the chart with original data
}

// Event listener for Reset Filters button
$('.reset-filters-button').on('click', function () {
    resetFilters(); // Reset all filters
    resetCountryChart(); // Reset the country pie chart
    resetSectorChart();
});

/*** APPLY FILTERS BUTTON **/
// Function to display number of results
function displayResultCount(count) {
    const resultCountContainer = document.getElementById("resultCount");
    resultCountContainer.textContent = `${count} project${count === 1 ? '' : 's'} matched the criteria`;
    resultCountContainer.style.display = "block";
}

// Function to hide number of results
function hideResultCount() {
    const resultCountContainer = document.getElementById("resultCount");
    resultCountContainer.style.display = "none";
}

// Function to display no results message
function displayNoResultsMessage() {
    const messageContainer = document.getElementById("noResultsMessage");
    messageContainer.style.display = "block";
}

// Function to hide no results message
function hideNoResultsMessage() {
    const messageContainer = document.getElementById("noResultsMessage");
    messageContainer.style.display = "none";
}

// Function to zoom the map to the extent of filtered points/markers
function zoomToFilteredPoints(filteredData) {
    if (filteredData.length > 0) {
        // Extract latitudes and longitudes of filtered points
        var latlngs = filteredData.map(function (project) {
            return [project.lat, project.lng];
        });

        // Create a LatLngBounds object
        var bounds = L.latLngBounds(latlngs);

        // Set maximum zoom level
        var maxZoomLevel = 5; // Adjust this value as needed

        // Zoom the map to the extent of the bounds, limited by maxZoomLevel
        map.fitBounds(bounds, { maxZoom: maxZoomLevel });
    }
}

/*** APPLY FILTERS BUTTON **/
// Event listener for Apply Filters button
$('.apply-filters-button').on('click', function () {
    // Get selected countries, categories, client types, status types, year range, project value range, and project scale range
    var selectedCountries = [];
    $('input[name="country"]:checked').each(function () {
        selectedCountries.push($(this).val());
    });

    var selectedCategories = getSelectedCategories();
    var selectedClientTypes = getSelectedClientTypes();
    var selectedStatusTypes = getSelectedStatusTypes();
    var selectedYearRange = $("#year-slider").slider("option", "values");
    var selectedProjectValueRange = $("#projectValue-slider").slider("option", "values");
    var selectedProjectScaleRange = $("#projectScale-slider").slider("option", "values");

    // Filter data based on selected criteria
    var filteredData = data.filter(function (project) {
        var startYear = new Date(project.startDate).getFullYear();
        var completionYear = new Date(project.completionDate).getFullYear();
        return (
            (selectedCountries.length === 0 || selectedCountries.includes(project.country)) &&
            (
                selectedCategories.length === 0 ||
                selectedCategories.includes(project.sector1) ||
                selectedCategories.includes(project.sector2)
            ) &&
            (selectedClientTypes.length === 0 || selectedClientTypes.includes(project.clientType)) &&
            (selectedStatusTypes.length === 0 || selectedStatusTypes.includes(project.status)) &&
            ((startYear >= selectedYearRange[0] && startYear <= selectedYearRange[1]) ||
                (completionYear >= selectedYearRange[0] && completionYear <= selectedYearRange[1])) /*&&
            (project.projectValue >= selectedProjectValueRange[0] && project.projectValue <= selectedProjectValueRange[1]) &&
            (project.projectScale >= selectedProjectScaleRange[0] && project.projectScale <= selectedProjectScaleRange[1])*/
        );
    });

    // Update total projects count
    updateTotalProjectsCount(filteredData.length);

    // Call downloadAttachmentsAsZip with filtered data
    // downloadAttachmentsAsZip(filteredData);

    // Check if filtered data is empty
    if (filteredData.length === 0) {
        displayNoResultsMessage();
        hideResultCount(); // hide result count if no results
    } else {
        hideNoResultsMessage();
        displayResultCount(filteredData.length); // display result count if there are results
    }

    // Remove existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add markers for filtered data
    filteredData.forEach(function (project) {
        const popupContent = `
            <h2>${project.projectName}<br></h2>
            <b>Country:</b> ${project.country}<br>
            <b>Location:</b> ${project.location}<br>
            <b>Start Date:</b> ${project.startDate}<br>
            <b>Completion Date:</b> ${project.completionDate}<br>
            <b>Partner(s):</b> ${project.partner}<br>
            <b>Client:</b> ${project.client}<br>
            <b>Description:</b><div style="text-align: justify;">${project.description}</div>
            <!-- <b>Project Value ($):</b> ${project.projectValue}<br> -->
            <!--<b>Project Scale:</b> ${project.projectScale}ha<br>-->
            <b>Status:</b> ${project.status}<br>
            <b>Sector:</b> ${project.sector1}, ${project.sector2}<br>
            <p></p>
            <p style="font-size: 10px;"><i>Note: Project pinned location is indicative only</i></p>
            <div class="image-container">
                <a href="${project.photo1}" target="_blank">
                    <img src="${project.photo1}" class="popup-image" id="popup-image">
                </a>
            </div>
            <div class="button-container">
                <div class="nav-buttons">
                    <button class="prev-button" onclick="prevImage('${project.photo1}', '${project.photo2}')" title="Show previous image">navigate_before</button>
                    <button class="next-button" onclick="nextImage('${project.photo1}', '${project.photo2}')" title="Show next image">navigate_next</button>
                </div>
                <div>
                    <a href="${project.attachment}" target="_blank" style="text-decoration: none;">
                        <button class="download-button" style="display: flex; align-items: center;">
                            <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle;">description</span>
                            <span style="margin-left: 5px; vertical-align: middle; margin-top: -3px;">Download Project Sheet</span>
                        </button>
                    </a>
                </div>
                <span class="material-icons-outlined close-button" onclick="closePopup()">
                    highlight_off
                </span>
            </div>
        `;
        const marker = L.marker([project.lat, project.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(popupContent, { maxWidth: 300 });
    });

    // Zoom the map to the extent of the filtered points/markers
    zoomToFilteredPoints(filteredData);

    // Update the country and sector pie charts with filtered data
    updateCountryChart(filteredData);
    updateSectorChart(filteredData);

    var selectedCategories = getSelectedCategories();
    var selectedClientTypes = getSelectedClientTypes();
    var selectedStatusTypes = getSelectedClientTypes();
    var selectedYearRange = $("#year-slider").slider("option", "values");
    /*var selectedProjectValue = $("#projectValue-slider").slider("option", "values");
    var selectedProjectScale = $("#projectScale-slider").slider("option", "values");*/

    // Logging selected filter options
    console.log("Selected Countries:", selectedCountries);
    console.log("Selected Categories:", selectedCategories);
    console.log("Selected Client Types:", selectedClientTypes);
    console.log("Selected Status Types:", selectedStatusTypes);
    console.log("Selected Year Range:", selectedYearRange);
    /*console.log("Selected Project Value Range:", selectedProjectValueRange[0] + " - " + selectedProjectValueRange[1]);
    console.log("Selected Project Scale Range:", selectedProjectScaleRange[0] + "ha - " + selectedProjectScaleRange[1] + "ha");*/
});