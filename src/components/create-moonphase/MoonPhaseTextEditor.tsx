// src/components/create-moonphase/MoonPhaseTextEditor.tsx
"use client";

import Input from "@/components/ui/Input";

interface MoonPhaseTextEditorProps {
  title: string;
  subtitle: string;
  dateText: string;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onDateTextChange: (value: string) => void;
}

export default function MoonPhaseTextEditor({
  title,
  subtitle,
  dateText,
  onTitleChange,
  onSubtitleChange,
  onDateTextChange,
}: MoonPhaseTextEditorProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Under This Moon"
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
        label="Date Display"
        value={dateText}
        onChange={(e) => onDateTextChange(e.target.value)}
        placeholder="14th February 2020"
        maxLength={30}
      />

      <p className="text-xs text-brand-500">
        The date display text appears below the names. Format it however you prefer.
      </p>
    </div>
  );
}
