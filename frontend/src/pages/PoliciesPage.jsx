import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, FileText, Users, AlertTriangle, CheckCircle, Book, Shirt } from 'lucide-react';

const PoliciesPage = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('safety');

  const policyCategories = [
    { key: 'safety', label: 'Safety & Security', icon: Shield },
    { key: 'conduct', label: 'Code of Conduct', icon: Users },
    { key: 'privacy', label: 'Privacy Policy', icon: FileText },
    { key: 'uniform', label: 'Uniform Guidelines', icon: Uniform },
    { key: 'academic', label: 'Academic Policies', icon: Book },
    { key: 'emergency', label: 'Emergency Procedures', icon: AlertTriangle }
  ];

  const policies = {
    safety: {
      title: 'Safety & Security Policies',
      sections: [
        {
          title: 'Campus Security',
          content: [
            'All school premises are monitored by CCTV cameras 24/7',
            'Trained security personnel are stationed at all entry and exit points',
            'Visitor entry is strictly regulated with proper identification and authorization',
            'Regular safety drills are conducted to prepare students and staff for emergencies',
            'All vehicles entering school premises are thoroughly checked'
          ]
        },
        {
          title: 'Student Safety Measures',
          content: [
            'No student is allowed to leave school premises without proper authorization',
            'Medical staff is available on campus during school hours',
            'First aid kits are available in all classrooms and common areas',
            'Regular health check-ups are conducted for all students',
            'Anti-bullying policies are strictly enforced'
          ]
        },
        {
          title: 'Transportation Safety',
          content: [
            'All school buses are equipped with GPS tracking systems',
            'Trained drivers with verified licenses operate school vehicles',
            'Bus attendants accompany students during transportation',
            'Regular maintenance and safety checks of all vehicles',
            'Speed limiters installed in all school buses'
          ]
        }
      ]
    },
    conduct: {
      title: 'Code of Conduct',
      sections: [
        {
          title: 'Student Behavior Expectations',
          content: [
            'Students must treat all teachers, staff, and fellow students with respect',
            'Punctuality and regular attendance are mandatory',
            'Students should maintain discipline in classrooms and common areas',
            'Use of mobile phones during school hours is strictly prohibited',
            'Students must follow proper dress code and uniform guidelines'
          ]
        },
        {
          title: 'Academic Integrity',
          content: [
            'Plagiarism and cheating in any form are strictly prohibited',
            'Students must submit original work and properly cite sources',
            'Copying from classmates or external sources is not allowed',
            'Academic dishonesty may result in suspension or expulsion',
            'Students are expected to maintain honesty in all academic activities'
          ]
        },
        {
          title: 'Disciplinary Actions',
          content: [
            'Minor infractions result in warnings and counseling',
            'Repeated violations may lead to parent-teacher meetings',
            'Serious misconduct can result in suspension',
            'Extreme cases may lead to permanent expulsion',
            'All disciplinary actions are documented and reviewed'
          ]
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          title: 'Student Information Protection',
          content: [
            'Personal information of students is kept strictly confidential',
            'Student records are accessible only to authorized personnel',
            'Photographs and videos of students require parental consent',
            'Medical information is shared only with relevant healthcare providers',
            'Academic records are protected and shared only with authorized parties'
          ]
        },
        {
          title: 'Data Collection and Usage',
          content: [
            'We collect only necessary information for educational purposes',
            'Student data is used solely for academic and administrative functions',
            'Third-party sharing of data requires explicit parental consent',
            'Data retention policies comply with educational regulations',
            'Parents have the right to access and update their child\'s information'
          ]
        },
        {
          title: 'Digital Privacy',
          content: [
            'Online learning platforms maintain student privacy',
            'Digital communications are monitored for safety purposes',
            'Student work shared online requires proper permissions',
            'Social media usage guidelines are enforced',
            'Cyberbullying is treated with zero tolerance'
          ]
        }
      ]
    },
    uniform: {
      title: 'Uniform Guidelines',
      sections: [
        {
          title: 'Daily Uniform Requirements',
          content: [
            'All students must wear the prescribed school uniform daily',
            'Uniform should be clean, properly fitted, and well-maintained',
            'School ID cards must be worn visibly at all times',
            'Proper school shoes (black/brown leather) are mandatory',
            'Hair should be neatly groomed and tied if long'
          ]
        },
        {
          title: 'Sports and Activity Wear',
          content: [
            'Designated sports uniform for PE and games periods',
            'Appropriate footwear for different sports activities',
            'Safety equipment must be worn during sports activities',
            'Lab coats are mandatory during science practical classes',
            'Special event dress codes will be communicated in advance'
          ]
        },
        {
          title: 'Uniform Procurement',
          content: [
            'Uniforms can be purchased from authorized vendors only',
            'Quality standards are maintained for all uniform items',
            'Size exchange facility available for growing students',
            'Financial assistance available for economically weaker students',
            'Bulk ordering discounts available for siblings'
          ]
        }
      ]
    },
    academic: {
      title: 'Academic Policies',
      sections: [
        {
          title: 'Curriculum and Assessment',
          content: [
            'Curriculum follows prescribed board guidelines (CBSE/ICSE/IB)',
            'Continuous assessment throughout the academic year',
            'Regular parent-teacher meetings to discuss student progress',
            'Remedial classes for students needing additional support',
            'Advanced programs for academically gifted students'
          ]
        },
        {
          title: 'Attendance Requirements',
          content: [
            'Minimum 75% attendance required for annual promotion',
            'Medical certificates required for extended absences',
            'Prior permission needed for planned leave during school days',
            'Make-up classes arranged for students with valid absences',
            'Attendance records are maintained and reviewed regularly'
          ]
        },
        {
          title: 'Homework and Assignment Policies',
          content: [
            'Age-appropriate homework assigned daily',
            'Assignment submission deadlines must be strictly followed',
            'Quality of work is emphasized over quantity',
            'Parent involvement encouraged in student learning',
            'Extra support provided for students with learning difficulties'
          ]
        }
      ]
    },
    emergency: {
      title: 'Emergency Procedures',
      sections: [
        {
          title: 'Medical Emergencies',
          content: [
            'Immediate first aid provided by trained school nurse',
            'Emergency contacts notified within 15 minutes',
            'Ambulance service on call for serious medical situations',
            'Detailed medical records maintained for all students',
            'Staff trained in basic life support and emergency response'
          ]
        },
        {
          title: 'Natural Disasters',
          content: [
            'Evacuation plans clearly marked in all areas',
            'Regular fire and earthquake drills conducted',
            'Emergency supplies stocked in designated areas',
            'Communication systems in place for emergency announcements',
            'Coordination with local emergency services established'
          ]
        },
        {
          title: 'Security Threats',
          content: [
            'Lockdown procedures in place for security threats',
            'Direct communication with local law enforcement',
            'Staff trained in threat assessment and response',
            'Regular review and update of security protocols',
            'Parent notification system for emergency situations'
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Policies & Regulations
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive guidelines ensuring safety, security, and quality education for all students
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Policy Categories</h2>
              <nav className="space-y-2">
                {policyCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.key}
                      onClick={() => setActiveSection(category.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                        activeSection === category.key
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="text-sm">{category.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card">
              <div className="flex items-center mb-6">
                {(() => {
                  const activeCategory = policyCategories.find(cat => cat.key === activeSection);
                  const IconComponent = activeCategory.icon;
                  return (
                    <>
                      <div className="bg-primary-100 p-3 rounded-lg mr-4">
                        <IconComponent size={24} className="text-primary-600" />
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {policies[activeSection].title}
                      </h1>
                    </>
                  );
                })()}
              </div>

              <div className="space-y-8">
                {policies[activeSection].sections.map((section, index) => (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Questions About Our Policies?
                </h3>
                <p className="text-blue-800 mb-4">
                  If you have any questions or concerns about our policies and regulations, 
                  please don't hesitate to contact our administration team.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button className="btn-primary">
                    Contact Administration
                  </button>
                  <button className="btn-secondary">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="card mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
          <div className="flex items-start space-x-4">
            <AlertTriangle size={24} className="text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Important Notice
              </h3>
              <p className="text-yellow-800 mb-4">
                These policies are subject to periodic review and updates. All stakeholders will be 
                notified of any changes through official communication channels. It is the responsibility 
                of students, parents, and staff to stay informed about current policies.
              </p>
              <p className="text-sm text-yellow-700">
                Last updated: September 2024 | Next review: March 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;