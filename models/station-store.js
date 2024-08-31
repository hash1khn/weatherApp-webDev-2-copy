import { v4 as uuidv4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async getStationById(id) {
    await db.read();
    return db.data.stations.find(station => station._id === id);
  },

  async addStation(station) {
    await db.read();
    station._id = uuidv4();
    db.data.stations.push(station);
    await db.write();
  },

  async updateStation(id, updatedStation) {
    await db.read();
    const station = db.data.stations.find(station => station._id === id);
    if (station) {
      station.title = updatedStation.title;
      station.latitude = updatedStation.latitude;
      station.longitude = updatedStation.longitude;
      await db.write();
    }
  },

  async deleteStation(id) {
    await db.read();
    db.data.stations = db.data.stations.filter(station => station._id !== id);
    await db.write();
  },
};
