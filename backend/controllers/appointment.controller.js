const { Appointments, Patients, Doctors } = require("../models");

async function createAppointment(req, res) {
  try {
    const { doctorId, appointmentDate, reason, aiAnalysis } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID and appointment date are required",
      });
    }

    const appointment = await Appointments.create({
      patientId,
      doctorId,
      appointmentDate,
      reason,
      aiAnalysis,
    });

    return res.status(201).json({
      success: true,
      data: appointment,
      message: "Appointment created successfully",
    });
  } catch (error) {
    console.error("Create Appointment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getPatientAppointments(req, res) {
  try {
    const patientId = req.user.id;
    const appointments = await Appointments.findAll({
      where: { patientId },
      include: [
        {
          model: Doctors,
          as: "doctor",
          attributes: ["fullname", "specialization", "email"],
        },
      ],
      order: [["appointmentDate", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Get Patient Appointments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getDoctorAppointments(req, res) {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointments.findAll({
      where: { doctorId },
      include: [
        {
          model: Patients,
          as: "patient",
          attributes: ["fullname", "email"],
        },
      ],
      order: [["appointmentDate", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Get Doctor Appointments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
};
