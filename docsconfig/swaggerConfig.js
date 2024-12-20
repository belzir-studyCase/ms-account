// swaggerConfig.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';




// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "API for user authentication and management",
        },
        servers: [
            {
                url: "https://gateway-9pxx.onrender.com",
            },
        ],
    },
    apis: ["./routes/*.js"], // Adjust path if needed
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
