export default function USFormatToNumber(value: string): number {
    return Number(value.replace(/[$,< ]/g, ""));
  }