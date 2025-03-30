import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';

const ReportForm: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [riverName, setRiverName] = useState('');
  const [pollutionType, setPollutionType] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
          alert("Location detected: Your current location has been added to the report.");
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Error: Could not get your location. Please enter it manually.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation not supported: Your browser doesn't support geolocation. Please enter location manually.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !description || !location || !riverName || !severity || !pollutionType) {
      alert("Missing information: Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const newPost = {
      title,
      description,
      location,
      riverName,
      severity: parseInt(severity),
      pollutionType: pollutionType as 'Water' | 'Air' | 'Soil',
      author: "Anonymous User",
      image: imagePreview || undefined
    };

    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      alert("Report submitted successfully: Thank you for helping to keep our rivers clean!");

      setSuccess(true);

      setTimeout(() => {
        router.push('/posts');
      }, 2000);
    } catch (error) {
      alert("Error: There was an error submitting your report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      {success ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for contributing to cleaner rivers. Your report has been received.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Report River Pollution</h2>
            <p className="text-gray-600 mb-6">
              Help us track and address pollution by submitting your observations below.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <input
                id="title"
                placeholder="Brief title describing the pollution issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium">Location</label>
              <div className="flex gap-2 mt-1">
                <input
                  id="location"
                  placeholder="Enter coordinates or location name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={getCurrentLocation}
                  disabled={loading}
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="riverName" className="block text-sm font-medium">River/Water Body Name</label>
              <input
                id="riverName"
                placeholder="Enter the name of the river or water body"
                value={riverName}
                onChange={(e) => setRiverName(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="pollutionType" className="block text-sm font-medium">Pollution Type</label>
              <select
                id="pollutionType"
                value={pollutionType}
                onChange={(e) => setPollutionType(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select pollution type</option>
                <option value="Water">Water Pollution</option>
                <option value="Air">Air Pollution</option>
                <option value="Soil">Soil Pollution</option>
              </select>
            </div>

            <div>
              <label htmlFor="severity" className="block text-sm font-medium">Pollution Severity</label>
              <select
                id="severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select severity level</option>
                <option value="30">Low - Minor pollution visible</option>
                <option value="60">Medium - Significant visible pollution</option>
                <option value="90">High - Severe pollution requiring urgent action</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                placeholder="Describe the pollution you observed (type, extent, potential sources, etc.)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full mt-1 min-h-[120px] px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium">Upload Image</label>
              <div className="mt-1">
                {imagePreview ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                      onClick={() => setImagePreview(null)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 font-medium">Upload an image</span>
                        <span className="text-gray-500"> or drag and drop</span>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Submit Pollution Report
                </span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportForm;