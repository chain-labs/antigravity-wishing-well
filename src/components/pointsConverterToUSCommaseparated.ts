export default function pointsConverterToUSCommaseparated(points: number | bigint) {
    if (!points) {
      return "0";
    }
    const [integerPart, decimalPart] = points.toString().split(".");
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ",",
    );
  
    return decimalPart
      ? `${formattedIntegerPart}.${decimalPart}`
      : formattedIntegerPart;
  }