import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Doctor } from '../types';
import AppointmentForm from '../components/AppointmentForm';

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/doctors/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Doctor not found');
        return res.json();
      })
      .then((data: Doctor) => setDoctor(data))
      .catch(() => setDoctor(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center">Loading doctor details...</p>;
  }

  if (!doctor) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Doctor not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Back to list
        </Link>
      </div>
    );
  }

  if (booked) {
    return (
      <div className="p-6 max-w-md mx-auto text-center border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Appointment Confirmed!</h2>
        <p>Thank you for booking with {doctor.name}.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        &larr; Back to doctors
      </Link>
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{doctor.name}</h1>
          <p className="text-lg text-gray-700">{doctor.specialization}</p>
          <p
            className={`mt-1 font-semibold ${
              doctor.available ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {doctor.available ? 'Available' : 'Unavailable'}
          </p>
        </div>
      </div>
      {doctor.available ? (
        <AppointmentForm doctorId={doctor.id} onSuccess={() => setBooked(true)} />
      ) : (
        <p className="text-center text-red-600 font-semibold">
          Doctor is currently unavailable for booking.
        </p>
      )}
    </div>
  );
}

