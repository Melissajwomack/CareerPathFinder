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

    //when submit button is pushed
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var term = $("#cr-title").val().trim();

        var location = $("#location").val();

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

                var newDiv = $("newDiv");
                newDiv.html("<h3>" + occupationTitle + "</h3>");
                newDiv.html("<p>" + occupationDescription + "</p>");
                $("#response").append(newDiv);


                occupationOnetCode = response.OccupationList[i].OnetCode;
                console.log(occupationOnetCode);

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
                    console.log(JSON.stringify(response));
        
                });

                const urlProgramsbyOccpation = "https://api.careeronestop.org/v1/lmi/JSoak5q9cSjVtxE" + occupationOnetCode + location + "/50/0/0/0/0/0/0/0/0/5"

                $.ajax({
                    url: urlProgramsbyOccpation,
                    method: "GET",
                    headers: {
                        // OUR API TOKEN
                        Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                        Accept: "application/json"
                    }
                }).then(response => {
                    console.log(JSON.stringify(response));
        
                });

                const urlDataGov = "";

                $.ajax({
                    url: urlDataGov,
                    method: "GET"
                }).then(response => {
                    console.log(JSON.stringify(response));
                });
        });


    });
});