const fs = require("fs");
const path = "app/admin/testimonials/page.tsx";
if (!fs.existsSync("app/admin/testimonials")) {
  fs.mkdirSync("app/admin/testimonials", { recursive: true });
}
const content = `"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Camera, Check, Loader2, MapPin, Pencil, Plus, Star, Trash2, Upload, X } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  location: string
  photoUrl: string
  rating: number
  text: string
  published: boolean
  createdAt?: string
}

const emptyForm = {
  name: "",
  location: "",
  photoUrl: "",
  rating: 5,
  text: "",
  published: true,
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    fetch("/api/testimonials")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setTestimonials(data) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const openNew = () => { setEditingId(null); setForm(emptyForm); setPhotoPreview(null); setShowModal(true) }

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id)
    setForm({ name: t.name, location: t.location, photoUrl: t.photoUrl, rating: t.rating, text: t.text, published: t.published })
    setPhotoPreview(t.photoUrl || null)
    setShowModal(true)
  }

  const closeModal = () => { setShowModal(false); setEditingId(null); setForm(emptyForm); setPhotoPreview(null) }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) { alert("Selecione uma imagem."); return }
    if (file.size > 5 * 1024 * 1024) { alert("Max 5MB."); return }
    const reader = new FileReader()
    reader.onload = (ev) => { const url = ev.target?.result as string; setPhotoPreview(url); setForm(p => ({...p, photoUrl: url})) }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => { setPhotoPreview(null); setForm(p => ({...p, photoUrl: ""})); if(fileRef.current) fileRef.current.value="" }

  const handleSave = async () => {
    if (!form.name.trim() || !form.text.trim()) { alert("Nome e depoimento obrigat\u00f3rios."); return }
    setSaving(true)
    try {
      const method = editingId ? "PUT" : "POST"
      const body = editingId ? { ...form, id: editingId } : form
      const res = await fetch("/api/testimonials", { method, headers: {"Content-Type":"application/json"}, body: JSON.stringify(body) })
      if (!res.ok) throw new Error("Falha")
      closeModal(); fetchData()
    } catch { alert("Erro ao salvar.") }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este depoimento?")) return
    setDeletingId(id)
    try {
      await fetch(\x60/api/testimonials?id=\x24{id}\x60, { method: "DELETE" })
      fetchData()
    } catch { alert("Erro ao excluir.") }
    finally { setDeletingId(null) }
  }

  const togglePublished = async (t: Testimonial) => {
    await fetch("/api/testimonials", { method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ id: t.id, published: !t.published }) }).catch(console.error)
    fetchData()
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Depoimentos</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os depoimentos exibidos na landing page</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition font-medium">
          <Plus className="w-4 h-4" /> Novo Depoimento
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">{editingId ? "Editar Depoimento" : "Novo Depoimento"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">

              {/* FOTO COM SEU PET */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Foto com seu Pet</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                {photoPreview ? (
                  <div className="flex items-center gap-4">
                    <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-green-400 shadow-md" />
                    <div className="flex flex-col gap-1">
                      <button type="button" onClick={() => fileRef.current?.click()} className="text-sm text-blue-600 hover:text-blue-800 font-medium">Trocar foto</button>
                      <button type="button" onClick={removePhoto} className="text-sm text-red-500 hover:text-red-700">Remover</button>
                    </div>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer group">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-green-100 transition">
                      <Camera className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition" />
                    </div>
                    <span className="text-sm text-gray-500 group-hover:text-green-700 font-medium">Clique para enviar foto</span>
                    <span className="text-xs text-gray-400">JPG, PNG \u2014 max 5MB</span>
                  </button>
                )}
              </div>

              {/* NOME + LOCALIZACAO */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ex: Ana Paula" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Localiza\u00e7\u00e3o</label>
                  <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="S\u00e3o Paulo, SP" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
              </div>

              {/* AVALIACAO */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Avalia\u00e7\u00e3o</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setForm({...form, rating: s})} className="p-0.5 hover:scale-110 transition-transform">
                      <Star className={\x60w-7 h-7 \x24{s <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}\x60} />
                    </button>
                  ))}
                </div>
              </div>

              {/* DEPOIMENTO */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Depoimento</label>
                <textarea value={form.text} onChange={e => setForm({...form, text: e.target.value})} placeholder="Meu cachorro fugiu e em 15 minutos j\u00e1 estava de volta gra\u00e7as ao Pethere..." rows={4} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" />
              </div>

              {/* PUBLICADO */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500" />
                <span className="text-sm text-gray-700">Publicado no site</span>
              </label>

            </div>
            <div className="p-6 border-t bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button onClick={closeModal} className="px-5 py-2.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium">Cancelar</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 flex items-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {saving ? "Salvando..." : "Salvar Depoimento"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LISTA */}
      {loading ? (
        <div className="text-center py-12"><Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto" /></div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border"><p className="text-gray-500">Nenhum depoimento.</p><button onClick={openNew} className="mt-3 text-green-600 font-medium text-sm">+ Criar primeiro</button></div>
      ) : (
        <div className="space-y-4">
          {testimonials.map(t => (
            <div key={t.id} className={\x60bg-white rounded-xl border p-5 transition \x24{!t.published ? "opacity-60 border-dashed" : ""}\x60}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {t.photoUrl ? (
                      <img src={t.photoUrl} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-green-200 shadow-sm" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">{t.name.charAt(0)}</div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.name}</h3>
                      {t.location && <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</p>}
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(s => <Star key={s} className={\x60w-4 h-4 \x24{s<=t.rating?"text-yellow-400 fill-yellow-400":"text-gray-200"}\x60} />)}</div>
                  <p className="text-gray-700 italic leading-relaxed">\x22{t.text}\x22</p>
                  <button onClick={() => togglePublished(t)} className={\x60mt-3 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition \x24{t.published ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}\x60}>
                    {t.published ? <><Check className="w-3 h-3" /> Ativo no Site</> : <><X className="w-3 h-3" /> Oculto</>}
                  </button>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(t)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Editar"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t.id)} disabled={deletingId===t.id} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50" title="Excluir">
                    {deletingId===t.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}\x60;
fs.writeFileSync(path, content, "utf8");
console.log("OK! Arquivo criado:", path);
console.log("Reinicie o servidor: npm run dev");
