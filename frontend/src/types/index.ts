export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  available: boolean;
}

export interface AppointmentData {
  patientName: string;
  email: string;
  dateTime: string;
}

