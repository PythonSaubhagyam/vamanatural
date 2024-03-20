export default function ReplaceKey(obj, oldKey, newKey) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey]; // Create a new key with the value of the old key
    delete obj[oldKey]; // Delete the old key
  }
}
