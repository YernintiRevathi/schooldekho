import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { DollarSign, FileText, CheckCircle, Clock, XCircle, Upload } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const LoansPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('apply');
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  
  const [formData, setFormData] = useState({
    student_name: '',
    student_age: '',
    class_applying_for: '',
    school_id: searchParams.get('school') || '',
    loan_amount: '',
    family_income: '',
    documents: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/loans/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_id: 'temp-user-id', // In real app, get from auth context
        }),
      });

      if (response.ok) {
        alert('Loan application submitted successfully!');
        setFormData({
          student_name: '',
          student_age: '',
          class_applying_for: '',
          school_id: '',
          loan_amount: '',
          family_income: '',
          documents: []
        });
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting loan application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loanFeatures = [
    {
      icon: DollarSign,
      title: 'Flexible Loan Amounts',
      description: 'From ₹50,000 to ₹50 lakhs based on your needs'
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Get approval within 3-5 working days'
    },
    {
      icon: FileText,
      title: 'Minimal Documentation',
      description: 'Simple documentation process with digital uploads'
    },
    {
      icon: CheckCircle,
      title: 'Competitive Rates',
      description: 'Starting from 8.5% per annum with flexible tenure'
    }
  ];

  const eligibilityCriteria = [
    'Student age: 16-35 years',
    'Indian citizen with valid documents',
    'Admission confirmed in recognized institution',
    'Co-applicant (parent/guardian) with steady income',
    'Family income: Minimum ₹2 lakhs per annum',
    'Good credit score (preferred but not mandatory)'
  ];

  const requiredDocuments = [
    'Admission confirmation letter',
    'Fee structure from school',
    'Income proof of co-applicant',
    'Bank statements (last 6 months)',
    'Identity proof (Aadhar, PAN)',
    'Address proof',
    'Academic records',
    'Passport size photographs'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('navigation.loans')}
          </h1>
          <p className="text-gray-600 text-lg">
            Get financial support for your child's education with our easy loan process
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loanFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="card text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent size={32} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-sm border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('apply')}
              className={`py-4 px-6 font-medium border-b-2 ${
                activeTab === 'apply'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Apply for Loan
            </button>
            <button
              onClick={() => setActiveTab('eligibility')}
              className={`py-4 px-6 font-medium border-b-2 ${
                activeTab === 'eligibility'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Eligibility & Documents
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`py-4 px-6 font-medium border-b-2 ${
                activeTab === 'status'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Application Status
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-sm p-8">
          {activeTab === 'apply' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-semibold mb-6">Education Loan Application</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.student_name}
                      onChange={(e) => handleInputChange('student_name', e.target.value)}
                      className="input-field"
                      placeholder="Enter student's full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Age *
                    </label>
                    <input
                      type="number"
                      required
                      min="3"
                      max="35"
                      value={formData.student_age}
                      onChange={(e) => handleInputChange('student_age', e.target.value)}
                      className="input-field"
                      placeholder="Enter age"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class Applying For *
                    </label>
                    <select
                      required
                      value={formData.class_applying_for}
                      onChange={(e) => handleInputChange('class_applying_for', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select Class</option>
                      <option value="Play School">Play School</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount Required (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="50000"
                      max="5000000"
                      value={formData.loan_amount}
                      onChange={(e) => handleInputChange('loan_amount', e.target.value)}
                      className="input-field"
                      placeholder="Enter amount needed"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Annual Income (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="200000"
                      value={formData.family_income}
                      onChange={(e) => handleInputChange('family_income', e.target.value)}
                      className="input-field"
                      placeholder="Enter annual family income"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB each</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        handleInputChange('documents', files.map(f => f.name));
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary mt-4"
                      onClick={() => document.querySelector('input[type="file"]').click()}
                    >
                      Choose Files
                    </button>
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                      <div className="space-y-1">
                        {formData.documents.map((doc, index) => (
                          <div key={index} className="text-sm text-gray-600">• {doc}</div>
                        ))}
                      </div>
                    </div>
                  )}
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
                        Submitting Application...
                      </>
                    ) : (
                      'Submit Loan Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Eligibility Criteria</h2>
                  <div className="space-y-3">
                    {eligibilityCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{criteria}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Required Documents</h2>
                  <div className="space-y-3">
                    {requiredDocuments.map((document, index) => (
                      <div key={index} className="flex items-start">
                        <FileText size={20} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{document}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notes</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• All documents should be clear and legible</li>
                  <li>• Original documents will be verified during processing</li>
                  <li>• Processing time may vary based on document completeness</li>
                  <li>• Interest rates are subject to change based on market conditions</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-semibold mb-6">Application Status</h2>
              
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <FileText size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Applications Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't submitted any loan applications yet.
                  </p>
                  <button 
                    onClick={() => setActiveTab('apply')}
                    className="btn-primary"
                  >
                    Apply for Loan
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          Application #{application.id.slice(-8)}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : application.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Student:</span>
                          <div className="font-medium">{application.student_name}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Amount:</span>
                          <div className="font-medium">₹{application.loan_amount.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Applied on:</span>
                          <div className="font-medium">
                            {new Date(application.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoansPage;