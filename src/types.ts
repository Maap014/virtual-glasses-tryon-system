import { StaticImageData } from "next/image";

export interface NavBarProps {
  name: string;
  href: string;
}

export interface ProductType {
  id: number;
  name: string;
  price: string;
  image_url: string;
  tryon_url: string;
  category?: string;
  description?: string;
}

export interface ModalProps {
  className?: string;
  onClick?: () => void;
}
