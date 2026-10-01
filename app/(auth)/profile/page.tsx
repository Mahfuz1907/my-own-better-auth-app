'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, Button, Chip, Spinner } from '@heroui/react';
import { House, Pencil, ShieldCheck, Person, Envelope, Calendar } from '@gravity-ui/icons';
import { authClient } from '@/app/lib/auth-client';

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c]">
        <Spinner size="lg" color="success" />
      </div>
    );
  }

  const user = session?.user;
  console.log('User information',user)

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#23232710_1px,transparent_1px),linear-gradient(to_bottom,#23232710_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Navigation / Header Buttons */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="secondary"
            onClick={() => router.push('/')}
            className="bg-[#141417] text-gray-300 hover:text-white border border-[#232327]"
          >
            <House className='w-4.5 h-4.5' />
            Home
          </Button>

          <Button
            onClick={() => router.push('/update-profile')}
            className="bg-green-500 text-[#0a0a0c] font-semibold hover:bg-green-400 shadow-lg shadow-green-500/20"
          >
            <Pencil className='w-4.5 h-4.5' />
            Update Profile
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-[#111114] border border-[#232327] shadow-2xl rounded-3xl p-2">
          <CardHeader className="flex flex-col items-center gap-3 pt-6 pb-2 text-center">
            {/* Name & Account Type */}
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {user?.name}
              </h1>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>

            <Chip
              color="success"
              className={`${user?.emailVerified === true ? 'flex' : 'hidden'} border border-green-900/40 bg-green-500/10 text-green-400 text-xs px-3 py-1 font-medium mt-1`}
            >
            <ShieldCheck  className='w-3.5 h-3.5' />
              Verified Account
            </Chip>
          </CardHeader>

          <hr className="my-4 bg-[#232327]" />

          <div className="flex flex-col gap-4 px-6 pb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Account Information
            </h3>

            {/* Field 1: Full Name */}
            <div className="flex items-center gap-4 p-3.5 bg-[#18181c] rounded-2xl border border-[#232327]">
              <div className="p-2.5 bg-green-500/10 rounded-xl text-green-400 shrink-0">
                <Person  className='w-5 h-5' />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs text-gray-400">Full Name</span>
                <span className="text-sm font-medium text-white truncate">
                  {user?.name}
                </span>
              </div>
            </div>

            {/* Field 2: Email */}
            <div className="flex items-center gap-4 p-3.5 bg-[#18181c] rounded-2xl border border-[#232327]">
              <div className="p-2.5 bg-green-500/10 rounded-xl text-green-400 shrink-0">
                <Envelope className='w-5 h-5' />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs text-gray-400">Email Address</span>
                <span className="text-sm font-medium text-white truncate">
                  {user?.email}
                </span>
              </div>
            </div>

            {/* Field 3: Joined Date */}
            <div className="flex items-center gap-4 p-3.5 bg-[#18181c] rounded-2xl border border-[#232327]">
              <div className="p-2.5 bg-green-500/10 rounded-xl text-green-400 shrink-0">
                <Calendar className='w-5 h-5' />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Joined</span>
                <span className="text-sm font-medium text-white">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Recently'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}