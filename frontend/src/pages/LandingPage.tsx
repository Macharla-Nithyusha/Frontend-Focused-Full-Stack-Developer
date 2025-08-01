import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';
import { Doctor } from '../types';

export default function LandingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then((data: Doctor[]) => setDoctors(data))
      .catch(() => setDoctors([]));
  }, []);

  const filteredDoctors = doctors.filter(
    d =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialization.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Healthcare Appointment Booking</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="mt-6 space-y-4">
        {filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-600">No doctors found.</p>
        ) : (
          filteredDoctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)
        )}
      </div>
    </div>
  );
}

