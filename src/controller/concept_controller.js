const conceptModel = require('../model/concepts_model');
const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
// Limit file size to 50MB
});
const ConceptController = {

    createConcept: async function(req, res) {
  try {
    upload.array('study_material', 10)(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'File upload error' });
      } else if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      const data = req.body;
      const files = req.files;
     
      if (!files) {
        return res.status(400).json({ success: false, message: 'File is required' });
      }

      // Create a new concept document
      const newConcept = new conceptModel({
        conceptName: data.conceptName,
        conceptDescription: data.conceptDescription, // Correct the typo in field name
        subject: data.subject,
        stream: data.stream,
        board: data.board,
        topic: data.topic,
        chapter: data.chapter,
        class: data.class,
        study_material: files.map(file => ({
          data: file.buffer,
          contentType: file.mimetype,
         
        })),
      });

      await newConcept.save();

      // Check if study_material array is not empty before accessing its elements
      if (newConcept.study_material.length > 0) {
        newConcept.study_material[0].data = newConcept.study_material[0].data.toString('base64');
      }
 
      // Return a response with only necessary fields
      const responseObject = {
        _id: newConcept._id,
        conceptName: newConcept.conceptName,
        conceptDescription: newConcept.conceptDescription,
        subject: newConcept.subject,
        stream: newConcept.stream,
        board: newConcept.board,
        chapter: newConcept.chapter,
        topic: newConcept.topic,
        class: newConcept.class,
        study_material: newConcept.study_material.map(item => ({
          contentType: item.contentType,
          data: item.data.toString('base64'),
          chapter: newConcept.chapter
        })),
      };

      res.json({ success: true, data: responseObject });
    });
  } catch (ex) {
    return res.status(500).json({ success: false, message: ex.message });
  }
},

fetchAllConcepts: async function (req, res) {
  try {
    // Specify the field names you want in the projection, including 'conceptName' and 'conceptDescription'
    const foundConcepts = await conceptModel.find({}, '_id conceptName conceptDescription subject stream class board chapter topic study_material').lean();

    const formattedConcepts = foundConcepts.map((concept) => {
      // Convert study_material data to base64 (assuming it's an array of objects)
      const formattedStudyMaterial = concept.study_material.map((item) => {
        if (item.data) {
          return {
            contentType: item.contentType,
            data: item.data.toString('base64'),
          };
        } else {
          return null; // Handle the case where data is undefined or null
        }
      }).filter(Boolean); // Remove null items from the array

      return {
        _id: concept._id,
        conceptName: concept.conceptName,
        conceptDescription: concept.conceptDescription,
        subject: concept.subject,
        stream: concept.stream,
        class: concept.class,
        board: concept.board,
        chapter: concept.chapter,
        topic: concept.topic,
        study_material: formattedStudyMaterial,
      };
    });

    return res.json({ success: true, data: formattedConcepts });
  } catch (ex) {
    return res.status(500).json({ success: false, message: ex.message });
  }
},


   updateStudyMaterial: async function(req, res) {
  const conceptId = req.params.conceptId; // Replace with the actual concept ID
  const updatedVideoIndex = req.params.index; // Replace with the index of the video you want to update

  // Use the 'upload.single' middleware to handle the updated video file upload
  upload.single('study_material')(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: 'Video upload error' });
    } else if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    // Check if req.file is available
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File is required' });
    }

    // Assuming the request body contains additional data related to the updated video
    const additionalVideoData = req.body.additionalVideoData;
    const updatedVideo = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      ...additionalVideoData,
    };

    try {
      const existingConcept = await conceptModel.findOne({ _id: conceptId });

      if (!existingConcept) {
        return res.status(404).json({ success: false, message: 'Concept not found' });
      }

      if (
        updatedVideoIndex < 0 ||
        updatedVideoIndex >= existingConcept.study_material.length
      ) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid index for study_material' });
      }

      // Update the specific video at the specified index
      existingConcept.study_material[updatedVideoIndex] = updatedVideo;

      const updatedConcept = await existingConcept.save();
const responseObject = {
        _id: updatedConcept._id, // Include the _id field
        conceptName: updatedConcept.conceptName,
        conceptDescription: updatedConcept.conceptDescription,
        subject: updatedConcept.subject,
        stream: updatedConcept.stream,
        class: updatedConcept.class,
        board: updatedConcept.board,
        chapter: updatedConcept.chapter,
        topic: updatedConcept.topic,

        study_material: updatedConcept.study_material.map((item) => ({
          contentType: item.contentType,
          data: item.data.toString('base64'),
        })),
      };
      return res.json({ success: true, data: responseObject });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  });
},

fetchConceptsById: async function (req, res) {
  try {
    const conceptId = req.params.id;
    const concept = await conceptModel.findById(conceptId);

    if (!concept) {
      return res.status(404).json({ success: false, message: 'Concept not found' });
    }

    // Convert study_material data to base64 (assuming it's an array of objects)
    const formattedStudyMaterial = concept.study_material.map((item) => {
      if (item.data) {
        return {
          contentType: item.contentType,
          data: item.data.toString('base64'),
        };
      } else {
        return null; // Handle the case where data is undefined or null
      }
    }).filter(Boolean); // Remove null items from the array

    const formattedConcept = {
      _id: concept._id,
      conceptName: concept.conceptName,
      conceptDescription: concept.conceptDescription,
      subject: concept.subject,
      stream: concept.stream,
      class: concept.class,
      board: updatedConcept.board,
      chapter: concept.chapter,
      topic: concept.topic,
      study_material: formattedStudyMaterial,
    };

    // Return the concept as a JSON response
    return res.json({ success: true, data: formattedConcept });
  } catch (ex) {
    return res.status(500).json({ success: false, message: ex.message });
  }
},

fetchConceptsByCriteria: async function (req, res) {
  try {
    // Get the filter criteria from the request, adjust these as needed
    const { stream, conceptClass, board, topic } = req.query;

    // Construct a query object based on the criteria
    const query = {};

    if (stream) {
      query.stream = stream;
    }

    if (conceptClass) {
      query.class = conceptClass;
    }

    if (board) {
      query.board = board;
    }

    if (topic) {
      query.topic = topic;
    }

    // Use the query object to find concepts that match the criteria
    const concepts = await conceptModel.find(query);

    // Format the study_material data as needed (similar to the previous example)

    const formattedConcepts = concepts.map((concept) => {
      const formattedStudyMaterial = concept.study_material.map((item) => {
        if (item.data) {
          return {
            contentType: item.contentType,
            data: item.data.toString('base64'),
          };
        } else {
          return null; // Handle the case where data is undefined or null
        }
      }).filter(Boolean);

      return {
        _id: concept._id,
        conceptName: concept.conceptName,
        conceptDescription: concept.conceptDescription,
        subject: concept.subject,
        stream: concept.stream,
        class: concept.class,
        board: concept.board,
        chapter: concept.chapter,
        topic: concept.topic,
        study_material: formattedStudyMaterial,
      };
    });

    return res.json({ success: true, data: formattedConcepts });
  } catch (ex) {
    return res.status(500).json({ success: false, message: ex.message });
  }
},

fetchConceptsByConceptName: async function (req, res) {
  try {
    const conceptName = req.params.conceptName;

    // Use Mongoose to find concepts that match the concept name
    const concepts = await conceptModel.find({ conceptName: conceptName });

    // Format the study_material data as needed (similar to the previous examples)

    const formattedConcepts = concepts.map((concept) => {
      const formattedStudyMaterial = concept.study_material.map((item) => {
        if (item.data) {
          return {
            contentType: item.contentType,
            data: item.data.toString('base64'),
          };
        } else {
          return null; // Handle the case where data is undefined or null
        }
      }).filter(Boolean);

      return {
        _id: concept._id,
        conceptName: concept.conceptName,
        conceptDescription: concept.conceptDescription,
        subject: concept.subject,
        stream: concept.stream,
        class: concept.class,
        board: concept.board,
        chapter: concept.chapter,
        topic: concept.topic,
        study_material: formattedStudyMaterial,
      };
    });

    return res.json({ success: true, data: formattedConcepts });
  } catch (ex) {
    return res.status(500).json({ success: false, message: ex.message });
  }
},

  updateConcepts: async function (req, res) {
  const conceptId = req.params.id; // Assuming you have the concept's ID in the request parameters

  try {
    // Use the 'upload.array' middleware to handle multiple file uploads
    upload.array('study_material', 10)(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'File upload error' });
      } else if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      const updateData = req.body;
      const files = req.files;
      const existingConcept = await conceptModel.findById(conceptId);

      if (!existingConcept) {
        return res.status(404).json({ success: false, message: 'Concept not found' });
      }

      // Update fields from form-data
      if (updateData.conceptName) {
        existingConcept.conceptName = updateData.conceptName || existingConcept.conceptName;
        existingConcept.conceptDescription = updateData.conceptDescription || existingConcept.conceptDescription;
        existingConcept.subject = updateData.subject || existingConcept.subject;
        existingConcept.stream = updateData.stream || existingConcept.stream;
        existingConcept.class = updateData.class || existingConcept.class;
        existingConcept.board= updateData.board || existingConcept.board;
        existingConcept.chapter = updateData.chapter || existingConcept.chapter,
        existingConcept.topic = updateData.topic || existingConcept.topic;
        
      }

      // Update the study_material with new data (if new files are provided)
      if (files && files.length > 0) {
        // Map the files to the study_material array
        existingConcept.study_material = files.map((file) => ({
          data: file.buffer,
          contentType: file.mimetype,
        }));
      }

      const updatedConcept = await existingConcept.save();
      console.log(updatedConcept.study_material)
      const responseObject = {
        _id: updatedConcept._id, // Include the _id field
        conceptName: updatedConcept.conceptName,
        conceptDescription: updatedConcept.conceptDescription,
        subject: updatedConcept.subject,
        stream: updatedConcept.stream,
        class: updatedConcept.class,
       board: updatedConcept.board,
        chapter: updatedConcept.chapter,
        topic: updatedConcept.topic,
        study_material: updatedConcept.study_material.map((item) => ({
          contentType: item.contentType,
          data: item.data.toString('base64'),
        })),
      };

      return res.json({ success: true, data: responseObject });
    });
  } catch (ex) {
    return res.status(500).json({ success: false, message: ex.message });
  }
},


    deleteConcept: async function(req,res){
         const conceptId = req.params.id;

  try {
    // Use Mongoose to find and remove the concept by ID
    const deletedConcept = await conceptModel.findByIdAndDelete(conceptId);

    if (!deletedConcept) {
      // Concept with the given ID was not found
      return res.status(404).json({ success: false, message: 'Concept not found' });
    }

    // Concept was successfully deleted
    res.json({ success: true, message: 'Concept deleted successfully' });
  } catch (ex) {
    // Handle any errors that may occur during the deletion process
    console.error('Deletion error:', ex);
    res.status(500).json({ success: false, message: 'Deletion error: ' + ex.message });
  }
    },
    
  //   updateConceptWithNewFields: async function (req, res) {
  //      try {
  //   const updateResult = await Concept.updateMany({}, { $set: { "study_material.$[].chapter": "Reproduction System" } });

  //   console.log(updateResult);
  //   console.log(`Updated ${updateResult.nModified} document(s).`);
    
  //   res.json({ success: true, message: `Updated ${updateResult.nModified} document(s).` });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ success: false, message: error.message });
  // }



// }
};
// ConceptController.updateConceptWithNewFields();

module.exports = ConceptController
    