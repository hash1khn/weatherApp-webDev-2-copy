import { v4 as uuidv4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(stationId, report) {
    await db.read();
    report._id = uuidv4(); // Generate a unique ID for the report
    report.stationId = stationId; // Corrected: Use stationId for consistency
    db.data.reports.push(report); // Add the new report to the reports array
    await db.write(); // Save the updated data back to reports.json
    return report;
  },

  async getReportsByStationId(stationId) { // Corrected: Use stationId in the parameter
    await db.read();
    return db.data.reports.filter((report) => report.stationId === stationId); // Corrected: Use stationId
  },

  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    if (index !== -1) {
      db.data.reports.splice(index, 1); // Remove the report from the array
      await db.write(); // Save the updated data back to reports.json
    }
  },

  async deleteAllReports() {
    await db.read();
    db.data.reports = []; // Clear the reports array
    await db.write(); // Save the updated empty array back to reports.json
  },

  async updateReport(id, updatedReport) { // Corrected: Update function now takes report ID and updated data
    await db.read();
    const report = db.data.reports.find((report) => report._id === id);
    if (report) {
      report.code = updatedReport.code;
      report.temperature = updatedReport.temperature;
      report.windSpeed = updatedReport.windSpeed;
      report.windDirection = updatedReport.windDirection;
      report.pressure = updatedReport.pressure;
      await db.write(); // Save the updated report back to reports.json
    }
  },
};
