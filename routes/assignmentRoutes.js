import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
import { assessToken } from '../services/auth.js';


const router = Router();


router.get('/v1/assignments', assessToken, assignmentController.getAllAssignments);
router.post('/v1/assignments', assessToken, assignmentController.createAssignment);
router.get('/v1/assignments/:id', assessToken, assignmentController.getAssignmentById);
router.delete('/v1/assignments/:id',assessToken,assignmentController.deleteAssignment);
router.put('/v1/assignments/:id', assessToken, assignmentController.updateAssignment);
router.patch('/v1/assignments',assignmentController.patchAssignment);
router.patch('/v1/assignments/:id',assignmentController.patchAssignment);
export default router;

