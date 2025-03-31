import React from "react";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/buttons/button";
import { ThumbsUp, MessageSquare, Flag, Clock, MapPin } from "lucide-react";

interface ReportCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  severity: "Low" | "Medium" | "High";
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
  severity,
  date,
  image,
  likes = 0,
  comments = 0,
}) => {
  const getSeverityBadge = () => {
    switch (severity) {
      case "Low":
        return <Badge className="bg-green-100 text-green-700">Low</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>;
      case "High":
        return <Badge className="bg-red-100 text-red-700">High</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
      <Link href={`/posts/${id}`} className="block h-full">
        {image && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 leading-tight">
                {title}
              </h2>
              <p className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span> {location}</span>
              </p>
            </div>
            {getSeverityBadge()}
          </div>

          <p className="mt-3 text-sm text-gray-700 line-clamp-3">
            {description}
          </p>

          <div className="flex justify-between items-center mt-5 text-xs text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-blue-500" />
              <span>{date}</span>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 flex items-center gap-1 text-gray-600 hover:text-blue-500"
                onClick={(e) => e.preventDefault()}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 flex items-center gap-1 text-gray-600 hover:text-blue-500"
                onClick={(e) => e.preventDefault()}
              >
                <MessageSquare className="h-4 w-4" />
                <span>{comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 flex items-center text-gray-600 hover:text-red-500"
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
