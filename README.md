# Belly Button Biodiversity Dashboard
Building an interactive dashboard using JavaScript Plotly and D3 libraries to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
- - -
<img src='Images/corynebacteriumStockPhoto.jpg' width='900' height='500'>  

- - -
## Project Structure

### Completed Belly Button Biodiversity Dashboard can be found [HERE](https://andcetera.github.io/belly-button-challenge/)
 - Use the dropdown menu on the top right-hand side to view data for each sample belly-button
 - More information available on hover for bubble and bar plots

### Files
- Original dataset can be found in the [data](data/) folder, included for reference only.
- The [Images](Images/) folder contains all images used in this README.
- Project code can be found in the [static/js](static/js/) path, along with the root [index.html](index.html) file.
 ### Deliverable 1: [app.js](static/js/app.js)
 All code to create & update the majority of the dashboard, including:
 - Top 10 OTU Bar Chart
 - Bubble Plot of Each Sample
 - Sample Demographic Information
 - Interactive Dropdown Menu
### Deliverable 2: [bonus.js](static/js/bonus.js)
All code to create & update the indicator gauge displaying belly button washing frequency.
- - -

## Project Background
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.
## Instructions
Complete the following steps:

1. Use the D3 library to read in `samples.json` from the URL `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    - Use `sample_values` as the values for the bar chart.

    - Use `otu_ids` as the labels for the bar chart.

    - Use `otu_labels` as the hovertext for the chart.

![OTU Bar Chart](Images/hw01.png)

3. Create a bubble chart that displays each sample.

    - Use `otu_ids` for the x values.

    - Use `sample_values` for the y values.

    - Use `sample_values` for the marker size.

    - Use `otu_ids` for the marker colors.

    - Use `otu_labels` for the text values.

![Bubble Chart](Images/bubble_chart.png)

4. Display the sample metadata, i.e., an individual's demographic information.

![Demographic Info Table](Images/hw03.png)

5. Update all the plots when a new sample is selected. 

![Dropdown Example](Images/dropdown.png)

Additionally, you are welcome to create any layout that you would like for your dashboard.  An example dashboard is shown as follows:

![Full Dashboard Example](Images/hw02.png)

6. Deploy your app to a free static page hosting service, such as GitHub Pages.

## Advanced Challenge Assignment (Optional with no extra points earning)
The following task is advanced and therefore optional.

- Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.

- You will need to modify the example gauge code to account for values ranging from 0 through 9.

- Update the chart whenever a new sample is selected.

![Weekly Washing Frequency Gauge](Images/gauge.png)

- - -

## References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/
