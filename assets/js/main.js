var reportPBI = {
	generateReport: function(respuesta, reportSection) {
        var result = respuesta;//JSON.parse(respuesta);

        var accessToken = result.Token;
        if (!accessToken || accessToken == "") {
            return;
        }
        var embedUrl = result.EmbedUrl;
        var reportId = result.Id;
        var models = window['powerbi-client'].models;
        // Embed configuration used to describe the what and how to embed.
        // This object is used when calling powerbi.embed.
        // This also includes settings and options such as filters.
        // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
        
        var config = {
            type: 'report',
            accessToken: accessToken,
            embedUrl: embedUrl,
            id: reportId,
            viewMode: models.ViewMode.View,
            settings: {
                filterPaneEnabled: false, //barra lateral
                navContentPaneEnabled: false //barra de abajo
            }
        };

        // Grab the reference to the div HTML element that will host the report.
        var reportContainer = document.getElementById('reportContainer');
        if (!reportContainer){ return; }
        // Embed the report and display it within the div container.
        var report = powerbi.embed(reportContainer, config);

        //Filtrar
        // Report.on will add an event handler which prints to Log window.
        report.on("loaded", function () {
         if (reportSection){
            report.setPage(reportSection)
           .then(function () {
               //Log.logText("Page was set to: ReportSection8ec79b37dbd941d800b0");
           })
           .catch(function (errors) {
           });
         }
        });
    },
    resetReport: function(){
        var reportContainer = document.getElementById('reportContainer');
        reportContainer.innerHTML = '';
    }
}