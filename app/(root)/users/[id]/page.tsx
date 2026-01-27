'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Shield, Trash2, Ban, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { User } from '@/types/user';
import { mockUsers } from '@/lib/mock/users';

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const router = useRouter();
  const user = mockUsers.find((u) => u.id === decodeURIComponent(params.id));

  const [currentUser, setCurrentUser] = useState(user);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
          <p className="text-muted-foreground mb-4">The user youre looking for doesnt exist.</p>
          <Button onClick={() => router.push('/admin/users')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    // In real implementation, call your API to delete the user
    console.log('Deleting user:', currentUser.id);
    setDeleteDialogOpen(false);
    router.push('/admin/users');
  };

  const handleBlock = () => {
    // In real implementation, call your API to block the user
    console.log('Blocking user:', currentUser.id);
    setCurrentUser({ ...currentUser, status: 'blocked' });
    setBlockDialogOpen(false);
  };

  const handleActivate = () => {
    // In real implementation, call your API to activate the user
    console.log('Activating user:', currentUser.id);
    setCurrentUser({ ...currentUser, status: 'active' });
    setActivateDialogOpen(false);
  };

  const statusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'blocked':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      default:
        return 'bg-muted text-muted-foreground border border-border';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push('/admin/users')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </Button>
          <Badge className={`px-3 py-1 text-xs font-semibold ${statusBadge(currentUser.status)}`}>
            {currentUser.status}
          </Badge>
        </div>

        {/* User Overview Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{currentUser.username}</CardTitle>
                <CardDescription className="text-sm font-mono mt-1">
                  ID: {currentUser.id}
                </CardDescription>
              </div>
              <Shield className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{currentUser.phone}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Account Information
              </h3>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  Joined on {new Date(currentUser.joiningDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <Separator />

            {/* Addresses */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Addresses
              </h3>
              <div className="space-y-4">
                {currentUser.addresses.map((addr, idx) => (
                  <div key={idx} className="flex gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-muted-foreground uppercase">
                        {addr.label}
                      </div>
                      <div className="text-sm font-medium">{addr.line1}</div>
                      <div className="text-sm text-muted-foreground">
                        {addr.city}, {addr.state} {addr.zip}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Admin Actions</CardTitle>
            <CardDescription>
              Manage this users account status and access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentUser.status === 'blocked' ? (
              <Button
                variant="default"
                className="w-full gap-2"
                onClick={() => setActivateDialogOpen(true)}
              >
                <CheckCircle className="w-4 h-4" />
                Activate User
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
                onClick={() => setBlockDialogOpen(true)}
              >
                <Ban className="w-4 h-4" />
                Block User
              </Button>
            )}

            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="w-4 h-4" />
              Delete User
            </Button>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the user account
                for <span className="font-semibold">{currentUser.username}</span> and remove
                all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Block Confirmation Dialog */}
        <AlertDialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Block this user?</AlertDialogTitle>
              <AlertDialogDescription>
                This will prevent <span className="font-semibold">{currentUser.username}</span> from
                accessing their account. You can activate them again later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleBlock}>
                Block User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Activate Confirmation Dialog */}
        <AlertDialog open={activateDialogOpen} onOpenChange={setActivateDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Activate this user?</AlertDialogTitle>
              <AlertDialogDescription>
                This will restore access for <span className="font-semibold">{currentUser.username}</span> and
                allow them to use their account again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleActivate}>
                Activate User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}