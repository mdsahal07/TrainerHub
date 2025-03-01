import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainerProfile from '../components/TrainerProf.jsx';

const SearchPage = () => {

  const [filters, setFilters] = useState({ specialization: "", minRating: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    const fetchDefaultTrainers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:5000/search/top-trainers');
        setTrainers(res.data);
        console.log(res.data)
      } catch (err) {
        setError('Failed to fetch trainers');
      }
      setLoading(false);
    };

    fetchDefaultTrainers();
  }, []);

  useEffect(() => {
    const fetchFilteredTrainers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:5000/search/filter-trainers', { params: { ...filters, searchQuery } });
        console.log("trainer res data", res.data)
        setTrainers(res.data);
      } catch (err) {
        setError('Failed to fetch trainers');
      }
      setLoading(false);
    };

    if (filters.specialization || filters.minRating || searchQuery) {
      fetchFilteredTrainers();
    }
  }, [filters, searchQuery]);

  const handleTrainerClick = (trainer) => {
    setSelectedTrainer(trainer)
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="text-black py-4">
        <h1 className="text-center text-5xl font-bold">Find your trainer</h1>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            className="w-2/3 md:w-1/3 p-2 border text-black rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="container max-auto py-8 px-4">
        {/* Filter Section */}
        <section className="bg-white shadow-md rounded-md py-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="flex flex-wrap gap-4">
            {/* Dropdown for Specialization */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Specialization:</label>
              <select
                className="block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            </div>
            {/* Slider for Minimum Rating */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Min Rating:</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating || 0}
                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
              />
              <span className="text-sm text-gray-500">{filters.minRating || 0} ⭐</span>
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {filters.specialization || filters.minRating || searchQuery ? 'Filtered Trainers' : 'Top Rated Trainers'}
          </h2>
          {loading && <p className="text-blue-600">Loading...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainers.map((trainer) => (
              <div
                key={trainer._id}
                className="bg-white shadow-md rounded-md p-4 flex flex-col items-start"
                onClick={() => handleTrainerClick(trainer)}
              >
                <h3 className="font-semibold text-lg">{trainer.fname}</h3>
                <p className="text-gray-600">{trainer.specialization}</p>
                <p className="text-yellow-500">{trainer.rating} ⭐</p>
              </div>
            ))}
          </div>
        </section>
      </div >
      {selectedTrainer && (
        <TrainerProfile trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />
      )}
    </div >
  );
};

export default SearchPage;
