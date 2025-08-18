import apiClient from "@/constants/apiClient";

export interface Video {
  id: string;
  prompt: string;
  videoUrl: string;
  createdAt: string;
  status: string;
}
export const videoApi = {
  generateVideo: async (prompt: string) => {
    const { data } = await apiClient.post('/video/jobs', { prompt });
    return data;
  },

  getJobStatus: async (jobId: string) => {
    const { data } = await apiClient.get(`/video/jobs/${jobId}`);
    return data;
  },

  getRecentVideos: async () => {
    const { data } = await apiClient.get('/video/jobs?status=COMPLETED&limit=100');
    return data as Video[];
  },

  getProcessingVideos: async () => {
    const { data } = await apiClient.get('/video/processing?limit=100');
    return data as Video[];
  },


}