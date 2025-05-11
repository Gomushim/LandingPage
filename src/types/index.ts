export interface SlideImage {
  src: string;
  alt: string;
}

export interface FeatureSection {
  tag: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}
