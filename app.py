# In this example we are going to create a simple HTML
# page with 2 input fields (numbers), and a link.
# Using jQuery we are going to send the content of both
# fields to a route on our application, which will
# sum up both numbers and return the result.
# Again using jQuery we'l show the result on the page


# We'll render HTML templates and access data sent by GET
# using the request object from flask. jsonigy is required
# to send JSON as a response of a request
from flask import Flask, render_template, request, jsonify, url_for
import scipy.stats as st
import json
import numpy as np
import collections
# Initialize the Flask application
app = Flask(__name__)


# This route will show a form to perform an AJAX request
# jQuery is loaded to execute the request and update the
# value of the operation
@app.route('/')
def index():
    return render_template('index.html')

# Route that will process the AJAX request, sum up two
# integer numbers (defaulted to zero) and return the
# result as a proper JSON response (Content-Type, etc.)
@app.route('/_get_normal')
def generate_norm():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    # generate pdf and return json results
    thetas = np.linspace(-10, 10, 200)
    prior = st.norm(a, b)
    ydat = prior.pdf(thetas)
    ycdf = prior.cdf(thetas)
    validIndex = ~np.isinf(ydat)
    d = collections.OrderedDict()
    d['x'] = list(thetas[validIndex])
    d['y'] = list(ydat[validIndex])
    d['cdf'] = list(ycdf[validIndex])
    return jsonify(result = d)
    #return jsonify(result=a + b)


@app.route('/_get_beta')
def generate_beta():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    # generate pdf and return json results
    thetas = np.linspace(0, 1, 200)
    prior = st.beta(a, b)
    ydat = prior.pdf(thetas)
    ycdf = prior.cdf(thetas)
    validIndex = ~np.isinf(ydat)
    d = collections.OrderedDict()
    d['x'] = list(thetas[validIndex])
    d['y'] = list(ydat[validIndex])
    d['cdf'] = list(ycdf[validIndex])
    return jsonify(result=d)
    #return jsonify(result=a + b)

@app.route('/_get_exponential')
def generate_exp():
    a = request.args.get('a', 0, type=float)
    # generate pdf and return json results
    thetas = np.linspace(0, 5, 200)
    # expon is a standardized version of exponential dist
    # set scale to 1/lambda for non-scaled version
    prior = st.expon(scale= (1/a))
    ydat = prior.pdf(thetas)
    ycdf = prior.cdf(thetas)
    validIndex = ~np.isinf(ydat)
    d = collections.OrderedDict()
    d['x'] = list(thetas[validIndex])
    d['y'] = list(ydat[validIndex])
    d['cdf'] = list(ycdf[validIndex])
    return jsonify(result = d)

@app.route('/beta_description')
def beta_description():
    return render_template('Beta.html')

@app.route('/gauss_description')
def gauss_description():
    return render_template('Gaussian.html')

@app.route('/exp_description')
def exp_description():
    return render_template('Exponential.html')


if __name__ == '__main__':
    app.run(
        debug=True
    )



# @app.route('/_get_exponential')
# def generate_exp():
#     a = request.args.get('a', 0, type=float)
#     # generate pdf and return json results
#     thetas = np.linspace(0, 5, 200)
#     # expon is a standardized version of exponential dist
#     # set scale to 1/lambda for non-scaled version
#     prior = st.expon(scale= (1/a))
#     prior.pdf(thetas)
#     return jsonify(result =list(prior.pdf(thetas)))

# @app.route('/_get_normal')
# def generate_norm():
#     a = request.args.get('a', 0, type=float)
#     b = request.args.get('b', 0, type=float)
#     # generate pdf and return json results
#     thetas = np.linspace(-10, 10, 200)
#     prior = st.norm(a, b)
#     prior.pdf(thetas)
#     return jsonify(result =list(prior.pdf(thetas)))
#     #return jsonify(result=a + b)


# @app.route('/_get_beta')
# def generate_beta():
#     a = request.args.get('a', 0, type=float)
#     b = request.args.get('b', 0, type=float)
#     # generate pdf and return json results
#     thetas = np.linspace(0, 1, 200)
#     prior = st.beta(a, b)
#     prior.pdf(thetas)
#     return jsonify(result =list(prior.pdf(thetas)))
#     #return jsonify(result=a + b)
