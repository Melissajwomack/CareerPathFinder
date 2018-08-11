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

    https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe&location=Denver+CO
  
  */
$(document).ready(function () {

    var occupationOnetCode;

    var location;

    var term;

    $(".career-options").on("change", function () {
        term = $(this).val();
        console.log(term);
    });

    $("#state").on("change", function () {
        location = $(this).val();
        console.log(location);
    });


    //when submit button is pushed
    $(document).on("click", "#submitBtn", function (event) {
        console.log("button clicked");

        // Job title and job description
        // Getting ONetCode for other calls
        const urlTitleDescription = "https://api.careeronestop.org/v1/occupation/JSoak5q9cSjVtxE/" + term + "/N/0/10"

        $.ajax({
            url: urlTitleDescription,
            method: "GET",
            headers: {
                // OUR API TOKEN
                Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                Accept: "application/json"
            }
        }).then(response => {

            for (i = 0; i < response.OccupationList.length; i++) {

                //Add card for each occupation in html

                //Card
                var occupationDiv = $("<div>").attr("class", "card bg-light");

                //Title
                var occupationTitleDiv = $("<h6>").attr("class", "card-header               text-center bg-light occupation-title");
                occupationTitleDiv.attr("style", "color:darkslategray");

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
                console.log(occupationTitle);
                occupationTitleDiv.text(occupationTitle);

                //Description
                var occupationDescription = response.OccupationList[i].OccupationDescription;
                console.log(occupationDescription)
                occupationDescDiv.text(occupationDescription);

                //Append divs to main drop down
                occupationCardBody.append(occupationDescDiv);
                occupationDiv.append(occupationTitleDiv);
                occupationDiv.append(occupationCardBody);
                $("#occupation-div").append(occupationDiv);
            }
        });
    });


    //When occupation is chosen
    $(document).on("click", ".occupation-title", function () {

        console.log($(this).attr("value"));

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
                Accept: "application/json"
            }
        }).then(response => {

            //Populate salary info
            $("#salary").html("Average pay in " + location + ": " + response.LMI.AveragePayState +
            "<br>" +
            "National average pay: " + response.LMI.AveragePayState);
            console.log(response.LMI.AveragePayState);
            console.log(response.LMI.AveragePayNational);

            //Populate education reqs
            $("#edReqs").text("Typical education required: " + response.LMI.TypicalTraining)
            console.log(response.LMI.TypicalTraining);

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
            }
        }).then(response => {

            for (var i = 0; i < response.SchoolPrograms.length; i++) {

                //Add card for each school

                //Card
                var schoolDiv = $("<div>").attr("class", "card bg-light mt-2");

                //Title
                var schoolTitleDiv = $("<h6>").attr("class", "card-header text-center bg-light");
                schoolTitleDiv.attr("style", "color:darkslategray");

                //Card body
                var schoolCardBody = $("<div>").attr("class", "card-body");
                schoolCardBody.attr("style", "padding:0px");

                //School info
                var schoolInfoDiv = $("<p>").attr("class", "card-text");
                schoolInfoDiv.attr("id", "colleges");

                //Populate new divs

                //Title
                schoolTitleDiv.text(response.SchoolPrograms[i].SchoolName);
                console.log(response.SchoolPrograms[i].SchoolName);

                //School info
                schoolInfoDiv.html(
                    "City: " + response.SchoolPrograms[i].City +
                    "<br>" +
                    "State: " + response.SchoolPrograms[i].StateName +
                    "<br>" +
                    "Program Name: " + response.SchoolPrograms[i].ProgramName
                );
                console.log(response.SchoolPrograms[i].City);
                console.log(response.SchoolPrograms[i].StateName);
                console.log(response.SchoolPrograms[i].ProgramName);

                //Append divs to main dropdown
                schoolCardBody.append(schoolInfoDiv);
                schoolDiv.append(schoolTitleDiv);
                schoolDiv.append(schoolCardBody);
                $(".colleges-div").append(schoolDiv);
            }
        });

    });






    // Data.gov ajax
    // const urlDataGov = "";

    // $.ajax({
    //     url: urlDataGov,
    //     method: "GET"
    // }).then(response => {
    //     console.log(JSON.stringify(response));
    // });

});
