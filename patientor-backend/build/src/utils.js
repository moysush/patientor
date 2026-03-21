"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = exports.NewPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = __importDefault(require("zod"));
exports.NewPatientSchema = zod_1.default.object({
    name: zod_1.default.string(),
    dateOfBirth: zod_1.default.iso.date(),
    ssn: zod_1.default.string(),
    gender: zod_1.default.enum(types_1.Gender),
    occupation: zod_1.default.string(),
});
const toNewPatient = (object) => {
    return exports.NewPatientSchema.parse(object);
};
exports.toNewPatient = toNewPatient;
// Entry Schemas
const BaseEntrySchema = zod_1.default.object({
    description: zod_1.default.string(),
    date: zod_1.default.iso.date(),
    specialist: zod_1.default.string(),
    diagnosisCodes: zod_1.default.array(zod_1.default.string()).optional(),
});
const HealthCheckSchema = BaseEntrySchema.extend({
    type: zod_1.default.literal("HealthCheck"),
    healthCheckRating: zod_1.default.enum(types_1.HealthCheckRating),
});
const HospitalSchema = BaseEntrySchema.extend({
    type: zod_1.default.literal("Hospital"),
    discharge: zod_1.default.object({
        date: zod_1.default.iso.date(),
        criteria: zod_1.default.string(),
    }),
});
const OccupationalHealthcareSchema = BaseEntrySchema.extend({
    type: zod_1.default.literal("OccupationalHealthcare"),
    employerName: zod_1.default.string(),
    sickLeave: zod_1.default
        .object({
        startDate: zod_1.default.string(),
        endDate: zod_1.default.string(),
    })
        .optional(),
});
const NewEntrySchema = zod_1.default.discriminatedUnion("type", [
    HealthCheckSchema,
    HospitalSchema,
    OccupationalHealthcareSchema,
]);
const toNewEntry = (object) => {
    return NewEntrySchema.parse(object);
};
exports.toNewEntry = toNewEntry;
