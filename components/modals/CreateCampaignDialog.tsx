
import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateCampaignDialogProps {
  onCampaignCreated: () => void;
  children: React.ReactNode;
}

const CreateCampaignDialog: React.FC<CreateCampaignDialogProps> = ({ 
  onCampaignCreated,
  children 
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCampaign = async (campaignData: Omit<Campaign, 'id' | 'participants' | 'status' | 'organizer'>) => {
    setIsSubmitting(true);
    try {
      
      
      setOpen(false);
      onCampaignCreated();
    } catch (error) {
      alert("Error creating campaign. There was an error creating your campaign. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) {
    return (
      <div onClick={() => setOpen(true)}>
        {children}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Create Cleanup Campaign</h2>
            <button 
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-gray-500 mb-6">
            Fill out the form below to create a new river cleanup campaign. Your campaign will be visible to all users of the platform.
          </p>
          
          {/* <CampaignForm onSubmit={handleCreateCampaign} isLoading={isSubmitting} /> */}
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignDialog;
