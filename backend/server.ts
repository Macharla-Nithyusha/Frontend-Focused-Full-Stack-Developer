import express from 'express';
import cors from 'cors';
import doctorsRouter from './routes/doctors';
import appointmentsRouter from './routes/appointments';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/doctors', doctorsRouter);
app.use('/api/appointments', appointmentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

