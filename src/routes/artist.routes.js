import express from 'express'
import { uploadMusic } from '../controllers/artist.controllers.js';

const router = express.Router();

router.post('/upload', uploadMusic)

export default router;