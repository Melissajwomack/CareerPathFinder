/* APIs

  careerOneStop
  ----------------------
  Your unique user ID:
  JSoak5q9cSjVtxE

  Your Token key:
  EpjdrTPww1oYCMGKS8r1cJzQD/M+rH43tuZPAQfd6eJgZPa8XPe8G0N9zSEdD/lWCHT+A1wN+niAY+bSU18adA== 
  
  */

    $(document).ready(function () {

        //when submit button is pushed
        $("#sButton").on("click", function () {

            var term = $("#search-input").val().trim();

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
                console.log(JSON.stringify(response));

                for (i = 0; i < response.OccupationList.length; i++) {

                    var occupationTitle = response.OccupationList[i].OnetTitle;
                    console.log(occupationTitle);
                    var occupationDescription = response.OccupationList[i].OccupationDescription;
                    console.log(occupationDescription)

                    var newDiv = $("newDiv");
                    newDiv.html("<h3>" + occupationTitle + "</h3>");
                    newDiv.html("<p>" + occupationDescription + "</p>");
                    $("#response").append(newDiv);

                };
            })
        });
    });
