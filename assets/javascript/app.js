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
            console.log(response);

            for (i = 0; i < response.OccupationList.length; i++) {

                var occupationTitle = response.OccupationList[i].OnetTitle;
                console.log(occupationTitle);
                var occupationDescription = response.OccupationList[i].OccupationDescription;
                console.log(occupationDescription)

                // O*Net Code for each occupation
                occupationOnetCode = response.OccupationList[i].OnetCode;
                console.log(occupationOnetCode);
            }
        });
    });


    //When occupation is chosen
    // $(document).on("click", "id for divs with occupations") function (){}

    // Salary information for state and national for chosen occupation
    // Typical education for chosen occupation 
    const urlOnetCode = "https://api.careeronestop.org/v1/lmi/JSoak5q9cSjVtxE/" + occupationOnetCode + location

    $.ajax({
        url: urlOnetCode,
        method: "GET",
        headers: {
            // OUR API TOKEN
            Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
            Accept: "application/json"
        }
    }).then(response => {

        console.log(response);
        
        console.log(response.LMI.AveragePay_State);
        console.log(response.LMI.AveragePay_National);
        console.log(response.LMI.TypicalTraining);

    });

    
    // School information for state related to chosen occupation
    const urlProgramsbyOccpation = "/v1/training/JSoak5q9cSjVtxE/" + occupationOnetCode + location + "/50/0/0/0/0/0/0/0/0/5"

    $.ajax({
        url: urlProgramsbyOccpation,
        method: "GET",
        headers: {
            // OUR API TOKEN
            Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
            Accept: "application/json"
        }
    }).then(response => {

        console.log(response);

        for (var i = 0; i < response.SchoolPrograms.length; i++) {
        console.log(response.SchoolPrograms[i].SchoolName);
        console.log(response.SchoolPrograms[i].City);
        console.log(response.SchoolPrograms[i].StateName);
        console.log(response.SchoolPrograms[i].ProgramName);
        }
    });

   


    // Data.gov ajax
    const urlDataGov = "";

    $.ajax({
        url: urlDataGov,
        method: "GET"
    }).then(response => {
        console.log(JSON.stringify(response));
    });

});
