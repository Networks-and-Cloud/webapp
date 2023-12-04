import * as assignmentService from "../services/assignmentService.js";
import { getCredentials } from "../services/auth.js";
import logger from "../logger.js"
import StatsD from 'node-statsd';
import e from "express";
import { Assignment } from "../models/assignment.js";
import { Submission } from "../models/submission.js";
//import { submitAssignment } from "../services/assignmentService.js";
import AWS from 'aws-sdk';


const client = new StatsD({
  errorHandler: function (error) {
    console.error("StatsD error: ", error);
  }
});
export const getAllAssignments = async (req, res) => {
  try {
    
    const assignments = await assignmentService.getAllAssignments();

    logger.info('Get all assignments');
    client.increment('endpoint.get.assignments');
    res.status(200).json(assignments);
  } catch (error) {
    
    if (error.message === "Forbidden") {
      res.status(403).json({ error: "Forbidden" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createAssignment = async (req, res) => {
  const assignmentData = req.body;

  try {
    assignmentData.createdBy = getCredentials(req)[0];

    
    const assignment = await assignmentService.createAssignment(assignmentData);
    
    res.status(201).json(assignment);
    logger.info('Created assignment');
    client.increment('endpoint.post.assignments');
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};


export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const assignment = await assignmentService.getAssignmentById(id);

    if (!assignment) {
      
      res.status(404).json({ error: "Assignment cannot be found" });
      return;
    }

    res.status(200).json(assignment);
  } catch (error) {
    
    res.status(404).json({ error: error.message });
  }
};



AWS.config.update({ region: 'us-east-1' });
const sns = new AWS.SNS();

export const submitAssignment = async (req, res) => {
  const assignmentId = req.params.id; 
  console.log(assignmentId);

  const submissionData = req.body;
  console.log(submissionData);

  try {
    const userEmail = getCredentials(req)[0];
    const submission = await assignmentService.createSubmission(assignmentId, submissionData);

    // Log and respond with the created submission
    logger.info('Submitted assignment');
    res.status(201).json(submission);

    // Publish a message to SNS
    const params = {
      Message: JSON.stringify({ email: userEmail, submissionUrl: submission.submission_url, submissionId: submission.id }),
      TopicArn: process.env.snsTopic,
    };

    sns.publish(params, function (err, data) {
      if (err) {
        logger.warn(err, err.stack);
      } else {
        logger.info(`Message sent to SNS: ${data}`);
      }
    });
  } catch (error) {
    // Handle any errors that occur during the submission process
    console.error(error);

    // Return an appropriate error response
    if (error.message.includes('Submission rejected')) {
      res.status(400).json({ error: error.message });
    } else if (error.message.includes('Assignment with ID')) {
      res.status(404).json({ error: error.message });
    } else if (error.message === 'Forbidden') {
      res.status(403).json({ error: error.message });
    } else {
      res.status(502).json({ error: 'Internal Server Error' });
    }
  }
};




export const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  const email = getCredentials(req)[0];
  try {
    if (await assignmentService.deleteAssignmentById(id, email)) {
      res.status(204).send();
      logger.info('Assignment Deleted');
      client.increment('endpoint.delete.assignments');
    } else {
      res.status(403).send();
    }
    
  } catch (error) {

    res.status(404).json({ error: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const assignmentData = req.body;
  const email = getCredentials(req)[0];
  
  try {
    if (await assignmentService.updateAssignmentById(id, assignmentData,email)) {
      res.status(204).send();
      logger.info('Assignment updated');
      client.increment('endpoint.delete.assignments');
    } else {
      res.status(403).send();
    }
  } catch (error) {
    
    res.status(404).json({ error: error.message });
  }
};


export const patchAssignment = async (req, res) => {
  res.status(405).send();
}
