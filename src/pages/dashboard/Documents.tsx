import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Search,
  Filter,
  FileText,
  Folder,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";

const documentTypes = ["All", "order", "affidavit", "evidence", "pleading", "misc"];

function formatBytes(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const { documents, isLoading, toggleShared } = useDocuments();

  const filtered = documents.filter((doc) => {
    const matchesSearch = doc.file_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === "All" || (doc.document_type ?? "misc") === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Documents</h1>
          <p className="text-muted-foreground">
            All case documents in one place. Toggle visibility for clients per file.
          </p>
        </div>
        <Button variant="cta" disabled>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type} className="capitalize">
                {type === "All" ? "All Types" : type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Type</th>
                  <th>Case</th>
                  <th>Uploaded</th>
                  <th>Size</th>
                  <th className="text-center">Visible to Client</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-secondary flex items-center justify-center text-muted-foreground">
                          <FileText className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{doc.file_name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge status-active capitalize">
                        {doc.document_type ?? "misc"}
                      </span>
                    </td>
                    <td className="text-muted-foreground">
                      {doc.cases?.case_title ?? "—"}
                    </td>
                    <td className="text-muted-foreground">
                      {new Date(doc.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="text-muted-foreground">
                      {formatBytes(doc.file_size)}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {doc.shared_with_client ? (
                          <Eye className="h-4 w-4 text-emerald" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Switch
                          checked={doc.shared_with_client}
                          disabled={toggleShared.isPending}
                          onCheckedChange={(checked) =>
                            toggleShared.mutate({ id: doc.id, shared: checked })
                          }
                          aria-label="Share with client"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Folder className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No documents found</p>
            <p className="text-xs mt-2">
              Documents uploaded against cases will appear here.
            </p>
          </div>
        )}
      </div>

      <div className="bg-secondary/40 rounded-lg p-4 text-sm text-muted-foreground border border-border">
        🔒 <strong>Privacy note:</strong> Only documents marked "Visible to Client" appear in
        the client portal. Internal notes, billing, and unmarked files always remain private to
        the firm.
      </div>
    </div>
  );
}