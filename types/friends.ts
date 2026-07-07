export interface WorkDay {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}

export interface Friend {
  _id: string;
  title: string;
  url: string;
  addressUrl: string | null;
  imageUrl: string;
  address: string | null;
  workDays: WorkDay[] | null;
  phone: string | null;
  email: string | null;
}