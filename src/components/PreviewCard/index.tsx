import React from "react";
import {
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Code,
  Music,
} from "lucide-react";
import type { OEmbedResponse } from "../../types/oembed";
import { MediaPreview } from "./MediaPreview";
import { AuthorInfo } from "./AuthorInfo";
import { TechnicalDetails } from "./TechnicalDetails";

interface PreviewCardProps {
  data: OEmbedResponse;
}

export function PreviewCard({ data }: PreviewCardProps) {
  const getIcon = () => {
    switch (data.type) {
      case "photo":
        return <ImageIcon className="w-6 h-6" />;
      case "video":
        return <Video className="w-6 h-6" />;
      case "audio":
        return <Music className="w-6 h-6" />;
      case "rich":
        return <Code className="w-6 h-6" />;
      default:
        return <LinkIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
      <div className="flex items-center gap-3 mb-4">
        {getIcon()}
        <h2 className="text-xl font-semibold">{data.title || "Untitled"}</h2>
      </div>

      <div className="space-y-6">
        <MediaPreview data={data} />

        {data.description && (
          <p className="text-gray-600">{data.description}</p>
        )}

        <AuthorInfo data={data} />

        {data.duration && (
          <div className="text-sm text-gray-500">
            Duration: {Math.floor(data.duration / 60)}:
            {(data.duration % 60).toString().padStart(2, "0")}
          </div>
        )}

        <TechnicalDetails data={data} />
      </div>
    </div>
  );
}
