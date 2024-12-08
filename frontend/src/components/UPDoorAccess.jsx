import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UPDoorAccess = ({ accessRecords, userId, onAccessUpdate }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [records, setRecords] = useState(accessRecords);
  const navigate = useNavigate();

  useEffect(() => {
    setRecords(accessRecords);
  }, [accessRecords]);

  // Calculate total pages
  const totalPages = Math.ceil(records.length / itemsPerPage);

  // Get the current page data
  const currentRecords = records.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Handlers for pagination
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Handler for removing a record
  const handleRemovePermission = async (indexToRemove, doorAccessId) => {
    try {
      await axios.delete(`/api/users/${userId}/doorAccess/${doorAccessId}`, { withCredentials: true });
      const updatedRecords = records.filter((_, index) => index !== indexToRemove);
      setRecords(updatedRecords);

      // Adjust current page if it goes out of range after removal
      if (updatedRecords.length > 0 && currentPage >= Math.ceil(updatedRecords.length / itemsPerPage)) {
        setCurrentPage(currentPage - 1);
      }

      // Trigger the state update in the UserProfile component
      onAccessUpdate();
    } catch (error) {
      console.error('Error removing door access:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">Door Access</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Door Code</th>
              <th className="p-2 border">Room Name</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Entry Time</th>
              <th className="p-2 border">Exit Time</th>
              <th className="p-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{record.door?.doorCode || 'N/A'}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => navigate(`/doors/${record.door?._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    {record.door?.roomName || 'N/A'}
                  </button>
                </td>
                <td className="p-2 border">{record.door?.location || 'N/A'}</td>
                <td className="p-2 border">{new Date(record.date).toLocaleDateString('en-CA')}</td>
                <td className="p-2 border">{record.inTime}</td>
                <td className="p-2 border">{record.outTime}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleRemovePermission(currentPage * itemsPerPage + index, record._id)}
                    className="bg-red-400 text-white py-1 px-3 rounded hover:bg-red-500"
                  >
                    Remove Permission
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`px-3 py-1 rounded ${
                currentPage === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UPDoorAccess;