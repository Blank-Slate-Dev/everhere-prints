// src/components/create-soundwave/SoundWaveTextEditor.tsx
"use client";

import { ChangeEvent } from "react";
import { Type, Heart, Calendar } from "lucide-react";
import Input from "@/components/ui/Input";

interface SoundWaveTextEditorProps {
  title: string;
  subtitle: string;
  dateText: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
  onDateTextChange: (dateText: string) => void;
}

export default function SoundWaveTextEditor({
  title,
  subtitle,
  dateText,
  onTitleChange,
  onSubtitleChange,
  onDateTextChange,
}: SoundWaveTextEditorProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="flex items-center gap-2 text-sm text-brand-500 mb-1.5">
          <Type size={14} />
          Title
        </label>
        <Input
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value)}
          placeholder="e.g., I Love You"
          maxLength={40}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-brand-400">Main heading on your print</p>
          <p className="text-xs text-brand-400">{title.length}/40</p>
        </div>
      </div>

      {/* Subtitle */}
      <div>
        <label className="flex items-center gap-2 text-sm text-brand-500 mb-1.5">
          <Heart size={14} />
          Names or Message
        </label>
        <Input
          value={subtitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSubtitleChange(e.target.value)}
          placeholder="e.g., Sarah & James"
          maxLength={50}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-brand-400">Optional subtitle</p>
          <p className="text-xs text-brand-400">{subtitle.length}/50</p>
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="flex items-center gap-2 text-sm text-brand-500 mb-1.5">
          <Calendar size={14} />
          Date Text
        </label>
        <Input
          value={dateText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onDateTextChange(e.target.value)}
          placeholder="e.g., 14 February 2024"
          maxLength={30}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-brand-400">Special date for your memory</p>
          <p className="text-xs text-brand-400">{dateText.length}/30</p>
        </div>
      </div>
    </div>
  );
}
