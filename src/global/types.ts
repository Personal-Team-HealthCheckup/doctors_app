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

export interface MedicalStoreData {
  id: number;
  rating: number;
  name: string;
  image: string;
  subTitle: string;
}
export interface QualifiedDoctorData {
  id: number;
  rating: number;
  degree: string;
  name: string;
  experience: number;
  views: number;
  available: string;
  image: any;
  isFaveritiated: boolean;
  fees: number;
}

export interface Navigation {
  navigate?: (url: string) => void;
  goBack?: () => void;
}
