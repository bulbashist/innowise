import { Character } from "@/types/Character";
import * as data from "./MockData.json";
import axios from "axios";
import { getManyQuery, getOneQuery } from "./queries";
import { Filter } from "@/store/list/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class CharacterAPI {
  public static async getMockedOnes(): Promise<Character[]> {
    const res = await AsyncStorage.getItem("mock-data");
    return res ? JSON.parse(res) : (data.results as Character[]);
  }

  public static async getOne(id: number): Promise<Character> {
    return axios
      .post("https://rickandmortyapi.graphcdn.app/", { query: getOneQuery(id) })
      .then((res) => res.data.data.character);

    // return axios
    //   .get(`https://rickandmortyapi.com/api/character/${id}`)
    //   .then((res) => res.data);
  }

  public static async getMany(
    page: number,
    filter: Filter
  ): Promise<Character[]> {
    return axios
      .post("https://rickandmortyapi.graphcdn.app/", {
        query: getManyQuery(page, filter),
      })
      .then((res) => res.data.data.characters.results);
  }
}
