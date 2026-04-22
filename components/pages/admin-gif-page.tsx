"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus, Trash2, Upload } from "lucide-react"
import { toast } from "sonner"

import { postAdminUpsertGif } from "@/lib/api/ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const COMMON_MUSCLES = [
  "Quadriceps", "Hamstrings", "Glutes", "Calves", 
  "Biceps", "Triceps", "Chest", "Shoulders", 
  "Back", "Abs", "Forearms", "Neck", "Traps"
]

export default function AdminGifPage() {
  const router = useRouter()
  const [equipmentName, setEquipmentName] = useState("")
  const [aliases, setAliases] = useState("")
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [captions, setCaptions] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
      setCaptions((prev) => [...prev, ...newFiles.map((f) => f.name.split(".")[0])])
    }
  }

  const toggleMuscle = (muscle: string) => {
    setSelectedMuscles((prev) =>
      prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]
    )
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setCaptions((prev) => prev.filter((_, i) => i !== index))
  }

  const updateCaption = (index: number, value: string) => {
    const newCaptions = [...captions]
    newCaptions[index] = value
    setCaptions(newCaptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!equipmentName.trim()) {
      toast.error("Iltimos, aparat nomini kiriting")
      return
    }

    if (files.length === 0) {
      toast.error("Iltimos, kamida bitta GIF fayl yuklang")
      return
    }

    setIsUploading(true)
    try {
      await postAdminUpsertGif({
        equipmentName: equipmentName.trim(),
        gifs: files,
        captions: captions.length > 0 ? captions : undefined,
        muscles: selectedMuscles,
        aliases: aliases.split(",").map(s => s.trim()).filter(Boolean),
      })
      toast.success("GIF'lar muvaffaqiyatli saqlandi!")
      // Clear form
      setEquipmentName("")
      setAliases("")
      setSelectedMuscles([])
      setFiles([])
      setCaptions([])
    } catch (error: any) {
      console.error(error)
      toast.error(error.response?.data?.message || "Yuklashda xatolik yuz berdi")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mr-4 h-9 w-9 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold tracking-tight">Admin: GIF Management</h1>
            <p className="text-xs text-muted-foreground">O'zingiz tanlagan sifatli GIF'larni tizimga qo'shing</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl border border-border/60 bg-secondary/20 p-6 shadow-xl backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Equipment Name */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Asosiy Aparat Nomi
                </label>
                <Input
                  placeholder="Masalan: Vertical Leg Press"
                  value={equipmentName}
                  onChange={(e) => setEquipmentName(e.target.value)}
                  className="h-11 bg-background/50"
                  disabled={isUploading}
                />
                <p className="text-[10px] text-muted-foreground px-1 leading-relaxed">
                  Gemini tomonidan aniqlanadigan nom. <br />
                  <span className="text-primary font-medium">Maslahat:</span> Agar topilmaganda chiqadigan GIF yuklamoqchi bo'lsangiz, nomiga <b>"Universal Fallback"</b> deb yozing.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Muqobil Nomlar (Sinonimlar)
                </label>
                <Input
                  placeholder="Masalan: Leg Press Machine, Oyoq trenajyori"
                  value={aliases}
                  onChange={(e) => setAliases(e.target.value)}
                  className="h-11 bg-background/50"
                  disabled={isUploading}
                />
                <p className="text-[10px] text-muted-foreground px-1">
                  Vergul bilan ajratib yozing.
                </p>
              </div>
            </div>

            {/* Muscles Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Ishlaydigan Muskullarni Tanlang
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_MUSCLES.map((muscle) => {
                  const isSelected = selectedMuscles.includes(muscle)
                  return (
                    <button
                      key={muscle}
                      type="button"
                      onClick={() => toggleMuscle(muscle)}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-xs font-medium transition-all border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                          : "bg-background/40 text-muted-foreground border-border/60 hover:border-primary/40 hover:bg-background/60"
                      )}
                    >
                      {muscle}
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] text-muted-foreground px-1">
                Agar nom bo'yicha topilmasa, tizim muskullar o'xshashligiga qarab GIF chiqara oladi.
              </p>
            </div>

            {/* File Upload Area */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground/80">GIF Fayllar</label>
              
              <div
                className={cn(
                  "relative group cursor-pointer rounded-xl border-2 border-dashed border-border/40 bg-background/30 p-12 transition-all hover:border-primary/40 hover:bg-background/50",
                  isUploading && "pointer-events-none opacity-50"
                )}
              >
                <input
                  type="file"
                  multiple
                  accept="image/gif,image/webp"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="rounded-full bg-primary/10 p-4 text-primary group-hover:scale-110 transition-transform">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Sifatli GIF yoki WebP animatsiyalarini tanlang</p>
                    <p className="text-xs text-muted-foreground mt-1">Multi-upload qo'llab-quvvatlanadi</p>
                  </div>
                </div>
              </div>

              {/* Files Preview Table */}
              {files.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Yuklanishga tayyor ({files.length})
                  </h3>
                  <div className="space-y-2">
                    {files.map((file, idx) => {
                      const isWebP = file.type === "image/webp"
                      return (
                        <div
                          key={idx}
                          className="flex animate-in fade-in slide-in-from-top-2 items-center gap-3 rounded-lg border border-border/40 bg-background/40 p-3"
                        >
                          <div className="h-10 w-10 overflow-hidden rounded bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                            {isWebP ? "WEBP" : "GIF"}
                          </div>
                          <div className="flex-1 space-y-1">
                          <Input
                            value={captions[idx]}
                            onChange={(e) => updateCaption(idx, e.target.value)}
                            placeholder="Sarlavha (masalan: leg press technique)"
                            className="h-8 border-none bg-transparent p-0 text-sm focus-visible:ring-0"
                          />
                          <p className="text-[10px] text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(idx)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <Button
              type="submit"
              disabled={isUploading || files.length === 0}
              className="w-full h-14 rounded-xl text-md font-semibold gap-2 shadow-lg shadow-primary/20"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saqlanmoqda...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  GIF'larni Saqlash
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
