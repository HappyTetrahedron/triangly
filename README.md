# Triangly

A unique design template for static websites.

## Usage
This template consists of a stylesheet and a javascript file. We also provide an HTML file which exemplifies the usage of Triangly. This is a completely standalone template which you may adapt to your needs. 

The script makes some assumptions on the structure of the HTML file:

* There should be three columns with IDs `col-0` through `col-2`, which contain children that are assigned the appropriate Triangly CSS classes (refer to the example HTML file)
* In your static HTML, all shapes are initially in the first column (`col-0`)
* The shapes in that first column strictly alternate between `left` and `right` shapes, starting with `left`. This is required for the placement algorithm to always terminate.
