import { where } from "sequelize";
import { Assignment } from "../models/assignment.js";
import { getCredentials } from "../services/auth.js";
import { User } from "../models/User.js";
import { Submission } from "../models/submission.js";
// import { SNS } from 'aws-sdk';

//import { findAssignment } from './assignmentService.js';

export const findAssignment = async (id) => {
  const assignment = await Assignment.findOne({ where: { id } });
  if (!assignment) {
    throw new Error("Assignment not found");
  }
  return assignment;
};


export const getAllAssignments = async (req, res) => {
  const assignments = await Assignment.findAll();

  return assignments;
};

export const createAssignment = async (assignmentData) => {
  console.log(assignmentData.createdBy);
  const assignment = await Assignment.create(assignmentData); //inbuilt method
  return assignment;
};

export const getAssignmentById = async (id) => {
  try {
    return await findAssignment(id);
  } catch (error) {
    throw new Error(error.message);
  }
};





//verifying the user for assignment deletion
export const deleteAssignmentById = async (id, email) => {
  try {
    const assignment = await findAssignment(id);

    if (email == assignment.createdBy) {
      await assignment.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
//verifying the user for updating the assignment
export const updateAssignmentById = async (id, assignmentData, email) => {
  try {
    const assignment = await findAssignment(id);
    assignment.name = assignmentData.name;
    assignment.points = assignmentData.points;
    assignment.num_of_attempts = assignmentData.num_of_attempts;
    assignment.deadline = assignmentData.deadline;
    assignment.assignment_updated = new Date().toISOString();

    if (email == assignment.createdBy) {
      await assignment.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// src/services/assignmentService.js
//import Assignment from '../models/Assignment'; 
// export const submitAssignment = async (assignmentId, userEmail, submissionData) => {
//   try {
//     // Validate if the assignment exists
//     const assignment = await findAssignment(assignmentId);

//     // Create a new submission
//     const submission = await Submission.create({
//       assignmentId:assignmentId,
//       su: submissionData.submissionUrl, // Assuming userId is part of the submission data
//       content: submissionData.content,
//       // Add other fields as needed
//     });

//     // Perform any additional actions or validations after submission creation

//     return submission;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// assignmentService.js



// const sns = new SNS();

// export const submitAssignment = async (assignment_id, submissionData) => {
//   try {
//     // Retrieve assignment from the database
//     const assignment = await Assignment.findOne({where :{assignment_id}});

//     if (!assignment) {  
//        throw new Error(`Assignment with ID ${assignment_id} not found.`);
//      }

    // // Check if the user has permission to submit the assignment
    // if (userEmail !== assignment.createdBy) {
    //   throw new Error('Forbidden');
    // }

    // // Check if the assignment's deadline has passed
    // const currentDate = new Date();
    // if (currentDate > assignment.deadline) {
    //   throw new Error('Submission rejected: Deadline has passed.');
    // }

    // // Check if the user has exceeded the allowed number of attempts
    // const userAttempts = await Submission.count({
    //   where: {
    //     assignmentId: assignment_id,
    //     userId: userEmail,
    //   },
    // });

    // if (userAttempts >= assignment.num_of_attempts) {
    //   throw new Error('Submission rejected: Exceeded number of attempts.');
    // }

    // // Create a new submission
    // const submissionmy = await Submission.create({
    //   assignmentId: assignment_id,
    //   //userId: userEmail,
    //   //content: submissionData.content,
    //   submissionUrl: submissionData.submission_url,
    // });

    // Post URL to the SNS topic
    // await sns.publish({
    //   TopicArn: 'YOUR_SNS_TOPIC_ARN', // Replace with your actual SNS topic ARN
    //   Subject: 'New Assignment Submission',
    //   Message: `User ${userEmail} has submitted an assignment. Submission URL: ${submissionData.submission_url}`,
    // }).promise();

  //   return {
  //     id: submissionmy.id,
  //     submissionUrl:submissionmy.submissionUrl,
  //     assignment_id: submissionmy.assignmentId,
  //   };
  // } catch (error) {
  //   throw error;
  // }
//};


export const createSubmission = async (assignment_id, submissionData) => {
  try {
    // Retrieve assignment from the database using findOne
    const assignment = await Assignment.findOne({ where: { id: assignment_id } });

    if (!assignment) {
      throw new Error(`Assignment with ID ${assignment_id} not found.`);
    }

    // Check if the assignment's deadline has passed
    const currentDate = new Date();
    if (currentDate > assignment.deadline) {
      throw new Error('Submission rejected: Deadline has passed.');
    }

    // Check if the user has exceeded the allowed number of attempts
    const userAttempts = await Submission.count({
      where: {
        assignmentId: assignment_id,
        // Assuming you have a userId associated with submissions
        // userId: userEmail,
      },
    });

    if (userAttempts >= assignment.num_of_attempts) {
      throw new Error('Submission rejected: Exceeded number of attempts.');
    }

    // Create a new submission
    const submission = await Submission.create({
      assignmentId: assignment_id,
      // Assuming you have a userId associated with submissions
      // userId: userEmail,
      // Add other fields as needed
      submissionUrl: submissionData.submission_url,
    });

    // Additional logic or validations after submission creation can be added here

    // Return the created submission
    return {
      id: submission.id,
      assignment_id: submission.assignmentId,
      submission_url: submission.submissionUrl,
      submission_date: submission.submissionDate,
      submission_updated: submission.submissionUpdated,
    };
  } catch (error) {
    throw error;
  }
};
