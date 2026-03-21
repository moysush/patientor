"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatient = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });
};
const addPatient = (object) => {
    const newPatient = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, object), { entries: [] });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (id, object) => {
    const findPatient = patients_1.default.find((p) => p.id === id);
    if (!findPatient) {
        return undefined;
    }
    const newEntry = Object.assign({ id: (0, uuid_1.v4)() }, object);
    findPatient.entries.push(newEntry);
    return newEntry;
};
const findById = (id) => {
    const patientExist = patients_1.default.find((p) => p.id === id);
    return patientExist;
};
exports.default = {
    getPatients,
    getNonSensitivePatient,
    addPatient,
    findById,
    addEntry,
};
