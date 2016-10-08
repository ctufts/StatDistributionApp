// Update graph
var margin = { top: 20, right: 30, bottom: 100, left: 100 },
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var barPadding = 2;




function updatePdf(data) {
    //Set x and y domains
    
    y.domain([0, d3.max(data.y, function(d) {
        return +d; })]);

    x.domain([d3.min(data.x, function(d) {
            return +d; }),
        d3.max(data.x, function(d) {
            return +d; })
    ]);
    var barWidth = width / +data.y.length;

    // width = parseInt(d3.select("#graph").style("width"), 10) ,
    // height = parseInt(d3.select("#graph").style("height"), 10) ;
    console.log(parseInt(d3.select("#graph").style("width"), 10));
    console.log(parseInt(d3.select("#graph").style("height"), 10));
    // remove all components of previous graph
    var parent = document.getElementById("graph");
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
    

    // set up new plot
    var svg = d3.select("#graph").append("svg")
        // .attr('viewBox', "0 0 960 500")
        // .attr('preserveAspectRatio',"xMinYMin meet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // set up x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        // .attr("transform", "translate(0," + height + ")")
        .call(yAxis);

    // remove old data and append new data points
    var rect = svg.selectAll('rect')
        .data(data.y);
    rect.exit().remove();
    rect.enter().append("rect")
        .attr('width', width / +data.y.length - barPadding);

    rect
        .attr('height', function(d) {
            // return height-y(d);
            return height - y(d);
        })
        .attr('x', function(d, i) {
            return i * (width / +data.x.length);
        })
        .attr('y', function(d) {
            return y(+d);
            // return height - (d * 200); // Align the bars to the bottom of the SVG.
        });
     svg.append("text")
        .attr("y", 0 - margin.left/1.5)
        .attr("x", 0-(height/2))
        .attr("dy","1em")
            // .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("f(x)");

    svg.append("text")
       .attr("class","xtext")
       .attr("x",width/2 )
       .attr("y", height + margin.bottom/2)
       .attr("text-anchor","middle")
       .text("x");


}

////////////////////////////////////////////////////////////////////////////////////////


function updateCdf(data) {
    //Set x and y domains
    
    y.domain([0, d3.max(data.cdf, function(d) {
        return +d; })]);

    x.domain([d3.min(data.x, function(d) {
            return +d; }),
        d3.max(data.x, function(d) {
            return +d; })
    ]);
    var barWidth = width / +data.cdf.length;

    // width = parseInt(d3.select("#graph").style("width"), 10) ,
    // height = parseInt(d3.select("#graph").style("height"), 10) ;
    console.log(parseInt(d3.select("#cdfgraph").style("width"), 10));
    console.log(parseInt(d3.select("#cdfgraph").style("height"), 10));
    // remove all components of previous graph
    var parent = document.getElementById("cdfgraph");
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
    

    // set up new plot
    var svg = d3.select("#cdfgraph").append("svg")
        // .attr('viewBox', "0 0 960 500")
        // .attr('preserveAspectRatio',"xMinYMin meet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // set up x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        // .attr("transform", "translate(0," + height + ")")
        .call(yAxis);

    // remove old data and append new data points
    var rect = svg.selectAll('rect')
        .data(data.cdf);
    rect.exit().remove();
    rect.enter().append("rect")
        .attr('width', width / +data.cdf.length - barPadding);

    rect
        .attr('height', function(d) {
            // return height-y(d);
            return height - y(d);
        })
        .attr('x', function(d, i) {
            return i * (width / +data.x.length);
        })
        .attr('y', function(d) {
            return y(+d);
            // return height - (d * 200); // Align the bars to the bottom of the SVG.
        });

    svg.append("text")
        .attr("y", 0 - margin.left/1.5)
        .attr("x", 0-(height/2))
        .attr("dy","1em")
            // .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("P(X) \u2264 x");

    svg.append("text")
       .attr("class","xtext")
       .attr("x",width/2 )
       .attr("y", height + margin.bottom/2)
       .attr("text-anchor","middle")
       .text("x");

}
///////////////////// Menu Event Listener ///////////////////////////////////////
function CreateMenu() {
    document.getElementById('distributionSelector').addEventListener('click', function(e) {
        // console.log(e.target.id);
        //remove any sliders
        var parent = document.getElementById("sliderdiv");
        //remove all nodes in the slider div
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }


        /////////////////////////////////////////////////////////////////////
        ////////////////////////////// GAUSSIAN ////////////////////////////
        ////////////////////////////////////////////////////////////////////

        if (e.target.id == 'gaussian') {
            // if gaussian is selected add the appropriate sliders

            // mean slider
            var meanSlider = document.createElement("input");
            meanSlider.setAttribute("class", "mdl-slider mdl-js-slider");
            meanSlider.setAttribute("type", "range");
            meanSlider.setAttribute("name", "a");
            meanSlider.setAttribute("id", "slider2");
            meanSlider.setAttribute("min", "-3");
            meanSlider.setAttribute("max", "3");
            meanSlider.setAttribute("step", "0.05");

            // standard deviation slider
            var sdSlider = document.createElement("input");
            sdSlider.setAttribute("class", "mdl-slider mdl-js-slider");
            sdSlider.setAttribute("type", "range");
            sdSlider.setAttribute("id", "slider1");
            sdSlider.setAttribute("name", "b");
            sdSlider.setAttribute("min", "0.1");
            sdSlider.setAttribute("max", "3");
            sdSlider.setAttribute("step", "0.05");

            // create text displays for the parameters
            var sdTextP = document.createElement("p");
            sdTextP.setAttribute("id", "sdValDisplay")
            var sdLabel = document.createTextNode("Standard Deviation: ");
            sdTextP.appendChild(sdLabel);
            var meanTextP = document.createElement("p");
            meanTextP.setAttribute("id", "meanValDisplay")
            var meanLabel = document.createTextNode("Mean: ");
            meanTextP.appendChild(meanLabel);

            // create gaussian distribution graph
            var graphdiv = document.createElement("div");
            graphdiv.setAttribute("id", "graph");

            var cdfdiv = document.createElement("div");
            cdfdiv.setAttribute("id", "cdfgraph");

            var descriptionDiv = document.createElement("div");
            descriptionDiv.setAttribute("id", "distDescription")

            parent.appendChild(meanTextP);
            parent.appendChild(meanSlider);
            parent.appendChild(sdTextP);
            parent.appendChild(sdSlider);
            parent.appendChild(graphdiv);
            parent.appendChild(cdfdiv);
            parent.appendChild(descriptionDiv);
            componentHandler.upgradeDom();

            $(function() {

                var mean = $('input[name="a"]').val();
                var sd = $('input[name="b"]').val();


                var sdLabel = "Standard Deviation: " + sd;
                var meanLabel = "Mean: " + mean;
                document.getElementById("meanValDisplay").innerHTML = meanLabel;
                document.getElementById("sdValDisplay").innerHTML = sdLabel;

                $.getJSON('/_get_normal', {
                    a: $('input[name="a"]').val(),
                    b: $('input[name="b"]').val()
                }, function(data) {
                    updatePdf(data.result);
                    updateCdf(data.result);

                });

                $('#distDescription').load('/gauss_description');
                return false;
            });

            // bind slider inputs and update graph 
            // each time the sliders are moved
            $(function() {
                $('#slider1, #slider2').bind('input', function() {
                    var mean = $('input[name="a"]').val();
                    var sd = $('input[name="b"]').val();


                    var sdLabel = "Standard Deviation: " + sd;
                    var meanLabel = "Mean: " + mean;
                    document.getElementById("meanValDisplay").innerHTML = meanLabel;
                    document.getElementById("sdValDisplay").innerHTML = sdLabel;

                    $.getJSON('/_get_normal', {
                        a: $('input[name="a"]').val(),
                        b: $('input[name="b"]').val()
                    }, function(data) {
                        updatePdf(data.result);
                        updateCdf(data.result);
                    });
                    return false;
                });
            });
        }

        ///////////////////////////////////////////////////////////////////
        //////////////////////// BETA DISTIBUTION /////////////////////////
        ///////////////////////////////////////////////////////////////////
        if (e.target.id == 'beta') {
            // if gaussian is selected add the appropriate sliders
            var aSlider = document.createElement("input");
            aSlider.setAttribute("class", "mdl-slider mdl-js-slider");
            aSlider.setAttribute("type", "range");
            aSlider.setAttribute("name", "a");
            aSlider.setAttribute("id", "slider2");
            aSlider.setAttribute("min", "1");
            aSlider.setAttribute("max", "50");
            aSlider.setAttribute("step", "1");


            var bSlider = document.createElement("input");
            bSlider.setAttribute("class", "mdl-slider mdl-js-slider");
            bSlider.setAttribute("type", "range");
            bSlider.setAttribute("id", "slider1");
            bSlider.setAttribute("name", "b");
            bSlider.setAttribute("min", "1");
            bSlider.setAttribute("max", "50");
            bSlider.setAttribute("step", "1");


            var betaTextP = document.createElement("p");
            betaTextP.setAttribute("id", "betaValDisplay")
            var betaLabel = document.createTextNode("Beta: ");
            betaTextP.appendChild(betaLabel);
            var alphaTextP = document.createElement("p");
            alphaTextP.setAttribute("id", "alphaValDisplay")
            var alphaLabel = document.createTextNode("Alpha: ");
            alphaTextP.appendChild(alphaLabel);


            // create graph (pdf)
            var graphdiv = document.createElement("div");
            graphdiv.setAttribute("id", "graph");
            // create graph (cdf)
            var cdfdiv = document.createElement("div");
            cdfdiv.setAttribute("id", "cdfgraph");

            var descriptionDiv = document.createElement("div");
            descriptionDiv.setAttribute("id", "distDescription")

            parent.appendChild(alphaTextP);
            parent.appendChild(aSlider);
            parent.appendChild(betaTextP);
            parent.appendChild(bSlider);
            parent.appendChild(graphdiv);
            parent.appendChild(cdfdiv);
            parent.appendChild(descriptionDiv);
            componentHandler.upgradeDom();

            $(function() {
                var alpha = $('input[name="a"]').val();
                var beta = $('input[name="b"]').val();


                var betaLabel = "Beta: " + beta;
                var alphaLabel = "Alpha: " + alpha;
                document.getElementById("alphaValDisplay").innerHTML = alphaLabel;
                document.getElementById("betaValDisplay").innerHTML = betaLabel;

                $.getJSON('/_get_beta', {
                    a: $('input[name="a"]').val(),
                    b: $('input[name="b"]').val()
                }, function(data) {
                    updatePdf(data.result);
                    updateCdf(data.result);
                });
                
                //Find a way to load this using flask based on input from slider
                $('#distDescription').load('/beta_description');
                return false;
            });

            $(function() {
                $('#slider1, #slider2').bind('input', function() {

                    // set text values of the parameters
                    var alpha = $('input[name="a"]').val();
                    var beta = $('input[name="b"]').val();


                    var betaLabel = "Beta: " + beta;
                    var alphaLabel = "Alpha: " + alpha;
                    document.getElementById("alphaValDisplay").innerHTML = alphaLabel;
                    document.getElementById("betaValDisplay").innerHTML = betaLabel;

                    // update the distribution plot
                    $.getJSON('/_get_beta', {
                        a: $('input[name="a"]').val(),
                        b: $('input[name="b"]').val()
                    }, function(data) {
                        updatePdf(data.result);
                        updateCdf(data.result);
                    });
                    return false;
                });
            });
        }
        /////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////Exponential Distribution///////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        ////////////////////////////// ////////////////////////////
        ////////////////////////////////////////////////////////////////////

        if (e.target.id == 'exponential') {
            // if exponential is selected add the appropriate sliders

            // lambda slider
            var lambdaSlider = document.createElement("input");
            lambdaSlider.setAttribute("class", "mdl-slider mdl-js-slider");
            lambdaSlider.setAttribute("type", "range");
            lambdaSlider.setAttribute("name", "a");
            lambdaSlider.setAttribute("id", "slider1");
            lambdaSlider.setAttribute("min", "0");
            lambdaSlider.setAttribute("max", "5");
            lambdaSlider.setAttribute("step", "0.05");


            // create text displays for the parameters
            var lambdaTextP = document.createElement("p");
            lambdaTextP.setAttribute("id", "lambdaValDisplay")
            var lambdaLabel = document.createTextNode("lambda: ");
            lambdaTextP.appendChild(lambdaLabel);

            // create exponential distribution graph
            var graphdiv = document.createElement("div");
            graphdiv.setAttribute("id", "graph");

            var cdfdiv = document.createElement("div");
            cdfdiv.setAttribute("id", "cdfgraph");

            var descriptionDiv = document.createElement("div");
            descriptionDiv.setAttribute("id", "distDescription")

            parent.appendChild(lambdaTextP);
            parent.appendChild(lambdaSlider);
            parent.appendChild(graphdiv);
            parent.appendChild(cdfdiv);
            parent.appendChild(descriptionDiv);
            componentHandler.upgradeDom();

            $(function() {

                var lambda = $('input[name="a"]').val();
                var lambdaLabel = "lambda: " + lambda;
                document.getElementById("lambdaValDisplay").innerHTML = lambdaLabel;

                $.getJSON('/_get_exponential', {
                    a: $('input[name="a"]').val(),
                }, function(data) {
                    updatePdf(data.result);
                    updateCdf(data.result);
                });

                $('#distDescription').load('/exp_description');

                return false;
            });

            // bind slider inputs and update graph 
            // each time the sliders are moved
            $(function() {
                $('#slider1').bind('input', function() {
                    var lambda = $('input[name="a"]').val();
                    var lambdaLabel = "lambda: " + lambda;
                    document.getElementById("lambdaValDisplay").innerHTML = lambdaLabel;

                    $.getJSON('/_get_exponential', {
                        a: $('input[name="a"]').val()
                    }, function(data) {
                        updatePdf(data.result);
                        updateCdf(data.result);
                    });
                    return false;
                });
            });
        }






        /////////////////////////////////////////////////////////////////////////////////////


    });
}