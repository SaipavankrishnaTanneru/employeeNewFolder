import { useState } from 'react';

// --- THIS IS A TEMPORARY MOCK AUTH HOOK ---
export const useAuth = () => {
  
  const [mockUser] = useState({ 
    username: 'Vivek Sagar',
    // 🔴 FIX: Changed 'Hr' to 'HR' to match App.js allowedRoles
    roles: ['HR', 'DO', 'CO'] 
  });

  return {
    user: mockUser,
    isLoading: false,
  };
};