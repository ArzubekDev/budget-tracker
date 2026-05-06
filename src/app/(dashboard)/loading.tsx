"use client"; // Бул жерде клиенттик компонент керек

import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import Logo from '@/components/Logo';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
     <Logo/>
    </div>
  );
}