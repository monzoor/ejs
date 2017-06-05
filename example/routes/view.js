"use strict";
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var querystring = require('querystring');
var config = require('../config/pagesize');

/**
 * Builds the pagination link
 * @param request
 * @param page
 * @param totalPages
 * @return {*}
 */
function getPageLink(request, page, totalPages) {
  var currentUrl = request.url.split(/[?#]/)[0];
  var q = _.clone(request.query);
  q.page = page;
  if (page > 0 && page <= totalPages) {
    return currentUrl+'?' + querystring.stringify(q);
  }
  return null;
}

/**
 * @param request
 * @return {Number|number}
 */
function getCurrentPage(request) {
  return parseInt(request.query.page, 10) || 1;
}

// Home View
router.get('/', function (req, res, next) {
  res.render('view', {
    title: 'Upwork Task'
  });
});

/**
 * Route for the Obj List
 */
router.get('/:counter/:type', function (req, res, next) {
  var totalCounter = parseInt(req.params.counter),
      pageSize = config.pageSize,
      pageCount = Math.ceil(totalCounter/pageSize),
      currentPage = 1,
      prevCounter = 0,
      currentCounter = 1,
      err = false;

  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }

  // Set the loop counter vlue for template
  if( currentPage <= pageCount) {
    prevCounter = (currentPage-1)*3;
    currentCounter = currentPage*3;
    if (currentCounter > totalCounter ){
      currentCounter = totalCounter;
    }
  } else {
    err = true;
  }
  

  res.render('partials/obj3',{
    title: '',
    error: err,
    prevCounter: prevCounter,
    currentCounter: currentCounter,
    type: req.params.type,
    pages: {
      next: getPageLink(req, currentPage + 1, pageCount),
      prev: getPageLink(req, currentPage - 1, pageCount)
    },
  });
});


module.exports = router;
