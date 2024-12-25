import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [filters, setFilters] = useState({ specialization: "", minRating: "", maxPrice: "", minPrice: "" });
  const [trainers, setTrainers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDefaultTrainers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:5000/trainers/top-trainers');
        setTrainers(res.data); // Update the trainers list with top-rated trainers
      } catch (err) {
        setError('Failed to fetch trainers'); // Handle errors appropriately
      }
      setLoading(false);
    };

    fetchDefaultTrainers(); // Fetch data when the component mounts
  }, []);

  useEffect(() => {
    if (filters.specialization || filters.minRating || filters.minPrice || filters.maxPrice) {
      const fetchFilteredTrainers = async () => {
        setLoading(true);
        setError('');
        try {
          const res = await axios.get('http://localhost:5000/trainers/search', { params: filters });
          setTrainers(res.data);
        } catch (err) {
          setError('Failed to fetch trainers');
        }
        setLoading(false);
      };

      fetchFilteredTrainers();
    }
  }, [filters]); // Runs whenever filters change
  return (

    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-2xl font-bold">Find your trainer</h1>
      </header>

      <div className="container max-auto py-8 px-4">
        {/* FilterSection */}
        <section className="bg-white shadow-md rounded-md py-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Dropdown for Specialization */}
            <label className="block font-medium text-gray-700">
              Specialization:
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={filters.specialization}
                onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
              >
                <option value="">All</option>
                <option value="Yoga">Yoga</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Athlete">Athlete</option>
                <option value="Bodybuilding">Bodybuilding</option>
                <option value="Calisthenics">Calisthenics</option>
              </select>
            </label>
          </div>
          {/* Slider for Minimum Rating */}
          <div>
            <label className="block font-medium text-gray-700">
              Min Rating:
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating || 0}
                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
              />
              <span className="text-sm text-gray-500">{filters.minRating || 0} ⭐</span>
            </label>
          </div>
          {/* Sliders for Price Range */}
          <div>
            <label className="block font-medium text-gray-700">
              Min Price:
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={filters.minPrice || 0}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                style={{ marginLeft: '10px', marginRight: '20px' }}
              />
              <span className="text-sm text-gray-500">${filters.minPrice || 0}</span>
            </label>

            <label className="block font-medium text-gray-700">
              Max Price:
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={filters.maxPrice || 500}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                style={{ marginLeft: '10px', marginRight: '20px' }}
              />
              <span className="text-sm text-gray-500">${filters.maxPrice || 500}</span>
            </label>
          </div>
        </section>

        {/*Leaderboard section*/}
        <section>
          <h2>Top Rated Trainers</h2>
          <div>
            {leaderboard.map((trainers) => (
              <div
                key={trainers._id}
                className="bg-white shadow-md rounded-md p-4 flex items-center space-x-4"
              >
                <div className="bg-blue-100 p-4 rounded-full">
                  <span className="text-blue-600 font-bold text-xl">{trainers.rating}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{trainers.name}</h3>
                  <p className="text-gray-600">{trainers.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/*Filtered trainers section*/}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trainers</h2>
          {loading && <p className="text-blue-600">Loading...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainers.map((trainers) => (
              <div
                key={trainers._id}
                className="bg-white shadow-md rounded-md p-4 flex flex-col item-start">
                <h3>{trainers.name}</h3>
                <p>{trainers.specialization}</p>
                <p>{trainers.rating}⭐</p>
                <p>{trainers.price}$</p>
              </div>
            ))};
          </div>
        </section>
      </div>
    </div>

  );
}
export default SearchPage;
