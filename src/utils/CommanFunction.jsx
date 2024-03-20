export default function CapitalizeLetter(string) {
  const capitalized =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return capitalized;
}
