import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Target, Users, Calendar, DollarSign, TrendingUp, Plus, Share2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const FundraisingPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('browse');
  const [loading, setLoading] = useState(false);

  // Mock fundraising campaigns
  const campaigns = [
    {
      id: '1',
      title: 'Digital Library for Rural School',
      description: 'Help us build a digital library with computers and internet access for students in remote villages.',
      school: 'Government Primary School, Rajasthan',
      organizer: 'Education for All Foundation',
      targetAmount: 500000,
      raisedAmount: 325000,
      donors: 156,
      daysLeft: 15,
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      story: 'Students in our rural school lack access to digital resources. With your help, we can bridge this digital divide.',
      updates: [
        { date: '2024-09-15', text: 'Received computers from first batch of donations!' },
        { date: '2024-09-10', text: 'Crossed 50% of our target amount!' }
      ]
    },
    {
      id: '2',
      title: 'Science Lab Equipment Fund',
      description: 'Raising funds to purchase modern science lab equipment for hands-on learning experiences.',
      school: 'Delhi Public School, Gurgaon',
      organizer: 'DPS Alumni Association',
      targetAmount: 750000,
      raisedAmount: 420000,
      donors: 89,
      daysLeft: 25,
      category: 'Equipment',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      story: 'Our students deserve modern science equipment to excel in STEM subjects and prepare for competitive exams.',
      updates: [
        { date: '2024-09-18', text: 'Ordered first set of microscopes!' },
        { date: '2024-09-12', text: 'Thank you for the overwhelming support!' }
      ]
    },
    {
      id: '3',
      title: 'Scholarship Fund for Underprivileged',
      description: 'Creating a scholarship fund to support bright students from economically weaker backgrounds.',
      school: 'Multiple Schools',
      organizer: 'Student Welfare Trust',
      targetAmount: 1000000,
      raisedAmount: 180000,
      donors: 234,
      daysLeft: 45,
      category: 'Scholarships',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044297?w=400',
      story: 'Education should not be limited by financial constraints. Help us support deserving students.',
      updates: [
        { date: '2024-09-16', text: 'Selected first 10 scholarship recipients!' },
        { date: '2024-09-08', text: 'Campaign launched successfully!' }
      ]
    },
    {
      id: '4',
      title: 'Playground Development Project',
      description: 'Building a safe and modern playground for primary school children to promote physical fitness.',
      school: 'Little Angels School, Bangalore',
      organizer: 'Parent Teacher Association',
      targetAmount: 300000,
      raisedAmount: 275000,
      donors: 78,
      daysLeft: 8,
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1544737151681-6e4ed999de18?w=400',
      story: 'Every child deserves a safe space to play and develop physical skills. Help us complete this playground.',
      updates: [
        { date: '2024-09-17', text: 'Construction has begun!' },
        { date: '2024-09-14', text: 'Almost reached our target!' }
      ]
    }
  ];

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    school: '',
    targetAmount: '',
    category: '',
    story: ''
  });

  const categories = ['Infrastructure', 'Equipment', 'Scholarships', 'Sports', 'Technology', 'Books', 'Other'];

  const getProgressPercentage = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  const handleDonate = (campaignId, amount) => {
    // In a real app, this would process the donation
    alert(`Thank you for your donation of ₹${amount}!`);
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Campaign created successfully! It will be reviewed and published soon.');
      setNewCampaign({
        title: '',
        description: '',
        school: '',
        targetAmount: '',
        category: '',
        story: ''
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('navigation.fundraising')} for Education
          </h1>
          <p className="text-gray-600 text-lg">
            Support educational initiatives and help make quality education accessible to all
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              ₹{campaigns.reduce((sum, c) => sum + c.raisedAmount, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Raised</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{campaigns.length}</div>
            <div className="text-gray-600">Active Campaigns</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {campaigns.reduce((sum, c) => sum + c.donors, 0)}
            </div>
            <div className="text-gray-600">Total Donors</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
            <div className="text-gray-600">Schools Helped</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-sm border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-4 px-6 font-medium border-b-2 ${
                activeTab === 'browse'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Browse Campaigns
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-6 font-medium border-b-2 ${
                activeTab === 'create'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Campaign
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-sm p-8">
          {activeTab === 'browse' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Active Fundraising Campaigns</h2>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {campaigns.map((campaign) => {
                  const progressPercentage = getProgressPercentage(campaign.raisedAmount, campaign.targetAmount);
                  
                  return (
                    <div key={campaign.id} className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                              {campaign.category}
                            </span>
                            <span className="text-sm text-gray-500">{campaign.daysLeft} days left</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {campaign.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{campaign.school}</p>
                          <p className="text-gray-500 text-xs">by {campaign.organizer}</p>
                        </div>
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          className="w-24 h-24 object-cover rounded-lg ml-4"
                        />
                      </div>

                      <p className="text-gray-600 mb-4">{campaign.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            ₹{campaign.raisedAmount.toLocaleString()} raised
                          </span>
                          <span className="text-sm text-gray-500">
                            {progressPercentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                          <span>Goal: ₹{campaign.targetAmount.toLocaleString()}</span>
                          <span>{campaign.donors} donors</span>
                        </div>
                      </div>

                      {/* Recent Updates */}
                      {campaign.updates.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Update:</h4>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">{campaign.updates[0].text}</p>
                            <p className="text-xs text-gray-500 mt-1">{campaign.updates[0].date}</p>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleDonate(campaign.id, 1000)}
                          className="flex-1 btn-primary flex items-center justify-center"
                        >
                          <Heart size={16} className="mr-2" />
                          Donate Now
                        </button>
                        <button className="btn-secondary flex items-center">
                          <Share2 size={16} className="mr-1" />
                          Share
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-semibold mb-6">Create New Fundraising Campaign</h2>
              
              <form onSubmit={handleCreateCampaign} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCampaign.title}
                      onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                      className="input-field"
                      placeholder="Enter campaign title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={newCampaign.category}
                      onChange={(e) => setNewCampaign({...newCampaign, category: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School/Institution *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCampaign.school}
                      onChange={(e) => setNewCampaign({...newCampaign, school: e.target.value})}
                      className="input-field"
                      placeholder="Enter school name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="10000"
                      value={newCampaign.targetAmount}
                      onChange={(e) => setNewCampaign({...newCampaign, targetAmount: e.target.value})}
                      className="input-field"
                      placeholder="Enter target amount"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                    className="input-field"
                    placeholder="Brief description of your campaign (max 200 characters)"
                    maxLength={200}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Story *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={newCampaign.story}
                    onChange={(e) => setNewCampaign({...newCampaign, story: e.target.value})}
                    className="input-field"
                    placeholder="Tell the story behind your campaign. Why is this important? How will the funds be used?"
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Plus size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Upload campaign images</p>
                  <p className="text-sm text-gray-500">Add photos that tell your story (optional)</p>
                  <button type="button" className="btn-secondary mt-4">
                    Choose Files
                  </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Important Guidelines:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• All campaigns are reviewed before going live</li>
                    <li>• Provide clear documentation for fund usage</li>
                    <li>• Regular updates to donors are encouraged</li>
                    <li>• Platform fee of 3% applies to successful campaigns</li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-lg font-semibold flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Creating Campaign...
                      </>
                    ) : (
                      'Create Campaign'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundraisingPage;