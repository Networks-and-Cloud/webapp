// import { where } from "sequelize";
// import { Assignment } from "../models/assignment.js";
// import { getCredentials } from "../services/auth.js";
// import { User } from "../models/User.js";
// import { Submission } from "../models/submission.js";

// import { findAssignment } from "./assignmentService.js";

// export const submitAssignment = async (assignmentId, submissionData) => {
//   try {
//     // Validate if the assignment exists
//     const assignment = await findAssignment(assignmentId);

//     // Perform additional validation or business logic as needed

//     // Create a new submission
//     const submission = await Submission.create({
//       assignmentId,
//       userId: submissionData.userId, // Assuming userId is part of the submission data
//       content: submissionData.content,
//       // Add other fields as needed
//     });

//     // Perform any additional actions or validations after submission creation

//     return submission;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };





// // Other submission-related functions can be added here based on your requirements
