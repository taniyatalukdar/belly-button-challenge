function popMeta(sample) {
    console.log(sample);
    // PANEL
    d3.json("../samples.json").then((data) => {
        let dataMeta = data.metadata;
        filterArray = dataMeta.filter(x => x.id == sample);
        results = filterArray[0];
        let PANEL = d3.select("#sample-metadata");
        PANEL.html("")
        Object.entries(results).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}:${value}`);



        });
    });

}

function popCharts(params) {
    d3.json('../samples.json').then((data) => {
        let samples = data.samples;
        let results = samples.filter(sampleObject => sampleObject.id == params);
        let result = results[0];
        let otu_ids = result.otu_ids
        let otu_labels = result.otu_labels
        let sample_values = result.sample_values
        // build var chart 

        let yticks = otu_ids.slice(0, 10).map(x => `OTU ${x}`).reverse();
        let barData = [{
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }];
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };
        Plotly.newPlot("bar", barData, barLayout);
        console.log(samples[0].otu_ids)
        // build bubble chart
        let data_bubble = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels.slice(0, 10),
            mode: 'markers',
            marker: {
                size: samples[0].sample_values,
                color: samples[0].otu_ids
            }
        }];
            let layout_bubble = {
            title: {
                text: ` OTU IDs and Corresponding Sample Values`
            },
            xaxis: {
                title: `OTU ID`
            },
            yaxis: {
                title: `Sample Value`
            }
        };

        Plotly.newPlot('bubble', data_bubble, layout_bubble);

    });

}



function init() {
    let selector = d3.select("#selDataset");
    d3.json("../samples.json").then((data) => {
        let dataNames = data.names;

        for (let i = 0; i < dataNames.length; i++) {
            selector.append("option").text(dataNames[i]).property("value", dataNames[i]);
        }

        dataFirst = dataNames[0];
        popMeta(dataFirst);
        popCharts(dataFirst);


    });


}

function optionChanged(x) {
    popMeta(x);
    popCharts(x);
}

init();