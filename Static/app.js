const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Use a D3 dataPromise to fetch the JSON data from the url
d3.json(url).then(function(data){

    // Save each data type to a variable
    let names = data.names;
    let meta = data.metadata;
    let samples = data.samples;

    // Get top 10 sample values & list in descending order
    let sample = samples[0];
    let x = sample.sample_values.slice(0, 10).reverse();
    let y = sample.otu_ids.slice(0, 10).reverse();
    let hover = sample.otu_labels.slice(0, 10).reverse();

    // Create initial horizontal barchart from first sample
    initbar = [{
        x: x,
        y: y.map(item => '<b>OTU ' + item.toString() + '  </b>'),//add 'OTU ' to each label
        type: 'bar',
        orientation: 'h',
        marker:{
            color:'lightseagreen'
        },
        text: hover
    }];

    // Add layout details to bar chart
    blayout = {
        width: 500, height: 500, margin: 'auto',
        title: '<b>Top 10 Microbial Species Present in Sample</b><br>(Hover for OTU Labels)',
        xaxis: {
            title: '<b>Sample Values</b>'
        },
        yaxis: {
            linecolor: 'lightseagreen'
        }
    }
   
    // Create initial bubble chart from first sample
    initbub = [{
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: 'Viridis'
        }
    }];

    // Add layout details to bubble plot
    bublay = {
        width: 1150, height: 500, margin: 'auto',
        title: '<b>All Microbial Species Present in Sample:<br>OTU ID by Values in Sample</b><br>(Hover for OTU Labels)',
        xaxis: {
            title: '<b>Operational Taxonomic Unit IDs</b>'
        },
        yaxis: {
            title: '<b>Sample Values</b>'
        }
    }

    // Add the initial metadata to the Demographic Info panel
    let demo = d3.select('#sample-metadata');
    let keys = Object.keys(meta[0])
    let values = Object.values(meta[0])
    for(i = 0; i < keys.length; i++){
        bold = demo.append('strong')
        bold.append('p').text(`${keys[i]}: ${values[i]}`).attr('id', keys[i].toString());
    }

    // Update style of page elements to match our dashboard style
    d3.select('h1').style('color', 'darkslateblue');
    d3.select('h5').style('font-weight', 'bold');
    d3.select('.panel-primary').style('border-color', 'slateblue');
    d3.select('.panel-heading').style('background-color', 'slateblue');
    d3.select('.panel-heading').style('border-color', 'slateblue');

    // Display initial plots
    Plotly.newPlot('bar', initbar, blayout);
    Plotly.newPlot('bubble', initbub, bublay);


    // Add names to the dropdown menu & give each a property we can call later
    for(i = 0; i < names.length; i++){
        d3.select('#selDataset').append('option').text(`BB_${names[i]}`).property('value', names[i].toString());
    }

    // set listener on dropdown menu to run updatePlots function on change
    d3.selectAll('#selDataset').on('change', updatePlots);

   
    // Function to Update Plots when new name is chosen from dropdown menu
    function updatePlots(){

        // Get new sample name
        let name = d3.select('#selDataset').property('value');

        // Set empty array variables for each item we need to update
        // For bar chart
        let barx = [];
        let bary = [];
        let barhover = [];

        // For bubble chart
        let bubx = [];
        let buby = [];
        let bubtxt = [];
        let bcolor = [];
        let bsize = [];


        // Iterate through samples list
        for(i = 0; i < samples.length; i++){
            
            // Check if our selection matches
            if(samples[i].id === name){

                // Set the new values for x, y, and hover for bar chart
                barx = samples[i].sample_values.slice(0, 10).reverse();
                bary = samples[i].otu_ids.slice(0, 10).reverse();
                bary = bary.map(item => '<b>OTU ' + item.toString() + '  </b>');
                barhover = samples[i].otu_labels.slice(0, 10).reverse();

                // Set new values for x, y, hover, size, & color for bubble plot
                bubx = samples[i].otu_ids;
                buby = samples[i].sample_values;
                bubtxt = samples[i].otu_labels;
                bsize = samples[i].sample_values;
                bcolor = samples[i].otu_ids;
            }  
        }

        //Update bar chart
        Plotly.restyle('bar', 'x', [barx]);
        Plotly.restyle('bar', 'y', [bary]);
        Plotly.restyle('bar', 'text', [barhover]);

        //Update bubble plot
        Plotly.restyle('bubble', 'x', [bubx]);
        Plotly.restyle('bubble', 'y', [buby]);
        Plotly.restyle('bubble', 'text', [bubtxt]);
        Plotly.restyle('bubble', 'marker.size', [bsize]);
        Plotly.restyle('bubble', 'marker.color', [bcolor]);

        // Filter metadata list to find our sample
        bb = meta.filter(n => n.id.toString() === name)[0];

        // Update keys in Demographic Info box
        keys.map(k => d3.select(`#${k}`).text(`${k}: ${bb[k.toString()]}`));
    }
});