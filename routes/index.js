var express = require('express')
  , router = express.Router()
  , aws = require('aws-sdk')
  , _ = require('lodash')

var logger = require('morgan')

router.get('/', function(req, res) {
  res.render('index.html')
})

var AWS_ACCESS_KEY = 'AKIAJFZGP7MAIYHSHU7A'
var AWS_SECRET_KEY = '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'
var S3_BUCKET = 'loocho-test-bucket'

aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

router.get('/sign', function(req, res) {

  var s3 = new aws.S3()
  var options = {
    Bucket: S3_BUCKET,
    Key: 'images/mana/' + req.query.file_name,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  }

  s3.getSignedUrl('putObject', options, function(err, data){
    if(err) return res.send('Error with S3')

    res.json({
      signed_request: data,
      url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
    })

    console.log('File uploaded with success in https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name);
  })
})

router.get('/bucketList', function (req, res) {
  var s3 = new aws.S3();

  var params = {Bucket: 'loocho-test-bucket'}

  s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    var result = [];
    _.forEach(data.Contents, function (item) {
      var tabItem = item.Key.split('/');
      var name = tabItem[1] ? tabItem[1] : false;   
      if (name && name === 'mana' ) result.push(item.Key)
    })

    res.json({imageData: result});

  })

})

router.get('/deleteImage', function (req, res) {
  var s3 = new aws.S3();

  var params = {
    Bucket: 'loocho-test-bucket',
    Key: 'images/mana/saka.jpg'
  };

  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      console.log(data);
      res.json({msg: 'delete'});
    }    
  });

})

module.exports = router  