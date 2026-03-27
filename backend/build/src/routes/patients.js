"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const zod_1 = __importDefault(require("zod"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientsService_1.default.getNonSensitivePatient());
});
router.get("/:id", (req, res) => {
    try {
        const patient = patientsService_1.default.findById(req.params.id);
        if (!patient) {
            throw new Error("Patient not found");
        }
        res.send(patient);
    }
    catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : "unknown error",
        });
    }
});
router.post("/", (req, res) => {
    try {
        // type guard and validator
        const newPatientEntry = (0, utils_1.toNewPatient)(req.body);
        // adding patient in the database and getting an id for the patient
        const addedPatient = patientsService_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        res.status(400).json({
            error: error instanceof zod_1.default.ZodError ? error.issues : "Unknown error",
        });
    }
});
router.post("/:id/entries", (req, res) => {
    try {
        // const { body } = req.body;
        const validEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patientsService_1.default.addEntry(req.params.id, validEntry);
        if (!addedEntry) {
            res.status(400).json({ error: "Patient not found" });
        }
        res.json(addedEntry);
    }
    catch (error) {
        res.status(400).json({
            error: error instanceof zod_1.default.ZodError ? error.issues : "unknown error",
        });
    }
});
exports.default = router;
