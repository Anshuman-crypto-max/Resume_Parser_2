"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileCheck, FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

export function UploadExperience() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const onDrop = useCallback((accepted: File[]) => {
    setFiles(accepted);
    setProgress(18);
    const interval = window.setInterval(() => setProgress((value) => {
      if (value >= 100) {
        window.clearInterval(interval);
        toast.success("Resumes queued for AI parsing");
        return 100;
      }
      return value + 18;
    }), 260);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxSize: 50 * 1024 * 1024,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Resume upload</h1>
        <p className="mt-2 text-muted-foreground">Drag in resumes and let the parsing worker extract structured profiles.</p>
      </div>
      <GlassCard>
        <div {...getRootProps()} className={`grid min-h-80 cursor-pointer place-items-center rounded-lg border border-dashed p-8 text-center transition ${isDragActive ? "border-primary bg-emerald-50" : "border-emerald-300 bg-white/50"}`}>
          <input {...getInputProps()} />
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-md bg-emerald-100 text-primary">
              <FileUp size={30} />
            </div>
            <h2 className="mt-5 text-xl font-semibold">Drop PDF, DOCX, or DOC resumes</h2>
            <p className="mt-2 text-sm text-muted-foreground">Files are validated, uploaded to secure storage, and processed asynchronously.</p>
            <Button className="mt-6" type="button">Choose files</Button>
          </div>
        </div>
      </GlassCard>
      {files.length > 0 && (
        <GlassCard>
          <div className="mb-4 flex items-center gap-2 font-semibold">
            {progress < 100 ? <Loader2 className="animate-spin text-primary" size={18} /> : <FileCheck className="text-primary" size={18} />}
            Upload progress
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-emerald-100"><div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="mt-4 grid gap-2">
            {files.map((file) => <div key={file.name} className="rounded-md bg-white/70 p-3 text-sm">{file.name}</div>)}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
