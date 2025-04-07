import nodemailer from "nodemailer";

export async function sendResetEmail(to, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const resetLink = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Team Maker  ${process.env.GMAIL_USER}`,
    to,
    subject: "비밀번호 재설정",
    html: `<p>안녕하세요,</p>
           <p>비밀번호 재설정을 위해 아래 링크를 클릭하세요:</p>
           <a href="${resetLink}">비밀번호 재설정</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("비밀번호 재설정 이메일이 성공적으로 전송되었습니다.");
  } catch (error) {
    console.error("이메일 전송 중 오류 발생: ", error);
  }
}
