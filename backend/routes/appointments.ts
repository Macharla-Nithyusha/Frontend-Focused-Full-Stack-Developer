import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { patientName, email, doctorId, dateTime } = req.body;

  if (!patientName || !email || !doctorId || !dateTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Here, normally, save appointment to DB
  console.log('New appointment booked:', { patientName, email, doctorId, dateTime });

  return res.status(200).json({ message: 'Appointment confirmed' });
});

export default router;

