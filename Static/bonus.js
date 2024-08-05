let meta = [];
d3.json(url).then(function(data){

    // Save metadata to list to reference for our plot
    meta = data.metadata;
    
    // Plot initial indicator gauge from first sample
    let data1 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: meta[0].wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>(Scrubs Per Week)" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9], 
                    visible: false
                },
                steps: [
                    { range: [0, 1], color: 'rgba(253, 231, 37, 0.7)'},
                    { range: [1, 2], color: 'rgba(180, 222, 44, 0.7)'},
                    { range: [2, 3], color: 'rgba(109, 205, 89, 0.7)'},
                    { range: [3, 4], color: 'rgba(53, 183, 121, 0.7)'},
                    { range: [4, 5], color: 'rgba(31, 158, 137, 0.7)'},
                    { range: [5, 6], color: 'rgba(38, 130, 142, 0.7)'},
                    { range: [6, 7], color: 'rgba(49, 104, 142, 0.7)'},
                    { range: [7, 8], color: 'rgba(62, 74, 137, 0.7)'},
                    { range: [8, 9], color: 'rgba(72, 40, 120, 0.7)'}
                ],
                bar: {thickness: 0},
                borderwidth: 0,
                threshold: {
                    value: meta[0].wfreq,
                    thickness: 1,
                    line: {
                        color: 'black',
                        width: 6
                    }
                },
            }
        }
    ];

    // get x & y positions for gauge segment labels
    rad = 0.465;
    theta = -0.04;
    step = 0.4;
    xpos = [];
    ypos = [];
    for(s = 0; s < 9; s++){
        xpos.push(0.5 + rad * Math.cos(theta));
        ypos.push(0.28 + rad * Math.sin(theta));
        theta += step;
    }

    // Add layout information and display plot
    var layout = {
        width: 450, height: 450, margin: 'auto',
        annotations: [
            {x: xpos[0], y: ypos[0], text: '<b>8-9</b>', showarrow: false, font:{ color: 'white'}},
            {x: xpos[1], y: ypos[1], text: '<b>7-8</b>', showarrow: false, font:{ color: 'white'}},
            {x: xpos[2], y: ypos[2], text: '<b>6-7</b>', showarrow: false, font:{ color: 'white'}},
            {x: xpos[3], y: ypos[3], text: '<b>5-6</b>', showarrow: false, font:{ color: 'white'}},
            {x: xpos[4], y: ypos[4], text: '<b>4-5</b>', showarrow: false, font:{ color: 'white'}},
            {x: xpos[5], y: ypos[5], text: '<b>3-4</b>', showarrow: false, font:{ color: 'white'}},
            {x: xpos[6], y: ypos[6], text: '<b>2-3</b>', showarrow: false, font:{ color: 'gray'}},
            {x: xpos[7], y: ypos[7], text: '<b>1-2</b>', showarrow: false, font:{ color: 'dimgray'}},
            {x: xpos[8], y: ypos[8], text: '<b>0-1</b>', showarrow: false, font:{ color: 'black'}}
    ]
};
    Plotly.newPlot('gauge', data1, layout);
});


// Function to Update Plot when new sample is chosen from dropdown menu
function optionChanged(x){

    let wash = 0;
    
    // Iterate through the meta list to update wash frequency number
    for(i = 0; i < meta.length; i++){
                
        // Check if our selection matches
        if(meta[i].id.toString() === x){
    
            // Update wfreq variable
            wash = meta[i].wfreq;
        }
    }
    
    // Restyle the plot
    Plotly.restyle('gauge', 'value', [wash]);
    Plotly.restyle('gauge', 'gauge.threshold.value', [wash]);
}