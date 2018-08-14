/* APIs
  careerOneStop
  ----------------------
  Your unique user ID:
  JSoak5q9cSjVtxE
  Your Token key:
  EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA== 
--------------------------------------------------------
  data.gov
  college score card
  ----------------------
  api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe
    You can start using this key to make web service requests. Simply pass your key in the URL when making a web request. Here's an example:

    https://api.data.gov/ed/collegescorecard/v1/schools?api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe&school.name=University%20of%20Texas

    visual search: https://collegescorecard.ed.gov/

    https://api.data.gov/ed/collegescorecard/v1/schools/?sort=2013.earnings.6_yrs_after_entry.percent_greater_than_25000%3Adesc&school.operating=1&2015.student.size__range=1..&2015.academics.program_available.assoc_or_bachelors=true

    &school.state=TX

    &school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&fields=id%2Cschool.name%2Cschool.city%2Cschool.state%2C2015.student.size%2Cschool.branches%2Cschool.ownership%2Cschool.degrees_awarded.predominant%2C2015.cost.avg_net_price.overall%2C2015.completion.rate_suppressed.overall%2C2013.earnings.10_yrs_after_entry.median%2C2013.earnings.6_yrs_after_entry.percent_greater_than_25000%2Cschool.under_investigation&api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe

    https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe&location=Denver+CO
  
  */
var numSchools;

$(document).ready(function () {
    // localStorage.clear();
    

    var dataGovAPIKey = "&api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe";

    var occupationOnetCode;

    var location;

    var term;

    $("#state").on("change", function () {
        location = $(this).val();
        schoolState = location;
        localStorage.setItem("state", location);
    });


    //when submit button is pushed
    $(document).on("click", "#submitBtn", function (event) {
        console.log("button clicked");


        //Empty divs for last search
        $("#occupation-div").empty();

        //Add instructions
        $("#occupation-div").html("<div class='row pl-1 pr-1'><div class='col-sm-12 d-inline-block text-center mb-4'><h6 class='mb-0 text-capitalize text-secondary'>Click on any career title below to learn more!</h6></div></div>"
        );

        //User input for career field
        term = $("#careerInput").val().trim();
        localStorage.setItem("career", term);

        // Job title and job description
        // Getting ONetCode for other calls
        const urlTitleDescription = "https://api.careeronestop.org/v1/occupation/JSoak5q9cSjVtxE/" + term + "/N/0/10"

        $.ajax({
            url: urlTitleDescription,
            method: "GET",
            headers: {
                // OUR API TOKEN
                Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                Accept: "application/json",

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("some error occupation");
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
                console.log(occupationOnetCode);
                //Assign title with O*Net ID for use with other ajax calls
                occupationTitleDiv.attr("value", occupationOnetCode);


                //Populate divs with info
                //Title
                var occupationTitle = response.OccupationList[i].OnetTitle;
                localStorage.setItem("occupation", occupationTitle);
                occupationTitleDiv.text(occupationTitle);

                //Description
                var occupationDescription = response.OccupationList[i].OccupationDescription;
                localStorage.setItem("description", occupationDescription);
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
    $(document).on("click", ".occupation-title", function () {
        
        //Empty divs when new occupation is clicked
        $("#salary").empty();
        $("#edReqs").empty();
        $("#colleges-div").empty();

        occupationOnetCode = $(this).attr("value");

        // Salary information for state and national for chosen occupation
        // Typical education for chosen occupation 
        const urlOnetCode = "https://api.careeronestop.org/v1/lmi/JSoak5q9cSjVtxE/" + occupationOnetCode + "/" + location

        $.ajax({
            url: urlOnetCode,
            method: "GET",
            headers: {
                // OUR API TOKEN
                Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                Accept: "application/json",

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("some currency error");
            }
        }).then(response => {
            console.log(response);

            //take out the commas
            var AvgStatePay = response.LMI.AveragePayState;
            AvgStatePay = AvgStatePay.replace(/,/g, "");
            console.log(AvgStatePay);

            var NtlStatePay = response.LMI.AveragePayNational;
            NtlStatePay = NtlStatePay.replace(/,/g, "");
            console.log(NtlStatePay);

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
            localStorage.setItem("statePay", FormattedAvgStatePay);
            var FormattedNtlStatePay = checkNullandNum(NtlStatePay);
            localStorage.setItem("ntlPay", FormattedNtlStatePay);

            //Populate salary info
            $("#salary").html("Average pay in " + location + ": " + FormattedAvgStatePay +
                "<br>" +
                "National average pay: " + FormattedNtlStatePay);

            //Populate education reqs
            $("#edReqs").text("Typical education required: " + response.LMI.TypicalTraining)
            localStorage.setItem("training", response.LMI.TypicalTraining);

        });

        // School information for state related to chosen occupation
        const urlProgramsbyOccpation = "https://api.careeronestop.org/v1/training/JSoak5q9cSjVtxE/" + occupationOnetCode + "/" + location + "/50/0/0/0/0/0/0/0/0/5"

        $.ajax({
            url: urlProgramsbyOccpation,
            method: "GET",
            headers: {
                // OUR API TOKEN
                Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                Accept: "application/json"

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
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
                    "Program Name: " + "No Information Available" +
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

                for(var error = 0; error < 5; error++){
                    localStorage.setItem("schoolName"+error, "Info Not Available");
                    localStorage.setItem("schooURL"+error, "Info Not Available");
                }

            }

        }).then(response => {
            numSchools = response.SchoolPrograms.length;
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
                localStorage.setItem("schoolName" +i, response.SchoolPrograms[i].SchoolName);

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
                    "Program Name: " + response.SchoolPrograms[i].ProgramName +
                    "<br>" +
                    "City: " + response.SchoolPrograms[i].City +
                    "<br>" +
                    "State: " + response.SchoolPrograms[i].StateName +
                    "<br>" +
                    "URL: " + "<a target='_blank' href='https://" + response.SchoolPrograms[i].SchoolUrl + "'>" + response.SchoolPrograms[i].SchoolUrl + "</a>"
                );
                
                localStorage.setItem("schoolURL"+i, response.SchoolPrograms[i].SchoolUrl);


                //Append divs to main dropdown
                schoolCardBody.append(schoolInfoDiv);
                schoolDiv.append(schoolTitleDiv);
                schoolDiv.append(schoolCardBody);
                $("#colleges-div").append(schoolDiv);

                mikesAjax(i);



            }//End of for loop


        }); // End of Melissa ajax
        console.log(localStorage);
        createPath();
    }); //End of Onclick occupation title

    // collapse after search button click
    $("#submitBtn").on("click", function () {
        $("#collapseOne").removeClass("show");
        $("#collapseTwo").addClass("show");
    });
}); //End of document.ready


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

function mikesAjax(i) {
    var dataGovAPIKey = "&api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe";
    //ajax call for School by Location
    var schoolChosen = $("#school-title" + i).attr("data-list");
    console.log(schoolChosen);
    // if(!schoolClicked){
    //     schoolClicked = true;
    const urlDataGov = "https://api.data.gov/ed/collegescorecard/v1/schools?" + dataGovAPIKey + "&school.name=" + schoolChosen;
    console.log(urlDataGov);
    $.ajax({
        url: urlDataGov,
        method: "GET",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //Card
            var infoDiv = $("<p>");
            infoDiv.attr("class", "card-text");
            infoDiv.attr("id", "school-details");
            // $("#school-details").attr("style", "display: inline-block;");


            infoDiv.html(
                "Admission Rate: " + "Information Not Available" + "<br>" +
                "Cumulative ACT Score: " + "Information Not Available" + "<br>" +
                "Overal SAT Score: " + "Information Not Available" + "<br>" +
                "In-State Tuition: " + "Information Not Available" + "<br>" +
                "Out-of-State Tuition: " + "Information Not Available"
            );

            $("#colleges" + i).append(infoDiv);
        }
    }).then(response => {
        // console.log(response);

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
        // console.log(schoolNameSearch + " " + admissionRate + " " + actMidpoint + " " + satMidpoint + " " + tuitionInState + " " + tuitionOutState);

        //Add Card for School Info

        //Card
        var infoDiv = $("<p>");
        infoDiv.attr("class", "card-text");
        infoDiv.attr("id", "school-details");
        // $("#school-details").attr("style", "display: inline-block;");


        infoDiv.html(
            "Admission Rate: " + checkNullandNum(admissionRate) + "<br>" +
            "Cumulative ACT Score: " + checkNull(actMidpoint) + "<br>" +
            "Overal SAT Score: " + checkNull(satMidpoint) + "<br>" +
            "In-State Tuition: " + checkNullandNum(tuitionInState) + "<br>" +
            "Out-of-State Tuition: " + checkNullandNum(tuitionOutState)
        );

        localStorage.setItem("AdmissionRate", checkNullandNum(admissionRate));
        localStorage.setItem("ACTScore", checkNull(actMidpoint));
        localStorage.setItem("SATScore", checkNull(satMidpoint));
        localStorage.setItem("InStateTuition", checkNullandNum(tuitionInState));
        localStorage.setItem("OutofStateTuition", checkNullandNum(tuitionOutState));


        //Need to put on the appropriate school clicked >_<
        //Number of School Entries ==> i


        //Datagov Populate
        //Append divs to main dropdown

        $("#colleges" + i).append(infoDiv);


    });// End of Mike ajax
}

function createPath(){
    $("#path-div").empty();
    //create visual path with divs
    // var rowDiv = $("<div>");
    // rowDiv.attr("class", "row");

    // var colDiv = $("<div>");
    // colDiv.attr("class", "col-sm-12");

    var PathDiv = $("<div>");
    PathDiv.attr("class", "bg-dark");
    PathDiv.css({"background-image": "url(assets/images/pathGraphicUpdated.png)", "background-repeat": "no-repeat", "position": "relative","height": "800px", "width": "1024px", "margin": "0 auto"});
    
    var searchTermDiv = $("<div>");
    // searchTermDiv.attr("class","alert alert-light");
    searchTermDiv.css({"margin": "25px", "width": "100px", "position": "absolute", "top": "92px", "left": "214px"});
    searchTermDiv.attr("id", "term");
    
    var locationDiv = $("<div>");
    // locationDiv.attr("class","alert alert-light");
    locationDiv.css({"margin": "25px", "width": "100px", "position": "absolute", "top": "92px", "left": "485px"});
    locationDiv.attr("id", "location");

    
    var occupationDiv = $("<div>");
    // occupationDiv.attr("class","alert alert-light");
    occupationDiv.css({"margin": "25px", "width": "250px", "position": "absolute", "top": "255px", "left": "700px"});
    occupationDiv.attr("id", "occupation");

    
    var schoolsDiv = $("<div>");
    // schoolsDiv.attr("class","alert alert-light");
    schoolsDiv.css({"margin": "25px", "width": "300px", "position": "absolute", "top": "357px", "left": "34px"});
    schoolsDiv.attr("id", "schools");

    var schoolsP = $("<p>");
    schoolsP.attr("id", "schoolList");

   
    //set values from local storage
    searchTermDiv.text(localStorage.getItem("career"));
    locationDiv.text(localStorage.getItem("state"));
    occupationDiv.text(localStorage.getItem("occupation"));
    
    for(var m = 0; m < 5; m++){
        schoolsP.append(localStorage.getItem("schoolName"+m) + "<br>");
    }

    //append to all the things
    schoolsDiv.append(schoolsP);


    PathDiv.append(searchTermDiv);
    PathDiv.append(locationDiv);
    PathDiv.append(occupationDiv);
    PathDiv.append(schoolsDiv);
    
    // colDiv.append(PathDiv);
    // rowDiv.append(colDiv);
    $("#path-div").append(PathDiv);
}

