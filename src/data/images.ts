/**
 * Central image registry.
 * Replace these placeholder URLs with real Lotus product photography
 * (drop files into /public/images and update the paths here).
 */
export const IMG = {
  heroModel: "https://image.qwenlm.ai/generated-images/29ccbd1e-b35e-44b6-942b-56048e15c9d9/_result.png",
  kurtaSet: "https://image.qwenlm.ai/generated-images/9532107b-0237-478d-aebf-11389c7cd483/_result.png",
  kurti: "https://image.qwenlm.ai/generated-images/ee962ac7-bc06-4f56-ad1c-3c18b29e8f17/_result.png",
  dress: "https://image.qwenlm.ai/generated-images/ec057de0-ffee-4a23-a6b8-3994ba5b5d56/_result.png",
  plussize: "https://image.qwenlm.ai/generated-images/1f9fc589-e6ae-4296-8ded-2c60c73ee61a/_result.png",
  coords: "https://image.qwenlm.ai/generated-images/3d7ae1b5-ab95-42ee-ac78-97857e48f2b5/_result.png",
  festive: "https://image.qwenlm.ai/generated-images/690a80f2-3e68-4537-a58c-e1c2e38e093a/_result.png",
  lookbook: "https://image.qwenlm.ai/generated-images/335e0242-d1b6-4e6c-aafe-d6bc3cd87ba9/_result.png",
  reel: "https://image.qwenlm.ai/generated-images/4c213976-0aa2-44a9-8201-205b20c0ab05/_result.png",
  boutique: "https://image.qwenlm.ai/generated-images/2b95328c-9552-409d-8167-f9efc2ce5bd5/_result.png",
} as const;

export type ImgKey = keyof typeof IMG;
