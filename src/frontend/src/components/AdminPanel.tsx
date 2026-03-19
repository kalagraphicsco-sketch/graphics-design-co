import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Category } from "../backend.d";
import type { PortfolioItem } from "../backend.d";
import {
  ExternalBlob,
  useAddPortfolioItem,
  useDeletePortfolioItem,
  useGetPortfolioItems,
  useUpdatePortfolioItem,
} from "../hooks/useQueries";

const CATEGORY_OPTIONS: { label: string; value: Category }[] = [
  { label: "Logo Design", value: Category.logoDesign },
  { label: "Branding", value: Category.branding },
  { label: "Print Media", value: Category.printMedia },
  { label: "Digital Graphics", value: Category.digitalGraphics },
  { label: "UI/UX Design", value: Category.uiuxDesign },
  { label: "Motion Graphics", value: Category.motionGraphics },
];

interface FormState {
  title: string;
  category: Category;
  description: string;
  featured: boolean;
  imageFile: File | null;
}

const DEFAULT_FORM: FormState = {
  title: "",
  category: Category.logoDesign,
  description: "",
  featured: false,
  imageFile: null,
};

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: portfolioItems = [], isLoading } = useGetPortfolioItems();
  const addMutation = useAddPortfolioItem();
  const updateMutation = useUpdatePortfolioItem();
  const deleteMutation = useDeletePortfolioItem();

  const isPending = addMutation.isPending || updateMutation.isPending;

  const openAdd = () => {
    setEditItem(null);
    setForm(DEFAULT_FORM);
    setShowForm(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setEditItem(item);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      featured: item.featured,
      imageFile: null,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required.");
      return;
    }
    if (!editItem && !form.imageFile) {
      toast.error("Please select an image.");
      return;
    }

    try {
      let imageBlob: ExternalBlob;

      if (form.imageFile) {
        const bytes = await form.imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(bytes);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
          (pct) => {
            setUploadProgress(pct);
          },
        );
      } else if (editItem) {
        // Re-wrap the existing URL so TypeScript gets the right runtime type
        imageBlob = ExternalBlob.fromURL(editItem.imageUrl.getDirectURL());
      } else {
        toast.error("Image is required.");
        return;
      }

      if (editItem) {
        await updateMutation.mutateAsync({
          id: editItem.id,
          title: form.title,
          category: form.category,
          description: form.description,
          imageBlob,
          featured: form.featured,
        });
        toast.success("Portfolio item updated!");
      } else {
        const id = `item-${Date.now()}`;
        await addMutation.mutateAsync({
          id,
          title: form.title,
          category: form.category,
          description: form.description,
          imageBlob,
          featured: form.featured,
        });
        toast.success("Portfolio item added!");
      }

      setShowForm(false);
      setForm(DEFAULT_FORM);
      setUploadProgress(0);
    } catch {
      toast.error("Failed to save item.");
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Item deleted.");
      setDeleteConfirm(null);
    } catch {
      toast.error("Failed to delete item.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        data-ocid="admin.dialog"
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-display text-xl">
              Portfolio Management
            </DialogTitle>
            {!showForm && (
              <Button
                size="sm"
                onClick={openAdd}
                className="bg-orange hover:bg-orange-hover text-white rounded-full gap-1.5"
                data-ocid="admin.primary_button"
              >
                <Plus className="w-4 h-4" /> Add Item
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {showForm ? (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4 py-2"
              data-ocid="admin.modal"
            >
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="admin.cancel_button"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-semibold">
                  {editItem ? "Edit Item" : "Add New Item"}
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">
                    Title *
                  </Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Project title"
                    required
                    data-ocid="admin.input"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">
                    Category *
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, category: v as Category }))
                    }
                  >
                    <SelectTrigger data-ocid="admin.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">
                  Description
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Brief description of the project"
                  rows={3}
                  className="resize-none"
                  data-ocid="admin.textarea"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">
                  {editItem ? "Replace Image (optional)" : "Image *"}
                </Label>
                <label
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl p-6 cursor-pointer hover:border-orange transition-colors"
                  data-ocid="admin.dropzone"
                >
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {form.imageFile
                      ? form.imageFile.name
                      : "Click to upload image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        imageFile: e.target.files?.[0] ?? null,
                      }))
                    }
                    data-ocid="admin.upload_button"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, featured: e.target.checked }))
                  }
                  className="w-4 h-4 accent-orange"
                  data-ocid="admin.checkbox"
                />
                <Label htmlFor="featured" className="text-sm cursor-pointer">
                  Mark as Featured
                </Label>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div data-ocid="admin.loading_state">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-orange hover:bg-orange-hover text-white"
                  data-ocid="admin.save_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1" />{" "}
                      Saving...
                    </>
                  ) : editItem ? (
                    "Update Item"
                  ) : (
                    "Add Item"
                  )}
                </Button>
              </div>
            </motion.form>
          ) : (
            <div className="py-2">
              {isLoading ? (
                <div
                  className="flex items-center justify-center py-12"
                  data-ocid="admin.loading_state"
                >
                  <Loader2 className="w-6 h-6 animate-spin text-orange" />
                </div>
              ) : portfolioItems.length === 0 ? (
                <div
                  className="text-center py-12"
                  data-ocid="admin.empty_state"
                >
                  <div className="w-12 h-12 bg-muted rounded-xl mx-auto mb-3 flex items-center justify-center text-xl">
                    🎨
                  </div>
                  <p className="text-muted-foreground text-sm">
                    No portfolio items yet.
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Click &quot;Add Item&quot; to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {portfolioItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-4 p-3 rounded-xl border border-border hover:border-orange/30 transition-colors group"
                      data-ocid={`admin.item.${i + 1}`}
                    >
                      <img
                        src={item.imageUrl.getDirectURL()}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {item.title}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.category}
                          {item.featured ? " · Featured" : ""}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(item)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          data-ocid={`admin.edit_button.${i + 1}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        {deleteConfirm === item.id ? (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(item.id)}
                              disabled={deleteMutation.isPending}
                              className="h-8 px-2 text-xs"
                              data-ocid={`admin.confirm_button.${i + 1}`}
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                "Confirm"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteConfirm(null)}
                              className="h-8 px-2 text-xs"
                              data-ocid={`admin.cancel_button.${i + 1}`}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDeleteConfirm(item.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            data-ocid={`admin.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
