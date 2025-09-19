import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, MapPin, Briefcase, Calendar, MessageCircle, Search, Filter } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const AlumniPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock alumni data
  const alumni = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      school: 'Delhi Public School, R.K. Puram',
      graduationYear: 2015,
      currentPosition: 'Software Engineer',
      company: 'Google India',
      location: 'Bangalore, Karnataka',
      expertise: ['Software Development', 'Machine Learning', 'Career Guidance'],
      bio: 'Passionate software engineer with 8+ years of experience in tech. Happy to mentor students interested in computer science.',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      linkedIn: 'https://linkedin.com/in/rajeshkumar',
      availability: 'Available for mentoring'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      school: 'Kendriya Vidyalaya No. 1, Mumbai',
      graduationYear: 2012,
      currentPosition: 'Medical Doctor',
      company: 'Apollo Hospitals',
      location: 'Mumbai, Maharashtra',
      expertise: ['Medical Career', 'NEET Preparation', 'Healthcare'],
      bio: 'Practicing physician specializing in internal medicine. Can guide students interested in medical careers.',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150',
      linkedIn: 'https://linkedin.com/in/priyasharma',
      availability: 'Limited availability'
    },
    {
      id: '3',
      name: 'Arjun Patel',
      school: 'The Doon School',
      graduationYear: 2010,
      currentPosition: 'Investment Banker',
      company: 'Goldman Sachs',
      location: 'Mumbai, Maharashtra',
      expertise: ['Finance', 'Investment Banking', 'MBA Guidance'],
      bio: 'Investment banker with experience in corporate finance and strategy. Available for career guidance in finance.',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      linkedIn: 'https://linkedin.com/in/arjunpatel',
      availability: 'Available for mentoring'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      school: 'DAV Public School',
      graduationYear: 2014,
      currentPosition: 'Data Scientist',
      company: 'Microsoft',
      location: 'Hyderabad, Telangana',
      expertise: ['Data Science', 'Analytics', 'Tech Career'],
      bio: 'Data scientist working on AI/ML projects. Passionate about helping students enter the tech industry.',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      linkedIn: 'https://linkedin.com/in/snehareddy',
      availability: 'Available for mentoring'
    },
    {
      id: '5',
      name: 'Karan Singh',
      school: 'Christ Junior College',
      graduationYear: 2016,
      currentPosition: 'Entrepreneur',
      company: 'TechStart Solutions (Founder)',
      location: 'Bangalore, Karnataka',
      expertise: ['Entrepreneurship', 'Startup Guidance', 'Business Strategy'],
      bio: 'Serial entrepreneur with 2 successful startups. Happy to guide aspiring entrepreneurs and business students.',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      linkedIn: 'https://linkedin.com/in/karansingh',
      availability: 'Available for mentoring'
    }
  ];

  const schools = [...new Set(alumni.map(a => a.school))];
  const years = [...new Set(alumni.map(a => a.graduationYear))].sort((a, b) => b - a);

  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = !searchTerm || 
      alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSchool = !selectedSchool || alumnus.school === selectedSchool;
    const matchesYear = !selectedYear || alumnus.graduationYear.toString() === selectedYear;
    
    return matchesSearch && matchesSchool && matchesYear;
  });

  const handleConnect = (alumniId) => {
    // In a real app, this would send a connection request
    alert('Connection request sent! The alumni will be notified.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('navigation.alumni')} Network
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with successful alumni from various schools for mentorship and career guidance
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">{alumni.length}</div>
            <div className="text-gray-600">Alumni Available</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{schools.length}</div>
            <div className="text-gray-600">Schools Represented</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {alumni.filter(a => a.availability === 'Available for mentoring').length}
            </div>
            <div className="text-gray-600">Available Mentors</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Career Fields</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Find Alumni</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, company, or profession..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            <div>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="input-field"
              >
                <option value="">All Schools</option>
                {schools.map((school) => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-field"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Alumni Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumnus) => (
              <div key={alumnus.id} className="card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src={alumnus.profileImage}
                    alt={alumnus.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{alumnus.name}</h3>
                    <p className="text-sm text-gray-600">{alumnus.currentPosition}</p>
                    <p className="text-sm text-primary-600 font-medium">{alumnus.company}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>Class of {alumnus.graduationYear}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{alumnus.location}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">School:</span> {alumnus.school}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {alumnus.bio}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {alumnus.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    alumnus.availability === 'Available for mentoring'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alumnus.availability}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleConnect(alumnus.id)}
                    disabled={alumnus.availability === 'Limited availability'}
                    className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors ${
                      alumnus.availability === 'Available for mentoring'
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Connect
                  </button>
                  
                  <a
                    href={alumnus.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredAlumni.length === 0 && (
          <div className="card text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Alumni Found
            </h3>
            <p className="text-gray-600 mb-6">
              No alumni match your search criteria. Try adjusting your filters.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSchool('');
                setSelectedYear('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Join Alumni Network CTA */}
        <div className="card mt-8 text-center bg-gradient-to-r from-primary-50 to-blue-50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Are you an Alumni?
          </h2>
          <p className="text-gray-600 mb-6">
            Join our alumni network and help guide the next generation of students from your school.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
            <button className="btn-primary">
              Join Alumni Network
            </button>
            <button className="btn-secondary">
              Update Your Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;