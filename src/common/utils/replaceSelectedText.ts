export function replaceSelectedText(
  startIndex: number,
  endIndex: number,
  originalValue: string,
  replacementValue: string
) {
  const newValue =
    originalValue.substring(0, startIndex) +
    replacementValue +
    originalValue.substring(endIndex, originalValue.length);
  return newValue;
}
