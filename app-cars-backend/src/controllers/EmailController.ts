import axios from "axios"

interface EmailSenderProps {
    name: string;
    email: string;
    message: string
    title: string;
}

const sendEmail = async ({ name, email, message, title }: EmailSenderProps): Promise<string> => {
    if (!name || !email || !message) {
        throw new Error("All fields are required.");
    }

    try {
        const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: {
                to_user: email,
                to_name: name,
                message: message,
                title: title,
                from: 'CAPDES',
                from_name: 'wigothehacker',
                reply_to: 'wigoCompany',
            },
            accessToken: process.env.EMAILJS_PRIVATE_KEY
        })

        if (response.status === 200) return "Email sent successfully.";
        else throw new Error("Error sending email.");

    } catch (error: any) {
        console.error("Error sending email:", error.message);
        throw new Error("An error occurred while sending the email.");
    }
};

export default {
    sendEmail
}