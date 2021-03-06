
$(document).ready(function () {

    var occupationOnetCode;

    var location;

    var term;

    //Setting location variable for later use
    $("#state").on("change", function () {
        location = $(this).val();
        schoolState = location;
    });

    //when submit button is pushed
    $(document).on("click", "#submitBtn", function (event) {

        //Empty divs for last search
        $("#occupation-div").empty();

        //Add instructions
        $("#occupation-div").html("<div class='row pl-1 pr-1'><div class='col-sm-12 d-inline-block text-center mb-4'><h6 class='mb-0 text-capitalize text-secondary'>Click on any career title below to learn more!</h6></div></div>"
        );

        //User input for career field
        term = $("#careerInput").val().trim();

        // Job title and job description
        // Getting ONetCode for other calls
        const urlTitleDescription = "https://api.careeronestop.org/v1/occupation/JSoak5q9cSjVtxE/" + term + "/N/0/10"

        //Call for occupations from CareerOneStop
        $.ajax({
            url: urlTitleDescription,
            method: "GET",
            headers: {
                // OUR API TOKEN
                Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                Accept: "application/json",

            },
            error: function () {
                $("#occupation-div").html(
                    "<div class='row pl-1 pr-1'>" +
                    "<div class='col-sm-12 d-inline-block text-center'>" +
                    "<h6 class='mb-0 text-capitalize text-primary'>" +
                    "Try another search term!" +
                    "</h6>" +
                    "</div>" +
                    "</div>"
                )
            }

        }).then(response => {

            for (i = 0; i < response.OccupationList.length; i++) {

                //Add card for each occupation in html

                //Card
                var occupationDiv = $("<div>").attr("class", "card bg-light mb-3");

                //Title
                var occupationTitleDiv = $("<h6>").attr("class", "card-header text-center bg-light occupation-title");
                occupationTitleDiv.attr("style", "color:blue;");

                //Card body
                var occupationCardBody = $("<div>").attr("class", "card-body");
                occupationCardBody.attr("style", "padding:0px");

                //Occuaption description
                var occupationDescDiv = $("<p>").attr("class", "card-text")

                // O*Net Code for each occupation
                occupationOnetCode = response.OccupationList[i].OnetCode;

                //Assign title with O*Net ID for use with other ajax calls
                occupationTitleDiv.attr("value", occupationOnetCode);


                //Populate divs with info
                //Title
                var occupationTitle = response.OccupationList[i].OnetTitle;
                occupationTitleDiv.text(occupationTitle);

                //Description
                var occupationDescription = response.OccupationList[i].OccupationDescription;
                occupationDescDiv.text(occupationDescription);

                //Append divs to main drop down
                occupationCardBody.append(occupationDescDiv);
                occupationDiv.append(occupationTitleDiv);
                occupationDiv.append(occupationCardBody);
                $("#occupation-div").append(occupationDiv);

            } //End of for Loop
        });
    });

    //When occupation is chosen
    $(document).on("click touchstart", ".occupation-title", function () {

        //Add divs for salary and ed reqs
        $("#salEdReqs").html(
            "<div class='card bg-light'><h6 class='card-header text-center bg-light' style='color:darkslategray'>Salary Info</h6><div class='card-body' style='padding:0px'><p class='card-text' id='salary'></p></div></div><div class='card bg-light mt-2'><h6 class='card-header text-center bg-light' style='color:darkslategray'>Education Requirements</h6><div class='card-body' style='padding:0px'><p class='card-text' id='edReqs'></p></div></div>")

        //Empty divs when new occupation is clicked   
        $("#salary").empty();
        $("#edReqs").empty();
        $("#colleges-div").empty();

        occupationOnetCode = $(this).attr("value");

        // Salary information for state and national for chosen occupation
        // Typical education for chosen occupation 
        const urlOnetCode = "https://api.careeronestop.org/v1/lmi/JSoak5q9cSjVtxE/" + occupationOnetCode + "/" + location

        //Call for salary and typical education from CareerOneStop
        $.ajax({
            url: urlOnetCode,
            method: "GET",
            headers: {
                // OUR API TOKEN
                Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                Accept: "application/json",

            },
            error: function () {
                ("#salEdRegs").html(
                    "<div class='row pl-1 pr-1'>" +
                    "<div class='col-sm-12 d-inline-block text-center'>" +
                    "<h6 class='mb-0 text-capitalize text-primary'>" +
                    "No Information Available" +
                    "</h6>" +
                    "</div>" +
                    "</div>"
                )
            }
        }).then(response => {

            //take out the commas
            var AvgStatePay = response.LMI.AveragePayState;
            AvgStatePay = AvgStatePay.replace(/,/g, "");

            var NtlStatePay = response.LMI.AveragePayNational;
            NtlStatePay = NtlStatePay.replace(/,/g, "");

            if (AvgStatePay == "") {
                AvgStatePay = "No Information Available";
            } else {
                AvgStatePay = parseInt(AvgStatePay);
            }

            if (response.LMI.AveragePayNational == "") {
                NtlStatePay = "No Information Available";
            } else {
                NtlStatePay = parseInt(NtlStatePay);
            }

            var FormattedAvgStatePay = checkNullandNum(AvgStatePay);
            var FormattedNtlStatePay = checkNullandNum(NtlStatePay);
            var TypicalTrainingErrorCatch = checkNullandNum(response.LMI.TypicalTraining)

            //Populate salary info
            $("#salary").html("<strong>Average pay in</strong> " + location + ": " + FormattedAvgStatePay +
                "<br>" +
                "<strong>National average pay:</strong> " + FormattedNtlStatePay);

            //Populate education reqs
            $("#edReqs").html("<strong>Typical education required:</strong> " + TypicalTrainingErrorCatch);

        });

        // School information for state related to chosen occupation
        const urlProgramsbyOccpation = "https://api.careeronestop.org/v1/training/JSoak5q9cSjVtxE/" + occupationOnetCode + "/" + location + "/50/0/0/0/0/0/0/0/0/5"

        //Call for schools by location related to chosen occupation
        $.ajax({
            url: urlProgramsbyOccpation,
            method: "GET",
            headers: {
                // OUR API TOKEN
                Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                Accept: "application/json"
            },
            error: function () {
                //Card
                var schoolDiv = $("<div>").attr("class", "card bg-light mb-3");

                //Title
                var schoolTitleDiv = $("<h6>").attr("class", "card-header text-center bg-light");
                schoolTitleDiv.attr("style", "color:darkslategray");
                schoolTitleDiv.attr("id", "school-title" + i);
                schoolTitleDiv.attr("data-list", "No Information Available");

                //Card body
                var schoolCardBody = $("<div>").attr("class", "card-body");
                schoolCardBody.attr("id", "collegeInfo");
                schoolCardBody.attr("style", "padding:0px");

                //School info
                var schoolInfoDiv = $("<p>").attr("class", "card-text");
                schoolInfoDiv.attr("id", "colleges" + i);

                //Populate new divs

                //Title
                schoolTitleDiv.text("No Information Available");

                //School info
                schoolInfoDiv.html(
                    "City: " + "No Information Available" +
                    "<br>" +
                    "State: " + "No Information Available" +
                    "<br>" +
                    "Program Name:" + "No Information Available" +
                    "<br>" +
                    "URL: " + "No Information Available"
                );


                //Append divs to main dropdown
                schoolCardBody.append(schoolInfoDiv);
                schoolDiv.append(schoolTitleDiv);
                schoolDiv.append(schoolCardBody);
                $("#colleges-div").append(schoolDiv);

                //collapse after Job Title selection
                $("#collapseTwo").removeClass("show");
                $("#collapseThree").addClass("show");
            }
        }).then(response => {

            for (var i = 0; i < response.SchoolPrograms.length; i++) {

                //collapse after Job Title selection
                $("#collapseTwo").removeClass("show");
                $("#collapseThree").addClass("show");

                //Add card for each school

                //Card
                var schoolDiv = $("<div>").attr("class", "card bg-light mb-3");

                //Title
                var schoolTitleDiv = $("<h6>").attr("class", "card-header text-center bg-light");
                schoolTitleDiv.attr("style", "color:darkslategray");
                schoolTitleDiv.attr("id", "school-title" + i);
                schoolTitleDiv.attr("data-list", response.SchoolPrograms[i].SchoolName);

                //Card body
                var schoolCardBody = $("<div>").attr("class", "card-body");
                schoolCardBody.attr("id", "collegeInfo");
                schoolCardBody.attr("style", "padding:0px");

                //School info
                var schoolInfoDiv = $("<p>").attr("class", "card-text");
                schoolInfoDiv.attr("id", "colleges" + i);

                //Populate new divs

                //Title
                schoolTitleDiv.text(response.SchoolPrograms[i].SchoolName);

                //School info
                schoolInfoDiv.html(
                    "<strong>Program Name: </strong>" + response.SchoolPrograms[i].ProgramName +
                    "<br>" +
                    "<strong>City:</strong> " + response.SchoolPrograms[i].City +
                    "<br>" +
                    "<strong>State:</strong> " + response.SchoolPrograms[i].StateName +
                    "<br>" +
                    "<strong>URL:</strong> " + "<a target='_blank' href='https://" + response.SchoolPrograms[i].SchoolUrl + "'>" + response.SchoolPrograms[i].SchoolUrl + "</a>"
                );


                //Append divs to main dropdown
                schoolCardBody.append(schoolInfoDiv);
                schoolDiv.append(schoolTitleDiv);
                schoolDiv.append(schoolCardBody);
                $("#colleges-div").append(schoolDiv);

                dataGovAjax(i);

            }//End of for loop
        });
    }); //End of Onclick occupation title

    // collapse after search button click
    $("#submitBtn").on("click", function () {
        $("#collapseOne").removeClass("show");
        $("#collapseTwo").addClass("show");
    });
}); //End of document.ready

//Functions to catch errors
function checkNullandNum(value) {
    if (value === null || value === "") {
        return "Info Not Available";
    } else if (isFloat(value)) {
        value *= 100;
        return parseFloat(value).toFixed(2) + "%";
    } else if (isInt(value)) {
        return "$" + value.formatMoney(2, ".", ",");
    }
    else {
        return value;
    }
}

function checkNull(value) {
    if (value === null) {
        return "Info Not Available";
    }
    else {
        return value;
    }
}

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

//Call for more information on schools from data.gov
function dataGovAjax(i) {
    var dataGovAPIKey = "&api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe";
    
    var schoolChosen = $("#school-title" + i).attr("data-list");

    const urlDataGov = "https://api.data.gov/ed/collegescorecard/v1/schools?" + dataGovAPIKey + "&school.name=" + schoolChosen;

    //ajax call for School by Location
    $.ajax({
        url: urlDataGov,
        method: "GET",
        error: function () {
            //Card
            var infoDiv = $("<p>");
            infoDiv.attr("class", "card-text");
            infoDiv.attr("id", "school-details");
            infoDiv.html(
                "<strong>Admission Rate: </strong>" + "Information Not Available" + "<br>" +
                "<strong> Cumulative ACT Score: </strong>" + "Information Not Available" + "<br>" +
                "<strong> Overal SAT Score: </strong>" + "Information Not Available" + "<br>" +
                "<strong> In-State Tuition: </strong>" + "Information Not Available" + "<br>" +
                "<strong> Out-of-State Tuition: </strong>" + "Information Not Available"
            );

            $("#colleges" + i).append(infoDiv);
        }
    }).then(response => {

        var results = response.results;
        schoolNameSearch = results[0].school.name;
        //Admission Rate
        var admissionRate = results[0][2013].admissions.admission_rate.overall;
        // ACT Scores average
        var actMidpoint = results[0][2013].admissions.act_scores.midpoint.cumulative;
        //SAT Scores average
        var satMidpoint = results[0][2013].admissions.sat_scores.average.overall;
        //Tuition (in and out of state)
        var tuitionInState = results[0][2013].cost.tuition.in_state;
        var tuitionOutState = results[0][2013].cost.tuition.out_of_state;

        //Add Card for School Info

        //Card
        var infoDiv = $("<p>");
        infoDiv.attr("class", "card-text");
        infoDiv.attr("id", "school-details");

        infoDiv.html(
            "<strong>Admission Rate:</strong> " + checkNullandNum(admissionRate) + "<br>" +
            "<strong>Cumulative ACT Score:</strong> " + checkNull(actMidpoint) + "<br>" +
            "<strong>Overal SAT Score:</strong> " + checkNull(satMidpoint) + "<br>" +
            "<strong>In-State Tuition:</strong> " + checkNullandNum(tuitionInState) + "<br>" +
            "<strong>Out-of-State Tuition:</strong> " + checkNullandNum(tuitionOutState)
        );

        //Append divs to main dropdown
        $("#colleges" + i).append(infoDiv);
    });
}

