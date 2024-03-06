export class PersonService {
  async getById(id: string) {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/person/${id}`, { method: "GET" });
    } catch (error) {}
  }
}
