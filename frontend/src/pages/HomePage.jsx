import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Star, Users, BookOpen, Award, TrendingUp, Heart } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [featuredSchools, setFeaturedSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { key: 'daySchool', value: 'Day School', icon: BookOpen },
    { key: 'boardingSchool', value: 'Boarding School', icon: Users },
    { key: 'playSchool', value: 'Play School', icon: Heart },
    { key: 'puCollege', value: 'PU College', icon: Award },
  ];

  const features = [
    {
      title: "25,000+ Schools",
      description: "Comprehensive database of schools across India",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Expert Counselling",
      description: "Get personalized guidance from education experts",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Easy Loan Process",
      description: "Apply for education loans with minimal documentation",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Alumni Network",
      description: "Connect with successful alumni from your target schools",
      icon: Award,
      color: "text-orange-600"
    }
  ];

  useEffect(() => {
    // Simulate API call for featured schools
    setTimeout(() => {
      setFeaturedSchools([
        {
          id: '1',
          name: 'Delhi Public School',
          location: { city: 'Delhi', state: 'Delhi' },
          type: 'Day School',
          board: 'CBSE',
          rating: 4.5,
          fees: { annual_fee: 150000 },
          image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400'
        },
        {
          id: '2',
          name: 'Kendriya Vidyalaya',
          location: { city: 'Mumbai', state: 'Maharashtra' },
          type: 'Day School',
          board: 'CBSE',
          rating: 4.2,
          fees: { annual_fee: 25000 },
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
        },
        {
          id: '3',
          name: 'The Doon School',
          location: { city: 'Dehradun', state: 'Uttarakhand' },
          type: 'Boarding School',
          board: 'CBSE',
          rating: 4.8,
          fees: { annual_fee: 800000 },
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = () => {
    // Navigate to schools page with search params
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('type', selectedCategory);
    window.location.href = `/schools?${params.toString()}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="search-container py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  {t('hero.categorySelect')}
                </label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="">{t('hero.categorySelect')}</option>
                  {categories.map((category) => (
                    <option key={category.key} value={category.value}>
                      {t(`categories.${category.key}`)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="relative md:col-span-2">
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  {t('common.search')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('hero.searchPlaceholder')}
                    className="input-field pr-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button 
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleSearch}
              className="w-full btn-primary mt-6 py-4 text-lg font-semibold"
            >
              {t('common.search')} Schools
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.key}
                  to={`/schools?type=${category.value}`}
                  className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center group"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <IconComponent size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {t(`categories.${category.key}`)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Find the best {category.value.toLowerCase()}s near you
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose SchoolDekho?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`${feature.color} bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Schools
            </h2>
            <Link to="/schools" className="btn-primary">
              View All Schools
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSchools.map((school) => (
                <div key={school.id} className="card hover:shadow-lg transition-all duration-300">
                  <div className="relative mb-4">
                    <img 
                      src={school.image} 
                      alt={school.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-medium">
                      {school.type}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {school.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{school.location.city}, {school.location.state}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{school.rating}</span>
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
                      className="flex-1 btn-primary text-center"
                    >
                      View Details
                    </Link>
                    <button className="btn-secondary">
                      Compare
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Features Highlight */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              New Features Available
            </h2>
            <p className="text-xl text-blue-100">
              Discover additional services to support your education journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/loans" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
              <TrendingUp size={32} className="mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Education Loans</h3>
              <p className="text-blue-100 text-sm">Easy loan applications for any class</p>
            </Link>
            
            <Link to="/scholarships" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
              <Award size={32} className="mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Scholarships</h3>
              <p className="text-blue-100 text-sm">Find funding opportunities</p>
            </Link>
            
            <Link to="/alumni" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
              <Users size={32} className="mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Alumni Network</h3>
              <p className="text-blue-100 text-sm">Connect with school graduates</p>
            </Link>
            
            <Link to="/fundraising" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
              <Heart size={32} className="mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Fundraising</h3>
              <p className="text-blue-100 text-sm">Support education initiatives</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;