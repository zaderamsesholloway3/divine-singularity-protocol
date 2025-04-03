
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Check, RefreshCw } from 'lucide-react';

interface SearchToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
  searchQuery,
  onSearchChange,
  onMarkAllAsRead,
  onRefresh
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button variant="outline" size="icon" onClick={onMarkAllAsRead} title="Mark all as read">
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onRefresh} title="Refresh">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchToolbar;
