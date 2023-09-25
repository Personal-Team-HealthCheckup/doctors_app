export interface DoctorData {
  id: number;
  name: string;
  isAvailable: boolean;
  imageUrl: string;
}

export interface CommonDeseaseData {
  id: number;
  backgroudImage: string;
  image: string;
  title: string;
}
export interface YourAppointmentsData {
  id: number;
  rating: number;
  degree: string;
  name: string;
  experience: number;
  views: number;
  image: string;
  available: string;
  isFaveritiated: boolean;
}
