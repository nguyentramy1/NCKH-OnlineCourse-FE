import { useEffect, useState } from "react";
import { apiService } from "../../../AxiosConfig/apiService";
import { UserProfile } from "../../../AxiosConfig/DataType";

const useUserProfile = (userId: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await apiService.getUserProfile(userId);
      setProfile(response.data);
    } catch {
      setError("Không thể tải thông tin hồ sơ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  return { profile, loading, error, refetch: fetchUserProfile };
};

export default useUserProfile;
