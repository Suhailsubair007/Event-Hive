import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../services/Admin/adminEventService';
import { Event } from '../../types/admin-event-type';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, Pencil, Trash2, Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const EventsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', page, limit],
    queryFn: () => fetchEvents({ page, limit }),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1); // Reset to first page when changing limit
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    
    // Handle time in format "HH:MM"
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getTicketPriceRange = (event: Event) => {
    if (!event.tickets || event.tickets.length === 0) return 'N/A';
    
    const prices = event.tickets.map(ticket => ticket.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return minPrice === maxPrice 
      ? `₹${minPrice}` 
      : `₹${minPrice} - ₹${maxPrice}`;
  };

  const getTotalTickets = (event: Event) => {
    if (!event.tickets || event.tickets.length === 0) return 0;
    
    return event.tickets.reduce((sum, ticket) => sum + ticket.availableSeats, 0);
  };

  const getTotalSold = (event: Event) => {
    if (!event.tickets || event.tickets.length === 0) return 0;
    
    return event.tickets.reduce((sum, ticket) => sum + ticket.sold, 0);
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" | null => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'outline'; // Use "outline" for upcoming events
      case 'live':
        return 'default'; // Use "default" for live events (or another valid variant)
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-destructive">
        <h3 className="text-lg font-semibold mb-2">Error loading events</h3>
        <p>{(error as Error).message || 'Unknown error occurred'}</p>
      </div>
    );
  }

  const events = data?.events || [];
  const totalPages = Math.ceil(events.length / limit); // This is a placeholder - ideally the API would return total count

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-primary">Events Management</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show:</span>
            <Select
              value={limit.toString()}
              onValueChange={handleLimitChange}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events..." 
              className="pl-9 w-full sm:w-[250px]" 
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-primary-50">
            <TableRow>
              <TableHead className="font-semibold text-primary-900">Event</TableHead>
              <TableHead className="font-semibold text-primary-900">Date & Time</TableHead>
              <TableHead className="font-semibold text-primary-900">Category</TableHead>
              <TableHead className="font-semibold text-primary-900">Hosted By</TableHead>
              <TableHead className="font-semibold text-primary-900">Location</TableHead>
              <TableHead className="font-semibold text-primary-900">Ticket Price</TableHead>
              <TableHead className="font-semibold text-primary-900">Status</TableHead>
              <TableHead className="font-semibold text-primary-900 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event._id} className="hover:bg-primary-50/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={event.posterImageUrl || "/placeholder.svg?height=48&width=48"} 
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium line-clamp-1">{event.title}</h3>
                        <div className="flex flex-wrap gap-1">
                          {event.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index} 
                              className="inline-flex text-[10px] px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {event.tags.length > 3 && (
                            <span className="inline-flex text-[10px] px-1.5 py-0.5 bg-primary-500 text-white rounded-full">
                              +{event.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{formatDate(event.eventDate)}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{event.clientId.name}</div>
                      <div className="text-xs text-muted-foreground">{event.clientId.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div 
                      className="max-w-[150px] truncate text-sm" 
                      title={event.location.address}
                    >
                      {event.location.address.split(',')[0]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-primary-600">{getTicketPriceRange(event)}</div>
                      <div className="text-xs">
                        <span className="font-medium">{getTotalSold(event)}</span>
                        <span className="mx-1 text-muted-foreground">/</span>
                        <span className="text-muted-foreground">{getTotalTickets(event)} tickets</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(event.status)}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {events.length > 0 ? (page - 1) * limit + 1 : 0} to {Math.min(page * limit, events.length)} of {events.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="h-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                variant={pageNum === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                className={`h-8 w-8 p-0 ${pageNum === page ? 'bg-primary text-white' : ''}`}
              >
                {pageNum}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages || totalPages === 0}
            className="h-8"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
