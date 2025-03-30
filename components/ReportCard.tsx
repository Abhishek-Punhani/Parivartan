import React from 'react';
import Link from 'next/link';
import { Badge } from "@/components/Badge";
import { Button } from "@/components/buttons/button";
import { ThumbsUp, MessageSquare, Flag, Clock, MapPin } from 'lucide-react';

interface ReportCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  riverName: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  image?: string;
  likes?: number;
  comments?: number;
}

const ReportCard: React.FC<ReportCardProps> = ({
  id,
  title,
  description,
  location,
  riverName,
  severity,
  date,
  image,
  likes = 0,
  comments = 0
}) => {
  const getSeverityBadge = () => {
    switch(severity) {
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden hover:shadow-md transition-shadow bg-white rounded-md border h-full">
      <Link href={`/posts/${id}`} className="block h-full">
        {image && (
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
            />
          </div>
        )}
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{riverName}, {location}</span>
              </p>
            </div>
            {getSeverityBadge()}
          </div>
          
          <p className="mt-2 text-sm text-gray-700 line-clamp-3">{description}</p>
          
          <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{date}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2"
                onClick={(e) => e.preventDefault()}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2"
                onClick={(e) => e.preventDefault()}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{comments}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2"
                onClick={(e) => e.preventDefault()}
              >
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ReportCard;