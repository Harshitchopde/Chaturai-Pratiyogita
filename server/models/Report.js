import { model, Schema } from "mongoose";
import mailSender from "../utils/mailSender.js";
import { developerEmailTemplate, userAcknowledgmentEmail } from "../mails/reportsMail.js";

const reportSchema = new Schema({
  issueName: {
    type: String,
    required: true,
  },
  issueDesc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Processing", "Failed", "Resolved"],
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});


const sendReportMailToOwner = async (issueName, issueDesc, email,status) => {
  try {
    const bodyUser = userAcknowledgmentEmail(email,issueDesc)
    const bodydev = developerEmailTemplate(issueName,issueDesc,email,status)
    const mailResponseUser = await mailSender(
      email,
      issueName,
      bodyUser,
     
    );
    const mailResponseDevloper = await mailSender(
      process.env.MAIL_USER,
      issueName,
      bodydev,
    );
  } catch (error) {
    console.log("Error will send Verification email : ", error.message);
    throw error;
  }
};
reportSchema.pre("save", async function (next) {
  await sendReportMailToOwner(this.issueName, this.issueDesc, this.email,this.status);
  next();
});
export default model("Report", reportSchema);
