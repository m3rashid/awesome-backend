export const toFile = (obj: File | Blob): File => {
  if (obj instanceof File) return obj;
  if (obj instanceof Blob) return new File([obj], 'unknown');

  return obj;
};
