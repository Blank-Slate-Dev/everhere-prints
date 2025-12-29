// src/components/create/TextEditor.tsx
"use client";

import Input from "@/components/ui/Input";

interface TextEditorProps {
  title: string;
  subtitle: string;
  date: string;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function TextEditor({
  title,
  subtitle,
  date,
  onTitleChange,
  onSubtitleChange,
  onDateChange,
}: TextEditorProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Where We Met"
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