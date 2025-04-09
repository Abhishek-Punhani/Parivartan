import React, { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { Camera } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@/contexts/toast/toastContext";
import axios from "axios";

import { uploadFiles } from "@/utils/upload";

interface CampaignFormProps {
  onSubmit: (
    data: any
  ) => void;
  isLoading: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    location: "",
    type: "River Cleanup",
    time: ""

  });
  const [date, setDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile]= useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Record<string, any>) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   console.log(formData);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { title, description, location, time, type } = formData;
    console.log(formData, date);

    if (
      !title ||
      !description ||
      !location ||
      !date ||
      !time ||
      !type ||
      !file
    ) {
      toast.open({
        message: {
          heading: "Missing Information",
          content: "Please fill in all required fields, including an image, before submitting.",
        },
        duration: 5000,
        position: "top-center",
        color: "warning",
      });
      setLoading(false);
      return;
    }

    const uploaded_file = await uploadFiles([{ file: file, type: "image" }]);
    const link = uploaded_file[0].file.secure_url;
    const newPost = {
      title,
      description,
      location,
      date,
      time,
      eventType: type,
      image: link,
    };

    try {
      const res = await axios.post("/api/campaign/create", newPost, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(res);

      toast.open({
        message: {
          heading: "Report Submitted",
          content: "Your report has been successfully submitted.",
        },
        duration: 5000,
        position: "top-center",
        color: "success",
      });

      setSuccess(true);
    } catch (error) {
      toast.open({
        message: {
          heading: "Submission Error",
          content:
            "There was an error submitting your report. Please try again.",
        },
        duration: 5000,
        position: "top-center",
        color: "error",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Event Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Yamuna River Cleanup Drive"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the cleanup event, what to bring, and what participants can expect"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
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
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>

              <div className=" w-full flex items-center justify-center">
                <DatePicker
                  selected={date}
                  onChange={(value) => setDate(value)}
                  className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholderText="Choose a date"
                />
              </div>

              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
                <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="time"
                  name="time"
                  type="text"
                  placeholder="e.g., 9:00 AM - 12:00 PM"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                />
                </div>
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Event Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="River Cleanup">River Cleanup</option>
                <option value="Awareness Campaign">Awareness Campaign</option>
                <option value="Water Quality Monitoring">Water Quality Monitoring</option>
                <option value="Tree Plantation">Tree Plantation</option>
                <option value="Other">Other</option>

              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>


          </div>

          <div className="space-y-2">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
              Image Upload (Optional)
            </label>
            {imagePreview ? (
              <div className="relative rounded-md border border-gray-300 shadow-sm overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setImagePreview(null)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex flex-col items-center justify-center text-center cursor-pointer">
                <Camera className="h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label htmlFor="image-upload" className="cursor-pointer text-blue-600 font-medium">
                    Upload an image
                  </label>
                  <span className="text-gray-500"> or drag and drop</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
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
