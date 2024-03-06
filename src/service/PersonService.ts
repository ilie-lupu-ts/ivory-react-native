import { Person } from "@/models/Person";

export class PersonService {
  async getById(accessToken: string, id: string): Promise<Person> {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/person`, {
        method: "GET",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();

      console.log("getById", { data });

      return {} as Person;
    } catch (error) {
      throw new Error("Unknown");
    }
  }
}
