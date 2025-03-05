import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Users, Crown } from "lucide-react";
import { getUsers } from "../../services/Admin/adminService";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isActive: "active" | "blocked";
  avatar: string;
}

export default function UserManagement() {
  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const limit = 10;

  const isPremiumUser = activeTab === "premium";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", isPremiumUser, currentPage],
    queryFn: () => getUsers(isPremiumUser, currentPage, limit),
    refetchOnWindowFocus: false,
  });

  const users = data?.users || [];
  const total = data?.total || 0;

  React.useEffect(() => {
    setTotalPages(Math.ceil(total / limit));
  }, [total]);

  const filteredUsers = React.useMemo(() => {
    return users.filter((user: User) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [users, search]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto max-w-8xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-[#7848F4]">User Management</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Users
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="mt-6 rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Phone
                    </TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-red-500"
                      >
                        {error instanceof Error
                          ? error.message
                          : "An error occurred"}
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user: User) => (
                      <TableRow key={user?._id} className="hover:bg-muted/50">
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {user.phone}
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.isActive ? "default" : "destructive"}
                            className={
                              user.isActive
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {user.isActive ? "Active" : "Blocked"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination for All Users */}
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>

          <TabsContent value="premium">
            <div className="mt-6 rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Phone
                    </TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-red-500"
                      >
                        {error instanceof Error
                          ? error.message
                          : "An error occurred"}
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user: User) => (
                      <TableRow key={user._id} className="hover:bg-muted/50">
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {user.phone}
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.isActive ? "default" : "destructive"}
                            className={
                              user.isActive
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {user.isActive ? "Active" : "Blocked"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination for Premium Users */}
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
