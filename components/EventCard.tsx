import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./buttons/button";
import { Badge } from "./Badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { cn } from "@/utils/tw";

interface EventCardProps {
  id: number | string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  participants: number;
  maxParticipants?: number;
  image?: string;
  onJoin?: () => void;
}

const EventCard = ({
  id,
  title,
  description,
  location,
  date,
  time,
  organizer,
  participants,
  maxParticipants,
  image,
  onJoin,
}: EventCardProps) => {
  const isFull = maxParticipants && participants >= maxParticipants;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white border border-gray-200 rounded-lg">
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}

      <CardHeader className="pb-2 px-6 pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {title}
          </CardTitle>
          <Badge className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Cleanup Event
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{location}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-4">
        <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            <span>
              {participants} {maxParticipants ? `/ ${maxParticipants}` : ""}{" "}
              participants
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-6 pt-4 pb-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Organized by:{" "}
          <span className="font-medium text-gray-700">{organizer}</span>
        </div>
        <Button
          variant={isFull ? "outline" : "default"}
          size="sm"
          disabled={!!isFull}
          className={cn(
            isFull
              ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 transition-colors",
            "cursor-pointer"
          )}
          onClick={onJoin}
        >
          {isFull ? "Event Full" : "Join Cleanup"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
