export default function generateFullAddress(address) {
  return (
    address.address_line_1 +
    ", " +
    (address.address_line_2 ? address.address_line_2 + ", " : "") +
    (address.landmark ? address.landmark + ", " : "") +
    (address.city_obj ? address.city_obj.name + ", " : "") +
    (address.state_obj ? address.state_obj.name : "") +
    (address.postal_code ? " - " + address.postal_code : "")
  );
}
