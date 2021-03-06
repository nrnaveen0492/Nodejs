var lodash = require('lodash');
var db = require('../config/sequelize');

exports.getPages = function(req, res) {
      limit = 10;
      page = req.param('page') || 0;
      offset = page * limit;
      db.page.count().success(function(count) {
           var page_count = Math.ceil(count/limit) || 1;
           pages = lodash.range(page_count);
           db.page.findAll({
                limit: limit,
                offset: offset,
           }).success(function(rows) {
                return res.render('admin/view/pages/pages.html',{ rows: rows, pages: pages, current_page: parseInt(page),total: page_count, });
           }).error(function(err) {
                return res.render('admin/view/pages/pages.html',{ rows: []});
           });
      }).error(function(err) {
           return res.render('admin/view/pages/pages.html',{ rows: []});
      });
};