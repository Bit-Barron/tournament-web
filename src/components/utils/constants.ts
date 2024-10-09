export function getStatusStyle(status: string): string {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "bg-yellow-500 text-yellow-900";
    case "ACTIVE":
      return "bg-green-500 text-green-900";
    case "UPCOMING":
      return "bg-blue-500 text-blue-900";
    default:
      return "bg-gray-500 text-gray-900";
  }
}
