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

    /* ===== IMAGES (CONTACT BANNER STYLE) ===== */
    if (req.files?.mainImage?.[0]) {
      payload.mainImage = `/uploads/${req.files.mainImage[0].filename}`;
    }

    if (req.files?.image?.length) {
      payload.ourStory.images = req.files.image.map(
        (f) => `/uploads/${f.filename}`
      );
    }

    if (req.files?.missionImage?.[0]) {
      payload.mission.image = `/uploads/${req.files.missionImage[0].filename}`;
    }

    if (req.files?.visionImage?.[0]) {
      payload.vision.image = `/uploads/${req.files.visionImage[0].filename}`;
    }

    const aboutUs = await AboutUs.create(payload);

    res.status(201).json({
      success: true,
      message: "About Us created successfully",
      data: aboutUs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "About Us not found",
      });
    }
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE ================= */
exports.updateAboutUs = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      shortPara: req.body.shortPara,
      numbers: {
        graduates: req.body.graduates,
        trainers: req.body.trainers,
        years: req.body.years,
        rate: req.body.rate,
      },
      ourStory: { description: req.body.description },
      mission: {
        title: req.body.missiontitle,
        description: req.body.missiondescription,
        tags: req.body.missiontags ? JSON.parse(req.body.missiontags) : [],
      },
      vision: {
        title: req.body.visiontitle,
        description: req.body.visiondescription,
        tags: req.body.visiontags ? JSON.parse(req.body.visiontags) : [],
      },
    };

    if (req.files?.mainImage?.[0]) {
      payload.mainImage = `/uploads/${req.files.mainImage[0].filename}`;
    }

    if (req.files?.image?.length) {
      payload.ourStory.images = req.files.image.map(
        (f) => `/uploads/${f.filename}`
      );
    }

    if (req.files?.missionImage?.[0]) {
      payload.mission.image = `/uploads/${req.files.missionImage[0].filename}`;
    }

    if (req.files?.visionImage?.[0]) {
      payload.vision.image = `/uploads/${req.files.visionImage[0].filename}`;
    }

    const updated = await AboutUs.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    );

    res.json({
      success: true,
      message: "About Us updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= DELETE ================= */
exports.deleteAboutUs = async (req, res) => {
  try {
    await AboutUs.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "About Us deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
