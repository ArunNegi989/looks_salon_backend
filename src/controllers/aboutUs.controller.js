const AboutUs = require("../models/AboutUs.model");

/* ================= CREATE ================= */

exports.createAboutUs = async (req, res) => {
  try {
    const {
      title,
      shortPara,
      description,
      graduates,
      trainers,
      years,
      rate,
      missiontitle,
      missiondescription,
      missiontags,
      visiontitle,
      visiondescription,
      visiontags,
    } = req.body;

    const existingAboutUs = await AboutUs.findOne();

    const payload = {
      title,
      shortPara,

      numbers: { graduates, trainers, years, rate },

      ourStory: { description },

      mission: {
        title: missiontitle,
        description: missiondescription,
        tags: missiontags ? JSON.parse(missiontags) : [],
      },

      vision: {
        title: visiontitle,
        description: visiondescription,
        tags: visiontags ? JSON.parse(visiontags) : [],
      },
    };

    /* ===== Images ===== */
    if (req.files?.mainImage?.[0]) {
      payload.mainImage = req.files.mainImage[0].path;
    }

    if (req.files?.image?.length) {
      payload["ourStory.images"] =
        req.files.image.map((f) => f.path);
    }

    if (req.files?.missionImage?.[0]) {
      payload["mission.image"] = req.files.missionImage[0].path;
    }

    if (req.files?.visionImage?.[0]) {
      payload["vision.image"] = req.files.visionImage[0].path;
    }

    /* ===== UPDATE CASE ===== */
    if (existingAboutUs) {
      const updated = await AboutUs.findByIdAndUpdate(
        existingAboutUs._id,
        { $set: payload },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        alreadyExists: true, // 🔑 IMPORTANT FLAG
        message:
          "About Us already exists. You can only edit/update the existing content.",
        data: updated,
      });
    }

    /* ===== CREATE CASE ===== */
    const aboutUs = new AboutUs(payload);
    await aboutUs.save();

    res.status(201).json({
      success: true,
      alreadyExists: false,
      message: "About Us created successfully",
      data: aboutUs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= READ ALL ================= */
exports.getAllAboutUs = async (req, res) => {
  try {
    const data = await AboutUs.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= READ SINGLE ================= */
exports.getAboutUsById = async (req, res) => {
  try {
    const data = await AboutUs.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE ================= */
exports.updateAboutUs = async (req, res) => {
  try {
    const {
      title,
      shortPara,
      description,
      graduates,
      trainers,
      years,
      rate,
      missiontitle,
      missiondescription,
      missiontags,
      visiontitle,
      visiondescription,
      visiontags,
    } = req.body;

    const updatePayload = {
      title,
      shortPara,

      numbers: {
        graduates,
        trainers,
        years,
        rate,
      },

      "ourStory.description": description,

      mission: {
        title: missiontitle,
        description: missiondescription,
        tags: missiontags ? JSON.parse(missiontags) : [],
      },

      vision: {
        title: visiontitle,
        description: visiondescription,
        tags: visiontags ? JSON.parse(visiontags) : [],
      },
    };

    if (req.files?.mainImage?.[0]) {
      updatePayload.mainImage = req.files.mainImage[0].path;
    }

    if (req.files?.image?.length) {
      updatePayload["ourStory.images"] =
        req.files.image.map((file) => file.path);
    }

    if (req.files?.missionImage?.[0]) {
      updatePayload["mission.image"] =
        req.files.missionImage[0].path;
    }

    if (req.files?.visionImage?.[0]) {
      updatePayload["vision.image"] =
        req.files.visionImage[0].path;
    }

    const updatedData = await AboutUs.findByIdAndUpdate(
      req.params.id,
      { $set: updatePayload },
      { new: true }
    );

    res.json({
      success: true,
      message: "AboutUs updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= DELETE ================= */
exports.deleteAboutUs = async (req, res) => {
  try {
    await AboutUs.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "AboutUs deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
