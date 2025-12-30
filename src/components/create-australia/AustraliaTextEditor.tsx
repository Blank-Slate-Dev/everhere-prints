// src/components/create-australia/AustraliaTextEditor.tsx
"use client";

import Input from "@/components/ui/Input";

interface AustraliaTextEditorProps {
  title: string;
  subtitle: string;
  date: string;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function AustraliaTextEditor({
  title,
  subtitle,
  date,
  onTitleChange,
  onSubtitleChange,
  onDateChange,
}: AustraliaTextEditorProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Our Special Place"
        maxLength={30}
      />

      <Input
        label="Names / Subtitle"
        value={subtitle}
        onChange={(e) => onSubtitleChange(e.target.value)}
        placeholder="Emma & James"
        maxLength={40}
      />

      <Input
        label="Date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        placeholder="14.02.2020"
        maxLength={20}
      />
    </div>
  );
}