import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, X, Star, MapPin } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const ComparePage = () => {
  const { t } = useTranslation();
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSchools = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/schools?search=${encodeURIComponent(searchTerm)}&limit=5`);
      const data = await response.json();
      setSearchResults(data.schools || []);
    } catch (error) {
      console.error('Error searching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSchoolToCompare = (school) => {
    if (selectedSchools.length >= 3) {
      alert('You can compare maximum 3 schools at a time');
      return;
    }
    
    if (selectedSchools.find(s => s.id === school.id)) {
      alert('School already added for comparison');
      return;
    }
    
    setSelectedSchools([...selectedSchools, school]);
    setSearchResults([]);
    setSearchTerm('');
  };

  const removeSchoolFromCompare = (schoolId) => {
    setSelectedSchools(selectedSchools.filter(s => s.id !== schoolId));
  };

  const comparisonCategories = [
    { key: 'basic', label: 'Basic Information' },
    { key: 'fees', label: 'Fee Structure' },
    { key: 'facilities', label: 'Facilities' },
    { key: 'contact', label: 'Contact Information' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('navigation.compare')} Schools
          </h1>
          <p className="text-gray-600">
            Compare up to 3 schools side by side to make the best choice for your child.
          </p>
        </div>

        {/* Search Section */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Schools to Compare</h2>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search schools by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchSchools()}
                className="input-field"
              />
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg">
                  {searchResults.map((school) => (
                    <div
                      key={school.id}
                      onClick={() => addSchoolToCompare(school)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium">{school.name}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {school.location.city}, {school.location.state}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={searchSchools}
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading ? <LoadingSpinner size="sm" className="mr-2" /> : <Search size={20} className="mr-2" />}
              Search
            </button>
          </div>
        </div>

        {/* Selected Schools */}
        {selectedSchools.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">Selected Schools ({selectedSchools.length}/3)</h2>
            <div className="flex flex-wrap gap-3">
              {selectedSchools.map((school) => (
                <div key={school.id} className="flex items-center bg-primary-50 text-primary-700 px-3 py-2 rounded-full">
                  <span className="mr-2">{school.name}</span>
                  <button
                    onClick={() => removeSchoolFromCompare(school.id)}
                    className="text-primary-500 hover:text-primary-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedSchools.length >= 2 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 bg-gray-50 font-semibold text-gray-900 min-w-48">
                    Criteria
                  </th>
                  {selectedSchools.map((school) => (
                    <th key={school.id} className="text-left p-6 bg-gray-50 min-w-80">
                      <div className="font-semibold text-gray-900 mb-1">{school.name}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {school.location.city}, {school.location.state}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Basic Information */}
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">School Type</td>
                  {selectedSchools.map((school) => (
                    <td key={school.id} className="p-6">{school.type}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">Board</td>
                  {selectedSchools.map((school) => (
                    <td key={school.id} className="p-6">{school.board}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">Established</td>
                  {selectedSchools.map((school) => (
                    <td key={school.id} className="p-6">{school.established_year}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">Rating</td>
                  {selectedSchools.map((school) => (
                    <td key={school.id} className="p-6">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1" />
                        <span className="font-medium">{school.rating}</span>
                        <span className="text-gray-500 ml-1">({school.reviews_count})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Fee Structure */}
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">Annual Fee</td>
                  {selectedSchools.map((school) => (
                    <td key={school.id} className="p-6">
                      <span className="text-lg font-semibold text-primary-600">
                        ₹{school.fees.annual_fee.toLocaleString()}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">Admission Fee</td>
                  {selectedSchools.map((school) => (
                    <td key={school.id} className="p-6">
                      <span className="font-medium">
                        ₹{school.fees.admission_fee.toLocaleString()}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Facilities */}
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">Facilities</td>
                  {selectedSchools.map((school) => (
                    <td key={school.id} className="p-6">
                      <div className="space-y-1">
                        {school.facilities.slice(0, 5).map((facility, index) => (
                          <div key={index} className="text-sm">
                            • {facility}
                          </div>
                        ))}
                        {school.facilities.length > 5 && (
                          <div className="text-sm text-gray-500">
                            +{school.facilities.length - 5} more
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Contact */}
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">Website</td>
                  {selectedSchools.map((school) => (
                    <td key={school.id} className="p-6">
                      {school.website ? (
                        <a 
                          href={school.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      ) : (
                        <span className="text-gray-400">Not available</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Schools Selected for Comparison
            </h3>
            <p className="text-gray-600 mb-6">
              Search and add at least 2 schools to start comparing them side by side.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;