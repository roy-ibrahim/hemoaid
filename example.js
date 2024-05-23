const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI("AIzaSyDMgSJdGzmNz7gAzO2jTTIZEIekXuwSuK0");

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  //const prompt = "this is a blood test, extract the name, value and reference of each test done in JSON format. don't add anything and do not give me the personal information of the patient.";

  const prompt = "what is in the image?";
  const imageParts = [
    fileToGenerativePart("test5.jpg", "image/png"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();