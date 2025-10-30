const fs = require('fs')

const USERS_FILE = "seedocs.json";

function loadDoctors() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return JSON.parse(data || "[]");
}

function saveDoctors(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function getalldoctors(req, res) {
  const { name } = req.query;
  const doctors = loadDoctors();

  if (doctors.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No doctors found in the system",
    });
  }

  let filteredDoctors = doctors;

  if (name) {
    const searchName = name.toLowerCase();
    filteredDoctors = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(searchName)
    );
  }

  if (filteredDoctors.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No matching doctors found",
    });
  }

  res.status(200).json({
    success: true,
    data: filteredDoctors,
    message: name
      ? "Search results retrieved successfully"
      : "All doctors retrieved successfully",
  });
}

function getdocbyId(req, res) {
  const doctors = loadDoctors();
  const { id } = req.params;
  const doctor = doctors.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor not found",
    });
  }

  res.status(200).json({
    success: true,
    data: doctor,
    message: "Doctor retrieved successfully",
  });
}

module.exports = { getalldoctors, getdocbyId }