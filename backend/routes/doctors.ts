import { Router } from 'express';
import doctors from '../data/doctors.json';

const router = Router();

router.get('/', (req, res) => {
  res.json(doctors);
});

router.get('/:id', (req, res) => {
  const doctor = (doctors as any[]).find(d => d.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  res.json(doctor);
});

export default router;

