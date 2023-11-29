// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set region
// AWS.config.update({region: 'REGION'});

// // Create publish parameters
// var params = {
//   Message: 'MESSAGE_TEXT', /* required */
//   snsTopic: 'snsTopic'
// };

// // Create promise and SNS service object
// var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

// // Handle promise's fulfilled/rejected states
// publishTextPromise.then(
//   function(data) {
//     console.log(Message ${params.Message} sent to the topic ${params.TopicArn});
//     console.log("MessageID is " + data.MessageId);
//   }).catch(
//     function(err) {
//     console.error(err, err.stack);
//   });

  