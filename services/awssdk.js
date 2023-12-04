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

const AWS = require('aws-sdk');

// Set the AWS credentials and region
AWS.config.update({
  accessKeyId: 'AKIAZSFZJIBFHXC63VCV',
  secretAccessKey: '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',
  region: 'us-east-1', 
});

// Create a new instance of the SNS class
const sns = new AWS.SNS();


const topicArn = 'arn:aws:sns:us-east-1:6575-1857-5690:my-sns-topic-9aa8905';

const userEmail = 'kale.v@northeastern.edu';

// Define the message to be published
const message = {
    email: userEmail,
    content: 'This is a sample message.',
  };

// Set additional message attributes if needed
const messageAttributes = {
  attribute1: 'value1',
  attribute2: 'value2',
  
};

// Prepare the parameters for the publish operation
const params = {
  Message: message,
  TopicArn: topicArn,
  MessageAttributes: messageAttributes,
};

// Publish the message to the SNS topic
sns.publish(params, (err, data) => {
  if (err) {
    console.error('Error publishing message to SNS:', err);
  } else {
    console.log('Message published successfully:', data);
  }
});

