'use client'

import { UsersTable } from '@/components/users/users-table';
import { mockUsers } from '@/lib/mock/users';

export default function UsersPage() {
  return <UsersTable users={mockUsers} />;
}