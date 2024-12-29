import AsyncStorage from "@react-native-async-storage/async-storage";
import { getManyQuery, getOneQuery } from "./queries";
import { Character, Filter } from "@/types";
import * as data from "./MockData.json";
import axios from "axios";

export class CharacterAPI {
  public static async getMockedOnes(filter: Filter): Promise<Character[]> {
    return this.getSavedRecords().then((chars) =>
      chars.filter((v) => this.isMatch(v, filter))
    );
  }

  public static async getOne(id: number): Promise<Character> {
    return axios
      .post("https://rickandmortyapi.graphcdn.app/", { query: getOneQuery(id) })
      .then((res) => res.data.data.character);
  }

  public static async getMany(
    page: number,
    filter: Filter
  ): Promise<Character[]> {
    return axios
      .post("https://rickandmortyapi.graphcdn.app/", {
        query: getManyQuery(page, filter),
      })
      .then((res) => {
        const data = res.data.data.characters.results as Character[];
        if (data.length) this.saveLastRecords(data.slice(-15));
        return data;
      });
  }

  private static isMatch(char: Character, filter: Filter) {
    let c1 = true;
    let c2 = true;
    if (filter.species) {
      c1 = char.species === filter.species;
    }
    if (filter.status) {
      c2 = char.status === filter.status;
    }
    return c1 && c2;
  }

  private static async getSavedRecords(): Promise<Character[]> {
    const storedData = await AsyncStorage.getItem("mock-data");
    const res = storedData ? JSON.parse(storedData) : data.results;
    return res;
  }

  private static saveLastRecords(data: Character[]) {
    AsyncStorage.setItem("mock-data", JSON.stringify(data));
  }
}
