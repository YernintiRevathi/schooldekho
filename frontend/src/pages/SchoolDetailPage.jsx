import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Star, Phone, Mail, Globe, Calendar, Users, BookOpen, Award } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const SchoolDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchSchoolDetails();
  }, [id]);

  const fetchSchoolDetails = async () => {
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/schools/${id}`);
      const data = await response.json();
      setSchool(data);
    } catch (error) {
      console.error('Error fetching school details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">School not found</h2>
          <Link to="/schools" className="btn-primary">
            Back to Schools
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BookOpen },
    { key: 'admission', label: 'Admission', icon: Calendar },
    { key: 'facilities', label: 'Facilities', icon: Award },
    { key: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                  {school.type}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {school.name}
              </h1>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={20} className="mr-2" />
                  <span>{school.location.city}, {school.location.state}</span>
                </div>
                
                <div className="flex items-center">
                  <Star size={20} className="text-yellow-500 mr-1" />
                  <span className="font-medium">{school.rating}</span>
                  <span className="text-gray-500 ml-1">({school.reviews_count} reviews)</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {school.description}
              </p>
            </div>
            
            <div className="space-y-4">
              {school.images && school.images.length > 0 && (
                <img 
                  src={school.images[0]} 
                  alt={school.name}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              )}
              
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Board:</span>
                    <span className="font-medium">{school.board}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Established:</span>
                    <span className="font-medium">{school.established_year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Fee:</span>
                    <span className="font-semibold text-primary-600">
                      ₹{school.fees.annual_fee.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Link to={`/loans?school=${school.id}`} className="btn-primary w-full">
                    Apply for Loan
                  </Link>
                  <button className="btn-secondary w-full">
                    Add to Compare
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">About the School</h3>
              <p className="text-gray-600 leading-relaxed">
                {school.description}
              </p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{school.established_year}</div>
                  <div className="text-sm text-gray-600">Established</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{school.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Fee Structure</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Annual Fee</span>
                  <span className="text-lg font-bold text-primary-600">
                    ₹{school.fees.annual_fee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Admission Fee</span>
                  <span className="text-lg font-bold text-primary-600">
                    ₹{school.fees.admission_fee.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admission' && (
          <div className="card max-w-4xl">
            <h3 className="text-xl font-semibold mb-6">Admission Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Important Dates</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Admission Start:</span>
                    <span className="font-medium">{school.admission_info.admission_start}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Admission End:</span>
                    <span className="font-medium">{school.admission_info.admission_end}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Eligibility</h4>
                <p className="text-gray-600">{school.admission_info.age_criteria}</p>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-3">Required Documents</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {school.admission_info.documents_required.map((doc, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="card max-w-4xl">
            <h3 className="text-xl font-semibold mb-6">School Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {school.facilities.map((facility, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Award size={16} className="text-primary-600 mr-3" />
                  <span className="text-gray-700">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="card max-w-4xl">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone size={20} className="text-primary-600 mr-4" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">{school.contact.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail size={20} className="text-primary-600 mr-4" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">{school.contact.email}</div>
                  </div>
                </div>
                
                {school.contact.website && (
                  <div className="flex items-center">
                    <Globe size={20} className="text-primary-600 mr-4" />
                    <div>
                      <div className="font-medium">Website</div>
                      <a 
                        href={school.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        {school.contact.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex items-start">
                  <MapPin size={20} className="text-primary-600 mr-4 mt-1" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-600">
                      {school.location.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDetailPage;