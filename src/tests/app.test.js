const request = require("supertest")
const app = require("../app")
const User = require("../models/Internaute")

describe("Test createUser", () => {
    it("Créer un nouveau internaute avec succès", async () => {
        // Données à envoyer
        const data = {
            "email": "brucewillis@gmail.com",
            "nom": "Willis",
            "prenom": "Bruce",
            "motDePasse": "test",
            "anneeNaissance": 1954
        }

        // Mock
        jest.spyOn(User, 'create').mockResolvedValue({
            "email": "brucewillis@gmail.com",
            "nom": "Willis",
            "prenom": "Bruce",
            "motDePasse": "test",
            "anneeNaissance": 1954
        })

        // Réponses
        const response = await request(app)
        .post("/api/internautes")
        .send(data)



        // Vérifications
        expect(response.statusCode).toBe(200);

        jest.restoreAllMocks();
    }, 10000)
})