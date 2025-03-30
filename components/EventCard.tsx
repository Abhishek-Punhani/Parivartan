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
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className="bg-nature-500">Cleanup Event</Badge>
        </div>
        <CardDescription className="flex items-center gap-1 mt-1">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-4 w-4 mr-2 text-river-500" />
            <span>{date}</span>
          </div>

          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-2 text-river-500" />
            <span>{time}</span>
          </div>

          <div className="flex items-center text-gray-700">
            <Users className="h-4 w-4 mr-2 text-river-500" />
            <span>
              {participants} {maxParticipants ? `/ ${maxParticipants}` : ""}{" "}
              participants
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Organized by: <span className="font-medium">{organizer}</span>
        </div>

        <Button
          variant={isFull ? "outline" : "default"}
          size="sm"
          disabled={!!isFull}
          className={
            isFull
              ? "border-gray-300 text-gray-400"
              : "bg-nature-500 hover:bg-nature-600"
          }
          onClick={onJoin}
        >
          {isFull ? "Event Full" : "Join Cleanup"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
