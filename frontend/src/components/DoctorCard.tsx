import React from 'react';
import { Doctor } from '../types';
import { Link } from 'react-router-dom';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link
      to={`/doctor/${doctor.id}`}
      className="flex items-center space-x-4 border rounded p-4 hover:shadow-md transition"
    >
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold">{doctor.name}</h3>
        <p className="text-sm text-gray-600">{doctor.specialization}</p>
        <p
          className={`text-sm font-medium ${
            doctor.available ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {doctor.available ? 'Available' : 'Unavailable'}
        </p>
      </div>
    </Link>
  );
}

