require("dotenv").config();
const nodemailer=require("nodemailer")

const sendEmail = (resetToken,email,userId)=>{
    const hostMail=process.env.HOST_EMAIL;
    const hostPassword=process.env.HOST_PASSWORD;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: hostMail,
            pass: hostPassword,
        }
    })
    const mailOptions = {
        from: hostMail,
        to: email,
        subject: "Password reset",
        text: `click on the link to change your password ${process.env.CLIENT_URL}/reset/?token=${resetToken}&userid=${userId}`
    }
    transporter.sendMail(mailOptions, (err, info) => {

        if (err) {
            console.log(err);
            // res.status(500).send("error while sending mail")


        }
        else {
            // res.status(200).send("Reset Password email sent", info.response);
        }
    })
}

module.exports = sendEmail