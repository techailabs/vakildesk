import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Image,
  File,
  Download,
  MoreVertical,
  Folder,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const documents = [
  {
    id: 1,
    name: "Court Order - Interim Stay",
    type: "Order",
    case: "State vs. Sharma",
    uploadedBy: "Adv. Singh",
    uploadedAt: "2025-01-28",
    size: "245 KB",
    fileType: "pdf",
  },
  {
    id: 2,
    name: "Affidavit - Plaintiff",
    type: "Affidavit",
    case: "State vs. Sharma",
    uploadedBy: "Adv. Singh",
    uploadedAt: "2025-01-25",
    size: "128 KB",
    fileType: "pdf",
  },
  {
    id: 3,
    name: "Evidence Photos",
    type: "Evidence",
    case: "ABC Corp vs. XYZ Ltd",
    uploadedBy: "Client",
    uploadedAt: "2025-01-20",
    size: "2.4 MB",
    fileType: "image",
  },
  {
    id: 4,
    name: "Written Statement",
    type: "Pleading",
    case: "Gupta Property Dispute",
    uploadedBy: "Adv. Singh",
    uploadedAt: "2025-01-15",
    size: "312 KB",
    fileType: "pdf",
  },
  {
    id: 5,
    name: "Registration Document",
    type: "Misc",
    case: "Gupta Property Dispute",
    uploadedBy: "Client",
    uploadedAt: "2025-01-10",
    size: "1.1 MB",
    fileType: "pdf",
  },
];

const documentTypes = ["All", "Order", "Affidavit", "Evidence", "Pleading", "Misc"];

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return <Image className="h-5 w-5" />;
      case "pdf":
        return <FileText className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            All case documents in one place
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Filters */}
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
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Documents Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Case</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Size</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-secondary flex items-center justify-center text-muted-foreground">
                        {getFileIcon(doc.fileType)}
                      </div>
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge status-active">{doc.type}</span>
                  </td>
                  <td className="text-muted-foreground">{doc.case}</td>
                  <td className="text-muted-foreground">{doc.uploadedBy}</td>
                  <td className="text-muted-foreground">
                    {new Date(doc.uploadedAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="text-muted-foreground">{doc.size}</td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Share with Client</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Folder className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No documents found</p>
          </div>
        )}
      </div>

      {/* Storage Info */}
      <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Storage used: </span>
          <span className="font-medium">1.2 GB of 5 GB</span>
        </div>
        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
          <div className="w-1/4 h-full bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
}
