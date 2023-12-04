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





// const sns = new SNS();


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
     
      // userId: userEmail,
      // Add other fields as needed
      submissionUrl: submissionData.submission_url,
    });

    
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
