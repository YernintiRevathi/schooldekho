import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Calendar, DollarSign, Users, ExternalLink, Filter } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const ScholarshipsPage = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock scholarship data
  const scholarships = [
    {
      id: '1',
      title: 'Merit Scholarship for Brilliant Students',
      provider: 'SchoolDekho Foundation',
      amount: 50000,
      type: 'Merit-based',
      category: 'academic',
      eligibility: 'Students with 90%+ marks in previous class',
      deadline: '2024-12-31',
      description: 'Scholarship for academically excellent students to support their education journey.',
      applyUrl: 'https://example.com/apply',
      requirements: [
        'Previous year mark sheet with 90%+ marks',
        'Income certificate (family income < ₹5 lakhs)',
        'Recommendation letter from school',
        'Essay on future goals (500 words)'
      ]
    },
    {
      id: '2',
      title: 'Girl Child Education Support',
      provider: 'Women Empowerment Trust',
      amount: 75000,
      type: 'Need-based',
      category: 'gender',
      eligibility: 'Female students from economically weaker sections',
      deadline: '2025-01-15',
      description: 'Supporting girl child education to promote gender equality in education.',
      applyUrl: 'https://example.com/apply',
      requirements: [
        'Birth certificate',
        'Income certificate (family income < ₹3 lakhs)',
        'School enrollment certificate',
        'Bank account details'
      ]
    },
    {
      id: '3',
      title: 'Sports Excellence Scholarship',
      provider: 'National Sports Foundation',
      amount: 100000,
      type: 'Sports-based',
      category: 'sports',
      eligibility: 'Students excelling in state/national level sports',
      deadline: '2024-11-30',
      description: 'Scholarship for student athletes to balance academics and sports.',
      applyUrl: 'https://example.com/apply',
      requirements: [
        'Sports achievement certificates',
        'Medical fitness certificate',
        'School bonafide certificate',
        'Coach recommendation letter'
      ]
    },
    {
      id: '4',
      title: 'Minority Community Education Aid',
      provider: 'Minority Welfare Board',
      amount: 60000,
      type: 'Community-based',
      category: 'minority',
      eligibility: 'Students from minority communities',
      deadline: '2025-02-28',
      description: 'Educational support for students from minority communities.',
      applyUrl: 'https://example.com/apply',
      requirements: [
        'Community certificate',
        'Income certificate',
        'Academic transcripts',
        'Identity proof'
      ]
    },
    {
      id: '5',
      title: 'Rural Area Student Support',
      provider: 'Rural Development Ministry',
      amount: 40000,
      type: 'Location-based',
      category: 'rural',
      eligibility: 'Students from rural areas pursuing education in cities',
      deadline: '2024-12-15',
      description: 'Supporting rural students to access quality education in urban areas.',
      applyUrl: 'https://example.com/apply',
      requirements: [
        'Rural area residence proof',
        'School admission letter',
        'Income certificate',
        'Migration certificate'
      ]
    }
  ];

  const categories = [
    { key: 'all', label: 'All Scholarships', icon: Award },
    { key: 'academic', label: 'Merit-based', icon: Award },
    { key: 'gender', label: 'Girl Child', icon: Users },
    { key: 'sports', label: 'Sports', icon: Award },
    { key: 'minority', label: 'Minority', icon: Users },
    { key: 'rural', label: 'Rural', icon: Users }
  ];

  const filteredScholarships = activeCategory === 'all' 
    ? scholarships 
    : scholarships.filter(s => s.category === activeCategory);

  const getDeadlineStatus = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'expired', text: 'Expired', color: 'text-red-600' };
    if (diffDays <= 7) return { status: 'urgent', text: `${diffDays} days left`, color: 'text-orange-600' };
    return { status: 'active', text: `${diffDays} days left`, color: 'text-green-600' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('navigation.scholarships')}
          </h1>
          <p className="text-gray-600 text-lg">
            Discover scholarship opportunities to fund your child's education
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">{scholarships.length}</div>
            <div className="text-gray-600">Available Scholarships</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₹3.25L</div>
            <div className="text-gray-600">Total Worth Available</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-gray-600">Active Deadlines</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-gray-600">Students Helped</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeCategory === category.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scholarships Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredScholarships.map((scholarship) => {
              const deadlineInfo = getDeadlineStatus(scholarship.deadline);
              
              return (
                <div key={scholarship.id} className="card hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {scholarship.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{scholarship.provider}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        ₹{scholarship.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">{scholarship.type}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{scholarship.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <Users size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">Eligibility: </span>
                      <span className="ml-1">{scholarship.eligibility}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">Deadline: </span>
                      <span className={`ml-1 font-medium ${deadlineInfo.color}`}>
                        {new Date(scholarship.deadline).toLocaleDateString()} ({deadlineInfo.text})
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Required Documents:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {scholarship.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                      {scholarship.requirements.length > 3 && (
                        <li className="text-primary-600 text-sm">
                          +{scholarship.requirements.length - 3} more requirements
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={scholarship.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-center flex items-center justify-center"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Apply Now
                    </a>
                    <button className="btn-secondary">
                      View Details
                    </button>
                  </div>

                  {deadlineInfo.status === 'urgent' && (
                    <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center text-orange-800 text-sm">
                        <Calendar size={16} className="mr-2" />
                        <span className="font-medium">Urgent: Deadline approaching soon!</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {filteredScholarships.length === 0 && (
          <div className="card text-center py-12">
            <div className="text-gray-400 mb-4">
              <Award size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Scholarships Found
            </h3>
            <p className="text-gray-600 mb-6">
              No scholarships available in the selected category at the moment.
            </p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="btn-primary"
            >
              View All Scholarships
            </button>
          </div>
        )}

        {/* Application Tips */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold mb-4">Scholarship Application Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Before Applying:</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Read all eligibility criteria carefully</li>
                <li>• Gather all required documents beforehand</li>
                <li>• Check application deadlines multiple times</li>
                <li>• Prepare essays or personal statements if required</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Application Best Practices:</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Submit applications well before deadlines</li>
                <li>• Double-check all information for accuracy</li>
                <li>• Keep copies of all submitted documents</li>
                <li>• Follow up on application status if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsPage;