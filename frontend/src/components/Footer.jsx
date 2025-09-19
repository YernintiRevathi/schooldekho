import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <span className="text-xl font-bold">SD</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('header.title')}</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's most comprehensive digital platform to make school search and selection easy.
              Explore thousands of schools across the country.
            </p>
            <div className="flex space-x-4">
              <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/schools" className="text-gray-400 hover:text-white transition-colors">Find Schools</Link></li>
              <li><Link to="/compare" className="text-gray-400 hover:text-white transition-colors">Compare Schools</Link></li>
              <li><Link to="/loans" className="text-gray-400 hover:text-white transition-colors">Education Loans</Link></li>
              <li><Link to="/scholarships" className="text-gray-400 hover:text-white transition-colors">Scholarships</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/alumni" className="text-gray-400 hover:text-white transition-colors">Alumni Network</Link></li>
              <li><Link to="/fundraising" className="text-gray-400 hover:text-white transition-colors">Fundraising</Link></li>
              <li><Link to="/policies" className="text-gray-400 hover:text-white transition-colors">Policies</Link></li>
              <li><span className="text-gray-400">Career Guidance</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-primary-400" />
                <span className="text-gray-400 text-sm">info@schooldekho.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-primary-400" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary-400" />
                <span className="text-gray-400 text-sm">India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SchoolDekho. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/support" className="text-gray-400 hover:text-white text-sm transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;