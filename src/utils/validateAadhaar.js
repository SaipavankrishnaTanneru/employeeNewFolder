export function validateAadhaar(val) {
  if (!val) return false;
  const cleaned = String(val).replace(/\s|-/g, '');
  if (!/^[0-9]{12}$/.test(cleaned)) return false;
  // Optional: implement Verhoeff checksum in future; for now, basic length/numeric check
  return true;
}
