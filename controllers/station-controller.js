import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const stationController = {
  // Retrieve a specific station and its reports
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const reports = await reportStore.getReportsByStationId(station._id);

    let maxTemp = null, minTemp = null, maxWindSpeed = null, minWindSpeed = null, maxPressure = null, minPressure = null;

    if (reports.length > 0) {
      maxTemp = Math.max(...reports.map(report => report.temperature));
      minTemp = Math.min(...reports.map(report => report.temperature));
      maxWindSpeed = Math.max(...reports.map(report => report.windSpeed));
      minWindSpeed = Math.min(...reports.map(report => report.windSpeed));
      maxPressure = Math.max(...reports.map(report => report.pressure));
      minPressure = Math.min(...reports.map(report => report.pressure));
    }

    const viewData = {
      title: "Station",
      station: station,
      reports: reports,
      maxTemp,
      minTemp,
      maxWindSpeed,
      minWindSpeed,
      maxPressure,
      minPressure
    };

    response.render("station-view", viewData);
  },

  // Add a new station
  async addStation(request, response) {
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };

    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  // Update an existing station
  async updateStation(request, response) {
    const updatedStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };

    await stationStore.updateStation(request.params.id, updatedStation);
    response.redirect(`/station/${request.params.id}`);
  },

  // Delete a station
  async deleteStation(request, response) {
    await stationStore.deleteStation(request.params.id);
    response.redirect("/dashboard");
  },

  // Add a new report to a station
  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };

    await reportStore.addReport(station._id, newReport);
    response.redirect(`/station/${station._id}`);
  },

  // Update an existing report
  async updateReport(request, response) {
    const updatedReport = {
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };

    await reportStore.updateReport(request.params.reportid, updatedReport);
    response.redirect(`/station/${request.params.stationid}`);
  },

  // Delete a report from a station
  async deleteReport(request, response) {
    await reportStore.deleteReport(request.params.reportid);
    response.redirect(`/station/${request.params.stationid}`);
  },
};
