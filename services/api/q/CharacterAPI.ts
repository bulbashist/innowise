import { Character } from "@/types/Character";
import * as data from "./MockData.json";
import axios from "axios";

export class CharacterAPI {
  public static async getMockedOnes(): Promise<Character[]> {
    return data.results as Character[];
  }

  public static async getOne(id: number): Promise<Character> {
    return axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.data);
  }
}
