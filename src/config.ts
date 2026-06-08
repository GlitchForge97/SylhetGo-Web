// src/config.ts
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  attractions: `${API_BASE_URL}/api/attractions`,
  accommodations: `${API_BASE_URL}/api/accommodations`,
  restaurants: `${API_BASE_URL}/api/restaurants`,
  community: `${API_BASE_URL}/api/community`,
  tripPlan: `${API_BASE_URL}/api/trip-plan`,
  transport: `${API_BASE_URL}/api/transport`,
};