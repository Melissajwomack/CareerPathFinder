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
  a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe

    You can start using this key to make web service requests. Simply pass your key in the URL when making a web request. Here's an example:

    https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=a5c66Ijh8yZArwVevtDrj3pRsW3lGaLrCER5CfQe&location=Denver+CO
  
  */

    $(document).ready(function () {

        //when submit button is pushed
        $(".dropdown-item").on("click", function () {

            var term = $(this).val().trim();

            const url = "https://api.careeronestop.org/v1/occupation/JSoak5q9cSjVtxE/" + term + "/N/0/10"

            console.log(term);

            $.ajax({
                url: url,
                method: "GET",
                headers: {
                    // OUR API TOKEN
                    Authorization: "Bearer EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA==",
                    Accept: "application/json"
                }
            }).then(response => {
                console.log(response);

                for (i = 0; i < 1; i++) {

                    var occupationTitle = response.OccupationList[i].OnetTitle;
                    console.log(occupationTitle);
                    var occupationDescription = response.OccupationList[i].OccupationDescription;
                    console.log(occupationDescription)

                    var newDiv = $("<div>");
                    newDiv.append("<p>" + occupationTitle + "</p>");
                    newDiv.append("<p>" + occupationDescription + "</p>");
                    $(".panel").append(newDiv);

                };
            })
        });
    });
