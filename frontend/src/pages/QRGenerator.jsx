import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const QRGenerator = () => {
  const [location, setlocation] = useState('');
  const [doorCode, setdoorCode] = useState('');
  const [roomName, setroomName] = useState('');
  const [qrData, setQrData] = useState('');
  const navigate = useNavigate();

  // Example company list for the dropdown
  const companyList = ['SLT Colombo', 'SLT Walisara', 'SLT Trace City'];

  const generateQRCode = async (e) => {
    e.preventDefault();
    if (location && doorCode && roomName) {
      const qrValue = `${doorCode}`;
      setQrData(qrValue);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const saveQRCodeToDatabase = async () => {
    try {
      // Capture the QR Code canvas as a Base64 string
      const canvas = document.getElementById('qrCode');
      const qrBase64 = canvas.toDataURL('image/png');
  
      const response = await axios.post('/api/doors/create/', {
        location,
        doorCode,
        roomName,
        qrData,
        qrImage: qrBase64, // Include the Base64 image
      });
      alert(response.data.message);
      navigate('/doors'); // Navigate to the doors page after successful save
    } catch (error) {
      console.error(error);
      alert('Failed to save QR Code.');
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qrCode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${doorCode}_${roomName}_${location}_QR.png`;
    downloadLink.click();
  };

  return (
    <div className="flex dark:bg-slate-700">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Create a new Door</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Form */}
          <div className="p-6 border dark:border-none rounded-lg shadow-sm bg-white dark:bg-slate-600">
            <h2 className="text-xl font-semibold dark:text-slate-100 mb-4">Enter Details</h2>
            <form onSubmit={generateQRCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium dark:text-slate-200">Company Name</label>
                <select
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  className="w-full px-4 py-2 border dark:border-none rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-300 focus:ring-blue-400"
                >
                  <option value="">Select a company</option>
                  {companyList.map((company, index) => (
                    <option key={index} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-slate-200">Door ID</label>
                <input
                  type="text"
                  value={doorCode}
                  onChange={(e) => setdoorCode(e.target.value)}
                  placeholder="Enter door ID"
                  className="w-full px-4 py-2 border dark:border-none rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-300 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-slate-200">Room Name</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setroomName(e.target.value)}
                  placeholder="Enter room name"
                  className="w-full px-4 py-2 border dark:border-none rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-300 focus:ring-blue-400"
                />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={!location || !doorCode || !roomName}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Generate QR Code
                </button>
              </div>
            </form>
          </div>

          {/* Middle Column: QR Code Display */}
          <div className="flex items-center justify-center p-6  border dark:border-none rounded-lg shadow-sm bg-white dark:bg-slate-600">
            {qrData ? (
              <div className="text-center">
                <h2 className="text-xl font-semibold dark:text-slate-100  mb-6">Generated QR Code</h2>
                <QRCodeCanvas
                  id="qrCode"
                  value={qrData}
                  size={200}
                  bgColor={'#ffffff'}
                  level={'H'}
                  className='p-4 bg-white'
                />
                <div>
                  <button
                    type="button"
                    onClick={downloadQRCode}
                    disabled={!qrData}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 my-5"
                  >
                    Download QR Code
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-slate-200">No QR Code generated yet.</p>
            )}
          </div>

          {/* Right Column: QR Code Details */}
          <div className="p-6 border dark:border-none rounded-lg shadow-sm bg-white dark:bg-slate-600">
            
            {qrData ? (
              <div className="">
                <h2 className="text-xl font-semibold dark:text-slate-100  mb-4">QR Code Details</h2>
                <div className="divide-y divide-gray-300">
                  <div className="flex items-center py-2">
                    <span className="font-medium dark:text-slate-300  w-1/2">Company Name</span>
                    <span className="border-l border-gray-300 dark:text-slate-200 pl-2">{location}</span>
                  </div>
                  <div className="flex items-center py-2">
                    <span className="font-medium dark:text-slate-300 w-1/2">Door Code</span>
                    <span className="border-l border-gray-300 dark:text-slate-200 pl-2">{doorCode}</span>
                  </div>
                  <div className="flex items-center py-2">
                    <span className="font-medium dark:text-slate-300 w-1/2">Room Name</span>
                    <span className="border-l border-gray-300 dark:text-slate-200 pl-2">{roomName}</span>
                  </div>
                  <div className="flex items-center py-2">
                    <span className="font-medium dark:text-slate-300 w-1/2">QR Data</span>
                    <span className="border-l border-gray-300 dark:text-slate-200 pl-2">{qrData}</span>
                  </div>
                </div>

                <div className="flex mt-12">
                  <button
                    onClick={saveQRCodeToDatabase}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save to Database
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center my-32 dark:text-slate-200">No details available.</p>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;