import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Eye, GitCompare } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const SchoolsPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    board: '',
    city: '',
    minFee: '',
    maxFee: ''
  });

  useEffect(() => {
    fetchSchools();
  }, [searchParams]);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.set('search', filters.search);
      if (filters.type) queryParams.set('school_type', filters.type);
      if (filters.board) queryParams.set('board', filters.board);
      if (filters.city) queryParams.set('city', filters.city);
      if (filters.minFee) queryParams.set('min_fee', filters.minFee);
      if (filters.maxFee) queryParams.set('max_fee', filters.maxFee);

      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/schools?${queryParams.toString()}`);
      const data = await response.json();
      setSchools(data.schools || []);
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('navigation.schools')}
          </h1>
          
          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-field"
              />
            </div>
            
            <div>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="input-field"
              >
                <option value="">{t('filters.schoolType')}</option>
                <option value="Day School">{t('categories.daySchool')}</option>
                <option value="Boarding School">{t('categories.boardingSchool')}</option>
                <option value="Play School">{t('categories.playSchool')}</option>
                <option value="PU College">{t('categories.puCollege')}</option>
              </select>
            </div>
            
            <div>
              <select
                value={filters.board}
                onChange={(e) => handleFilterChange('board', e.target.value)}
                className="input-field"
              >
                <option value="">{t('filters.board')}</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="IB">IB</option>
                <option value="State Board">State Board</option>
              </select>
            </div>
            
            <div>
              <input
                type="text"
                placeholder={t('filters.location')}
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="input-field"
              />
            </div>
            
            <div>
              <button
                onClick={applyFilters}
                className="btn-primary w-full"
              >
                <Search size={20} className="mr-2" />
                {t('common.search')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Found {schools.length} schools
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {schools.map((school) => (
                <div key={school.id} className="card hover:shadow-lg transition-all duration-300">
                  {school.images && school.images.length > 0 && (
                    <div className="relative mb-4">
                      <img 
                        src={school.images[0]} 
                        alt={school.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-medium">
                        {school.type}
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {school.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{school.location.city}, {school.location.state}</span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                      {school.board}
                    </span>
                    <span className="text-sm text-gray-600">
                      Est. {school.established_year}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {school.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{school.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({school.reviews_count})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">Annual Fee</span>
                      <div className="font-semibold text-primary-600">
                        ₹{school.fees.annual_fee.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/schools/${school.id}`}
                      className="flex-1 btn-primary text-center flex items-center justify-center"
                    >
                      <Eye size={16} className="mr-1" />
                      {t('school.viewDetails')}
                    </Link>
                    <button className="btn-secondary flex items-center">
                      <GitCompare size={16} className="mr-1" />
                      {t('school.compare')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {schools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No schools found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setFilters({
                      search: '', type: '', board: '', city: '', minFee: '', maxFee: ''
                    });
                    setSearchParams({});
                  }}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolsPage;