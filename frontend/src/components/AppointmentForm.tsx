import React, { useState } from 'react';
import { AppointmentData } from '../types';

interface AppointmentFormProps {
  doctorId: string;
  onSuccess: () => void;
}

export default function AppointmentForm({ doctorId, onSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentData>({
    patientName: '',
    email: '',
    dateTime: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!formData.patientName.trim() || !formData.email.trim() || !formData.dateTime.trim()) {
      setError('Please fill all fields');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, doctorId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to book');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label className="block mb-1 font-semibold">Patient Name</label>
        <input
          type="text"
          value={formData.patientName}
          onChange={e => setFormData({ ...formData, patientName: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Date & Time</label>
        <input
          type="datetime-local"
          value={formData.dateTime}
          onChange={e => setFormData({ ...formData, dateTime: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
}

