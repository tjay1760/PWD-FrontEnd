// Components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { 
  Users, 
  Home,
  ClipboardList,
  File
} from 'lucide-react'; // Only import icons used in this component

// Import your new content components
import DashboardContent from './DashboardContent';
import AssessmentsContent from './AssessmentsContent ';
import DocumentsContent from './DocumentsContent';

const UserDashboard = ({ userData }) => { // Accept userData prop
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const renderSidebar = () => (
    <div 
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
        sidebarHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          {sidebarHovered && (
            <div className="ml-3">
              <div className="text-sm font-semibold text-gray-800">Persons With Disability</div>
              <div className="text-xs text-blue-600">Medical System</div>
            </div>
          )}
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              currentPage === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            {sidebarHovered && <span className="ml-3">Dashboard</span>}
          </button>
          
          <button
            onClick={() => setCurrentPage('assessments')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              currentPage === 'assessments' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            {sidebarHovered && <span className="ml-3">Assessments</span>}
          </button>
          
          <button
            onClick={() => setCurrentPage('documents')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              currentPage === 'documents' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <File className="w-5 h-5" />
            {sidebarHovered && <span className="ml-3">Documents</span>}
          </button>
        </nav>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardContent userData={userData} />; // Pass userData to DashboardContent
      case 'assessments':
        return <AssessmentsContent />;
      case 'documents':
        return <DocumentsContent />;
      default:
        return <DashboardContent userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {renderSidebar()}
      <div className={`flex-1 transition-all duration-300 ${sidebarHovered ? 'ml-64' : 'ml-16'}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;