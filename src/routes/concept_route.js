const express = require('express');
const conceptRoute= express.Router();
const ConceptController = require('../controller/concept_controller');

conceptRoute.post("/createConcept", ConceptController.createConcept);
conceptRoute.get("/getAllConcepts", ConceptController.fetchAllConcepts);
conceptRoute.get("/getConceptbyId/:id", ConceptController.fetchConceptsById);
conceptRoute.get("/getConceptbyCriteria", ConceptController.fetchConceptsByCriteria);
conceptRoute.get("/getConceptbyConceptname/:conceptName", ConceptController.fetchConceptsByConceptName);
conceptRoute.put("/updateConcept/:id", ConceptController.updateConcepts);
conceptRoute.put("/concepts/:conceptId/study_material/:index", ConceptController.updateStudyMaterial);
conceptRoute.delete("/deleteConcept/:id", ConceptController.deleteConcept);

module.exports = conceptRoute;