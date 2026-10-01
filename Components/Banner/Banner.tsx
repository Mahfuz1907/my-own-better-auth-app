'use client';

import React from 'react';
import { Chip } from '@heroui/react';
import { LogoGithub, ShieldCheck, Key, Thunderbolt, CircleFill } from '@gravity-ui/icons';
import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] text-white min-h-[90vh] flex items-center justify-center px-6 py-24">
      {/* --- Aesthetic Background Effects --- */}
      
      {/* Main Radial Glow (Green) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-green-500/15 blur-[160px] rounded-full pointer-events-none" />
      
      {/* Secondary Glow (Emerald) */}
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Modern Grid Pattern Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#23232710_1px,transparent_1px),linear-gradient(to_bottom,#23232710_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] mask-radial-[gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* --- Banner Content --- */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-7">
        
        {/* Decorative Top Badge */}
        <div className="animate-fade-in-down">
        <Chip 
            color="success" 
            variant="primary"
            className="border border-[#232327] bg-[#141417]/90 text-xs px-4 py-1.5 font-medium tracking-wide uppercase text-gray-300 shadow-xl"
            >
          <ShieldCheck className="text-green-400 w-4 h-4" />
          <CircleFill width={6} />
          <Chip.Label>Active</Chip.Label>
            Better Auth + Next.js 15
          </Chip>
        </div>

        {/* Main Hero Headline (Large, Responsive, Gradient) */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-balance leading-[1.1] animate-fade-in">
          Unlock the Art of <br />
          <span className="bg-linear-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
            Secure Flows
          </span>
        </h1>

        {/* Subtitle (Refined typography) */}
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl text-balance leading-relaxed animate-fade-in delay-100">
          An aesthetic playground crafted for exploring modern authentication patterns, from session management to complex OAuth integrations.
        </p>

        {/* Placeholder "Buttons" (Static, No Logic) */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-4 animate-fade-in-up delay-200">
            <Link href={'/dashboard'}
            className="flex items-center cursor-pointer gap-3 px-8 h-14 rounded-full bg-green-500 text-[#0a0a0c] font-semibold text-lg shadow-2xl shadow-green-500/20"
          >
            Get Started
            <Thunderbolt className='w-5 h-5' />
          </Link>
          <a href='https://github.com/Mahfuz1907' target='blank'
            className="flex items-center gap-3 px-8 h-14 rounded-full border border-[#2e2e33] hover:border-gray-600 text-white font-medium text-lg bg-[#141417]/50 backdrop-blur-sm cursor-pointer"
          >
            <LogoGithub className='w-5.5 h-5.5' />
            Explore
          </a>
        </div>

        {/* --- Decorative Lower Highlights --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 mt-12 border-t border-[#1f1f23] w-full max-w-3xl text-left animate-fade-in-up delay-300">
          <div className="flex items-center gap-4 bg-[#111114] p-5 rounded-2xl border border-[#1f1f23] shadow-lg">
            <div className="p-3.5 bg-green-500/10 rounded-xl border border-green-900/50 text-green-400 shrink-0">
              <Thunderbolt className='w-5 h-5' />
            </div>
            <div className='space-y-0.5'>
              <h4 className="font-semibold text-white">Fast Refresh</h4>
              <p className="text-sm text-gray-400">Next.js 15 HMR</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#111114] p-5 rounded-2xl border border-[#1f1f23] shadow-lg">
            <div className="p-3.5 bg-green-500/10 rounded-xl border border-green-900/50 text-green-400 shrink-0">
              <Image src={'/google.png'} alt='google' height={20} width={20} />
            </div>
            <div className='space-y-0.5'>
              <h4 className="font-semibold text-white">Social Login</h4>
              <p className="text-sm text-gray-400">OAuth Providers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#111114] p-5 rounded-2xl border border-[#1f1f23] shadow-lg">
            <div className="p-3.5 bg-green-500/10 rounded-xl border border-green-900/50 text-green-400 shrink-0">
              <Key className='w-4 h-4' />
            </div>
            <div className='space-y-0.5'>
              <h4 className="font-semibold text-white">Credential Auth</h4>
              <p className="text-sm text-gray-400">Password Flows</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}