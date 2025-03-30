
import React, { useState } from 'react';
import { Campaign } from '@/models/CampaignModel';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface CampaignFormProps {
  onSubmit: (data: Omit<Campaign, 'id' | 'participants' | 'status' | 'organizer'>) => void;
  isLoading: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    riverName: '',
    date: new Date(),
    time: '',
    type: 'Cleanup' as 'Cleanup' | 'Awareness' | 'Monitoring' | 'Planting',
    maxParticipants: 20,
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDateChange = (date: Date) => {
    setFormData(prev => ({ ...prev, date }));
    
    // Clear error when date is selected
    if (errors.date) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.date;
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title || formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    if (!formData.description || formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    if (!formData.location || formData.location.length < 3) {
      newErrors.location = 'Location is required';
    }
    if (!formData.riverName || formData.riverName.length < 3) {
      newErrors.riverName = 'River name is required';
    }
    if (!formData.time || formData.time.length < 3) {
      newErrors.time = 'Time is required';
    }
    if (!formData.maxParticipants || formData.maxParticipants < 5) {
      newErrors.maxParticipants = 'Minimum 5 participants required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        riverName: formData.riverName,
        date: format(formData.date, 'yyyy-MM-dd'),
        time: formData.time,
        type: formData.type,
        maxParticipants: Number(formData.maxParticipants),
        image: formData.image
      });
    }
  };

  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Yamuna River Cleanup Drive"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              id="description"
              name="description"
              placeholder="Describe the cleanup event, what to bring, and what participants can expect" 
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g., Worli, Mumbai"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="riverName" className="block text-sm font-medium text-gray-700">River Name</label>
              <input
                id="riverName"
                name="riverName"
                type="text"
                placeholder="e.g., Mithi River"
                value={formData.riverName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.riverName && <p className="text-red-500 text-sm mt-1">{errors.riverName}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <span className={formData.date ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                </button>
                {showCalendar && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 p-2">
                    {/* Simple date picker UI - in a real app you would use a calendar component */}
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 31 }, (_, i) => {
                        const day = new Date();
                        day.setDate(i + 1);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              handleDateChange(day);
                              setShowCalendar(false);
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100"
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="time"
                  name="time"
                  type="text"
                  placeholder="e.g., 9:00 AM - 12:00 PM"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Event Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Cleanup">River Cleanup</option>
                <option value="Awareness">Awareness Campaign</option>
                <option value="Monitoring">Water Quality Monitoring</option>
                <option value="Planting">Riverbank Planting</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">Max Participants</label>
              <input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                min="5"
                value={formData.maxParticipants}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.maxParticipants && <p className="text-red-500 text-sm mt-1">{errors.maxParticipants}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
            <input
              id="image"
              name="image"
              type="text"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Campaign"}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
