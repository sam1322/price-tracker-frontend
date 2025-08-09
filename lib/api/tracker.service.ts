/* eslint-disable */

import apiClient from "@/constants/apiClient";

export interface SearchResult {
  amazonResults: {
    success: boolean;
    products: Product[];
    vendor: 'AMAZON';
    searchQuery: string;
  };
  flipkartResults: {
    success: boolean;
    products: Product[];
    vendor: 'FLIPKART';
    searchQuery: string;
  };
  comparisons: PriceComparison[];
}

export interface Product {
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl: string;
  productUrl: string;
  vendor: 'AMAZON' | 'FLIPKART';
  availability: boolean;
  rating?: number;
  reviewCount?: number;
  asin?: string;
  flipkartId?: string;
}

export interface PriceComparison {
  productTitle: string;
  amazonProduct?: Product;
  flipkartProduct?: Product;
  priceDifference?: number;
  cheaperVendor?: 'AMAZON' | 'FLIPKART';
}

export interface TrackedItem {
  id: string;
  name: string;
  searchQuery: string;
  targetPrice?: number;
  isActive: boolean;
  createdAt: string;
  products: any[];
  currentLowestPrice?: number;
  unreadAlerts: number;
}

export interface PriceHistoryData {
  trackedItem: {
    id: string;
    name: string;
    searchQuery: string;
  };
  chartData: any[];
  products: {
    id: string;
    title: string;
    vendor: 'AMAZON' | 'FLIPKART',
    currentPrice: number;
    priceChange: number;
  }[];
}

export interface Alert {
  id: string;
  message: string;
  priceChange: number;
  oldPrice: number;
  newPrice: number;
  isRead: boolean;
  createdAt: string;
  trackedItem: TrackedItem;
}

export interface Statistics {
  overview: {
    totalTrackedItems: number;
    activeTrackedItems: number;
    totalProducts: number;
    totalPriceChecks: number;
    totalAlerts: number;
    avgPriceDrop: number;
  };
  recentScrapes: any[];
  vendorStats: {
    amazon: { productCount: number; successRate: number };
    flipkart: { productCount: number; successRate: number };
  };
}

export const trackerService = {
  async searchProducts(query: string, limit?: number): Promise<SearchResult> {
    const { data } = await apiClient.post('/tracker/search', { query, limit });
    return data;
  },

  async createTrackedItem(dto: {
    name: string;
    searchQuery: string;
    targetPrice?: number;
    // productUrls?: string[];
    productsToTrack: Product[],
  }): Promise<TrackedItem> {
    const { data } = await apiClient.post('/tracker/track', dto);
    return data;
  },

  async getTrackedItems(activeOnly?: boolean): Promise<TrackedItem[]> {
    const { data } = await apiClient.get('/tracker/items', {
      params: { active: activeOnly },
    });
    console.log("data", data)
    return data;
  },

  async getTrackedItemDetails(id: string): Promise<any> {
    const { data } = await apiClient.get(`/tracker/items/${id}`);
    return data;
  },

  async getPriceHistory(id: string, days: number = 30): Promise<PriceHistoryData> {
    const { data } = await apiClient.get(`/tracker/items/${id}/history`, {
      params: { days },
    });
    return data;
  },

  async deleteTrackedItem(id: string): Promise<void> {
    await apiClient.delete(`/tracker/items/${id}`);
  },

  async getAlerts(unreadOnly?: boolean): Promise<Alert[]> {
    const { data } = await apiClient.get('/tracker/alerts', {
      params: { unread: unreadOnly },
    });
    return data;
  },

  async markAlertAsRead(id: string): Promise<void> {
    await apiClient.post(`/tracker/alerts/${id}/read`);
  },

  async getStatistics(): Promise<Statistics> {
    const { data } = await apiClient.get('/tracker/stats');
    return data;
  },
};